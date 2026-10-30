import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import MessageInspector from '../components/MessageInspector.jsx';
import QuizQuestion from '../components/QuizQuestion.jsx';
import ExternalLink from '../components/ExternalLink.jsx';
import ScamStory from '../components/ScamStory.jsx';
import ChapterIcon from '../components/ChapterIcon.jsx';
import LabIcon from '../components/LabIcon.jsx';
import { Phone } from '../components/Icons.jsx';
import { useModules, useModule } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { prepareQuestion } from '../lib/quiz.js';
import { xray } from '../lib/linkxray.js';
import facts from '@shared/content/facts.js';
import '../styles/home.css';

const DEMO_MODULE = 'phishing-and-online-scams';
const DEMO_QUESTIONS = ['phish-q1', 'phish-q2', 'phish-q4', 'phish-q9'];
const DEMO_LINK = 'http://sbi.co.in.secure-login.top/kyc-update';

const VERBS = [
  { word: 'Learn', to: '/learn', text: 'Ten short chapters' },
  { word: 'Verify', to: '/lab', text: 'Hands-on Cyber Lab' },
  { word: 'Protect', to: '/safety-tips', text: 'Everyday habits' },
  { word: 'Report', to: '/report', text: 'Where to get help' },
];

const LABS = [
  { id: 'password', title: 'Password Lab', text: 'Type a made-up password and see how long it would survive an attack, and why.' },
  { id: 'link-xray', title: 'Link X-ray', text: 'Paste a link to see who really owns it and which tricks it uses.' },
  { id: 'scam-or-safe', title: 'Scam or Safe', text: 'Judge realistic messages, then see the clues marked on each one.' },
];

const OUTCOMES = [
  { title: 'Identify online threats', text: 'Recognise phishing, fake profiles, scams and manipulation from the signs they leave, before you click or reply.', to: '/learn/phishing-and-online-scams', link: 'Phishing and online scams' },
  { title: 'Protect personal information', text: 'Decide what to share, lock accounts with strong passwords and two-step verification, and limit what apps collect.', to: '/learn/digital-privacy-and-data-protection', link: 'Digital privacy' },
  { title: 'Make informed decisions', text: 'Use a simple routine before acting on any request: who is asking, why, and what happens if you wait.', to: '/learn/social-engineering', link: 'Social engineering' },
  { title: 'Build responsible habits', text: 'Treat others well online, support friends who are targeted, and know exactly where to report when something goes wrong.', to: '/learn/cyberbullying-and-online-harassment', link: 'Cyberbullying' },
];

export default function Home() {
  return (
    <>
      <Hero />
      <ScamStory />
      <Facts />
      <Chapters />
      <LabSection />
      <TryQuestion />
      <Outcomes />
      <ReportBand />
    </>
  );
}

function Hero() {
  return (
    <>
      <section className="hero on-dark" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-top">
            <h1 id="hero-title" className="display">
              <span>Stay Safe.</span>
              <span>Stay Smart.</span>
              <span>Stay CyberSecure.</span>
            </h1>
            <div className="hero-aside">
              <p className="lead">Understand the digital world. Recognize online threats. Build habits that keep you and your information safe.</p>
              <div className="btn-row">
                <Link to="/learn" className="btn btn-lg">Start Learning</Link>
                <Link to="/safety-tips" className="btn btn-ghost btn-lg">Explore Cyber Safety</Link>
              </div>
              <p className="hero-credit">A free course for Classes 9 to 12, made by B.Tech students of K.R. Mangalam University.</p>
            </div>
          </div>
          <div className="hero-stage">
            <MessageInspector />
          </div>
        </div>
      </section>
      <div className="container">
        <nav className="verbs" aria-label="What you can do here">
          {VERBS.map((v) => (
            <Link key={v.word} to={v.to} className="verb">
              <span className="verb-word">{v.word}.</span>
              <span className="verb-text">{v.text}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

function Facts() {
  if (!facts.length) return null;
  return (
    <section className="section band-dark facts" aria-labelledby="facts-title">
      <div className="container">
        <div className="facts-grid">
          <div>
            <h2 id="facts-title">Why this matters in India</h2>
            <p className="lead">Official figures only count crimes that were reported and registered. The real number of people affected is higher, which is why knowing how to report matters as much as knowing how to stay safe.</p>
          </div>
          <dl className="facts-list">
            {facts.map((f) => (
              <div key={f.label} className="fact">
                <dt>
                  <span className="fact-value">{f.value}</span>
                  <span className="fact-label">{f.label}</span>
                </dt>
                <dd>
                  <p>{f.detail}</p>
                  <p className="fact-source">Source: {f.source} ({f.year})</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Chapters() {
  const { status, data: modules } = useModules();
  const progress = useProgress();

  return (
    <section className="section chapters" aria-labelledby="chapters-title">
      <div className="container">
        <div className="chapters-head">
          <h2 id="chapters-title">Contents</h2>
          <div>
            <p className="lead">Ten chapters of about ten minutes each, written for Classes 9 to 12. Every chapter uses real situations and ends with a ten question quiz.</p>
            <ul className="topic-key" aria-label="Topic colours">
              <li data-world="foundations">Foundations</li>
              <li data-world="people">You and other people</li>
              <li data-world="data">Your data and time online</li>
              <li data-world="careers">Careers</li>
            </ul>
          </div>
        </div>
        <ol className="contents">
          {status === 'loading' && <li className="skeleton" style={{ height: 480 }} aria-hidden="true" />}
          {status === 'error' && <li className="notice notice-error">The chapters could not be loaded. Refresh the page to try again.</li>}
          {status === 'ready' &&
            modules.map((m) => {
              const p = progress[m.id];
              return (
                <li key={m.id} data-world={m.group}>
                  <Link to={`/learn/${m.id}`} className="contents-row">
                    <span className="contents-n">{String(m.number).padStart(2, '0')}</span>
                    <span className="contents-body">
                      <span className="contents-title">{m.title}</span>
                      <span className="contents-summary">{m.summary}</span>
                    </span>
                    <span className="contents-meta">
                      <span className="topic-icon"><ChapterIcon id={m.id} /></span>
                      <span className={p ? 'is-done' : ''}>{p ? `Best ${p.best}%` : `${m.minutes} min`}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
        </ol>
      </div>
    </section>
  );
}

function LabSection() {
  const sample = useMemo(() => xray(DEMO_LINK), []);
  return (
    <section className="section band-dark lab-section" aria-labelledby="lab-title">
      <div className="container lab-grid">
        <div>
          <h2 id="lab-title">Do not just read about it. Try it.</h2>
          <p className="lead">The Cyber Lab has three tools for class. They run in the browser, so nothing you type is sent anywhere.</p>
          <ul className="lab-list">
            {LABS.map((l) => (
              <li key={l.id}>
                <Link to={`/lab#${l.id}`} className="lab-row">
                  <span className="lab-row-icon"><LabIcon id={l.id} /></span>
                  <span>
                    <span className="lab-row-title">{l.title}</span>
                    <span className="lab-row-text">{l.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <figure className="lab-sample">
          <figcaption>Link X-ray output for a fake bank link</figcaption>
          <p className="lab-sample-url mono">{DEMO_LINK}</p>
          <div className="lab-sample-parts mono" aria-hidden="true">
            <span className="part">{sample.parts.scheme}://</span>
            <span className="part part-sub">{sample.parts.sub}.</span>
            <span className="part part-owner">{sample.owner}</span>
            <span className="part">{sample.parts.path}</span>
          </div>
          <p className="lab-sample-owner">Real owner: <strong className="mono">{sample.owner}</strong></p>
          <ul className="lab-sample-flags">
            {sample.flags.slice(0, 3).map((f) => <li key={f.title}>{f.title}</li>)}
          </ul>
          <Link to="/lab#link-xray" className="btn btn-sm">Try your own link</Link>
        </figure>
      </div>
    </section>
  );
}

function TryQuestion() {
  const { status, data: mod } = useModule(DEMO_MODULE);
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);

  const question = useMemo(() => {
    if (!mod) return null;
    const q = mod.questions.find((x) => x.id === DEMO_QUESTIONS[step % DEMO_QUESTIONS.length]) || mod.questions[0];
    return prepareQuestion(q);
  }, [mod, step]);

  return (
    <section className="section band-mist try" aria-labelledby="try-title">
      <div className="container try-grid">
        <div className="try-intro">
          <h2 id="try-title">Quizzes ask what you would do, not what a word means.</h2>
          <p className="muted">Every question is a situation students actually run into. Answer it, see why, and move on. This one is from the phishing chapter.</p>
        </div>
        <div className="try-card">
          {status === 'loading' && <div className="skeleton" style={{ height: 320 }} aria-hidden="true" />}
          {status === 'error' && <p className="notice notice-error">This question could not be loaded.</p>}
          {question && (
            <>
              <QuizQuestion
                key={`${question.id}-${step}`}
                question={question}
                index={0}
                total={1}
                autoFocus={false}
                compact
                onAnswer={() => setAnswered(true)}
              />
              {answered && (
                <div className="btn-row try-next">
                  <Link to={`/quizzes/${DEMO_MODULE}`} className="btn btn-accent">Take the full phishing quiz</Link>
                  <button type="button" className="btn btn-ghost" onClick={() => { setStep((s) => s + 1); setAnswered(false); }}>
                    Try another question
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section className="section outcomes" aria-labelledby="outcomes-title">
      <div className="container">
        <div className="section-head">
          <h2 id="outcomes-title">What students leave with</h2>
          <p className="lead">CyberSafe School is not a list of rules. It is practice in noticing, pausing and choosing well, so the right decision feels familiar when it matters.</p>
        </div>
        <div className="outcome-grid">
          {OUTCOMES.map((o) => (
            <article key={o.title} className="outcome">
              <h3>{o.title}</h3>
              <p className="muted">{o.text}</p>
              <Link to={o.to} className="text-link">Chapter: {o.link}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportBand() {
  return (
    <section className="section band-dark report-band" aria-labelledby="report-band-title">
      <div className="container report-grid">
        <div>
          <h2 id="report-band-title">Need help? Report cybercrime.</h2>
          <p className="lead">If you or your family lost money, call the national cyber fraud helpline straight away. For bullying, threats, fake profiles or anything that frightens you, talk to a parent, teacher or guardian you trust, then report it.</p>
          <div className="btn-row">
            <Link to="/report" className="btn">Get step-by-step help</Link>
          </div>
        </div>
        <div className="report-contacts">
          <a href="tel:1930" className="hotline">
            <Phone />
            <span className="hotline-number">1930</span>
            <span className="hotline-label">Cyber fraud helpline. Call as soon as possible after a loss.</span>
          </a>
          <ExternalLink href="https://cybercrime.gov.in/" className="portal-link">
            National Cyber Crime Reporting Portal, cybercrime.gov.in
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
