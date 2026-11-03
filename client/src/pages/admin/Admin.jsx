import { useCallback, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router';
import { api } from '../../lib/api.js';
import { PageLoading } from '../../components/Layout.jsx';
import Dashboard from './Dashboard.jsx';
import ModuleEditor from './ModuleEditor.jsx';
import '../../styles/admin.css';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState('');

  const refresh = useCallback(() => {
    api('/admin/session')
      .then(setSession)
      .catch((err) => setError(err.message));
  }, []);
  useEffect(refresh, [refresh]);

  const signOut = async () => {
    await api('/admin/logout', { method: 'POST', body: {} }).catch(() => {});
    refresh();
  };

  if (error) {
    return (
      <div className="container section admin">
        <h1>Admin</h1>
        <p className="notice notice-error admin-gap">{error} The admin dashboard needs the CyberSafe School server.</p>
      </div>
    );
  }
  if (!session) return <PageLoading />;
  if (!session.enabled) {
    return (
      <div className="container section admin">
        <h1>Admin</h1>
        <p className="notice admin-gap">Admin access is not configured on this server. Set ADMIN_PASSWORD (at least 12 characters) and SESSION_SECRET in the server’s .env file, then restart the server.</p>
      </div>
    );
  }
  if (!session.signedIn) return <Login onSignedIn={refresh} />;

  return (
    <div className="admin">
      <div className="admin-bar">
        <div className="container admin-bar-inner">
          <p><strong>Admin</strong> <span className="muted">Statistics are anonymous. No student data is collected.</span></p>
          <nav aria-label="Admin">
            <Link to="/admin">Dashboard</Link>
            <button type="button" className="link-button" onClick={signOut}>Sign out</button>
          </nav>
        </div>
      </div>
      <Routes>
        <Route index element={<Dashboard onExpired={refresh} />} />
        <Route path="modules/new" element={<ModuleEditor isNew onExpired={refresh} />} />
        <Route path="modules/:id" element={<ModuleEditor onExpired={refresh} />} />
        <Route path="*" element={<div className="container section"><p>That admin page does not exist. <Link to="/admin">Go to the dashboard</Link></p></div>} />
      </Routes>
    </div>
  );
}

function Login({ onSignedIn }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Enter the admin passphrase.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await api('/admin/login', { method: 'POST', body: { password } });
      onSignedIn();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <section className="container section admin-login">
      <h1>Admin sign in</h1>
      <p className="lead">For the CyberSafe School project team. Students do not need to sign in.</p>
      <form onSubmit={submit} noValidate className="admin-form">
        <label htmlFor="admin-pass">Admin passphrase</label>
        <input
          id="admin-pass"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'admin-pass-err' : undefined}
        />
        {error && <p id="admin-pass-err" className="field-error" role="alert">{error}</p>}
        <button type="submit" className="btn btn-accent" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </section>
  );
}
