// Link X-ray: takes a URL apart and explains the tricks it might be using.
// It never opens or fetches the link. Checks are heuristics for teaching, not a verdict.

// Two-part public suffixes that matter most for Indian and common links.
const MULTI_SUFFIXES = [
  'co.in', 'com.in', 'bank.in', 'fin.in', 'net.in', 'org.in', 'gov.in', 'nic.in', 'ac.in', 'edu.in', 'res.in', 'firm.in', 'gen.in', 'ind.in',
  'co.uk', 'org.uk', 'ac.uk', 'gov.uk', 'com.au', 'net.au', 'org.au', 'co.nz', 'com.br', 'co.jp', 'com.sg', 'com.my',
  'github.io', 'netlify.app', 'vercel.app', 'web.app', 'firebaseapp.com', 'pages.dev', 'blogspot.com', 'wixsite.com', 'weebly.com', 'herokuapp.com', 'glitch.me', '000webhostapp.com', 'repl.co',
];
// Free hosting platforms where anyone can create a site under the platform's name.
const FREE_HOSTS = ['github.io', 'netlify.app', 'vercel.app', 'web.app', 'firebaseapp.com', 'pages.dev', 'blogspot.com', 'wixsite.com', 'weebly.com', 'herokuapp.com', 'glitch.me', '000webhostapp.com', 'repl.co', 'sites.google.com', 'forms.gle', 'docs.google.com'];

// Brands that scammers commonly imitate, with the domains they really use.
const BRANDS = {
  sbi: ['sbi.co.in', 'onlinesbi.sbi', 'sbi.bank.in'], hdfc: ['hdfcbank.com', 'hdfc.com'], icici: ['icicibank.com', 'icici.bank.in'],
  axis: ['axisbank.com'], kotak: ['kotak.com'], paytm: ['paytm.com'], phonepe: ['phonepe.com'], gpay: ['pay.google.com'],
  google: ['google.com', 'google.co.in', 'youtube.com', 'gmail.com'], youtube: ['youtube.com', 'youtu.be'],
  instagram: ['instagram.com'], facebook: ['facebook.com', 'fb.com'], whatsapp: ['whatsapp.com', 'wa.me'],
  amazon: ['amazon.in', 'amazon.com'], flipkart: ['flipkart.com'], netflix: ['netflix.com'], microsoft: ['microsoft.com', 'live.com', 'office.com'],
  apple: ['apple.com', 'icloud.com'], airtel: ['airtel.in'], jio: ['jio.com'], irctc: ['irctc.co.in'], uidai: ['uidai.gov.in'],
  aadhaar: ['uidai.gov.in'], incometax: ['incometax.gov.in'], epfo: ['epfindia.gov.in'], steam: ['steampowered.com', 'steamcommunity.com'],
  roblox: ['roblox.com'], epicgames: ['epicgames.com'], garena: ['garena.com', 'ff.garena.com'], krafton: ['krafton.com', 'battlegroundsmobileindia.com'],
  discord: ['discord.com', 'discord.gg'], telegram: ['telegram.org', 't.me'], snapchat: ['snapchat.com'], cbse: ['cbse.gov.in', 'cbse.nic.in'],
};
const SHORTENERS = ['bit.ly', 'tinyurl.com', 't.co', 'cutt.ly', 'rb.gy', 'is.gd', 'ow.ly', 'shorturl.at', 'tiny.cc', 'rebrand.ly', 'goo.su', 'shorturl.asia', 'v.gd'];
// Endings that are cheap to register and appear often in scam reports. Many honest sites use them too.
const RISKY_TLDS = ['xyz', 'top', 'click', 'buzz', 'icu', 'cyou', 'rest', 'sbs', 'cfd', 'live', 'shop', 'online', 'site', 'club', 'win', 'loan', 'work', 'support', 'help', 'link', 'info', 'monster', 'quest'];
const BAIT_WORDS = ['login', 'log-in', 'signin', 'verify', 'verification', 'secure', 'security', 'update', 'kyc', 'account', 'reward', 'rewards', 'free', 'gift', 'bonus', 'prize', 'winner', 'claim', 'refund', 'support', 'helpdesk', 'unlock', 'blocked', 'suspend', 'confirm', 'wallet', 'otp', 'scholarship', 'diamonds', 'uc', 'robux', 'vbucks'];
const RISKY_FILES = /\.(apk|exe|scr|bat|cmd|msi|js|vbs|jar)(\?|#|$)/i;

const LOOKALIKE = { '0': 'o', '1': 'l', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', rn: 'm', vv: 'w', cl: 'd' };
const deconfuse = (s) => s.replace(/rn/g, 'm').replace(/vv/g, 'w').replace(/[0134578]/g, (c) => LOOKALIKE[c]);

function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return d[a.length][b.length];
}

export function xray(input) {
  const raw = input.trim();
  if (!raw) return null;
  const flags = [];
  const add = (severity, title, text) => flags.push({ severity, title, text });

  const hadScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw);
  let url;
  try {
    url = new URL(hadScheme ? raw : `http://${raw}`);
  } catch {
    return { error: 'That does not look like a web address. Paste the whole link, for example https://example.com/page.' };
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    return { error: `This is a ${url.protocol.replace(':', '')} link, not a web page. Links like this can open apps or run actions, so do not tap them unless you trust the sender.` };
  }

  const host = url.hostname.toLowerCase().replace(/\.$/, '');
  const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.startsWith('[');
  const labels = host.split('.');
  let registrable = host;
  let suffix = labels.slice(-1)[0];
  if (!isIp) {
    const two = labels.slice(-2).join('.');
    const three = labels.slice(-3).join('.');
    if (MULTI_SUFFIXES.includes(two) && labels.length >= 3) { registrable = three; suffix = two; }
    else if (labels.length >= 2) { registrable = two; suffix = labels.slice(-1)[0]; }
  }
  const sub = !isIp && host !== registrable ? host.slice(0, host.length - registrable.length - 1) : '';
  const name = registrable.split('.')[0];

  // Structural tricks
  if (url.username || url.password || raw.replace(/^[a-z]+:\/\//i, '').split('/')[0].includes('@')) {
    add('high', 'Hidden destination using “@”', `Everything before the “@” is ignored by the browser. This link really goes to ${host}, not to the text shown before it.`);
  }
  if (isIp) add('high', 'Uses a number instead of a name', 'Real companies use names like bank.com, not raw IP addresses. This is common in phishing links.');
  if (host.includes('xn--') || /[^\x00-\x7f]/.test(input)) {
    add('high', 'Contains look-alike letters from other alphabets', 'Some letters can look identical to English letters but are different characters. The address may imitate a real site.');
  }
  if (!hadScheme) add('info', 'No http or https', 'The link was written without a scheme. Browsers would usually open it as a normal web page.');
  else if (url.protocol === 'http:') add('medium', 'Not encrypted (http)', 'Anything you type here could be read by others on the network. Never enter passwords on http pages. Note: https alone does not prove a site is honest.');

  if (SHORTENERS.includes(registrable) || SHORTENERS.includes(host)) {
    add('medium', 'Shortened link', 'Short links hide where they really go. Real organisations rarely send short links asking you to log in or pay.');
  }
  const freeHost = FREE_HOSTS.find((f) => host === f || host.endsWith(`.${f}`));
  if (freeHost === 'forms.gle' || freeHost === 'docs.google.com') {
    add('medium', 'A form anyone can make', 'Anyone can create a Google Form or Doc, including scammers. Fine for class surveys, but never type a password, OTP or bank details into one.');
  } else if (freeHost) {
    add('medium', 'Free website builder', `Anyone can create a free site on ${freeHost}. A bank or school would not ask you to log in on one.`);
  }

  // Brand impersonation
  const tokens = `${sub}.${url.pathname}`.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const nameTokens = name.split('-');
  const realBrand = Object.entries(BRANDS).find(([, domains]) => domains.some((d) => host === d || host.endsWith(`.${d}`)));
  // Short brand names (like "sbi") must match a whole word; longer ones may sit inside a word ("hdfcbank").
  const mentions = (list, brand) => list.some((t) => t === brand || (brand.length >= 4 && t.includes(brand)));
  const spoofedDomain = !realBrand && Object.values(BRANDS).flat().find((d) => sub === d || sub.startsWith(`${d}.`) || sub.endsWith(`.${d}`) || sub.includes(`${d}.`));
  if (spoofedDomain) {
    add('high', `Starts with “${spoofedDomain}” to fool you`, `The address begins with a real company’s domain, but the part that decides who owns the link comes last: ${registrable}.`);
  } else if (!realBrand) {
    for (const [brand, domains] of Object.entries(BRANDS)) {
      if (mentions(nameTokens, brand) && (nameTokens.length > 1 || name !== brand)) {
        add('high', `Uses “${brand}” but is not ${brand}’s website`, `The real ${brand} site is ${domains[0]}. This address is ${registrable}, which anyone could register.`);
        break;
      }
      if (mentions(tokens, brand)) {
        add('high', `“${brand}” appears in the wrong place`, `The name ${brand} is in the ${sub && sub.includes(brand) ? 'subdomain' : 'path'}, but the site that owns this link is ${registrable}.`);
        break;
      }
      const cleaned = deconfuse(name);
      if (name !== brand && (cleaned === brand || (brand.length >= 5 && editDistance(name, brand) === 1))) {
        add('high', `Looks like “${brand}” but is spelled differently`, `“${name}” is made to look like ${brand}. The real site is ${domains[0]}.`);
        break;
      }
    }
  }

  // Wording and shape
  const bait = realBrand ? [] : BAIT_WORDS.filter((w) => host.split(/[.-]/).includes(w) || url.pathname.toLowerCase().split(/[^a-z0-9]+/).includes(w));
  if (bait.length) add('medium', 'Pressure or reward words', `The link contains ${bait.slice(0, 4).map((w) => `“${w}”`).join(', ')}. Scam links often use words like these to sound urgent or tempting.`);
  if (!freeHost && (name.match(/-/g) || []).length >= 2) add('medium', 'Many hyphens in the name', 'Names like secure-login-verify-account.com are typical of throwaway scam sites.');
  if (!isIp && labels.length - registrable.split('.').length >= 3) add('medium', 'Very deep subdomains', 'Long chains of subdomains are used to push the real owner out of sight on small phone screens.');
  if (RISKY_TLDS.includes(suffix)) add('low', `Ends in .${suffix}`, `.${suffix} addresses are cheap to register and common in scam reports. Plenty of honest sites use them too, so check the owner.`);
  if (RISKY_FILES.test(url.pathname)) add('high', 'Downloads an app or program', 'This link points straight to a file that can install software. Install apps only from the official app store.');
  if (url.port && !['80', '443'].includes(url.port)) add('low', `Unusual port :${url.port}`, 'Normal websites do not need a port number in the address.');
  if (raw.length > 120) add('low', 'Very long link', 'Long links can hide the important part. Look only at the owner shown above.');

  const score = flags.reduce((s, f) => s + ({ high: 3, medium: 2, low: 1, info: 0 })[f.severity], 0);
  const verdict =
    score >= 3 ? { key: 'risky', label: 'Looks risky', text: 'Do not open it, and do not enter anything on it. If it claims to be from a company, go to that company’s app or website yourself.' } :
    score >= 1 ? { key: 'careful', label: 'Be careful', text: 'Something here is unusual. Check who sent it and why before opening it.' } :
    { key: 'clear', label: 'No obvious tricks found', text: realBrand ? `This link belongs to ${registrable}, which is used by ${realBrand[0]}. Still check that you expected the message.` : 'That does not make it safe. Ask yourself whether you expected this link and whether you know who owns the site.' };

  return {
    parts: { scheme: hadScheme ? url.protocol.replace(':', '') : '', sub, registrable, port: url.port, path: url.pathname === '/' ? '' : url.pathname, query: url.search, hash: url.hash },
    owner: isIp ? host : registrable,
    flags: flags.sort((a, b) => ['high', 'medium', 'low', 'info'].indexOf(a.severity) - ['high', 'medium', 'low', 'info'].indexOf(b.severity)),
    verdict,
  };
}
