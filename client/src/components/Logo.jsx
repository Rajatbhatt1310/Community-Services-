// The CyberSafe School mark: viewfinder corners around a solid square.
// It stands for "look closely, then trust", the habit the course teaches.
export function Mark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#0E1A2E" />
      <path d="M8 13V8h5M19 8h5v5M24 19v5h-5M13 24H8v-5" fill="none" stroke="#8CC4F5" strokeWidth="2.4" strokeLinecap="square" />
      <rect x="13" y="13" width="6" height="6" fill="#F3F2EE" />
    </svg>
  );
}

export default function Logo() {
  return (
    <>
      <Mark />
      <span className="brand-word">CyberSafe <span>School</span></span>
    </>
  );
}
