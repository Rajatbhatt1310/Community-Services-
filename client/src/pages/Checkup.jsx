import { Link } from 'react-router';
import { PageHead } from '../components/Layout.jsx';
import { useCheckup, saveCheckup } from '../lib/progress.js';
import '../styles/checkup.css';

// Practical actions a student can do today. Steps are written to apply to most apps and phones.
const AREAS = [
  {
    id: 'accounts',
    world: 'foundations',
    title: 'Accounts',
    items: [
      { id: 'email-unique', title: 'My email has its own long password', how: 'Your email can reset every other account, so it gets a password used nowhere else. A passphrase of four or more random words works well.', link: '/lab#password' },
      { id: 'email-2fa', title: 'Two-step verification is on for my email', how: 'Open your email account’s security settings and switch on two-step verification. An authenticator app is safer than SMS.' },
      { id: 'social-2fa', title: 'Two-step verification is on for social media and games', how: 'Look for “Two-factor authentication” or “Login security” in each app’s settings.' },
      { id: 'no-reuse', title: 'I do not reuse passwords', how: 'Change any password you use on more than one site, starting with the most important accounts.' },
      { id: 'recovery', title: 'My recovery email and phone number are correct', how: 'Check them in your account settings so you can get back in if something goes wrong.' },
    ],
  },
  {
    id: 'phone',
    world: 'data',
    title: 'Phone and apps',
    items: [
      { id: 'lock', title: 'My phone has a screen lock', how: 'Use a PIN, pattern or fingerprint, and set the screen to lock after a minute.' },
      { id: 'updates', title: 'Automatic updates are on', how: 'Turn on automatic updates for the phone and the app store, and restart when asked.' },
      { id: 'permissions', title: 'I checked which apps can use my location, camera and contacts', how: 'Open Settings, then Privacy or Permissions. Switch off anything an app does not need. Choose “only while using the app” for location.' },
      { id: 'old-apps', title: 'I removed apps I no longer use', how: 'Old apps still collect data and may stop getting security fixes.' },
    ],
  },
  {
    id: 'social',
    world: 'people',
    title: 'Social media',
    items: [
      { id: 'private', title: 'My accounts are private', how: 'Only people you approve can see your posts and stories.' },
      { id: 'messages', title: 'Strangers cannot message or tag me freely', how: 'Limit who can send you messages, tag and mention you to friends or followers.' },
      { id: 'location', title: 'Live location sharing is off', how: 'Switch off location in posts and any map feature that shows where you are to others.' },
      { id: 'old-posts', title: 'Old public posts do not show my school, address or routine', how: 'Archive or delete posts that reveal personal details in the background.' },
    ],
  },
  {
    id: 'habits',
    world: 'careers',
    title: 'Habits',
    items: [
      { id: 'otp', title: 'I know never to share an OTP or PIN', how: 'No bank, school, delivery company or app support will ever ask for it.' },
      { id: 'helpline', title: 'I know the cyber fraud helpline: 1930', how: 'Save it in your phone and tell your family. Calling quickly after a loss gives the best chance of stopping the money.', link: '/report' },
      { id: 'trusted', title: 'I know which adult I would tell if something went wrong', how: 'A parent, guardian, teacher or counsellor. Deciding now makes it easier to ask later.' },
    ],
  },
];

const TOTAL = AREAS.reduce((s, a) => s + a.items.length, 0);

export default function Checkup() {
  const state = useCheckup();
  const done = AREAS.flatMap((a) => a.items).filter((i) => state[i.id]).length;
  const toggle = (id) => saveCheckup({ ...state, [id]: !state[id] });

  return (
    <>
      <PageHead
        title="Safety check-up"
        lead="Sixteen things you can set up today, most in a minute or two. Tick each one as you do it. Your ticks are saved only on this device."
      />
      <div className="container section-tight checkup">
        <div className="ck-summary" aria-live="polite">
          <p className="ck-count"><strong>{done}</strong> of {TOTAL} done</p>
          <div className="progress" role="progressbar" aria-label="Check-up progress" aria-valuemin={0} aria-valuemax={TOTAL} aria-valuenow={done}>
            <span style={{ width: `${(done / TOTAL) * 100}%` }} />
          </div>
          <p className="ck-message">
            {done === TOTAL ? 'Every item is done. Repeat this check-up every few months, because apps change their settings.' : done === 0 ? 'Start with Accounts. They protect everything else.' : 'Good progress. Keep going, one setting at a time.'}
          </p>
          <div className="btn-row ck-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => window.print()}>Print this checklist</button>
            {done > 0 && <button type="button" className="link-button" onClick={() => { if (window.confirm('Clear all ticks?')) saveCheckup({}); }}>Clear ticks</button>}
          </div>
        </div>

        {AREAS.map((area) => {
          const areaDone = area.items.filter((i) => state[i.id]).length;
          return (
            <section key={area.id} className="ck-area" data-world={area.world} aria-labelledby={`ck-${area.id}`}>
              <header className="ck-area-head">
                <h2 id={`ck-${area.id}`}>{area.title}</h2>
                <p>{areaDone} of {area.items.length}</p>
              </header>
              <ul className="ck-list">
                {area.items.map((item) => (
                  <li key={item.id} className={state[item.id] ? 'is-done' : ''}>
                    <label>
                      <input type="checkbox" checked={!!state[item.id]} onChange={() => toggle(item.id)} />
                      <span className="ck-box" aria-hidden="true" />
                      <span className="ck-text">
                        <span className="ck-title">{item.title}</span>
                        <span className="ck-how">{item.how}</span>
                      </span>
                    </label>
                    {item.link && <Link to={item.link} className="ck-link">Open the tool</Link>}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
