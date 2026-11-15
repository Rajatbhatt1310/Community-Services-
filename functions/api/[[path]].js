// CyberSafe School API for Cloudflare Pages Functions, backed by D1 (binding: DB).
// Same routes and rules as server/index.js, which stays for local development.
// Secrets: ADMIN_PASSWORD (12+ chars) and SESSION_SECRET (32+ chars).
import seedModules from '../../shared/content/modules/index.js';
import { validateModule, cleanModule, SLUG } from '../../shared/validate.js';
import { computeStats } from '../../server/stats.js';

const COOKIE = 'cs_admin';
const SESSION_S = 4 * 60 * 60;
const MAX_BODY = 200_000;
const MAX_ATTEMPTS = 50_000;
const enc = new TextEncoder();

/* ---------- Responses ---------- */

const json = (status, data, headers = {}) =>
  new Response(status === 204 ? null : JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
  });
const fail = (status, error, details) => json(status, details ? { error, details } : { error });

/* ---------- Crypto helpers (Web Crypto, no Node APIs) ---------- */

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}
const b64url = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
// Constant-time comparison so response timing does not leak how much of a secret matched.
function same(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/* ---------- Admin auth ---------- */

const adminEnabled = (env) => (env.ADMIN_PASSWORD || '').length >= 12 && (env.SESSION_SECRET || '').length >= 32;

async function checkPassword(env, input) {
  if (!adminEnabled(env) || typeof input !== 'string' || input.length > 256) return false;
  // Comparing HMACs keeps the comparison fixed-length whatever the input length.
  return same(await hmac(env.SESSION_SECRET, `pw:${input}`), await hmac(env.SESSION_SECRET, `pw:${env.ADMIN_PASSWORD}`));
}

async function sessionCookie(env) {
  const payload = b64url(enc.encode(JSON.stringify({ exp: Date.now() + SESSION_S * 1000 })));
  const sig = b64url(await hmac(env.SESSION_SECRET, payload));
  return `${COOKIE}=${payload}.${sig}; HttpOnly; Secure; SameSite=Strict; Path=/api/admin; Max-Age=${SESSION_S}`;
}
const clearCookie = `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/api/admin; Max-Age=0`;

async function hasSession(env, request) {
  if (!adminEnabled(env)) return false;
  const raw = (request.headers.get('Cookie') || '').split(';').map((c) => c.trim()).find((c) => c.startsWith(`${COOKIE}=`));
  const [payload, sig] = (raw ? raw.slice(COOKIE.length + 1) : '').split('.');
  if (!payload || !sig) return false;
  if (!same(enc.encode(b64url(await hmac(env.SESSION_SECRET, payload))), enc.encode(sig))) return false;
  try {
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))).exp > Date.now();
  } catch {
    return false;
  }
}

/* ---------- Database ---------- */

let ready = null;
// Creates tables and seeds the chapters once per database, on the first request.
function init(db) {
  ready ??= (async () => {
    await db.batch([
      db.prepare('CREATE TABLE IF NOT EXISTS modules (id TEXT PRIMARY KEY, number INTEGER NOT NULL, data TEXT NOT NULL)'),
      db.prepare('CREATE TABLE IF NOT EXISTS attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, module_id TEXT NOT NULL, total INTEGER NOT NULL, correct INTEGER NOT NULL, results TEXT NOT NULL, at TEXT NOT NULL)'),
      db.prepare('CREATE TABLE IF NOT EXISTS hits (key TEXT NOT NULL, at INTEGER NOT NULL)'),
      db.prepare('CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY)'),
    ]);
    // A flag, not a row count, so deleting every chapter in the admin does not bring them back.
    if (!(await db.prepare("SELECT 1 FROM meta WHERE key = 'seeded'").first())) {
      await db.batch([
        db.prepare("INSERT OR IGNORE INTO meta (key) VALUES ('seeded')"),
        ...seedModules.map((m) => db.prepare('INSERT OR IGNORE INTO modules (id, number, data) VALUES (?, ?, ?)').bind(m.id, m.number, JSON.stringify(m))),
      ]);
    }
  })().catch((err) => {
    ready = null;
    throw err;
  });
  return ready;
}

const listModules = async (db) => (await db.prepare('SELECT data FROM modules ORDER BY number').all()).results.map((r) => JSON.parse(r.data));
const getModule = async (db, id) => {
  const row = await db.prepare('SELECT data FROM modules WHERE id = ?').bind(id).first();
  return row ? JSON.parse(row.data) : null;
};
const saveModule = (db, m) => db.prepare('INSERT OR REPLACE INTO modules (id, number, data) VALUES (?, ?, ?)').bind(m.id, m.number, JSON.stringify(m)).run();

// Fixed-window rate limit shared by every Worker instance. Stores a keyed hash of the IP, never the IP itself.
async function limited(env, request, bucket, windowMs, max) {
  const now = Date.now();
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `${bucket}:${b64url(await hmac(env.SESSION_SECRET || 'cybersafe', ip)).slice(0, 22)}`;
  const [, , count] = await env.DB.batch([
    env.DB.prepare('DELETE FROM hits WHERE at < ?').bind(now - 60 * 60 * 1000),
    env.DB.prepare('INSERT INTO hits (key, at) VALUES (?, ?)').bind(key, now),
    env.DB.prepare('SELECT COUNT(*) AS n FROM hits WHERE key = ? AND at > ?').bind(key, now - windowMs),
  ]);
  return count.results[0].n > max;
}

async function readJson(request) {
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) throw fail(415, 'Requests must be sent as JSON.');
  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY) throw fail(413, 'The request is too large.');
  const text = await request.text();
  if (text.length > MAX_BODY) throw fail(413, 'The request is too large.');
  try {
    return JSON.parse(text);
  } catch {
    throw fail(400, 'The request body is not valid JSON.');
  }
}

const summary = (m) => ({ id: m.id, number: m.number, title: m.title, summary: m.summary, minutes: m.minutes, group: m.group, questionCount: m.questions.length });

/* ---------- Routes ---------- */

async function route(request, env) {
  const db = env.DB;
  const { pathname } = new URL(request.url);
  const method = request.method;
  const path = pathname.replace(/\/+$/, '');
  let m;

  if (method === 'GET' && path === '/api/health') return json(200, { ok: true });
  if (method === 'GET' && path === '/api/modules') return json(200, (await listModules(db)).map(summary));
  if (method === 'GET' && (m = path.match(/^\/api\/modules\/([^/]+)$/))) {
    const mod = await getModule(db, decodeURIComponent(m[1]));
    return mod ? json(200, mod) : fail(404, 'That module does not exist.');
  }

  // Anonymous quiz results for aggregate statistics. No names, accounts or device identifiers are stored.
  if (method === 'POST' && path === '/api/attempts') {
    const body = await readJson(request);
    if (await limited(env, request, 'attempts', 60_000, 20)) return fail(429, 'Too many requests. Please wait a few minutes and try again.');
    const { moduleId, answers } = body || {};
    const mod = typeof moduleId === 'string' ? await getModule(db, moduleId) : null;
    if (!mod) return fail(400, 'Unknown module.');
    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return fail(400, 'Answers must be an object of question id to option index.');
    const results = [];
    for (const q of mod.questions) {
      const choice = answers[q.id];
      if (!Number.isInteger(choice) || choice < 0 || choice > 3) return fail(400, 'Every question must have an answer before results are saved.');
      results.push({ qid: q.id, correct: choice === q.answer });
    }
    const correct = results.filter((r) => r.correct).length;
    await db.batch([
      db.prepare('INSERT INTO attempts (module_id, total, correct, results, at) VALUES (?, ?, ?, ?, ?)').bind(mod.id, results.length, correct, JSON.stringify(results), new Date().toISOString()),
      db.prepare('DELETE FROM attempts WHERE id <= (SELECT MAX(id) FROM attempts) - ?').bind(MAX_ATTEMPTS),
    ]);
    return json(201, { correct, total: results.length });
  }

  if (method === 'GET' && path === '/api/admin/session') return json(200, { enabled: adminEnabled(env), signedIn: await hasSession(env, request) });

  if (method === 'POST' && path === '/api/admin/login') {
    const body = await readJson(request);
    if (!adminEnabled(env)) return fail(503, 'Admin access is not configured on this server.');
    if (await limited(env, request, 'login', 15 * 60_000, 8)) return fail(429, 'Too many requests. Please wait a few minutes and try again.');
    if (!(await checkPassword(env, body?.password))) return fail(401, 'That passphrase is not correct.');
    return json(200, { signedIn: true }, { 'Set-Cookie': await sessionCookie(env) });
  }

  if (method === 'POST' && path === '/api/admin/logout') return json(200, { signedIn: false }, { 'Set-Cookie': clearCookie });

  if (path.startsWith('/api/admin/')) {
    if (!(await hasSession(env, request))) return fail(401, 'Sign in to the admin dashboard to continue.');

    if (method === 'GET' && path === '/api/admin/stats') {
      // shortcut: loads every attempt (capped at 50,000) into memory; move the totals into SQL if stats get slow.
      const rows = (await db.prepare('SELECT module_id, total, correct, results, at FROM attempts').all()).results;
      const attempts = rows.map((r) => ({ moduleId: r.module_id, total: r.total, correct: r.correct, results: JSON.parse(r.results), at: r.at }));
      return json(200, computeStats(await listModules(db), attempts));
    }
    if (method === 'GET' && path === '/api/admin/modules') return json(200, await listModules(db));

    if (method === 'POST' && path === '/api/admin/modules') {
      const mod = await readJson(request);
      const errors = validateModule(mod, { requireQuestions: false });
      if (typeof mod?.id === 'string' && (await getModule(db, mod.id))) errors.push('a module with this id already exists');
      if (errors.length) return fail(400, 'The module could not be saved.', errors);
      const clean = cleanModule(mod);
      await saveModule(db, clean);
      return json(201, clean);
    }

    if ((m = path.match(/^\/api\/admin\/modules\/([^/]+)$/))) {
      const id = decodeURIComponent(m[1]);
      if (!SLUG.test(id) || !(await getModule(db, id))) return fail(404, 'That module does not exist.');
      if (method === 'PUT') {
        const mod = { ...(await readJson(request)), id };
        const errors = validateModule(mod, { requireQuestions: false });
        const ids = (mod.questions || []).map((q) => q.id);
        if (ids.some((q) => typeof q !== 'string' || !q) || new Set(ids).size !== ids.length) errors.push('every question needs a unique id');
        if (errors.length) return fail(400, 'The module could not be saved.', errors);
        const clean = cleanModule(mod);
        await saveModule(db, clean);
        return json(200, clean);
      }
      if (method === 'DELETE') {
        await db.prepare('DELETE FROM modules WHERE id = ?').bind(id).run();
        return json(204);
      }
    }
  }

  return fail(404, 'Not found.');
}

export async function onRequest({ request, env }) {
  if (!env.DB) return fail(500, 'The database is not connected. Add a D1 binding named DB to this Pages project.');
  try {
    await init(env.DB);
    return await route(request, env);
  } catch (err) {
    if (err instanceof Response) return err;
    console.error(err);
    return fail(500, 'Something went wrong on the server.');
  }
}
