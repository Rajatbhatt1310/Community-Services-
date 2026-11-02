import { PageHead } from '../components/Layout.jsx';
import '../styles/pages.css';

export default function Privacy() {
  return (
    <>
      <PageHead title="Privacy policy" lead="What this website collects, why, and where it is stored. This policy describes how the software actually works." />
      <div className="container section-tight legal">
        <p className="notice" role="note">
          Draft. This policy needs review and approval by K.R. Mangalam University before the site is used publicly. Items marked “to be confirmed” depend on decisions the project team has not made yet.
        </p>

        <h2>Who runs this website</h2>
        <p>CyberSafe School is a B.Tech community service project by students of K.R. Mangalam University. Contact for privacy questions: to be confirmed.</p>

        <h2>No accounts for students</h2>
        <p>Students do not create accounts, sign in or give their name, email, phone number, school or class to use this website. The site never asks for passwords or OTPs.</p>

        <h2>What is stored in your browser</h2>
        <p>Your quiz scores (best score, last score, number of attempts and date for each chapter) are saved in your browser’s local storage so you can see your progress. This information stays on your device and is not sent to the server. You can delete it with “Clear my saved scores” on the Learn or Quizzes page, or by clearing your browser’s site data.</p>

        <h2>What is sent to the server</h2>
        <p>When you finish a quiz, the website sends an anonymous result to the project server: which chapter the quiz was for, which questions were answered correctly or incorrectly, and the time. It does not include your name, an account, or any identifier for your device. The project team uses these results only as totals and averages, for example to see which topics students find hardest.</p>
        <p>The server keeps the most recent 50,000 quiz results. A formal retention period is to be confirmed.</p>
        <p>Like any web server, the computer hosting this site receives your IP address when you connect. The application does not save IP addresses to its data store. It keeps them briefly in memory to limit repeated requests. Logging by the hosting provider is to be confirmed once hosting is chosen.</p>

        <h2>Third-party services</h2>
        <p>The site loads its font (Manrope) from Google Fonts. When it does, your browser connects to Google’s servers, which receive your IP address. No other third-party services, analytics, advertising or tracking cookies are used.</p>
        <p>Links to external websites such as cybercrime.gov.in open in a new tab. Those sites have their own privacy policies.</p>

        <h2>Administrators</h2>
        <p>Project administrators sign in to manage lessons and view aggregate statistics. Signing in sets a single security cookie used only to keep the administrator signed in. Administrators cannot see any individual student’s identity, because none is collected.</p>

        <h2>Children’s data</h2>
        <p>The site is designed for students under 18. It avoids collecting personal data so that no parental consent is needed to use it. If future features ever require personal data, this policy and the consent process will be updated first, in line with India’s Digital Personal Data Protection Act, 2023.</p>

        <h2>Changes</h2>
        <p>Last updated: 31 October 2026 (draft).</p>
      </div>
    </>
  );
}
