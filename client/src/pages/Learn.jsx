import { Link } from 'react-router';
import { useModules } from '../lib/content.js';
import { useProgress, clearProgress } from '../lib/progress.js';
import { OfflineNotice, PageHead } from '../components/Layout.jsx';
import groups from '@shared/content/groups.js';
import ChapterIcon from '../components/ChapterIcon.jsx';
import '../styles/pages.css';

export function ChapterRow({ m, progress, to, meta }) {
  const p = progress[m.id];
  return (
    <li data-world={m.group}>
      <Link to={to || `/learn/${m.id}`} className="contents-row">
        <span className="contents-n">{String(m.number).padStart(2, '0')}</span>
        <span className="contents-body">
          <span className="contents-title">{m.title}</span>
          <span className="contents-summary">{m.summary}</span>
        </span>
        <span className="contents-meta">
          <span className="topic-icon"><ChapterIcon id={m.id} /></span>
          <span className={p ? 'is-done' : ''}>{p ? `Best ${p.best}%` : meta || `${m.minutes} min`}</span>
        </span>
      </Link>
    </li>
  );
}

export function ProgressSummary({ modules, progress }) {
  const done = modules.filter((m) => progress[m.id]).length;
  return (
    <div className="progress-summary">
      <p className="progress-count"><strong>{done}</strong> / {modules.length} quizzes done</p>
      <div className="progress-text">
        <div className="progress" role="progressbar" aria-label="Chapters completed" aria-valuemin={0} aria-valuemax={modules.length} aria-valuenow={done}>
          <span style={{ width: `${(done / modules.length) * 100}%` }} />
        </div>
        <p className="muted small">Scores are stored only in this browser. Nobody else can see them.</p>
      </div>
      {done > 0 && (
        <button
          type="button"
          className="link-button"
          onClick={() => { if (window.confirm('Clear all quiz scores saved on this device?')) clearProgress(); }}
        >
          Clear my saved scores
        </button>
      )}
      <span className="progress-links"><Link to="/progress" className="cert-link">My progress</Link> <Link to="/glossary" className="cert-link">Glossary</Link> <Link to="/certificate" className="cert-link">Certificate</Link></span>
    </div>
  );
}

export default function Learn() {
  const { status, data: modules, error, offline } = useModules();
  const progress = useProgress();

  return (
    <>
      {offline && <OfflineNotice />}
      <PageHead
        title="Ten chapters on staying safe online"
        lead="Read a chapter, then take its quiz. Start with the foundations if you are new, or go straight to the topic you need today."
      />
      <div className="container section-tight">
        {status === 'loading' && <div className="skeleton" style={{ height: 400 }} aria-hidden="true" />}
        {status === 'error' && <p className="notice notice-error">{error.message}</p>}
        {status === 'ready' && (
          <>
            <ProgressSummary modules={modules} progress={progress} />
            {groups.map((g) => {
              const items = modules.filter((m) => m.group === g.id);
              if (!items.length) return null;
              return (
                <section key={g.id} className="group" data-world={g.id} aria-labelledby={`g-${g.id}`}>
                  <div className="group-head">
                    <h2 id={`g-${g.id}`}>{g.title}</h2>
                    <p className="muted">{g.text}</p>
                  </div>
                  <ol className="contents">
                    {items.map((m) => <ChapterRow key={m.id} m={m} progress={progress} />)}
                  </ol>
                </section>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
