// import Vue from "vue";
// import Vuex from "vuex";
// Vue.use(Vuex);
let Vuex = window.Vuex;
import createMutationsSharer from "vuex-shared-mutations";

import User from "./user";
import Game from "./game";
import Home from "./home";
import System from "./system";

const handleStore = store => {
  // console.log(store, "storestore");
  let storage = window.sessionStorage;
  if (!storage) {
    return console.warn("当前浏览器不支持sessionStorage!");
  }
  /* 初始化store */
  // if (sessionStorage.store) {
  //   let state = JSON.parse(sessionStorage.store);
  //   store.replaceState(state);
  // }
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    if (sessionStorage.getItem("nowUserAgent") == "PC") {
      sessionStorage.setItem("nowUserAgent", "移动");
    }
  } else {
    if (sessionStorage.getItem("nowUserAgent") == "移动") {
      sessionStorage.setItem("nowUserAgent", "PC");
    }
  }

  /* 在每个 action 完成后调用 */
  // store.subscribeAction((action, state) => {
  //   console.log(state)
  //   console.log('vuex-subscribeAction=>', action.type, action.payload)
  // })

  /* 在每个 mutation 完成后调用 */
  store.subscribe((mutation, state) => {
    // console.log('vuex-mutation=>', mutation.type, mutation.payload)
    sessionStorage.setItem("store", JSON.stringify(state));
  });
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    User,
    Game,
    Home,
    System
  },
  plugins: [
    handleStore,
    createMutationsSharer({
      predicate: mutation => {
        // console.log(state, "vuex-shared-mutations");
        const predicate = ["SET_USER_INFO"];
        return predicate.indexOf(mutation.type) >= 0;
      }
    })
  ]
});
