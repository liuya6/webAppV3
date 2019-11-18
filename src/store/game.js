import {
  navigation,
  hallType,
  serchGame,
  lotteryHall,
  getGroupList,
  thirdGameList,
  thirdListRecord
} from "../api";
import { message } from "element-ui";
const game = {
  state: {
    navigationList: [], //导航栏和footer数据【棋牌，真人,电子】
    currentGame: [], //当前游戏分类
    gameList: [], //当前游戏列表
    fishList: [], //捕鱼游戏列表
    homeToSlots: [], //首页跳彩票
    homeToPoker: [], //首页跳棋牌
    homeToPerson: [], //首页跳真人
    homeToPerson0: "", //默认真人
    homeToSports: [], //体育页面刷新
    homeToEsports: [], //电竞页面刷新
    LotterygameList: [], //当前彩票游戏列表
    total: 0, //当前游戏总数
    title: "", //当前游戏标题
    loading: 0, //是否显示loading
    third_Game_Lists: [], //第三方游戏列表(额度转换)
    gameRecordList: "", //第三方游戏TAB(游戏记录)
    gameUrl: "" //游戏url
  },

  getters: {
    navigationList: state => {
      return state.navigationList;
    },
    currentGame: state => {
      return state.currentGame;
    },
    homeToSlots: state => {
      return state.homeToSlots;
    },
    homeToPoker: state => {
      return state.homeToPoker;
    },
    homeToPerson: state => {
      return state.homeToPerson;
    },
    homeToPerson0: state => {
      return state.homeToPerson0;
    },
    homeToSports: state => {
      return state.homeToSports;
    },
    homeToEsports: state => {
      return state.homeToEsports;
    },
    gameList: state => {
      return state.gameList;
    },
    fishList: state => {
      return state.fishList;
    },
    LotterygameList: state => {
      return state.LotterygameList;
    },
    total: state => {
      return state.total;
    },
    title: state => {
      return state.title;
    },
    loading: state => {
      return state.loading;
    },
    third_Game_Lists: state => {
      return state.third_Game_Lists;
    },
    gameRecordList: state => {
      return state.gameRecordList;
    },
    gameUrl: state => {
      return state.gameUrl;
    },
    recordThirdGameLists: state => {
      return state.recordThirdGameLists;
    }
  },

  mutations: {
    SET_NAV_LIST: (state, payload) => {
      state.navigationList = payload;
      console.log(payload, "payloadpayload");
      payload.navigation.forEach(e => {
        let l = e.list;
        let c = e.classify;
        // console.log(c, "ccccccccccccccccc");
        if (c == "DZ") {
          state.homeToSlots = l;
        } else if (c == "SX") {
          state.homeToPerson = l;
          state.homeToPerson0 = l[0].typeKey;
        } else if (c == "QP") {
          state.homeToPoker = l;
        } else if (c == "TY") {
          state.homeToSports = l;
        } else if (c == "DJ") {
          state.homeToEsports = l;
        }
      });
    },
    SET_CURRENT_GAME: (state, payload) => {
      // console.log(payload, "具体游戏分类");
      state.currentGame = payload;
      if (payload.length) {
        state.title = payload[0].title;
      }
    },
    SET_GAME_LIST: (state, payload) => {
      state.gameList = payload.list;
      state.total = payload.total;
    },
    SET_GAME_LIST_BY: (state, payload) => {
      state.fishList = payload;
    },
    SET_GAME_LIST_LOTTERY: (state, payload) => {
      state.LotterygameList = payload;
    },
    CHANGE_TITLE: (state, payload) => {
      state.title = payload;
    },
    CHANGE_LOADING: (state, payload) => {
      state.loading = payload;
    },
    SET_THIRD_GAME_LIST: (state, payload) => {
      state.third_Game_Lists = payload;
    },
    SET_GAME_RECORD_LIST: (state, payload) => {
      // console.log(payload, "store,游戏记录列表");
      state.gameRecordList = payload;
    },
    SET_GAME_URL: (state, payload) => {
      state.gameUrl = payload;
    }
  },

  actions: {
    navigations(context) {
      navigation().then(res => {
        if (res.status) {
          // console.log(res.data, "SET_NAV_LIST=============================");
          context.commit("SET_NAV_LIST", res.data);
        }
      });
    },
    hallTypes({ commit }, payload) {
      commit("CHANGE_LOADING", 1);
      hallType(payload).then(res => {
        // console.log(res.data, "当前游戏列表");
        commit("CHANGE_LOADING", 0);
        commit("SET_GAME_LIST", res.data);
      });
    },
    getGroupLists({ commit }, payload) {
      getGroupList(payload).then(res => {
        // console.log(res.data, "当前游戏列表");
        commit("CHANGE_LOADING", 0);
        commit("SET_GAME_LIST_BY", res.data);
      });
    },
    serchGames(context, payload) {
      serchGame(payload).then(res => {
        // console.log(payload, res);
        context.commit("CHANGE_LOADING", 0);
        if (res.status) {
          context.commit("SET_GAME_LIST", res.data);
        } else {
          return message({
            type: "error",
            showClose: true,
            message: "暂无游戏记录"
          });
        }
      });
    },
    lotteryHalls({ commit }, payload) {
      lotteryHall(payload).then(res => {
        // console.log(res.data, "吉祥游戏列表");
        commit("CHANGE_LOADING", 0);
        commit("SET_GAME_LIST_LOTTERY", res.data);
      });
    },
    thirdGameLists(context) {
      thirdGameList().then(res => {
        context.commit("SET_THIRD_GAME_LIST", res.data);
      });
    },
    recordGameList(context) {
      thirdListRecord().then(res => {
        // console.log(res, "游戏记录头部-------------------------------------");
        context.commit("SET_GAME_RECORD_LIST", res.data);
      });
    }
  }
};

export default game;
