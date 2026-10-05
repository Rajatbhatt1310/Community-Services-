import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import Logo from './Logo.jsx';
import { Menu, Cross, Search } from './Icons.jsx';
const CommandPalette = lazy(() => import('./CommandPalette.jsx'));

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/learn', label: 'Learn' },
  { to: '/quizzes', label: 'Quizzes' },
  { to: '/lab', label: 'Cyber Lab' },
  { to: '/safety-tips', label: 'Safety Tips' },
  { to: '/ethical-hacking', label: 'Ethical Hacking' },
  { to: '/report', label: 'Report Cybercrime' },
  { to: '/about', label: 'About' },
];

const NavItems = () =>
  NAV.map((item) => (
    <li key={item.to}>
      <NavLink to={item.to} end={item.end} className="nav-link">
        {item.label}
      </NavLink>
    </li>
  ));

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const location = useLocation();
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => setOpen(false), [location.pathname]);

  // Ctrl+K, Cmd+K or / opens search from anywhere (except while typing in a field).
  useEffect(() => {
    const onKey = (e) => {
      const typing = e.target.closest?.('input, textarea, select, [contenteditable]');
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); setSearching(true); }
      else if (e.key === '/' && !typing) { e.preventDefault(); setSearching(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container bar">
        <Link to="/" className="brand" aria-label="CyberSafe School home">
          <Logo />
        </Link>
        <nav className="nav-desktop" aria-label="Main">
          <ul><NavItems /></ul>
        </nav>
        <div className="header-tools">
          <button type="button" className="search-button" onClick={() => setSearching(true)} aria-label="Search the site (Ctrl+K)">
            <Search />
            <span className="search-label">Search</span>
            <kbd aria-hidden="true">Ctrl K</kbd>
          </button>
          <Link to="/learn" className="btn btn-sm nav-cta">Start Learning</Link>
          <button
          ref={buttonRef}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Cross /> : <Menu />}
          <span className="menu-label">{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>
      {searching && <Suspense fallback={null}><CommandPalette onClose={() => setSearching(false)} /></Suspense>}
      {open && (
        <nav id="mobile-nav" className="nav-mobile" aria-label="Main" ref={panelRef}>
          <ul><NavItems /></ul>
          <Link to="/learn" className="btn btn-accent">Start Learning</Link>
        </nav>
      )}
    </header>
  );
}
