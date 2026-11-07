// Icons for the three Cyber Lab tools.
const P = {
  password: (<><rect x="3" y="10" width="18" height="11" rx="2.5" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /><path d="M8 15.5h.01M12 15.5h.01M16 15.5h.01" /></>),
  'link-xray': (<><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /><path d="M3 3l2.5 2.5M21 21l-2.5-2.5" /></>),
  'scam-or-safe': (<><rect x="3" y="5" width="12" height="15" rx="2" transform="rotate(-8 9 12.5)" /><rect x="9" y="4" width="12" height="15" rx="2" /><path d="M13 11.5l2 2 3.5-4" /></>),
};

export default function LabIcon({ id }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[id]}
    </svg>
  );
}
