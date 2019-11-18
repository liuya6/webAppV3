// import Vue from "vue";
// import Router from "vue-router";
// Vue.use(Router);
let Router = window.VueRouter;
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
import User from "./user";
import Game from "./game";

const Home = () => import("../views/Home");

const router = new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    ...User,
    ...Game,
    {
      path: "/:xcode?",
      name: "HOME",
      component: Home,
      meta: {
        DocumentTitle: "首页",
        keepAlive: true
      }
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  let userInfo = router.app.$options.store.getters.userInfo;
  if (to.meta.requiresAuth) {
    if (!userInfo) {
      router.app.cancel();
      return next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  }
  router.app.cancel();
  return next();
});
router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router;
