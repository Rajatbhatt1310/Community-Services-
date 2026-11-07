import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import LabIcon from '../components/LabIcon.jsx';
import PasswordLab from '../components/lab/PasswordLab.jsx';
import LinkXray from '../components/lab/LinkXray.jsx';
import ScamOrSafe from '../components/lab/ScamOrSafe.jsx';
import '../styles/lab.css';

const TOOLS = [
  { id: 'password', label: 'Password Lab', short: 'How long would it last?', world: 'foundations', Component: PasswordLab },
  { id: 'link-xray', label: 'Link X-ray', short: 'Who really owns this link?', world: 'people', Component: LinkXray },
  { id: 'scam-or-safe', label: 'Scam or Safe', short: 'Can you spot the fake?', world: 'data', Component: ScamOrSafe },
];

export default function Lab() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const fromHash = TOOLS.find((t) => `#${t.id}` === hash)?.id;
  const [active, setActive] = useState(fromHash || TOOLS[0].id);
  const tabRefs = useRef({});

  useEffect(() => { if (fromHash) setActive(fromHash); }, [fromHash]);

  const select = (id, focus = false) => {
    setActive(id);
    navigate({ hash: id }, { replace: true, preventScrollReset: true });
    if (focus) tabRefs.current[id]?.focus();
  };

  const onKeyDown = (e) => {
    const i = TOOLS.findIndex((t) => t.id === active);
    const move = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (move) {
      e.preventDefault();
      select(TOOLS[(i + move + TOOLS.length) % TOOLS.length].id, true);
    } else if (e.key === 'Home') { e.preventDefault(); select(TOOLS[0].id, true); }
    else if (e.key === 'End') { e.preventDefault(); select(TOOLS[TOOLS.length - 1].id, true); }
  };

  const tool = TOOLS.find((t) => t.id === active);

  return (
    <div className="lab-page">
      <header className="lab-head">
        <div className="container">
          <h1>Cyber Lab</h1>
          <p className="lead">Three hands-on tools for practising what the chapters teach. They work offline, and nothing you type leaves this device.</p>
          <div className="lab-tabs" role="tablist" aria-label="Lab tools" onKeyDown={onKeyDown}>
            {TOOLS.map((t) => (
              <button
                key={t.id}
                ref={(el) => (tabRefs.current[t.id] = el)}
                id={`tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={active === t.id}
                aria-controls={`panel-${t.id}`}
                tabIndex={active === t.id ? 0 : -1}
                className="lab-tab"
                data-world={t.world}
                onClick={() => select(t.id)}
              >
                <span className="lab-tab-icon"><LabIcon id={t.id} /></span>
                <span>
                  <span className="lab-tab-label">{t.label}</span>
                  <span className="lab-tab-short">{t.short}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="container lab-body">
        <section
          key={tool.id}
          id={`panel-${tool.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tool.id}`}
          className="lab-panel"
          data-world={tool.world}
        >
          <tool.Component />
        </section>
      </div>
    </div>
  );
}
