import { useEffect, useRef, useState } from 'react';
import { Speaker, Pause } from './Icons.jsx';

const supported = () => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => v.lang === 'en-IN') || voices.find((v) => v.lang?.startsWith('en-GB')) || voices.find((v) => v.lang?.startsWith('en')) || null;
}

/**
 * Reads a chapter aloud, one section at a time, using the browser's built-in speech.
 * parts: [{ id, text }] where id is the element to highlight while it is read.
 */
export default function ReadAloud({ parts }) {
  const [state, setState] = useState('idle'); // idle | playing | paused
  const [current, setCurrent] = useState(null);
  const index = useRef(0);
  const cancelled = useRef(false);

  useEffect(() => () => { cancelled.current = true; if (supported()) window.speechSynthesis.cancel(); }, []);

  useEffect(() => {
    document.querySelectorAll('.is-reading').forEach((el) => el.classList.remove('is-reading'));
    if (!current) return;
    const el = document.getElementById(current);
    if (el) {
      el.classList.add('is-reading');
      el.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }, [current]);

  if (!supported()) return null;

  const speakFrom = (i) => {
    if (i >= parts.length) { setState('idle'); setCurrent(null); return; }
    index.current = i;
    const u = new SpeechSynthesisUtterance(parts[i].text);
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.lang = voice?.lang || 'en-IN';
    u.rate = 0.95;
    u.onend = () => { if (!cancelled.current) speakFrom(index.current + 1); };
    u.onerror = () => { if (!cancelled.current) { setState('idle'); setCurrent(null); } };
    setCurrent(parts[i].id);
    window.speechSynthesis.speak(u);
  };

  const start = () => {
    cancelled.current = false;
    window.speechSynthesis.cancel();
    setState('playing');
    speakFrom(0);
  };
  const pause = () => { window.speechSynthesis.pause(); setState('paused'); };
  const resume = () => { window.speechSynthesis.resume(); setState('playing'); };
  const stop = () => {
    cancelled.current = true;
    window.speechSynthesis.cancel();
    setState('idle');
    setCurrent(null);
  };

  return (
    <div className="read-aloud" role="group" aria-label="Read this chapter aloud">
      {state === 'idle' && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={start}><Speaker /> Listen to this chapter</button>
      )}
      {state === 'playing' && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={pause}><Pause /> Pause</button>
      )}
      {state === 'paused' && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={resume}><Speaker /> Resume</button>
      )}
      {state !== 'idle' && <button type="button" className="link-button" onClick={stop}>Stop</button>}
      <span className="visually-hidden" aria-live="polite">{state === 'playing' ? 'Reading aloud' : state === 'paused' ? 'Paused' : ''}</span>
    </div>
  );
}
