// Password strength estimate for teaching. Runs entirely in the browser.
// It looks for the patterns attackers try first (common passwords, words, names,
// years, keyboard runs, repeats) and charges only a few bits for each, then
// counts the remaining characters at full strength.
import { COMMON_PASSWORDS, COMMON_WORDS, WORDS } from './wordlists.js';

const LEET = { '@': 'a', '4': 'a', '8': 'b', '3': 'e', '1': 'i', '!': 'i', '0': 'o', '$': 's', '5': 's', '7': 't', '+': 't' };
const unleet = (s) => s.toLowerCase().replace(/[@483!10$57+]/g, (c) => LEET[c]);

const DICT = [
  ...COMMON_WORDS.filter((w) => w.length >= 4).map((w) => [w, 11, true]),
  ...WORDS.filter((w) => !COMMON_WORDS.includes(w)).map((w) => [w, 13, false]),
].sort((a, b) => b[0].length - a[0].length);

const ROWS = ['abcdefghijklmnopqrstuvwxyz', '01234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

// Speeds used for the crack time estimate (guesses per second).
export const SPEED_SLOW = 1e5;   // leaked database stored with a slow, recommended hash
export const SPEED_FAST = 1e10;  // leaked database stored carelessly with a fast hash

export function analyse(pw) {
  if (!pw) return null;
  const findings = [];
  const lower = pw.toLowerCase();
  const base = unleet(pw).replace(/[^a-z0-9]+$/g, '');

  const pool =
    (/[a-z]/.test(pw) ? 26 : 0) + (/[A-Z]/.test(pw) ? 26 : 0) + (/[0-9]/.test(pw) ? 10 : 0) + (/[^a-zA-Z0-9]/.test(pw) ? 33 : 0);

  // 1. The whole password (or it with digits/symbols trimmed off the end) is a well-known password.
  const commonIdx = Math.min(...[lower, unleet(pw), base.replace(/\d+$/, '')].map((v) => {
    const i = COMMON_PASSWORDS.indexOf(v);
    return i === -1 ? Infinity : i;
  }));
  if (commonIdx !== Infinity) {
    findings.push({ bad: true, text: 'It is on the list of the most common passwords. Attackers try these first.' });
    const bits = Math.log2(commonIdx + 2) + (pw.length - base.length) * 1.5;
    return finish(pw, bits, findings, pool);
  }

  // 2. Mark characters covered by guessable patterns.
  const covered = new Array(pw.length).fill(false);
  let patternBits = 0;
  const cover = (start, len) => { for (let i = start; i < start + len; i++) covered[i] = true; };
  const free = (start, len) => covered.slice(start, start + len).every((c) => !c);
  const normal = unleet(pw);

  // Dictionary words and names, longest first. Common words and names cost about 11 bits
  // (one of ~2,000 first guesses); other everyday words cost 13 bits (one of ~8,000).
  const usedWords = [];
  let passphraseWords = 0;
  for (const [w, cost, common] of DICT) {
    let at = normal.indexOf(w);
    while (at !== -1) {
      if (free(at, w.length)) {
        cover(at, w.length);
        patternBits += cost + (pw.slice(at, at + w.length).toLowerCase() !== w ? 1 : 0);
        if (common) usedWords.push(pw.slice(at, at + w.length));
        else passphraseWords++;
      }
      at = normal.indexOf(w, at + 1);
    }
  }
  if (usedWords.length) findings.push({ bad: true, text: `Contains common ${usedWords.length > 1 ? 'words or names' : 'a word or name'}: ${usedWords.map((w) => `“${w}”`).join(', ')}. Swapping letters for symbols (like @ for a) does not fool attackers.` });
  if (passphraseWords >= 4 && !usedWords.length) findings.push({ bad: false, text: `Built from ${passphraseWords} separate words. Random words make long passwords that are easy to remember.` });

  // Years and dates.
  const yearRe = /(19[5-9]\d|20[0-4]\d)/g;
  let m;
  let hasYear = false;
  while ((m = yearRe.exec(pw))) {
    if (free(m.index, 4)) { cover(m.index, 4); patternBits += 7; hasYear = true; }
  }
  if (hasYear) findings.push({ bad: true, text: 'Contains a year. Birth years and graduation years are among the first things attackers try.' });

  // Keyboard and alphabet runs of 3 or more.
  let hasRun = false;
  for (let i = 0; i < pw.length - 2; i++) {
    for (const row of ROWS) {
      let len = 0;
      while (i + len < pw.length && free(i + len, 1)) {
        const chunk = lower.slice(i, i + len + 1);
        if (row.includes(chunk) || [...row].reverse().join('').includes(chunk)) len++;
        else break;
      }
      if (len >= 3) { cover(i, len); patternBits += 4 + Math.log2(len); hasRun = true; break; }
    }
  }
  if (hasRun) findings.push({ bad: true, text: 'Contains a sequence like “123”, “abc” or “qwerty”. These are guessed almost instantly.' });

  // Repeated characters (aaa, 1111).
  let hasRepeat = false;
  for (let i = 0; i < pw.length; i++) {
    let j = i;
    while (j + 1 < pw.length && pw[j + 1] === pw[i]) j++;
    const len = j - i + 1;
    if (len >= 3 && free(i, len)) { cover(i, len); patternBits += 4 + Math.log2(len); hasRepeat = true; }
    i = j;
  }
  if (hasRepeat) findings.push({ bad: true, text: 'Repeats the same character several times.' });

  // Pronounceable letter runs are probably real words that are not in our lists.
  // Charge them like a word from a large dictionary (about 8,000 words) instead of random letters.
  const runRe = /[a-z]{4,}/g;
  while ((m = runRe.exec(normal))) {
    const run = m[0];
    if (!free(m.index, run.length)) continue;
    const vowels = (run.match(/[aeiouy]/g) || []).length / run.length;
    if (vowels >= 0.25 && !/[^aeiouy]{4,}/.test(run)) {
      cover(m.index, run.length);
      const original = pw.slice(m.index, m.index + run.length);
      patternBits += 13 * Math.ceil(run.length / 8) + (original !== run ? 1 : 0);
    }
  }

  // A single repeated separator between words adds almost nothing.
  const leftover = [...pw].filter((_, i) => !covered[i]);
  const seps = leftover.filter((c) => /[-_. ]/.test(c));
  let sepBits = 0;
  if (seps.length && new Set(seps).size === 1) {
    sepBits = 2;
    pw.split('').forEach((c, i) => { if (c === seps[0]) covered[i] = true; });
  }

  // Everything else counts at full strength, using the kinds of characters actually left.
  const restChars = [...pw].filter((_, i) => !covered[i]).join('');
  const restPool =
    (/[a-z]/.test(restChars) ? 26 : 0) + (/[A-Z]/.test(restChars) ? 26 : 0) + (/[0-9]/.test(restChars) ? 10 : 0) + (/[^a-zA-Z0-9]/.test(restChars) ? 33 : 0);
  let bits = patternBits + sepBits + restChars.length * Math.log2(Math.max(restPool, 10));
  // Capital first letter and digits/symbol at the end is the most predictable shape.
  if (/^[A-Z][a-z]+[0-9!@#$%]{1,4}$/.test(pw)) {
    bits -= 4;
    findings.push({ bad: true, text: 'Follows the most predictable shape: a capital first, a word, then numbers or a symbol at the end.' });
  }

  if (pw.length < 12) findings.push({ bad: true, text: `It has ${pw.length} characters. Aim for at least 12, and longer is better.` });
  else findings.push({ bad: false, text: `Good length: ${pw.length} characters. Length matters more than anything else.` });
  if (pool <= 26 && pw.length < 16) findings.push({ bad: true, text: 'Uses only one kind of character. Long passphrases are fine like this, short passwords are not.' });

  return finish(pw, Math.max(bits, 1), findings, pool);
}

function finish(pw, bits, findings, pool) {
  const level =
    bits < 28 ? { key: 0, label: 'Very weak' } :
    bits < 40 ? { key: 1, label: 'Weak' } :
    bits < 55 ? { key: 2, label: 'Fair' } :
    bits < 70 ? { key: 3, label: 'Strong' } : { key: 4, label: 'Very strong' };
  // Average time to find it: half the search space.
  const guesses = Math.pow(2, bits) / 2;
  return {
    bits: Math.round(bits),
    level,
    findings,
    pool,
    kinds: [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((r) => r.test(pw)).length,
    length: pw.length,
    slow: humanTime(guesses / SPEED_SLOW),
    fast: humanTime(guesses / SPEED_FAST),
  };
}

export function humanTime(seconds) {
  if (seconds < 1) return 'less than a second';
  const units = [
    ['year', 31557600], ['month', 2629800], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1],
  ];
  if (seconds > 31557600 * 1e6) return 'more than a million years';
  if (seconds > 31557600 * 1000) {
    const y = seconds / 31557600;
    return `about ${Math.round(y).toLocaleString('en-IN')} years`;
  }
  for (const [name, s] of units) {
    if (seconds >= s) {
      const n = Math.round(seconds / s);
      return `about ${n} ${name}${n === 1 ? '' : 's'}`;
    }
  }
  return 'less than a second';
}

/** Cryptographically random passphrase from the word list. */
export function generatePassphrase(count = 5) {
  const pick = (n) => {
    // Rejection sampling avoids modulo bias.
    const max = Math.floor(0xffffffff / n) * n;
    const buf = new Uint32Array(1);
    do crypto.getRandomValues(buf); while (buf[0] >= max);
    return buf[0] % n;
  };
  const words = Array.from({ length: count }, () => WORDS[pick(WORDS.length)]);
  const digit = pick(10);
  const phrase = `${words.join('-')}-${digit}`;
  const bits = count * Math.log2(WORDS.length) + Math.log2(10);
  const guesses = Math.pow(2, bits) / 2;
  return { phrase, bits: Math.round(bits), slow: humanTime(guesses / SPEED_SLOW), fast: humanTime(guesses / SPEED_FAST) };
}
