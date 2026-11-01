import { useEffect, useRef, useState } from 'react';
import { PageHead } from '../components/Layout.jsx';
import ExternalLink from '../components/ExternalLink.jsx';
import { Phone, Alert } from '../components/Icons.jsx';
import '../styles/pages.css';
import '../styles/wizard.css';

const WIZARD_LABELS = {
  'financial-fraud': 'I or my family lost money',
  cyberbullying: 'Someone keeps bullying me online',
  'fake-profiles': 'Someone made a fake profile of me',
  phishing: 'I clicked a link or shared details',
  'identity-theft': 'Someone is using my identity',
  harassment: 'I am being threatened or blackmailed',
};

/** A short guided flow that shows only the steps for what happened. */
function HelpWizard() {
  const [step, setStep] = useState('danger');
  const [situation, setSituation] = useState(null);
  const [done, setDone] = useState(() => new Set());
  const headingRef = useRef(null);

  useEffect(() => {
    if (step !== 'danger') headingRef.current?.focus();
  }, [step, situation]);

  const pick = (id) => { setSituation(id); setDone(new Set()); setStep('plan'); };
  const restart = () => { setSituation(null); setStep('danger'); };
  const s = SITUATIONS.find((x) => x.id === situation);
  const toggle = (i) => setDone((d) => { const n = new Set(d); n.has(i) ? n.delete(i) : n.add(i); return n; });

  return (
    <section className="wizard" aria-labelledby="wizard-title">

      {step === 'danger' && (
        <div className="wizard-step">
          <h2 id="wizard-title">Is anyone in danger right now, or being threatened with physical harm?</h2>
          <div className="wizard-choices two">
            <button type="button" className="wizard-choice is-urgent" onClick={() => setStep('emergency')}>Yes, someone could get hurt</button>
            <button type="button" className="wizard-choice" onClick={() => setStep('what')}>No, but something went wrong online</button>
          </div>
        </div>
      )}

      {step === 'emergency' && (
        <div className="wizard-step">
          <h2 id="wizard-title" ref={headingRef} tabIndex={-1}>Call 112 now and tell an adult near you.</h2>
          <a href="tel:112" className="wizard-call is-urgent"><Phone /> Call 112, emergency</a>
          <p className="wizard-note">When you are safe, come back and we will help you report what happened online.</p>
          <div className="btn-row">
            <button type="button" className="btn btn-accent" onClick={() => setStep('what')}>I am safe now, continue</button>
            <button type="button" className="btn btn-ghost" onClick={restart}>Start again</button>
          </div>
        </div>
      )}

      {step === 'what' && (
        <div className="wizard-step">
          <h2 id="wizard-title" ref={headingRef} tabIndex={-1}>What happened?</h2>
          <div className="wizard-choices">
            {SITUATIONS.map((x) => (
              <button key={x.id} type="button" className="wizard-choice" onClick={() => pick(x.id)}>{WIZARD_LABELS[x.id]}</button>
            ))}
          </div>
          <button type="button" className="link-button" onClick={restart}>Back</button>
        </div>
      )}

      {step === 'plan' && s && (
        <div className="wizard-step">
          <h2 id="wizard-title" ref={headingRef} tabIndex={-1}>Your plan: {s.title.toLowerCase()}</h2>
          {situation === 'financial-fraud' && (
            <a href="tel:1930" className="wizard-call is-urgent"><Phone /> Call 1930 now. The sooner you call, the better the chance of stopping the money.</a>
          )}
          {situation === 'harassment' && (
            <p className="wizard-alert"><Alert /> Do not pay and do not send anything more. This is not your fault.</p>
          )}
          <p className="wizard-progress" aria-live="polite">{done.size} of {s.steps.length} steps done</p>
          <ol className="wizard-plan">
            {s.steps.map((text, i) => (
              <li key={text} className={done.has(i) ? 'is-done' : ''}>
                <label>
                  <input type="checkbox" checked={done.has(i)} onChange={() => toggle(i)} />
                  <span className="wizard-num" aria-hidden="true">{i + 1}</span>
                  <span>{text}</span>
                </label>
              </li>
            ))}
          </ol>
          <div className="btn-row">
            <ExternalLink href="https://cybercrime.gov.in/" className="btn btn-accent">Open cybercrime.gov.in</ExternalLink>
            <button type="button" className="btn btn-ghost" onClick={restart}>Something else happened</button>
          </div>
          <p className="wizard-note">Nothing you tick here is saved or sent. It is only a checklist to help you stay calm and do things in order.</p>
        </div>
      )}
    </section>
  );
}

const SITUATIONS = [
  {
    id: 'financial-fraud',
    title: 'Financial fraud',
    when: 'Money left your or your family’s account through a scam, fake payment request, UPI trick or fake website.',
    steps: [
      'Tell a parent or guardian immediately. Time matters.',
      'Call 1930 as soon as possible. Quick reports give the best chance of stopping the money.',
      'Call the bank using the number on the card or the official app, and ask them to block the card, UPI or account.',
      'File a complaint on cybercrime.gov.in with transaction IDs, dates, amounts and screenshots.',
      'Change passwords and PINs of any account that may have been exposed.',
    ],
  },
  {
    id: 'cyberbullying',
    title: 'Cyberbullying',
    when: 'Someone keeps sending hurtful messages, posting about you, sharing edited photos or excluding you on purpose.',
    steps: [
      'Do not reply or retaliate.',
      'Take screenshots that show the message, the account name and the date.',
      'Block the person and use the platform’s report option.',
      'Tell a parent, teacher or school counsellor. Schools can act even if it happened outside school.',
      'If there are threats, stalking or sharing of private images, report on cybercrime.gov.in.',
    ],
  },
  {
    id: 'fake-profiles',
    title: 'Fake profiles',
    when: 'An account is using your name or photos, or a profile is pretending to be someone you know.',
    steps: [
      'Save the profile link and screenshots of the account and any messages it sent.',
      'Report it to the platform as impersonation. Ask friends to report it too.',
      'Warn your contacts not to trust messages or money requests from it.',
      'If it is used to cheat people or threaten you, report on cybercrime.gov.in.',
    ],
  },
  {
    id: 'phishing',
    title: 'Phishing',
    when: 'You received a suspicious message, or you clicked a link or shared details you now regret.',
    steps: [
      'If you only received it: do not click. Report it as spam and delete it.',
      'If you entered a password: change it from the official app or website and turn on two-step verification.',
      'If you shared an OTP, PIN or card details: tell an adult and call your bank and 1930 straight away.',
      'Report phishing websites and messages on cybercrime.gov.in.',
    ],
  },
  {
    id: 'identity-theft',
    title: 'Identity theft',
    when: 'Someone is using your documents, photos, phone number or personal details to act as you.',
    steps: [
      'Tell a parent or guardian.',
      'List what may have been misused: ID documents, phone number, email, accounts.',
      'Secure your email and phone accounts first with new passwords and two-step verification.',
      'Report on cybercrime.gov.in and inform any organisation where your identity was used.',
    ],
  },
  {
    id: 'harassment',
    title: 'Online harassment and threats',
    when: 'Someone threatens you, stalks you online, asks for intimate photos, or threatens to share private content.',
    steps: [
      'Stop responding. Do not pay and do not send anything more.',
      'Save evidence: screenshots, usernames, links and dates.',
      'Tell a trusted adult. This is not your fault.',
      'Report on cybercrime.gov.in. The portal has a separate section for crimes against women and children.',
      'If you are in immediate danger, call 112.',
    ],
  },
];

export default function Report() {
  return (
    <>
      <PageHead
        title="Need Help? Report Cybercrime."
        lead="If something has gone wrong online, you are not in trouble for asking for help. Talk to a parent, teacher or guardian you trust, then use the official channels below."
      />

      <section className="band-dark contacts" aria-labelledby="contacts-title">
        <div className="container">
          <h2 id="contacts-title" className="visually-hidden">Official contacts</h2>
          <div className="contact-grid">
            <a href="tel:1930" className="contact contact-main">
              <span className="contact-what"><Phone /> Cyber fraud helpline</span>
              <span className="contact-big">1930</span>
              <span className="contact-note">For money lost to online fraud. Call as soon as possible.</span>
            </a>
            <div className="contact">
              <span className="contact-what">National Cyber Crime Reporting Portal</span>
              <ExternalLink href="https://cybercrime.gov.in/" className="contact-link">cybercrime.gov.in</ExternalLink>
              <span className="contact-note">Government of India portal to file complaints about all types of cybercrime.</span>
            </div>
            <a href="tel:112" className="contact">
              <span className="contact-what">Emergency</span>
              <span className="contact-mid">112</span>
              <span className="contact-note">If you or someone else is in immediate danger.</span>
            </a>
          </div>
        </div>
      </section>

      <div className="container section-tight">
        <HelpWizard />

        <div className="trusted">
          <h2>First, tell someone you trust</h2>
          <p>A parent, guardian, teacher or school counsellor can help you decide what to do, contact your bank or school, and file reports with you. Many complaints need an adult’s involvement anyway. If you feel unable to talk to family, a teacher or counsellor is a good place to start.</p>
        </div>

        <nav className="jump" aria-label="Situations on this page">
          <p>Jump to what happened:</p>
          <ul>
            {SITUATIONS.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
          </ul>
        </nav>

        {SITUATIONS.map((s) => (
          <section key={s.id} id={s.id} className="situation-block" aria-labelledby={`${s.id}-t`}>
            <div>
              <h2 id={`${s.id}-t`}>{s.title}</h2>
              <p className="muted">{s.when}</p>
            </div>
            <ol className="steps-plain compact">
              {s.steps.map((step) => <li key={step}><p>{step}</p></li>)}
            </ol>
          </section>
        ))}

        <section className="evidence" aria-labelledby="evidence-title">
          <h2 id="evidence-title">Evidence to keep before you report</h2>
          <ul className="square-list two-col">
            <li>Screenshots showing messages, usernames and dates</li>
            <li>Links to profiles, posts or websites</li>
            <li>Transaction IDs, amounts and times for payments</li>
            <li>Phone numbers, email addresses or UPI IDs used</li>
            <li>Any emails or SMS you received</li>
            <li>A short note of what happened and when</li>
          </ul>
          <p className="muted evidence-note">Do not delete chats or block before you have saved evidence. You can block straight after.</p>
        </section>
      </div>
    </>
  );
}
