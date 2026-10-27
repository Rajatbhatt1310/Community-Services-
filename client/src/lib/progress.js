// Learning progress kept only in this browser. Nothing here is sent to the server.
import { useEffect, useState } from 'react';

const KEY = 'cybersafe-progress-v1';
const MISTAKES_KEY = 'cybersafe-mistakes-v1';
const CHECKUP_KEY = 'cybersafe-checkup-v1';
const EVENT = 'cybersafe-progress';

/** Best score needed in every chapter quiz to unlock the certificate. */
export const PASS_MARK = 70;

function readKey(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}

function writeKey(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // Storage unavailable (private mode); progress is simply not remembered.
  }
}

export function recordResult(moduleId, percent) {
  const all = readKey(KEY);
  const prev = all[moduleId] || { attempts: 0, best: 0 };
  all[moduleId] = { attempts: prev.attempts + 1, best: Math.max(prev.best, percent), last: percent, at: new Date().toISOString() };
  writeKey(KEY, all);
}

/**
 * Remembers questions answered wrongly so they can be practised later.
 * A question leaves the list once it is answered correctly.
 * answers: [{ qid, correct }]
 */
export function recordAnswers(moduleId, answers) {
  const all = readKey(MISTAKES_KEY);
  for (const a of answers) {
    if (a.correct) delete all[a.qid];
    else all[a.qid] = { moduleId, misses: (all[a.qid]?.misses || 0) + 1, at: new Date().toISOString() };
  }
  writeKey(MISTAKES_KEY, all);
}

export function saveCheckup(state) {
  writeKey(CHECKUP_KEY, state);
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(MISTAKES_KEY);
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* ignore */
  }
}

function useStored(key) {
  const [value, setValue] = useState(() => readKey(key));
  useEffect(() => {
    const update = () => setValue(readKey(key));
    window.addEventListener(EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, [key]);
  return value;
}

export const useProgress = () => useStored(KEY);
export const useMistakes = () => useStored(MISTAKES_KEY);
export const useCheckup = () => useStored(CHECKUP_KEY);
