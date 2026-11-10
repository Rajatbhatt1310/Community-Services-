// Plain-language definitions of terms used in the chapters.
// "module" links each term to the chapter that explains it in context.
const glossary = [
  { term: '2FA (two-step verification)', def: 'A second proof of identity after your password, such as a code from an app. A stolen password alone is then not enough to get in.', module: 'password-safety-and-account-security' },
  { term: 'Authenticator app', def: 'An app on your phone that creates a new six-digit code every 30 seconds for two-step verification. Safer than codes sent by SMS.', module: 'password-safety-and-account-security' },
  { term: 'Baiting', def: 'Leaving something tempting, such as a free download or a USB drive labelled “exam answers”, so that someone picks it up and gets infected or tricked.', module: 'social-engineering' },
  { term: 'Bug bounty', def: 'A programme where an organisation invites security researchers to find and report weaknesses in its systems, under published rules.', module: 'introduction-to-ethical-hacking' },
  { term: 'Catfishing', def: 'Creating a fake online identity, often with someone else’s photos, to build a relationship and then deceive or exploit the other person.', module: 'identity-theft-and-fake-profiles' },
  { term: 'CERT-In', def: 'The Indian Computer Emergency Response Team, the national agency that handles cybersecurity incidents.', module: 'introduction-to-ethical-hacking' },
  { term: 'Cookie', def: 'A small file a website saves in your browser. Some keep you logged in; others track what you do across sites to show ads.', module: 'digital-privacy-and-data-protection' },
  { term: 'Credential stuffing', def: 'When attackers take usernames and passwords leaked from one website and try them on many others. It works because people reuse passwords.', module: 'password-safety-and-account-security' },
  { term: 'Cyberbullying', def: 'Repeated behaviour using phones, games or the internet to hurt, embarrass, threaten or exclude someone.', module: 'cyberbullying-and-online-harassment' },
  { term: 'Deepfake', def: 'A fake video, photo or voice made with AI so that it seems to show a real person saying or doing something they never did.', module: 'social-media-safety' },
  { term: 'Digital arrest scam', def: 'A scam where callers pretend to be police or officials and claim you are under arrest over a video call until you pay. Real police do not do this.', module: 'phishing-and-online-scams' },
  { term: 'Digital footprint', def: 'The record of everything you post, share, like and do online. Much of it lasts for years and can be seen by others.', module: 'social-media-safety' },
  { term: 'Domain', def: 'The name of a website, like cbse.gov.in. The part just before the ending shows who owns the site.', module: 'phishing-and-online-scams' },
  { term: 'Encryption', def: 'Scrambling information so only someone with the right key can read it. The padlock in a browser means the connection is encrypted, not that the site is honest.', module: 'safe-internet-and-online-gaming' },
  { term: 'Ethical hacking', def: 'Testing a system for weaknesses with the owner’s written permission, so the problems can be fixed.', module: 'introduction-to-ethical-hacking' },
  { term: 'Grooming', def: 'When someone builds trust with a young person online, often with flattery and secrecy, in order to exploit them.', module: 'social-media-safety' },
  { term: 'HTTPS', def: 'The secure version of the web protocol. It protects data in transit, but scam sites can use it too, so always check the address.', module: 'safe-internet-and-online-gaming' },
  { term: 'Identity theft', def: 'Using someone’s personal details, photos or documents to pretend to be them, often to cheat others or open accounts.', module: 'identity-theft-and-fake-profiles' },
  { term: 'Malware', def: 'Harmful software, such as viruses, spyware and password stealers, often hidden in cracked apps, cheats or attachments.', module: 'introduction-to-cybersecurity' },
  { term: 'OTP (one-time password)', def: 'A short code sent to you to confirm a login or payment. Anyone who has it can act as you, so it must never be shared.', module: 'phishing-and-online-scams' },
  { term: 'Passphrase', def: 'A password made of several random words. Long, hard to guess and easier to remember than a short password with symbols.', module: 'password-safety-and-account-security' },
  { term: 'Password manager', def: 'An app that creates and remembers a strong, different password for each of your accounts behind one master password.', module: 'password-safety-and-account-security' },
  { term: 'Phishing', def: 'A message that pretends to come from someone you trust to make you click a link, share a code or pay money.', module: 'phishing-and-online-scams' },
  { term: 'Pretexting', def: 'Inventing a believable story, such as a fake bank officer or SIM upgrade, to trick someone into giving information.', module: 'social-engineering' },
  { term: 'Ransomware', def: 'Malware that locks your files and demands payment to unlock them.', module: 'introduction-to-cybersecurity' },
  { term: 'Responsible disclosure', def: 'Reporting a security problem privately to the organisation and giving it time to fix it, without exploring further or making it public.', module: 'introduction-to-ethical-hacking' },
  { term: 'Sextortion', def: 'Threatening to share someone’s private images unless they pay or send more. Do not pay; save evidence, tell an adult and report it.', module: 'social-media-safety' },
  { term: 'SIM swap', def: 'A fraud where someone gets your phone number moved to their SIM card, so they receive your OTPs and calls.', module: 'social-engineering' },
  { term: 'Smishing', def: 'Phishing sent by SMS text message.', module: 'phishing-and-online-scams' },
  { term: 'Social engineering', def: 'Manipulating people, through trust, fear, urgency or curiosity, into giving access or information.', module: 'social-engineering' },
  { term: 'Tailgating', def: 'Following an authorised person through a secure door without permission.', module: 'social-engineering' },
  { term: 'UPI collect request', def: 'A request for money sent through a UPI app. Approving it with your PIN sends money away. You never need a PIN to receive money.', module: 'phishing-and-online-scams' },
  { term: 'Vishing', def: 'Phishing by phone call, where the caller pretends to be from a bank, company or authority.', module: 'phishing-and-online-scams' },
];

export const termId = (term) => term.toLowerCase().replace(/\(.*?\)/g, '').trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default glossary;
