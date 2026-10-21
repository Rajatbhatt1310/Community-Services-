// JSON file storage. Seeds learning content from /shared on first run.
// Writes are serialised and atomic (write to a temp file, then rename).
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import seedModules from '../shared/content/modules/index.js';

const DATA_DIR = fileURLToPath(new URL('./data/', import.meta.url));
const DB_FILE = path.join(DATA_DIR, 'db.json');
const MAX_ATTEMPTS = 50000;

let db = null;
let writeChain = Promise.resolve();

export async function load() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    db = JSON.parse(await readFile(DB_FILE, 'utf8'));
  } catch (err) {
    if (err.code !== 'ENOENT') throw new Error(`Could not read ${DB_FILE}: ${err.message}`);
    db = { modules: structuredClone(seedModules), attempts: [] };
    await persist();
    console.log('Created data store from built-in content.');
  }
}

function persist() {
  const snapshot = JSON.stringify(db, null, 2);
  writeChain = writeChain.then(async () => {
    const tmp = `${DB_FILE}.tmp`;
    await writeFile(tmp, snapshot);
    await rename(tmp, DB_FILE);
  });
  return writeChain;
}

const sorted = () => [...db.modules].sort((a, b) => a.number - b.number);

export const listModules = () => sorted();
export const getModule = (id) => db.modules.find((m) => m.id === id) || null;

export async function createModule(mod) {
  db.modules.push(mod);
  await persist();
  return mod;
}

export async function replaceModule(id, mod) {
  const i = db.modules.findIndex((m) => m.id === id);
  if (i === -1) return null;
  db.modules[i] = mod;
  await persist();
  return mod;
}

export async function deleteModule(id) {
  const before = db.modules.length;
  db.modules = db.modules.filter((m) => m.id !== id);
  if (db.modules.length === before) return false;
  await persist();
  return true;
}

export async function addAttempt(attempt) {
  db.attempts.push(attempt);
  if (db.attempts.length > MAX_ATTEMPTS) db.attempts.splice(0, db.attempts.length - MAX_ATTEMPTS);
  await persist();
}

export const listAttempts = () => db.attempts;
