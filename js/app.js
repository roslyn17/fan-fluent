// ---------- storage (per-viewer, optional) ----------
const store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

// ---------- league ----------
// Leagues come from js/leagues/*.js, in the order their <script> tags appear.
let LEAGUE, TEAMS, LOC_ALIASES;
let misses = {}; // {modeId: {teamName: count}}, per league

// ---------- helpers ----------
const $ = id => document.getElementById(id);
const shuffle = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const full = t => `${t.loc} ${t.name}`;
// typed answers: team names ignore only capitalization and extra spaces;
// locations also ignore periods and commas (so "L.A." and "Washington, D.C." work)
const exactName = s => s.toLowerCase().replace(/\s+/g," ").trim();
const exactLoc = s => exactName(s.replace(/[.,]/g,""));
const colorKey = t => t.colors.map(c=>c.name).sort().join("|");
function swatchHTML(t, big){
  return `<div class="swatches${big?' big':''}">` + t.colors.map(c=>`<div class="sw"><i style="background:${c.hex}"></i><span>${c.name}</span></div>`).join("") + `</div>`;
}

// ---------- home ----------
function setLeague(id){
  LEAGUE = LEAGUES[id] || LEAGUES.nfl;
  TEAMS = LEAGUE.divisions.flatMap(d => d.teams.map(t => ({...t, conf:d.conf, div:d.name})));
  LOC_ALIASES = LEAGUE.locAliases;
  misses = store.get(LEAGUE.storage.misses, {});
  store.set("gf-league", LEAGUE.id);
  try{ history.replaceState(null, "", "#" + LEAGUE.id); }catch(e){}

  document.querySelectorAll(".league").forEach(b=>b.setAttribute("aria-pressed", b.dataset.id===LEAGUE.id));
  $("league-sub").textContent = `${LEAGUE.emoji} ${LEAGUE.sport} · Learn all ${TEAMS.length} teams ${LEAGUE.emoji}`;
  $("credits").textContent = `${LEAGUE.credits} ${LEAGUE.disclaimer}`;
  $("ball").textContent = LEAGUE.emoji;
  document.documentElement.dataset.surface = LEAGUE.surface || "field";
  const pools = [["all",`All teams (${TEAMS.length} teams)`]];
  LEAGUE.conferences.forEach(c=>pools.push([c,`${c} (${TEAMS.filter(t=>t.conf===c).length} teams)`]));
  $("pool").innerHTML = pools.map(([v,l])=>`<option value="${v}">${l}</option>`).join("");
  const savedPool = store.get(LEAGUE.storage.pool,"all");
  $("pool").value = pools.some(([v])=>v===savedPool) ? savedPool : "all";
}
$("pool").onchange = e => store.set(LEAGUE.storage.pool, e.target.value);

const leagueIds = Object.keys(LEAGUES);
$("league-picker").classList.toggle("hidden", leagueIds.length < 2);
$("leagues").innerHTML = leagueIds.map(id=>`<button class="league" data-id="${id}" aria-pressed="false">${LEAGUES[id].emoji} ${LEAGUES[id].label}</button>`).join("");
document.querySelectorAll(".league").forEach(b=>b.onclick=()=>setLeague(b.dataset.id));
const hashLeague = () => location.hash.slice(1).toLowerCase();
setLeague(LEAGUES[hashLeague()] ? hashLeague() : store.get("gf-league", "nfl"));
// editing the #league in the address bar (or a link to it) switches league without a reload
addEventListener("hashchange", ()=>{ const id = hashLeague(); if(LEAGUES[id] && id!==LEAGUE.id){ goHome(); setLeague(id); } });

function renderModes(){
  for(const g of ["nc","c"]){
    $("modes-"+g).innerHTML = MODES.filter(m=>m.group===g).map(m=>
      `<button class="mode" data-id="${m.id}"><span class="num">${String(MODES.indexOf(m)+1).padStart(2,"0")}</span><b>${m.title}</b><small>${m.desc}</small><br><span class="tag">${m.fmt==="Type"?"⌨️ Type it":"☝️ Multiple choice"}</span></button>`).join("");
  }
  document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>start(MODES.find(m=>m.id===b.dataset.id)));
}
renderModes();

function poolTeams(){
  const v = $("pool").value;
  if(v==="all") return TEAMS;
  return TEAMS.filter(t=>t.conf===v);
}

// ---------- quiz state ----------
let S = null;
const ROUND = 10;

function pickRound(pool, mode, forced){
  if(forced) return forced.slice(); // replay missed teams in the order they were missed
  const mm = misses[mode.id] || {};
  // weighted sample without replacement: missed teams more likely
  let bag = pool.map(t=>({t, w:1 + 2*(mm[t.name]||0)}));
  const out = [];
  const n = Math.min(ROUND, pool.length);
  while(out.length < n){
    const total = bag.reduce((s,x)=>s+x.w,0);
    let r = Math.random()*total, i=0;
    while(r > bag[i].w){ r -= bag[i].w; i++; }
    out.push(bag[i].t); bag.splice(i,1);
  }
  return out;
}

function start(mode, forced, replay){
  const pool = poolTeams();
  S = {mode, pool, queue: pickRound(pool, mode, forced), i:0, score:0, streak:0, best:0, missed:[], missedOpts:{}, replay: replay||null, answered:false};
  $("sb-score").textContent = "0"; $("sb-streak").textContent = "0"; $("sb-streak").classList.remove("hot");
  $("home").classList.add("hidden"); $("results").classList.add("hidden"); $("quiz").classList.remove("hidden");
  $("quiz-title").textContent = forced
    ? `Practice · ${forced.length} missed ${forced.length===1?"team":"teams"}`
    : `${mode.title} · ${mode.fmt==="Type"?"Type it":"Multiple choice"}`;
  show();
}

function distractors(t, n, sameKeyFn){
  // prefer same-division teams, then others; never ambiguous ones,
  // and never two teams that share a location (e.g. both Los Angeles teams)
  const others = TEAMS.filter(o => o !== t && o.loc !== t.loc && !sameKeyFn(o));
  const sameDiv = shuffle(others.filter(o=>o.div===t.div));
  const rest = shuffle(others.filter(o=>o.div!==t.div));
  const picked = [];
  for(const o of [...sameDiv, ...rest]){ if(picked.length>=n) break; if(!picked.some(p=>p.loc===o.loc || sameKeyFn(o,p))) picked.push(o); }
  return picked;
}

function show(){
  const {mode, queue, i} = S; const t = queue[i];
  S.answered = false; S.current = t;
  $("quiz-count").textContent = `${i+1}/${queue.length}`;
  moveBall(i/queue.length);
  $("qcard").style.removeProperty("--stripe");
  $("feedback").className = "feedback"; $("feedback").textContent = "";
  $("next").classList.add("hidden");
  $("hint").textContent = "";

  // prompt
  if(mode.ask==="city"){
    $("prompt-label").textContent = "Complete the team name";
    $("prompt").innerHTML = `<div class="prompt">${t.loc} ____</div>`;  } else if(mode.ask==="name"){
    $("prompt-label").textContent = "Complete the team name";
    $("prompt").innerHTML = `<div class="prompt">____ ${t.name}</div>`;
  } else if(mode.ask==="team"){
    $("prompt-label").textContent = "What are their colors?";
    $("prompt").innerHTML = `<div class="prompt">${full(t)}</div>`;
  } else {
    $("prompt-label").textContent = "Which team wears these colors?";
    $("prompt").innerHTML = swatchHTML(t, true);
  }

  const area = $("answer-area");
  if(mode.type==="mc"){
    $("submit").classList.add("hidden"); $("idk").classList.add("hidden");
    let ds;
    if(mode.ans==="name") ds = distractors(t, 3, (o,p)=> p ? o.name===p.name : o.loc===t.loc);
    else if(mode.ans==="loc") ds = distractors(t, 3, (o,p)=> p ? o.loc===p.loc : o.loc===t.loc);
    else ds = distractors(t, 3, (o,p)=> p ? colorKey(o)===colorKey(p) : colorKey(o)===colorKey(t));
    const opts = (S.replay && S.replay[t.name]) || shuffle([t, ...ds]); // same choices as the missed question
    S.opts = opts;
    area.innerHTML = `<div class="options">` + opts.map((o,k)=>{
      let label;
      if(mode.ans==="name") label = o.name;
      else if(mode.ans==="loc") label = o.loc;
      else if(mode.ans==="colors") label = swatchHTML(o);
      else label = full(o);
      return `<button class="opt" data-k="${k}"><span class="k">${k+1}</span>${label}</button>`;
    }).join("") + `</div>`;
    area.querySelectorAll(".opt").forEach(b=>b.onclick=()=>chooseMC(+b.dataset.k));
  } else {
    $("submit").classList.remove("hidden"); $("idk").classList.remove("hidden");
    area.innerHTML = `<input type="text" id="typed" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="${mode.ans==="name"?`Team name, e.g. ${LEAGUE.examples.name}`:`Location, e.g. ${LEAGUE.examples.loc}`}">`;
    setTimeout(()=>$("typed").focus(), 0);
  }
}

function isCorrectMC(o){
  const t = S.current, m = S.mode;
  if(m.ans==="name") return o.loc===t.loc; // either team at a shared city
  if(m.ans==="loc") return o.loc===t.loc;
  if(m.ans==="colors") return o===t;
  return o===t;
}

function chooseMC(k){
  if(S.answered) return;
  const o = S.opts[k]; const ok = isCorrectMC(o);
  document.querySelectorAll(".opt").forEach((b,j)=>{
    b.disabled = true;
    if(isCorrectMC(S.opts[j])) b.classList.add("correct");
    else if(j===k) b.classList.add("wrong");
  });
  finish(ok);
}

function checkTyped(){
  if(S.answered) return;
  const raw = $("typed").value.trim(); if(!raw) return;
  const t = S.current; let ok=false;
  if(S.mode.ans==="name"){
    for(const c of TEAMS.filter(o=>o.loc===t.loc)){
      // exact spelling required (capitalization and spacing ignored); "Packers" or "Green Bay Packers"
      if([c.name, full(c)].map(exactName).includes(exactName(raw))) ok = true;
    }
  } else {
    // exact spelling required (capitalization, spaces, periods and commas ignored); official short forms allowed
    ok = [t.loc, ...(LOC_ALIASES[t.loc]||[])].map(exactLoc).includes(exactLoc(raw));
  }
  $("typed").disabled = true;
  finish(ok);
}

function answerText(t){
  const m = S.mode;
  if(m.ans==="name"){
    const all = TEAMS.filter(o=>o.loc===t.loc);
    return all.length>1 ? all.map(full).join(" or ") : full(t);
  }
  if(m.ans==="loc") return `${t.loc} (${full(t)})`;
  if(m.ans==="colors") return `${full(t)}: ${t.colors.map(c=>c.name).join(", ")}`;
  return full(t);
}

function finish(ok, idk){
  S.answered = true;
  const t = S.current, id = S.mode.id;
  misses[id] = misses[id] || {};
  // flash the team's colors across the top of the card
  const hexes = t.colors.map(c=>c.hex);
  $("qcard").style.setProperty("--stripe", `linear-gradient(90deg, ${hexes.map((h,k)=>`${h} ${k/hexes.length*100}% ${(k+1)/hexes.length*100}%`).join(",")})`);
  if(ok){
    S.score++; S.streak++; S.best = Math.max(S.best, S.streak);
    if(misses[id][t.name]) misses[id][t.name] = Math.max(0, misses[id][t.name]-1);
    $("feedback").className = "feedback good";
    $("feedback").textContent = (S.streak>=3 ? `🔥 ${S.streak} in a row! ` : "Correct! ") + answerText(t);
    const fl = LEAGUE.flavor;
    popText(S.streak>=3 ? fl.streak : fl.good[Math.floor(Math.random()*fl.good.length)], true);
    confetti(hexes, 70);
  } else {
    S.streak = 0;
    S.missed.push(t);
    if(S.opts && S.mode.type==="mc") S.missedOpts[t.name] = S.opts;
    misses[id][t.name] = (misses[id][t.name]||0) + 1;
    $("feedback").className = "feedback bad";
    if(idk){
      $("feedback").textContent = "No worries. Answer: " + answerText(t) + ". It'll come back in practice.";
    } else {
      $("feedback").textContent = (LEAGUE.flavor.missIcon ? LEAGUE.flavor.missIcon + " " : "") + "Not quite. Answer: " + answerText(t);
      const bad = LEAGUE.flavor.bad;
      popText(bad[Math.floor(Math.random()*bad.length)], false);
      $("qcard").classList.remove("shake"); void $("qcard").offsetWidth; $("qcard").classList.add("shake");
    }
  }
  $("sb-score").textContent = S.score;
  $("sb-streak").textContent = S.streak;
  $("sb-streak").classList.toggle("hot", S.streak>=3);
  moveBall((S.i+1)/S.queue.length);
  store.set(LEAGUE.storage.misses, misses);
  $("submit").classList.add("hidden");
  $("idk").classList.add("hidden");
  $("next").classList.remove("hidden");
  $("next").focus();
}

function next(){
  S.i++;
  if(S.i >= S.queue.length) return results();
  show();
}

function results(){
  $("quiz").classList.add("hidden"); $("results").classList.remove("hidden");
  const {score, queue, missed, mode} = S;
  $("res-title").textContent = `${mode.title} · ${mode.fmt==="Type"?"Type it":"Multiple choice"}`;
  $("res-score").textContent = `${score}–${queue.length}`;
  const pct = score/queue.length;
  const g = LEAGUE.flavor.grades;
  $("res-grade").textContent = pct===1 ? g[4] : pct>=.8 ? g[3] : pct>=.6 ? g[2] : pct>=.4 ? g[1] : g[0];
  $("res-msg").textContent = (pct===1 ? "Perfect round!" : pct>=.7 ? "Nice work. Review the ones you missed below." : "Keep going. Missed teams will come up more often.") + (S.best>=3 ? ` Best streak: 🔥 ${S.best}` : "");
  if(pct===1){ const all = TEAMS.flatMap(t=>t.colors.map(c=>c.hex)); confetti(all, 220); setTimeout(()=>confetti(all,160), 500); }
  else if(pct>=.8) confetti(["#ffcf3f","#ffffff","#3fe07f"], 90);
  $("res-missed").innerHTML = missed.map(t=>`<li><span><b>${full(t)}</b> · ${t.div}</span>${mode.group==="c"?swatchHTML(t):`<span class="sub">${t.loc}</span>`}</li>`).join("");
  $("retry-missed").classList.toggle("hidden", !missed.length);
  $("retry-missed").textContent = `Practice missed (${missed.length})`;
  $("retry-missed").classList.toggle("ghost", !missed.length);
  $("again").classList.toggle("ghost", !!missed.length);
}

// ---------- fun stuff ----------
function moveBall(frac){ $("ball").style.left = `${6 + frac*88}%`; }
function popText(text, good){
  const p = $("pop"); p.className = "pop"; p.textContent = text; void p.offsetWidth;
  p.className = `pop go ${good?"good":"bad"}`;
}
const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const cv = $("confetti"), cx = cv.getContext("2d"); let parts = [], raf = null;
function sizeCanvas(){ cv.width = innerWidth*devicePixelRatio; cv.height = innerHeight*devicePixelRatio; cx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); }
addEventListener("resize", sizeCanvas); sizeCanvas();
function confetti(colors, n){
  if(reduceMotion) return;
  const r = $("qcard").getBoundingClientRect();
  const ox = r.width ? r.left + r.width/2 : innerWidth/2, oy = r.width ? r.top + 40 : innerHeight/3;
  for(let k=0;k<n;k++){
    const a = Math.random()*Math.PI*2, v = 4 + Math.random()*8;
    parts.push({x:ox, y:oy, vx:Math.cos(a)*v, vy:Math.sin(a)*v - 6, w:6+Math.random()*6, h:8+Math.random()*8,
      rot:Math.random()*6, vr:(Math.random()-.5)*.4, c:colors[k%colors.length], life:90+Math.random()*50});
  }
  if(!raf) raf = requestAnimationFrame(tick);
}
function tick(){
  cx.clearRect(0,0,innerWidth,innerHeight);
  parts = parts.filter(p=>p.life-- > 0 && p.y < innerHeight+40);
  for(const p of parts){
    p.vy += .32; p.vx *= .985; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    cx.save(); cx.translate(p.x,p.y); cx.rotate(p.rot); cx.globalAlpha = Math.min(1, p.life/30);
    cx.fillStyle = p.c; cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
    cx.strokeStyle = "rgba(255,255,255,.35)"; cx.lineWidth = .6; cx.strokeRect(-p.w/2,-p.h/2,p.w,p.h);
    cx.restore();
  }
  raf = parts.length ? requestAnimationFrame(tick) : (cx.clearRect(0,0,innerWidth,innerHeight), null);
}

$("submit").onclick = checkTyped;
$("idk").onclick = ()=>{ if(S.answered) return; $("typed").disabled = true; finish(false, true); };
$("next").onclick = next;
$("quit").onclick = goHome;
$("home-btn").onclick = goHome;
$("again").onclick = ()=>start(S.mode);
$("retry-missed").onclick = ()=>start(S.mode, S.missed, S.missedOpts);
function goHome(){ $("quiz").classList.add("hidden"); $("results").classList.add("hidden"); $("home").classList.remove("hidden"); }

document.addEventListener("keydown", e=>{
  if($("quiz").classList.contains("hidden")) return;
  if(e.key==="Enter"){
    e.preventDefault();
    if(S.answered) next(); else if(S.mode.type==="text") checkTyped();
  } else if(S.mode.type==="mc" && !S.answered && /^[1-4]$/.test(e.key)){
    chooseMC(+e.key-1);
  }
});
