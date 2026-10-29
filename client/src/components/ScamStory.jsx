import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import '../styles/scam-story.css';

// A typical scholarship scam, told in four stages. Names and numbers are invented.
const STAGES = [
  {
    key: 'bait',
    label: 'The bait',
    title: 'It starts with something you want.',
    text: 'A prize, a scholarship, free game currency or a job. The offer is chosen to make you hopeful before you have time to be suspicious.',
    tell: 'Ask yourself: did I apply for this?',
    message: 'Congratulations! You have been selected for the National Merit Scholarship of Rs 25,000 for Class 10 students.',
  },
  {
    key: 'trust',
    label: 'The trust',
    title: 'Then it borrows someone’s authority.',
    text: 'The message uses an official-sounding name, a logo, your school’s name or details from your social media. It feels personal, so it feels real.',
    tell: 'Ask yourself: can I check this through an official website I find myself?',
    message: 'This is the Scholarship Cell, Ministry Education Dept. Your school has recommended your name. Ref: NMS/2025/8841',
  },
  {
    key: 'pressure',
    label: 'The pressure',
    title: 'Next comes a deadline.',
    text: 'Only a few seats left. The offer expires in 30 minutes. Pressure is there to stop you asking a parent or teacher.',
    tell: 'Ask yourself: why can it not wait an hour?',
    message: 'Only 3 seats left in your district. Complete registration within 30 minutes or your seat goes to the next student.',
  },
  {
    key: 'ask',
    label: 'The ask',
    title: 'Finally, the real goal.',
    text: 'A small “registration fee”, your OTP, a UPI PIN or an app to install. This is what the whole conversation was built for.',
    tell: 'Real scholarships never charge you to receive money.',
    message: 'Pay the registration fee of Rs 199 to scholarship.reg@upi and share the OTP you receive to confirm your bank account.',
  },
];

export default function ScamStory() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.dataset.index));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="story section" aria-labelledby="story-title">
      <div className="container">
        <div className="section-head">
          <h2 id="story-title">How a scam works, step by step</h2>
          <p className="lead">Almost every online scam follows the same four steps. Once you can name them, they are much harder to fall for. Scroll through a real pattern.</p>
        </div>

        <div className="story-grid">
          <div className="story-phone-wrap" aria-hidden="true">
            <div className="story-phone">
              <div className="phone-top">
                <span className="phone-avatar">SC</span>
                <span>
                  <strong>Scholarship Cell</strong>
                  <small>+91 7XXXX XXX41</small>
                </span>
              </div>
              <div className="phone-chat">
                {STAGES.map((s, i) => (
                  <p key={s.key} className={`bubble${i <= active ? ' is-in' : ''}${i === active ? ' is-current' : ''}`} data-stage={s.key}>
                    {s.message}
                    {i === active && <span className="bubble-tag">{s.label}</span>}
                  </p>
                ))}
              </div>
              <div className="phone-meter">
                <span>Pressure</span>
                <span className="meter-bar"><span style={{ width: `${((active + 1) / STAGES.length) * 100}%` }} /></span>
              </div>
            </div>
          </div>

          <ol className="story-steps">
            {STAGES.map((s, i) => (
              <li
                key={s.key}
                ref={(el) => (refs.current[i] = el)}
                data-index={i}
                className={`story-step${i === active ? ' is-active' : ''}`}
                data-stage={s.key}
              >
                <p className="step-label"><span className="step-num">{i + 1}</span> {s.label}</p>
                <h3>{s.title}</h3>
                <p className="step-text">{s.text}</p>
                <p className="step-msg"><span className="visually-hidden">Example message: </span>{s.message}</p>
                <p className="step-tell">{s.tell}</p>
              </li>
            ))}
            <li className="story-step story-defence">
              <h3>Your defence fits in three words.</h3>
              <p className="defence-words"><span>Pause.</span> <span>Verify.</span> <span>Report.</span></p>
              <p className="step-text">Stop before you act, check through a channel you find yourself, and tell a trusted adult. If money was lost, call 1930.</p>
              <div className="btn-row">
                <Link to="/lab#scam-or-safe" className="btn btn-accent">Test yourself: Scam or Safe</Link>
                <Link to="/learn/phishing-and-online-scams" className="btn btn-ghost">Read the phishing chapter</Link>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
