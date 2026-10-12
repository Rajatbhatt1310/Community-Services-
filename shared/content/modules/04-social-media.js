export default {
  id: 'social-media-safety',
  number: 4,
  title: 'Social Media Safety',
  summary: 'Control who sees what you post, and think about what a single photo can reveal.',
  minutes: 9,
  group: 'people',
  intro:
    'Social media helps you stay connected, share ideas and find communities. It also makes it easy to share more than you meant to, with more people than you expected. Posts can be screenshotted, saved and shared long after you delete them. Being safe on social media is not about avoiding it. It is about controlling your audience and thinking before you post.',
  objectives: [
    'Set up privacy settings that limit who can see and contact you.',
    'Identify hidden personal information in photos and posts.',
    'Understand your digital footprint and why it is permanent.',
    'Handle unwanted contact and inappropriate content safely.',
  ],
  sections: [
    {
      heading: 'Your digital footprint',
      body:
        'Everything you post, like, comment on and share forms your digital footprint. Colleges, scholarship committees and employers sometimes look at public profiles. More immediately, classmates and strangers can screenshot a story that disappears in 24 hours and keep it forever.\n\nA useful test: would you be comfortable if this post appeared on the school notice board with your name on it? If not, do not post it.',
    },
    {
      heading: 'What a photo can reveal',
      body:
        'A selfie in school uniform reveals your school. A photo of your house gate can reveal your area. A boarding pass or exam admit card can reveal your full name, roll number and more. Posting "on holiday for two weeks!" tells people your home may be empty. Live location stickers and tagged places show where you are right now.\n\nBefore posting, look at the background, not just your face. Share holiday photos after you are back.',
    },
    {
      heading: 'Privacy settings that matter',
      body:
        'Set your account to private so only approved followers see your posts. Limit who can send you messages, tag you and mention you. Turn off location sharing for posts and maps features that show your live location to friends. Hide your friend or follower list, because scammers use it to find your contacts.\n\nApps change their settings menus often, so check them every few months.',
    },
    {
      heading: 'Strangers, DMs and pressure',
      body:
        'Some people create friendly profiles to build trust with teenagers and then ask for photos, personal details or meetings. This is called grooming. Warning signs include excessive compliments, asking you to keep the chat secret, moving the conversation to a different app, and asking for pictures.\n\nNever share intimate photos with anyone online. Once sent, you lose control over them. If someone threatens to share your photos unless you pay or send more, this is sextortion. Do not pay, do not send anything more, save evidence and tell a trusted adult. It is not your fault and help is available.',
    },
  ],
  examples: [
    {
      title: 'The uniform selfie',
      text:
        'Ishita posted a public selfie with her school logo visible and a story from the bus stop she uses every day. A stranger messaged her the next week mentioning both. She switched her account to private, removed the posts and told her class teacher.',
    },
    {
      title: 'The secret chat',
      text:
        'A 17 year old "photographer" complimented Rohan’s posts and offered to make him a model. He asked Rohan to keep it secret and move to a different app. Rohan noticed the profile was two weeks old and had no real friends. He blocked and reported it, and told his parents.',
    },
  ],
  warningSigns: [
    'Someone you only know online asks you to keep your chats secret.',
    'Requests to move to a private or disappearing-message app.',
    'Asking for photos, your address, school or daily routine.',
    'Threats to share private content unless you pay or send more.',
    'New profiles with very few posts but many teenage followers.',
  ],
  dos: [
    'Keep your accounts private and review followers regularly.',
    'Check photo backgrounds for school names, addresses and documents.',
    'Block and report anyone who makes you uncomfortable.',
    'Talk to a trusted adult if someone pressures or threatens you.',
  ],
  donts: [
    'Do not share live location or travel plans publicly.',
    'Do not post photos of ID cards, admit cards or boarding passes.',
    'Do not send intimate photos to anyone.',
    'Do not meet online friends alone without telling a parent.',
  ],
  prevention: [
    { title: 'Do a privacy check-up', text: 'Go through each app’s privacy and security settings: private account, message controls, tagging, location and who can see your friend list.' },
    { title: 'Clean old posts', text: 'Scroll through older public posts and archive anything revealing personal details or things you no longer want visible.' },
    { title: 'Think before you post', text: 'Ask: who can see this, what does it reveal, and how would I feel if it were shared without my permission?' },
    { title: 'Know where to report', text: 'Every major platform has a report button on posts, profiles and messages. For serious threats or sextortion, report on cybercrime.gov.in, which has a separate section for crimes against women and children.' },
  ],
  takeaways: [
    'Your posts form a lasting digital footprint, even "disappearing" ones.',
    'Photos can reveal your school, home and routine through background details.',
    'Private accounts and message controls reduce unwanted contact.',
    'Secrecy, flattery and requests for photos are grooming warning signs.',
    'If someone threatens you, do not pay. Save evidence and tell an adult.',
  ],
  relatedTips: ['privacy', 'requests', 'personal'],
  questions: [
    {
      id: 'social-q1',
      prompt: 'You want to post a selfie taken outside your school gate. What should you check first?',
      options: [
        'Whether the lighting is good.',
        'Whether the school name or other identifying details are visible.',
        'How many likes it might get.',
        'Whether it is a weekday.',
      ],
      answer: 1,
      explanation: 'Background details can reveal where you study or live. Check what the whole photo shows, not just your face.',
    },
    {
      id: 'social-q2',
      prompt: 'Your family is going on a two week trip. When is the safest time to post holiday photos publicly?',
      options: ['Before leaving', 'Live during the trip with location tags', 'After you return home', 'Never post any photos ever'],
      answer: 2,
      explanation: 'Posting during the trip can show your home is empty. Sharing after you return keeps the memory without the risk.',
    },
    {
      id: 'social-q3',
      prompt: 'An online friend you have never met asks you to keep your chats secret from your parents. What does this suggest?',
      options: [
        'They respect your privacy.',
        'It is a warning sign of grooming.',
        'They are shy.',
        'This is normal on all apps.',
      ],
      answer: 1,
      explanation: 'Asking for secrecy is a common grooming tactic to isolate a young person from people who could help.',
    },
    {
      id: 'social-q4',
      prompt: 'Someone threatens to share a private photo of you unless you send money. What should you do?',
      options: [
        'Pay quickly so they delete it.',
        'Send another photo to calm them down.',
        'Do not pay, save evidence, block, and tell a trusted adult and report it.',
        'Delete your account and say nothing.',
      ],
      answer: 2,
      explanation: 'Paying usually leads to more demands. Save evidence, stop contact, get adult help and report on cybercrime.gov.in.',
    },
    {
      id: 'social-q5',
      prompt: 'Which setting best limits strangers from seeing your posts?',
      options: ['A public account', 'A private account with approved followers only', 'A new profile picture', 'Posting only at night'],
      answer: 1,
      explanation: 'A private account means only followers you approve can see your posts and stories.',
    },
    {
      id: 'social-q6',
      prompt: 'Why is it risky to show your followers or friends list publicly?',
      options: [
        'It makes the app slower.',
        'Scammers can use it to impersonate you and contact people you know.',
        'It uses more mobile data.',
        'There is no risk.',
      ],
      answer: 1,
      explanation: 'Fake profiles often copy your photos and message your friends list asking for money or information.',
    },
    {
      id: 'social-q7',
      prompt: 'You posted a story that disappears in 24 hours. Which statement is true?',
      options: [
        'Nobody can save it.',
        'Anyone who views it can screenshot or record it.',
        'It is deleted from the internet forever after 24 hours.',
        'Only your parents can see it.',
      ],
      answer: 1,
      explanation: 'Disappearing content can still be captured. Treat every post as potentially permanent.',
    },
    {
      id: 'social-q8',
      prompt: 'Which of these is safe to post publicly?',
      options: [
        'A photo of your exam admit card.',
        'Your boarding pass before a flight.',
        'A drawing you made, with no personal details.',
        'Your house number and street name.',
      ],
      answer: 2,
      explanation: 'Documents and addresses reveal personal information. Creative work without identifying details is fine to share.',
    },
    {
      id: 'social-q9',
      prompt: 'An online friend wants to meet you in person. What is the safest approach?',
      options: [
        'Go alone to a quiet place.',
        'Tell a parent, and only meet if they agree, in a public place with an adult present.',
        'Meet late at night when it is less crowded.',
        'Keep it secret to avoid fuss.',
      ],
      answer: 1,
      explanation: 'People are not always who they say online. Involving a trusted adult and meeting publicly keeps you safe.',
    },
    {
      id: 'social-q10',
      prompt: 'What is your "digital footprint"?',
      options: [
        'The size of your phone screen.',
        'The record of what you post, share and do online.',
        'The number of apps installed.',
        'Your internet speed.',
      ],
      answer: 1,
      explanation: 'Your digital footprint is the trail of your online activity, and it can be seen by others for years.',
    },
  ],
};
