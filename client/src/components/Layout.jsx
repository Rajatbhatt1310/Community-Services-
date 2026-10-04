import { Suspense, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export function PageLoading() {
  return (
    <div className="container section" aria-busy="true">
      <span className="visually-hidden" role="status">Loading</span>
    </div>
  );
}

export function PageHead({ title, lead, crumb, children }) {
  return (
    <header className="page-head">
      <div className="container">
        {crumb && <p className="crumb"><Link to={crumb.to}>{crumb.label}</Link></p>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </header>
  );
}

export function OfflineNotice() {
  return (
    <div className="container offline-notice">
      <p className="notice notice-info" role="status">
        The CyberSafe School server is not reachable, so you are seeing the built-in lessons. Quizzes still work, but results are only saved on this device.
      </p>
    </div>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const mainRef = useRef(null);
  const first = useRef(true);

  // On route change: scroll to the top (or the hash target) and move focus to the main region.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (hash) {
      // The target may live in a lazily loaded page, so wait briefly for it to appear.
      const target = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const timer = setInterval(() => {
        const el = document.getElementById(target);
        if (el || ++tries > 40) {
          clearInterval(timer);
          el?.scrollIntoView();
        }
      }, 50);
      return () => clearInterval(timer);
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
