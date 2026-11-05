import { useDeferredValue, useId, useMemo, useState } from 'react';
import { analyse, generatePassphrase } from '../../lib/password.js';
import { Check, Alert } from '../Icons.jsx';

const EXAMPLES = ['rahul2009', 'Cricket@123', 'qwerty12345', 'tiger-mango-quilt-harbor', 'P@ssw0rd!'];
const LEVEL_COLORS = ['#e2836f', '#e9a06f', '#e9bf7c', '#9fd8b4', '#8cc4f5'];

export default function PasswordLab() {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(true);
  const [words, setWords] = useState(5);
  const id = useId();
  const deferred = useDeferredValue(pw);
  const result = useMemo(() => analyse(deferred), [deferred]);

  const level = result?.level.key ?? -1;

  return (
    <div className="tool pw-tool">
      <div className="tool-intro">
        <h2>Password Lab</h2>
        <p>See a password the way an attacker does. Type a <strong>made-up</strong> password, never your real one. Everything is worked out on this device and nothing you type is saved or sent.</p>
      </div>

      <div className="pw-input-wrap">
        <label htmlFor={`${id}-pw`} className="tool-label">Try a password</label>
        <div className="pw-input-row">
          <input
            id={`${id}-pw`}
            className="tool-input mono"
            type={show ? 'text' : 'password'}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Type a made-up password"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            maxLength={128}
          />
          <button type="button" className="tool-mini" onClick={() => setShow((s) => !s)} aria-pressed={!show}>
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="pw-examples" aria-label="Example passwords to try">
          <span>Try:</span>
          {EXAMPLES.map((e) => (
            <button key={e} type="button" className="chip mono" onClick={() => setPw(e)}>{e}</button>
          ))}
        </div>
      </div>

      <div className="pw-meter" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ background: i <= level ? LEVEL_COLORS[level] : undefined }} className={i <= level ? 'is-on' : ''} />
        ))}
      </div>

      <div className="pw-result" aria-live="polite">
        {!result ? (
          <p className="tool-empty">Start typing to see how long your password would last.</p>
        ) : (
          <>
            <div className="pw-headline">
              <p className="pw-level" style={{ color: LEVEL_COLORS[level] }}>{result.level.label}</p>
              <p className="pw-time">
                Time to crack: <strong>{result.slow}</strong>
              </p>
              <p className="pw-assume">
                If a website’s password list leaked and an attacker made 100,000 guesses a second. If the website stored passwords carelessly, it could be as little as <strong>{result.fast}</strong>.
              </p>
            </div>
            <dl className="pw-stats">
              <div><dt>Length</dt><dd>{result.length}</dd></div>
              <div><dt>Strength</dt><dd>{result.bits} bits</dd></div>
              <div><dt>Character kinds</dt><dd>{result.kinds} of 4</dd></div>
            </dl>
            <ul className="pw-findings">
              {result.findings.map((f) => (
                <li key={f.text} className={f.bad ? 'is-bad' : 'is-good'}>
                  {f.bad ? <Alert /> : <Check />}
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="pw-gen">
        <div>
          <h3>Make one that is strong and memorable</h3>
          <p>A passphrase of random words is long, hard to guess and easy to remember. Your device picks the words using secure randomness.</p>
        </div>
        <div className="pw-gen-controls">
          <label htmlFor={`${id}-words`} className="tool-label">Words: {words}</label>
          <input id={`${id}-words`} type="range" min={4} max={7} value={words} onChange={(e) => setWords(Number(e.target.value))} />
          <button type="button" className="btn btn-accent" onClick={() => { setPw(generatePassphrase(words).phrase); setShow(true); }}>
            Generate a passphrase
          </button>
        </div>
      </div>
      <p className="tool-foot">This is an estimate to help you learn, not a guarantee. A strong password still needs two-step verification and must never be reused.</p>
    </div>
  );
}
