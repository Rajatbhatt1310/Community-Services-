import { useId, useMemo, useState } from 'react';
import { xray } from '../../lib/linkxray.js';

const EXAMPLES = [
  { label: 'Fake bank KYC', url: 'http://sbi.co.in.secure-login.top/kyc-update' },
  { label: 'Game giveaway', url: 'https://ff-diamonds-free.site/claim?uid=8841' },
  { label: 'Hidden @ trick', url: 'https://www.google.com@192.168.4.20/login' },
  { label: 'Lookalike spelling', url: 'https://paytrn.com/login' },
  { label: 'Real CBSE site', url: 'https://www.cbse.gov.in/' },
];

const SEVERITY = { high: 'Serious', medium: 'Warning', low: 'Note', info: 'Info' };

export default function LinkXray() {
  const [value, setValue] = useState('');
  const id = useId();
  const result = useMemo(() => (value.trim() ? xray(value) : null), [value]);

  return (
    <div className="tool xr-tool">
      <div className="tool-intro">
        <h2>Link X-ray</h2>
        <p>Paste a link from a message to see who really owns it and how it might be trying to fool you. The link is only read, never opened.</p>
      </div>

      <label htmlFor={`${id}-url`} className="tool-label">Paste a link</label>
      <input
        id={`${id}-url`}
        className="tool-input mono"
        type="url"
        inputMode="url"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="https://"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <div className="pw-examples" aria-label="Example links">
        <span>Try:</span>
        {EXAMPLES.map((e) => (
          <button key={e.label} type="button" className="chip" onClick={() => setValue(e.url)}>{e.label}</button>
        ))}
      </div>

      <div className="xr-result" aria-live="polite">
        {!result && <p className="tool-empty">The breakdown appears here.</p>}
        {result?.error && <p className="notice notice-error">{result.error}</p>}
        {result && !result.error && (
          <>
            <div className="xr-anatomy" aria-label="The parts of this link">
              {result.parts.scheme && <span className="xr-part xr-scheme"><small>scheme</small>{result.parts.scheme}://</span>}
              {result.parts.sub && <span className="xr-part xr-sub"><small>can be anything</small>{result.parts.sub}.</span>}
              <span className="xr-part xr-owner"><small>real owner</small>{result.owner}</span>
              {result.parts.port && <span className="xr-part xr-path"><small>port</small>:{result.parts.port}</span>}
              {result.parts.path && <span className="xr-part xr-path"><small>page</small>{result.parts.path}</span>}
              {result.parts.query && <span className="xr-part xr-path"><small>extra data</small>{result.parts.query}</span>}
            </div>
            <p className="xr-owner-line">This link really goes to <strong className="mono">{result.owner}</strong>. The owner is the part just before the ending, read from the right.</p>

            <div className={`xr-verdict is-${result.verdict.key}`}>
              <p className="xr-verdict-label">{result.verdict.label}</p>
              <p>{result.verdict.text}</p>
            </div>

            {result.flags.length > 0 && (
              <ul className="xr-flags">
                {result.flags.map((f) => (
                  <li key={f.title} className={`sev-${f.severity}`}>
                    <span className="xr-sev">{SEVERITY[f.severity]}</span>
                    <div>
                      <p className="xr-flag-title">{f.title}</p>
                      <p>{f.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      <p className="tool-foot">X-ray checks for common tricks. It cannot see what is on the page, so a link with no warnings can still be a scam. When in doubt, open the official app instead.</p>
    </div>
  );
}
