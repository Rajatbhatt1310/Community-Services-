import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { api } from '../../lib/api.js';

export default function Dashboard({ onExpired }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/admin/stats')
      .then(setStats)
      .catch((err) => (err.status === 401 ? onExpired() : setError(err.message)));
  }, [onExpired]);

  if (error) return <div className="container section"><p className="notice notice-error">{error}</p></div>;
  if (!stats) {
    return (
      <div className="container section" aria-busy="true">
        <div className="skeleton" style={{ height: 120 }} />
        <span className="visually-hidden" role="status">Loading statistics</span>
      </div>
    );
  }

  const maxDay = Math.max(1, ...stats.recent.map((d) => d.attempts));

  return (
    <div className="container section-admin">
      <div className="admin-head">
        <h1>Dashboard</h1>
        <Link to="/admin/modules/new" className="btn btn-sm">Add a module</Link>
      </div>

      <dl className="kpis">
        <div><dt>Quiz attempts</dt><dd>{stats.totalAttempts}</dd></div>
        <div><dt>Average score</dt><dd>{stats.averagePercent === null ? 'No data' : `${stats.averagePercent}%`}</dd></div>
        <div><dt>Modules</dt><dd>{stats.modules.length}</dd></div>
      </dl>

      {stats.totalAttempts === 0 && (
        <p className="notice notice-info admin-gap">No quizzes have been completed yet. Statistics appear here after students finish a quiz.</p>
      )}

      <section className="admin-section" aria-labelledby="by-module">
        <h2 id="by-module">Modules and average scores</h2>
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Module</th>
                <th scope="col" className="num">Attempts</th>
                <th scope="col">Average score</th>
                <th scope="col"><span className="visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {stats.modules.map((m) => (
                <tr key={m.id}>
                  <th scope="row"><span className="muted">{m.number}.</span> {m.title}</th>
                  <td className="num">{m.attempts}</td>
                  <td>
                    {m.averagePercent === null ? (
                      <span className="muted">No attempts</span>
                    ) : (
                      <span className="meter" title={`${m.averagePercent}% average across ${m.attempts} attempts`}>
                        <span className="meter-track"><span className="meter-fill" style={{ width: `${m.averagePercent}%` }} /></span>
                        <span className="meter-value">{m.averagePercent}%</span>
                      </span>
                    )}
                  </td>
                  <td className="actions"><Link to={`/admin/modules/${m.id}`}>Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-section" aria-labelledby="recent">
        <h2 id="recent">Quiz attempts, last 14 days</h2>
        <div className="day-bars" role="img" aria-label={stats.recent.map((d) => `${d.day}: ${d.attempts}`).join(', ')}>
          {stats.recent.map((d) => (
            <div key={d.day} className="day" title={`${d.day}: ${d.attempts} attempts`}>
              <span className="day-count">{d.attempts || ''}</span>
              <span className="day-bar" style={{ height: `${(d.attempts / maxDay) * 100}%` }} />
              <span className="day-label">{d.day.slice(8)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section" aria-labelledby="hardest">
        <h2 id="hardest">Questions answered correctly least often</h2>
        {stats.hardestQuestions.length === 0 ? (
          <p className="muted">No answers recorded yet.</p>
        ) : (
          <ol className="hard-list">
            {stats.hardestQuestions.map((q) => (
              <li key={q.qid}>
                <p className="hard-rate"><strong>{q.correctRate}%</strong> correct of {q.seen}</p>
                <p className="hard-prompt">{q.prompt}</p>
                <p className="muted small">{q.moduleTitle} <Link to={`/admin/modules/${q.moduleId}#q-${q.qid}`}>Edit question</Link></p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
