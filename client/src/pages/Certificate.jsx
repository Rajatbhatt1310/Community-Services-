import { useId, useState } from 'react';
import { Link } from 'react-router';
import { useModules } from '../lib/content.js';
import { useProgress, PASS_MARK } from '../lib/progress.js';
import { PageHead, PageLoading } from '../components/Layout.jsx';
import ChapterIcon from '../components/ChapterIcon.jsx';
import { Mark } from '../components/Logo.jsx';
import { Check } from '../components/Icons.jsx';
import '../styles/certificate.css';

export default function Certificate() {
  const { status, data: modules, error } = useModules();
  const progress = useProgress();
  const [name, setName] = useState('');
  const [sample, setSample] = useState(false);
  const id = useId();

  if (status === 'loading') return <PageLoading />;
  if (status === 'error') return <div className="container section"><p className="notice notice-error">{error.message}</p></div>;

  const passed = modules.filter((m) => (progress[m.id]?.best ?? 0) >= PASS_MARK);
  const eligible = passed.length === modules.length && modules.length > 0;
  const average = passed.length ? Math.round(passed.reduce((s, m) => s + progress[m.id].best, 0) / passed.length) : 0;
  const showCert = (eligible && name.trim()) || sample;
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <div className="no-print">
        <PageHead
          title="Your CyberSafe certificate"
          lead={`Score ${PASS_MARK}% or more in all ${modules.length} chapter quizzes to unlock a certificate you can print. Your progress and name stay on this device.`}
        />
      </div>

      <div className="container section-tight cert-page">
        <div className="no-print">
          <div className="cert-progress">
            <p className="cert-count"><strong>{passed.length}</strong> of {modules.length} chapters passed</p>
            <ol className="cert-grid">
              {modules.map((m) => {
                const best = progress[m.id]?.best;
                const ok = (best ?? 0) >= PASS_MARK;
                return (
                  <li key={m.id} data-world={m.group} className={ok ? 'is-ok' : ''}>
                    <Link to={ok ? `/learn/${m.id}` : `/quizzes/${m.id}`} className="cert-cell">
                      <span className="cert-icon">{ok ? <Check /> : <ChapterIcon id={m.id} />}</span>
                      <span className="cert-title">{m.title}</span>
                      <span className="cert-best">{best === undefined ? 'Not taken' : `Best ${best}%`}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>

          {eligible ? (
            <div className="cert-form">
              <label htmlFor={`${id}-name`}>Name to print on the certificate</label>
              <input id={`${id}-name`} value={name} maxLength={60} onChange={(e) => { setName(e.target.value); setSample(false); }} placeholder="Your full name" autoComplete="name" />
              <p className="muted small">Your name is only used to draw the certificate on this screen. It is not saved or sent anywhere.</p>
            </div>
          ) : (
            <div className="cert-locked">
              <p><strong>{modules.length - passed.length} more to go.</strong> Take the quizzes you have not passed yet. You can retry any quiz as many times as you like.</p>
              <div className="btn-row">
                <Link to="/quizzes" className="btn btn-accent">Go to quizzes</Link>
                <button type="button" className="btn btn-ghost" onClick={() => setSample((s) => !s)} aria-pressed={sample}>
                  {sample ? 'Hide the sample' : 'See a sample certificate'}
                </button>
              </div>
            </div>
          )}
        </div>

        {showCert && (
          <>
            <article className={`certificate${sample ? ' is-sample' : ''}`} aria-label="Certificate of completion">
              {sample && <span className="cert-watermark" aria-hidden="true">Sample</span>}
              <div className="cert-inner">
                <header className="cert-brand">
                  <Mark size={44} />
                  <span>CyberSafe School</span>
                </header>
                <p className="cert-kicker">Certificate of completion</p>
                <p className="cert-presented">This is to certify that</p>
                <p className="cert-name">{sample ? 'Your Name' : name.trim()}</p>
                <p className="cert-text">
                  has completed all {modules.length} chapters of the CyberSafe School cyber safety course, covering phishing, passwords, privacy, social media, cyberbullying, social engineering, identity theft, online gaming and ethical hacking, with an average best quiz score of <strong>{sample ? 85 : average}%</strong>.
                </p>
                <footer className="cert-foot">
                  <div><span className="cert-line">{today}</span><small>Date</small></div>
                  <div className="cert-motto">Learn. Verify. Protect. Report.</div>
                  <div><span className="cert-line">CyberSafe School</span><small>B.Tech community service initiative, K.R. Mangalam University</small></div>
                </footer>
                <p className="cert-disclaimer">Issued by the CyberSafe School student project for learning. This is not an official university qualification.</p>
              </div>
            </article>
            {!sample && (
              <div className="btn-row cert-actions no-print">
                <button type="button" className="btn btn-accent btn-lg" onClick={() => window.print()}>Print or save as PDF</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
