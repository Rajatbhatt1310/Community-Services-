import { useEffect, useId, useRef, useState } from 'react';
import { Check, Cross } from './Icons.jsx';
import '../styles/quiz.css';

const LETTERS = ['A', 'B', 'C', 'D'];

/**
 * One multiple-choice question: choose, check, read the explanation, continue.
 * The parent remounts it per question (key={question.id}).
 */
export default function QuizQuestion({ question, index, total, onAnswer, onNext, nextLabel, autoFocus = true, compact = false }) {
  const [choice, setChoice] = useState(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const feedbackRef = useRef(null);
  const legendRef = useRef(null);
  const name = useId();

  useEffect(() => {
    if (autoFocus) legendRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  useEffect(() => {
    if (checked) feedbackRef.current?.focus({ preventScroll: true });
  }, [checked]);

  const correct = checked && choice === question.answer;

  function submit(e) {
    e.preventDefault();
    if (checked) {
      onNext?.();
      return;
    }
    if (choice === null) {
      setError('Choose an answer before checking.');
      return;
    }
    setError('');
    setChecked(true);
    onAnswer?.(choice, choice === question.answer);
  }

  return (
    <form className={`qq${compact ? ' qq-compact' : ''}`} onSubmit={submit} noValidate>
      <fieldset aria-describedby={error ? `${name}-err` : undefined}>
        <legend ref={legendRef} tabIndex={-1} className="qq-legend">
          {total > 1 && <span className="qq-count">Question {index + 1} of {total}</span>}
          <span className="qq-prompt">{question.prompt}</span>
        </legend>

        <div className="qq-options">
          {question.options.map((text, i) => {
            const isAnswer = checked && i === question.answer;
            const isWrongPick = checked && i === choice && !correct;
            const state = isAnswer ? ' is-correct' : isWrongPick ? ' is-wrong' : checked ? ' is-dim' : '';
            return (
              <label key={i} className={`qq-option${choice === i ? ' is-selected' : ''}${state}`}>
                <input
                  type="radio"
                  name={name}
                  value={i}
                  checked={choice === i}
                  disabled={checked}
                  onChange={() => { setChoice(i); setError(''); }}
                />
                <span className="qq-letter" aria-hidden="true">{LETTERS[i]}</span>
                <span className="qq-text">{text}</span>
                {isAnswer && (
                  <span className="qq-mark"><Check /> {i === choice ? 'Your answer, correct' : 'Correct answer'}</span>
                )}
                {isWrongPick && (
                  <span className="qq-mark"><Cross /> Your answer</span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && <p id={`${name}-err`} className="qq-error" role="alert">{error}</p>}

      <div className="qq-feedback-slot" aria-live="polite">
        {checked && (
          <div ref={feedbackRef} tabIndex={-1} className={`qq-feedback ${correct ? 'is-correct' : 'is-wrong'}`}>
            <p className="qq-verdict">
              {correct ? <Check /> : <Cross />}
              {correct ? 'Correct.' : `Not quite. The answer is ${LETTERS[question.answer]}.`}
            </p>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>

      {(!checked || onNext) && (
        <div className="qq-actions">
          <button type="submit" className={`btn ${checked ? 'btn-accent' : ''}`}>
            {checked ? nextLabel : 'Check answer'}
          </button>
        </div>
      )}
    </form>
  );
}
