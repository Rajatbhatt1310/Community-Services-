// Client-side site search. Builds one index from lessons, tips, glossary, tools and help topics.
import { loadAllModules } from './content.js';
import tips from '@shared/content/tips.js';
import glossary, { termId } from '@shared/content/glossary.js';

const PAGES = [
  { title: 'Cyber Lab', text: 'Password Lab, Link X-ray and Scam or Safe tools', to: '/lab' },
  { title: 'Password Lab', text: 'Check how long a password would survive, generate a passphrase', to: '/lab#password' },
  { title: 'Link X-ray', text: 'Find the real owner of a link, spot fake bank and lookalike links', to: '/lab#link-xray' },
  { title: 'Scam or Safe', text: 'Game: decide if messages are scams, see the clues', to: '/lab#scam-or-safe' },
  { title: 'My progress', text: 'Scores, weak topics, practise questions you got wrong', to: '/progress' },
  { title: 'Safety check-up', text: 'Personal checklist for accounts, phone, social media and privacy', to: '/check-up' },
  { title: 'Glossary', text: 'Cyber terms explained simply: OTP, phishing, malware, 2FA', to: '/glossary' },
  { title: 'Workshop kit for teachers', text: 'Session plan, class mode, discussion questions, handouts', to: '/teachers' },
  { title: 'Certificate', text: 'Print your CyberSafe certificate after passing every chapter', to: '/certificate' },
  { title: 'Quizzes', text: 'Ten scenario quizzes, one per chapter', to: '/quizzes' },
  { title: 'Report cybercrime', text: 'Help wizard, 1930 helpline, cybercrime.gov.in, 112 emergency', to: '/report' },
  { title: 'Ethical hacking', text: 'Permission, responsible disclosure, careers, CTF competitions', to: '/ethical-hacking' },
  { title: 'About the project', text: 'K.R. Mangalam University, team, SDG 4 and SDG 9', to: '/about' },
  { title: 'Privacy policy', text: 'What the site stores and why', to: '/privacy' },
];

const HELP = [
  { id: 'financial-fraud', title: 'Lost money to fraud', text: 'call 1930, bank, UPI, report' },
  { id: 'cyberbullying', title: 'Being bullied online', text: 'screenshots, block, report, tell an adult' },
  { id: 'fake-profiles', title: 'Fake profile of me', text: 'impersonation, report the account' },
  { id: 'phishing', title: 'Clicked a phishing link', text: 'change password, OTP shared, bank' },
  { id: 'identity-theft', title: 'Someone is using my identity', text: 'documents, accounts, report' },
  { id: 'harassment', title: 'Threats or blackmail', text: 'sextortion, do not pay, 112' },
];

let indexPromise = null;

export function buildIndex() {
  if (!indexPromise) {
    indexPromise = loadAllModules().then((modules) => {
      const items = [];
      for (const m of modules) {
        items.push({ type: 'Chapter', title: m.title, text: m.summary, to: `/learn/${m.id}`, world: m.group });
        m.sections.forEach((s, i) => items.push({ type: 'Lesson', title: s.heading, text: `${m.title}. ${s.body}`, to: `/learn/${m.id}#part-${i + 1}`, world: m.group }));
        items.push({ type: 'Quiz', title: `${m.title} quiz`, text: `${m.questions.length} questions`, to: `/quizzes/${m.id}`, world: m.group });
      }
      tips.forEach((t) => items.push({ type: 'Tip', title: t.title, text: `${t.why} ${t.how}`, to: `/safety-tips#${t.id}` }));
      glossary.forEach((g) => items.push({ type: 'Term', title: g.term, text: g.def, to: `/glossary#${termId(g.term)}` }));
      HELP.forEach((h) => items.push({ type: 'Help', title: h.title, text: h.text, to: `/report#${h.id}` }));
      PAGES.forEach((p) => items.push({ type: 'Page', ...p }));
      return items.map((it) => ({ ...it, hay: `${it.title} ${it.text}`.toLowerCase(), titleLower: it.title.toLowerCase() }));
    });
  }
  return indexPromise;
}

export function search(index, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const scored = [];
  for (const it of index) {
    let score = 0;
    let ok = true;
    for (const w of words) {
      // Short words must start a word ("otp" should not match "footprint"); longer ones may match inside words.
      const wordStart = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
      const loose = w.length >= 4;
      if (it.titleLower.startsWith(w)) score += 6;
      else if (wordStart.test(it.titleLower)) score += 4;
      else if (loose && it.titleLower.includes(w)) score += 3;
      else if (wordStart.test(it.hay) || (loose && it.hay.includes(w))) score += 1;
      else { ok = false; break; }
    }
    if (ok) scored.push({ ...it, score: score + (it.type === 'Chapter' || it.type === 'Page' ? 1 : 0) });
  }
  return scored.sort((a, b) => b.score - a.score || a.title.length - b.title.length).slice(0, 12);
}

/** A short excerpt of text around the first matching word. */
export function excerpt(text, query, size = 110) {
  const w = query.toLowerCase().split(/\s+/).filter(Boolean)[0] || '';
  const at = Math.max(0, text.toLowerCase().indexOf(w));
  const start = Math.max(0, at - 30);
  const slice = text.slice(start, start + size);
  return `${start > 0 ? '…' : ''}${slice}${start + size < text.length ? '…' : ''}`;
}
