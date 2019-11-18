import { settings } from "../api";

const Home = {
  state: {
    downloadText: "",
    allConfig: {},
    staticZhpUrl: ""
  },
  getters: {
    allConfig: state => {
      return state.allConfig;
    },
    staticZhpUrl: state => {
      return state.staticZhpUrl;
    },
    downloadText: state => {
      return state.downloadText;
    }
  },
  mutations: {
    SET_TEXT: (state, payload) => {
      state.downloadText = payload;
    },
    SET_SETTING: (state, payload) => {
      console.log(payload, "allConfig");
      state.allConfig = payload;
      state.staticZhpUrl = payload.staticZhpUrl;
    }
  },
  actions: {
    getSettings(context) {
      settings().then(res => {
        if (res.status) {
          let downloadText = "选择" + res.data.webName;
          context.commit("SET_SETTING", res.data);
          context.commit("SET_TEXT", downloadText);
        }
      });
    }
  }
};
export default Home;
