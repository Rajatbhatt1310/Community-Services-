import { Link } from 'react-router';
import { PageHead } from '../components/Layout.jsx';
import ExternalLink from '../components/ExternalLink.jsx';
import '../styles/pages.css';

const COMPARE = [
  ['Permission', 'Written approval from the owner before any testing starts.', 'None. The owner does not know or has not agreed.'],
  ['Scope', 'A defined list of what may be tested, when and how.', 'Whatever the person can reach.'],
  ['Purpose', 'Find weaknesses so they can be fixed.', 'Curiosity, pranks, revenge, data or money.'],
  ['What happens to findings', 'A private report to the owner with steps to fix each issue.', 'Kept, shared, sold or misused.'],
  ['Legal position in India', 'Lawful when it stays within the agreed permission.', 'An offence under the Information Technology Act, 2000, even if nothing is changed.'],
];

const DISCLOSURE = [
  { title: 'Stop where you are', text: 'Do not click further, download anything, or try to confirm the problem by looking at more data.' },
  { title: 'Write down what you saw', text: 'Note the page, the time and what appeared. A screenshot of what you already saw is enough.' },
  { title: 'Tell an adult and report privately', text: 'With a teacher or parent, contact the organisation’s official support or security contact. In India, CERT-In receives reports of security incidents and vulnerabilities.' },
  { title: 'Give them time', text: 'Organisations need time to fix problems safely. Do not post about it publicly or share the details with friends.' },
];

const CAREERS = [
  ['Security operations centre (SOC) analyst', 'Monitors an organisation’s systems for signs of attack and responds when something looks wrong.'],
  ['Penetration tester', 'Tests systems with permission, the way an attacker would, and writes reports on how to fix what they find.'],
  ['Cloud security engineer', 'Designs and secures the online infrastructure that apps and websites run on.'],
  ['Digital forensics investigator', 'Examines devices and data after an incident to understand what happened, often supporting police investigations.'],
  ['Security researcher', 'Studies new threats and weaknesses and publishes findings responsibly.'],
  ['Governance, risk and compliance specialist', 'Helps organisations follow security laws and standards and manage risk.'],
];

export default function EthicalHacking() {
  return (
    <>
      <PageHead
        title="Ethical hacking: security testing with permission"
        lead="Ethical hackers find weaknesses so they can be fixed before criminals use them. The skills are the same as an attacker’s. Permission, purpose and responsibility are what make the work legal and useful."
      />

      <section className="band-dark permission" aria-label="The rule that comes first">
        <div className="container">
          <p className="permission-rule">Always test only systems, accounts and environments for which you have explicit permission.</p>
          <p className="permission-sub">Guessing a friend’s password, trying to get into a school system or testing a website “just to see” is unauthorised access, whatever the intention.</p>
        </div>
      </section>

      <div className="container section-tight eh">
        <section className="split" aria-labelledby="what">
          <h2 id="what">What it means</h2>
          <div className="prose">
            <p>Ethical hacking, also called penetration testing or security assessment, is the practice of examining websites, apps, networks and even staff awareness to find security weaknesses. The tester thinks like an attacker but works for the owner, under an agreement that says exactly what may be tested.</p>
            <p>At the end, the tester writes a report: what they found, how serious it is, and how to fix it. The goal is always a safer system.</p>
          </div>
        </section>

        <section className="split" aria-labelledby="why">
          <h2 id="why">Why organisations test their security</h2>
          <div className="prose">
            <p>Every system has mistakes in it. Organisations would rather find them through a trusted tester than through a criminal. Banks, hospitals, government services and app companies test regularly, especially before launching something new or after major changes.</p>
            <p>Many companies also run bug bounty programmes. These publish rules that invite outside researchers to look for and report problems in specific systems, sometimes with rewards. Testing outside those rules is still unauthorised.</p>
          </div>
        </section>

        <section aria-labelledby="compare" className="compare-wrap">
          <h2 id="compare">Authorised testing compared with unauthorised access</h2>
          <div className="table-scroll" role="region" aria-labelledby="compare" tabIndex={0}>
            <table className="compare">
              <thead>
                <tr><th scope="col"><span className="visually-hidden">Aspect</span></th><th scope="col">Authorised testing</th><th scope="col">Unauthorised access</th></tr>
              </thead>
              <tbody>
                {COMPARE.map(([k, a, b]) => (
                  <tr key={k}><th scope="row">{k}</th><td>{a}</td><td>{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="split" aria-labelledby="disclosure">
          <div>
            <h2 id="disclosure">If you notice a security problem by accident</h2>
            <p className="muted split-note">This is called responsible disclosure: telling the owner privately so they can fix it.</p>
          </div>
          <ol className="steps-plain">
            {DISCLOSURE.map((s) => (
              <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>
            ))}
          </ol>
        </section>

        <section className="split" aria-labelledby="careers">
          <h2 id="careers">Careers in cybersecurity</h2>
          <dl className="careers">
            {CAREERS.map(([role, text]) => (
              <div key={role}><dt>{role}</dt><dd>{text}</dd></div>
            ))}
          </dl>
        </section>

        <section className="split" aria-labelledby="start">
          <h2 id="start">Ways to start learning legally</h2>
          <div className="prose">
            <p><strong>Build the foundations.</strong> Learn how computers, operating systems, networks and the web work, and learn a programming language such as Python. Security makes sense once these do.</p>
            <p><strong>Join student competitions.</strong> Capture The Flag (CTF) competitions are puzzles built to be solved legally. <ExternalLink href="https://picoctf.org/">picoCTF</ExternalLink>, run by Carnegie Mellon University, is designed for school students.</p>
            <p><strong>Practise on your own setup.</strong> Practice labs that run on your own computer let you experiment without touching anyone else’s systems.</p>
            <p><strong>Find people to learn with.</strong> School and college computer clubs and teachers can point you to courses and events.</p>
            <div className="btn-row">
              <Link to="/learn/introduction-to-ethical-hacking" className="btn">Read chapter 10</Link>
              <Link to="/quizzes/introduction-to-ethical-hacking" className="btn btn-ghost">Take the ethical hacking quiz</Link>
            </div>
          </div>
        </section>

        <p className="notice notice-info eh-note">
          CyberSafe School teaches awareness only. This site does not include instructions for testing or attacking any system.
        </p>
      </div>
    </>
  );
}
