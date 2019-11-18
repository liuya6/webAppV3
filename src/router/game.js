const Chess = () => import("../views/game/Chess");
const Electronic = () => import("../views/game/Electronic");
const RealPerson = () => import("../views/game/RealPerson");
// const StartHall = () => import("../views/game/StartHall");
const Esports = () => import("../views/game/Esports");
const Fishing = () => import("../views/game/Fishing");
const Lottery = () => import("../views/game/Lottery");
const Sports = () => import("../views/game/Sports");

export default [
  {
    path: "/chess/:typeKey?",
    name: "CHESS",
    component: Chess
  },
  {
    path: "/arcade/:typeKey?",
    name: "SLOTS",
    component: Electronic
  },
  {
    path: "/live",
    name: "CASINO",
    component: RealPerson
  },
  // {
  //   path: "/playing",
  //   name: "playing",
  //   component: StartHall
  // },
  {
    path: "/esports",
    name: "GAMING",
    component: Esports
  },
  {
    path: "/fishing",
    name: "FISHING",
    component: Fishing
  },
  {
    path: "/lottery/:typeKey?",
    name: "LOTTERY",
    component: Lottery
  },
  {
    path: "/sports",
    name: "SPORTS",
    component: Sports
  }
];
