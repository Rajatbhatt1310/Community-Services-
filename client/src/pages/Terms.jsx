import { Link } from 'react-router';
import { PageHead } from '../components/Layout.jsx';
import '../styles/pages.css';

export default function Terms() {
  return (
    <>
      <PageHead title="Terms of use" lead="The rules for using CyberSafe School, in plain language." />
      <div className="container section-tight legal">
        <p className="notice" role="note">
          Draft. These terms need review and approval by K.R. Mangalam University before the site is used publicly. Items marked “to be confirmed” are not decided yet.
        </p>

        <h2>What this site is</h2>
        <p>CyberSafe School is a free educational website created as a B.Tech community service project at K.R. Mangalam University. It offers lessons, quizzes and safety guidance about cybersecurity for students in Classes 9 to 12.</p>

        <h2>Educational information only</h2>
        <p>The content explains general good practice. It is not legal advice and does not replace help from police, your bank, your school or a lawyer. In an emergency, call 112. For money lost to online fraud, call 1930. To report cybercrime, use <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a>.</p>
        <p>The project team works to keep the content accurate, but laws, platforms and scam techniques change. Some details may be out of date.</p>

        <h2>Using the site responsibly</h2>
        <p>Use the site for learning. Do not try to disrupt it, access the admin area without permission, or send automated requests to the server. The ethical hacking material is for awareness only. Testing any system without the owner’s explicit permission is not allowed, including this website.</p>

        <h2>Quiz results</h2>
        <p>Quiz scores are for your own learning and are not official marks or certificates. How results are stored is explained in the <Link to="/privacy">privacy policy</Link>.</p>

        <h2>External links</h2>
        <p>Links to other websites are provided for help and further learning. The project is not responsible for the content of those websites.</p>

        <h2>Content ownership</h2>
        <p>Ownership and reuse permissions for the lesson content are to be confirmed by the project team and the university.</p>

        <h2>Contact</h2>
        <p>Contact details for questions about these terms: to be confirmed.</p>

        <h2>Changes</h2>
        <p>Last updated: 31 October 2026 (draft).</p>
      </div>
    </>
  );
}
