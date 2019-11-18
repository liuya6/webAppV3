<template>
  <transition name="fadeUp">
    <div class="playStart" @click="close" v-show="playStartShow">
      <div class="playBox" @click.stop>
        <div>
          余额提醒
          <i class="iconfont closeI" @click="close">&#xe60e;</i>
        </div>
        <div v-if="userInfo">
          <span>您的余额</span>
          <span>{{ userInfo.coin }}</span>
          <i class="iconfont" @click="Refresh" :class="{ refresh: refreshFlag }"
            >&#xe728;</i
          >
        </div>
        <div class="button flexC" @click="deposit">
          <i class="iconfont">&#xe71c;</i>
          <span>去存款</span>
        </div>
        <div class="button flexC" @click="play">
          <i class="iconfont">&#xe747;</i>
          <span>进入游戏</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { userDetail } from "@/api";
export default {
  name: "playStart",
  data() {
    return {
      refreshFlag: false
    };
  },
  computed: {
    ...mapGetters(["playStartShow", "userInfo", "gameUrl"])
  },
  methods: {
    Refresh() {
      this.refreshFlag = true;
      userDetail().then(res => {
        if (res.status) {
          this.$message({
            type: "success",
            duration: 1000,
            message: "刷新成功",
            showClose: true,
            center: true
          });
          this.refreshFlag = false;
          this.$store.commit("SET_USER_INFO", res.data);
        } else {
          this.$store.commit("SET_USER_INFO", "");
        }
      });
    },
    play() {
      this.winOpen(this.gameUrl);
    },
    deposit() {
      this.$store.commit("SET_PLAY_START_SHOW", false);
      console.log(this.$parent.$children[1], "11111111111111");
      this.$parent.userShow = true;
      this.$parent.$children[1].componentsName = "Recharge";
    },
    close() {
      this.$store.commit("SET_PLAY_START_SHOW", false);
    }
  }
};
</script>

<style scoped lang="scss">
.playStart {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  .playBox {
    // border-radius: 10px;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    background-color: #fff;
    .closeI {
      position: absolute;
      right: 10px;
      // top: 0px;
      font-size: 24px;
      cursor: pointer;
    }
    > div {
      &:nth-child(1) {
        line-height: 40px;
        background: #fea24d;
        color: #fff;
        text-align: center;
        font-size: 16px;
      }
      &:nth-child(2) {
        margin-top: 20px;
        padding: 0 20px;
        span {
          display: inline-block;
          text-align: center;
          line-height: 40px;
          font-size: 16px;
          &:nth-child(1) {
            width: 110px;
            background: linear-gradient(to left, #606c88, #3f4c6b);
            color: #fff;
          }
          &:nth-child(2) {
            width: 150px;
            background-color: rgb(221, 221, 221);
            color: #fb612b;
          }
        }
        i {
          display: inline-block;
          font-size: 24px;
          margin-left: 18px;
          color: #333333;
          transition: 0.5s;
          cursor: pointer;
          &.refresh {
            color: #fea24d;
            animation: rotate 0.5s infinite ease;
          }
        }
      }
    }
    .button {
      width: 300px;
      margin-left: 20px;
      margin-top: 20px;
      height: 40px;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
      i {
        font-size: 24px;
        margin-right: 10px;
      }
      span {
      }
      &:nth-child(3) {
        background: linear-gradient(to left, #5f79ff, #54b5ff);
      }
      &:nth-child(4) {
        background: linear-gradient(to left, #fe9739, #fd6c30);
        margin-bottom: 20px;
      }
    }
  }
}
</style>
