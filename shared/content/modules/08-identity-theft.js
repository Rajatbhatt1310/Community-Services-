export default {
  id: 'identity-theft-and-fake-profiles',
  number: 8,
  title: 'Identity Theft and Fake Profiles',
  summary: 'How someone can pretend to be you, how to spot fake accounts, and what to do about it.',
  minutes: 8,
  group: 'people',
  intro:
    'Identity theft happens when someone uses your personal information, photos or documents to pretend to be you. Online, this can be as simple as a fake profile using your photos, or as serious as using your ID documents to open accounts or take loans. Fake profiles are also used to trick you, by pretending to be a friend, a celebrity or an attractive stranger. This chapter helps you spot both sides.',
  objectives: [
    'Explain how identity theft happens and what information it uses.',
    'Identify the signs of a fake profile.',
    'Take steps to report impersonation and recover control.',
    'Protect ID documents and photos from misuse.',
  ],
  sections: [
    {
      heading: 'How your identity gets stolen',
      body:
        'Attackers collect details from many places: public social media, leaked databases, photos of documents shared on chat apps, and phishing forms. A photo of your Aadhaar card, school ID or exam admit card, combined with your phone number, can be enough to impersonate you in some situations.\n\nFor students, the most common form is profile cloning: someone copies your photos and name to create a new account, then messages your friends asking for money or spreading rumours.',
    },
    {
      heading: 'Spotting a fake profile',
      body:
        'Look for a recently created account, very few posts, or posts all uploaded on the same day. Check whether the profile photo looks like a model or a stock image; a reverse image search can show if it appears elsewhere online. Fake profiles often have many followers but few real interactions, and send friend requests to lots of people from the same school.\n\nIf someone you are already friends with sends a new request, it is probably a clone. Ask the real person through another channel.',
    },
    {
      heading: 'Romance and celebrity fakes',
      body:
        'Some fake profiles pretend to be a celebrity, influencer or attractive teenager. They build a friendship over days or weeks, then ask for money, gift cards, photos or personal details. They may avoid video calls with excuses. If someone you have never met in person starts asking for anything, treat it as a serious warning sign.',
    },
  ],
  examples: [
    {
      title: 'The duplicate request',
      text:
        'Zoya got a friend request from her cousin, who was already on her friend list. The new account messaged her asking to borrow money for a "blocked UPI". She called her cousin, who reported the clone. Zoya also reported it from her side.',
    },
    {
      title: 'The shared admit card',
      text:
        'A student posted his admit card in a public group to ask about exam timing. Someone later used his name, roll number and photo to create a profile and message other students. He reported the account and learned to share documents only with teachers through official channels.',
    },
  ],
  warningSigns: [
    'A second friend request from someone already on your list.',
    'New accounts with stock-like photos and almost no history.',
    'Profiles that avoid video calls but ask for money or photos.',
    'Messages from friends that do not sound like them.',
    'OTP messages or account alerts you did not request.',
  ],
  dos: [
    'Report clone and impersonation accounts on the platform.',
    'Warn your friends if someone is impersonating you.',
    'Watermark or limit who can see your photos.',
    'Keep ID documents offline or in secure official apps.',
  ],
  donts: [
    'Do not accept duplicate friend requests without checking.',
    'Do not send money to profiles you only know online.',
    'Do not post photos of ID cards or documents.',
    'Do not share login codes with anyone claiming to "verify" you.',
  ],
  prevention: [
    { title: 'Make photos harder to copy', text: 'Keep your account private and limit who can download or share your posts.' },
    { title: 'Search for yourself', text: 'Occasionally search your name on social platforms to spot any profiles copying you.' },
    { title: 'Store documents safely', text: 'Use official apps like DigiLocker for documents instead of chat apps and photo galleries.' },
    { title: 'Respond to impersonation quickly', text: 'Report the fake account, collect screenshots and links, inform friends, and report on cybercrime.gov.in if money or threats are involved.' },
  ],
  takeaways: [
    'Identity theft uses your details, photos or documents to pretend to be you.',
    'Duplicate requests and new, empty profiles are common fake-account signs.',
    'Never send money to someone you only know online.',
    'Report impersonation quickly and warn your contacts.',
  ],
  relatedTips: ['requests', 'personal', 'otp'],
  questions: [
    {
      id: 'id-q1',
      prompt: 'You get a friend request from a classmate who is already on your friend list. What should you do?',
      options: [
        'Accept it.',
        'Check with the classmate through another channel before accepting.',
        'Send them your password.',
        'Accept and send money if asked.',
      ],
      answer: 1,
      explanation: 'Duplicate requests are a common sign of a cloned account. Confirm with the real person first.',
    },
    {
      id: 'id-q2',
      prompt: 'Which detail most strongly suggests a profile is fake?',
      options: [
        'It has posts going back several years.',
        'It was created last week and has photos that look like a model shoot.',
        'It has mutual friends you know well.',
        'It posts about school events.',
      ],
      answer: 1,
      explanation: 'New accounts with professional-looking or stolen photos and no history are typical of fake profiles.',
    },
    {
      id: 'id-q3',
      prompt: 'Someone created an account using your name and photos. What is the first useful step?',
      options: [
        'Ignore it.',
        'Save screenshots and the profile link, then report it for impersonation.',
        'Message them threats.',
        'Delete all your accounts.',
      ],
      answer: 1,
      explanation: 'Evidence and reporting for impersonation help the platform remove the account quickly.',
    },
    {
      id: 'id-q4',
      prompt: 'An online friend you have never met avoids video calls but asks you for a gift card. What is the likely situation?',
      options: [
        'They have a broken camera.',
        'It is likely a fake profile running a scam.',
        'They are a celebrity.',
        'This is normal online friendship.',
      ],
      answer: 1,
      explanation: 'Avoiding video calls and asking for money or gift cards are classic signs of fake profile scams.',
    },
    {
      id: 'id-q5',
      prompt: 'What is the safest way to store a copy of your ID documents?',
      options: [
        'In a public social media post.',
        'In a group chat.',
        'In an official secure app such as DigiLocker.',
        'On the back of your notebook.',
      ],
      answer: 2,
      explanation: 'Official secure apps protect documents better than galleries, chats or public posts.',
    },
    {
      id: 'id-q6',
      prompt: 'Why should you warn your friends if someone is impersonating you?',
      options: [
        'So they can ask the fake account for money.',
        'So they do not trust messages or requests from the fake account.',
        'To get more followers.',
        'It is not necessary.',
      ],
      answer: 1,
      explanation: 'Impersonators target your contacts. Warning them stops the scam from spreading.',
    },
    {
      id: 'id-q7',
      prompt: 'Which tool can help check whether a profile photo is stolen from elsewhere?',
      options: ['A calculator', 'A reverse image search', 'A music app', 'A screen brightness setting'],
      answer: 1,
      explanation: 'Reverse image search shows where else a photo appears online, which can reveal stolen images.',
    },
    {
      id: 'id-q8',
      prompt: 'You receive an OTP for a service you never signed up for. What could it mean?',
      options: [
        'A free gift is coming.',
        'Someone may be trying to use your phone number or identity.',
        'Your phone is updating.',
        'Nothing at all, OTPs are random.',
      ],
      answer: 1,
      explanation: 'Unrequested OTPs can mean someone is trying to create or access an account with your details. Do not share the code.',
    },
    {
      id: 'id-q9',
      prompt: 'Which information is most useful to someone trying to impersonate you?',
      options: [
        'Your favourite colour.',
        'Your full name, photo, school and phone number together.',
        'The weather in your city.',
        'Your favourite movie.',
      ],
      answer: 1,
      explanation: 'Combined identifying details make impersonation convincing. Keep them off public profiles.',
    },
    {
      id: 'id-q10',
      prompt: 'An impersonator used your identity to ask your friends for money and some paid. Where can this be reported officially?',
      options: [
        'A gaming forum.',
        'The National Cyber Crime Reporting Portal (cybercrime.gov.in).',
        'Your school canteen.',
        'Any comment section.',
      ],
      answer: 1,
      explanation: 'Identity-based fraud is a cybercrime. Report on cybercrime.gov.in, and call 1930 when money has been lost.',
    },
  ],
};
