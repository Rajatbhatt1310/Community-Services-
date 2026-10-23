// Aggregate, anonymous quiz statistics for the admin dashboard.
export function computeStats(modules, attempts) {
  const pct = (c, t) => (t ? Math.round((c / t) * 1000) / 10 : null);
  const byModule = new Map(modules.map((m) => [m.id, { correct: 0, total: 0, attempts: 0 }]));
  const byQuestion = new Map();
  const days = new Map();

  for (const a of attempts) {
    const m = byModule.get(a.moduleId);
    if (m) {
      m.attempts += 1;
      m.correct += a.correct;
      m.total += a.total;
    }
    for (const r of a.results) {
      const q = byQuestion.get(r.qid) || { seen: 0, correct: 0 };
      q.seen += 1;
      if (r.correct) q.correct += 1;
      byQuestion.set(r.qid, q);
    }
    const day = a.at.slice(0, 10);
    days.set(day, (days.get(day) || 0) + 1);
  }

  const totals = [...byModule.values()].reduce((s, m) => ({ c: s.c + m.correct, t: s.t + m.total }), { c: 0, t: 0 });

  const questions = [];
  for (const m of modules) {
    for (const q of m.questions) {
      const s = byQuestion.get(q.id);
      if (s) questions.push({ moduleId: m.id, moduleTitle: m.title, qid: q.id, prompt: q.prompt, seen: s.seen, correctRate: pct(s.correct, s.seen) });
    }
  }
  questions.sort((a, b) => a.correctRate - b.correctRate || b.seen - a.seen);

  const recent = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    recent.push({ day: d, attempts: days.get(d) || 0 });
  }

  return {
    totalAttempts: attempts.length,
    averagePercent: pct(totals.c, totals.t),
    modules: modules.map((m) => {
      const s = byModule.get(m.id);
      return { id: m.id, number: m.number, title: m.title, attempts: s.attempts, averagePercent: pct(s.correct, s.total) };
    }),
    hardestQuestions: questions.slice(0, 10),
    recent,
  };
}
