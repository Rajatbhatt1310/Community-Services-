import './env.js';
import express from 'express';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as store from './store.js';
import { adminEnabled, checkPassword, issueSession, clearSession, hasSession, requireAdmin } from './auth.js';
import { rateLimit } from './rate-limit.js';
import { computeStats } from './stats.js';
import { validateModule, cleanModule, SLUG } from '../shared/validate.js';

const PORT = Number(process.env.PORT) || 4000;
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

await store.load();

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 'loopback');

app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy':
      "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  });
  next();
});
app.use(express.json({ limit: '200kb' }));

// Mutating requests must be JSON. Together with SameSite=Strict cookies this blocks cross-site form posts.
app.use('/api', (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method) && !req.is('application/json')) {
    return res.status(415).json({ error: 'Requests must be sent as JSON.' });
  }
  next();
});

const summary = (m) => ({
  id: m.id,
  number: m.number,
  title: m.title,
  summary: m.summary,
  minutes: m.minutes,
  group: m.group,
  questionCount: m.questions.length,
});

/* Public API */

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/modules', (req, res) => res.json(store.listModules().map(summary)));

app.get('/api/modules/:id', (req, res) => {
  const mod = store.getModule(req.params.id);
  if (!mod) return res.status(404).json({ error: 'That module does not exist.' });
  res.json(mod);
});

// Anonymous quiz results for aggregate statistics. No names, accounts or device identifiers are stored.
app.post('/api/attempts', rateLimit({ windowMs: 60_000, max: 20 }), async (req, res) => {
  const { moduleId, answers } = req.body || {};
  const mod = typeof moduleId === 'string' ? store.getModule(moduleId) : null;
  if (!mod) return res.status(400).json({ error: 'Unknown module.' });
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return res.status(400).json({ error: 'Answers must be an object of question id to option index.' });
  }
  const results = [];
  for (const q of mod.questions) {
    const choice = answers[q.id];
    if (!Number.isInteger(choice) || choice < 0 || choice > 3) {
      return res.status(400).json({ error: 'Every question must have an answer before results are saved.' });
    }
    results.push({ qid: q.id, correct: choice === q.answer });
  }
  const correct = results.filter((r) => r.correct).length;
  await store.addAttempt({ moduleId: mod.id, total: results.length, correct, results, at: new Date().toISOString() });
  res.status(201).json({ correct, total: results.length });
});

/* Admin API */

app.get('/api/admin/session', (req, res) => res.json({ enabled: adminEnabled, signedIn: hasSession(req) }));

app.post('/api/admin/login', rateLimit({ windowMs: 15 * 60_000, max: 8 }), (req, res) => {
  if (!adminEnabled) return res.status(503).json({ error: 'Admin access is not configured on this server.' });
  if (!checkPassword(req.body?.password)) return res.status(401).json({ error: 'That passphrase is not correct.' });
  issueSession(res);
  res.json({ signedIn: true });
});

app.post('/api/admin/logout', (req, res) => {
  clearSession(res);
  res.json({ signedIn: false });
});

app.get('/api/admin/stats', requireAdmin, (req, res) => res.json(computeStats(store.listModules(), store.listAttempts())));

app.get('/api/admin/modules', requireAdmin, (req, res) => res.json(store.listModules()));

app.post('/api/admin/modules', requireAdmin, async (req, res) => {
  const mod = req.body;
  const errors = validateModule(mod, { requireQuestions: false });
  if (store.getModule(mod?.id)) errors.push('a module with this id already exists');
  if (errors.length) return res.status(400).json({ error: 'The module could not be saved.', details: errors });
  res.status(201).json(await store.createModule(cleanModule(mod)));
});

app.put('/api/admin/modules/:id', requireAdmin, async (req, res) => {
  if (!SLUG.test(req.params.id) || !store.getModule(req.params.id)) return res.status(404).json({ error: 'That module does not exist.' });
  const mod = { ...req.body, id: req.params.id };
  const errors = validateModule(mod, { requireQuestions: false });
  const ids = (mod.questions || []).map((q) => q.id);
  if (ids.some((id) => typeof id !== 'string' || !id) || new Set(ids).size !== ids.length) errors.push('every question needs a unique id');
  if (errors.length) return res.status(400).json({ error: 'The module could not be saved.', details: errors });
  res.json(await store.replaceModule(req.params.id, cleanModule(mod)));
});

app.delete('/api/admin/modules/:id', requireAdmin, async (req, res) => {
  if (!(await store.deleteModule(req.params.id))) return res.status(404).json({ error: 'That module does not exist.' });
  res.status(204).end();
});

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found.' }));

/* Built frontend (production) */
if (existsSync(DIST)) {
  app.use(express.static(DIST, { index: false, maxAge: '1h' }));
  app.get('*', (req, res) => res.sendFile('index.html', { root: DIST }));
}

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'The request body is not valid JSON.' });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'The request is too large.' });
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => console.log(`CyberSafe School API on http://localhost:${PORT}`));
