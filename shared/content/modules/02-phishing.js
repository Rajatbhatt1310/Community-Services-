export default {
  id: 'phishing-and-online-scams',
  number: 2,
  title: 'Phishing and Online Scams',
  summary: 'How fake messages, links and offers trick people, and how to check before you trust.',
  minutes: 10,
  group: 'foundations',
  intro:
    'Phishing is a trick where someone pretends to be a trusted person or organisation so you hand over a password, an OTP, money or personal details. It arrives as an SMS, a WhatsApp message, an email, a call, a social media DM or even a QR code. The message is designed to make you act before you think. Learning to pause and verify is the single most useful skill in this course.',
  objectives: [
    'Recognise the common forms of phishing: SMS, email, calls, DMs and QR codes.',
    'Spot the pressure tactics scammers use, such as urgency, fear and rewards.',
    'Check a link and a sender before trusting them.',
    'Know what to do immediately if you clicked or shared something.',
  ],
  sections: [
    {
      heading: 'How a phishing message works',
      body:
        'Almost every phishing message follows the same recipe. It pretends to come from someone you trust, such as a bank, a delivery service, your school or a friend. It creates a strong feeling: fear of losing an account, excitement about a prize, or worry about a family member. Then it asks for one quick action: click this link, share this OTP, scan this code or pay this small fee.\n\nThe goal is to rush you past your own judgement. If a message makes you feel you must act right now, that feeling itself is a warning sign.',
    },
    {
      heading: 'Reading a link before you open it',
      body:
        'A link can show one thing and lead somewhere else. On a computer, hover over it to see the real address. On a phone, press and hold to preview it. Look at the main part of the domain, the part just before .com, .in or .org. A real bank might use bankname.com, while a fake one uses bankname-kyc-update.co or bankname.secure-login.net.\n\nScammers also use short links and misspellings like paytrn instead of paytm. The safest habit is not to use links in unexpected messages at all. Open the official app or type the address yourself.',
    },
    {
      heading: 'Common scams aimed at students',
      body:
        'Prize and lucky draw scams say you won a phone or cash but must pay a small processing fee. Job and internship scams promise easy money for liking videos or rating products, then ask you to deposit money to unlock earnings. Gaming scams offer free in-game currency in exchange for your login. Fake scholarship messages ask for a registration fee. UPI collect request scams send a payment request that looks like you will receive money, but entering your PIN actually sends money away.\n\nRemember: you never need to enter your UPI PIN to receive money.',
    },
    {
      heading: 'Vishing and QR code tricks',
      body:
        'Vishing is phishing by phone call. The caller may claim to be from a bank, a courier company, the police or a telecom provider. They may already know your name to sound real. Some even claim you are under "digital arrest", which is not a real legal procedure in India. Police do not arrest people over a video call.\n\nQR codes can also be used to send you to fake pages or to trigger payments. Scanning a QR code to receive money is always a scam.',
    },
  ],
  examples: [
    {
      title: 'The KYC message',
      text:
        'Riya’s mother receives an SMS saying her bank account will be blocked today unless she updates KYC through a link. The link opens a page that looks exactly like the bank’s login page. Riya notices that the address is not the bank’s official domain. They call the number on the back of the bank card instead and learn the account is fine.',
    },
    {
      title: 'The internship offer',
      text:
        'Kabir gets a WhatsApp message offering Rs 3,000 a day for rating hotels online. After two small payouts, he is asked to deposit Rs 5,000 to unlock a "premium task". The small payouts were bait to build trust. Real employers never ask you to pay to work.',
    },
    {
      title: 'The friend in trouble',
      text:
        'Sana receives a message from her cousin’s Instagram account asking her to urgently send money for an emergency. She calls her cousin directly on the phone. The cousin’s account had been hacked and the same message went to everyone on the friend list.',
    },
  ],
  warningSigns: [
    'Urgency or threats: "within 2 hours", "account blocked", "legal action".',
    'Requests for OTP, PIN, password, card details or remote access apps.',
    'Links with misspelled names, extra words or unusual endings.',
    'Generic greetings like "Dear customer" instead of your name.',
    'Prizes, refunds or jobs you never applied for.',
    'Payment requests or QR codes that claim you will receive money.',
    'A familiar contact asking for money in an unusual way.',
  ],
  dos: [
    'Verify through the official app, website or number printed on your card.',
    'Call the friend or relative directly if they ask for money.',
    'Report the message as spam and block the sender.',
    'Tell an adult immediately if money was lost and call 1930.',
  ],
  donts: [
    'Do not share an OTP, PIN or password with anyone.',
    'Do not enter your UPI PIN to receive money.',
    'Do not install screen-sharing apps because a caller asks.',
    'Do not pay fees to claim prizes, jobs or scholarships.',
  ],
  prevention: [
    { title: 'Use the stop and check rule', text: 'Before you click, pay or reply to an unexpected message, stop for one minute. Check the sender and the request through a separate, official channel.' },
    { title: 'Go direct', text: 'Instead of tapping a link, open the official app or type the website address you already know. If the problem is real, you will see it there.' },
    { title: 'Turn on spam protection', text: 'Use the spam filters in your messaging and email apps, and register for DND on your mobile number to reduce promotional calls.' },
    { title: 'Act fast if something goes wrong', text: 'If you shared bank details or lost money, call 1930 and your bank immediately and file a report on cybercrime.gov.in. Speed improves the chance of freezing the money.' },
  ],
  takeaways: [
    'Phishing pretends to be someone you trust and pushes you to act quickly.',
    'No genuine organisation asks for your OTP, PIN or password.',
    'Check links and senders, and prefer going directly to the official app.',
    'You never need a PIN or QR scan to receive money.',
    'If money is lost, call 1930 quickly and report on cybercrime.gov.in.',
  ],
  relatedTips: ['otp', 'links', 'verify'],
  questions: [
    {
      id: 'phish-q1',
      prompt: 'A message says your bank account will be blocked unless you immediately click a link. What should you do?',
      options: [
        'Click immediately.',
        'Share your OTP to confirm your identity.',
        'Verify through the bank’s official app or helpline.',
        'Forward the message to friends.',
      ],
      answer: 2,
      explanation: 'Messages that create urgency are a classic phishing pattern. Always verify through an official channel you find yourself.',
    },
    {
      id: 'phish-q2',
      prompt: 'Someone sends you a UPI request and says you must enter your PIN to receive Rs 2,000. What is true?',
      options: [
        'You need your PIN to receive money.',
        'Entering your PIN will send money from your account.',
        'The PIN only checks your identity.',
        'It is safe if the amount is small.',
      ],
      answer: 1,
      explanation: 'A UPI PIN is only used to send money. Receiving money never requires your PIN.',
    },
    {
      id: 'phish-q3',
      prompt: 'Which link is most likely to be fake for a bank called NationBank?',
      options: [
        'https://www.nationbank.com/login',
        'https://nationbank.com/help',
        'https://nationbank-kyc-update.co/verify',
        'https://www.nationbank.com',
      ],
      answer: 2,
      explanation: 'The real domain is nationbank.com. Extra words and a different ending like -kyc-update.co point to a lookalike site.',
    },
    {
      id: 'phish-q4',
      prompt: 'Your friend’s account messages you asking for urgent money for a hospital bill. What is the best response?',
      options: [
        'Send the money quickly.',
        'Call your friend on their phone number to confirm.',
        'Ask them to send an OTP first.',
        'Share the message on your story.',
      ],
      answer: 1,
      explanation: 'Hacked accounts often send emergency money requests. Confirm using a different channel, such as a phone call.',
    },
    {
      id: 'phish-q5',
      prompt: 'A caller says they are from a courier company and a parcel in your name contains illegal items. They ask you to stay on a video call and pay a fine. What is this?',
      options: [
        'A normal police procedure.',
        'A scam using fear and false authority.',
        'A courier delivery update.',
        'A legal requirement for parcels.',
      ],
      answer: 1,
      explanation: 'Fake "digital arrest" and parcel scams use fear. Real police do not demand payments over video calls. Hang up and tell an adult.',
    },
    {
      id: 'phish-q6',
      prompt: 'An internship pays you small amounts for simple tasks and then asks for a deposit to unlock bigger tasks. What should you conclude?',
      options: [
        'It is a genuine company rewarding good work.',
        'It is a task scam. Real employers do not ask you to pay to work.',
        'You should deposit a small amount to test it.',
        'You should invite friends to earn more.',
      ],
      answer: 1,
      explanation: 'Task scams pay a little first to build trust, then take larger deposits. Paying to work is a clear red flag.',
    },
    {
      id: 'phish-q7',
      prompt: 'Which detail in an email is a common sign of phishing?',
      options: [
        'It uses your full name correctly.',
        'It comes from an address you have emailed before about the same topic.',
        'It starts with "Dear customer" and threatens to close your account.',
        'It has no links or attachments.',
      ],
      answer: 2,
      explanation: 'Generic greetings combined with threats are typical of mass phishing campaigns.',
    },
    {
      id: 'phish-q8',
      prompt: 'You clicked a phishing link and typed your email password. What should you do first?',
      options: [
        'Wait to see if anything happens.',
        'Change that password right away from the official site and turn on two-step verification.',
        'Delete the email and forget about it.',
        'Reply to the sender asking them to stop.',
      ],
      answer: 1,
      explanation: 'Change the password quickly from the real website, enable two-step verification, and change it anywhere else you used it.',
    },
    {
      id: 'phish-q9',
      prompt: 'A poster in a cafe has a QR code that says "Scan to receive your cashback". What is the risk?',
      options: [
        'None. QR codes are always safe.',
        'It may open a fake page or a payment request that takes your money.',
        'It will only slow down your phone.',
        'It will update your apps.',
      ],
      answer: 1,
      explanation: 'Scanning a QR code is used to pay, not to receive. Fake QR codes can trigger payment requests or open phishing pages.',
    },
    {
      id: 'phish-q10',
      prompt: 'Your family lost money in an online fraud an hour ago. Which helpline should you call?',
      options: ['100', '1930', '101', '139'],
      answer: 1,
      explanation: '1930 is India’s national cyber fraud helpline. Calling quickly helps authorities try to freeze the money.',
    },
  ],
};
