export default {
  id: 'safe-internet-and-online-gaming',
  number: 9,
  title: 'Safe Internet and Online Gaming',
  summary: 'Browse, download and play without handing over your account, money or wellbeing.',
  minutes: 8,
  group: 'data',
  intro:
    'Online games and the wider internet are places to have fun, learn and make friends. They also attract scammers, because players care about their accounts, skins and rankings, and are often in a hurry. Safe browsing and safe gaming come down to the same few habits: get things from official sources, protect your account, think before spending, and manage your time.',
  objectives: [
    'Recognise safe and unsafe websites and downloads.',
    'Avoid common gaming scams involving currency, skins and mods.',
    'Protect gaming accounts and in-game payments.',
    'Keep healthy limits on screen and gaming time.',
  ],
  sections: [
    {
      heading: 'Safer browsing',
      body:
        'Before entering any information on a website, check the address carefully. The padlock icon means the connection is encrypted, but it does not prove the website is honest; fake sites can have a padlock too. Be careful with pop-ups that say your phone has a virus or that you have won something. Close the tab instead of clicking.\n\nDownload apps only from the official Play Store or App Store, or from the developer’s own website. Avoid "free premium" apps and modded APKs.',
    },
    {
      heading: 'Gaming scams',
      body:
        'Common scams promise free in-game currency, rare skins or account boosts if you log in on a website or share your account details. Others use fake trades, where the scammer swaps an item at the last second, or "giveaways" that ask for your password to deliver the prize. Cheats and mod tools are often bundled with malware that steals passwords from your browser.\n\nNo game company will ever ask for your password in chat or through a website other than its own login page.',
    },
    {
      heading: 'Spending and payments',
      body:
        'In-game purchases add up quickly, and loot boxes or random rewards can be designed to keep you spending. Agree with your parents on a spending limit. Use the platform’s parental controls or purchase approval features, and never save a parent’s card in a game without their permission. Buying currency or accounts from third-party sellers breaks most games’ rules and often ends in a ban or a scam.',
    },
    {
      heading: 'Time, sleep and voice chat',
      body:
        'Games are designed to be engaging. Use screen time tools to set limits, and avoid playing late into the night before school. In voice chat, do not share your real name, school, location or age with people you do not know. Mute and report anyone who is abusive, and leave games that make you uncomfortable.',
    },
  ],
  examples: [
    {
      title: 'The free currency generator',
      text:
        'A video promised unlimited free in-game currency through a website. Kunal entered his username and password. The site gave nothing, and his account was used to buy items with his saved card. His parents had to contact the platform and the bank.',
    },
    {
      title: 'The cheat that stole passwords',
      text:
        'Sahil downloaded an aim-assist cheat from a forum. Within a week, his email, game and social accounts were accessed from another country. The cheat contained a password stealer that read passwords saved in his browser.',
    },
  ],
  warningSigns: [
    'Websites offering free currency, skins or boosts in exchange for your login.',
    'Players asking for your password to "check" or "gift" something.',
    'Downloads of cheats, mods or cracked games from unofficial sites.',
    'Pop-ups claiming your phone is infected or you have won a prize.',
    'Strangers in voice chat asking for personal details.',
  ],
  dos: [
    'Download games and apps only from official stores.',
    'Enable two-step verification on gaming accounts.',
    'Use parental controls or purchase approvals for payments.',
    'Set daily time limits and protect your sleep.',
  ],
  donts: [
    'Do not use currency generators or cheat tools.',
    'Do not share account details for trades or giveaways.',
    'Do not buy accounts or currency from third-party sellers.',
    'Do not share personal details in voice chat.',
  ],
  prevention: [
    { title: 'Lock down the account', text: 'Use a unique password and two-step verification on your gaming platform and the email linked to it.' },
    { title: 'Keep payments controlled', text: 'Ask parents to enable purchase approval or set a monthly limit, and remove saved cards when not needed.' },
    { title: 'Trade only in-game', text: 'Use the game’s official trading system, never outside deals over chat or websites.' },
    { title: 'Use built-in safety tools', text: 'Learn where mute, block, report and privacy settings are in each game you play.' },
  ],
  takeaways: [
    'The padlock shows encryption, not honesty. Check the address.',
    'Free currency, cheats and mods are common sources of scams and malware.',
    'Game companies never ask for your password outside their official login.',
    'Control spending with parental tools, and protect your time and sleep.',
  ],
  relatedTips: ['links', 'twofa', 'updates'],
  questions: [
    {
      id: 'game-q1',
      prompt: 'A website promises free in-game currency if you log in with your game account. What should you do?',
      options: [
        'Log in to claim it.',
        'Close it. It is a scam to steal your account.',
        'Share it with friends first.',
        'Log in with a friend’s account.',
      ],
      answer: 1,
      explanation: 'Currency generators are fake. They exist to collect usernames and passwords.',
    },
    {
      id: 'game-q2',
      prompt: 'What does the padlock icon in a browser address bar tell you?',
      options: [
        'The website is honest and safe.',
        'The connection is encrypted, but the site could still be fake.',
        'The website is run by the government.',
        'Your device has no viruses.',
      ],
      answer: 1,
      explanation: 'Encryption protects data in transit. Scam sites can also have padlocks, so check the address too.',
    },
    {
      id: 'game-q3',
      prompt: 'A player offers a rare skin if you share your password so they can "transfer" it. What is true?',
      options: [
        'Transfers always need passwords.',
        'It is a scam. Real trades use the game’s official system.',
        'It is safe if they are on your team.',
        'Share it and change it later.',
      ],
      answer: 1,
      explanation: 'Official trading never requires your password. Anyone asking for it wants to take your account.',
    },
    {
      id: 'game-q4',
      prompt: 'Why are cheat tools and mods from forums risky?',
      options: [
        'They are always too expensive.',
        'They often contain malware that steals passwords.',
        'They make games load slowly.',
        'They are not risky.',
      ],
      answer: 1,
      explanation: 'Cheats are a common way to spread password stealers, and they can also get your account banned.',
    },
    {
      id: 'game-q5',
      prompt: 'A pop-up says "Your phone has 5 viruses! Tap here to clean now." What should you do?',
      options: [
        'Tap to clean.',
        'Close the tab and do not install anything from it.',
        'Enter your phone number.',
        'Restart and tap it again.',
      ],
      answer: 1,
      explanation: 'Scary pop-ups are a scam tactic. Websites cannot scan your phone. Close the page.',
    },
    {
      id: 'game-q6',
      prompt: 'What is a sensible way to manage in-game spending?',
      options: [
        'Save a parent’s card in the game without asking.',
        'Agree on a limit and use purchase approval or parental controls.',
        'Buy currency from cheaper third-party sellers.',
        'Spend whenever a limited offer appears.',
      ],
      answer: 1,
      explanation: 'Limits and approvals prevent surprise charges and protect you from scam sellers.',
    },
    {
      id: 'game-q7',
      prompt: 'A stranger in voice chat asks which school you go to. What should you do?',
      options: [
        'Tell them, it is harmless.',
        'Do not share personal details, and mute or leave if they keep asking.',
        'Share your address too.',
        'Send your photo instead.',
      ],
      answer: 1,
      explanation: 'Personal details help strangers locate or target you. Keep them private in games.',
    },
    {
      id: 'game-q8',
      prompt: 'Where is the safest place to download a game?',
      options: [
        'A modded APK website.',
        'The official app store or the developer’s website.',
        'A link in a comment section.',
        'A file shared by a stranger.',
      ],
      answer: 1,
      explanation: 'Official stores check apps for malware. Unofficial downloads often contain harmful code.',
    },
    {
      id: 'game-q9',
      prompt: 'Which step best protects a gaming account from being stolen?',
      options: [
        'Using your gamer tag as your password.',
        'A unique password plus two-step verification.',
        'Sharing the account with a friend as backup.',
        'Logging in on many devices.',
      ],
      answer: 1,
      explanation: 'A unique password and two-step verification stop most account takeovers.',
    },
    {
      id: 'game-q10',
      prompt: 'You often play until 2 AM and feel tired in class. What is a healthy step?',
      options: [
        'Play more on weekends to catch up.',
        'Use screen time limits and stop well before bedtime.',
        'Drink more energy drinks.',
        'Turn off all notifications from parents.',
      ],
      answer: 1,
      explanation: 'Screen time tools help you balance gaming with sleep, studies and wellbeing.',
    },
  ],
};
