const User = () => import("../views/user/User");
const Activitys = () => import("../views/Activitys");
const Download = () => import("../views/user/Download");
const About = () => import("../views/user/About");
const Dns = () => import("../views/user/Dns");
const Course = () => import("../views/user/Course");
const Course1 = () => import("../views/user/Course1");
const Course2 = () => import("../views/user/Course2");
const Technology = () => import("../views/user/Technology");
const SolveProblem = () => import("../views/technology/SolveProblem");
const ClearCache = () => import("../views/technology/ClearCache");
const ClearCacheIE = () => import("../views/technology/ClearCacheIE");
const ClearCacheAO = () => import("../views/technology/ClearCacheAO");
const ClearCacheHUO = () => import("../views/technology/ClearCacheHUO");
const SolveProblemGame = () => import("../views/technology/SolveProblemGame");
const SoftwareDownload = () => import("../views/technology/SoftwareDownload");
const ClearDNS = () => import("../views/technology/ClearDNS");
const RemoteSoftware = () => import("../views/technology/RemoteSoftware");
export default [
  {
    path: "/user",
    name: "user",
    component: User,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/activity",
    name: "ACTIVITYS",
    component: Activitys
  },
  {
    path: "/mobile",
    name: "MOBILE",
    component: Download
  },
  {
    path: "/about/:xcode?/:index?",
    name: "about",
    component: About
  },
  {
    path: "/dns",
    name: "dns",
    component: Dns
    // children: [{
    //   path: 'course',
    //   component: Course
    // },
    // ]
  },
  {
    path: "/dns/course",
    name: "course",
    component: Course
  },
  {
    path: "/dns/course1",
    name: "course1",
    component: Course1
  },
  {
    path: "/dns/course2",
    name: "course2",
    component: Course2
  },
  {
    path: "/technology",
    name: "technology",
    component: Technology
    // children: [{
    //     path: 'solveProblem',
    //     name: 'solveProblem',
    //     component: SolveProblem
    //   },
    // ]
  },
  {
    path: "/technology/solveProblem",
    name: "solveProblem",
    component: SolveProblem
  },
  {
    path: "/technology/clearCache",
    name: "clearCache",
    component: ClearCache
  },
  {
    path: "/technology/clearCacheIE",
    name: "clearCacheIE",
    component: ClearCacheIE
  },
  {
    path: "/technology/clearCacheAO",
    name: "clearCacheAO",
    component: ClearCacheAO
  },
  {
    path: "/technology/clearCacheHUO",
    name: "clearCacheHUO",
    component: ClearCacheHUO
  },
  {
    path: "/technology/solveProblemGame",
    name: "solveProblemGame",
    component: SolveProblemGame
  },
  {
    path: "/technology/softwareDownload",
    name: "softwareDownload",
    component: SoftwareDownload
  },
  {
    path: "/technology/clearDNS",
    name: "clearDNS",
    component: ClearDNS
  },
  {
    path: "/technology/remoteSoftware",
    name: "remoteSoftware",
    component: RemoteSoftware
  }
];
