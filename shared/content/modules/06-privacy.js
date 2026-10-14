export default {
  id: 'digital-privacy-and-data-protection',
  number: 6,
  title: 'Digital Privacy and Data Protection',
  summary: 'Understand what apps collect about you and take back control of your data.',
  minutes: 9,
  group: 'data',
  intro:
    'Every app, website and game collects some information about you. Some of it is needed for the service to work, like your username. Some of it is collected to show you ads or is shared with other companies. Digital privacy means deciding what you share, with whom, and for what purpose. You cannot avoid all data collection, but you can reduce it a lot with a few informed choices.',
  objectives: [
    'Identify personal data and sensitive personal data.',
    'Review and limit app permissions on your phone.',
    'Understand cookies, tracking and why "free" apps collect data.',
    'Know your basic rights over your data in India.',
  ],
  sections: [
    {
      heading: 'What counts as personal data',
      body:
        'Personal data is any information that can identify you: your name, phone number, email, photo, address, school, Aadhaar number, and also less obvious things like your location history, device ID and voice recordings. Some data is especially sensitive, such as health details, financial information and passwords.\n\nOn its own, one detail may seem harmless. Combined, your school name, birthday and neighbourhood can be enough for someone to impersonate you or find you.',
    },
    {
      heading: 'App permissions',
      body:
        'When an app asks for permission to use your camera, microphone, contacts, location or files, ask whether it really needs that to do its job. A torch app does not need your contacts. A photo editor needs your photos, but not your location.\n\nBoth Android and iPhone let you see and change permissions in Settings. You can choose "Allow only while using the app" for location, and you can turn off permissions for apps you rarely use.',
    },
    {
      heading: 'Why free apps collect data',
      body:
        'Many free apps earn money through advertising. To show targeted ads, they collect information about what you watch, search, buy and where you go. Cookies and trackers on websites record your browsing so ads can follow you around the internet.\n\nThis is not always harmful, but you should know it is happening. You can reduce tracking by declining non-essential cookies, using your browser’s privacy settings and limiting ad personalisation in your account settings.',
    },
    {
      heading: 'Your rights over your data',
      body:
        'India’s Digital Personal Data Protection Act, 2023 sets rules for how organisations handle personal data. It includes the idea that organisations should collect data for a clear purpose and that, for children under 18, verifiable consent from a parent or guardian is generally required. People also have rights such as asking for their data to be corrected or erased.\n\nIn practice, this means it is reasonable to ask why an app needs your data, and to say no when it does not.',
    },
  ],
  examples: [
    {
      title: 'The quiz that knew too much',
      text:
        'A "Which superhero are you?" quiz asked for Tanvi’s full name, birth date, first school and pet’s name. These are common answers to account security questions. She closed the quiz without finishing it.',
    },
    {
      title: 'The flashlight app',
      text:
        'Yash noticed his flashlight app had permission to access his contacts, location and microphone. He uninstalled it and used the flashlight built into his phone’s quick settings instead.',
    },
  ],
  warningSigns: [
    'Apps asking for permissions unrelated to what they do.',
    'Online forms or quizzes asking for birth dates, addresses or school details for no clear reason.',
    'Free services that require far more information than needed to sign up.',
    'Websites without a privacy policy or with no contact information.',
    'Unexpected ads that seem to know private conversations or searches.',
  ],
  dos: [
    'Review app permissions every few months.',
    'Use "only while using the app" for location access.',
    'Decline non-essential cookies on websites.',
    'Read what data a sign-up form actually needs.',
  ],
  donts: [
    'Do not fill in personality quizzes that ask for security details.',
    'Do not share your Aadhaar number or photos of ID cards casually.',
    'Do not give apps full access to contacts or files without a reason.',
    'Do not use public Wi-Fi for banking or logging into important accounts without care.',
  ],
  prevention: [
    { title: 'Audit your phone', text: 'Open Settings, then Privacy or Permissions. Check which apps can use your location, camera, microphone and contacts, and switch off what is not needed.' },
    { title: 'Delete what you do not use', text: 'Uninstall old apps and delete accounts you no longer need. Less data stored in fewer places means less risk if a company is breached.' },
    { title: 'Limit ad tracking', text: 'In your Google or Apple account settings, turn off ad personalisation and review your activity history.' },
    { title: 'Share the minimum', text: 'When a form asks for optional details, leave them blank. Use a nickname where a real name is not required.' },
  ],
  takeaways: [
    'Personal data includes obvious details and less obvious ones like location and device ID.',
    'Small details can be combined to impersonate or locate you.',
    'Give apps only the permissions they truly need.',
    'Free apps often pay for themselves with your data.',
    'Indian law gives you rights over your personal data, and children’s data needs extra protection.',
  ],
  relatedTips: ['personal', 'privacy', 'updates'],
  questions: [
    {
      id: 'priv-q1',
      prompt: 'A calculator app asks for permission to access your contacts and location. What should you do?',
      options: [
        'Allow everything so the app works.',
        'Deny those permissions, because a calculator does not need them.',
        'Share your contacts but not location.',
        'Install two more calculator apps.',
      ],
      answer: 1,
      explanation: 'Apps should only get permissions they need for their main function. A calculator does not need contacts or location.',
    },
    {
      id: 'priv-q2',
      prompt: 'An online quiz asks for your pet’s name, your first school and your birth date. Why is this risky?',
      options: [
        'These are often answers to account security questions.',
        'It takes too long to fill.',
        'Quizzes are always illegal.',
        'It will slow down your browser.',
      ],
      answer: 0,
      explanation: 'These details are common password reset questions and can help someone take over your accounts.',
    },
    {
      id: 'priv-q3',
      prompt: 'Which of these is personal data?',
      options: ['Today’s weather', 'Your location history', 'A school’s public address', 'The capital of India'],
      answer: 1,
      explanation: 'Location history reveals where you live, study and go, so it is personal data.',
    },
    {
      id: 'priv-q4',
      prompt: 'A website shows a cookie banner. What is the most privacy-friendly choice?',
      options: [
        'Accept all cookies.',
        'Reject or decline non-essential cookies.',
        'Close the browser forever.',
        'Share the website with friends.',
      ],
      answer: 1,
      explanation: 'Declining non-essential cookies reduces tracking and advertising profiles while keeping the site usable.',
    },
    {
      id: 'priv-q5',
      prompt: 'What is the safest location permission setting for a map app?',
      options: ['Always allow', 'Allow only while using the app', 'Share with all contacts', 'Post your location daily'],
      answer: 1,
      explanation: '"Only while using" lets the app work when you need it without tracking you all the time.',
    },
    {
      id: 'priv-q6',
      prompt: 'Why do many free apps collect lots of data about you?',
      options: [
        'To show targeted ads and earn money.',
        'Because the law requires all data.',
        'To make your phone faster.',
        'They do not collect any data.',
      ],
      answer: 0,
      explanation: 'Advertising is a common business model. Your activity is used to target ads.',
    },
    {
      id: 'priv-q7',
      prompt: 'A classmate asks you to send a photo of your Aadhaar card to "fill a form" for you. What should you do?',
      options: [
        'Send it on WhatsApp.',
        'Post it in the class group so everyone can use it.',
        'Do not send it. Fill official forms yourself with a parent’s help.',
        'Send only the back side.',
      ],
      answer: 2,
      explanation: 'ID documents can be misused for fraud. Share them only through official processes with a trusted adult.',
    },
    {
      id: 'priv-q8',
      prompt: 'You are at a cafe using free public Wi-Fi. Which activity is most risky?',
      options: ['Reading a news article', 'Watching a public video', 'Logging into your bank account', 'Checking the weather'],
      answer: 2,
      explanation: 'Public networks can be monitored or faked. Avoid sensitive logins on them, or use mobile data instead.',
    },
    {
      id: 'priv-q9',
      prompt: 'Under India’s Digital Personal Data Protection Act, 2023, what is generally needed to process data of someone under 18?',
      options: [
        'Nothing at all.',
        'Verifiable consent of a parent or guardian.',
        'A social media post.',
        'Permission from classmates.',
      ],
      answer: 1,
      explanation: 'The Act treats children’s data with extra care and generally requires verifiable parental consent.',
    },
    {
      id: 'priv-q10',
      prompt: 'You stopped using a shopping app two years ago. What is the best privacy step?',
      options: [
        'Keep it installed just in case.',
        'Delete your account and uninstall the app.',
        'Change only the profile photo.',
        'Give it more permissions.',
      ],
      answer: 1,
      explanation: 'Old accounts still hold your data. Deleting them reduces your exposure if the company is breached.',
    },
  ],
};
