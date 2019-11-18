<template>
  <div
    class="top"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="top_content w1200">
      <div class="left">
        <!--        <ul class="flexC">-->
        <!--          <li v-for="(item, i) in leftList" :key="i">{{ item.title }}</li>-->
        <!--        </ul>-->
      </div>
      <div class="right">
        <div v-if="!isLogin" class="noLogin" key="noLogin">
          <span class="login" @click="goLogin('login')">登录</span>
          <!--
            @click="goLogin('register')"
            @click="$router.push({name:'about',query:{index:'register'}})"
          -->
          <span
            class="register"
            @click="
              $router.push({ name: 'about', query: { index: 'register' } })
            "
            >注册</span
          >
          <span class="service" @click="service">客服</span>
          <span
            v-if="allConfig.showOldSwitch == 1"
            class="service"
            @click="goUrl(oldUrl)"
            >返回旧版</span
          >
        </div>
        <div v-else class="isLogin" key="isLogin">
          <ul>
            <li
              v-for="(item, i) in recordList"
              :key="i"
              @click="goUser(item.type, item.testNo)"
            >
              {{ item.name }}
            </li>
            <li>
              余额：
              <span>{{ userInfo.coin }}</span> 元
              <i class="iconfont refresh" :class="{ SX: SXFlag }" @click="SX"
                >&#xe728;</i
              >
              <div class="totalAssets">
                <!--                <div class="total">总资产(元)</div>-->
                <!--                <div class="money">{{ userInfo.coin }}</div>-->
                <div class="button" @click="guihu">一键归户</div>
                <p>"一键归户"所有资产回归余额</p>
              </div>
            </li>
          </ul>
          <div class="rw">
            <span
              v-for="(item, j) in arr"
              :key="j"
              :class="item.class"
              @click="goUser(item.type, item.testNo)"
              >{{ item.name }}</span
            >
            <span
              v-if="allConfig.showOldSwitch == 1"
              class="service"
              @click="goUrl(oldUrl)"
              >返回旧版</span
            >
          </div>
          <div class="user">
            <div class="messageRemind" v-if="userInfo.unread > 0"></div>
            <b>
              <img
                v-if="userInfo.avatar"
                :src="userInfo.avatar"
                alt
                draggable="false"
              />
              <img v-else src="../../assets/images/tx.png" alt />
            </b>
            <span class="name">{{ userInfo.username }}</span>
            <span class="vip">{{ userInfo.levelName }}</span>
            <div class="popup">
              <div class="popup-top">
                <div>
                  <span>上次登录时间</span>
                  <p>{{ timestampToString(userInfo.loginTime) }}</p>
                </div>
                <div @click="loginOut">
                  <i class="iconfont">&#xe72a;</i>
                  <span>退出登录</span>
                </div>
              </div>
              <div class="popup-content">
                <dl>
                  <dd v-for="(item, i) in List" :key="i">
                    <h3>{{ item.title }}</h3>
                    <p
                      v-for="(child, j) in item.arr"
                      :key="'child' + j"
                      @click="
                        userCenter(
                          child.componentsName,
                          child.activeName,
                          child.testNo
                        )
                      "
                    >
                      {{ child.name }}
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fadeUp">
      <div v-if="showSuggestions" class="suggestions">
        <div class="content">
          <div class="title">
            投诉与建议
            <i class="iconfont" @click="close">&#xe727;</i>
          </div>
          <div class="main">
            <div class="left">
              <p>我们的客服中心全年无休，提供1周7天、每天24小時的优质服务。</p>
              <p>
                如果您对本网站使用有任何疑问，可以通过下列任意方式与客服人员联系，享受最实时的服务。
              </p>
              <p>点击"在线客服"链接，即可进入在线客服系统与客服人员联系。</p>
              <p>您亦可使用Email与客服人員取得联系。</p>
              <p>会员Email: jianyi88866@gmail.com</p>
              <p>国际热线:0063-915 885 8888</p>
              <div>填写下列窗体并点击送出数据，</div>
              <div>我们也能收到您宝贵的意见，</div>
              <div>务必填写真实的Email、QQ、</div>
              <div>联络电话，以便我们能及时与您取得联系！</div>
            </div>
            <div class="line"></div>
            <img :src="commonImg('icons/line.png')" alt />
            <div class="right">
              <ul>
                <li>
                  <span> <b>*</b>姓名 </span>
                  <div>
                    <el-input
                      v-model="name"
                      placeholder="请输入姓名"
                    ></el-input>
                  </div>
                </li>
                <li>
                  <span> <b>*</b>电话 </span>
                  <div>
                    <el-input
                      v-model="phone"
                      placeholder="请输入电话号"
                    ></el-input>
                  </div>
                </li>
                <li>
                  <span> <b>*</b>QQ或Skype </span>
                  <div>
                    <el-input
                      v-model="QQ"
                      placeholder="请输入QQ或Skype"
                    ></el-input>
                  </div>
                </li>
                <li>
                  <span> <b>*</b>邮箱 </span>
                  <div>
                    <el-input
                      v-model="email"
                      placeholder="请输入邮箱"
                    ></el-input>
                  </div>
                </li>
                <li>
                  <span> <b>*</b>简述 </span>
                  <div>
                    <el-input
                      type="textarea"
                      :rows="5"
                      v-model="brief"
                      placeholder="请描述您的问题或者建议"
                    ></el-input>
                  </div>
                </li>
              </ul>
              <div class="button flexA">
                <div @click="clear" class="flexC">清除</div>
                <div @click="submit" class="flexC">立即提交</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <my-login></my-login>
    <my-user :userShow="userShow"></my-user>
    <my-playStart></my-playStart>
    <my-redPack @goLogin="goLogin('login')"></my-redPack>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { loginOut, exchangeAllToLottery, userDetail, addSuggest } from "@/api";
let List = [
  {
    title: "资金管理",
    arr: [
      {
        name: "充值",
        componentsName: "Recharge",
        activeName: "",
        testNo: true
      },
      {
        name: "提现",
        componentsName: "Withdraw",
        activeName: "",
        testNo: true
      },
      {
        name: "额度转换",
        componentsName: "Amount",
        activeName: "",
        testNo: true
      }
    ]
  },
  {
    title: "统计记录",
    arr: [
      { name: "今日盈亏", componentsName: "Bill", activeName: "today" },
      { name: "账单明细", componentsName: "Bill", activeName: "bill" },
      { name: "游戏记录", componentsName: "Record", activeName: "" },
      {
        name: "活动申请",
        componentsName: "Activity",
        activeName: "",
        testNo: true
      }
    ]
  },
  {
    title: "安全中心",
    arr: [
      {
        name: "安全中心",
        componentsName: "Security",
        activeName: "center",
        testNo: true
      },
      {
        name: "登录密码",
        componentsName: "Security",
        activeName: "loginPwd",
        testNo: true
      },
      {
        name: "提现密码",
        componentsName: "Security",
        activeName: "withdrawPwd",
        testNo: true
      },
      {
        name: "银行卡管理",
        componentsName: "BankCenter",
        activeName: "",
        testNo: true
      }
    ]
  },
  {
    title: "系统信息",
    arr: [
      {
        name: "个人资料",
        componentsName: "UserDetail",
        activeName: "userDetail",
        testNo: true
      },
      { name: "公告列表", componentsName: "Notice", activeName: "" },
      { name: "投诉建议", componentsName: "Suggestions", activeName: "" },
      { name: "帮助中心", componentsName: "Help", activeName: "" }
    ]
  }
];
const recordList = [
  { name: "游戏记录", type: "Record" },
  { name: "额度转换", type: "Amount", testNo: true }
];
const arr = [
  { name: "充值", type: "Recharge", class: "recharge", testNo: true },
  { name: "提现", type: "Withdraw", class: "withdraw", testNo: true },
  { name: "客服", type: "service", class: "service" }
];
export default {
  name: "Top",
  data() {
    return {
      oldUrl: "/api/auth/sLogin",
      showSuggestions: false,
      name: "",
      phone: "",
      QQ: "",
      email: "",
      brief: "",
      List,
      recordList,
      arr,
      loginShow: false,
      userShow: false,
      // leftList: [
      //   { title: "优惠活动" },
      //   { title: "代理加盟" },
      //   { title: "APP下载" }
      // ],
      isLogin: false,
      loading: false,
      SXFlag: false
    };
  },
  computed: {
    ...mapGetters(["userInfo", "allConfig"]),
    isTest() {
      return this.userInfo.parentId == 312;
    }
  },
  created() {
    this.LoginStatus(this.userInfo);
    if (this.$route.params.xcode && parseInt(this.$route.params.xcode) >= 0) {
      this.$nextTick(() => {
        this.$router.push({
          name: "about",
          params: { xcode: this.$route.params.xcode },
          query: { index: "register" }
        });
      });
    }
    if (sessionStorage.getItem("topList")) {
      this.List = JSON.parse(sessionStorage.getItem("topList"));
    } else {
      this.isShow();
    }
  },
  watch: {
    userInfo(newVal) {
      this.LoginStatus(newVal);
      if (!newVal) {
        this.userShow = false;
        this.isLogin = false;
      }
    }
  },
  methods: {
    ...mapActions(["userDetails"]),
    goUrl(url) {
      window.location = url;
    },
    close() {
      this.showSuggestions = false;
    },
    clear() {
      this.name = "";
      this.phone = "";
      this.QQ = "";
      this.email = "";
      this.brief = "";
    },
    submit() {
      if (!this.name) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "姓名不能为空"
        });
      }
      if (!this.phone) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "电话不能为空"
        });
      }
      if (!this.QQ) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "QQ或Skype不能为空"
        });
      }
      if (!this.email) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "邮箱不能为空"
        });
      }
      if (!this.brief) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "简述不能为空"
        });
      }
      let parameter = {
        trueName: this.name,
        mobile: this.phone,
        contact: this.QQ,
        email: this.email,
        content: this.brief
      };
      addSuggest(parameter).then(res => {
        if (res.status) {
          this.$message({
            type: "success",
            showClose: true,
            message: res.msg,
            duration: 1000
          });
        } else {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    goLogin(type) {
      this.$children[0].activeType = type;
      this.$store.commit("SET_LOGIN_SHOW", "1");
      this.$children[0].changeCodeImg();
      // this.loginShow = true;
    },
    service() {
      window.open(
        this.allConfig.kefuGG,
        "_blank",
        "height=700, width=1200, top=100, left=100"
      );
    },
    goUser(type, testNo) {
      if (type == "service") {
        return this.service();
      }
      if (this.isTest && testNo) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "试玩账号无法进入",
          duration: 1000
        });
      }
      this.userShow = true;
      this.$children[1].componentsName = type;
    },
    loginOut() {
      this.$msgbox
        .confirm("确定退出账号吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          loginOut().then(res => {
            // console.log(res);
            if (res.status) {
              this.$message({
                type: "success",
                showClose: true,
                message: res.data,
                center: true,
                duration: 1000
              });
              this.isLogin = false;
              this.$store.commit("SET_USER_INFO", "");
              this.$store.commit("SET_MY_BANK", []);
              sessionStorage.clear();
            }
          });
        })
        .catch(res => {
          console.log(res, "点了取消");
        });
    },
    guihu() {
      this.loading = true;
      exchangeAllToLottery().then(res => {
        this.loading = false;
        this.userDetails();
        if (res.status) {
          this.$message({
            type: "success",
            showClose: true,
            message: res.msg,
            duration: 1000
          });
        } else {
          this.$message({
            type: "error",
            showClose: true,
            message: res.msg,
            duration: 1000
          });
        }
      });
    },
    LoginStatus(val) {
      if (val && val.username) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    userCenter(componentsName, activeName, testNo) {
      console.log(componentsName, activeName, "componentsName");
      if (componentsName === "Suggestions") {
        return (this.showSuggestions = true);
      }
      if (this.isTest && testNo) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "试玩账号无法进入",
          duration: 1000
        });
      }
      this.$store.commit("SET_ACTIVE_NAME", activeName);
      this.userShow = true;
      this.$children[1].componentsName = componentsName;
    },
    SX() {
      this.SXFlag = true;
      userDetail().then(res => {
        if (!res) {
          this.$store.commit("SET_USER_INFO", "");
        }
        if (res.status) {
          this.$store.commit("SET_USER_INFO", res.data);
          this.$message({
            type: "success",
            showClose: true,
            message: "刷新成功",
            duration: 1000
          });
        }
        this.SXFlag = false;
      });
    },
    isShow() {
      if (this.allConfig) {
        let item = {
          name: "自助洗码",
          componentsName: "WashCode",
          activeName: "",
          testNo: true
        };
        if (this.allConfig.enableWashcode == "1") {
          if (this.List[0]["arr"].length >= 4) {
            return false;
          }
          if (!sessionStorage.getItem("topList")) {
            this.List[0]["arr"].push(item);
          }
          sessionStorage.setItem("topList", JSON.stringify(this.List));
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  background-color: #22262a;
  height: 42px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  color: #b0b0b0;
  .suggestions {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    .content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      width: 762px;
      height: 580px;
      .title {
        height: 60px;
        line-height: 60px;
        text-align: center;
        position: relative;
        border-bottom: 1px solid #afafaf;
        font-size: 16px;
        color: #666666;
        i {
          position: absolute;
          right: 16px;
          font-size: 30px;
          cursor: pointer;
        }
      }
      .main {
        display: flex;
        .left {
          margin-top: 30px;
          margin-left: 27px;
          padding-right: 30px;
          width: 260px;
          color: #666666;
          p {
            margin-bottom: 24px;
          }
        }
        img {
          margin-top: 16px;
          height: 470px;
        }
        .right {
          ul {
            padding-top: 30px;
            li {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
              > span {
                width: 100px;
                text-align: right;
                color: #666;
                margin-right: 20px;
                b {
                  color: #dc001a;
                  font-weight: normal;
                }
              }
              .el-input {
                width: 250px;
                height: 42px;
              }
              .el-textarea {
                width: 250px;
              }
            }
          }
          .button {
            margin-top: 40px;
            padding-left: 40px;
            color: #fff;
            div {
              width: 118px;
              height: 42px;
              border-radius: 4px;
              cursor: pointer;
            }
            div:first-child {
              background: linear-gradient(#747474, #3f3f3f);
            }
            div:last-child {
              background: linear-gradient(#fc4a1a, #f7b733);
            }
          }
        }
      }
    }
  }
  .top_content {
    display: flex;
    justify-content: space-between;
    .left {
      ul {
        margin-top: 12px;
        li {
          border-right: 1px solid #b0b0b0;
          padding: 0 10px;
          font-size: 12px;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
        li:last-child {
          border: 0;
        }
      }
    }
    .right {
      color: white;
      line-height: 42px;
      .noLogin {
        text-align: right;
        span {
          display: inline-block;
          width: 74px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          border-radius: 5px;
          cursor: pointer;
        }
        .login {
          background: linear-gradient(#fe8c00, #ff8f26);
        }
        .login:hover {
          background: linear-gradient(#fe8c00, #f83600);
        }
        .register {
          background: linear-gradient(#59616b, #373c42);
          margin-left: 10px;
          color: #afafaf;
        }
        .register:hover {
          background: linear-gradient(#59616b, #000000);
        }
        .service {
          background: linear-gradient(#60c961, #5bb95c);
          margin-left: 10px;
          color: #fff;
        }
        .service:hover {
          background: linear-gradient(#42a043, #52c554);
        }
      }
      .isLogin {
        display: flex;
        justify-content: flex-end;
        text-align: center;
        ul {
          display: flex;
          li {
            height: 42px;
            line-height: 42px;
            border-left: 1px solid #434445;
            padding: 0 10px;
            color: #b0b0b0;
            cursor: pointer;
            &:hover {
              background-color: #020202;
              color: #fff;
            }
          }
          li:last-child {
            white-space: normal;
            width: 220px;
            padding: 0;
            border-right: 1px solid #434445;
            .refresh {
              font-size: 20px;
              margin-left: 10px;
              &.SX {
                animation: rotate 0.8s infinite ease;
              }
            }
            span {
              font-size: 15px;
              color: #fea24d;
              display: inline-block;
              vertical-align: top;
            }
            i {
              display: inline-block;
              vertical-align: top;
            }
            .totalAssets {
              background: linear-gradient(#fe8c00, #f83600);
              text-align: center;
              line-height: initial;
              height: 0;
              max-height: 0;
              overflow: hidden;
              transition: 0.5s;
              .total {
                color: #ffd7cb;
                padding-top: 10px;
              }
              .button {
                color: #fa591e;
                margin: 20px 30px 0 30px;
                padding: 5px 30px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 4px 4px 0 0;
                font-size: 12px;
              }
              .button:hover {
                background: #fff;
              }
              p {
                color: #ffd7cb;
                font-size: 12px;
                padding: 10px 0;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
              }
            }
          }
          li:last-child:hover {
            .totalAssets {
              height: auto;
              max-height: 200px;
            }
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
        b {
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
        }
        .rw {
          padding-right: 18px;
          border-right: 1px solid #434445;
          &:hover {
            background-color: #020202;
          }
          > span {
            width: 75px;
            height: 28px;
            line-height: 28px;
            display: inline-block;
            vertical-align: top;
            margin-left: 16px;
            margin-top: 9px;
            cursor: pointer;
            font-size: 15px;
          }
          .recharge {
            border-radius: 2px;
            background: linear-gradient(1deg, #ff8229, #ff461c);
          }
          .recharge:hover {
            background: linear-gradient(1deg, #ff6e03, #de2901);
          }
          .withdraw {
            border-radius: 2px;
            background: linear-gradient(1deg, #21a3ff, #5252d6);
          }
          .withdraw:hover {
            background: linear-gradient(1deg, #0a8ae5, #4747ba);
          }
          .service {
            border-radius: 2px;
            background: linear-gradient(#60c961, #5bb95c);
          }
          .service:hover {
            background: linear-gradient(#42a043, #52c554);
          }
        }
        .user {
          min-width: 170px;
          padding: 0 6px;
          height: 42px;
          border-right: 1px solid #434445;
          position: relative;
          &:hover {
            background-color: #020202;
            .popup {
              height: auto;
              max-height: 350px;
            }
          }
          .messageRemind {
            position: absolute;
            left: 29px;
            top: 5px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #ff4f31;
          }
          .name {
            display: inline-block;
            vertical-align: top;
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            padding-left: 5px;
          }
          .vip {
            display: inline-block;
            padding: 0 10px;
            border-radius: 18px;
            height: 22px;
            line-height: 22px;
            background: linear-gradient(left, #f83600, #fe8c00);
            font-size: 12px;
          }
          .popup {
            position: absolute;
            top: 42px;
            right: 0;
            width: 424px;
            padding: 0 10px 0 20px;
            line-height: initial;
            overflow: hidden;
            transition: 0.5s;
            height: 0;
            max-height: 0;
            background-image: linear-gradient(1deg, #f83600 0%, #fe8c00 99%), linear-gradient(1deg, #7474bf 1%, #348ac7 100%), linear-gradient(#343537, #343537);
            .popup-top {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid rgba(255, 255, 255, 0.3);
              div {
                &:first-child {
                  text-align: left;
                  span {
                    display: inline-block;
                    color: #ffd7cb;
                    margin-top: 20px;
                    margin-bottom: 14px;
                  }
                  p {
                    padding-bottom: 20px;
                  }
                }
                &:nth-child(2) {
                  width: 108px;
                  height: 35px;
                  border: 1px solid #fff;
                  text-align: center;
                  line-height: 35px;
                  font-size: 12px;
                  margin-right: 10px;
                  cursor: pointer;
                  &:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                  }
                  i {
                    font-size: 13px;
                    margin-right: 5px;
                  }
                }
              }
            }
            .popup-content {
              dl {
                display: flex;
                justify-content: space-between;
                text-align: left;
                padding-bottom: 10px;
                dd {
                  h3 {
                    margin: 20px 0;
                    font-size: 12px;
                    line-height: inherit !important;
                  }
                  p {
                    cursor: pointer;
                    width: 78px;
                    height: 30px;
                    line-height: 30px;
                    background-color: rgba(255, 255, 255, 0.1);
                    margin-bottom: 10px;
                    padding-left: 10px;
                    &:hover {
                      background-color: rgba(255, 255, 255, 0.4);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
