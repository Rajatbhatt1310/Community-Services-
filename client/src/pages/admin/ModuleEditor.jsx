import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { api } from '../../lib/api.js';
import { invalidateContent } from '../../lib/content.js';
import { validateModule, GROUPS } from '@shared/validate.js';
import groups from '@shared/content/groups.js';
import tips from '@shared/content/tips.js';

const lines = (text) => text.split('\n').map((s) => s.trim()).filter(Boolean);
const newQuestionId = (moduleId) => `${moduleId || 'q'}-${Math.random().toString(36).slice(2, 8)}`;
const blankQuestion = (moduleId) => ({ id: newQuestionId(moduleId), prompt: '', options: ['', '', '', ''], answer: 0, explanation: '' });

const BLANK = {
  id: '', number: 11, title: '', summary: '', minutes: 8, group: GROUPS[0], intro: '',
  objectives: [], sections: [{ heading: '', body: '' }], examples: [], warningSigns: [], dos: [], donts: [],
  prevention: [{ title: '', text: '' }], takeaways: [], relatedTips: [], questions: [],
};

export default function ModuleEditor({ isNew = false, onExpired }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mod, setMod] = useState(isNew ? BLANK : null);
  const [loadError, setLoadError] = useState('');
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    api('/admin/modules')
      .then((all) => {
        const found = all.find((m) => m.id === id);
        if (found) setMod(found);
        else setLoadError('That module does not exist.');
      })
      .catch((err) => (err.status === 401 ? onExpired() : setLoadError(err.message)));
  }, [id, isNew, onExpired]);

  useEffect(() => {
    if (mod && window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, [mod]);

  if (loadError) return <div className="container section"><p className="notice notice-error">{loadError} <Link to="/admin">Back to the dashboard</Link></p></div>;
  if (!mod) return <div className="container section" aria-busy="true"><div className="skeleton" style={{ height: 300 }} /></div>;

  const set = (field, value) => { setMod((m) => ({ ...m, [field]: value })); setStatus(''); };
  const setQuestion = (i, patch) => set('questions', mod.questions.map((q, j) => (j === i ? { ...q, ...patch } : q)));

  async function save(e) {
    e.preventDefault();
    const found = validateModule(mod, { requireQuestions: false });
    if (found.length) {
      setErrors(found);
      setStatus('');
      requestAnimationFrame(() => document.getElementById('editor-errors')?.focus());
      return;
    }
    setBusy(true);
    setErrors([]);
    try {
      if (isNew) {
        const created = await api('/admin/modules', { method: 'POST', body: mod });
        invalidateContent();
        navigate(`/admin/modules/${created.id}`, { replace: true });
      } else {
        setMod(await api(`/admin/modules/${mod.id}`, { method: 'PUT', body: mod }));
        invalidateContent();
        setStatus(mod.questions.length < 10 ? 'Saved. This module has fewer than 10 questions; students will see a shorter quiz.' : 'Saved.');
      }
    } catch (err) {
      if (err.status === 401) return onExpired();
      setErrors(err.details?.length ? err.details : [err.message]);
      requestAnimationFrame(() => document.getElementById('editor-errors')?.focus());
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm(`Delete “${mod.title}” and all its questions? This cannot be undone.`)) return;
    try {
      await api(`/admin/modules/${mod.id}`, { method: 'DELETE' });
      invalidateContent();
      navigate('/admin');
    } catch (err) {
      if (err.status === 401) return onExpired();
      setErrors([err.message]);
    }
  }

  return (
    <form className="container section-admin editor" onSubmit={save} noValidate>
      <p className="crumb"><Link to="/admin">Dashboard</Link> <span aria-hidden="true">/</span> {isNew ? 'New module' : mod.title}</p>
      <div className="admin-head">
        <h1>{isNew ? 'Add a module' : 'Edit module'}</h1>
        {!isNew && <Link to={`/learn/${mod.id}`} className="text-link">View on site</Link>}
      </div>

      {errors.length > 0 && (
        <div id="editor-errors" tabIndex={-1} className="notice notice-error editor-errors" role="alert">
          <div>
            <p><strong>Fix these before saving:</strong></p>
            <ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        </div>
      )}

      <fieldset className="ed-group">
        <legend>Basics</legend>
        <div className="ed-grid">
          {isNew && (
            <Field label="Address (slug)" hint="Lowercase words joined by hyphens, for example safe-online-shopping. Cannot be changed later.">
              {(p) => <input {...p} value={mod.id} onChange={(e) => set('id', e.target.value.toLowerCase())} />}
            </Field>
          )}
          <Field label="Title">{(p) => <input {...p} value={mod.title} onChange={(e) => set('title', e.target.value)} />}</Field>
          <Field label="Chapter number">{(p) => <input {...p} type="number" min="1" max="99" value={mod.number} onChange={(e) => set('number', Number.parseInt(e.target.value, 10) || 0)} />}</Field>
          <Field label="Reading time (minutes)">{(p) => <input {...p} type="number" min="1" max="60" value={mod.minutes} onChange={(e) => set('minutes', Number.parseInt(e.target.value, 10) || 0)} />}</Field>
          <Field label="Group on the Learn page">
            {(p) => (
              <select {...p} value={mod.group} onChange={(e) => set('group', e.target.value)}>
                {groups.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
              </select>
            )}
          </Field>
        </div>
        <Field label="One-line summary">{(p) => <input {...p} value={mod.summary} onChange={(e) => set('summary', e.target.value)} />}</Field>
        <Field label="Introduction">{(p) => <textarea {...p} rows={4} value={mod.intro} onChange={(e) => set('intro', e.target.value)} />}</Field>
      </fieldset>

      <fieldset className="ed-group">
        <legend>Lists</legend>
        <p className="ed-hint">One item per line.</p>
        <ListField label="Learning objectives" value={mod.objectives} onChange={(v) => set('objectives', v)} />
        <ListField label="Warning signs" value={mod.warningSigns} onChange={(v) => set('warningSigns', v)} />
        <div className="ed-grid">
          <ListField label="Do" value={mod.dos} onChange={(v) => set('dos', v)} />
          <ListField label="Don’t" value={mod.donts} onChange={(v) => set('donts', v)} />
        </div>
        <ListField label="Key takeaways" value={mod.takeaways} onChange={(v) => set('takeaways', v)} />
      </fieldset>

      <PairList legend="Explanation sections" a="heading" b="body" aLabel="Heading" bLabel="Text (leave a blank line between paragraphs)" items={mod.sections} onChange={(v) => set('sections', v)} />
      <PairList legend="Real situations" a="title" b="text" aLabel="Title" bLabel="Story" items={mod.examples} onChange={(v) => set('examples', v)} />
      <PairList legend="Prevention steps" a="title" b="text" aLabel="Step" bLabel="Explanation" items={mod.prevention} onChange={(v) => set('prevention', v)} />

      <fieldset className="ed-group">
        <legend>Related safety tips</legend>
        <div className="ed-checks">
          {tips.map((t) => (
            <label key={t.id} className="ed-check">
              <input
                type="checkbox"
                checked={mod.relatedTips.includes(t.id)}
                onChange={(e) => set('relatedTips', e.target.checked ? [...mod.relatedTips, t.id] : mod.relatedTips.filter((x) => x !== t.id))}
              />
              {t.title}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="ed-group">
        <legend>Quiz questions ({mod.questions.length})</legend>
        <p className="ed-hint">Each question needs four different options and an explanation. Students see options in a shuffled order.</p>
        {mod.questions.map((q, i) => (
          <div key={q.id} id={`q-${q.id}`} className="ed-question">
            <div className="ed-row-head">
              <h3>Question {i + 1}</h3>
              <button type="button" className="link-button danger" onClick={() => set('questions', mod.questions.filter((_, j) => j !== i))}>Remove question</button>
            </div>
            <Field label="Question">{(p) => <textarea {...p} rows={2} value={q.prompt} onChange={(e) => setQuestion(i, { prompt: e.target.value })} />}</Field>
            <fieldset className="ed-options">
              <legend>Options. Select the correct answer.</legend>
              {q.options.map((opt, k) => (
                <div key={k} className="ed-option">
                  <input
                    type="radio"
                    name={`answer-${q.id}`}
                    id={`ans-${q.id}-${k}`}
                    checked={q.answer === k}
                    onChange={() => setQuestion(i, { answer: k })}
                  />
                  <label htmlFor={`ans-${q.id}-${k}`} className="visually-hidden">Option {k + 1} is correct</label>
                  <input
                    aria-label={`Option ${k + 1}`}
                    value={opt}
                    onChange={(e) => setQuestion(i, { options: q.options.map((o, m) => (m === k ? e.target.value : o)) })}
                  />
                  {q.answer === k && <span className="ed-correct">Correct</span>}
                </div>
              ))}
            </fieldset>
            <Field label="Explanation shown after answering">{(p) => <textarea {...p} rows={2} value={q.explanation} onChange={(e) => setQuestion(i, { explanation: e.target.value })} />}</Field>
          </div>
        ))}
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => set('questions', [...mod.questions, blankQuestion(mod.id)])}>Add a question</button>
      </fieldset>

      <div className="editor-actions">
        <button type="submit" className="btn btn-accent" disabled={busy}>{busy ? 'Saving…' : isNew ? 'Create module' : 'Save changes'}</button>
        <p role="status" className="save-status">{status}</p>
        {!isNew && <button type="button" className="link-button danger" onClick={remove}>Delete this module</button>}
      </div>
    </form>
  );
}

let fieldCount = 0;
function Field({ label, hint, children }) {
  const [id] = useState(() => `f${++fieldCount}`);
  return (
    <div className="ed-field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="ed-hint" id={`${id}-hint`}>{hint}</p>}
      {children({ id, 'aria-describedby': hint ? `${id}-hint` : undefined })}
    </div>
  );
}

function ListField({ label, value, onChange }) {
  const [text, setText] = useState(value.join('\n'));
  return (
    <Field label={label}>
      {(p) => (
        <textarea
          {...p}
          rows={Math.max(3, value.length + 1)}
          value={text}
          onChange={(e) => { setText(e.target.value); onChange(lines(e.target.value)); }}
        />
      )}
    </Field>
  );
}

function PairList({ legend, a, b, aLabel, bLabel, items, onChange }) {
  const update = (i, patch) => onChange(items.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  const move = (i, d) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <fieldset className="ed-group">
      <legend>{legend}</legend>
      {items.map((it, i) => (
        <div key={i} className="ed-pair">
          <div className="ed-row-head">
            <h3>{legend.replace(/s$/, '')} {i + 1}</h3>
            <div className="ed-row-tools">
              {i > 0 && <button type="button" className="link-button" onClick={() => move(i, -1)}>Move up</button>}
              {i < items.length - 1 && <button type="button" className="link-button" onClick={() => move(i, 1)}>Move down</button>}
              <button type="button" className="link-button danger" onClick={() => onChange(items.filter((_, j) => j !== i))}>Remove</button>
            </div>
          </div>
          <Field label={aLabel}>{(p) => <input {...p} value={it[a]} onChange={(e) => update(i, { [a]: e.target.value })} />}</Field>
          <Field label={bLabel}>{(p) => <textarea {...p} rows={4} value={it[b]} onChange={(e) => update(i, { [b]: e.target.value })} />}</Field>
        </div>
      ))}
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange([...items, { [a]: '', [b]: '' }])}>Add</button>
    </fieldset>
  );
}
