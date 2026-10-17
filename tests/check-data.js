// Checks every league file in js/leagues/ against the data rules in CLAUDE.md.
// Run with: node tests/check-data.js   (no dependencies)
const fs = require("fs"), path = require("path"), vm = require("vm");

const dir = path.join(__dirname, "..", "js", "leagues");
const ctx = {window: {}};
for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort()) {
  vm.runInNewContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, {filename: f});
}
const leagues = Object.values(ctx.window.LEAGUES || {});

let failures = 0;
const fail = (league, msg) => { failures++; console.log(`  ✗ ${league}: ${msg}`); };
const dupes = arr => [...new Set(arr.filter((x, i) => arr.indexOf(x) !== i))];

for (const L of leagues) {
  const id = L.id;
  for (const k of ["id", "label", "sport", "emoji", "surface", "credits", "disclaimer", "examples", "flavor", "locAliases", "conferences", "divisions", "storage"]) {
    if (L[k] === undefined) fail(id, `missing "${k}"`);
  }
  if (L.surface && !["field", "court", "maple", "diamond", "ice"].includes(L.surface)) fail(id, `unknown surface "${L.surface}" (add its styles to css/styles.css first)`);
  if (!L.divisions) continue;
  const teams = L.divisions.flatMap(d => d.teams.map(t => ({...t, conf: d.conf, div: d.name})));
  const full = t => t.loc ? `${t.loc} ${t.name}` : t.name;

  for (const d of L.divisions) {
    if (!L.conferences.includes(d.conf)) fail(id, `division "${d.name}" has unknown conference "${d.conf}"`);
  }
  for (const n of dupes(teams.map(t => t.name.toLowerCase()))) fail(id, `duplicate team name "${n}"`);
  for (const t of teams) {
    // loc: null keeps a team out of the name/city modes; colors: null keeps it out of the colors modes
    if (!t.name) fail(id, `team missing name: ${JSON.stringify(t)}`);
    if (t.loc === undefined || t.colors === undefined) fail(id, `${full(t)} needs "loc" and "colors" (use null to leave a team out of those modes)`);
    if (t.loc === null && t.colors === null) fail(id, `${full(t)} has no location and no colors, so it can't appear in any mode`);
    if (t.colors !== null && (!Array.isArray(t.colors) || t.colors.length < 2 || t.colors.length > 3)) fail(id, `${full(t)} should have 2–3 primary colors`);
    for (const c of t.colors || []) {
      if (!/^#[0-9A-F]{6}$/.test(c.hex)) fail(id, `${full(t)} color "${c.name}" has bad hex ${c.hex} (use #RRGGBB, uppercase)`);
      if (c.name !== c.name.trim() || !c.name) fail(id, `${full(t)} has a blank or padded color name`);
    }
    for (const n of dupes((t.colors || []).map(c => c.name))) fail(id, `${full(t)} repeats color name "${n}"`);
  }
  for (const loc of Object.keys(L.locAliases)) {
    if (!teams.some(t => t.loc === loc)) fail(id, `alias for unknown location "${loc}"`);
  }
  // Every team needs 3 valid wrong answers in each mode it plays: no shared location, no identical color-name set.
  const colorKey = t => t.colors.map(c => c.name).sort().join("|");
  const located = teams.filter(t => t.loc), colored = teams.filter(t => t.colors);
  for (const t of located) {
    if (new Set(located.filter(o => o.loc !== t.loc).map(o => o.loc)).size < 3) fail(id, `${full(t)} doesn't have 3 usable wrong answers in the name/city modes`);
  }
  for (const t of colored) {
    const ok = colored.filter(o => o !== t && (o.loc === null || o.loc !== t.loc) && colorKey(o) !== colorKey(t));
    if (ok.length < 3) fail(id, `${full(t)} doesn't have 3 usable wrong answers in the colors modes`);
  }
  for (const k of ["good", "bad", "grades"]) if (!Array.isArray(L.flavor[k]) || !L.flavor[k].length) fail(id, `flavor.${k} is empty`);
  if (L.flavor.grades && L.flavor.grades.length !== 5) fail(id, "flavor.grades needs exactly 5 entries");
  if (!/Not affiliated with or endorsed by/.test(L.disclaimer || "")) fail(id, "disclaimer wording is missing");

  const shared = Object.entries(located.reduce((m, t) => ((m[t.loc] = m[t.loc] || []).push(t.name), m), {})).filter(([, v]) => v.length > 1);
  const same = Object.values(colored.reduce((m, t) => ((m[colorKey(t)] = m[colorKey(t)] || []).push(t.name), m), {})).filter(v => v.length > 1);
  console.log(`${L.label}: ${teams.length} teams, ${L.divisions.length} divisions, conferences ${L.conferences.map(c => `${c} (${teams.filter(t => t.conf === c).length})`).join(", ")}`);
  console.log(`  shared locations: ${shared.map(([l, v]) => `${l} (${v.join(", ")})`).join("; ") || "none"}`);
  console.log(`  same color names (never shown together): ${same.map(v => v.join(" & ")).join("; ") || "none"}`);
  const left = [...teams.filter(t => !t.loc).map(t => `${full(t)} (colors modes only)`), ...teams.filter(t => !t.colors).map(t => `${full(t)} (name/city modes only)`)];
  if (left.length) console.log(`  partly playable: ${left.join("; ")}`);
}

if (!leagues.length) { console.log("No leagues found."); failures++; }
console.log(failures ? `\n${failures} problem(s) found.` : "\nAll league data checks passed.");
process.exit(failures ? 1 : 0);
