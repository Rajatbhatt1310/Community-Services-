import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section className="container section not-found">
      <h1>This page does not exist.</h1>
      <p className="lead">The link may be out of date, or the address may have a typo.</p>
      <div className="btn-row">
        <Link to="/" className="btn">Go to the homepage</Link>
        <Link to="/learn" className="btn btn-ghost">See all chapters</Link>
      </div>
    </section>
  );
}
