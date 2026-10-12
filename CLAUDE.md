# Fan Fluent

A no-account webapp for learning sports teams: names, locations and colors. It starts with the NFL and will expand to other leagues (NBA, MLB, NHL, MLS, Premier League).

`fan-fluent.html` is the working prototype: a single file of HTML, CSS and JavaScript with no build step and no dependencies apart from Google Fonts. Treat it as the source of truth for current behavior.

## Hard requirements

- **No accounts and no backend.** Everything runs in the browser. Progress, such as missed-team weights and the selected pool, goes in `localStorage`. Every storage read and write is wrapped in try/catch, and the app must still work if storage is unavailable.
- **No official logos, crests, mascot artwork, fonts or league branding.** Visuals are built only from team names and color swatches.
- **Don't put league names in the product name or domain.** "NFL" may appear only as plain reference text.
- Keep the footer disclaimer: "Not affiliated with or endorsed by the NFL or any of its teams." Also keep the source credits.
- It must work well on phones: 16px side gutter and no horizontal scroll.

## Data rules (NFL)

- **Team names, locations and conferences:** NFL.com (https://www.nfl.com/teams/), the official source.
- **Location** is the name used in the team's branding ("Carolina," "New England," "Tampa Bay," "Arizona," "Washington"), not the stadium city. Don't treat regions or states differently.
- **Colors:** TeamColorCodes.com (https://teamcolorcodes.com/nfl-team-color-codes/), using **primary colors only (2–3 per team)**. Don't show the full official lists anywhere.
  - Deliberate exceptions: the Colts are blue and white, and the Jets are green and white, because those are what fans recognize.
  - Colors use simple names such as "navy," "gray" and "Honolulu blue."
- Pool filter options: **All teams (32 teams), AFC (16 teams), NFC (16 teams).** Don't add division filters.

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
- **Locations:** exact spelling, ignoring capitalization, spaces, periods and commas. The only short forms accepted are LA, NY, NYC, KC, SF and DC / Washington DC. Don't accept informal ones such as Philly, Vegas or Indy.
- An **IDK** button appears in typing modes only. It reveals the answer with a gentle message (no flag animation or shake), counts as a miss and resets the streak.

## Rounds and progress

- A round is 10 questions, or the pool size if that's smaller. Missed teams are weighted to come up more often, and these weights persist in `localStorage`.
- Results screen: "FINAL" scoreboard, a grade (Practice Squad, Rookie, Starter, All-Pro, Hall of Fame) and the best streak.
- **Practice missed (N):** replays the **exact** missed questions, with the same prompt and the same answer choices in the same order, in the order they were missed. The round is labeled "Practice · N missed teams." When any were missed, this is the main highlighted button.
- Keyboard: 1–4 choose an answer, and Enter checks or goes to the next question.

## Look and feel

- Stadium-at-night theme: turf background with yard lines and floodlight glows, the Bebas Neue display font with Inter for body text, and LED-yellow accents.
- Scoreboard (score, play number, streak, which turns "hot" at 3 or more in a row) and a football-field progress bar with a 🏈 that advances.
- Correct answer: a pop-up ("TOUCHDOWN!", "NICE CATCH!", "ON FIRE!" for streaks), confetti in the team's colors, and the team's colors along the top edge of the card.
- Wrong answer: a shake plus "🚩 FLAG!", "INCOMPLETE" or "FUMBLE!"
- A perfect round sets off a big multi-team confetti burst. All motion is turned off for `prefers-reduced-motion`.

## Roadmap

1. Turn the prototype into a proper project (separate files, git), keeping all current behavior.
2. Move team data into a per-league data file so new leagues are just data.
3. Add a sport or league picker ("Fan Fluent: NBA," etc.) and apply the same rules and modes to each league.
