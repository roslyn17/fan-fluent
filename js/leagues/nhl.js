// NHL data. Names, locations, conferences and divisions per NHL.com (https://www.nhl.com/info/teams).
// Colors per TeamColorCodes.com (https://teamcolorcodes.com/nhl-team-color-codes/), primary colors only (2–3).
// The Utah Mammoth (2025) have no TeamColorCodes page and no published hex codes yet, so colors is null:
// they only appear in the name and city modes.
(function(){
const C = (name, hex) => ({name, hex});
(window.LEAGUES = window.LEAGUES || {}).nhl = {
  id: "nhl",
  label: "NHL",
  sport: "Hockey",
  emoji: "🏒",
  surface: "ice", // background and progress-bar theme (see css/styles.css)
  credits: "Team names, locations and conferences per NHL.com. Colors per TeamColorCodes.com (primary colors only).",
  disclaimer: "Not affiliated with or endorsed by the NHL or any of its teams.",
  storage: {misses: "gf-nhl-misses", pool: "gf-nhl-pool"},
  examples: {name: "Bruins", loc: "Boston"},
  flavor: {
    good: ["GOAL!", "TOP SHELF!", "SNIPE!", "+1"],
    streak: "HAT TRICK!",
    bad: ["ICING!", "OFFSIDE!", "PENALTY!"],
    // lowest to highest: <40%, 40%+, 60%+, 80%+, perfect
    grades: ["Juniors", "Rookie", "Starter", "⭐ All-Star", "🏆 Hall of Fame"],
  },
  // Only the short forms CLAUDE.md allows: LA, NY, NYC, DC
  locAliases: {
    "Los Angeles": ["LA"], "New York": ["NY", "NYC"], "Washington": ["Washington DC", "DC"],
  },
  conferences: ["East", "West"],
  divisions: [
    {conf: "East", name: "Atlantic", teams: [
      {name: "Bruins", loc: "Boston", colors: [C("gold", "#FFB81C"), C("black", "#000000")]},
      {name: "Sabres", loc: "Buffalo", colors: [C("royal blue", "#003087"), C("gold", "#FFB81C")]},
      {name: "Red Wings", loc: "Detroit", colors: [C("red", "#CE1126"), C("white", "#FFFFFF")]},
      {name: "Panthers", loc: "Florida", colors: [C("navy", "#041E42"), C("red", "#C8102E"), C("tan", "#B9975B")]},
      {name: "Canadiens", loc: "Montréal", colors: [C("red", "#AF1E2D"), C("blue", "#192168")]},
      {name: "Senators", loc: "Ottawa", colors: [C("black", "#000000"), C("red", "#DA1A32"), C("gold", "#B79257")]},
      {name: "Lightning", loc: "Tampa Bay", colors: [C("blue", "#002868"), C("white", "#FFFFFF")]},
      {name: "Maple Leafs", loc: "Toronto", colors: [C("blue", "#00205B"), C("white", "#FFFFFF")]},
    ]},
    {conf: "East", name: "Metropolitan", teams: [
      {name: "Hurricanes", loc: "Carolina", colors: [C("red", "#CE1126"), C("black", "#000000")]},
      {name: "Blue Jackets", loc: "Columbus", colors: [C("navy", "#002654"), C("red", "#CE1126"), C("silver", "#A4A9AD")]},
      {name: "Devils", loc: "New Jersey", colors: [C("red", "#CE1126"), C("black", "#000000")]},
      {name: "Islanders", loc: "New York", colors: [C("blue", "#00539B"), C("orange", "#F47D30")]},
      {name: "Rangers", loc: "New York", colors: [C("blue", "#0038A8"), C("red", "#CE1126")]},
      {name: "Flyers", loc: "Philadelphia", colors: [C("orange", "#F74902"), C("black", "#000000")]},
      {name: "Penguins", loc: "Pittsburgh", colors: [C("black", "#000000"), C("yellow", "#FCB514")]},
      {name: "Capitals", loc: "Washington", colors: [C("navy", "#041E42"), C("red", "#C8102E")]},
    ]},
    {conf: "West", name: "Central", teams: [
      {name: "Blackhawks", loc: "Chicago", colors: [C("red", "#CF0A2C"), C("black", "#000000")]},
      {name: "Avalanche", loc: "Colorado", colors: [C("burgundy", "#6F263D"), C("blue", "#236192"), C("silver", "#A2AAAD")]},
      {name: "Stars", loc: "Dallas", colors: [C("green", "#006847"), C("silver", "#8F8F8C"), C("black", "#111111")]},
      {name: "Wild", loc: "Minnesota", colors: [C("green", "#154734"), C("red", "#A6192E"), C("gold", "#EAAA00")]},
      {name: "Predators", loc: "Nashville", colors: [C("gold", "#FFB81C"), C("navy", "#041E42")]},
      {name: "Blues", loc: "St. Louis", colors: [C("blue", "#002F87"), C("yellow", "#FCB514"), C("navy", "#041E42")]},
      {name: "Mammoth", loc: "Utah", colors: null},
      {name: "Jets", loc: "Winnipeg", colors: [C("navy", "#041E42"), C("blue", "#004C97")]},
    ]},
    {conf: "West", name: "Pacific", teams: [
      {name: "Ducks", loc: "Anaheim", colors: [C("orange", "#F47A38"), C("gold", "#B9975B"), C("black", "#000000")]},
      {name: "Flames", loc: "Calgary", colors: [C("red", "#D2001C"), C("yellow", "#FAAF19")]},
      {name: "Oilers", loc: "Edmonton", colors: [C("blue", "#041E42"), C("orange", "#FF4C00")]},
      {name: "Kings", loc: "Los Angeles", colors: [C("black", "#111111"), C("silver", "#A2AAAD")]},
      {name: "Sharks", loc: "San Jose", colors: [C("teal", "#006D75"), C("orange", "#EA7200"), C("black", "#000000")]},
      {name: "Kraken", loc: "Seattle", colors: [C("navy", "#001628"), C("ice blue", "#99D9D9"), C("red", "#E9072B")]},
      {name: "Canucks", loc: "Vancouver", colors: [C("blue", "#00205B"), C("green", "#00843D")]},
      {name: "Golden Knights", loc: "Vegas", colors: [C("gold", "#B4975A"), C("steel gray", "#333F42")]},
    ]},
  ],
};
})();
