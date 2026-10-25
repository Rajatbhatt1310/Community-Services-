import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import ChapterIcon from '../components/ChapterIcon.jsx';
import ReadAloud from '../components/ReadAloud.jsx';
import { useModule, useModules } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { OfflineNotice, PageLoading } from '../components/Layout.jsx';
import { Alert, Check, Cross } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';
import tips from '@shared/content/tips.js';
import groups from '@shared/content/groups.js';
import '../styles/module.css';

/** Highlights the table-of-contents entry for the section being read. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

const paragraphs = (text) => text.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>);

export default function Module() {
  const { id } = useParams();
  const { status, data: mod, error, offline } = useModule(id);
  const { data: list } = useModules();
  const progress = useProgress();
  const tocIds = mod ? ['objectives', ...mod.sections.map((_, i) => 'part-' + (i + 1)), 'situations', 'warning-signs', 'do-and-dont', 'protect', 'takeaways', 'tips', 'quiz'] : [];
  const activeSection = useActiveSection(tocIds);

  if (status === 'loading') return <PageLoading />;
  if (status === 'error') {
    return <div className="container section"><p className="notice notice-error">{error.message}</p></div>;
  }
  if (!mod) return <NotFound />;

  const idx = list ? list.findIndex((m) => m.id === mod.id) : -1;
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;
  const related = mod.relatedTips.map((t) => tips.find((x) => x.id === t)).filter(Boolean);
  const best = progress[mod.id]?.best;

  const toc = [
    { id: 'objectives', label: 'What you will learn' },
    ...mod.sections.map((s, i) => ({ id: `part-${i + 1}`, label: s.heading })),
    mod.examples.length ? { id: 'situations', label: 'Real situations' } : null,
    { id: 'warning-signs', label: 'Warning signs' },
    { id: 'do-and-dont', label: 'Do and don’t' },
    { id: 'protect', label: 'How to protect yourself' },
    { id: 'takeaways', label: 'Key takeaways' },
    related.length ? { id: 'tips', label: 'Related safety tips' } : null,
    { id: 'quiz', label: 'Take the quiz' },
  ].filter(Boolean);

  return (
    <div className="module-page" data-world={mod.group}>
      {offline && <OfflineNotice />}
      <header className="module-head" id="chapter-top">
        <div className="container module-head-grid">
          <span className="module-icon" aria-hidden="true"><ChapterIcon id={mod.id} /></span>
          <div>
          <p className="crumb"><Link to="/learn">Learn</Link> <span aria-hidden="true">/</span> Chapter {mod.number} of {list?.length || 10}</p>
          <h1>{mod.title}</h1>
          <p className="module-intro">{mod.intro}</p>
          <ul className="module-meta" aria-label="About this chapter">
            <li className="is-topic">{groups.find((g) => g.id === mod.group)?.title}</li>
            <li>{mod.minutes} minute read</li>
            <li>{mod.questions.length} question quiz</li>
            {best !== undefined && <li className="is-best">Your best score: {best}%</li>}
          </ul>
          <ReadAloud
            parts={[
              { id: 'chapter-top', text: `${mod.title}. ${mod.intro}` },
              { id: 'objectives', text: `What you will learn. ${mod.objectives.join('. ')}` },
              ...mod.sections.map((sec, i) => ({ id: `part-${i + 1}`, text: `${sec.heading}. ${sec.body}` })),
              { id: 'warning-signs', text: `Warning signs. ${mod.warningSigns.join(' ')}` },
              { id: 'takeaways', text: `Key takeaways. ${mod.takeaways.join(' ')}` },
            ]}
          />
          </div>
        </div>
      </header>

      <div className="container module-layout">
        <nav className="module-toc" aria-label="In this chapter">
          <p className="toc-title">In this chapter</p>
          <ol>
            {toc.map((t) => (
              <li key={t.id}><a href={`#${t.id}`} aria-current={activeSection === t.id ? "location" : undefined}>{t.label}</a></li>
            ))}
          </ol>
        </nav>

        <article className="module-body">
          <section id="objectives" className="m-block objectives">
            <h2>What you will learn</h2>
            <ul className="square-list">
              {mod.objectives.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </section>

          {mod.sections.map((s, i) => (
            <section key={s.heading} id={`part-${i + 1}`} className="m-block prose">
              <h2>{s.heading}</h2>
              {paragraphs(s.body)}
            </section>
          ))}

          {mod.examples.length > 0 && (
            <section id="situations" className="m-block">
              <h2>Real situations</h2>
              <p className="m-note">These stories are typical of what students report. Names are made up.</p>
              <div className="situations">
                {mod.examples.map((e) => (
                  <figure key={e.title} className="situation">
                    <figcaption>{e.title}</figcaption>
                    <p>{e.text}</p>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section id="warning-signs" className="m-block">
            <h2>Warning signs</h2>
            <ul className="warning-list">
              {mod.warningSigns.map((w) => (
                <li key={w}><Alert /><span>{w}</span></li>
              ))}
            </ul>
          </section>

          <section id="do-and-dont" className="m-block">
            <h2>Do and don’t</h2>
            <div className="dodont">
              <div className="dodont-col is-do">
                <h3><Check /> Do</h3>
                <ul>{mod.dos.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
              <div className="dodont-col is-dont">
                <h3><Cross /> Don’t</h3>
                <ul>{mod.donts.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            </div>
          </section>

          <section id="protect" className="m-block">
            <h2>How to protect yourself</h2>
            <ol className="steps">
              {mod.prevention.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="takeaways" className="m-block takeaways band-dark">
            <h2>Key takeaways</h2>
            <ul className="square-list">
              {mod.takeaways.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </section>

          {related.length > 0 && (
            <section id="tips" className="m-block">
              <h2>Related safety tips</h2>
              <ul className="related-tips">
                {related.map((t) => (
                  <li key={t.id}>
                    <Link to={`/safety-tips#${t.id}`}>{t.title}</Link>
                    <p>{t.how}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="quiz" className="m-block quiz-cta">
            <div>
              <h2>Check what you learned</h2>
              <p className="muted">{mod.questions.length} situations from this chapter. You get feedback after each answer and a full review at the end. Results stay on this device.</p>
            </div>
            <Link to={`/quizzes/${mod.id}`} className="btn btn-accent">Take Quiz</Link>
          </section>

          <nav className="pager" aria-label="Chapters">
            {prev ? (
              <Link to={`/learn/${prev.id}`} className="pager-link">
                <span className="pager-dir">Previous chapter</span>
                <span className="pager-title">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/learn/${next.id}`} className="pager-link is-next">
                <span className="pager-dir">Next chapter</span>
                <span className="pager-title">{next.title}</span>
              </Link>
            ) : <span />}
          </nav>
        </article>
      </div>
    </div>
  );
}
