// import Vue from "vue";
const Vue = window.Vue;
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./style/index.scss";
import { exchangeAllToLottery } from "./api";

//银行卡复制模块
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);
//cookies
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
//全局组件
import Top from "./components/common/Top";
import Header from "./components/common/Header";
import Foot from "./components/common/Footer";
import Kefu from "./components/common/Kefu";
import Timer from "./components/common/Timer";
import activityTimer from "./components/common/activityTimer";
import PlayStart from "./components/common/playStart";
import Login from "./views/user/LoginRegister";
import User from "./views/user/User";
import QuestionMenu from "./components/common/QuestionMenu";
import RedPack from "./components/common/RedPack";
import QrCode from "./components/common/QrCode";
Vue.component("my-login", Login);
Vue.component("my-kefu", Kefu);
Vue.component("my-Timer", Timer);
Vue.component("activityTimer", activityTimer);
Vue.component("my-playStart", PlayStart);
Vue.component("my-header", Header);
Vue.component("my-top", Top);
Vue.component("my-foot", Foot);
Vue.component("my-user", User);
Vue.component("QuestionMenu", QuestionMenu);
Vue.component("my-redPack", RedPack);
Vue.component("my-QrCode", QrCode);
// 二维码---
import VueQr from "vue-qr";
Vue.component("vue-qr", VueQr);
//element
import {
  Carousel,
  CarouselItem,
  DatePicker,
  Select,
  Option,
  Input,
  Message,
  Pagination,
  Notification,
  MessageBox,
  Loading,
  Steps,
  Step,
  Icon,
  Cascader,
  TimePicker,
  Tabs,
  TabPane,
  Radio,
  Collapse,
  CollapseItem,
  Tooltip,
  Checkbox,
  CheckboxGroup
} from "element-ui";
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Loading.directive);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Icon);
Vue.use(Cascader);
Vue.use(TimePicker);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Radio);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Tooltip);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;

Vue.prototype.cancel = function() {
  // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  let cancelArr = window.axiosCancel;
  // console.log(cancelArr, "delete");
  cancelArr.forEach((ele, index) => {
    // console.log(ele, index, "delete");
    ele.cancel("取消了请求"); // 在失败函数中返回这里自定义的错误信息
    delete window.axiosCancel[index];
  });
};

//解析时间戳
Vue.prototype.timestampToString = function(timestamp = +new Date()) {
  if (timestamp) {
    let time = new Date(timestamp * 1000);
    let y = time.getFullYear();
    let M = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    M = M < 10 ? "0" + M : M;
    d = d < 10 ? "0" + d : d;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
  } else {
    return "";
  }
};
Vue.prototype.$_eval = function(fn) {
  return new Function("return" + fn)();
};

Vue.prototype.playGame = function(url) {
  if (!this.$store.getters.userInfo) {
    return this.$message.error({
      message: "请登录后开始游戏",
      duration: 1000,
      showClose: true,
      center: true
    });
  }
  if (this.$store.getters.userInfo.parentId == 312) {
    return this.$message.error({
      message: "试玩账号无法进入",
      showClose: true,
      center: true
    });
  }
  const loading = this.$loading({
    lock: true,
    text: "拼命加载中...",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.8)"
  });
  exchangeAllToLottery().then(() => {
    loading.close();
    // console.log(res, "exchangeAllToLottery");
    this.$store.dispatch("userDetails");
    this.$store.commit("SET_PLAY_START_SHOW", true);
    this.$store.commit("SET_GAME_URL", url);
  });
};

Vue.prototype.winOpen = function(url) {
  this.$store.commit("SET_PLAY_START_SHOW", false);
  let w = window.screen.width * 0.99;
  let h = window.screen.height * 0.85;
  var temp =
    "menubar=no,toolbar=no,directories=no,scrollbars=yes,resizable=no,location=no";
  window.open(
    url,
    "",
    temp + ", height=" + h + ", width=" + w + ", top=20, left=10"
  );
};

Vue.filter("timeRun", function(timeVal) {
  if (timeVal > 0) {
    let house =
      parseInt(timeVal / 60 / 60) >= 10
        ? parseInt(timeVal / 60 / 60)
        : "0" + parseInt(timeVal / 60 / 60);
    let mins =
      parseInt((timeVal / 60) % 60) >= 10
        ? parseInt((timeVal / 60) % 60)
        : "0" + parseInt((timeVal / 60) % 60);
    let sec = timeVal % 60 >= 10 ? timeVal % 60 : "0" + (timeVal % 60);
    return house + ":" + mins + ":" + sec;
  } else {
    return "开奖中...";
  }
});

Vue.filter("activityTime", function(timeVal) {
  if (timeVal > 0) {
    let getHour = parseInt(timeVal / 60 / 60);
    let day =
      parseInt(getHour / 24) == 0 ? "" : parseInt(getHour / 24) + " 天 ";
    let hour = getHour % 24 >= 10 ? getHour % 24 : "0" + (getHour % 24);
    let mins =
      parseInt((timeVal / 60) % 60) >= 10
        ? parseInt((timeVal / 60) % 60)
        : "0" + parseInt((timeVal / 60) % 60);
    let sec = timeVal % 60 >= 10 ? timeVal % 60 : "0" + (timeVal % 60);
    return day + hour + " 时 " + mins + " 分 " + sec + " 秒";
  }
});

Vue.prototype.reCharge = function(url) {
  if (!this.$store.getters.userInfo) {
    return this.$message.error({
      message: "请登录后进行充值",
      showClose: true,
      duration: 1000,
      center: true
    });
  }
  window.open(url);
};

// 银行卡
Vue.prototype.bankNum = function(card) {
  try {
    return card
      .replace(/\s/g, "")
      .replace(/(\d{4})\d+(\d{4})$/, "$1 **** **** $2");
  } catch (e) {
    console.log(e);
  }
};

Vue.prototype.toNum = function(data) {
  if (data === "") {
    return undefined;
  }
  return data * 1;
};

Vue.prototype.toFixeds = function(data, fixNum = 2) {
  if (data === "") {
    return undefined;
  }
  return (data * 1).toFixed(fixNum * 1);
};

Vue.prototype.commonImg = function(type) {
  if (this.$store.getters.allConfig.length) {
    return `${this.$store.getters.allConfig.staticZhpUrl}${type}`;
  } else {
    return `https://mnlph.com/images/zhp/web/${type}`;
  }
};
Vue.prototype.commonImgs = function(type) {
  return `${this.$store.getters.allConfig.staticUrl}${type}`;
};
Vue.prototype.commonUrl = function() {
  return this.$store.getters.allConfig.staticZhpUrl;
};

Vue.directive("title", {
  // 指令的定义
  inserted: function(el, binding) {
    let routerName = router.history.current.name;
    if (routerName === "HOME") {
      document.title =
        router.app.$options.store.getters.allConfig.webName || "";
      return;
    }
    if (!router.currentRoute.meta.keepAlive) {
      let titles = router.app.$options.store.getters.allConfig.webName || "";
      if (titles) {
        if (binding.value !== "") {
          titles = binding.value + " - " + titles;
        }
        document.title = titles;
      } else {
        document.title = binding.value;
        setTimeout(() => {
          titles = router.app.$options.store.getters.allConfig.webName || "";
          if (binding.value !== "") {
            titles = binding.value + " - " + titles;
          }
          document.title = titles;
        }, 500);
      }
    }
  },
  update: function() {
    let routerName = router.history.current.name;
    if (routerName === "HOME") {
      document.title =
        router.app.$options.store.getters.allConfig.webName || "";
      return;
    }
    if (router.currentRoute.meta.keepAlive) {
      let titles = router.app.$options.store.getters.allConfig.webName || "";
      let bindingVal = router.currentRoute.meta.DocumentTitle;
      titles = bindingVal + " - " + titles;
      document.title = titles;
    }
  }
});

Vue.config.productionTip = false;
// console.log("入口文件");
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
