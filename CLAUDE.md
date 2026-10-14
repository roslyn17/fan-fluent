# Fan Fluent

A no-account webapp for learning sports teams: names, locations and colors. It starts with the NFL and will expand to other leagues (NBA, MLB, NHL, MLS, Premier League).

The app is plain HTML, CSS and JavaScript with no build step and no dependencies apart from Google Fonts. Treat the code as the source of truth for current behavior:

- `index.html`: page markup. Open it directly in a browser, or serve the folder (e.g. `python3 -m http.server`).
- `css/styles.css`: all styles.
- `js/leagues/<league>.js`: one data file per league (e.g. `nfl.js`): teams grouped by division and conference, location short forms, credits and disclaimer, sport flavor text (pop-ups, grades), and its `localStorage` keys. Adding a league should only need a new file here plus a `<script>` tag.
- `js/modes.js`: the 6 game modes, shared by every league.
- `js/app.js`: game logic, storage, UI and effects. All scripts are classic scripts (not ES modules), so `file://` still works.
- `tests/check-data.js`: run `node tests/check-data.js` to check every league file against the data rules below (no dependencies).
- `tests/game-test.html`: serve the folder and open `/tests/game-test.html` to play the real app automatically and check the game rules below (choices, typed answers, IDK, practice replay, pools, footer).

The original single-file prototype (`fan-fluent.html`) is in the first git commit.

## Hard requirements

- **No accounts and no backend.** Everything runs in the browser. Progress, such as missed-team weights and the selected pool, goes in `localStorage`. Every storage read and write is wrapped in try/catch, and the app must still work if storage is unavailable.
- **No official logos, crests, mascot artwork, fonts or league branding.** Visuals are built only from team names and color swatches.
- **Don't put league names in the product name or domain.** The title stays "Fan Fluent" for every league; league names ("NFL," "NBA") appear only as plain reference text, such as the league picker buttons and the footer.
- Keep each league's footer disclaimer ("Not affiliated with or endorsed by the NFL or any of its teams." and the same wording for the NBA). Also keep the source credits.
- It must work well on phones: 16px side gutter and no horizontal scroll.

## Data rules (NFL)

- **Team names, locations and conferences:** NFL.com (https://www.nfl.com/teams/), the official source.
- **Location** is the name used in the team's branding ("Carolina," "New England," "Tampa Bay," "Arizona," "Washington"), not the stadium city. Don't treat regions or states differently.
- **Colors:** TeamColorCodes.com (https://teamcolorcodes.com/nfl-team-color-codes/), using **primary colors only (2–3 per team)**. Don't show the full official lists anywhere.
  - Deliberate exceptions: the Colts are blue and white, and the Jets are green and white, because those are what fans recognize.
  - Colors use simple names such as "navy," "gray" and "Honolulu blue."
- Pool filter options: **All teams (32 teams), AFC (16 teams), NFC (16 teams).** Don't add division filters.

## Data rules (NBA)

Same rules as the NFL unless listed here.

- **Team names, locations, conferences and divisions:** NBA.com (https://www.nba.com/teams).
- **Colors:** TeamColorCodes.com (https://teamcolorcodes.com/nba-team-color-codes/), primary colors only (2–3 per team), simple names.
  - Deliberate exception: the Celtics are green and white, because that's what fans recognize.
  - The Jazz use their current palette (purple, black, sky blue). TeamColorCodes' main Jazz list is still the old navy / green / yellow, so the purple (#3E2680) and sky blue (#6CAEDF) hex codes come from its 2004–2010 Jazz colors on the same page. The team hasn't published official hex codes.
- **Clippers:** location is "Los Angeles" (NBA.com brands them "LA Clippers"), so they share a location with the Lakers. Typing "LA" is accepted.
- Pool filter options: **All teams (30 teams), East (15 teams), West (15 teams).**

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
- **Locations:** exact spelling, ignoring capitalization, spaces, periods and commas. The only short forms accepted are LA, NY, NYC, KC, SF, OKC and DC / Washington DC. Don't accept informal ones such as Philly, Vegas or Indy.
- An **IDK** button appears in typing modes only. It reveals the answer with a gentle message (no flag animation or shake), counts as a miss and resets the streak.

## Rounds and progress

- A round is 10 questions, or the pool size if that's smaller. Missed teams are weighted to come up more often, and these weights persist in `localStorage`.
- Results screen: "FINAL" scoreboard, a grade and the best streak. Grades come from the league file: NFL is Practice Squad, Rookie, Starter, All-Pro, Hall of Fame; NBA is G League, Rookie, Starter, All-Star, Hall of Fame.
- **Practice missed (N):** replays the **exact** missed questions, with the same prompt and the same answer choices in the same order, in the order they were missed. The round is labeled "Practice · N missed teams." When any were missed, this is the main highlighted button.
- Keyboard: 1–4 choose an answer, and Enter checks or goes to the next question.

## Look and feel

- Stadium-at-night theme: floodlight glows, the Bebas Neue display font with Inter for body text, and LED-yellow accents.
- A league picker (one button per league) sits at the top of the home screen. The choice is remembered in `localStorage` and shown in the URL (`#nfl`, `#nba`); editing the hash switches league. Each league has its own missed-team weights and pool selection.
- Each league has a **surface** (`surface` in its league file, styles in `css/styles.css`):
  - `field` (NFL): turf background with yard lines, and a football-field progress bar with a 🏈 that advances.
  - `court` (NBA): dark hardwood background with a half-court line and center circle, and a court progress bar (painted keys at both ends, half-court line) with a 🏀.
- Scoreboard (score, play number, streak, which turns "hot" at 3 or more in a row).
- Correct answer: a pop-up from the league's flavor text, confetti in the team's colors, and the team's colors along the top edge of the card. NFL: "TOUCHDOWN!", "FIRST DOWN!", "NICE CATCH!", "+1". NBA: "SWISH!", "BUCKET!", "AND ONE!", "+2". Streaks of 3+: "ON FIRE!"
- Wrong answer: a shake plus a pop-up. NFL: "🚩 FLAG!", "INCOMPLETE" or "FUMBLE!", and the message starts with 🚩. NBA: "AIRBALL!", "BRICK!" or "TURNOVER!", with no 🚩.
- A perfect round sets off a big multi-team confetti burst. All motion is turned off for `prefers-reduced-motion`.

## Roadmap

1. ~~Turn the prototype into a proper project (separate files, git), keeping all current behavior.~~ Done.
2. ~~Move team data into a per-league data file so new leagues are just data.~~ Done.
3. ~~Add a sport or league picker and apply the same rules and modes to each league.~~ Done (NFL, NBA).
4. More leagues (MLB, NHL, MLS, Premier League): add a league file, a `<script>` tag and, if needed, a new surface.

## Decisions

- The product name stays "Fan Fluent" for every league (not "Fan Fluent: NBA").
- Short forms are a fixed, shared list; "OKC" was added for the NBA. Informal ones (Philly, Vegas, Indy) stay rejected.
