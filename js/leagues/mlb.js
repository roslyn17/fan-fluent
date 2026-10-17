// MLB data. Names, locations, leagues and divisions per MLB.com (https://www.mlb.com/team).
// Colors per TeamColorCodes.com (https://teamcolorcodes.com/mlb-color-codes/), primary colors only (2–3).
// Deliberate exceptions: Yankees are navy and white, Dodgers are Dodger blue and white (what fans recognize).
// The Athletics have no location in their branding, so loc is null: they only appear in the colors modes.
(function(){
const C = (name, hex) => ({name, hex});
(window.LEAGUES = window.LEAGUES || {}).mlb = {
  id: "mlb",
  label: "MLB",
  sport: "Baseball",
  emoji: "⚾",
  surface: "diamond", // background and progress-bar theme (see css/styles.css)
  credits: "Team names, locations and leagues per MLB.com. Colors per TeamColorCodes.com (primary colors only).",
  disclaimer: "Not affiliated with or endorsed by MLB or any of its teams.",
  storage: {misses: "gf-mlb-misses", pool: "gf-mlb-pool"},
  examples: {name: "Cubs", loc: "Chicago"},
  flavor: {
    good: ["HOME RUN!", "BASE HIT!", "SAFE!", "+1"],
    streak: "ON FIRE!",
    bad: ["STRIKE!", "OUT!", "FOUL BALL!"],
    // lowest to highest: <40%, 40%+, 60%+, 80%+, perfect
    grades: ["Minor Leagues", "Rookie", "Starter", "⭐ All-Star", "🏆 Hall of Fame"],
  },
  // Only the short forms CLAUDE.md allows: LA, NY, NYC, KC, SF, DC
  locAliases: {
    "Los Angeles": ["LA"], "New York": ["NY", "NYC"], "Kansas City": ["KC"], "San Francisco": ["SF"],
    "Washington": ["Washington DC", "DC"],
  },
  conferences: ["AL", "NL"],
  divisions: [
    {conf: "AL", name: "AL East", teams: [
      {name: "Orioles", loc: "Baltimore", colors: [C("orange", "#DF4601"), C("black", "#000000")]},
      {name: "Red Sox", loc: "Boston", colors: [C("red", "#BD3039"), C("navy", "#0C2340")]},
      {name: "Yankees", loc: "New York", colors: [C("navy", "#0C2340"), C("white", "#FFFFFF")]},
      {name: "Rays", loc: "Tampa Bay", colors: [C("navy", "#092C5C"), C("Columbia blue", "#8FBCE6"), C("yellow", "#F5D130")]},
      {name: "Blue Jays", loc: "Toronto", colors: [C("blue", "#134A8E"), C("navy", "#1D2D5C"), C("red", "#E8291C")]},
    ]},
    {conf: "AL", name: "AL Central", teams: [
      {name: "White Sox", loc: "Chicago", colors: [C("black", "#27251F"), C("silver", "#C4CED4")]},
      {name: "Guardians", loc: "Cleveland", colors: [C("navy", "#00385D"), C("red", "#E50022")]},
      {name: "Tigers", loc: "Detroit", colors: [C("navy", "#0C2340"), C("orange", "#FA4616")]},
      {name: "Royals", loc: "Kansas City", colors: [C("royal blue", "#004687"), C("gold", "#BD9B60")]},
      {name: "Twins", loc: "Minnesota", colors: [C("navy", "#002B5C"), C("red", "#D31145"), C("gold", "#B9975B")]},
    ]},
    {conf: "AL", name: "AL West", teams: [
      {name: "Athletics", loc: null, colors: [C("green", "#003831"), C("gold", "#EFB21E")]},
      {name: "Astros", loc: "Houston", colors: [C("navy", "#002D62"), C("orange", "#EB6E1F")]},
      {name: "Angels", loc: "Los Angeles", colors: [C("navy", "#003263"), C("red", "#BA0021")]},
      {name: "Mariners", loc: "Seattle", colors: [C("navy", "#0C2C56"), C("teal", "#005C5C"), C("silver", "#C4CED4")]},
      {name: "Rangers", loc: "Texas", colors: [C("blue", "#003278"), C("red", "#C0111F")]},
    ]},
    {conf: "NL", name: "NL East", teams: [
      {name: "Braves", loc: "Atlanta", colors: [C("red", "#CE1141"), C("navy", "#13274F")]},
      {name: "Marlins", loc: "Miami", colors: [C("Miami blue", "#00A3E0"), C("red", "#EF3340"), C("black", "#000000")]},
      {name: "Mets", loc: "New York", colors: [C("blue", "#002D72"), C("orange", "#FF5910")]},
      {name: "Phillies", loc: "Philadelphia", colors: [C("red", "#E81828"), C("blue", "#002D72")]},
      {name: "Nationals", loc: "Washington", colors: [C("red", "#AB0003"), C("navy", "#14225A")]},
    ]},
    {conf: "NL", name: "NL Central", teams: [
      {name: "Cubs", loc: "Chicago", colors: [C("blue", "#0E3386"), C("red", "#CC3433")]},
      {name: "Reds", loc: "Cincinnati", colors: [C("red", "#C6011F"), C("black", "#000000")]},
      {name: "Brewers", loc: "Milwaukee", colors: [C("navy", "#12284B"), C("yellow", "#FFC52F")]},
      {name: "Pirates", loc: "Pittsburgh", colors: [C("black", "#27251F"), C("yellow", "#FDB827")]},
      {name: "Cardinals", loc: "St. Louis", colors: [C("red", "#C41E3A"), C("navy", "#0C2340")]},
    ]},
    {conf: "NL", name: "NL West", teams: [
      {name: "Diamondbacks", loc: "Arizona", colors: [C("Sedona red", "#A71930"), C("sand", "#E3D4AD"), C("black", "#000000")]},
      {name: "Rockies", loc: "Colorado", colors: [C("purple", "#333366"), C("silver", "#C4CED4"), C("black", "#000000")]},
      {name: "Dodgers", loc: "Los Angeles", colors: [C("Dodger blue", "#005A9C"), C("white", "#FFFFFF")]},
      {name: "Padres", loc: "San Diego", colors: [C("brown", "#2F241D"), C("gold", "#FFC425")]},
      {name: "Giants", loc: "San Francisco", colors: [C("orange", "#FD5A1E"), C("black", "#27251F")]},
    ]},
  ],
};
})();
