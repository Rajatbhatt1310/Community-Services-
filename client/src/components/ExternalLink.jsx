import { External } from './Icons.jsx';

// External links open in a new tab and announce that to screen reader users.
export default function ExternalLink({ href, children, className = '', icon = true }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`ext ${className}`}>
      {children}
      {icon && <External className="icon icon-inline" />}
    </a>
  );
}
