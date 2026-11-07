import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import scenarios from '@shared/content/scenarios.js';
import { Check, Cross } from '../Icons.jsx';

const ROUND = 12;
const SWIPE = 110;

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Wraps each cue in the text with a numbered highlight. */
function highlight(text, cues, offset = 0) {
  const marks = [];
  cues.forEach((c, i) => {
    const at = text.indexOf(c.text);
    if (at !== -1) marks.push({ at, end: at + c.text.length, n: i + 1 + offset });
  });
  marks.sort((a, b) => a.at - b.at);
  const out = [];
  let pos = 0;
  for (const m of marks) {
    if (m.at < pos) continue;
    out.push(text.slice(pos, m.at));
    out.push(<mark key={m.at} className="cue"><span className="cue-n" aria-hidden="true">{m.n}</span>{text.slice(m.at, m.end)}</mark>);
    pos = m.end;
  }
  out.push(text.slice(pos));
  return out;
}

export default function ScamOrSafe() {
  const [round, setRound] = useState(0);
  const deck = useMemo(() => shuffle(scenarios).slice(0, Math.min(ROUND, scenarios.length)), [round]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef(null);
  const verdictRef = useRef(null);
  const toolRef = useRef(null);

  const done = i >= deck.length;
  const card = deck[i];
  const score = answers.filter((a) => a.correct).length;

  const choose = useCallback((guess) => {
    if (revealed || done) return;
    const correct = guess === card.verdict;
    setAnswers((a) => [...a, { id: card.id, guess, correct }]);
    setRevealed(true);
    setDrag(0);
  }, [revealed, done, card]);

  const next = useCallback(() => {
    setRevealed(false);
    setI((n) => n + 1);
  }, []);

  useEffect(() => {
    if (revealed) verdictRef.current?.focus({ preventScroll: true });
  }, [revealed]);

  const onKey = (e) => {
    if (e.target.closest('input, textarea')) return;
    if (!revealed && e.key === 'ArrowLeft') { e.preventDefault(); choose('scam'); }
    else if (!revealed && e.key === 'ArrowRight') { e.preventDefault(); choose('safe'); }
    else if (revealed && (e.key === 'Enter' || e.key === 'ArrowRight') && e.target.tagName !== 'BUTTON') { e.preventDefault(); next(); }
  };

  const restart = () => {
    setRound((r) => r + 1);
    setI(0);
    setAnswers([]);
    setRevealed(false);
    toolRef.current?.focus();
  };

  if (done) {
    const pct = Math.round((score / deck.length) * 100);
    const missed = answers.filter((a) => !a.correct).map((a) => deck.find((c) => c.id === a.id));
    return (
      <div className="tool sos-tool" ref={toolRef} tabIndex={-1}>
        <div className="sos-done">
          <p className="sos-score"><span>{score}</span>/{deck.length}</p>
          <h2>{pct >= 80 ? 'Sharp eyes. Scammers would struggle with you.' : pct >= 50 ? 'Good instincts. A few tricks got past you.' : 'Scammers count on rushing. Slow down and look for the clues.'}</h2>
          {missed.length > 0 && (
            <ul className="sos-missed">
              {missed.map((c) => (
                <li key={c.id}>
                  <strong>{c.channel} from {c.from}:</strong> it was <em>{c.verdict}</em>. {c.explanation}
                </li>
              ))}
            </ul>
          )}
          <button type="button" className="btn btn-accent" onClick={restart}>Play again with new cards</button>
        </div>
      </div>
    );
  }

  const tilt = Math.max(-1, Math.min(1, drag / 220));
  const lean = drag < -40 ? 'scam' : drag > 40 ? 'safe' : null;
  const last = answers[answers.length - 1];

  return (
    <div className="tool sos-tool" ref={toolRef} tabIndex={-1} onKeyDown={onKey}>
      <div className="tool-intro">
        <h2>Scam or Safe?</h2>
        <p>Read each message and decide. Swipe left for scam and right for safe, use the buttons, or press the arrow keys. After each answer, the clues are highlighted on the message.</p>
      </div>

      <div className="sos-bar">
        <span>Card {i + 1} of {deck.length}</span>
        <span className="sos-track" aria-hidden="true">
          {deck.map((c, n) => (
            <span key={c.id} className={n < answers.length ? (answers[n].correct ? 'is-right' : 'is-wrong') : n === i ? 'is-now' : ''} />
          ))}
        </span>
        <span>Score {score}</span>
      </div>

      <div className="sos-stage">
        <article
          key={card.id}
          className={`sos-card${revealed ? ` is-revealed is-${card.verdict}` : ''}${lean ? ` lean-${lean}` : ''}`}
          style={!revealed ? { transform: `translateX(${drag}px) rotate(${tilt * 8}deg)` } : undefined}
          onPointerDown={(e) => {
            if (revealed || e.button !== 0) return;
            start.current = e.clientX;
            try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* capture is optional */ }
          }}
          onPointerMove={(e) => { if (start.current !== null) setDrag(e.clientX - start.current); }}
          onPointerUp={() => {
            if (start.current === null) return;
            start.current = null;
            if (drag <= -SWIPE) choose('scam');
            else if (drag >= SWIPE) choose('safe');
            else setDrag(0);
          }}
          onPointerCancel={() => { start.current = null; setDrag(0); }}
          aria-label={`${card.channel} message`}
        >
          <span className="sos-stamp stamp-scam" aria-hidden="true">Scam</span>
          <span className="sos-stamp stamp-safe" aria-hidden="true">Safe</span>
          <header className="sos-meta">
            <span className="sos-channel">{card.channel}</span>
            <span className="sos-from">{revealed ? highlight(card.from, card.cues) : card.from}</span>
          </header>
          {card.subject && <p className="sos-subject">{card.subject}</p>}
          <p className="sos-body">{revealed ? highlight(card.body, card.cues) : card.body}</p>
        </article>
      </div>

      {!revealed ? (
        <div className="sos-actions">
          <button type="button" className="sos-btn sos-btn-scam" onClick={() => choose('scam')}>
            <Cross /> Scam
          </button>
          <button type="button" className="sos-btn sos-btn-safe" onClick={() => choose('safe')}>
            <Check /> Safe
          </button>
        </div>
      ) : (
        <div className="sos-explain">
          <div ref={verdictRef} tabIndex={-1} className={`sos-verdict ${last.correct ? 'is-right' : 'is-wrong'}`} role="status">
            <p className="sos-verdict-title">
              {last.correct ? <Check /> : <Cross />}
              {last.correct ? 'Correct.' : 'Not this time.'} This message is {card.verdict === 'scam' ? 'a scam' : 'safe'}.
            </p>
            <p>{card.explanation}</p>
          </div>
          <ol className="sos-cues">
            {card.cues.map((c, n) => (
              <li key={c.text}>
                <span className="cue-n">{n + 1}</span>
                <span>{c.note}</span>
              </li>
            ))}
          </ol>
          {card.safeIf && <p className="sos-safeif">{card.safeIf}</p>}
          <button type="button" className="btn btn-accent" onClick={next}>
            {i === deck.length - 1 ? 'See my score' : 'Next message'}
          </button>
        </div>
      )}
    </div>
  );
}

