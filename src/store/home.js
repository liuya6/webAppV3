import { settings, jackpot } from "../api";

const Home = {
  state: {
    jackpotNum: {
      jackpot: ""
    }, //老虎机奖池
    playStartShow: false, // 开始游戏准备窗口
    closeService: false
  },
  getters: {
    jackpotNum: state => {
      // console.log(state, state.jackpotNum, 'state.jackpotNum');
      return state.jackpotNum;
    },
    playStartShow: state => {
      return state.playStartShow;
    },
    closeService: state => {
      return state.closeService;
    }
  },
  mutations: {
    SET_JACKPOT: (state, payload) => {
      // console.log(state, payload, 'payload');
      state.jackpotNum = payload;
    },
    SET_PLAY_START_SHOW: (state, payload) => {
      state.playStartShow = payload;
    },
    RETRACT_SERVICE: (state, payload) => {
      console.log(state, payload, "payload");
      state.closeService = payload;
    }
  },
  actions: {
    jackpots(context) {
      jackpot().then(res => {
        // console.log(res.data, 'SET_JACKPOT');
        if (res.status) {
          context.commit("SET_JACKPOT", res.data);
        }
      });
    }
  }
};
export default Home;
