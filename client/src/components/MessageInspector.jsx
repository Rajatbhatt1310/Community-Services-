import { useState } from 'react';
import { Link } from 'react-router';
import '../styles/inspector.css';

// A practice phishing SMS. Every phrase can be inspected; five of them are warning signs.
// The bank and link are invented for this exercise.
const SEGMENTS = [
  { text: 'Dear customer,', flag: { title: 'Generic greeting', why: 'Your real bank knows your name. Mass scam messages do not.' } },
  { text: ' your NationBank account will be ' },
  { text: 'BLOCKED today', flag: { title: 'A threat', why: 'Fear of losing something pushes you to act before you think.' } },
  { text: '. Update your KYC ' },
  { text: 'within 2 hours', flag: { title: 'A deadline', why: 'Real organisations give you time to check. Scams cannot afford to.' } },
  { text: ' at ' },
  { text: 'nationbank-kyc-update.co/verify', flag: { title: 'A lookalike link', why: 'The bank’s real address would be nationbank.com. Extra words and a different ending give it away.' } },
  { text: '. ' },
  { text: 'Share the OTP you receive', flag: { title: 'A request for your OTP', why: 'No bank, app or official will ever ask for it. An OTP is the final key to your account.' } },
  { text: ' to confirm. NationBank Team' },
];
const FLAGS = SEGMENTS.map((s, i) => (s.flag ? i : null)).filter((i) => i !== null);

/**
 * The homepage's working exercise, staged like a product shot:
 * a phone with the message on the left, annotations filling in on the right.
 */
export default function MessageInspector() {
  const [found, setFound] = useState(() => new Set());
  const [last, setLast] = useState(null);

  const inspect = (i) => {
    setLast(i);
    if (SEGMENTS[i].flag) setFound((f) => new Set(f).add(i));
  };
  const revealAll = () => { setFound(new Set(FLAGS)); setLast(null); };
  const reset = () => { setFound(new Set()); setLast(null); };

  const done = found.size === FLAGS.length;
  const lastSeg = last !== null ? SEGMENTS[last] : null;

  return (
    <section className={`stage${done ? ' is-done' : ''}`} aria-labelledby="inspector-title">
      <div className="stage-device">
        <div className="device">
          <div className="device-status" aria-hidden="true"><span>9:41</span><span className="device-notch" /><span>5G</span></div>
          <div className="device-head">
            <span className="device-avatar" aria-hidden="true">NB</span>
            <span>
              <strong>NB-ALERT</strong>
              <small>Text message</small>
            </span>
          </div>
          <div className="device-screen">
            <p className="device-time">Today 9:41 AM</p>
            <p className="sms-bubble">
              {SEGMENTS.map((s, i) => {
                const n = FLAGS.indexOf(i) + 1;
                return (
                  <span
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-pressed={found.has(i)}
                    className={`seg${found.has(i) ? ' is-flagged' : ''}${last === i && !s.flag ? ' is-clear' : ''}`}
                    onClick={() => inspect(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        inspect(i);
                      }
                    }}
                  >
                    {found.has(i) && <span className="seg-n" aria-hidden="true">{n}</span>}
                    {s.text}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
        <p className="stage-note">Practice message written for this lesson. NationBank is not a real bank.</p>
      </div>

      <div className="stage-notes">
        <h2 id="inspector-title" className="stage-title">Find the five warning signs</h2>
        <p className="stage-help">Tap any part of the message that looks suspicious.</p>

        <ol className="notes">
          {FLAGS.map((i, k) => {
            const f = SEGMENTS[i].flag;
            const on = found.has(i);
            return (
              <li key={i} className={on ? 'is-on' : ''}>
                <span className="note-n">{k + 1}</span>
                {on ? (
                  <span className="note-body"><strong>{f.title}.</strong> {f.why}</span>
                ) : (
                  <span className="note-body note-hidden">Not found yet</span>
                )}
              </li>
            );
          })}
        </ol>

        <p className="stage-status" aria-live="polite">
          {done ? (
            <>All five found. The safe move is to ignore the link and check your account in the bank’s official app. <Link to="/learn/phishing-and-online-scams">Read the phishing chapter</Link></>
          ) : lastSeg && !lastSeg.flag ? (
            'That part looks ordinary. Keep looking.'
          ) : (
            <span className="visually-hidden">{found.size} of {FLAGS.length} found</span>
          )}
        </p>

        <div className="stage-actions">
          <span className="stage-count"><strong>{found.size}</strong> of {FLAGS.length} found</span>
          {done ? (
            <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>Start again</button>
          ) : (
            <button type="button" className="btn btn-ghost btn-sm" onClick={revealAll}>Show all signs</button>
          )}
        </div>
      </div>
    </section>
  );
}
