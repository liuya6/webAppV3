<template>
  <div class="security">
    <el-tabs
      v-model="activeName"
      :before-leave="leaveTab"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(item, i) in TitleList"
        :key="i"
        :label="item.title"
        :name="item.typeKey"
      >
        <div class="center" v-if="item.typeKey === 'center'">
          <div class="center-top">
            <div>
              <span>{{ userInfo.safeScore }}</span>
              <span>分</span>
            </div>
            <ul>
              <li>安全等级{{ userInfo.safe }}</li>
              <li>您好，{{ userInfo.username }},{{ userInfo.safeMsg }}</li>
              <li>
                上次登录时间：
                <span>
                  {{ timestampToString(userInfo.loginTime) }}
                </span>
                <b @click="goService">不是本人？</b>
              </li>
            </ul>
          </div>
          <div class="content-btm">
            <dl>
              <dd
                class="loginPwd"
                :class="{ hasLoginPwd: userInfo.password }"
                @click="toChangeLoginPwd"
              >
                <div>
                  <i class="iconfont">&#xe721;</i>
                </div>
                <span>登录密码</span>
              </dd>
              <dd
                class="moneyPwd"
                :class="{ hasMoneyPwd: userInfo.coinPassword }"
                @click="toWithdrawPwd"
              >
                <div>
                  <i class="iconfont">&#xe71e;</i>
                </div>
                <span>资金密码</span>
              </dd>
              <dd
                class="bindBank"
                :class="{ hasBindBank: userInfo.bankNum }"
                @click="bindBank"
              >
                <div>
                  <i class="iconfont">&#xe722;</i>
                </div>
                <span>绑定银行卡</span>
              </dd>
              <dd
                class="bindMobile"
                :class="{
                  hasBindMobile: userInfo.mobile,
                  hide: allConfig.isOpenSms !== 1 && !userInfo.mobile
                }"
                @click="bindMobile"
              >
                <!-- <dd class="bindMobile hasBindMobile"> -->
                <div>
                  <i class="iconfont">&#xe71f;</i>
                </div>
                <span>绑定手机</span>
              </dd>
            </dl>
          </div>
        </div>
        <div class="loginpwd" v-else-if="item.typeKey === 'loginPwd'">
          <h3>*密码不能使用特殊字符，由字母和数字组成6~16个字符</h3>
          <ul>
            <li>
              <span> <b>*</b>旧密码 </span>
              <el-input
                show-password
                v-model="loginPwd.oldPassword"
                placeholder="请输入旧的登录密码"
              ></el-input>
            </li>
            <li>
              <span> <b>*</b>新密码 </span>
              <el-input
                show-password
                v-model="loginPwd.newPassword"
                placeholder="请输入新的登录密码"
              ></el-input>
            </li>
            <li>
              <span> <b>*</b>确认新密码 </span>
              <el-input
                show-password
                v-model="loginPwd.newPassword_confirm"
                placeholder="请再次输入新的登录密码"
              ></el-input>
            </li>
          </ul>
          <div class="loginBtn submitBtn" @click="changeLoginPwd">立即提交</div>
        </div>
        <div class="withdrawpwd" v-else-if="item.typeKey === 'withdrawPwd'">
          <h3>*新资金密码必须由6位数字组成</h3>
          <ul>
            <li>
              <span> <b>*</b>旧密码 </span>
              <el-input
                show-password
                v-model="withdrawPwd.oldPassword"
                placeholder="请输入旧的资金密码"
                maxlength="6"
              ></el-input>
            </li>
            <li>
              <span> <b>*</b>新密码 </span>
              <el-input
                show-password
                v-model="withdrawPwd.newPassword"
                placeholder="请输入新的资金密码"
                maxlength="6"
              ></el-input>
            </li>
            <li>
              <span> <b>*</b>确认新密码 </span>
              <el-input
                show-password
                v-model="withdrawPwd.newPassword_confirm"
                placeholder="请再次输入新的资金密码"
                maxlength="6"
                clearable
              ></el-input>
            </li>
          </ul>
          <div class="submitBtn" @click="changeWithdrawPwds">立即提交</div>
        </div>
        <div class="mobile" v-else>
          <h3>*绑定手机后不可修改，有问题请咨询客服</h3>
          <ul>
            <li>
              <span>手机号码</span>
              <el-input
                v-model="mobileData.mobile"
                type="tel"
                placeholder="请输入绑定手机号码"
                maxlength="11"
              ></el-input>
            </li>
            <li>
              <span>短信验证码</span>
              <el-input
                v-model="mobileData.verifyCode"
                type="tel"
                placeholder="输入短信验证码"
              ></el-input>
              <b class="getCodeBtn" @click="getCode">{{
                getCodeTime > 0 ? getCodeTime : "获取验证码"
              }}</b>
            </li>
          </ul>
          <div class="submitBtn" @click="bindPhone">立即提交</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  changeUserPwd,
  changeWithdrawPwd,
  sendSms,
  bindMobiles
} from "../../api";
export default {
  name: "Security",
  data() {
    return {
      TitleList: [
        {
          title: "安全中心",
          typeKey: "center"
        },
        {
          title: "修改登录密码",
          typeKey: "loginPwd"
        },
        {
          title: "修改资金密码",
          typeKey: "withdrawPwd"
        },
        {
          title: "绑定手机",
          typeKey: "bindMobile"
        }
        // {
        //   title: "绑定邮箱",
        //   typeKey: "email"
        // }
      ],
      activeName: "center",
      getCodeTime: 0,
      timer: null,
      loginPwd: {
        oldPassword: "",
        newPassword: "",
        newPassword_confirm: ""
      },
      withdrawPwd: {
        oldPassword: "",
        newPassword: "",
        newPassword_confirm: ""
      },
      mobileData: {
        mobile: "",
        verifyCode: ""
      }
    };
  },
  created() {
    if (this.allConfig.isOpenSms !== 1 && !this.userInfo.mobile) {
      this.TitleList.pop();
    }
    console.log(this.userInfo, "安全中心------------------------");
    if (localStorage.getItem("getCodeTime")) {
      this.getCodeTime = localStorage.getItem("getCodeTime");
      if (this.getCodeTime > 0) {
        this.times();
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo", "allConfig"])
  },
  methods: {
    handleClick(tab, event) {
      this.activeName == "";
      console.log(tab, event, 111111111);
    },
    bindMobile() {
      if (this.allConfig.isOpenSms == 1 && !this.userInfo.mobile) {
        this.activeName = "bindMobile";
      }
    },
    toChangeLoginPwd() {
      this.activeName = "loginPwd";
    },
    toWithdrawPwd() {
      this.activeName = "withdrawPwd";
    },
    bindBank() {
      // console.log(this.$children, "this.$children");
      // console.log(this.$parent, "this.$parent");
      this.$parent.componentsName = "BankCenter";
    },
    leaveTab(activeName, oldActiveName) {
      console.log(activeName, oldActiveName);
      if (activeName === "bindMobile") {
        if (this.userInfo.mobile) {
          this.$message({
            type: "error",
            showClose: true,
            message: "你已经绑定过手机了噢",
            duration: 1000
          });
          return false;
        }
      }
    },
    changeLoginPwd() {
      if (!this.loginPwd.oldPassword) {
        return this.$message("请输入旧密码");
      }
      if (!this.loginPwd.newPassword || !this.loginPwd.newPassword_confirm) {
        return this.$message("请输入新密码");
      } else {
        if (
          !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/.test(
            this.loginPwd.newPassword
          )
        ) {
          return this.$message.error(
            "请按要求填写密码（6-16个包含字母和数字的组合）"
          );
        }
        if (this.loginPwd.newPassword !== this.loginPwd.newPassword_confirm) {
          return this.$message.error("两次输入密码不同");
        }
      }
      changeUserPwd(this.loginPwd).then(res => {
        let type;
        if (res.status) {
          type = "success";
          this.$parent.$parent.userShow = false;
          this.$store.commit("SET_USER_INFO", "");
          this.$store.commit("SET_MY_BANK", []);
          this.allInit();
        } else {
          type = "error";
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg,
          duration: 1000
        });
      });
    },
    changeWithdrawPwds() {
      if (!this.withdrawPwd.oldPassword) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入旧的资金密码",
          duration: 1000
        });
      }
      if (
        !this.withdrawPwd.newPassword ||
        !this.withdrawPwd.newPassword_confirm
      ) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入新的资金密码",
          duration: 1000
        });
      } else {
        if (
          this.withdrawPwd.newPassword !== this.withdrawPwd.newPassword_confirm
        ) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "两次密码不相同",
            duration: 1000
          });
        }
      }
      changeWithdrawPwd(this.withdrawPwd).then(res => {
        let type;
        if (res.status) {
          type = "success";
          this.allInit();
        } else {
          type = "error";
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg,
          duration: 1000
        });
      });
    },
    getCode() {
      if (this.getCodeTime <= 0) {
        if (!this.mobileData.mobile) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请输入手机号码",
            duration: 1000
          });
        }
        this.getCodeTime = 60;
        this.times();
        sendSms({ mobile: this.mobileData.mobile }).then(res => {
          let type;
          if (res.status) {
            type = "success";
          } else {
            type = "error";
          }
          this.$message({
            type: type,
            showClose: true,
            message: res.msg
          });
        });
      }
    },
    times() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.getCodeTime--;
        localStorage.setItem("getCodeTime", this.getCodeTime);
        if (this.getCodeTime <= 0) {
          this.getCodeTime = 0;
          clearInterval(this.timer);
        }
      }, 1000);
    },
    bindPhone() {
      if (!this.mobileData.mobile) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入手机号码",
          duration: 1000
        });
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.mobileData.mobile)) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请输入正确的手机号",
            duration: 1000
          });
        }
      }
      if (!this.mobileData.verifyCode) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入短信验证码",
          duration: 1000
        });
      }
      bindMobiles(this.mobileData).then(res => {
        let type;
        if (res.status) {
          type = "success";
          this.allInit();
        } else {
          type = "error";
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg,
          duration: 1000
        });
      });
    },
    allInit() {
      this.loginPwd = {
        oldPassword: "",
        newPassword: "",
        newPassword_confirm: ""
      };
      this.withdrawPwd = {
        oldPassword: "",
        newPassword: "",
        newPassword_confirm: ""
      };
      this.mobileData = {
        mobile: "",
        verifyCode: ""
      };
    },
    goService() {
      console.log(this.allConfig);
      window.open(
        this.allConfig.kefuGG,
        "_blank",
        "height=800, width=900, top=100, left=100"
      );
    }
  }
};
</script>

<style scoped lang="scss">
.security {
  display: flex;
  flex: 1;
  .center {
    .center-top {
      padding-top: 40px;
      margin-left: 50px;
      overflow: hidden;
      div {
        float: left;
        width: 224px;
        height: 224px;
        text-align: center;
        line-height: 224px;
        background: url("../../assets/images/center.png");
        background-size: 100% 100%;
        span {
          color: #fff;
          &:first-child {
            font-size: 68px;
          }
        }
      }
      ul {
        margin-left: 46px;
        float: left;
        li {
          color: #666;
          margin-bottom: 26px;
          &:first-child {
            font-size: 30px;
            color: #333333;
            margin-top: 50px;
          }
          span {
            color: #fd7632;
          }
          b {
            background-color: #fd7632;
            color: #fff;
            padding: 2px 6px;
            font-weight: normal;
            border-radius: 30px;
            text-align: center;
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
    }
    .content-btm {
      dl {
        width: 400px;
        margin-left: 100px;
        margin-top: 100px;
        display: flex;
        justify-content: space-between;
        dd {
          text-align: center;
          cursor: pointer;
          &.hide {
            display: none;
          }
          div {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            text-align: center;
            line-height: 64px;
            border: solid 1px #dbdbdb;
            margin-bottom: 8px;
            box-sizing: border-box;
            i {
              font-size: 30px;
              color: #dbdbdb;
            }
          }
          &.hasLoginPwd {
            div {
              background-image: linear-gradient(1deg, #ff5858 0%, #f857a6 100%),
                linear-gradient(#ffffff, #ffffff);
              border: none;
              i {
                color: #fff;
              }
            }
          }
          &.hasMoneyPwd {
            div {
              background-image: linear-gradient(1deg, #3494e6 0%, #ec6ead 100%),
                linear-gradient(#ffffff, #ffffff);
              border: none;
              i {
                color: #fff;
              }
            }
          }
          &.hasBindBank {
            div {
              background-image: linear-gradient(1deg, #007991 0%, #78ffd6 100%),
                linear-gradient(#ffffff, #ffffff);
              border: none;
              i {
                color: #fff;
              }
            }
          }
          &.hasBindMobile {
            div {
              background-image: linear-gradient(1deg, #4f52a1 0%, #52c0d9 100%),
                linear-gradient(#ffffff, #ffffff);
              border: none;
              i {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .loginpwd,
  .withdrawpwd {
    h3 {
      width: 840px;
      height: 52px;
      line-height: 52px;
      margin-left: 20px;
      margin-top: 20px;
      padding-left: 20px;
      background-image: linear-gradient(#fdf7ea, #fdf7ea),
        linear-gradient(#fdf7ea, #fdf7ea);
      border-radius: 10px;
      border: solid 1px #f0f0f0;
      color: #999999;
    }
    ul {
      margin-top: 40px;
      li {
        margin-bottom: 20px;
        span {
          display: inline-block;
          width: 120px;
          text-align: right;
          margin-right: 20px;
          color: #666;
          b {
            color: #e60000;
          }
        }
        .el-input {
          width: 370px;
        }
      }
    }
    .submitBtn {
      float: right;
      margin-top: 187px;
      margin-right: 40px;
    }
  }
  .mobile {
    h3 {
      width: 840px;
      height: 52px;
      line-height: 52px;
      margin-left: 20px;
      margin-top: 20px;
      padding-left: 20px;
      background-image: linear-gradient(#fdf7ea, #fdf7ea),
        linear-gradient(#fdf7ea, #fdf7ea);
      border-radius: 10px;
      border: solid 1px #f0f0f0;
      color: #999999;
    }
    ul {
      margin-top: 40px;
      li {
        margin-bottom: 20px;
        span {
          display: inline-block;
          width: 120px;
          text-align: right;
          margin-right: 20px;
          color: #666;
        }
        .el-input {
          width: 370px;
        }
        &:nth-child(2) {
          .el-input {
            width: 214px;
          }
          .getCodeBtn {
            display: inline-block;
            vertical-align: top;
            width: 144px;
            height: 40px;
            box-sizing: border-box;
            text-align: center;
            line-height: 40px;
            background-image: linear-gradient(#ffffff, #ffffff),
              linear-gradient(#eeeeee, #eeeeee);
            border-radius: 4px;
            border: solid 1px #fc8700;
            color: #fc8700;
            font-weight: normal;
            margin-left: 12px;
            cursor: pointer;
          }
        }
      }
    }
    .submitBtn {
      float: right;
      margin-top: 187px;
      margin-right: 40px;
    }
  }
}
</style>
