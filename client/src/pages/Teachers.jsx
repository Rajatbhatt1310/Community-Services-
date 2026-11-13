import { useState } from 'react';
import { Link } from 'react-router';
import { PageHead } from '../components/Layout.jsx';
import '../styles/teachers.css';

const PLANS = {
  45: [
    { t: '0 to 5', title: 'Open with the message on the homepage', text: 'Put the homepage on the projector. The class calls out the five warning signs in the NationBank message while you tap them.', to: '/' },
    { t: '5 to 13', title: 'How a scam works', text: 'Scroll the scam story on the homepage together. Ask students which of the four steps they have seen in their own messages.', to: '/' },
    { t: '13 to 25', title: 'Scam or Safe as a class', text: 'Open Scam or Safe. For each card, students vote with a show of hands before you reveal the clues.', to: '/lab#scam-or-safe' },
    { t: '25 to 37', title: 'Quiz in class mode', text: 'Open the phishing quiz and choose “Present to the class”. Use the 20 second timer, then reveal and discuss each answer.', to: '/quizzes/phishing-and-online-scams' },
    { t: '37 to 42', title: 'Password Lab demo', text: 'Ask volunteers for made-up passwords like “Rahul2009”. Show why they fail, then generate a passphrase.', to: '/lab#password' },
    { t: '42 to 45', title: 'Close with where to get help', text: 'Show 1930 and cybercrime.gov.in on the Report page. Set the safety check-up as homework.', to: '/report' },
  ],
  90: [
    { t: '0 to 10', title: 'Open with the message on the homepage', text: 'Find the five warning signs together, then ask who has received a message like it.', to: '/' },
    { t: '10 to 20', title: 'How a scam works', text: 'Scroll the scam story. Name the four steps: bait, trust, pressure, the ask.', to: '/' },
    { t: '20 to 40', title: 'Chapters in small groups', text: 'Give each group one chapter to read for ten minutes. Each group shares its three most useful warning signs.', to: '/learn' },
    { t: '40 to 55', title: 'Link X-ray and Password Lab', text: 'Paste the example links into Link X-ray and read who really owns each one. Then test made-up passwords.', to: '/lab#link-xray' },
    { t: '55 to 70', title: 'Quiz in class mode', text: 'Run one quiz on the projector. Pick the chapter the class found hardest.', to: '/quizzes' },
    { t: '70 to 82', title: 'Help role play', text: 'Read out a situation, such as money lost to a fake UPI request. Students use the help wizard to decide the steps in order.', to: '/report' },
    { t: '82 to 90', title: 'Close and homework', text: 'Hand out the printed safety check-up. Students tick what they set up at home with a parent.', to: '/check-up' },
  ],
};

const DISCUSSION = [
  ['Introduction to Cybersecurity', 'Which is worse for you personally: someone reading your messages, changing them, or locking you out? Why?'],
  ['Phishing and Online Scams', 'What makes a fake message feel real? Think of one you have seen.'],
  ['Password Safety and Account Security', 'Why do people reuse passwords even when they know it is risky? What would make it easier not to?'],
  ['Social Media Safety', 'What could a stranger learn about you from your last five posts?'],
  ['Cyberbullying and Online Harassment', 'What stops bystanders from helping, and what is one small thing anyone could do?'],
  ['Digital Privacy and Data Protection', 'Is a free app really free? What are you paying with?'],
  ['Social Engineering', 'Which trigger works best on you: fear, urgency, curiosity or wanting to help?'],
  ['Identity Theft and Fake Profiles', 'How would you prove to your friends that a fake account is not you?'],
  ['Safe Internet and Online Gaming', 'Where is the line between a fun deal and a scam in games?'],
  ['Introduction to Ethical Hacking', 'If you found a security problem on your school website, what would you do first?'],
];

export default function Teachers() {
  const [length, setLength] = useState(45);
  return (
    <>
      <PageHead
        title="Workshop kit"
        lead="Everything needed to run a CyberSafe School session in a classroom, built around the tools on this site. Use it as it is or adapt it."
      />
      <div className="container section-tight teachers">
        <section className="tk-plan" aria-labelledby="plan-title">
          <div className="tk-plan-head">
            <h2 id="plan-title">Session plan</h2>
            <div className="tk-switch" role="group" aria-label="Session length">
              {[45, 90].map((n) => (
                <button key={n} type="button" aria-pressed={length === n} onClick={() => setLength(n)}>{n} minutes</button>
              ))}
            </div>
          </div>
          <ol className="tk-steps">
            {PLANS[length].map((s) => (
              <li key={s.title}>
                <span className="tk-time">{s.t} min</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <Link to={s.to} className="tk-open">Open</Link>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="tk-grid">
          <section aria-labelledby="prep-title">
            <h2 id="prep-title">Before the session</h2>
            <ul className="square-list">
              <li>Test the projector with the homepage and one quiz in class mode.</li>
              <li>Open the Cyber Lab before the session starts. Once a tool is open it keeps working even if the connection drops.</li>
              <li>Print the <Link to="/check-up">safety check-up</Link> as a take-home handout.</li>
              <li>Agree with the class teacher who students can talk to afterwards if something worries them.</li>
            </ul>
          </section>
          <section aria-labelledby="rules-title">
            <h2 id="rules-title">Ground rules for the room</h2>
            <ul className="square-list">
              <li>Only made-up passwords on the projector, never real ones.</li>
              <li>Share stories without naming people or showing real screenshots of classmates.</li>
              <li>No one has to share anything personal.</li>
              <li>If a student mentions threats, blackmail or money loss, follow up privately with the teacher, using the <Link to="/report">help steps</Link>.</li>
            </ul>
          </section>
        </div>

        <section className="tk-discuss" aria-labelledby="discuss-title">
          <h2 id="discuss-title">One discussion question per chapter</h2>
          <ol className="tk-questions">
            {DISCUSSION.map(([chapter, q]) => (
              <li key={chapter}>
                <span className="tk-chapter">{chapter}</span>
                <p>{q}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="tk-classmode" aria-labelledby="cm-title">
          <h2 id="cm-title">Using class mode</h2>
          <p>Open any quiz and choose <strong>Present to the class</strong>. It fills the screen with large text. Press <kbd>Space</kbd> to reveal the answer, <kbd>→</kbd> and <kbd>←</kbd> to move between questions, <kbd>T</kbd> for a 20 second timer and <kbd>Esc</kbd> to leave. Nothing is scored or saved in class mode.</p>
          <Link to="/quizzes" className="btn">Choose a quiz</Link>
        </section>
      </div>
    </>
  );
}
