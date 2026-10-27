import { useModules } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { OfflineNotice, PageHead } from '../components/Layout.jsx';
import { ChapterRow, ProgressSummary } from './Learn.jsx';
import '../styles/pages.css';

export default function Quizzes() {
  const { status, data: modules, error, offline } = useModules();
  const progress = useProgress();

  return (
    <>
      {offline && <OfflineNotice />}
      <PageHead
        title="Quizzes"
        lead="Each chapter has a quiz of ten real-life situations. You will see whether you were right and why after every answer. Reading the chapter first helps, but you can try any quiz at any time."
      />
      <div className="container section-tight">
        {status === 'loading' && <div className="skeleton" style={{ height: 400 }} aria-hidden="true" />}
        {status === 'error' && <p className="notice notice-error">{error.message}</p>}
        {status === 'ready' && (
          <>
            <ProgressSummary modules={modules} progress={progress} />
            <ol className="contents">
              {modules.map((m) => (
                <ChapterRow key={m.id} m={m} progress={progress} to={`/quizzes/${m.id}`} meta={`${m.questionCount} questions`} />
              ))}
            </ol>
          </>
        )}
      </div>
    </>
  );
}
