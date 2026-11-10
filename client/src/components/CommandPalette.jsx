import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { buildIndex, search, excerpt } from '../lib/search.js';
import { Search } from './Icons.jsx';
import '../styles/palette.css';

const SUGGESTED = ['OTP', 'phishing', 'password', 'UPI', 'fake profile', 'cyberbullying', '1930'];

function Highlight({ text, query }) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return text;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

/** Site search dialog, opened with Ctrl+K, Cmd+K or /. */
export default function CommandPalette({ onClose }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const id = useId();

  useEffect(() => {
    inputRef.current?.focus();
    buildIndex().then(setIndex).catch(() => setIndex([]));
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const results = useMemo(() => (index ? search(index, query) : []), [index, query]);
  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (r) => {
    if (!r) return;
    onClose();
    navigate(r.to);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[active]); }
    else if (e.key === 'Tab') { e.preventDefault(); }
  };

  return (
    <div className="palette-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Search CyberSafe School" onKeyDown={onKeyDown}>
        <div className="palette-input">
          <Search />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={`${id}-list`}
            aria-activedescendant={results.length ? `${id}-${active}` : undefined}
            aria-autocomplete="list"
            placeholder="Search lessons, tips, terms and tools"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd>Esc</kbd>
        </div>

        <div className="palette-body" ref={listRef}>
          {!query && (
            <div className="palette-empty">
              <p>Try searching for</p>
              <div className="palette-suggest">
                {SUGGESTED.map((s) => <button key={s} type="button" onClick={() => setQuery(s)}>{s}</button>)}
              </div>
            </div>
          )}
          {query && index === null && <p className="palette-status">Loading the index…</p>}
          {query && index && results.length === 0 && (
            <p className="palette-status">No results for “{query}”. Try a simpler word, like “password” or “scam”.</p>
          )}
          {results.length > 0 && (
            <ul id={`${id}-list`} role="listbox" aria-label="Results">
              {results.map((r, i) => (
                <li
                  key={`${r.to}-${r.title}`}
                  id={`${id}-${i}`}
                  data-i={i}
                  role="option"
                  aria-selected={i === active}
                  className={`palette-item${i === active ? ' is-active' : ''}`}
                  data-world={r.world}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(r)}
                >
                  <span className="palette-type">{r.type}</span>
                  <span className="palette-main">
                    <span className="palette-title"><Highlight text={r.title} query={query} /></span>
                    <span className="palette-text"><Highlight text={excerpt(r.text, query)} query={query} /></span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="palette-foot" aria-hidden="true">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to move</span>
          <span><kbd>Enter</kbd> to open</span>
          <span><kbd>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
