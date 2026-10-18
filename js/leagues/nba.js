// NBA data.
// Names, locations, conferences and divisions per NBA.com (https://www.nba.com/teams).
// Colors per TeamColorCodes.com (https://teamcolorcodes.com/nba-team-color-codes/), primary colors only (2–3).
(function(){
const C = (name, hex) => ({name, hex});
(window.LEAGUES = window.LEAGUES || {}).nba = {
  id: "nba",
  label: "NBA",
  sport: "Basketball",
  emoji: "🏀",
  surface: "court", // background and progress-bar theme (see css/styles.css)
  credits: "Team names, locations and conferences per NBA.com. Colors per TeamColorCodes.com (primary colors only).",
  disclaimer: "Not affiliated with or endorsed by the NBA or any of its teams.",
  storage: {misses: "gf-nba-misses", pool: "gf-nba-pool"},
  examples: {name: "Warriors", loc: "Golden State"},
  flavor: {
    good: ["SWISH!", "BUCKET!", "AND ONE!", "+2"],
    streak: "ON FIRE!",
    bad: ["AIRBALL!", "BRICK!", "TURNOVER!"],
    // lowest to highest: <40%, 40%+, 60%+, 80%+, perfect
    grades: ["G League", "Rookie", "Starter", "⭐ All-Star", "🏆 Hall of Fame"],
  },
  // Only the short forms CLAUDE.md allows: LA, NY, NYC, OKC, DC
  locAliases: {
    "Los Angeles": ["LA"], "New York": ["NY", "NYC"], "Oklahoma City": ["OKC"], "Washington": ["Washington DC", "DC"],
  },
  conferences: ["East", "West"],
  confNames: {East: "Eastern Conference", West: "Western Conference"},
  divisions: [
    {conf: "East", name: "Atlantic", teams: [
      {name: "Celtics", loc: "Boston", colors: [C("green", "#007A33"), C("white", "#FFFFFF")]}, // fan-recognized exception (source lists gold, brown, black too)
      {name: "Nets", loc: "Brooklyn", colors: [C("black", "#000000"), C("white", "#FFFFFF")]},
      {name: "Knicks", loc: "New York", colors: [C("blue", "#006BB6"), C("orange", "#F58426")]},
      {name: "76ers", loc: "Philadelphia", colors: [C("blue", "#006BB6"), C("red", "#ED174C")]},
      {name: "Raptors", loc: "Toronto", colors: [C("red", "#CE1141"), C("black", "#000000"), C("silver", "#A1A1A4")]},
    ]},
    {conf: "East", name: "Central", teams: [
      {name: "Bulls", loc: "Chicago", colors: [C("red", "#CE1141"), C("black", "#000000")]},
      {name: "Cavaliers", loc: "Cleveland", colors: [C("wine", "#860038"), C("gold", "#FDBB30"), C("navy", "#041E42")]},
      {name: "Pistons", loc: "Detroit", colors: [C("red", "#C8102E"), C("blue", "#1D42BA"), C("gray", "#BEC0C2")]},
      {name: "Pacers", loc: "Indiana", colors: [C("navy", "#002D62"), C("yellow", "#FDBB30")]},
      {name: "Bucks", loc: "Milwaukee", colors: [C("green", "#00471B"), C("cream", "#EEE1C6")]},
    ]},
    {conf: "East", name: "Southeast", teams: [
      {name: "Hawks", loc: "Atlanta", colors: [C("red", "#E03A3E"), C("volt green", "#C1D32F"), C("charcoal", "#26282A")]},
      {name: "Hornets", loc: "Charlotte", colors: [C("purple", "#1D1160"), C("teal", "#00788C"), C("gray", "#A1A1A4")]},
      {name: "Heat", loc: "Miami", colors: [C("red", "#98002E"), C("yellow", "#F9A01B"), C("black", "#000000")]},
      {name: "Magic", loc: "Orlando", colors: [C("blue", "#0077C0"), C("black", "#000000")]},
      {name: "Wizards", loc: "Washington", colors: [C("navy", "#002B5C"), C("red", "#E31837"), C("silver", "#C4CED4")]},
    ]},
    {conf: "West", name: "Northwest", teams: [
      {name: "Nuggets", loc: "Denver", colors: [C("navy", "#0E2240"), C("yellow", "#FEC524"), C("red", "#8B2131")]},
      {name: "Timberwolves", loc: "Minnesota", colors: [C("navy", "#0C2340"), C("blue", "#236192"), C("green", "#78BE20")]},
      {name: "Thunder", loc: "Oklahoma City", colors: [C("blue", "#007AC1"), C("orange", "#EF3B24"), C("navy", "#002D62")]},
      {name: "Trail Blazers", loc: "Portland", colors: [C("red", "#E03A3E"), C("black", "#000000")]},
      // Current palette (purple, black, sky blue). TeamColorCodes' main list is still the old navy/green/yellow,
      // so the purple and sky blue hex codes come from its 2004–2010 Jazz colors on the same page.
      {name: "Jazz", loc: "Utah", colors: [C("purple", "#3E2680"), C("black", "#000000"), C("sky blue", "#6CAEDF")]},
    ]},
    {conf: "West", name: "Pacific", teams: [
      {name: "Warriors", loc: "Golden State", colors: [C("blue", "#1D428A"), C("yellow", "#FFC72C")]},
      // NBA.com brands this team "LA Clippers"; kept as "Los Angeles" so it's treated as sharing a location with the Lakers
      {name: "Clippers", loc: "Los Angeles", colors: [C("red", "#C8102E"), C("blue", "#1D428A")]},
      {name: "Lakers", loc: "Los Angeles", colors: [C("purple", "#552583"), C("gold", "#FDB927")]},
      {name: "Suns", loc: "Phoenix", colors: [C("purple", "#1D1160"), C("orange", "#E56020")]},
      {name: "Kings", loc: "Sacramento", colors: [C("purple", "#5A2D81"), C("gray", "#63727A"), C("black", "#000000")]},
    ]},
    {conf: "West", name: "Southwest", teams: [
      {name: "Mavericks", loc: "Dallas", colors: [C("blue", "#00538C"), C("navy", "#002B5E"), C("silver", "#B8C4CA")]},
      {name: "Rockets", loc: "Houston", colors: [C("red", "#CE1141"), C("black", "#000000"), C("silver", "#C4CED4")]},
      {name: "Grizzlies", loc: "Memphis", colors: [C("Beale Street blue", "#5D76A9"), C("navy", "#12173F"), C("yellow", "#F5B112")]},
      {name: "Pelicans", loc: "New Orleans", colors: [C("navy", "#0C2340"), C("red", "#C8102E"), C("gold", "#85714D")]},
      {name: "Spurs", loc: "San Antonio", colors: [C("silver", "#C4CED4"), C("black", "#000000")]},
    ]},
  ],
};
})();
