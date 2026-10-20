// Cyber safety tips. Module pages link to these by id (relatedTips).
const tips = [
  {
    id: 'otp',
    title: 'Never share an OTP or password',
    why: 'An OTP is the final key to your account or bank transaction. Anyone who has it can act as you.',
    how: 'No bank, school, delivery company or app support team will ever ask for your OTP. If someone asks, end the conversation.',
  },
  {
    id: 'links',
    title: 'Pause before you open a link',
    why: 'Most phishing attacks start with a link that leads to a fake login page or a harmful download.',
    how: 'Check who sent it and where it really goes. When in doubt, open the official app or type the website address yourself.',
  },
  {
    id: 'twofa',
    title: 'Turn on two-step verification',
    why: 'Even if your password leaks, a second step stops most attackers from getting in.',
    how: 'Open the security settings of your email, social media and gaming accounts and switch on two-step verification. An authenticator app is safer than SMS.',
  },
  {
    id: 'passwords',
    title: 'Use a strong, different password for each account',
    why: 'When one website is breached, attackers try the same email and password on other sites.',
    how: 'Use long passphrases of four or more random words. A password manager can remember them for you.',
  },
  {
    id: 'updates',
    title: 'Keep your apps and phone updated',
    why: 'Updates fix security holes that attackers already know about.',
    how: 'Turn on automatic updates and restart your device when it asks. Remove apps you no longer use.',
  },
  {
    id: 'privacy',
    title: 'Review your privacy settings',
    why: 'Default settings often show your posts, friends list and location to people you do not know.',
    how: 'Make your accounts private, limit who can message you, and switch off location sharing in posts and photos.',
  },
  {
    id: 'requests',
    title: 'Be careful with unknown friend requests',
    why: 'Fake profiles are used to build trust before asking for photos, money or personal details.',
    how: 'Accept requests only from people you know in real life. Check mutual friends, profile age and posting history.',
  },
  {
    id: 'bullying',
    title: 'Report cyberbullying, do not carry it alone',
    why: 'Bullying usually gets worse when it stays hidden, and nobody deserves to face it alone.',
    how: 'Do not reply. Take screenshots, block and report the account, and tell a parent, teacher or counsellor.',
  },
  {
    id: 'verify',
    title: 'Verify before you share',
    why: 'Fake news and edited images spread fast and can harm real people.',
    how: 'Check whether trusted news sources report the same thing. Look at the date and the original source before forwarding.',
  },
  {
    id: 'personal',
    title: 'Protect your personal information',
    why: 'Small details such as your school, address, date of birth and phone number can be combined to impersonate or track you.',
    how: 'Keep these details off public profiles and away from online forms and quizzes that do not need them.',
  },
];

export default tips;
