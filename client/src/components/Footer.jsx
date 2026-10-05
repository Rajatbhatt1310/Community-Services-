import { Link } from 'react-router';
import Logo from './Logo.jsx';
import ExternalLink from './ExternalLink.jsx';

export default function Footer() {
  return (
    <footer className="site-footer band-dark">
      <div className="container">
        <p className="footer-statement" aria-hidden="true">Learn. Verify. Protect. Report.</p>
        <div className="footer-grid">
          <div className="footer-about">
            <Link to="/" className="brand" aria-label="CyberSafe School home"><Logo /></Link>
            <p>Learn. Verify. Protect. Report. A B.Tech community service initiative by students of K.R. Mangalam University for Classes 9 to 12.</p>
          </div>
          <div>
            <h2>Learn</h2>
            <ul>
              <li><Link to="/learn">All chapters</Link></li>
              <li><Link to="/quizzes">Quizzes</Link></li>
              <li><Link to="/lab">Cyber Lab</Link></li>
              <li><Link to="/progress">My progress</Link></li>
              <li><Link to="/glossary">Glossary</Link></li>
              <li><Link to="/certificate">Certificate</Link></li>
              <li><Link to="/safety-tips">Safety tips</Link></li>
              <li><Link to="/ethical-hacking">Ethical hacking</Link></li>
            </ul>
          </div>
          <div>
            <h2>Get help</h2>
            <ul>
              <li><Link to="/report">Report cybercrime</Link></li>
              <li><Link to="/check-up">Safety check-up</Link></li>
              <li><a href="tel:1930">Call 1930 for cyber fraud</a></li>
              <li><ExternalLink href="https://cybercrime.gov.in/">cybercrime.gov.in</ExternalLink></li>
            </ul>
          </div>
          <div>
            <h2>Project</h2>
            <ul>
              <li><Link to="/about">About the project</Link></li>
              <li><Link to="/teachers">Workshop kit for teachers</Link></li>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/terms">Terms of use</Link></li>
              <li><Link to="/admin">Admin sign in</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>CyberSafe School, K.R. Mangalam University</span>
          <span>Educational content for awareness. In an emergency, call 112.</span>
        </div>
      </div>
    </footer>
  );
}
