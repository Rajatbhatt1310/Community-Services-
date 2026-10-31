import { useState } from 'react';
import { Link } from 'react-router';
import { PageHead } from '../components/Layout.jsx';
import tips from '@shared/content/tips.js';
import '../styles/pages.css';

const dayIndex = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000) % tips.length;
};

export default function Tips() {
  const [offset, setOffset] = useState(0);
  const today = dayIndex();
  const tip = tips[(today + offset) % tips.length];

  return (
    <>
      <PageHead
        title="Cyber safety tips"
        lead="Ten habits that prevent most of the problems students face online. Each one takes a few minutes to set up and protects you every day after."
      />

      <section className="band-dark daily" aria-labelledby="daily-title">
        <div className="container daily-grid">
          <div>
            <h2 id="daily-title" className="daily-label">{offset === 0 ? 'Tip of the day' : 'Another tip'}</h2>
            <p className="daily-tip" aria-live="polite">{tip.title}</p>
          </div>
          <div className="daily-body">
            <p>{tip.why}</p>
            <p>{tip.how}</p>
            <div className="btn-row">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOffset((o) => (o + 1) % tips.length)}>Show another tip</button>
              <a href={`#${tip.id}`} className="btn btn-ghost btn-sm">Find it in the list</a>
            </div>
          </div>
        </div>
      </section>

      <div className="container section-tight">
        <p className="notice notice-info tips-checkup">Ready to act on these? The <Link to="/check-up">safety check-up</Link> turns them into a checklist you can tick off.</p>
        <ul className="tip-list">
          {tips.map((t) => (
            <li key={t.id} id={t.id} className="tip">
              <h2>{t.title}</h2>
              <div className="tip-body">
                <div>
                  <h3>Why it matters</h3>
                  <p>{t.why}</p>
                </div>
                <div>
                  <h3>How to do it</h3>
                  <p>{t.how}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
