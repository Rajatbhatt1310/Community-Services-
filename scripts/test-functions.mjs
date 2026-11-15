// Self-check for the Cloudflare Pages Function: runs every route against a real SQLite
// database shaped like D1 (Node 22.5+ built-in node:sqlite). Run: npm run test:functions
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { onRequest } from '../functions/api/[[path]].js';

const sqlite = new DatabaseSync(':memory:');
const isRead = (sql) => /^\s*select/i.test(sql);
class Stmt {
  constructor(sql, args = []) { this.sql = sql; this.args = args; }
  bind(...args) { return new Stmt(this.sql, args); }
  async first() { return sqlite.prepare(this.sql).get(...this.args) ?? null; }
  async all() { return { results: sqlite.prepare(this.sql).all(...this.args) }; }
  async run() { const r = sqlite.prepare(this.sql).run(...this.args); return { results: [], meta: { changes: r.changes } }; }
}
const DB = {
  prepare: (sql) => new Stmt(sql),
  async batch(stmts) {
    sqlite.exec('BEGIN');
    try {
      const out = [];
      for (const s of stmts) out.push(isRead(s.sql) ? await s.all() : await s.run());
      sqlite.exec('COMMIT');
      return out;
    } catch (err) {
      sqlite.exec('ROLLBACK');
      throw err;
    }
  },
};
const env = { DB, ADMIN_PASSWORD: 'correct horse battery', SESSION_SECRET: 'x'.repeat(40) };

let cookie = '';
async function call(method, path, body, headers = {}) {
  const init = { method, headers: { 'CF-Connecting-IP': '203.0.113.7', ...headers } };
  if (cookie) init.headers.Cookie = cookie;
  if (body !== undefined) { init.body = typeof body === 'string' ? body : JSON.stringify(body); init.headers['Content-Type'] ??= 'application/json'; }
  const res = await onRequest({ request: new Request(`https://cybersafe.test${path}`, init), env });
  const set = res.headers.get('Set-Cookie');
  if (set) cookie = set.split(';')[0];
  return { status: res.status, body: res.status === 204 ? null : await res.json(), setCookie: set };
}

// Public routes and seeding
assert.equal((await call('GET', '/api/health')).status, 200);
const list = await call('GET', '/api/modules');
assert.equal(list.body.length, 10, 'seeds ten chapters');
const mod = (await call('GET', '/api/modules/phishing-and-online-scams')).body;
assert.equal(mod.questions.length, 10);
assert.equal((await call('GET', '/api/modules/nope')).status, 404);

// Attempts: server grades, rejects incomplete and non-JSON
const answers = Object.fromEntries(mod.questions.map((q, i) => [q.id, i < 7 ? q.answer : (q.answer + 1) % 4]));
assert.deepEqual((await call('POST', '/api/attempts', { moduleId: mod.id, answers })).body, { correct: 7, total: 10 });
assert.equal((await call('POST', '/api/attempts', { moduleId: mod.id, answers: {} })).status, 400);
assert.equal((await call('POST', '/api/attempts', 'x=1', { 'Content-Type': 'application/x-www-form-urlencoded' })).status, 415);
assert.equal((await call('POST', '/api/attempts', '{bad', {})).status, 400);

// Admin: locked without session, wrong and right passphrase, cookie flags
assert.equal((await call('GET', '/api/admin/stats')).status, 401);
assert.equal((await call('POST', '/api/admin/login', { password: 'wrong wrong wrong' })).status, 401);
const login = await call('POST', '/api/admin/login', { password: env.ADMIN_PASSWORD });
assert.equal(login.status, 200);
assert.match(login.setCookie, /HttpOnly; Secure; SameSite=Strict; Path=\/api\/admin/);
assert.equal((await call('GET', '/api/admin/session')).body.signedIn, true);
const stats = (await call('GET', '/api/admin/stats')).body;
assert.equal(stats.totalAttempts, 1);
assert.equal(stats.averagePercent, 70);

// Tampered cookie is rejected
const good = cookie;
cookie = good.slice(0, -2) + (good.endsWith('AA') ? 'BB' : 'AA');
assert.equal((await call('GET', '/api/admin/stats')).status, 401);
cookie = good;

// Edit, validation, create, delete
const edited = { ...mod, title: 'Phishing (edited)' };
assert.equal((await call('PUT', `/api/admin/modules/${mod.id}`, edited)).body.title, 'Phishing (edited)');
assert.equal((await call('GET', `/api/modules/${mod.id}`)).body.title, 'Phishing (edited)');
assert.equal((await call('PUT', `/api/admin/modules/${mod.id}`, { ...mod, title: '' })).status, 400);
const fresh = { ...mod, id: 'test-module', number: 11, questions: [] };
assert.equal((await call('POST', '/api/admin/modules', fresh)).status, 201);
assert.equal((await call('POST', '/api/admin/modules', fresh)).status, 400, 'duplicate id rejected');
assert.equal((await call('DELETE', '/api/admin/modules/test-module')).status, 204);
assert.equal((await call('GET', '/api/modules')).body.length, 10);

// Logout, then login rate limit (8 per 15 minutes per IP)
await call('POST', '/api/admin/logout', {});
assert.equal((await call('GET', '/api/admin/session')).body.signedIn, false);
const codes = [];
for (let i = 0; i < 10; i++) codes.push((await call('POST', '/api/admin/login', { password: 'nope nope nope' })).status);
assert.ok(codes.includes(429), `login is rate limited (${codes.join(',')})`);
assert.equal(sqlite.prepare("SELECT COUNT(*) AS n FROM hits WHERE key LIKE '%203.0.113.7%'").get().n, 0, 'raw IP never stored');

// Deleting every chapter must not re-seed them, even in a fresh Worker instance
sqlite.exec('DELETE FROM modules');
const fresh2 = await import('../functions/api/[[path]].js?fresh-instance');
const res2 = await fresh2.onRequest({ request: new Request('https://cybersafe.test/api/modules'), env });
assert.equal((await res2.json()).length, 0);

console.log('All Pages Function checks passed.');
