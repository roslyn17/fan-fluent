# Fan Fluent

A no-account webapp for learning sports teams: names, locations and colors. It starts with the NFL and will expand to other leagues (NBA, MLB, NHL, MLS, Premier League).

The app is plain HTML, CSS and JavaScript with no build step and no dependencies apart from Google Fonts. Treat the code as the source of truth for current behavior:

- `index.html`: page markup. Run `python3 serve.py` and open http://localhost:8173 (or open the file directly).
- `serve.py`: local dev server (standard library only). Like `python3 -m http.server`, but it tells the browser not to cache files, so edits always show up on a normal refresh. Prefer it over `http.server`, which let browsers show stale scripts.
- `css/styles.css`: all styles.
- `js/leagues/<league>.js`: one data file per league (`nfl.js`, `nba.js`, `wnba.js`, `mlb.js`, `nhl.js`): teams grouped by division and conference, location short forms, credits and disclaimer, sport flavor text (pop-ups, grades), and its `localStorage` keys. Adding a league should only need a new file here plus a `<script>` tag.
- `js/modes.js`: the 6 game modes, shared by every league.
- `js/app.js`: game logic, storage, UI and effects. All scripts are classic scripts (not ES modules), so `file://` still works.
- `tests/check-data.js`: run `node tests/check-data.js` to check every league file against the data rules below (no dependencies).
- `tests/game-test.html`: run `python3 serve.py` and open http://localhost:8173/tests/game-test.html (it doesn't work from `file://`) to play the real app automatically and check the game rules below for every league (choices, typed answers, IDK, practice replay, pools, footer, surfaces).

The original single-file prototype (`fan-fluent.html`) is in the first git commit.

## Hard requirements

- **No accounts and no backend.** Everything runs in the browser. Progress, such as missed-team weights and the selected pool, goes in `localStorage`. Every storage read and write is wrapped in try/catch, and the app must still work if storage is unavailable.
- **No official logos, crests, mascot artwork, fonts or league branding.** Visuals are built only from team names and color swatches.
- **Don't put league names in the product name or domain.** The title stays "Fan Fluent" for every league; league names ("NFL," "NBA") appear only as plain reference text, such as the league picker buttons and the footer.
- Keep each league's footer disclaimer ("Not affiliated with or endorsed by the NFL or any of its teams." and the same wording for the NBA, WNBA, MLB and NHL). Also keep the source credits.
- It must work well on phones: 16px side gutter and no horizontal scroll.

## Data rules (NFL)

- **Team names, locations and conferences:** NFL.com (https://www.nfl.com/teams/), the official source.
- **Location** is the name used in the team's branding ("Carolina," "New England," "Tampa Bay," "Arizona," "Washington"), not the stadium city. Don't treat regions or states differently.
- **Colors:** TeamColorCodes.com (https://teamcolorcodes.com/nfl-team-color-codes/), using **primary colors only (2–3 per team)**. Don't show the full official lists anywhere.
  - Deliberate exceptions: the Colts are blue and white, and the Jets are green and white, because those are what fans recognize.
  - Colors use simple names such as "navy," "gray" and "Honolulu blue."
- Pool filter options: **All teams (32 teams), American Football Conference (16 teams), National Football Conference (16 teams).** Don't add division filters. Division names stay in their official short form ("AFC East").

## Data rules (NBA)

Same rules as the NFL unless listed here.

- **Team names, locations, conferences and divisions:** NBA.com (https://www.nba.com/teams).
- **Colors:** TeamColorCodes.com (https://teamcolorcodes.com/nba-team-color-codes/), primary colors only (2–3 per team), simple names.
  - Deliberate exception: the Celtics are green and white, because that's what fans recognize.
  - The Jazz use their current palette (purple, black, sky blue). TeamColorCodes' main Jazz list is still the old navy / green / yellow, so the purple (#3E2680) and sky blue (#6CAEDF) hex codes come from its 2004–2010 Jazz colors on the same page. The team hasn't published official hex codes.
- **Clippers:** location is "Los Angeles" (NBA.com brands them "LA Clippers"), so they share a location with the Lakers. Typing "LA" is accepted.
- Pool filter options: **All teams (30 teams), Eastern Conference (15 teams), Western Conference (15 teams).**

## Data rules (WNBA)

Same rules as the NFL unless listed here.

- **Team names, locations and conferences:** WNBA.com (https://www.wnba.com/teams). The WNBA has no divisions, so each conference is also used as the division: wrong answers come from the same conference first.
- **Colors:** TeamColorCodes.com (https://teamcolorcodes.com/wnba-color-codes/), primary colors only (2–3 per team), simple names.
  - Deliberate picks: the Sun are orange, navy and white; the Dream are red, grey and light blue. The Dream's grey is TeamColorCodes' pale blue-grey #CED9E5 (listed there as "light blue"), and their light blue is #418FDE (listed as "blue").
- **Golden State Valkyries, Toronto Tempo and Portland Fire** (2025–26 expansion): TeamColorCodes has no pages for them yet, so `colors` is `null` and they appear only in the name and city modes. Add colors once a source exists. (The Cleveland Sirens start in 2028; add them then.)
- Pool filter options: **All teams (15 teams), Eastern Conference (7 teams), Western Conference (8 teams).**

## Data rules (MLB)

Same rules as the NFL unless listed here.

- **Team names, locations, leagues and divisions:** MLB.com (https://www.mlb.com/team).
- **Colors:** TeamColorCodes.com (https://teamcolorcodes.com/mlb-color-codes/), primary colors only (2–3 per team), simple names.
  - Deliberate exceptions: the Yankees are navy and white, and the Dodgers are Dodger blue and white, because those are what fans recognize.
- **Athletics:** their branding has no location, so `loc` is `null` and they appear only in the colors modes, as "Athletics."
- Shared locations: New York (Yankees, Mets), Chicago (Cubs, White Sox), Los Angeles (Angels, Dodgers).
- Pool filter options: **All teams (30 teams), American League (15 teams), National League (15 teams).** Divisions use full names too ("American League East").

## Data rules (NHL)

Same rules as the NFL unless listed here.

- **Team names, locations, conferences and divisions:** NHL.com (https://www.nhl.com/info/teams). Locations keep NHL.com's spelling, including "Montréal" and "Vegas."
- **Colors:** TeamColorCodes.com (https://teamcolorcodes.com/nhl-team-color-codes/), primary colors only (2–3 per team), simple names. Use each team page's current primary colors (the "colors HEX codes are…" summary), not the historical ones listed below them.
- **Utah Mammoth:** TeamColorCodes has no page for them and the team hasn't published hex codes, so `colors` is `null` and they appear only in the name and city modes. Add colors once a source exists.
- **Golden Knights:** location is "Vegas" (NHL.com's spelling); typing "Las Vegas" is also accepted (and "Vegas" works for the NFL's Las Vegas Raiders).
- Shared locations: New York (Rangers, Islanders).
- Pool filter options: **All teams (32 teams), Eastern Conference (16 teams), Western Conference (16 teams).**

## Conference names

Pool filters always show the full conference or league name (each league file's `confNames`), never the abbreviation: "American League," not "AL."

## Partly playable teams

A team with `loc: null` sits out the 4 name/city modes; a team with `colors: null` sits out the 2 colors modes. They're never asked about or shown as wrong answers in those modes. A team can't have both set to `null`.

## Game modes (6)

| # | Mode | Prompt | Answer | Format |
|---|------|--------|--------|--------|
| 1 | City → Team | `Carolina ____` | Team name | Multiple choice (4) |
| 2 | Team → City | `____ Panthers` | Location | Multiple choice (4) |
| 3 | City → Team | `Carolina ____` | Team name | Typed |
| 4 | Team → City | `____ Panthers` | Location | Typed |
| 5 | Team → Colors | Full team name | Color swatch set | Multiple choice (4) |
| 6 | Colors → Team | Color swatches | Full team name | Multiple choice (4) |

- Name and city questions are worded as **"Complete the team name"**, never as "plays in."
- **Shared locations** (Los Angeles: Rams and Chargers; New York: Giants and Jets): never show both teams of a shared location among the choices, and don't add any hint or note about it. In typing mode, either team is accepted.
- **No ambiguous wrong answers:** in color modes, wrong answers can't have the same set of color names as the correct one (Falcons and Cardinals, Steelers and Saints, Bills and Giants). Wrong answers come from the same division first, then from other teams.

## Answer checking (typing modes)

- **Team names:** exact spelling, ignoring only capitalization and extra spaces. Accept "Packers" or "Green Bay Packers." Don't accept nicknames ("Pack," "Niners," "Bucs") or near-miss spellings.
- **Locations:** exact spelling, ignoring capitalization, spaces, periods, commas and accents ("Montreal" matches "Montréal"). The only short forms accepted are LA, NY, NYC, KC, SF, OKC and DC / Washington DC. "Vegas" and "Las Vegas" are interchangeable (Raiders, Aces and Golden Knights). Don't accept informal ones such as Philly or Indy.
- An **IDK** button appears in typing modes only. It reveals the answer with a gentle message (no flag animation or shake), counts as a miss and resets the streak.

## Rounds and progress

- A round is 10 questions, or the pool size if that's smaller. Missed teams are weighted to come up more often, and these weights persist in `localStorage`.
- Results screen: "FINAL" scoreboard, a grade and the best streak. Grades come from the league file: NFL is Practice Squad, Rookie, Starter, All-Pro, Hall of Fame; NBA is G League, Rookie, Starter, All-Star, Hall of Fame; WNBA is Training Camp, Rookie, Starter, All-Star, Hall of Fame; MLB is Minor Leagues, Rookie, Starter, All-Star, Hall of Fame; NHL is Juniors, Rookie, Starter, All-Star, Hall of Fame.
- **Practice missed (N):** replays the **exact** missed questions, with the same prompt and the same answer choices in the same order, in the order they were missed. The round is labeled "Practice · N missed teams." When any were missed, this is the main highlighted button.
- Keyboard: 1–4 choose an answer, and Enter checks or goes to the next question.

## Look and feel

- Stadium-at-night theme: floodlight glows, the Bebas Neue display font with Inter for body text, and LED-yellow accents.
- A league picker (one button per league, in alphabetical order: MLB, NBA, NFL, NHL, WNBA; on one row even on phones, where the emoji sits above the name) sits at the top of the home screen. The order comes from the order of the league `<script>` tags in `index.html`, so keep those alphabetical. New visitors start on the NFL. The choice is remembered in `localStorage` and shown in the URL (`#nfl`, `#nba`, `#wnba`, `#mlb`, `#nhl`); editing the hash switches league. Each league has its own missed-team weights and pool selection.
- Each league has a **surface** (`surface` in its league file, styles in `css/styles.css`):
  - `field` (NFL): turf background with yard lines, and a football-field progress bar with a 🏈 that advances.
  - `court` (NBA): dark hardwood background with a half-court line and center circle, and a court progress bar (painted keys at both ends, half-court line) with a 🏀.
  - `maple` (WNBA): warm horizontal hardwood planks under one spotlight, with a three-point arc and teal key at the bottom, and a court progress bar (teal keys, three-point arcs, half-court line) with a 🏀.
  - `diamond` (MLB): ballpark at dusk: a sunset sky with stadium-light glows, a green outfield wall with a yellow line, and a warm clay infield with chalk foul lines. Base-path progress bar (foul lines and three bases) with a ⚾.
  - `ice` (NHL): the only **light** theme: a bright ice sheet with red center line, blue lines and a red center circle. Text that sits directly on the background is dark navy (title "Fluent" in red) and panels are solid navy. Ice progress bar (red goal lines, blue lines, red center line and faceoff circle) with a 🏒.
  - Every surface must look clearly different from the others; check new ones side by side with the existing ones.
- Scoreboard (score, play number, streak, which turns "hot" at 3 or more in a row).
- Correct answer: a pop-up from the league's flavor text, confetti in the team's colors, and the team's colors along the top edge of the card. NFL: "TOUCHDOWN!", "FIRST DOWN!", "NICE CATCH!", "+1". NBA: "SWISH!", "BUCKET!", "AND ONE!", "+2". WNBA: "SWISH!", "NOTHING BUT NET!", "AND ONE!", "+2". MLB: "HOME RUN!", "BASE HIT!", "SAFE!", "+1". NHL: "GOAL!", "TOP SHELF!", "SNIPE!", "+1". Streaks of 3+: "ON FIRE!" ("HAT TRICK!" in the NHL).
- Wrong answer: a shake plus a pop-up. NFL: "🚩 FLAG!", "INCOMPLETE" or "FUMBLE!", and the message starts with 🚩. NBA: "AIRBALL!", "BRICK!" or "TURNOVER!"; WNBA: "AIRBALL!", "BRICK!" or "SHOT CLOCK!"; MLB: "STRIKE!", "OUT!" or "FOUL BALL!"; NHL: "ICING!", "OFFSIDE!" or "PENALTY!". Only the NFL message starts with 🚩.
- A perfect round sets off a big multi-team confetti burst. All motion is turned off for `prefers-reduced-motion`.

## Roadmap

1. ~~Turn the prototype into a proper project (separate files, git), keeping all current behavior.~~ Done.
2. ~~Move team data into a per-league data file so new leagues are just data.~~ Done.
3. ~~Add a sport or league picker and apply the same rules and modes to each league.~~ Done (NFL, NBA).
4. More leagues: add a league file, a `<script>` tag and, if needed, a new surface. WNBA, MLB and NHL are done. MLS, NWSL and Premier League are next; MLS and NWSL need a decision first (see Decisions).

## Decisions

- The product name stays "Fan Fluent" for every league (not "Fan Fluent: NBA").
- Short forms are a fixed, shared list; "OKC" was added for the NBA. Informal ones (Philly, Indy) stay rejected. "Vegas" and "Las Vegas" both work for every Las Vegas team (NFL Raiders, WNBA Aces, NHL Golden Knights), whichever one is the official location.
- Every hex code comes from a source (TeamColorCodes.com unless a league's rules say otherwise). Teams whose colors are announced but have no published hex codes (Utah Mammoth, Golden State Valkyries, Toronto Tempo, Portland Fire) stay out of the colors modes until TeamColorCodes adds them. Don't approximate hex codes from logos or photos.
- Each league gets its own surface (look), not a reused one, and it must be clearly distinct (MLB and NHL were redesigned because they looked too close to the NFL and the other night themes).
- NWSL is on hold for the same reason as MLS (Angel City FC, Bay FC, Gotham FC, Racing Louisville FC don't split). When it's added, its pool filter is "All teams" only, since the league has one table with no conferences.
- MLS is on hold: many club names don't split into "Location ____" (FC Cincinnati, Real Salt Lake, LAFC, Austin FC), so the name/city modes need a rule before MLS can be added.
