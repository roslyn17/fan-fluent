// Team data and game modes (NFL). Loaded before app.js.
const C = (name, hex) => ({name, hex});
const TEAMS = [
  // AFC East
  {name:"Bills", loc:"Buffalo", div:"AFC East", colors:[C("blue","#00338D"),C("red","#C60C30")]},
  {name:"Dolphins", loc:"Miami", div:"AFC East", colors:[C("aqua","#008E97"),C("orange","#FC4C02")], nick:["fins"]},
  {name:"Patriots", loc:"New England", div:"AFC East", colors:[C("navy","#002244"),C("red","#C60C30"),C("silver","#B0B7BC")], nick:["pats"]},
  {name:"Jets", loc:"New York", div:"AFC East", colors:[C("green","#125740"),C("white","#FFFFFF")]},
  // AFC North
  {name:"Ravens", loc:"Baltimore", div:"AFC North", colors:[C("purple","#241773"),C("black","#000000"),C("gold","#9E7C0C")]},
  {name:"Bengals", loc:"Cincinnati", div:"AFC North", colors:[C("orange","#FB4F14"),C("black","#000000")]},
  {name:"Browns", loc:"Cleveland", div:"AFC North", colors:[C("brown","#311D00"),C("orange","#FF3C00")]},
  {name:"Steelers", loc:"Pittsburgh", div:"AFC North", colors:[C("gold","#FFB612"),C("black","#101820")]},
  // AFC South
  {name:"Texans", loc:"Houston", div:"AFC South", colors:[C("navy","#03202F"),C("red","#A71930")]},
  {name:"Colts", loc:"Indianapolis", div:"AFC South", colors:[C("blue","#002C5F"),C("white","#FFFFFF")]},
  {name:"Jaguars", loc:"Jacksonville", div:"AFC South", colors:[C("teal","#006778"),C("black","#101820"),C("gold","#D7A22A")], nick:["jags"]},
  {name:"Titans", loc:"Tennessee", div:"AFC South", colors:[C("navy","#0C2340"),C("light blue","#4B92DB"),C("red","#C8102E")]},
  // AFC West
  {name:"Broncos", loc:"Denver", div:"AFC West", colors:[C("orange","#FB4F14"),C("navy","#002244")]},
  {name:"Chiefs", loc:"Kansas City", div:"AFC West", colors:[C("red","#E31837"),C("gold","#FFB81C")]},
  {name:"Raiders", loc:"Las Vegas", div:"AFC West", colors:[C("silver","#A5ACAF"),C("black","#000000")]},
  {name:"Chargers", loc:"Los Angeles", div:"AFC West", colors:[C("powder blue","#0080C6"),C("gold","#FFC20E")], nick:["bolts"]},
  // NFC East
  {name:"Cowboys", loc:"Dallas", div:"NFC East", colors:[C("blue","#003594"),C("silver","#869397")]},
  {name:"Giants", loc:"New York", div:"NFC East", colors:[C("blue","#0B2265"),C("red","#A71930")]},
  {name:"Eagles", loc:"Philadelphia", div:"NFC East", colors:[C("midnight green","#004C54"),C("silver","#A5ACAF")]},
  {name:"Commanders", loc:"Washington", div:"NFC East", colors:[C("burgundy","#5A1414"),C("gold","#FFB612")]},
  // NFC North
  {name:"Bears", loc:"Chicago", div:"NFC North", colors:[C("navy","#0B162A"),C("orange","#C83803")]},
  {name:"Lions", loc:"Detroit", div:"NFC North", colors:[C("Honolulu blue","#0076B6"),C("silver","#B0B7BC")]},
  {name:"Packers", loc:"Green Bay", div:"NFC North", colors:[C("green","#203731"),C("gold","#FFB612")], nick:["pack"]},
  {name:"Vikings", loc:"Minnesota", div:"NFC North", colors:[C("purple","#4F2683"),C("gold","#FFC62F")], nick:["vikes"]},
  // NFC South
  {name:"Falcons", loc:"Atlanta", div:"NFC South", colors:[C("red","#A71930"),C("black","#000000")]},
  {name:"Panthers", loc:"Carolina", div:"NFC South", colors:[C("blue","#0085CA"),C("black","#101820")]},
  {name:"Saints", loc:"New Orleans", div:"NFC South", colors:[C("gold","#D3BC8D"),C("black","#101820")]},
  {name:"Buccaneers", loc:"Tampa Bay", div:"NFC South", colors:[C("red","#D50A0A"),C("pewter","#34302B")], nick:["bucs"]},
  // NFC West
  {name:"Cardinals", loc:"Arizona", div:"NFC West", colors:[C("red","#97233F"),C("black","#000000")]},
  {name:"Rams", loc:"Los Angeles", div:"NFC West", colors:[C("blue","#003594"),C("yellow","#FFD100")]},
  {name:"49ers", loc:"San Francisco", div:"NFC West", colors:[C("red","#AA0000"),C("gold","#B3995D")], nick:["niners","fortyniners"]},
  {name:"Seahawks", loc:"Seattle", div:"NFC West", colors:[C("navy","#002244"),C("green","#69BE28"),C("gray","#A5ACAF")], nick:["hawks"]},
];
// Official short forms only (periods ignored, so "L.A." also works)
const LOC_ALIASES = {
  "Los Angeles":["LA"], "New York":["NY","NYC"], "Kansas City":["KC"], "San Francisco":["SF"],
  "Washington":["Washington DC","DC"]
};
const exact = s => s.toLowerCase().replace(/[.,]/g,"").replace(/\s+/g," ").trim();

const MODES = [
  {id:"c2n-mc", group:"nc", title:"City → Team", desc:"See the city, pick the team name", fmt:"Choose", ask:"city", ans:"name", type:"mc"},
  {id:"n2c-mc", group:"nc", title:"Team → City", desc:"See the team name, pick the city", fmt:"Choose", ask:"name", ans:"loc", type:"mc"},
  {id:"c2n-tx", group:"nc", title:"City → Team", desc:"See the city, type the team name", fmt:"Type", ask:"city", ans:"name", type:"text"},
  {id:"n2c-tx", group:"nc", title:"Team → City", desc:"See the team name, type the city", fmt:"Type", ask:"name", ans:"loc", type:"text"},
  {id:"t2col", group:"c", title:"Team → Colors", desc:"See the team, pick its colors", fmt:"Choose", ask:"team", ans:"colors", type:"mc"},
  {id:"col2t", group:"c", title:"Colors → Team", desc:"See the colors, pick the team", fmt:"Choose", ask:"colors", ans:"team", type:"mc"},
];
