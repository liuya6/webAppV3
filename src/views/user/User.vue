<template>
  <transition name="fade">
    <div class="user" v-if="userShow">
      <div class="content">
        <i class="iconfont" @click="close">&#xe727;</i>
        <div class="left">
          <h3>
            <p>会员中心</p>
            <span>Member Center</span>
          </h3>
          <ul>
            <li
              v-for="(item, i) in TabList"
              :key="i"
              :class="{ on: item.componentsName === componentsName }"
              @click="changeTab(item.componentsName, item.testNo)"
            >
              <!--
                v-if="item.componentsName==='WashCode' && allConfig.enableWashcode =='1'"
              -->
              <i class="iconfont" v-html="item.icon"></i>
              <span>{{ item.title }}</span>
              <div
                class="messageRemind flexC"
                v-if="item.componentsName == 'Message' && userInfo.unread > 0"
              >
                <span>{{ userInfo.unread }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="right">
          <keep-alive>
            <components :is="componentsName"></components>
          </keep-alive>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const UserDetail = () => import("@/components/userCenter/UserDetail");
const Security = () => import("@/components/userCenter/Security");
const BankCenter = () => import("@/components/userCenter/BankCenter");
const Recharge = () => import("@/components/userCenter/Recharge");
const Withdraw = () => import("@/components/userCenter/Withdraw");
const Amount = () => import("@/components/userCenter/Amount");
const Bill = () => import("@/components/userCenter/Bill");
const Activity = () => import("@/components/userCenter/Activity");
const Record = () => import("@/components/userCenter/Record");
const WashCode = () => import("@/components/userCenter/WashCode");
const Notice = () => import("@/components/userCenter/Notice");
const Message = () => import("@/components/userCenter/Message");
const Help = () => import("@/components/userCenter/Help");
const Balance = () => import("@/components/userCenter/Balance");
const Promotion = () => import("@/components/userCenter/Promotion");
const Template = {
  UserDetail,
  Security,
  BankCenter,
  Recharge,
  Withdraw,
  Amount,
  Bill,
  Activity,
  Record,
  WashCode,
  Notice,
  Message,
  Help,
  Balance,
  Promotion
};
const TabList = [
  {
    title: "个人资料",
    icon: "&#xe712;",
    componentsName: "UserDetail",
    testNo: true
  },
  {
    title: "安全中心",
    icon: "&#xe711;",
    componentsName: "Security",
    testNo: true
  },
  {
    title: "银行卡管理",
    icon: "&#xe719;",
    componentsName: "BankCenter",
    testNo: true
  },
  {
    title: "充值",
    icon: "&#xe71c;",
    componentsName: "Recharge",
    testNo: true
  },
  {
    title: "提现",
    icon: "&#xe71b;",
    componentsName: "Withdraw",
    testNo: true
  },
  {
    title: "额度转换",
    icon: "&#xe716;",
    componentsName: "Amount",
    testNo: true
  },
  {
    title: "余额宝",
    icon: "&#xe62a;",
    componentsName: "Balance",
    testNo: true
  },
  {
    title: "实时洗码",
    icon: "&#xe68f;",
    componentsName: "WashCode"
  },
  {
    title: "账变明细",
    icon: "&#xe715;",
    componentsName: "Bill"
  },
  {
    title: "活动申请",
    icon: "&#xe717;",
    componentsName: "Activity",
    testNo: true
  },
  {
    title: "游戏记录",
    icon: "&#xe718;",
    componentsName: "Record"
  },
  {
    title: "公告列表",
    icon: "&#xe713;",
    componentsName: "Notice"
  },
  {
    title: "个人消息",
    icon: "&#xe714;",
    componentsName: "Message"
  },
  {
    title: "团队管理",
    icon: "&#xe604;",
    componentsName: "Promotion"
  },
  {
    title: "帮助中心",
    icon: "&#xe71a;",
    componentsName: "Help"
  }
];
export default {
  name: "",
  data() {
    return {
      TabList,
      componentsName: "UserDetail"
    };
  },
  props: {
    userShow: Boolean
  },
  computed: {
    ...mapGetters(["userInfo", "active", "allConfig"]),
    isTest() {
      return this.userInfo.parentId == 312;
    }
  },
  watch: {
    active(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$children[0].activeName = newVal;
        }, 100);
      }
    },
    userShow(newVal) {
      if (newVal) {
        let washCodeIndex, PromotionIndex;
        for (let i = 0; i < this.TabList.length; i++) {
          let itemOne = this.TabList[i];
          if (itemOne.componentsName === "WashCode") {
            if (this.allConfig.enableWashcode !== "1") {
              this.TabList.splice(i, 1);
            }
          }
          console.log(this.userInfo.type, "this.userInfo.type");
          if (itemOne.componentsName === "Promotion") {
            if (this.userInfo.type != "3") {
              this.TabList.splice(i, 1);
            }
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(["userDetails"]),
    changeTab(name, testNo) {
      if (this.isTest && testNo) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "试玩账号无法进入",
          duration: 1000
        });
      }
      this.cancel();
      this.$store.commit("SET_TRANSFER_OUT_SHOW", 0);
      this.$store.commit("SET_TRANSFER_IN_SHOW", 0);
      this.componentsName = name;
    },
    close() {
      this.$parent.userShow = false;
    }
  },
  components: {
    ...Template
  }
};
</script>

<style scoped lang="scss">
.user {
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
    width: 1100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 10px;
    > i {
      display: block;
      position: absolute;
      right: 16px;
      top: 14px;
      font-size: 30px;
      cursor: pointer;
      z-index: 999;
      &:hover {
        color: #fd7632;
      }
    }
    .left {
      width: 200px;
      min-height: 740px;
      color: white;
      background: linear-gradient(to top, #f83700, #fe9739);
      padding-bottom: 20px;
      h3 {
        height: 60px;
        text-align: center;
        p {
          padding-top: 13px;
          font-size: 18px;
        }
        span {
          font-size: 12px;
          color: #fc6e00;
        }
      }
      li {
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        cursor: pointer;
        position: relative;
        .messageRemind {
          position: absolute;
          right: 50px;
          top: 7px;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background-color: #60c961;
          span {
            font-size: 12px;
            color: #fff;
          }
        }
        &:hover {
          background: #fff;
          color: #fa591e;
        }
        &.on {
          background: #fff;
          color: #fa591e;
        }
        i {
          display: inline-block;
          vertical-align: middle;
          font-size: 20px;
          margin-left: 40px;
          margin-right: 20px;
        }
      }
    }
    .right {
      flex: 1;
      width: 900px;
      background-color: #fff;
      position: relative;
      display: flex;
    }
  }
}
</style>
