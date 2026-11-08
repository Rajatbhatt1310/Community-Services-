import { useCallback, useEffect, useRef, useState } from 'react';
import { Check } from './Icons.jsx';
import '../styles/class-mode.css';

const LETTERS = ['A', 'B', 'C', 'D'];
const TIMER = 20;

/**
 * Projector view for running a quiz with a whole class.
 * The presenter reveals answers; nothing is scored or saved.
 */
export default function ClassMode({ mod, questions, onExit }) {
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [left, setLeft] = useState(null);
  const rootRef = useRef(null);
  const q = questions[i];

  const go = useCallback((d) => {
    setI((n) => Math.max(0, Math.min(questions.length - 1, n + d)));
    setRevealed(false);
    setLeft(null);
  }, [questions.length]);

  const exit = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    onExit();
  }, [onExit]);

  useEffect(() => {
    const el = rootRef.current;
    el?.focus();
    el?.requestFullscreen?.().catch(() => {});
    return () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); };
  }, []);

  useEffect(() => {
    if (left === null || left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key.toLowerCase() === 'r') { e.preventDefault(); setRevealed((r) => !r); }
      else if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
      else if (e.key.toLowerCase() === 't') { e.preventDefault(); setLeft(TIMER); }
      else if (e.key === 'Escape' && !document.fullscreenElement) exit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, exit]);

  // Leaving browser fullscreen with Esc also leaves class mode.
  useEffect(() => {
    let wasFull = false;
    const onChange = () => {
      if (document.fullscreenElement) wasFull = true;
      else if (wasFull) onExit();
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, [onExit]);

  return (
    <div className="class-mode" ref={rootRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${mod.title}: class mode`}>
      <header className="cm-top">
        <span className="cm-title">{mod.title}</span>
        <span className="cm-count">Question {i + 1} / {questions.length}</span>
        <div className="cm-dots" aria-hidden="true">
          {questions.map((x, n) => <span key={x.id} className={n === i ? 'is-now' : n < i ? 'is-past' : ''} />)}
        </div>
      </header>

      <main className="cm-stage">
        <h2 className="cm-prompt" aria-live="polite">{q.prompt}</h2>
        <ol className="cm-options">
          {q.options.map((text, k) => {
            const correct = k === q.answer;
            return (
              <li key={k} className={`cm-opt opt-${k}${revealed ? (correct ? ' is-correct' : ' is-faded') : ''}`}>
                <span className="cm-letter">{LETTERS[k]}</span>
                <span className="cm-text">{text}</span>
                {revealed && correct && <span className="cm-tick"><Check /> Correct</span>}
              </li>
            );
          })}
        </ol>
        <div className="cm-explain" aria-live="polite">
          {revealed && <p>{q.explanation}</p>}
        </div>
      </main>

      <footer className="cm-controls">
        <div className="cm-timer" aria-live="off">
          {left !== null && (
            <>
              <span className="cm-timer-bar"><span style={{ width: `${(left / TIMER) * 100}%` }} /></span>
              <span className="cm-timer-num">{left > 0 ? `${left}s` : 'Time is up'}</span>
            </>
          )}
        </div>
        <div className="cm-buttons">
          <button type="button" onClick={() => go(-1)} disabled={i === 0}>Previous</button>
          <button type="button" onClick={() => setLeft(TIMER)}>Start {TIMER}s timer</button>
          <button type="button" className="cm-primary" onClick={() => setRevealed((r) => !r)}>{revealed ? 'Hide answer' : 'Reveal answer'}</button>
          <button type="button" onClick={() => go(1)} disabled={i === questions.length - 1}>Next</button>
          <button type="button" onClick={exit}>Exit</button>
        </div>
        <p className="cm-keys">Keys: Space reveal, arrows move, T timer, Esc exit</p>
      </footer>
    </div>
  );
}
