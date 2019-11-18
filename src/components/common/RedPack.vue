<template>
  <div class="redPack" v-if="allConfig.redPacket && allConfig.redPacket.isOpen">
    <div class="redPack-show" v-show="redPackShowFlag">
      <div @click="goStart">
        <img src="../../assets/redPack/redPack.png" alt draggable="false" />
      </div>
      <div>
        <img src="../../assets/redPack/redPack-bg.png" alt draggable="false" />
      </div>
      <div class="close" @click="closeRedPack">
        <img src="../../assets/redPack/icon-close.png" alt draggable="false" />
      </div>
    </div>
    <transition name="fadeUp">
      <div class="redPackStart" v-show="start" @click.stop="close">
        <div class="redPack-cai">
          <i class="close" @click="close">
            <img
              src="../../assets/redPack/icon-close.png"
              alt
              draggable="false"
            />
          </i>
          <div class="cai" v-if="getShow" key="get">
            <div @click.stop="getRedPack">
              <img src="../../assets/redPack/icon3.png" alt draggable="false" />
            </div>
            <!--            <div>-->
            <!--              您还有<span>5</span>次抽奖机会-->
            <!--            </div>-->
          </div>
          <div class="successBox" v-if="successShow" key="success">
            <div class="success">
              <div :class="{ open: open }">
                <img
                  src="../../assets/redPack/money.png"
                  alt
                  draggable="false"
                />
              </div>
              <div>
                <p>恭喜您获得</p>
                <span>{{ successMoney }}元</span>
              </div>
              <div @click.stop="goOn">
                <img
                  src="../../assets/redPack/icon1.png"
                  alt
                  draggable="false"
                />
              </div>
            </div>
            <div class="success-light"></div>
          </div>
          <div class="fail" v-if="failShow" key="fail">
            <div>
              <p>很遗憾</p>
              <span>还差一点就中奖了呦！</span>
            </div>
            <div @click.stop="goOn">
              <img src="../../assets/redPack/icon1.png" alt draggable="false" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { redPacket, grabRedPacket } from "../../api";
import { mapGetters } from "vuex";
export default {
  name: "redPack",
  data() {
    return {
      start: false,
      redPackDetail: "",
      redID: "",
      getShow: false,
      successShow: false,
      failShow: false,
      successMoney: "",
      open: false,
      once: true
    };
  },
  // created() {
  //   console.log(this.userInfo, this.allConfig, "==========");
  // },
  computed: {
    ...mapGetters(["userInfo", "allConfig", "redPackShowFlag"])
  },
  methods: {
    goStart() {
      console.log(this.userInfo);
      if (!this.userInfo || !this.userInfo.username) {
        return this.$emit("goLogin");
      }
      redPacket().then(res => {
        console.log(res);
        if (res.code === 1001) {
          return false;
        }
        if (res.status) {
          this.redPackDetail = res.data;
          this.redID = res.data.id;
          this.start = true;
          this.goOn();
        } else {
          this.$message({
            type: "error",
            showClose: true,
            message: "红包活动已结束",
            duration: 1000
          });
        }
      });
    },
    getRedPack() {
      if (this.once) {
        this.once = false;
        grabRedPacket({ id: this.redID }).then(res => {
          this.once = true;
          console.log(res);
          if (res.status) {
            this.successMoney = res.data;
            this.getShow = false;
            this.successShow = true;
            this.failShow = false;
            this.open = true;
          } else {
            this.$message({
              type: "error",
              showClose: true,
              message: res.msg,
              duration: 1000
            });
          }
        });
      }
    },
    goOn() {
      this.getShow = true;
      this.successShow = false;
      this.failShow = false;
      // this.open = false;
    },
    close() {
      this.start = false;
      this.getShow = false;
      this.successShow = false;
      this.failShow = false;
      // this.open = false;
    },
    closeRedPack() {
      this.$store.commit("SET_RED_PACK_SHOW", 0);
    }
  }
};
</script>

<style scoped lang="scss">
.redPack {
  .redPack-show {
    position: fixed;
    left: 100px;
    bottom: 50px;
    width: 200px;
    height: 200px;
    div {
      cursor: pointer;
      &:nth-child(1) {
        position: absolute;
        top: 0;
        z-index: 2;
      }
      &:nth-child(2) {
        position: absolute;
        top: -28px;
        left: -22px;
        z-index: 1;
        animation: scale 2.5s infinite;
      }
    }
    .close {
      position: absolute;
      right: -50px;
      top: -50px;
      transition: 0.3s;
      &:hover {
        transform: rotate(90deg);
      }
    }
  }
  .redPackStart {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    .redPack-cai {
      width: 550px;
      height: 500px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      .close {
        position: absolute;
        right: 0;
        top: 0;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          transform: rotate(90deg);
        }
      }
      .cai {
        width: 319px;
        height: 418px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
        z-index: 2;
        background: url("../../assets/redPack/redenvelope1.png") no-repeat;
        background-size: 100% 100%;
        div {
          &:nth-child(1) {
            position: absolute;
            left: 50%;
            top: 60px;
            transform: translate(-50%);
            animation: scaleCai 0.8s ease-in-out infinite;
            cursor: pointer;
          }
          &:nth-child(2) {
            margin-top: 250px;
            text-align: center;
            font-size: 22px;
            color: yellow;
            span {
              color: greenyellow;
              padding: 0 5px;
            }
          }
        }
      }
      .successBox {
        width: 559px;
        height: 550px;
        overflow: hidden;
        .success {
          width: 319px;
          height: 418px;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%);
          z-index: 2;
          background: url("../../assets/redPack/redenvelope2.png") no-repeat;
          background-size: 100% 100%;
          div {
            &:nth-child(1) {
              position: absolute;
              top: -50px;
              &.open {
                animation: scale 1s;
              }
            }
            &:nth-child(2) {
              font-size: 35px;
              text-align: center;
              margin-top: 200px;
              color: yellow;
              span {
                color: #fff;
              }
            }
            &:nth-child(3) {
              cursor: pointer;
              width: 236px;
              margin: 30px auto 0;
            }
          }
        }
        .success-light {
          background: url("../../assets/redPack/light1.png") no-repeat;
          background-size: 100%;
          width: 400px;
          height: 400px;
          position: absolute;
          z-index: 0;
          top: -50px;
          left: 50%;
          transform: translate(-50%);
          animation: rotate-360 30s infinite;
        }
      }
      .fail {
        width: 319px;
        height: 418px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
        z-index: 2;
        background: url("../../assets/redPack/redenvelope3.png") no-repeat;
        background-size: 100% 100%;
        > div {
          &:nth-child(1) {
            margin-top: 180px;
            text-align: center;
            p {
              font-size: 45px;
              color: #fff;
            }
            span {
              color: yellow;
              font-size: 20px;
              font-weight: bold;
              margin-top: 5px;
            }
          }
          &:nth-child(2) {
            cursor: pointer;
            width: 236px;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translate(-50%);
          }
        }
      }
    }
  }
}
@keyframes scale {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scaleCai {
  0% {
    transform: translate(-50%) scale(1.1);
  }
  50% {
    transform: translate(-50%) scale(1);
  }
  100% {
    transform: translate(-50%) scale(1.1);
  }
}
@keyframes rotate-360 {
  0% {
    transform: translate(-50%) rotate(0);
  }
  100% {
    transform: translate(-50%) rotate(360deg);
  }
}
</style>
