import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useModule, useModules, isOffline } from '../lib/content.js';
import { recordResult, recordAnswers, useProgress, PASS_MARK } from '../lib/progress.js';
import { prepareQuiz, performance } from '../lib/quiz.js';
import { api } from '../lib/api.js';
import QuizQuestion from '../components/QuizQuestion.jsx';
import { OfflineNotice, PageLoading } from '../components/Layout.jsx';
import { Check, Cross } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';
import ClassMode from '../components/ClassMode.jsx';
import '../styles/quiz-page.css';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function Quiz() {
  const { id } = useParams();
  const { status, data: mod, error, offline } = useModule(id);

  if (status === 'loading') return <PageLoading />;
  if (status === 'error') return <div className="container section"><p className="notice notice-error">{error.message}</p></div>;
  if (!mod) return <NotFound />;
  if (mod.questions.length === 0) {
    return (
      <div className="container section">
        <h1>{mod.title}</h1>
        <p className="lead quiz-empty">This chapter does not have quiz questions yet.</p>
        <Link to={`/learn/${mod.id}`} className="btn">Read the chapter</Link>
      </div>
    );
  }
  return (
    <>
      {offline && <OfflineNotice />}
      <QuizRunner key={mod.id} mod={mod} />
    </>
  );
}

function QuizRunner({ mod }) {
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const questions = useMemo(() => prepareQuiz(mod.questions), [mod, attempt]);

  const start = () => {
    setAnswers([]);
    setIndex(0);
    setPhase('question');
  };
  const retry = () => {
    setAttempt((a) => a + 1);
    start();
  };

  if (phase === 'intro') return <QuizIntro mod={mod} onStart={start} onPresent={() => setPhase('present')} />;
  if (phase === 'present') return <ClassMode mod={mod} questions={questions} onExit={() => setPhase('intro')} />;
  if (phase === 'results') {
    return <Results mod={mod} questions={questions} answers={answers} onRetry={retry} />;
  }

  const q = questions[index];
  const isLast = index === questions.length - 1;
  const answeredCount = answers.filter(Boolean).length;

  return (
    <div className="quiz-shell">
      <div className="quiz-bar">
        <div className="container quiz-bar-inner">
          <p className="quiz-bar-title">{mod.title}</p>
          <div className="quiz-bar-progress">
            <div
              className="progress"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-valuenow={answeredCount}
            >
              <span style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
            </div>
            <span className="quiz-bar-count">{answeredCount} of {questions.length} answered</span>
          </div>
          <Link
            to={`/learn/${mod.id}`}
            className="quiz-exit"
            onClick={(e) => {
              if (answeredCount > 0 && !window.confirm('Leave the quiz? Your answers so far will not be saved.')) e.preventDefault();
            }}
          >
            Exit quiz
          </Link>
        </div>
      </div>
      <div className="container quiz-stage">
        <QuizQuestion
          key={`${attempt}-${q.id}`}
          question={q}
          index={index}
          total={questions.length}
          nextLabel={isLast ? 'See my results' : 'Next question'}
          onAnswer={(choice, correct) => {
            setAnswers((a) => {
              const next = [...a];
              next[index] = { choice, correct };
              return next;
            });
          }}
          onNext={() => {
            if (isLast) setPhase('results');
            else setIndex((i) => i + 1);
          }}
        />
      </div>
    </div>
  );
}

function QuizIntro({ mod, onStart, onPresent }) {
  return (
    <section className="container quiz-intro">
      <p className="crumb"><Link to="/quizzes">Quizzes</Link> <span aria-hidden="true">/</span> Chapter {mod.number}</p>
      <h1>{mod.title} quiz</h1>
      <p className="lead">{mod.questions.length} situations. Choose an answer, check it, and read the explanation before moving on. You can retry as many times as you like.</p>
      <ul className="quiz-rules">
        <li>Every question needs an answer before you can continue.</li>
        <li>Options are shuffled each time you take the quiz.</li>
        <li>Your score is saved only on this device. An anonymous result, with no name or account, helps the project team see which topics need more teaching.</li>
      </ul>
      <div className="btn-row">
        <button type="button" className="btn btn-accent" onClick={onStart}>Start quiz</button>
        <button type="button" className="btn btn-ghost" onClick={onPresent}>Present to the class</button>
        <Link to={`/learn/${mod.id}`} className="btn btn-ghost">Read the chapter first</Link>
      </div>
    </section>
  );
}

function Results({ mod, questions, answers, onRetry }) {
  const total = questions.length;
  const correct = answers.filter((a) => a?.correct).length;
  const percent = Math.round((correct / total) * 100);
  const verdict = performance(percent);
  const [showAll, setShowAll] = useState(false);
  const [saveState, setSaveState] = useState('saving');
  const headingRef = useRef(null);
  const saved = useRef(false);
  const { data: list } = useModules();
  const progress = useProgress();
  const allPassed = list?.length > 0 && list.every((m) => (progress[m.id]?.best ?? 0) >= PASS_MARK);

  useEffect(() => {
    headingRef.current?.focus();
    if (saved.current) return;
    saved.current = true;
    recordResult(mod.id, percent);
    recordAnswers(mod.id, questions.map((q, i) => ({ qid: q.id, correct: answers[i].correct })));
    if (isOffline()) {
      setSaveState('offline');
      return;
    }
    const payload = {};
    questions.forEach((q, i) => { payload[q.id] = q.originalIndex[answers[i].choice]; });
    api('/attempts', { method: 'POST', body: { moduleId: mod.id, answers: payload } })
      .then(() => setSaveState('saved'))
      .catch(() => setSaveState('offline'));
  }, [mod.id, percent, questions, answers]);

  const missed = questions.map((q, i) => ({ q, a: answers[i], n: i + 1 })).filter((x) => !x.a.correct);
  const shown = showAll ? questions.map((q, i) => ({ q, a: answers[i], n: i + 1 })) : missed;
  const idx = list ? list.findIndex((m) => m.id === mod.id) : -1;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;

  return (
    <section className="container quiz-results" aria-labelledby="results-title">
      <p className="crumb"><Link to="/quizzes">Quizzes</Link> <span aria-hidden="true">/</span> {mod.title}</p>
      <div className={`score-card tone-${verdict.tone}`}>
        <div className="score-main">
          <p className="score-percent"><span>{percent}</span>%</p>
          <h1 id="results-title" ref={headingRef} tabIndex={-1}>{verdict.title}</h1>
        </div>
        <dl className="score-stats">
          <div><dt>Questions</dt><dd>{total}</dd></div>
          <div><dt>Correct</dt><dd>{correct}</dd></div>
          <div><dt>Incorrect</dt><dd>{total - correct}</dd></div>
        </dl>
      </div>

      <p className="save-note" role="status">
        {saveState === 'saving' && 'Saving your result…'}
        {saveState === 'saved' && 'Your score is saved on this device. An anonymous result was added to the project’s class statistics.'}
        {saveState === 'offline' && 'Your score is saved on this device. The server could not be reached, so it was not added to class statistics.'}
      </p>

      {allPassed && (
        <Link to="/certificate" className="cert-banner">
          <strong>You passed every chapter.</strong> Your CyberSafe certificate is ready to print.
        </Link>
      )}

      <div className="btn-row results-actions">
        <button type="button" className="btn btn-accent" onClick={onRetry}>Retry quiz</button>
        <Link to={`/learn/${mod.id}`} className="btn btn-ghost">Back to the chapter</Link>
        {next && <Link to={`/learn/${next.id}`} className="btn btn-ghost">Next chapter: {next.title}</Link>}
      </div>

      <div className="review">
        <div className="review-head">
          <h2>{showAll ? 'All answers' : missed.length ? 'Questions to revisit' : 'You answered every question correctly.'}</h2>
          <button type="button" className="btn btn-ghost btn-sm" aria-pressed={showAll} onClick={() => setShowAll((s) => !s)}>
            {showAll ? 'Show only mistakes' : 'Review all answers'}
          </button>
        </div>
        {shown.length > 0 && (
          <ol className="review-list">
            {shown.map(({ q, a, n }) => (
              <li key={q.id} className={a.correct ? 'is-correct' : 'is-wrong'}>
                <p className="review-status">
                  {a.correct ? <Check /> : <Cross />}
                  Question {n}, {a.correct ? 'correct' : 'incorrect'}
                </p>
                <h3>{q.prompt}</h3>
                <dl>
                  <div><dt>Your answer</dt><dd>{LETTERS[a.choice]}. {q.options[a.choice]}</dd></div>
                  {!a.correct && <div><dt>Correct answer</dt><dd>{LETTERS[q.answer]}. {q.options[q.answer]}</dd></div>}
                </dl>
                <p className="review-why">{q.explanation}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
