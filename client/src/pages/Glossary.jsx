import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { PageHead } from '../components/Layout.jsx';
import { useModules } from '../lib/content.js';
import glossary, { termId } from '@shared/content/glossary.js';
import '../styles/glossary.css';

const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'en', { numeric: true }));
const letterOf = (t) => (/^[a-z]/i.test(t) ? t[0].toUpperCase() : '#');

export default function Glossary() {
  const [q, setQ] = useState('');
  const { data: modules } = useModules();
  const id = useId();
  const titleOf = (mid) => modules?.find((m) => m.id === mid)?.title;

  const filtered = useMemo(() => {
    const w = q.trim().toLowerCase();
    return w ? sorted.filter((g) => g.term.toLowerCase().includes(w) || g.def.toLowerCase().includes(w)) : sorted;
  }, [q]);

  const letters = [...new Set(sorted.map((g) => letterOf(g.term)))];
  const byLetter = letters.map((l) => ({ l, items: filtered.filter((g) => letterOf(g.term) === l) })).filter((x) => x.items.length);

  return (
    <>
      <PageHead
        title="Glossary"
        lead={`${glossary.length} cyber safety terms in plain language. Each one links to the chapter where it is explained with real examples.`}
      />
      <div className="container section-tight glossary">
        <div className="gl-tools">
          <label htmlFor={`${id}-q`} className="visually-hidden">Filter terms</label>
          <input id={`${id}-q`} type="search" placeholder="Filter terms, for example OTP" value={q} onChange={(e) => setQ(e.target.value)} />
          <nav className="gl-letters" aria-label="Jump to letter">
            {letters.map((l) => (
              <a key={l} href={`#letter-${l}`} aria-disabled={!byLetter.some((x) => x.l === l)}>{l}</a>
            ))}
          </nav>
        </div>

        {byLetter.length === 0 && <p className="gl-empty" role="status">No terms match “{q}”.</p>}

        {byLetter.map(({ l, items }) => (
          <section key={l} id={`letter-${l}`} className="gl-group" aria-label={`Terms starting with ${l}`}>
            <h2 className="gl-letter" aria-hidden="true">{l}</h2>
            <dl className="gl-list">
              {items.map((g) => (
                <div key={g.term} id={termId(g.term)} className="gl-item">
                  <dt>{g.term}</dt>
                  <dd>
                    <p>{g.def}</p>
                    {titleOf(g.module) && <Link to={`/learn/${g.module}`} className="gl-more">Chapter: {titleOf(g.module)}</Link>}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}
