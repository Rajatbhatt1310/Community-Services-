import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { PageHead, PageLoading } from '../components/Layout.jsx';
import QuizQuestion from '../components/QuizQuestion.jsx';
import ChapterIcon from '../components/ChapterIcon.jsx';
import { loadAllModules } from '../lib/content.js';
import { useProgress, useMistakes, recordAnswers, clearProgress, PASS_MARK } from '../lib/progress.js';
import { prepareQuestion } from '../lib/quiz.js';
import groups from '@shared/content/groups.js';
import '../styles/progress.css';

export default function Progress() {
  const [modules, setModules] = useState(null);
  const [error, setError] = useState('');
  const progress = useProgress();
  const mistakes = useMistakes();
  // The practice set is fixed when it starts, so answering does not reshuffle it.
  const [practising, setPractising] = useState(null);

  useEffect(() => {
    loadAllModules().then(setModules).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="container section"><p className="notice notice-error">{error}</p></div>;
  if (!modules) return <PageLoading />;

  const taken = modules.filter((m) => progress[m.id]);
  const passed = modules.filter((m) => (progress[m.id]?.best ?? 0) >= PASS_MARK);
  const average = taken.length ? Math.round(taken.reduce((s, m) => s + progress[m.id].best, 0) / taken.length) : null;
  const mistakeIds = Object.keys(mistakes).filter((qid) => modules.some((m) => m.questions.some((q) => q.id === qid)));
  const next = modules.find((m) => (progress[m.id]?.best ?? 0) < PASS_MARK);

  if (practising) {
    return <Practice modules={modules} qids={practising} onDone={() => setPractising(null)} />;
  }

  return (
    <>
      <PageHead
        title="My progress"
        lead="Your scores and the questions worth another look. Everything here is stored only in this browser, so nobody else can see it."
      />
      <div className="container section-tight progress-page">
        <dl className="pg-overview">
          <div><dt>Chapters passed</dt><dd>{passed.length}<small> / {modules.length}</small></dd></div>
          <div><dt>Average best score</dt><dd>{average === null ? 'None yet' : `${average}%`}</dd></div>
          <div><dt>Questions to practise</dt><dd>{mistakeIds.length}</dd></div>
        </dl>

        <div className="pg-grid">
          <section className="pg-next" aria-labelledby="next-title">
            <h2 id="next-title">Your next step</h2>
            {mistakeIds.length > 0 && (
              <div className="pg-action">
                <p>You have <strong>{mistakeIds.length}</strong> {mistakeIds.length === 1 ? 'question' : 'questions'} you answered wrongly. Practising them is the fastest way to improve.</p>
                <button type="button" className="btn btn-accent" onClick={() => setPractising(mistakeIds)}>Practise my mistakes</button>
              </div>
            )}
            {next ? (
              <div className="pg-action" data-world={next.group}>
                <p>{progress[next.id] ? `Your best in “${next.title}” is ${progress[next.id].best}%. Read it again and aim for ${PASS_MARK}% or more.` : `Start chapter ${next.number}: “${next.title}”.`}</p>
                <div className="btn-row">
                  <Link to={`/learn/${next.id}`} className="btn">Read the chapter</Link>
                  <Link to={`/quizzes/${next.id}`} className="btn btn-ghost">Take the quiz</Link>
                </div>
              </div>
            ) : (
              <div className="pg-action">
                <p>You passed every chapter. Your certificate is ready.</p>
                <Link to="/certificate" className="btn btn-accent">Get my certificate</Link>
              </div>
            )}
          </section>

          <section aria-labelledby="topics-title">
            <h2 id="topics-title">By topic</h2>
            <ul className="pg-topics">
              {groups.map((g) => {
                const items = modules.filter((m) => m.group === g.id);
                const done = items.filter((m) => progress[m.id]);
                const avg = done.length ? Math.round(done.reduce((s, m) => s + progress[m.id].best, 0) / done.length) : 0;
                return (
                  <li key={g.id} data-world={g.id}>
                    <span className="pg-topic-name">{g.title}</span>
                    <span className="pg-bar" aria-hidden="true"><span style={{ width: `${avg}%` }} /></span>
                    <span className="pg-topic-val">{done.length ? `${avg}%` : 'Not started'}</span>
                  </li>
                );
              })}
            </ul>
            <p className="muted small">Average best quiz score in each topic, counting only chapters you have tried.</p>
          </section>
        </div>

        <section className="pg-table-wrap" aria-labelledby="chapters-title">
          <h2 id="chapters-title">Every chapter</h2>
          <div className="table-scroll" role="region" aria-labelledby="chapters-title" tabIndex={0}>
            <table className="pg-table">
              <thead>
                <tr><th scope="col">Chapter</th><th scope="col" className="num">Attempts</th><th scope="col" className="num">Best</th><th scope="col" className="num">Last</th><th scope="col">Status</th></tr>
              </thead>
              <tbody>
                {modules.map((m) => {
                  const p = progress[m.id];
                  const ok = (p?.best ?? 0) >= PASS_MARK;
                  return (
                    <tr key={m.id} data-world={m.group}>
                      <th scope="row"><Link to={`/learn/${m.id}`} className="pg-chapter"><span className="topic-icon"><ChapterIcon id={m.id} /></span>{m.title}</Link></th>
                      <td className="num">{p?.attempts ?? 0}</td>
                      <td className="num">{p ? `${p.best}%` : '-'}</td>
                      <td className="num">{p ? `${p.last}%` : '-'}</td>
                      <td>{ok ? <span className="pg-status is-ok">Passed</span> : p ? <Link to={`/quizzes/${m.id}`}>Try again</Link> : <Link to={`/quizzes/${m.id}`}>Not taken</Link>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {taken.length > 0 && (
          <button
            type="button"
            className="link-button"
            onClick={() => { if (window.confirm('Clear all scores and practice questions saved on this device?')) clearProgress(); }}
          >
            Clear my saved progress
          </button>
        )}
      </div>
    </>
  );
}

function Practice({ modules, qids, onDone }) {
  const questions = useMemo(() => {
    const all = modules.flatMap((m) => m.questions.map((q) => ({ q, m })));
    return qids.map((id) => all.find((x) => x.q.id === id)).filter(Boolean).map(({ q, m }) => ({ ...prepareQuestion(q), module: m }));
  }, [modules, qids]);
  const [i, setI] = useState(0);
  const [cleared, setCleared] = useState(0);

  if (questions.length === 0 || i >= questions.length) {
    return (
      <section className="container section practice-done">
        <h1>{questions.length ? `You cleared ${cleared} of ${questions.length}.` : 'Nothing to practise.'}</h1>
        <p className="lead">{cleared === questions.length ? 'Every question you had missed is now answered correctly.' : 'Questions you got wrong again stay on your list for next time.'}</p>
        <button type="button" className="btn btn-accent" onClick={onDone}>Back to my progress</button>
      </section>
    );
  }

  const q = questions[i];
  return (
    <section className="container section practice" aria-label="Practise my mistakes">
      <p className="crumb"><button type="button" className="link-button" onClick={onDone}>My progress</button> <span aria-hidden="true">/</span> Practice</p>
      <p className="practice-from" data-world={q.module.group}>From “{q.module.title}”</p>
      <QuizQuestion
        key={q.id}
        question={q}
        index={i}
        total={questions.length}
        nextLabel={i === questions.length - 1 ? 'Finish' : 'Next question'}
        onAnswer={(_, correct) => {
          recordAnswers(q.module.id, [{ qid: q.id, correct }]);
          if (correct) setCleared((c) => c + 1);
        }}
        onNext={() => setI((n) => n + 1)}
      />
    </section>
  );
}
