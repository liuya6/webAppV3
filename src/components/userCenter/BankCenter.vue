<template>
  <div
    class="bankcenter"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.3)"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(item, i) in TitleList"
        :key="i"
        :label="item.title"
        :name="item.typeKey"
        :disabled="userInfo.bankNum >= 5"
      >
        <div class="mybank" v-if="item.typeKey === 'myBank'">
          <ul>
            <li v-for="(item, i) in myBank" :key="i">
              <h3>
                <i>
                  <img :src="item.logo" alt />
                </i>
                {{ item.oldBankName }}
              </h3>
              <p>{{ bankNum(item.account) }}</p>
              <span>{{ item.username }}</span>
            </li>
            <li class="addBank">
              <div @click="gotoAddBank">
                <i class="iconfont">&#xe725;</i>
                <div>新增银行卡</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="addBank" v-else>
          <h3>
            <p>1、一个游戏账户最多绑定5张银行卡。</p>
            <p>2、请注意一旦银行卡绑定不能修改，删除，请认真核对填写。</p>
            <p>
              3、银行卡绑定主要用于会员提现使用，如须解绑，请与在线客服联系。
            </p>
          </h3>
          <ul>
            <li>
              <span> <b>*</b>真实姓名 </span>
              <el-input
                placeholder="姓名不可修改，请谨慎填写"
                v-model="bankDetail.cardholder"
                :readonly="isReadOnly"
              ></el-input>
            </li>
            <li>
              <span> <b>*</b>开户银行 </span>
              <el-select
                v-model="bankDetail.bankName"
                placeholder="请选择开户银行"
              >
                <el-option
                  v-for="(item, j) in bindingList"
                  :key="j"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </li>
            <transition name="fade">
              <li v-show="otherFlag" class="other">
                <span> <b>*</b>其他开户银行 </span>
                <el-input
                  placeholder="请输入开户银行名称"
                  v-model="otherBank"
                ></el-input>
              </li>
            </transition>
            <li>
              <span> <b>*</b>银行卡号 </span>
              <el-input
                placeholder="请输入银行卡号"
                v-model="cardNumber"
                maxlength="28"
              ></el-input>
            </li>
            <li>
              <span> <b>*</b>银行所在地区 </span>
              <el-cascader
                size="medium"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
              ></el-cascader>
            </li>
            <li>
              <span>开户支行</span>
              <el-input
                placeholder="请输入开户支行（选填）"
                v-model="bankDetail.bankBranch"
              ></el-input>
            </li>
            <template>
              <ul v-show="!userInfo.coinPassword">
                <li>
                  <span> <b>*</b>资金密码 </span>
                  <el-input
                    placeholder="请输入六位提现密码"
                    v-model="bankDetail.coinPassword"
                    show-password
                    maxlength="6"
                  ></el-input>
                </li>
                <li>
                  <span> <b>*</b>确认密码 </span>
                  <el-input
                    placeholder="请确认密码"
                    v-model="bankDetail.reCoinPassword"
                    show-password
                    maxlength="6"
                  ></el-input>
                </li>
              </ul>
            </template>
            <li v-if="allConfig.isOpenSms == 1">
              <span> <b>*</b>预留手机号 </span>
              <el-input
                placeholder="请输入常用11位手机号"
                maxlength="11"
                v-model="bankDetail.mobile"
              ></el-input>
              <div
                class="sendCode"
                :class="setCodeFlag ? 'on' : 'wait'"
                @click="getCode"
              >
                {{
                  AddBankWaitTime > 0
                    ? AddBankWaitTime + "秒后重新获取"
                    : "获取验证码"
                }}
              </div>
            </li>
            <li v-if="allConfig.isOpenSms == 1">
              <span> <b>*</b>验证码 </span>
              <el-input
                placeholder="请输入验证码"
                v-model="bankDetail.verifyCode"
              ></el-input>
            </li>
          </ul>
          <div class="submitBtn" @click="bindBankCard">立即提交</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import { mapGetters } from "vuex";
import { boundCard, sendSms } from "../../api";
const TitleList = [
  {
    title: "我的银行卡",
    typeKey: "myBank"
  },
  {
    title: "新增银行卡",
    typeKey: "addBank"
  }
];
export default {
  name: "BankManagement",
  data() {
    return {
      TitleList,
      activeName: "myBank",
      isReadOnly: false,
      otherFlag: false,
      otherBank: "",
      cardNumber: "",
      bankDetail: {
        cardholder: "",
        cardNumber: "",
        area: "",
        bankName: "",
        bankId: "",
        bankBranch: "",
        mobile: "",
        verifyCode: "",
        coinPassword: "",
        reCoinPassword: ""
      },
      options: regionData,
      selectedOptions: [],
      CodeToText,
      timer: null,
      AddBankWaitTime: 0,
      setCodeFlag: false
    };
  },
  created() {
    console.log(this.userInfo, "userInfo.coinPassword");
    if (!this.myBank || !this.myBank.length) {
      // 我的银行卡
      this.$store.dispatch("myBanks");
    } else {
      this.bankDetail.cardholder = this.myBank[0].username;
      this.isReadOnly = "readonly";
    }
    if (!this.bindingList || !this.bindingList.length) {
      // 绑卡准备
      this.$store.dispatch("bindingBefores");
    }
    if (localStorage.getItem("AddBankWaitTime")) {
      this.AddBankWaitTime = localStorage.getItem("AddBankWaitTime");
      if (this.AddBankWaitTime > 0) {
        this.times();
      }
    }
  },
  computed: {
    ...mapGetters(["bindingList", "myBank", "userInfo", "loading", "allConfig"])
  },
  watch: {
    myBank(newVal) {
      // console.log(newVal, "myBank");
      if (newVal.length) {
        this.bankDetail.cardholder = newVal[0].username;
        this.isReadOnly = "readonly";
      }
    },
    cardNumber(newVal) {
      this.cardNumber = newVal
        .replace(/\s/g, "")
        .replace(/[^\d]/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    },
    "bankDetail.bankName": {
      handler(newVal) {
        // console.log(newVal);
        if (newVal == "其他") {
          return (this.otherFlag = true);
        } else {
          return (this.otherFlag = false);
        }
      },
      deep: true
    },
    "bankDetail.mobile": {
      handler(val) {
        // console.log(val);
        if (val.length >= 11) {
          if (this.AddBankWaitTime <= 0) {
            this.setCodeFlag = true;
          } else {
            this.setCodeFlag = false;
          }
        } else {
          this.setCodeFlag = false;
        }
      }
    }
  },
  methods: {
    getCode() {
      if (this.AddBankWaitTime > 0) {
        return false;
      }
      console.log(this.setCodeFlag, "this.setCodeFlag");
      if (!this.setCodeFlag) {
        return false;
      }
      if (!this.cardNumber) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请输入银行卡号"
        });
      } else {
        this.cardNumber = this.cardNumber.replace(/\s*/g, "");
        if (!/\d{15}|\d{28}/.test(this.cardNumber)) {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: "请输入正确的银行卡号"
          });
        }
      }
      if (!this.bankDetail.bankName) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请选择开户银行"
        });
      }
      if (this.bankDetail.bankName === "其他") {
        if (!this.otherBank) {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: "请输入开户银行名称"
          });
        } else {
          if (!/^([\u4e00-\u9fa5]){4,10}$/.test(this.otherBank)) {
            return this.$message({
              type: "error",
              showClose: true,
              duration: 1000,
              message: "请输入正确的开户银行名称"
            });
          }
        }
      }
      if (!this.bankDetail.area) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请选择开户地区"
        });
      }

      if (!this.userInfo.coinPassword) {
        if (!this.bankDetail.coinPassword || !this.bankDetail.reCoinPassword) {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: "请设置提现密码"
          });
        } else {
          if (this.bankDetail.coinPassword !== this.bankDetail.reCoinPassword) {
            return this.$message({
              type: "error",
              showClose: true,
              duration: 1000,
              message: "两次提现密码不同"
            });
          }
        }
      }
      if (!this.bankDetail.mobile) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请输入手机号码"
        });
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.bankDetail.mobile)) {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: "请输入正确的手机号"
          });
        }
      }
      this.AddBankWaitTime = 60;
      this.times();
      sendSms({ mobile: this.bankDetail.mobile }).then(res => {
        this.$message({
          type: "success",
          showClose: true,
          duration: 1000,
          message: res.msg
        });
      });
    },
    times() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.AddBankWaitTime--;
        localStorage.setItem("AddBankWaitTime", this.AddBankWaitTime);
        if (this.AddBankWaitTime <= 0) {
          this.AddBankWaitTime = 0;
          clearInterval(this.timer);
          if (this.bankDetail.mobile.length >= 11) {
            this.setCodeFlag = true;
          } else {
            this.setCodeFlag = false;
          }
        }
      }, 1000);
    },
    bankId(bank) {
      for (let i = 0; i < this.bindingList.length; i++) {
        let bankListOne = this.bindingList[i];
        if (bankListOne.name == bank) {
          return bankListOne.id;
        }
      }
      return 10000;
    },
    handleChange(val) {
      let areas = "";
      for (let i = 0; i < val.length; i++) {
        let item = val[i];
        areas += this.CodeToText[item];
      }
      console.log(areas);
      this.bankDetail.area = areas;
    },
    bindBankCard() {
      if (!this.bankDetail.cardholder) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请输入持卡人姓名"
        });
      } else {
        if (!/^([\u4e00-\u9fa5]){2,7}$/.test(this.bankDetail.cardholder)) {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: "请输入正确的姓名"
          });
        }
      }
      if (!this.bankDetail.bankName) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请选择开户银行"
        });
      }
      if (this.bankDetail.bankName === "其他") {
        if (!this.otherBank) {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: "请输入开户银行名称"
          });
        } else {
          if (!/^([\u4e00-\u9fa5]){4,10}$/.test(this.otherBank)) {
            return this.$message({
              type: "error",
              showClose: true,
              duration: 1000,
              message: "请输入正确的开户银行名称"
            });
          }
        }
      }
      if (!this.bankDetail.area) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请选择开户地区"
        });
      }
      if (!this.cardNumber) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请输入银行卡号"
        });
      } else {
        this.cardNumber = this.cardNumber.replace(/\s*/g, "");
        if (!/\d{15}|\d{28}/.test(this.cardNumber)) {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: "请输入正确的银行卡号"
          });
        }
      }
      if (!this.userInfo.coinPassword) {
        if (!this.bankDetail.coinPassword) {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: "请设置提现密码"
          });
        } else {
          if (this.bankDetail.coinPassword !== this.bankDetail.reCoinPassword) {
            return this.$message({
              type: "error",
              showClose: true,
              duration: 1000,
              message: "两次输入的密码不同"
            });
          }
        }
      }
      if (!this.bankDetail.verifyCode && this.allConfig.isOpenSms == 1) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请输入短信验证码"
        });
      }
      if (this.otherBank) {
        this.bankDetail.bankName = this.otherBank;
      }
      this.bankDetail.bankId = this.bankId(this.bankDetail.bankName);
      this.bankDetail.cardNumber = this.cardNumber.replace(/\s*/g, "");
      console.log(this.bankDetail);
      boundCard(this.bankDetail).then(res => {
        let type;
        if (res.status) {
          this.$store.dispatch("myBanks");
          this.initalData();
          type = "success";
          this.activeName = "myBank";
        } else {
          type = "error";
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg,
          duration: 1000
        });
        console.log(res, "绑定银行卡-----------------------");
      });
    },
    initalData() {
      this.bankDetail = {
        cardholder: "",
        cardNumber: "",
        area: "",
        bankName: "",
        bankId: "",
        bankBranch: "",
        mobile: "",
        coinPassword: "",
        reCoinPassword: ""
      };
      this.selectedOptions = [];
      this.cardNumber = "";
      this.otherFlag = false;
    },
    gotoAddBank() {
      if (this.userInfo.bankNum >= 5) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "最多只能绑定5张银行卡噢"
        });
      }
      this.activeName = "addBank";
    }
  }
};
</script>

<style scoped lang="scss">
.bankcenter {
  display: flex;
  flex: 1;
  .mybank {
    ul {
      overflow: hidden;
      float: left;
      li {
        margin-left: 20px;
        margin-top: 20px;
        width: 274px;
        height: 166px;
        background: url("../../assets/bank.png") no-repeat;
        background-size: 100% 100%;
        border-radius: 10px;
        border: solid 1px #f0f0f0;
        color: #fff;
        float: left;
        h3 {
          margin: 20px 0 0 20px;
          font-size: 16px;
          i {
            display: inline-block;
            width: 25px;
            height: 25px;
            line-height: 40px;
            font-size: 20px;
            img {
              display: inline-block;
              vertical-align: middle;
              width: 100%;
            }
          }
        }
        p {
          font-size: 24px;
          margin-left: 20px;
          margin-top: 35px;
        }
        span {
          float: right;
          margin-right: 10px;
          margin-top: 10px;
        }
      }
    }
    .addBank {
      margin-left: 20px;
      margin-top: 20px;
      width: 274px;
      height: 166px;
      background: #fafafa;
      border: 1px solid #f0f0f0;
      color: #999999;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      border-radius: 10px;
      > div {
        text-align: center;
        cursor: pointer;
        i {
          font-size: 50px;
          text-align: center;
        }
      }
    }
  }
  .addBank {
    h3 {
      width: 840px;
      background-image: linear-gradient(#fdf7ea, #fdf7ea),
        linear-gradient(#fdf7ea, #fdf7ea);
      border-radius: 10px;
      border: solid 1px #f0f0f0;
      padding: 20px 0 20px 20px;
      margin: 20px 0 20px 20px;
      p {
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    ul {
      li {
        margin-bottom: 20px;
        position: relative;
        span {
          display: inline-block;
          width: 120px;
          text-align: right;
          color: #666;
          margin-right: 20px;
          b {
            color: #e60000;
          }
        }
        .el-input {
          width: 370px;
          position: relative;
        }
        .el-select {
          width: 370px;
        }
        .el-cascader {
          width: 370px;
        }
        .sendCode {
          position: absolute;
          left: 420px;
          top: 0px;
          text-align: center;
          cursor: pointer;
          padding: 10px;
          color: #333;
          background-color: #eee;
          &.on {
            color: #fff;
            background-color: #fa591e;
          }
          &.wait {
            color: #333;
            background-color: #eee;
          }
        }
        .sendCode:hover {
          background-color: rgb(221, 221, 221);
        }
      }
    }
    .submitBtn {
      float: right;
      margin-right: 40px;
      margin-bottom: 40px;
    }
  }
}
</style>
