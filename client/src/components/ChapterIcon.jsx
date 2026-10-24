// One drawn icon per chapter, so each topic is recognisable at a glance.
const P = {
  'introduction-to-cybersecurity': (
    <><path d="M12 3l8 4.5-8 4.5-8-4.5z" /><path d="M4 12l8 4.5 8-4.5" /><path d="M4 16.5L12 21l8-4.5" /></>
  ),
  'phishing-and-online-scams': (
    <><path d="M12 3v9a4 4 0 1 1-8 0" /><path d="M4 12l-1.5-1.5M4 12l1.5-1.5" /><circle cx="12" cy="3" r="0.5" /><path d="M15 8h5M15 12h3" /></>
  ),
  'password-safety-and-account-security': (
    <><circle cx="8" cy="14" r="4" /><path d="M11 11l9-9M17 5l2 2M15 7l2 2" /></>
  ),
  'social-media-safety': (
    <><path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="M19 9h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v2l-3-2h-3" /></>
  ),
  'cyberbullying-and-online-harassment': (
    <><path d="M3 10v4h3l6 4V6L6 10z" /><path d="M16 9l5 6M21 9l-5 6" /></>
  ),
  'digital-privacy-and-data-protection': (
    <><path d="M2 12s3.5-6 10-6c2 0 3.7.6 5 1.4M22 12s-3.5 6-10 6c-2 0-3.7-.6-5-1.4" /><path d="M9.5 14.5a3 3 0 0 1 5-5" /><path d="M3 21L21 3" /></>
  ),
  'social-engineering': (
    <><path d="M4 5c3-1.5 13-1.5 16 0 0 7-3 13-8 14C7 18 4 12 4 5z" /><path d="M8 10.5c1 .8 2 .8 3 0M13 10.5c1 .8 2 .8 3 0" /><path d="M9 15c2 1.2 4 1.2 6 0" /></>
  ),
  'identity-theft-and-fake-profiles': (
    <><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8.5" cy="11" r="2.2" /><path d="M5 16c.8-1.6 2-2.3 3.5-2.3S11.2 14.4 12 16" /><path d="M15 10h4M15 14h3" /></>
  ),
  'safe-internet-and-online-gaming': (
    <><path d="M7 8h10a5 5 0 0 1 4.6 7l-.4.9a2.5 2.5 0 0 1-4.3.4L15.5 15h-7l-1.4 1.3a2.5 2.5 0 0 1-4.3-.4l-.4-.9A5 5 0 0 1 7 8z" /><path d="M8 10.5v3M6.5 12h3" /><circle cx="15.5" cy="11" r="0.6" /><circle cx="17.5" cy="13" r="0.6" /></>
  ),
  'introduction-to-ethical-hacking': (
    <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /><path d="M8 10.5l2 2 3.5-4" /></>
  ),
};

export default function ChapterIcon({ id, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {P[id] || <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 12h8" /></>}
    </svg>
  );
}
