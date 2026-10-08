export default {
  id: 'introduction-to-cybersecurity',
  number: 1,
  title: 'Introduction to Cybersecurity',
  summary: 'What cybersecurity protects, who attackers are, and why your everyday habits matter.',
  minutes: 8,
  group: 'foundations',
  intro:
    'Your phone holds your messages, photos, school work, passwords and often access to a family bank account. Cybersecurity is the set of habits and tools that keeps all of that safe from people who want to steal it, change it or lock you out of it. You do not need to be a programmer to practise it. Most attacks on students succeed because of a single rushed click, a reused password or an overshared detail.',
  objectives: [
    'Explain what cybersecurity protects using the ideas of confidentiality, integrity and availability.',
    'Name the most common types of threats that students face.',
    'Understand why attackers target ordinary people, not only companies.',
    'Describe the basic habits that prevent most attacks.',
  ],
  sections: [
    {
      heading: 'What are we actually protecting?',
      body:
        'Security experts describe three goals. Confidentiality means only the right people can see your information, like your chats or marks. Integrity means nobody can secretly change it, like editing a payment request or a message sent in your name. Availability means you can use it when you need it, like getting into your email the night before an assignment is due.\n\nEvery attack breaks at least one of these. A leaked password breaks confidentiality. A hacked account posting fake messages breaks integrity. Ransomware that locks your files breaks availability.',
    },
    {
      heading: 'Who attacks, and why you?',
      body:
        'Most attackers are not movie hackers targeting one famous person. They are criminals sending thousands of messages and waiting for a few people to respond. Your account is valuable to them because it can be sold, used to scam your friends, or used to reach your parents’ money.\n\nSome harm comes from people you know: a classmate who guesses your password, or someone who screenshots a private chat. Cybersecurity covers both strangers and familiar faces.',
    },
    {
      heading: 'The most common threats',
      body:
        'Phishing tricks you into giving away passwords or OTPs. Malware is harmful software hidden in fake apps, cracked games or attachments. Account takeover happens when a weak or reused password is guessed or leaked. Scams use fake offers, prizes or jobs to get money. Social engineering manipulates your trust, fear or curiosity instead of breaking any technology.\n\nYou will study each of these in the following chapters.',
    },
    {
      heading: 'Why habits matter more than tools',
      body:
        'Antivirus software and spam filters help, but they cannot stop you from typing your password into a fake page. Attackers know this, so they aim at human decisions. Good habits such as pausing before clicking, using unique passwords and keeping apps updated block the large majority of everyday attacks.',
    },
  ],
  examples: [
    {
      title: 'The free game skin',
      text:
        'Aarav sees a post offering free premium skins for a popular game. The site asks him to log in with his game account. The next day his account is gone and his friends are receiving scam messages from it. The site was a fake login page built to collect passwords.',
    },
    {
      title: 'The locked laptop',
      text:
        'Meera downloads a cracked version of a paid editing app from an unknown website. After installation, her files are renamed and a message demands payment to unlock them. Her project files, saved only on that laptop, are lost.',
    },
  ],
  warningSigns: [
    'Messages that create panic or urgency, such as your account being blocked today.',
    'Offers that seem too good to be true, like free paid apps or prizes you never entered for.',
    'Requests for passwords, OTPs or personal details from anyone.',
    'Apps or files from outside the official app store or the company’s own website.',
    'Your device suddenly becoming slow, showing pop-ups or sending messages you did not write.',
  ],
  dos: [
    'Use a different, long password for every important account.',
    'Turn on two-step verification wherever it is offered.',
    'Install apps only from official stores.',
    'Keep a backup of important school files in a second place.',
  ],
  donts: [
    'Do not share passwords, even with close friends.',
    'Do not install cracked or modded software.',
    'Do not click links in unexpected messages without checking.',
    'Do not ignore update notifications for weeks.',
  ],
  prevention: [
    { title: 'Lock your devices', text: 'Use a PIN, pattern or fingerprint lock on your phone and a password on your laptop. Set the screen to lock automatically after a minute.' },
    { title: 'Update regularly', text: 'Turn on automatic updates for your phone, browser and apps. Many attacks use security holes that were fixed months ago.' },
    { title: 'Back up what matters', text: 'Save important files to a cloud drive or a separate storage device so one problem does not erase your work.' },
    { title: 'Ask before acting', text: 'If something online feels strange or urgent, stop and ask a parent, teacher or a friend you trust before you respond.' },
  ],
  takeaways: [
    'Cybersecurity protects the confidentiality, integrity and availability of your information.',
    'Attackers target ordinary students because accounts and data have real value.',
    'Most attacks rely on tricking people, so your habits are your strongest defence.',
    'Strong unique passwords, two-step verification, updates and backups block most everyday threats.',
  ],
  relatedTips: ['passwords', 'twofa', 'updates'],
  questions: [
    {
      id: 'intro-q1',
      prompt: 'A hacker changes the marks in an online school record without permission. Which security goal has been broken?',
      options: ['Availability', 'Integrity', 'Confidentiality', 'Authentication'],
      answer: 1,
      explanation: 'Integrity means information is not changed without permission. Secretly editing marks is an integrity violation.',
    },
    {
      id: 'intro-q2',
      prompt: 'You cannot open your files because ransomware has locked them. Which goal is mainly affected?',
      options: ['Availability', 'Integrity', 'Confidentiality', 'Privacy settings'],
      answer: 0,
      explanation: 'Availability means you can use your data when you need it. Ransomware blocks access, so availability is broken.',
    },
    {
      id: 'intro-q3',
      prompt: 'Why would an attacker want the social media account of an ordinary Class 10 student?',
      options: [
        'Attackers only target celebrities, so they would not.',
        'To improve the student’s privacy settings.',
        'To scam the student’s friends and family or sell the account.',
        'Because student accounts cannot be recovered.',
      ],
      answer: 2,
      explanation: 'Hacked accounts are used to send scams to people who trust the owner, or are sold. Ordinary accounts are valuable.',
    },
    {
      id: 'intro-q4',
      prompt: 'A website offers a paid video editor for free if you download a "cracked" version. What is the main risk?',
      options: [
        'The app may run slower than usual.',
        'The download may contain hidden malware.',
        'The colours may look different.',
        'There is no risk if the website looks professional.',
      ],
      answer: 1,
      explanation: 'Cracked software is a common way to spread malware, including ransomware and password stealers.',
    },
    {
      id: 'intro-q5',
      prompt: 'Which habit protects you if one of your passwords is leaked in a website breach?',
      options: [
        'Using the same password everywhere so it is easy to remember.',
        'Writing the password in your bio.',
        'Using a different password for each account.',
        'Changing your profile photo.',
      ],
      answer: 2,
      explanation: 'With unique passwords, a leak from one site cannot be used to open your other accounts.',
    },
    {
      id: 'intro-q6',
      prompt: 'Your phone shows a notification that a security update is available. What should you do?',
      options: [
        'Install it soon, because updates fix known security holes.',
        'Ignore it, because updates only change the design.',
        'Uninstall the app that asked.',
        'Wait a year to see if others like it.',
      ],
      answer: 0,
      explanation: 'Security updates close weaknesses that attackers already know about. Installing them quickly reduces your risk.',
    },
    {
      id: 'intro-q7',
      prompt: 'What does "social engineering" mean?',
      options: [
        'Building social media apps.',
        'Manipulating people into giving access or information.',
        'Repairing broken computers.',
        'Studying how social networks grow.',
      ],
      answer: 1,
      explanation: 'Social engineering targets human trust and emotions rather than technology, for example a fake support call asking for an OTP.',
    },
    {
      id: 'intro-q8',
      prompt: 'Your laptop suddenly shows many pop-ups and your browser homepage has changed. What is the most sensible first step?',
      options: [
        'Keep using it and ignore the changes.',
        'Click the pop-ups to see what they offer.',
        'Tell a trusted adult and run a scan with the device’s built-in security tool.',
        'Post about it publicly with your login details so others can help.',
      ],
      answer: 2,
      explanation: 'Unexpected pop-ups and changed settings can be signs of malware. Get help and use the device’s security tools before using accounts on it.',
    },
    {
      id: 'intro-q9',
      prompt: 'Which of these is the best protection for school project files?',
      options: [
        'Keeping them only on your desktop.',
        'Keeping a backup copy in a second place.',
        'Renaming them often.',
        'Sending them to strangers for safekeeping.',
      ],
      answer: 1,
      explanation: 'Backups mean that a broken device, ransomware or a mistake does not erase your only copy.',
    },
    {
      id: 'intro-q10',
      prompt: 'Most successful attacks on students happen because of:',
      options: [
        'Advanced attacks that no one can stop.',
        'Broken internet cables.',
        'Human mistakes such as clicking fake links or reusing passwords.',
        'Using a phone instead of a laptop.',
      ],
      answer: 2,
      explanation: 'Attackers usually aim at human decisions. Good habits stop most everyday attacks.',
    },
  ],
};
