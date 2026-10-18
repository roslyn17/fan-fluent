// WNBA data. Names, locations and conferences per WNBA.com (https://www.wnba.com/teams).
// The WNBA has no divisions, so each conference is used as the division (wrong answers prefer the same conference).
// Colors per TeamColorCodes.com (https://teamcolorcodes.com/wnba-color-codes/), primary colors only (2–3).
// The 2025–26 expansion teams (Valkyries, Tempo, Fire) have no TeamColorCodes page yet, so colors is null:
// they only appear in the name and city modes.
(function(){
const C = (name, hex) => ({name, hex});
(window.LEAGUES = window.LEAGUES || {}).wnba = {
  id: "wnba",
  label: "WNBA",
  sport: "Basketball",
  emoji: "🏀",
  surface: "seams", // background and progress-bar theme (see css/styles.css)
  credits: "Team names, locations and conferences per WNBA.com. Colors per TeamColorCodes.com (primary colors only).",
  disclaimer: "Not affiliated with or endorsed by the WNBA or any of its teams.",
  storage: {misses: "gf-wnba-misses", pool: "gf-wnba-pool"},
  examples: {name: "Liberty", loc: "New York"},
  flavor: {
    good: ["SWISH!", "NOTHING BUT NET!", "AND ONE!", "+2"],
    streak: "ON FIRE!",
    bad: ["AIRBALL!", "BRICK!", "SHOT CLOCK!"],
    // lowest to highest: <40%, 40%+, 60%+, 80%+, perfect
    grades: ["Training Camp", "Rookie", "Starter", "⭐ All-Star", "🏆 Hall of Fame"],
  },
  // Only the short forms CLAUDE.md allows: LA, NY, NYC, DC, and Vegas / Las Vegas
  locAliases: {
    "Los Angeles": ["LA"], "New York": ["NY", "NYC"], "Washington": ["Washington DC", "DC"], "Las Vegas": ["Vegas"],
  },
  conferences: ["East", "West"],
  confNames: {East: "Eastern Conference", West: "Western Conference"},
  divisions: [
    {conf: "East", name: "Eastern Conference", teams: [
      // Deliberate pick: red, grey, light blue. The grey is TeamColorCodes' pale blue-grey #CED9E5 (listed there as "light blue")
      {name: "Dream", loc: "Atlanta", colors: [C("red", "#C8102E"), C("grey", "#CED9E5"), C("light blue", "#418FDE")]},
      {name: "Sky", loc: "Chicago", colors: [C("yellow", "#FFCD00"), C("light blue", "#418FDE")]},
      // Deliberate pick: orange, navy, white (TeamColorCodes lists red first)
      {name: "Sun", loc: "Connecticut", colors: [C("orange", "#DC4405"), C("navy", "#041E42"), C("white", "#FFFFFF")]},
      {name: "Fever", loc: "Indiana", colors: [C("red", "#C8102E"), C("navy", "#041E42"), C("yellow", "#FFCD00")]},
      {name: "Liberty", loc: "New York", colors: [C("seafoam", "#6ECEB2"), C("black", "#000000"), C("orange", "#FF671F")]},
      {name: "Tempo", loc: "Toronto", colors: null},
      {name: "Mystics", loc: "Washington", colors: [C("navy", "#0C2340"), C("red", "#C8102E")]},
    ]},
    {conf: "West", name: "Western Conference", teams: [
      {name: "Wings", loc: "Dallas", colors: [C("navy", "#0C2340"), C("volt green", "#C4D600"), C("light blue", "#00A9E0")]},
      {name: "Valkyries", loc: "Golden State", colors: null},
      {name: "Aces", loc: "Las Vegas", colors: [C("red", "#BA0C2F"), C("black", "#000000"), C("gold", "#85714D")]},
      {name: "Sparks", loc: "Los Angeles", colors: [C("purple", "#702F8A"), C("gold", "#FFC72C"), C("teal", "#00B398")]},
      {name: "Lynx", loc: "Minnesota", colors: [C("navy", "#0C2340"), C("blue", "#236192"), C("green", "#78BE20")]},
      {name: "Mercury", loc: "Phoenix", colors: [C("purple", "#201747"), C("orange", "#CB6015")]},
      {name: "Fire", loc: "Portland", colors: null},
      {name: "Storm", loc: "Seattle", colors: [C("green", "#2C5234"), C("yellow", "#FBE122")]},
    ]},
  ],
};
})();
