// Admin authentication: one shared admin passphrase from the environment,
// and an HMAC-signed, HttpOnly session cookie. No student accounts exist.
import { scryptSync, randomBytes, timingSafeEqual, createHmac } from 'node:crypto';

const COOKIE = 'cs_admin';
const SESSION_MS = 4 * 60 * 60 * 1000;
const isProd = process.env.NODE_ENV === 'production';

const password = process.env.ADMIN_PASSWORD || '';
const salt = randomBytes(16);
const passwordHash = password ? scryptSync(password, salt, 32) : null;
const secret = process.env.SESSION_SECRET || randomBytes(32).toString('hex');

export const adminEnabled = password.length >= 12;
if (password && !adminEnabled) console.warn('ADMIN_PASSWORD is shorter than 12 characters. Admin login is disabled.');
if (!password) console.warn('ADMIN_PASSWORD is not set. Admin login is disabled.');

export function checkPassword(input) {
  if (!adminEnabled || typeof input !== 'string' || input.length > 256) return false;
  return timingSafeEqual(scryptSync(input, salt, 32), passwordHash);
}

const sign = (payload) => createHmac('sha256', secret).update(payload).digest('base64url');

export function issueSession(res) {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_MS })).toString('base64url');
  res.cookie(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: 'strict',
    secure: isProd,
    path: '/api/admin',
    maxAge: SESSION_MS,
  });
}

export function clearSession(res) {
  res.clearCookie(COOKIE, { path: '/api/admin' });
}

function readCookie(req) {
  const header = req.headers.cookie || '';
  const match = header.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${COOKIE}=`));
  return match ? decodeURIComponent(match.slice(COOKIE.length + 1)) : null;
}

export function hasSession(req) {
  const token = readCookie(req);
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now();
  } catch {
    return false;
  }
}

export function requireAdmin(req, res, next) {
  if (!hasSession(req)) return res.status(401).json({ error: 'Sign in to the admin dashboard to continue.' });
  next();
}
