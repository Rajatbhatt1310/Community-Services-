// Small set of purpose-drawn icons. Decorative (aria-hidden) by default.
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'icon',
  'aria-hidden': true,
};

export const Check = (p) => (<svg {...base} {...p}><path d="M4.5 12.5l5 5L19.5 7" /></svg>);
export const Cross = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const Menu = (p) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const External = (p) => (<svg {...base} {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>);
export const Alert = (p) => (<svg {...base} {...p}><path d="M12 3.5L2.5 20h19L12 3.5z" /><path d="M12 10v4.5M12 17.2v.3" /></svg>);
export const Phone = (p) => (<svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" /></svg>);
export const Search = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>);
export const Speaker = (p) => (<svg {...base} {...p}><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" /><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /></svg>);
export const Pause = (p) => (<svg {...base} {...p}><path d="M8 5v14M16 5v14" /></svg>);
