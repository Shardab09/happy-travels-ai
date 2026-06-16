/**
 * HappyTravelsAI — Failure Analysis
 * Drills into eval_results.csv and surfaces specific failing families/destinations
 */

'use strict';
const fs   = require('fs');
const path = require('path');

const DIR = 'C:/ClaudeCodeBootcamp/HappyTravelsAI/eval_dataset';

function parseCSV(f) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/).filter(l => l.trim());
  const h = lines[0].split(',').map(s => s.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const vals = [];
    let cur = '', inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { vals.push(cur); cur = ''; }
      else { cur += ch; }
    }
    vals.push(cur);
    return h.reduce((o, k, i) => { o[k] = (vals[i] || '').trim().replace(/^"|"$/g, ''); return o; }, {});
  });
}

function toCSV(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const esc = v => { const s = String(v ?? ''); return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g,'""')}"` : s; };
  return [headers.join(','), ...rows.map(r => headers.map(h => esc(r[h])).join(','))].join('\n');
}

function divider(char = '─', len = 80) { return char.repeat(len); }
function header(title) { return `\n${divider('═')}\n  ${title}\n${divider('═')}`; }

// ─── LOAD DATA ─────────────────────────────────────────────────────────────
const results  = parseCSV(path.join(DIR, 'eval_results.csv'));
const profiles = parseCSV(path.join(DIR, 'family_profiles_new.csv'));
const labels   = parseCSV(path.join(DIR, 'destination_labels_new.csv'));

const failures = results.filter(r => r.pass === 'FAIL');
const passes   = results.filter(r => r.pass === 'PASS');

// Build profile lookup
const famMembers = {};
profiles.forEach(p => {
  if (!famMembers[p.family_id]) famMembers[p.family_id] = [];
  famMembers[p.family_id].push(p);
});

const lines = [];

lines.push(header('FAILURE ANALYSIS — HappyTravelsAI MVP Eval'));
lines.push(`Total checks: ${results.length} | Passed: ${passes.length} | Failed: ${failures.length}`);
lines.push(`Run timestamp: ${results[0]?.timestamp || 'n/a'}\n`);

// ─── RUB-006 FAILURES ──────────────────────────────────────────────────────
const r006Fails = failures.filter(r => r.rubric_id === 'RUB-006');
lines.push(header(`RUB-006 — Preference Coverage Failures (${r006Fails.length}/100 families)`));
lines.push('Criteria: Every family member must have >=1 preference matched by top destination');
lines.push(divider());

r006Fails.forEach(f => {
  const members = famMembers[f.family_id] || [];
  const planner = members.find(m => m.member_role === 'planner');
  const budget  = planner?.budget_usd || 'n/a';
  const type    = planner?.household_size > 4 ? 'large_family' : members.length === 2 ? 'couple' : 'family';
  lines.push(`\n  ${f.family_id} | ${f.destination} | Budget: $${budget} | Members: ${members.length} (${type})`);
  lines.push(`  ${f.notes}`);
  members.forEach(m => {
    lines.push(`    • ${m.name.padEnd(12)} (age ${String(m.age).padEnd(3)}) prefs: ${m.preference_tags}`);
  });
});

// Root cause summary for RUB-006
const destMissCounts = {};
r006Fails.forEach(f => {
  destMissCounts[f.destination] = (destMissCounts[f.destination] || 0) + 1;
});
lines.push(`\n${divider('─')}`);
lines.push('  ROOT CAUSE — Destinations most often failing coverage check:');
Object.entries(destMissCounts).sort((a,b)=>b[1]-a[1]).forEach(([d,n]) => {
  lines.push(`    ${d.padEnd(30)} → ${n} families affected`);
});

// ─── RUB-007 FAILURES ──────────────────────────────────────────────────────
const r007Fails = failures.filter(r => r.rubric_id === 'RUB-007');
const level3Fails = r007Fails.filter(r => r.notes.includes('Level 3'));
const level2Rank1Fails = r007Fails.filter(r => r.notes.includes('Level 2') && r.notes.includes('recommended as #1'));

lines.push(header(`RUB-007 — Travel Advisory Failures (${r007Fails.length}/500 destination-rows)`));
lines.push('Criteria: No Level 3/4 in recommendations; Level 2 at rank-1 requires advisory warning\n');

lines.push(`  Level 3 (Reconsider Travel) — hard block required: ${level3Fails.length} rows`);
const l3Dests = [...new Set(level3Fails.map(r => r.destination))];
l3Dests.forEach(d => {
  const count    = level3Fails.filter(r => r.destination === d).length;
  const famIds   = level3Fails.filter(r => r.destination === d).map(r => r.family_id).join(', ');
  lines.push(`    ${d.padEnd(30)} → recommended to ${count} families: ${famIds}`);
});

lines.push(`\n  Level 2 (Increased Caution) at rank-1 without warning: ${level2Rank1Fails.length} rows`);
const l2Dests = [...new Set(level2Rank1Fails.map(r => r.destination))];
l2Dests.forEach(d => {
  const count  = level2Rank1Fails.filter(r => r.destination === d).length;
  const famIds = level2Rank1Fails.filter(r => r.destination === d).map(r => r.family_id).join(', ');
  lines.push(`    ${d.padEnd(30)} → top recommendation for ${count} families: ${famIds}`);
});

lines.push(`\n  Level 2 (acceptable at rank 2-5 with warning): ${r007Fails.length - level3Fails.length - level2Rank1Fails.length} rows`);

// ─── RUB-009 FAILURES ──────────────────────────────────────────────────────
const r009Fails = failures.filter(r => r.rubric_id === 'RUB-009');
lines.push(header(`RUB-009 — PII Leakage Failures (${r009Fails.length}/100 families)`));
lines.push('Criteria: No budget, age, dietary, or mobility data in shareable output fields\n');

r009Fails.forEach(f => {
  const members = famMembers[f.family_id] || [];
  const planner = members.find(m => m.member_role === 'planner');
  lines.push(`  ${f.family_id} | ${f.destination}`);
  lines.push(`  PII found: ${f.notes.replace('PII violations found: ','')}`);
  if (planner) {
    lines.push(`  Family: ${members.length} members | Budget: $${planner.budget_usd} | Dietary: ${members.map(m=>m.dietary_restrictions).filter(d=>d!=='none').join(';')||'none'} | Mobility: ${members.map(m=>m.mobility_constraints).filter(m=>m!=='none').join(';')||'none'}`);
  }
  lines.push('');
});

// ─── PRIORITISED FIX LIST ──────────────────────────────────────────────────
lines.push(header('PRIORITISED FIX LIST'));

const fixRows = [];

// P0: Level 3 destinations
l3Dests.forEach(dest => {
  const count = level3Fails.filter(r => r.destination === dest).length;
  fixRows.push({ priority:'P0', rubric:'RUB-007', issue:`Level 3 advisory: ${dest}`, affected:`${count} families`, fix:`Hard-block "${dest}" from entering destination recommendation pool` });
});

// P0: PII leakage
r009Fails.forEach(f => {
  const violation = f.notes.replace(/.*PII violations found: /,'').split('|')[0].trim();
  fixRows.push({ priority:'P0', rubric:'RUB-009', issue:`PII in output: ${f.family_id}`, affected:'1 family', fix:`Remove field(s) "${violation}" from shareable recommendation output for ${f.family_id}` });
});

// P1: Level 2 rank-1
l2Dests.forEach(dest => {
  const count = level2Rank1Fails.filter(r => r.destination === dest).length;
  fixRows.push({ priority:'P1', rubric:'RUB-007', issue:`Level 2 at rank-1: ${dest}`, affected:`${count} families`, fix:`Show advisory banner to planner before finalising ${dest} as top recommendation` });
});

// P1: Coverage failures
const topMissDest = Object.entries(destMissCounts).sort((a,b)=>b[1]-a[1])[0];
if (topMissDest) {
  fixRows.push({ priority:'P1', rubric:'RUB-006', issue:`Preference gap in ${topMissDest[0]}`, affected:`${topMissDest[1]} families`, fix:`Expand destination tag set for "${topMissDest[0]}" OR diversify preference matching logic to use semantic similarity` });
  fixRows.push({ priority:'P1', rubric:'RUB-006', issue:`44 families have >=1 member with 0 prefs matched`, affected:'44 families', fix:'Add constraint: every family member must have >=1 pref in the top-5 destination pool before itinerary synthesis begins' });
}

// P2: RUB-004 stub
fixRows.push({ priority:'P2', rubric:'RUB-004', issue:'Running in stub mode', affected:'All 100 families', fix:'Set GOOGLE_PLACES_API_KEY env var to enable live destination hallucination checks' });

lines.push('');
lines.push(`${'Priority'.padEnd(10)} ${'Rubric'.padEnd(10)} ${'Issue'.padEnd(38)} ${'Affected'.padEnd(15)} Fix`);
lines.push(divider());
fixRows.forEach(r => {
  lines.push(`${r.priority.padEnd(10)} ${r.rubric.padEnd(10)} ${r.issue.slice(0,37).padEnd(38)} ${r.affected.padEnd(15)} ${r.fix}`);
});

// ─── WRITE OUTPUTS ─────────────────────────────────────────────────────────
const report = lines.join('\n');
console.log(report);
fs.writeFileSync(path.join(DIR, 'failure_analysis.txt'), report);
fs.writeFileSync(path.join(DIR, 'failure_fixes.csv'), toCSV(fixRows));

console.log(`\n${divider()}`);
console.log('Files written:');
console.log('  failure_analysis.txt  — full drill-down report');
console.log('  failure_fixes.csv     — prioritised fix list (import to Jira/Linear)');
