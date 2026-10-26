// Quiz helpers. Options are shuffled for each attempt so answers cannot be memorised by position.
function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function prepareQuestion(q) {
  const order = shuffle([0, 1, 2, 3]);
  return {
    id: q.id,
    prompt: q.prompt,
    options: order.map((i) => q.options[i]),
    originalIndex: order,
    answer: order.indexOf(q.answer),
    explanation: q.explanation,
  };
}

export const prepareQuiz = (questions) => questions.map(prepareQuestion);

export function performance(percent) {
  if (percent >= 80) return { title: "Excellent! You're CyberSmart.", tone: 'good' };
  if (percent >= 50) return { title: 'Good job! Keep learning.', tone: 'ok' };
  return { title: 'Keep practising to improve your cyber awareness.', tone: 'low' };
}
