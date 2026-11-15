// Validation shared by the content checker and the admin API.

const isText = (v, min = 1, max = 4000) => typeof v === 'string' && v.trim().length >= min && v.length <= max;
const isTextList = (v, { min = 1, max = 20, maxLen = 600 } = {}) =>
  Array.isArray(v) && v.length >= min && v.length <= max && v.every((s) => isText(s, 1, maxLen));
const isPairList = (v, keyA, keyB, { min = 1, max = 12 } = {}) =>
  Array.isArray(v) && v.length >= min && v.length <= max && v.every((p) => p && isText(p[keyA], 1, 200) && isText(p[keyB], 1, 4000));

export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const GROUPS = ['foundations', 'people', 'data', 'careers'];

export function validateQuestion(q) {
  const errors = [];
  if (!q || typeof q !== 'object') return ['question must be an object'];
  if (!isText(q.prompt, 5, 500)) errors.push('prompt must be 5 to 500 characters');
  if (!Array.isArray(q.options) || q.options.length !== 4) errors.push('exactly four options are required');
  else if (!q.options.every((o) => isText(o, 1, 300))) errors.push('every option needs text (max 300 characters)');
  else if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== 4) errors.push('options must be different from each other');
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errors.push('answer must be 0, 1, 2 or 3');
  if (!isText(q.explanation, 5, 800)) errors.push('explanation must be 5 to 800 characters');
  return errors;
}

export function validateModule(m, { requireQuestions = true } = {}) {
  const errors = [];
  if (!m || typeof m !== 'object') return ['module must be an object'];
  if (!isText(m.id, 3, 80) || !SLUG.test(m.id)) errors.push('id must be a lowercase slug');
  if (!Number.isInteger(m.number) || m.number < 1 || m.number > 99) errors.push('number must be 1 to 99');
  if (!isText(m.title, 3, 120)) errors.push('title must be 3 to 120 characters');
  if (!isText(m.summary, 10, 240)) errors.push('summary must be 10 to 240 characters');
  if (!Number.isInteger(m.minutes) || m.minutes < 1 || m.minutes > 60) errors.push('minutes must be 1 to 60');
  if (!GROUPS.includes(m.group)) errors.push(`group must be one of ${GROUPS.join(', ')}`);
  if (!isText(m.intro, 20, 2000)) errors.push('intro must be 20 to 2000 characters');
  if (!isTextList(m.objectives)) errors.push('objectives need 1 to 20 items');
  if (!isPairList(m.sections, 'heading', 'body')) errors.push('sections need a heading and body each');
  if (!isPairList(m.examples, 'title', 'text', { min: 0 })) errors.push('examples need a title and text each');
  if (!isTextList(m.warningSigns)) errors.push('warning signs need 1 to 20 items');
  if (!isTextList(m.dos)) errors.push('do items need 1 to 20 entries');
  if (!isTextList(m.donts)) errors.push("don't items need 1 to 20 entries");
  if (!isPairList(m.prevention, 'title', 'text')) errors.push('prevention steps need a title and text each');
  if (!isTextList(m.takeaways)) errors.push('takeaways need 1 to 20 items');
  if (!Array.isArray(m.relatedTips)) errors.push('relatedTips must be a list');
  if (!Array.isArray(m.questions)) errors.push('questions must be a list');
  else {
    if (requireQuestions && m.questions.length < 10) errors.push('at least 10 questions are required');
    m.questions.forEach((q, i) => validateQuestion(q).forEach((e) => errors.push(`question ${i + 1}: ${e}`)));
  }
  return errors;
}

// Keep only known fields so arbitrary data cannot be stored through the admin API.
export function cleanModule(m) {
  const pair = (list, a, b) => (list || []).map((p) => ({ [a]: p[a].trim(), [b]: p[b].trim() }));
  const text = (list) => (list || []).map((s) => s.trim());
  return {
    id: m.id,
    number: m.number,
    title: m.title.trim(),
    summary: m.summary.trim(),
    minutes: m.minutes,
    group: m.group,
    intro: m.intro.trim(),
    objectives: text(m.objectives),
    sections: pair(m.sections, 'heading', 'body'),
    examples: pair(m.examples, 'title', 'text'),
    warningSigns: text(m.warningSigns),
    dos: text(m.dos),
    donts: text(m.donts),
    prevention: pair(m.prevention, 'title', 'text'),
    takeaways: text(m.takeaways),
    relatedTips: (m.relatedTips || []).filter((t) => typeof t === 'string' && SLUG.test(t)),
    questions: (m.questions || []).map((q) => ({
      id: q.id,
      prompt: q.prompt.trim(),
      options: q.options.map((o) => o.trim()),
      answer: q.answer,
      explanation: q.explanation.trim(),
    })),
  };
}
