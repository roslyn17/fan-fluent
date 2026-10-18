// NFL data. Names, locations and conferences per NFL.com (https://www.nfl.com/teams/).
// Colors per TeamColorCodes.com (https://teamcolorcodes.com/nfl-team-color-codes/), primary colors only.
// Deliberate exceptions: Colts are blue and white, Jets are green and white (what fans recognize).
(function(){
const C = (name, hex) => ({name, hex});
(window.LEAGUES = window.LEAGUES || {}).nfl = {
  id: "nfl",
  label: "NFL",
  sport: "Football",
  emoji: "🏈",
  surface: "field", // background and progress-bar theme (see css/styles.css)
  credits: "Team names, locations and conferences per NFL.com. Colors per TeamColorCodes.com (primary colors only).",
  disclaimer: "Not affiliated with or endorsed by the NFL or any of its teams.",
  // localStorage keys from the original single-league prototype, kept so saved progress carries over
  storage: {misses: "gf-misses", pool: "gf-pool"},
  examples: {name: "Packers", loc: "Green Bay"},
  flavor: {
    good: ["TOUCHDOWN!", "FIRST DOWN!", "NICE CATCH!", "+1"],
    streak: "ON FIRE!",
    bad: ["🚩 FLAG!", "INCOMPLETE", "FUMBLE!"],
    missIcon: "🚩", // starts the "Not quite" message after a wrong answer
    // lowest to highest: <40%, 40%+, 60%+, 80%+, perfect
    grades: ["Practice Squad", "Rookie", "Starter", "⭐ All-Pro", "🏆 Hall of Fame"],
  },
  // Official short forms only (periods and commas ignored, so "L.A." also works)
  locAliases: {
    "Los Angeles": ["LA"], "New York": ["NY", "NYC"], "Kansas City": ["KC"], "San Francisco": ["SF"],
    "Washington": ["Washington DC", "DC"], "Las Vegas": ["Vegas"],
  },
  conferences: ["AFC", "NFC"],
  confNames: {AFC: "American Football Conference", NFC: "National Football Conference"},
  divisions: [
    {conf: "AFC", name: "AFC East", teams: [
      {name: "Bills", loc: "Buffalo", colors: [C("blue", "#00338D"), C("red", "#C60C30")]},
      {name: "Dolphins", loc: "Miami", colors: [C("aqua", "#008E97"), C("orange", "#FC4C02")]},
      {name: "Patriots", loc: "New England", colors: [C("navy", "#002244"), C("red", "#C60C30"), C("silver", "#B0B7BC")]},
      {name: "Jets", loc: "New York", colors: [C("green", "#125740"), C("white", "#FFFFFF")]},
    ]},
    {conf: "AFC", name: "AFC North", teams: [
      {name: "Ravens", loc: "Baltimore", colors: [C("purple", "#241773"), C("black", "#000000"), C("gold", "#9E7C0C")]},
      {name: "Bengals", loc: "Cincinnati", colors: [C("orange", "#FB4F14"), C("black", "#000000")]},
      {name: "Browns", loc: "Cleveland", colors: [C("brown", "#311D00"), C("orange", "#FF3C00")]},
      {name: "Steelers", loc: "Pittsburgh", colors: [C("gold", "#FFB612"), C("black", "#101820")]},
    ]},
    {conf: "AFC", name: "AFC South", teams: [
      {name: "Texans", loc: "Houston", colors: [C("navy", "#03202F"), C("red", "#A71930")]},
      {name: "Colts", loc: "Indianapolis", colors: [C("blue", "#002C5F"), C("white", "#FFFFFF")]},
      {name: "Jaguars", loc: "Jacksonville", colors: [C("teal", "#006778"), C("black", "#101820"), C("gold", "#D7A22A")]},
      {name: "Titans", loc: "Tennessee", colors: [C("navy", "#0C2340"), C("light blue", "#4B92DB"), C("red", "#C8102E")]},
    ]},
    {conf: "AFC", name: "AFC West", teams: [
      {name: "Broncos", loc: "Denver", colors: [C("orange", "#FB4F14"), C("navy", "#002244")]},
      {name: "Chiefs", loc: "Kansas City", colors: [C("red", "#E31837"), C("gold", "#FFB81C")]},
      {name: "Raiders", loc: "Las Vegas", colors: [C("silver", "#A5ACAF"), C("black", "#000000")]},
      {name: "Chargers", loc: "Los Angeles", colors: [C("powder blue", "#0080C6"), C("gold", "#FFC20E")]},
    ]},
    {conf: "NFC", name: "NFC East", teams: [
      {name: "Cowboys", loc: "Dallas", colors: [C("blue", "#003594"), C("silver", "#869397")]},
      {name: "Giants", loc: "New York", colors: [C("blue", "#0B2265"), C("red", "#A71930")]},
      {name: "Eagles", loc: "Philadelphia", colors: [C("midnight green", "#004C54"), C("silver", "#A5ACAF")]},
      {name: "Commanders", loc: "Washington", colors: [C("burgundy", "#5A1414"), C("gold", "#FFB612")]},
    ]},
    {conf: "NFC", name: "NFC North", teams: [
      {name: "Bears", loc: "Chicago", colors: [C("navy", "#0B162A"), C("orange", "#C83803")]},
      {name: "Lions", loc: "Detroit", colors: [C("Honolulu blue", "#0076B6"), C("silver", "#B0B7BC")]},
      {name: "Packers", loc: "Green Bay", colors: [C("green", "#203731"), C("gold", "#FFB612")]},
      {name: "Vikings", loc: "Minnesota", colors: [C("purple", "#4F2683"), C("gold", "#FFC62F")]},
    ]},
    {conf: "NFC", name: "NFC South", teams: [
      {name: "Falcons", loc: "Atlanta", colors: [C("red", "#A71930"), C("black", "#000000")]},
      {name: "Panthers", loc: "Carolina", colors: [C("blue", "#0085CA"), C("black", "#101820")]},
      {name: "Saints", loc: "New Orleans", colors: [C("gold", "#D3BC8D"), C("black", "#101820")]},
      {name: "Buccaneers", loc: "Tampa Bay", colors: [C("red", "#D50A0A"), C("pewter", "#34302B")]},
    ]},
    {conf: "NFC", name: "NFC West", teams: [
      {name: "Cardinals", loc: "Arizona", colors: [C("red", "#97233F"), C("black", "#000000")]},
      {name: "Rams", loc: "Los Angeles", colors: [C("blue", "#003594"), C("yellow", "#FFD100")]},
      {name: "49ers", loc: "San Francisco", colors: [C("red", "#AA0000"), C("gold", "#B3995D")]},
      {name: "Seahawks", loc: "Seattle", colors: [C("navy", "#002244"), C("green", "#69BE28"), C("gray", "#A5ACAF")]},
    ]},
  ],
};
})();
