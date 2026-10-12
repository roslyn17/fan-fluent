// Game modes. These are the same for every league.
const MODES = [
  {id:"c2n-mc", group:"nc", title:"City → Team", desc:"See the city, pick the team name", fmt:"Choose", ask:"city", ans:"name", type:"mc"},
  {id:"n2c-mc", group:"nc", title:"Team → City", desc:"See the team name, pick the city", fmt:"Choose", ask:"name", ans:"loc", type:"mc"},
  {id:"c2n-tx", group:"nc", title:"City → Team", desc:"See the city, type the team name", fmt:"Type", ask:"city", ans:"name", type:"text"},
  {id:"n2c-tx", group:"nc", title:"Team → City", desc:"See the team name, type the city", fmt:"Type", ask:"name", ans:"loc", type:"text"},
  {id:"t2col", group:"c", title:"Team → Colors", desc:"See the team, pick its colors", fmt:"Choose", ask:"team", ans:"colors", type:"mc"},
  {id:"col2t", group:"c", title:"Colors → Team", desc:"See the colors, pick the team", fmt:"Choose", ask:"colors", ans:"team", type:"mc"},
];
