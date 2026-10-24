// Loads learning content from the API. If the API is unreachable (for example when the
// site is opened as a static build), it falls back to the content bundled with the app.
import { useEffect, useState } from 'react';
import { api } from './api.js';

let listCache = null;
const moduleCache = new Map();
let offline = false;

const loadBundled = () => import('@shared/content/modules/index.js').then((m) => m.default);

const summarise = (m) => ({
  id: m.id, number: m.number, title: m.title, summary: m.summary,
  minutes: m.minutes, group: m.group, questionCount: m.questions.length,
});

async function fetchList() {
  if (listCache) return listCache;
  try {
    listCache = await api('/modules');
  } catch (err) {
    if (err.status && err.status !== 0 && err.status < 500) throw err;
    offline = true;
    listCache = (await loadBundled()).map(summarise);
  }
  return listCache;
}

async function fetchModule(id) {
  if (moduleCache.has(id)) return moduleCache.get(id);
  let mod;
  try {
    mod = offline ? undefined : await api(`/modules/${encodeURIComponent(id)}`);
  } catch (err) {
    if (err.status === 404) return null;
    offline = true;
  }
  if (mod === undefined) mod = (await loadBundled()).find((m) => m.id === id) || null;
  if (mod) moduleCache.set(id, mod);
  return mod;
}

/** Every module with full content, for search and progress pages. */
export async function loadAllModules() {
  const list = await fetchList();
  const all = await Promise.all(list.map((m) => fetchModule(m.id)));
  return all.filter(Boolean);
}

export function invalidateContent() {
  listCache = null;
  moduleCache.clear();
}

function useAsync(loader, key) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });
  useEffect(() => {
    let live = true;
    setState((s) => (s.status === 'loading' ? s : { status: 'loading', data: null, error: null }));
    loader()
      .then((data) => live && setState({ status: 'ready', data, error: null }))
      .catch((error) => live && setState({ status: 'error', data: null, error }));
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return { ...state, offline };
}

export const useModules = () => useAsync(fetchList, 'list');
export const useModule = (id) => useAsync(() => fetchModule(id), id);
export const isOffline = () => offline;
