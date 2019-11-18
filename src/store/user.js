import {
  rechargeApply,
  bindingBefore,
  getMyBank,
  userDetail,
  checkLogin,
  rechargeBefore,
  help
} from "../api";
import fa from "element-ui/src/locale/lang/fa";

const user = {
  state: {
    userInfo: "", //用户详情
    // twoErrors: 0, //登录连续500报错两次
    order: "", //充值准备
    bindingList: "", //绑卡准备
    myBank: "", //我的银行卡
    rechargeList: [], //充值列表
    bankId: "", // 提现银行卡ID
    help: "", //帮助列表
    active: "", //个人中心选中tab
    redPackShowFlag: 1, //红包是否显示
    washCodeRateArr: [], //洗码比例分类
    registerBeforeList: "", //注册准备数据
    registerSuccess: false,
    password: "",
    loginShow: "",
    transferInShow: 0,
    transferOutShow: 0
  },
  getters: {
    userInfo: state => {
      return state.userInfo;
    },
    password: state => {
      return state.password;
    },
    registerSuccess: state => {
      return state.registerSuccess;
    },
    loginShow: state => {
      return state.loginShow;
    },
    order: state => {
      return state.order;
    },
    bindingList: state => {
      return state.bindingList;
    },
    myBank: state => {
      return state.myBank;
    },
    rechargeList: state => {
      return state.rechargeList;
    },
    bankId: state => {
      return state.bankId;
    },
    help: state => {
      return state.help;
    },
    active: state => {
      return state.active;
    },
    redPackShowFlag: state => {
      return state.redPackShowFlag;
    },
    washCodeRateArr: state => {
      return state.washCodeRateArr;
    },
    registerBeforeList: state => {
      return state.registerBeforeList;
    },
    transferInShow: state => {
      return state.transferInShow;
    },
    transferOutShow: state => {
      return state.transferOutShow;
    }
  },
  mutations: {
    SET_USER_INFO: (state, payload) => {
      state.userInfo = payload;
    },
    SET_RED_PACK_SHOW: (state, payload) => {
      state.redPackShowFlag = payload;
    },
    SET_REGISTER_SUCCESS: (state, payload) => {
      state.registerSuccess = payload;
    },
    SET_PASSWORD: (state, payload) => {
      state.password = payload;
    },
    SET_LOGIN_SHOW: (state, payload) => {
      state.loginShow = payload;
    },
    ORDERS: (state, payload) => {
      state.order = payload;
    },
    SET_BANK_BEFORE: (state, payload) => {
      state.bindingList = payload;
    },
    SET_MY_BANK: (state, payload) => {
      state.myBank = payload;
    },
    SET_RECHARGE_LIST: (state, payload) => {
      state.rechargeList = payload;
    },
    SET_BANK_ID: (state, payload) => {
      state.bankId = payload;
    },
    SET_HELP_LIST: (state, payload) => {
      state.help = payload;
    },
    SET_ACTIVE_NAME: (state, payload) => {
      state.active = payload;
    },
    SET_WASH_CODE_ARR: (state, payload) => {
      state.washCodeRateArr = payload;
    },
    SET_REGISTER_BEFORE_LIST: (state, payload) => {
      state.registerBeforeList = payload;
    },
    SET_TRANSFER_IN_SHOW: (state, payload) => {
      state.transferInShow = payload;
    },
    SET_TRANSFER_OUT_SHOW: (state, payload) => {
      state.transferOutShow = payload;
    }
  },
  actions: {
    userDetails({ commit }) {
      userDetail()
        .then(res => {
          // console.log(typeof res, res, "userDetails数据----------------------");
          if (typeof res === "string") {
            return false;
          }
          if (res.status) {
            commit("SET_USER_INFO", res.data);
          } else {
            commit("SET_USER_INFO", "");
          }
        })
        .catch(e => {
          console.log(e, "eeeeeeeeee");
        });
    },
    checkLogins({ commit }) {
      checkLogin().then(res => {
        if (typeof res === "string") {
          return false;
        }
        if (res.status) {
          commit("SET_USER_INFO", res.data);
        } else {
          commit("SET_USER_INFO", "");
        }
      });
    },
    rechargeApplys(context, { id }) {
      context.commit("CHANGE_LOADING", 1);
      rechargeApply({ methodId: id }).then(res => {
        try {
          // console.log(res.data, "充值申请记录");
          context.commit("CHANGE_LOADING", 0);
          context.commit("ORDERS", res.data);
        } catch (e) {
          console.log(e);
        }
      });
    },
    bindingBefores({ commit }) {
      bindingBefore().then(res => {
        console.log(res, "绑卡准备");
        commit("SET_BANK_BEFORE", res.data);
      });
    },
    myBanks({ commit }) {
      commit("CHANGE_LOADING", 1);
      getMyBank().then(res => {
        console.log(res, "我的银行卡");
        commit("CHANGE_LOADING", 0);
        commit("SET_MY_BANK", res.data);
        if (res.data && res.data.length) {
          if (localStorage.getItem("bankId")) {
            commit("SET_BANK_ID", localStorage.getItem("bankId"));
          } else {
            commit("SET_BANK_ID", res.data[0].id);
          }
        }
      });
    },
    rechargeBefores(connext) {
      connext.commit("CHANGE_LOADING", 1);
      rechargeBefore().then(res => {
        connext.commit("CHANGE_LOADING", 0);
        connext.commit("SET_RECHARGE_LIST", res.data);
      });
    },
    helps(connext) {
      connext.commit("CHANGE_LOADING", 1);
      help().then(res => {
        connext.commit("CHANGE_LOADING", 0);
        connext.commit("SET_HELP_LIST", res.data);
      });
    }
    // getWashCodeRateList({ commit }) {
    //   washCodeRateList().then(res => {
    //     if (res.status) {
    //       commit("SET_WASH_CODE_ARR", res.data);
    //     }
    //   });
    // }
  }
};
export default user;
