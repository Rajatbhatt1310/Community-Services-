export default {
  id: 'social-engineering',
  number: 7,
  title: 'Social Engineering',
  summary: 'The psychology behind scams: trust, fear, curiosity and helpfulness, and how to resist it.',
  minutes: 8,
  group: 'people',
  intro:
    'Social engineering is the art of manipulating people into breaking normal security rules. Instead of hacking a system, the attacker hacks a person: their trust, fear, curiosity or wish to help. It works on smart people too, because it targets emotions rather than knowledge. Phishing is one form of it, but social engineering also happens face to face, over the phone and in group chats.',
  objectives: [
    'Name the emotional triggers social engineers use.',
    'Recognise pretexting, baiting, tailgating and impersonation.',
    'Apply a simple verification routine before you comply with a request.',
    'Understand why saying no politely is always acceptable.',
  ],
  sections: [
    {
      heading: 'The triggers attackers pull',
      body:
        'Authority: "This is the principal’s office" or "I am from the cyber police." People tend to obey authority without checking. Urgency: "Do it in the next ten minutes." Time pressure stops careful thinking. Fear: "Your account will be deleted." Curiosity: "See who viewed your profile." Greed or reward: "You won a free phone." Helpfulness: "I am new and locked out, can you help me?"\n\nWhen you notice one of these feelings being pushed hard, slow down.',
    },
    {
      heading: 'Common techniques',
      body:
        'Pretexting is inventing a believable story, such as a caller pretending to be from your telecom provider to get the OTP for a SIM swap. Baiting leaves something tempting, like a USB drive labelled "Exam answers", hoping someone plugs it in. Tailgating is following someone through a secure door without permission. Impersonation copies the name, photo or writing style of someone you know.\n\nAttackers often gather information first from public profiles, so their story includes details that make it feel real.',
    },
    {
      heading: 'The verification routine',
      body:
        'When someone asks for information, money, access or an urgent action, use three checks. Who is really asking? Confirm using contact details you already have, not the ones they give you. Why do they need it? Genuine requests have reasons that make sense and do not involve secrets like OTPs. What happens if I wait? Real organisations allow time to verify. Only scams collapse when you pause.',
    },
  ],
  examples: [
    {
      title: 'The "teacher" on WhatsApp',
      text:
        'A message from an unknown number used the class teacher’s profile photo and asked students to buy gift cards for a school event and send the codes. One student called the school office. The teacher had never sent it. Someone had copied her photo from the school website.',
    },
    {
      title: 'The USB in the corridor',
      text:
        'A pen drive labelled "Board exam paper 2025" was found near the computer lab. Instead of plugging it in, the student handed it to the lab in-charge. Unknown drives can carry malware that runs as soon as they are connected.',
    },
    {
      title: 'The SIM upgrade call',
      text:
        'A caller told Priyanka’s father his SIM would stop working unless he "upgraded to 5G" by sharing an SMS code. The code was actually for transferring his number to a new SIM. He hung up and visited the official telecom store instead.',
    },
  ],
  warningSigns: [
    'Someone claims authority but will not let you verify it.',
    'Strong pressure to act immediately.',
    'Requests to keep the request secret.',
    'Payment requested in gift cards, crypto or to personal accounts.',
    'Tempting items or offers that appear from nowhere.',
  ],
  dos: [
    'Verify requests using contact details you already trust.',
    'Take your time. It is fine to say "I will call back."',
    'Hand found USB drives to a teacher or lab in-charge.',
    'Tell others when you spot an impersonation attempt.',
  ],
  donts: [
    'Do not share OTPs or codes, whoever is asking.',
    'Do not plug in unknown USB drives.',
    'Do not hold secure doors open for people you do not know.',
    'Do not buy gift cards for someone who asks over messages.',
  ],
  prevention: [
    { title: 'Limit public details', text: 'The less you share publicly, the harder it is for someone to build a convincing story about you or your family.' },
    { title: 'Agree on family checks', text: 'Some families agree on a code word to confirm emergencies on the phone. A scammer will not know it.' },
    { title: 'Call back on known numbers', text: 'If a bank, school or company calls, hang up and call the number from their official website or card.' },
    { title: 'Say no without guilt', text: 'Being polite does not mean you must comply. Genuine people understand when you verify first.' },
  ],
  takeaways: [
    'Social engineering targets emotions like fear, urgency, curiosity and helpfulness.',
    'Pretexting, baiting, tailgating and impersonation are common techniques.',
    'Verify who is asking, why, and what happens if you wait.',
    'You are always allowed to pause, hang up and check.',
  ],
  relatedTips: ['otp', 'verify', 'requests'],
  questions: [
    {
      id: 'se-q1',
      prompt: 'A caller says they are from your telecom provider and need the code you just received by SMS to "upgrade your SIM". What is happening?',
      options: [
        'A routine upgrade.',
        'A likely SIM swap attempt using pretexting.',
        'A free recharge offer.',
        'A network test.',
      ],
      answer: 1,
      explanation: 'Attackers use invented stories to get codes that transfer your number to their SIM. Never share SMS codes.',
    },
    {
      id: 'se-q2',
      prompt: 'You find a USB drive labelled "Exam answers" in the corridor. What should you do?',
      options: [
        'Plug it into the lab computer to check.',
        'Plug it into your home laptop.',
        'Hand it to a teacher without plugging it in.',
        'Share the files with friends.',
      ],
      answer: 2,
      explanation: 'This is baiting. Unknown drives can contain malware. Give it to a responsible adult.',
    },
    {
      id: 'se-q3',
      prompt: 'Which emotional trigger does "Act in the next 10 minutes or lose your account" use?',
      options: ['Curiosity', 'Urgency and fear', 'Helpfulness', 'Humour'],
      answer: 1,
      explanation: 'Time pressure and fear stop people from thinking carefully, which is exactly what the attacker wants.',
    },
    {
      id: 'se-q4',
      prompt: 'A WhatsApp message with your teacher’s photo asks you to buy gift cards and send the codes. What should you do?',
      options: [
        'Buy them quickly to help.',
        'Verify by calling the school or teacher on a known number.',
        'Reply asking for the teacher’s password.',
        'Forward it to the class group.',
      ],
      answer: 1,
      explanation: 'Gift card requests over messages are a common impersonation scam. Verify through a known channel.',
    },
    {
      id: 'se-q5',
      prompt: 'Someone you do not know follows you closely through a door that needs an ID card. What is this called?',
      options: ['Phishing', 'Tailgating', 'Hacking', 'Updating'],
      answer: 1,
      explanation: 'Tailgating is entering a secure area by following an authorised person. It is a physical social engineering technique.',
    },
    {
      id: 'se-q6',
      prompt: 'Why do social engineers look at your public social media first?',
      options: [
        'To like your posts.',
        'To collect details that make their story believable.',
        'To check your internet speed.',
        'To recommend music.',
      ],
      answer: 1,
      explanation: 'Details like your school, friends and pets help attackers sound like someone who knows you.',
    },
    {
      id: 'se-q7',
      prompt: 'A caller claims to be a police officer and says you must transfer money to "verify" your account. What is the correct response?',
      options: [
        'Transfer the money because police are official.',
        'Hang up and tell a trusted adult. Police do not ask for money transfers.',
        'Give your bank details but not the money.',
        'Keep the call secret.',
      ],
      answer: 1,
      explanation: 'Fake authority is a classic trigger. Real police do not ask for transfers over the phone.',
    },
    {
      id: 'se-q8',
      prompt: 'Which question is part of a good verification routine?',
      options: [
        'How quickly can I do this?',
        'Who is really asking, and can I confirm it through a channel I already trust?',
        'How many people already agreed?',
        'Will this make me popular?',
      ],
      answer: 1,
      explanation: 'Confirming identity through a separate trusted channel defeats most social engineering.',
    },
    {
      id: 'se-q9',
      prompt: 'A message says "See who secretly viewed your profile" with a link. Which trigger is used?',
      options: ['Authority', 'Curiosity', 'Fear of punishment', 'Helpfulness'],
      answer: 1,
      explanation: 'Curiosity is a powerful trigger. Such links usually lead to fake login pages or harmful apps.',
    },
    {
      id: 'se-q10',
      prompt: 'Is it rude to say "I will call you back on the official number" to an unexpected caller?',
      options: [
        'Yes, you should always comply immediately.',
        'No, verifying is responsible and genuine callers will understand.',
        'Only if they are from a bank.',
        'Only during school hours.',
      ],
      answer: 1,
      explanation: 'Pausing to verify is never rude. Scams depend on you not checking.',
    },
  ],
};
