export default {
  id: 'introduction-to-ethical-hacking',
  number: 10,
  title: 'Introduction to Ethical Hacking',
  summary: 'How security professionals test systems with permission, and how you can start learning legally.',
  minutes: 9,
  group: 'careers',
  intro:
    'Ethical hackers are security professionals who look for weaknesses in systems so they can be fixed before criminals find them. What separates an ethical hacker from a criminal is not skill. It is permission, purpose and responsibility. This chapter explains how ethical hacking works, why authorisation is everything, and how students can explore cybersecurity as a career in safe and legal ways.',
  objectives: [
    'Explain what ethical hacking is and why organisations use it.',
    'Distinguish authorised testing from illegal unauthorised access.',
    'Describe responsible disclosure.',
    'Identify legal ways for students to learn and possible career paths.',
  ],
  sections: [
    {
      heading: 'What ethical hackers do',
      body:
        'Organisations hire security testers to examine their websites, apps, networks and even staff awareness. Testers think like attackers, but they work under a written agreement that defines exactly what they may test, when, and how. At the end they write a report explaining the weaknesses found and how to fix them.\n\nThis work is often called penetration testing or security assessment. Many companies also run bug bounty programmes, which invite researchers to report security issues under published rules and sometimes pay rewards.',
    },
    {
      heading: 'Permission is the line',
      body:
        'Always test only systems, accounts and environments for which you have explicit permission. Trying to get into someone else’s account, a school system, a website or a Wi-Fi network without permission is illegal in India under the Information Technology Act, 2000, even if you "only wanted to see if it works" and even if you do not change anything.\n\nCuriosity is not a defence. Logging into a friend’s account because you guessed their password is unauthorised access. Ethical hackers get permission in writing before they begin.',
    },
    {
      heading: 'Responsible disclosure',
      body:
        'Sometimes people notice a security problem by accident, for example a page showing other users’ data. Responsible disclosure means reporting it privately to the organisation, through its official security contact or bug bounty programme, giving it time to fix the issue, and not accessing more data or sharing the details publicly. In India, CERT-In is the national agency that handles cybersecurity incidents and receives vulnerability reports.\n\nIf you are a student and you notice something like this, tell a teacher or parent and let an adult help you report it.',
    },
    {
      heading: 'Learning legally and careers',
      body:
        'You can practise security skills legally through Capture The Flag (CTF) competitions designed for students, such as picoCTF, through practice labs that you set up on your own computer, and through courses in networking, programming and operating systems. Strong foundations in how computers and networks work matter more than any tool.\n\nCareers include security analyst, security operations centre (SOC) analyst, penetration tester, cloud security engineer, digital forensics investigator and security researcher. Many start with a degree in computer science or IT and add industry certifications later.',
    },
  ],
  examples: [
    {
      title: 'The guessed password',
      text:
        'A Class 11 student guessed a classmate’s password and logged in "as a prank" without changing anything. This is still unauthorised access. The school treated it as a serious disciplinary matter. Having the skill to do something does not make it permitted.',
    },
    {
      title: 'The responsible report',
      text:
        'While using a coaching institute’s website, a student noticed that changing a number in the page address showed another student’s marks. She did not explore further. With her teacher, she emailed the institute’s official contact describing the issue. The institute fixed it and thanked her.',
    },
  ],
  warningSigns: [
    'Online videos encouraging you to "hack" a friend’s account or Wi-Fi.',
    'Tools promising to break into social media accounts.',
    'Someone asking you to test a system without written permission from its owner.',
    'Groups sharing leaked data or stolen accounts.',
  ],
  dos: [
    'Practise only on platforms and labs built for learning.',
    'Get written permission before testing any system.',
    'Report accidental discoveries responsibly through official contacts.',
    'Build foundations in programming, networking and operating systems.',
  ],
  donts: [
    'Do not try to access accounts, devices or networks that are not yours.',
    'Do not download "hacking apps" that promise to break into accounts.',
    'Do not share or use leaked data.',
    'Do not publicly post a security issue before it is fixed.',
  ],
  prevention: [
    { title: 'Choose legal practice spaces', text: 'Student CTF competitions and labs on your own computer let you learn without harming anyone.' },
    { title: 'Learn the rules', text: 'Read the scope and rules of any bug bounty or competition. Testing outside the scope is not allowed.' },
    { title: 'Find mentors', text: 'Join school or college computer clubs and talk to teachers about cybersecurity learning paths.' },
    { title: 'Keep ethics first', text: 'Before doing anything, ask: do I have permission, could this harm anyone, and would I be comfortable explaining it to the owner?' },
  ],
  takeaways: [
    'Ethical hacking is security testing done with permission to make systems safer.',
    'Unauthorised access is illegal, even if done out of curiosity.',
    'Report accidental discoveries privately and responsibly.',
    'Learn through CTFs, your own labs and strong computing foundations.',
  ],
  relatedTips: ['verify', 'updates', 'personal'],
  questions: [
    {
      id: 'eh-q1',
      prompt: 'What is the main difference between an ethical hacker and a criminal hacker?',
      options: [
        'Ethical hackers use better computers.',
        'Ethical hackers have explicit permission and aim to fix weaknesses.',
        'Criminal hackers work only at night.',
        'There is no difference.',
      ],
      answer: 1,
      explanation: 'Permission, purpose and responsibility separate ethical security testing from crime.',
    },
    {
      id: 'eh-q2',
      prompt: 'You guess a classmate’s password and log in just to see if it works, without changing anything. Is this allowed?',
      options: [
        'Yes, because nothing was changed.',
        'Yes, if it was a joke.',
        'No, it is unauthorised access.',
        'Yes, if you log out quickly.',
      ],
      answer: 2,
      explanation: 'Accessing someone else’s account without permission is unauthorised access, whatever the intention.',
    },
    {
      id: 'eh-q3',
      prompt: 'You accidentally notice a school website shows other students’ personal data. What should you do?',
      options: [
        'Download all the data to show proof.',
        'Post about it on social media.',
        'Stop, do not explore further, and report it through a teacher or official contact.',
        'Tell friends so they can look too.',
      ],
      answer: 2,
      explanation: 'Responsible disclosure means reporting privately without accessing more data or publicising it.',
    },
    {
      id: 'eh-q4',
      prompt: 'What is a bug bounty programme?',
      options: [
        'A game about insects.',
        'A programme where organisations invite researchers to report security issues under published rules.',
        'A way to sell stolen data.',
        'A school detention.',
      ],
      answer: 1,
      explanation: 'Bug bounty programmes define what can be tested and how to report it, sometimes with rewards.',
    },
    {
      id: 'eh-q5',
      prompt: 'Which is a legal way for a student to practise security skills?',
      options: [
        'Testing the school’s Wi-Fi without asking.',
        'Participating in a student Capture The Flag competition.',
        'Trying passwords on a friend’s account.',
        'Scanning a random company’s website.',
      ],
      answer: 1,
      explanation: 'CTF competitions are built for legal practice. Testing real systems without permission is illegal.',
    },
    {
      id: 'eh-q6',
      prompt: 'Which Indian law deals with unauthorised access to computer systems?',
      options: [
        'The Motor Vehicles Act',
        'The Information Technology Act, 2000',
        'The Right to Education Act',
        'The Copyright Act only',
      ],
      answer: 1,
      explanation: 'The IT Act, 2000 covers offences like unauthorised access and damage to computer systems.',
    },
    {
      id: 'eh-q7',
      prompt: 'A video promises an app that can "hack any Instagram account". What should you do?',
      options: [
        'Download it to test on yourself.',
        'Avoid it. Such tools are illegal to use on others and are often malware.',
        'Share it with classmates.',
        'Pay for the premium version.',
      ],
      answer: 1,
      explanation: 'These tools are commonly scams or malware, and using them on others is illegal.',
    },
    {
      id: 'eh-q8',
      prompt: 'Before a professional security test begins, what must be in place?',
      options: [
        'A written agreement defining what can be tested.',
        'A social media announcement.',
        'Nothing, testers can start anytime.',
        'Permission from any employee.',
      ],
      answer: 0,
      explanation: 'Professional testing is always governed by written authorisation and a clear scope.',
    },
    {
      id: 'eh-q9',
      prompt: 'Which subject is most useful as a foundation for a cybersecurity career?',
      options: [
        'Understanding how computers, networks and programming work.',
        'Memorising hacking tool names.',
        'Collecting leaked passwords.',
        'Watching prank videos.',
      ],
      answer: 0,
      explanation: 'Strong foundations in computing and networking are what security professionals build on.',
    },
    {
      id: 'eh-q10',
      prompt: 'Which of these is a real cybersecurity job role?',
      options: ['Security operations centre (SOC) analyst', 'Password collector', 'Account recovery hacker for hire', 'Wi-Fi borrower'],
      answer: 0,
      explanation: 'SOC analysts monitor and respond to security threats in organisations. It is a common entry-level security role.',
    },
  ],
};
