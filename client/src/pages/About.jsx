import { Link } from 'react-router';
import { PageHead } from '../components/Layout.jsx';
import '../styles/pages.css';

const TEAM = ['Rajat Bhatt', 'Vansh', 'Ryan', 'Roshan', 'Aryan'];

export default function About() {
  return (
    <>
      <PageHead title="About CyberSafe School" />

      <div className="container section-tight about">
        <p className="about-statement">
          CyberSafe School is a community service initiative aimed at improving cybersecurity awareness among school students. Through educational content, interactive workshops and online quizzes, the project encourages responsible digital behaviour and safer internet usage.
        </p>

        <section className="split" aria-labelledby="details">
          <h2 id="details">Project details</h2>
          <dl className="details">
            <div><dt>Project</dt><dd>CyberSafe School</dd></div>
            <div><dt>Institution</dt><dd>K.R. Mangalam University</dd></div>
            <div><dt>Project type</dt><dd>B.Tech Community Service Initiative</dd></div>
            <div><dt>Audience</dt><dd>School students, Classes 9 to 12</dd></div>
            <div><dt>Approach</dt><dd>Ten learning chapters, scenario quizzes, safety tips, reporting guidance and school workshops</dd></div>
          </dl>
        </section>

        <section className="split" aria-labelledby="sdg">
          <h2 id="sdg">Sustainable Development Goals</h2>
          <div className="sdgs">
            <article className="sdg">
              <p className="sdg-tag">Primary goal</p>
              <h3>SDG 4: Quality Education</h3>
              <p className="muted">Free, practical learning that gives students the knowledge and habits to stay safe in a digital world.</p>
            </article>
            <article className="sdg">
              <p className="sdg-tag">Secondary goal</p>
              <h3>SDG 9: Industry, Innovation and Infrastructure</h3>
              <p className="muted">Safer use of digital infrastructure, and early exposure to cybersecurity as a field of study and work.</p>
            </article>
          </div>
        </section>

        <section className="split" aria-labelledby="team">
          <h2 id="team">Project team</h2>
          <div>
            <ul className="team">
              {TEAM.map((name) => <li key={name}>{name}</li>)}
            </ul>
            <p className="muted small team-note">Students of K.R. Mangalam University.</p>
          </div>
        </section>

        <section className="split" aria-labelledby="data">
          <h2 id="data">How the site treats students</h2>
          <div className="prose">
            <p>There are no student accounts and no sign-up. Lessons and quizzes work without giving any personal information. Quiz scores are kept in your own browser. The project only receives anonymous quiz results, with no names, to understand which topics need more teaching.</p>
            <p><Link to="/privacy">Read the privacy policy</Link></p>
          </div>
        </section>
      </div>
    </>
  );
}
