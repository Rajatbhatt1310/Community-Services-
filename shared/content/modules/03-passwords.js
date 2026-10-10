export default {
  id: 'password-safety-and-account-security',
  number: 3,
  title: 'Password Safety and Account Security',
  summary: 'Build passwords that are hard to guess, easy to remember, and backed by a second lock.',
  minutes: 9,
  group: 'foundations',
  intro:
    'Your password is the front door to your email, social media, games and school portals. Your email is especially important, because it can reset the passwords of almost everything else. Attackers do not guess passwords one at a time by hand. They use lists of leaked passwords and programs that try millions of combinations. This chapter shows you how to make a password that survives that, and how to add a second lock so a stolen password is not enough.',
  objectives: [
    'Explain why short and reused passwords are easy to break.',
    'Create a long passphrase that is strong and memorable.',
    'Use two-step verification and understand its options.',
    'Recognise signs that an account has been taken over and recover it.',
  ],
  sections: [
    {
      heading: 'How passwords get stolen',
      body:
        'There are four common ways. Guessing uses obvious choices like your name, birth year or 12345678. Leaks happen when a website is breached and its password database is published; attackers then try those passwords on other sites, which is called credential stuffing. Phishing tricks you into typing your password on a fake page. Shoulder surfing is simply someone watching you type.\n\nReused passwords make leaks dangerous. If your gaming forum password is the same as your email password, one breach unlocks both.',
    },
    {
      heading: 'What makes a password strong',
      body:
        'Length matters more than complexity. Every extra character multiplies the number of guesses needed. A passphrase made of four or more unrelated words, such as "river lantern cactus monsoon", is long, hard to guess and easier to remember than "P@ss123!".\n\nAvoid anything connected to you: names, pet names, phone numbers, school names and favourite teams can be found on social media. Never use the same password twice.',
    },
    {
      heading: 'Password managers',
      body:
        'Remembering a different strong password for every account is hard. A password manager is an app that creates and stores them for you behind one strong master password. Many phones and browsers include one built in. With a parent’s help, it is worth setting one up.',
    },
    {
      heading: 'Two-step verification',
      body:
        'Two-step verification (also called 2FA or multi-factor authentication) asks for a second proof after your password: a code from an authenticator app, a code by SMS, or a prompt on a trusted device. Even if someone has your password, they cannot get in without that second step.\n\nAuthenticator apps are safer than SMS because SMS codes can be redirected through SIM swap fraud. Save your backup codes somewhere safe and offline, so you are not locked out if you lose your phone.',
    },
  ],
  examples: [
    {
      title: 'One leak, three accounts',
      text:
        'Dev used the same password for a small gaming forum, his email and his Instagram. The forum was breached and its passwords were posted online. Within days, attackers logged into his email and reset his Instagram password. With unique passwords, only the forum account would have been exposed.',
    },
    {
      title: 'The saved second step',
      text:
        'Ananya received an email alert: "New sign-in attempt from another city." Someone had her password from an old leak, but her account asked for an authenticator code they did not have. She changed her password and the attacker never got in.',
    },
  ],
  warningSigns: [
    'Alerts about sign-ins from devices or places you do not recognise.',
    'Password reset emails you did not request.',
    'Friends receiving messages or posts you did not send.',
    'Your recovery email or phone number has been changed.',
    'Being suddenly logged out of an account on all devices.',
  ],
  dos: [
    'Use passphrases of at least 12 to 16 characters.',
    'Use a different password for every account, starting with email.',
    'Turn on two-step verification, preferably with an authenticator app.',
    'Keep your recovery email and phone number up to date.',
  ],
  donts: [
    'Do not use names, birthdays or phone numbers in passwords.',
    'Do not share passwords with friends, even best friends.',
    'Do not save passwords in an unlocked notes app or on paper in your bag.',
    'Do not stay logged in on shared or school computers.',
  ],
  prevention: [
    { title: 'Secure your email first', text: 'Give your main email the strongest unique password and two-step verification. It is the key that resets all your other accounts.' },
    { title: 'Check your sessions', text: 'Most apps have a "devices" or "where you are logged in" page. Sign out of any device you do not recognise.' },
    { title: 'Log out on shared computers', text: 'In computer labs or cyber cafes, use a private window, never tick "remember me", and log out completely when you finish.' },
    { title: 'Recover quickly', text: 'If an account is taken over, use the app’s official recovery process, change passwords for any account that used the same one, and warn your friends about possible scam messages.' },
  ],
  takeaways: [
    'Length beats complexity. Use long passphrases.',
    'Never reuse passwords, because one leak can unlock everything.',
    'Two-step verification stops most attackers even if they have your password.',
    'Protect your email account first, since it controls password resets.',
  ],
  relatedTips: ['passwords', 'twofa', 'otp'],
  questions: [
    {
      id: 'pass-q1',
      prompt: 'Which password is the strongest?',
      options: ['Rahul2009', 'P@ssw0rd!', 'river lantern cactus monsoon', '12345678'],
      answer: 2,
      explanation: 'A long passphrase of unrelated words is much harder to guess than short passwords, even ones with symbols.',
    },
    {
      id: 'pass-q2',
      prompt: 'A gaming website you used was breached. You used the same password on your email. What should you do?',
      options: [
        'Nothing, the breach was only on the gaming site.',
        'Change your email password to a new unique one and enable two-step verification.',
        'Delete your email account.',
        'Use the same password but add a "1" at the end.',
      ],
      answer: 1,
      explanation: 'Attackers try leaked passwords on other sites. Change every account that shared that password to a unique one.',
    },
    {
      id: 'pass-q3',
      prompt: 'Your best friend asks for your Instagram password to "post something funny". What should you do?',
      options: [
        'Share it because you trust them.',
        'Share it and change it later.',
        'Politely say no. Passwords are not shared, even with friends.',
        'Give them your email password instead.',
      ],
      answer: 2,
      explanation: 'Friendships change and devices get lost. Shared passwords lead to misuse and lost control of your account.',
    },
    {
      id: 'pass-q4',
      prompt: 'What does two-step verification do?',
      options: [
        'It makes your password shorter.',
        'It asks for a second proof, so a stolen password alone is not enough.',
        'It shares your password with your parents.',
        'It removes the need for a password.',
      ],
      answer: 1,
      explanation: 'Two-step verification adds a second lock, such as an app code, that an attacker usually does not have.',
    },
    {
      id: 'pass-q5',
      prompt: 'Which two-step verification method is generally the safest?',
      options: ['SMS code', 'An authenticator app', 'Security question about your pet', 'Email to a shared family account'],
      answer: 1,
      explanation: 'Authenticator apps generate codes on your device and cannot be redirected through SIM swap fraud like SMS codes can.',
    },
    {
      id: 'pass-q6',
      prompt: 'You get an email: "Your password was reset." You did not do this. What does it most likely mean?',
      options: [
        'The website was updating its design.',
        'Someone may be trying to take over your account.',
        'Your phone needs an update.',
        'Your password became stronger automatically.',
      ],
      answer: 1,
      explanation: 'Unrequested resets can mean someone is attacking your account. Check it from the official app and secure it.',
    },
    {
      id: 'pass-q7',
      prompt: 'You used a computer in the school lab to check your email. What should you do before leaving?',
      options: [
        'Close the tab.',
        'Log out completely and do not save the password in the browser.',
        'Leave it open so you can continue tomorrow.',
        'Write your password on a sticky note for next time.',
      ],
      answer: 1,
      explanation: 'Shared computers keep sessions open. Logging out properly stops the next user from accessing your account.',
    },
    {
      id: 'pass-q8',
      prompt: 'Why is it risky to use your pet’s name and birth year as a password?',
      options: [
        'Pet names are too long.',
        'This information is often visible on social media and easy to guess.',
        'Websites do not accept names.',
        'It is not risky at all.',
      ],
      answer: 1,
      explanation: 'Personal details are often public. Attackers use them first when guessing passwords.',
    },
    {
      id: 'pass-q9',
      prompt: 'Which account should you protect first with the strongest password and two-step verification?',
      options: ['A music app', 'Your main email account', 'A quiz website', 'A news app'],
      answer: 1,
      explanation: 'Your email can reset passwords for most other accounts, so it is the most important one to protect.',
    },
    {
      id: 'pass-q10',
      prompt: 'What is a password manager?',
      options: [
        'A person who keeps your passwords in a notebook.',
        'An app that creates and stores strong, unique passwords behind one master password.',
        'A website that shares passwords publicly.',
        'A setting that turns passwords off.',
      ],
      answer: 1,
      explanation: 'A password manager lets you use a different strong password everywhere without memorising them all.',
    },
  ],
};
