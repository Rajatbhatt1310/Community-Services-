// Validates the shared learning content: structure, question counts and banned characters.
import modules from '../shared/content/modules/index.js';
import tips from '../shared/content/tips.js';
import { validateModule } from '../shared/validate.js';

let problems = 0;
const tipIds = new Set(tips.map((t) => t.id));
const seenQ = new Set();

for (const m of modules) {
  const errors = validateModule(m);
  for (const t of m.relatedTips) if (!tipIds.has(t)) errors.push(`unknown tip "${t}"`);
  for (const q of m.questions) {
    if (seenQ.has(q.id)) errors.push(`duplicate question id ${q.id}`);
    seenQ.add(q.id);
  }
  const text = JSON.stringify(m);
  if (/[–—]/.test(text)) errors.push('contains an en or em dash');
  if (errors.length) {
    problems += errors.length;
    console.log(`${m.number}. ${m.title}\n  - ${errors.join('\n  - ')}`);
  } else {
    console.log(`ok  ${m.number}. ${m.title} (${m.questions.length} questions)`);
  }
}
process.exit(problems ? 1 : 0);
