<template>
  <div class="Lottery" v-title="'彩票'">
    <my-kefu></my-kefu>
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <div class="slider-container">
      <div
        class="slider-content"
        v-if="LotterygameList"
        @mouseenter="stopChange()"
        @mouseleave="startChange()"
      >
        <div
          class="slider"
          v-for="(item, i) in LotterygameList.banner"
          :key="i"
          :class="[
            { active: activeIndex === i },
            {
              prev:
                activeIndex - 1 < 0
                  ? LotterygameList.banner.length - 1 === i
                  : activeIndex - 1 === i
            },
            {
              next:
                activeIndex + 1 >= LotterygameList.banner.length
                  ? i === 0
                  : activeIndex + 1 === i
            }
          ]"
        >
          <img :src="item.image" alt draggable="false" />
          <div
            @click="goLeft()"
            :class="[
              {
                mask1:
                  activeIndex - 1 < 0
                    ? LotterygameList.banner.length - 1 === i
                    : activeIndex - 1 === i
              }
            ]"
          ></div>
          <div
            @click="goRight()"
            :class="[
              {
                mask2:
                  activeIndex + 1 >= LotterygameList.banner.length
                    ? i === 0
                    : activeIndex + 1 === i
              }
            ]"
          ></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div
        class="lists"
        :style="
          `background: url(${commonUrl()}lottery/lottery-bg.png) no-repeat`
        "
      >
        <div class="w1200">
          <div class="left" v-if="LotterygameList && LotterygameList.lottery">
            <!--<div class="wait" @click="jumpUrl(lotteryUrl)">-->
            <!--<span>敬请期待</span>-->
            <!--</div>-->
            <div class="title flexS">
              <img :src="LotterygameList.lottery.ico" alt draggable="false" />
              <span>{{ LotterygameList.lottery.title }}</span>
            </div>
            <ul>
              <li v-for="(item, i) in LotterygameList.lottery.lottery" :key="i">
                <span class="tit">{{ item.gameTitle }}</span>
                <div class="box">
                  <a
                    @click="jumpLottery(itmes.id)"
                    v-for="(itmes, i) in item.gameData"
                    :key="i"
                    >{{ itmes.title }}</a
                  >
                </div>
              </li>
            </ul>
          </div>
          <div class="right" v-if="LotterygameList">
            <div
              class="QG"
              v-if="LotterygameList.recommendQG.recommendQG.length > 0"
            >
              <div class="title">
                <span
                  :style="
                    `background: url(${commonUrl()}lottery/qg.png) no-repeat 16px`
                  "
                  >{{ LotterygameList.recommendQG.title }}</span
                >
              </div>
              <div class="centen">
                <span class="tit">{{ LotterygameList.recommendQG.title }}</span>
                <div class="lottery_list">
                  <a
                    v-for="(item, i) in LotterygameList.recommendQG.recommendQG"
                    :key="i"
                    @click="playGame(item.link)"
                    >{{ item.title }}</a
                  >
                </div>
              </div>
            </div>
            <div
              class="VR"
              v-if="LotterygameList.recommendVR.recommendVR.length > 0"
            >
              <div class="title">
                <span
                  :style="
                    `background: url(${commonUrl()}lottery/vr.png) no-repeat 16px`
                  "
                  >{{ LotterygameList.recommendVR.title }}</span
                >
              </div>
              <div class="centen">
                <span class="tit">{{ LotterygameList.recommendVR.title }}</span>
                <div class="lottery_list">
                  <a
                    v-for="(item, i) in LotterygameList.recommendVR.recommendVR"
                    :key="i"
                    @click="playGame(item.link)"
                    >{{ item.title }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { exchangeAllToLottery, lotteryHall } from "../../api";
export default {
  name: "Lottery",
  data() {
    return {
      bannerTimer: null,
      timeout: null,
      ifStop: false,
      activeIndex: 1,
      banner: [],
      LotterygameList: null,
      lotteryUrl: "/api/auth/sLogin"
    };
  },
  computed: {
    ...mapGetters([
      // "LotterygameList",
      "total",
      "title",
      "loading"
    ])
  },
  created() {
    this.SET_GAME_LIST_LOTTERY("");
    this.$store.commit("CHANGE_LOADING", 1);
    lotteryHall().then(res => {
      console.log(res, "吉祥游戏列表11");
      if (res.status) {
        this.banner = res.data.banner;
        this.LotterygameList = res.data;
        console.log(
          this.LotterygameList,
          this.LotterygameList.length,
          "this.LotterygameList"
        );
        this.$nextTick(() => {
          this.changeBanner();
        });
      } else {
        return this.$message({
          type: "error",
          showClose: true,
          message: "暂无游戏记录",
          duration: 1000
        });
      }
    });
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.bannerTimer);
    });
  },
  methods: {
    ...mapActions(["serchGames", "lotteryHalls"]),
    ...mapMutations(["CHANGE_LOADING", "SET_GAME_LIST_LOTTERY"]),
    jumpLottery(gameId) {
      if (!this.$store.getters.userInfo) {
        return this.$message.error({
          message: "请登录后开始游戏",
          showClose: true,
          duration: 1000,
          center: true
        });
      }
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)"
      });
      exchangeAllToLottery().then(res => {
        loading.close();
        console.log(res, "exchangeAllToLottery");
        let w = window.screen.width * 0.99;
        let h = window.screen.height * 0.85;
        var temp =
          "menubar=no,toolbar=no,directories=no,scrollbars=yes,resizable=no,location=no";
        window.open(
          this.lotteryUrl + "/gameId/" + gameId,
          "",
          temp + ", height=" + h + ", width=" + w + ", top=20, left=10"
        );
      });
    },
    toLink(link) {
      if (!this.$store.getters.userInfo) {
        return this.$message.error({
          message: "请登录后开始游戏",
          showClose: true,
          duration: 1000,
          center: true
        });
      }
      window.open(link);
    },
    changeBanner() {
      let that = this;
      let MaxLength = this.LotterygameList.banner.length;
      this.bannerTimer = setInterval(Carousel, 6000);
      function Carousel() {
        if (that.ifStop) return;
        that.activeIndex++;
        if (that.activeIndex >= MaxLength) {
          that.activeIndex = 0;
        }
      }
    },
    stopChange() {
      this.ifStop = true;
    },
    startChange() {
      this.ifStop = false;
    },
    goLeft() {
      let MaxLength = this.LotterygameList.banner.length;
      this.activeIndex--;
      if (this.activeIndex < 0) {
        this.activeIndex = MaxLength - 1;
      }
    },
    goRight() {
      let MaxLength = this.LotterygameList.banner.length;
      this.activeIndex++;
      if (this.activeIndex >= MaxLength) {
        this.activeIndex = 0;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.Lottery {
  padding-top: 41px;
  color: #fff;
  .slider-container {
    width: 100%;
    height: 400px;
    position: relative;
    > img {
      position: absolute;
      width: 37px;
      height: 67px;
      top: 150px;
      z-index: 10;
    }
    .left {
      left: 200px;
    }
    .right {
      right: 200px;
    }
    .slider-content {
      position: relative;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      margin: 0;
      padding: 0;
      background-size: inherit !important;
      overflow: hidden;

      .slider {
        width: 1000px;
        height: 404px;
        position: absolute;
        top: 0;
        left: 50%;
        overflow: hidden;
        transition: 500ms all ease-in-out;
        transform: translate3d(-50%, 0, 0);
        z-index: 1;
        opacity: 0;
        &.active {
          transform: translate3d(-50%, 0, 100px);
          opacity: 1;
          z-index: 3;
        }
        &.prev {
          transform: translate3d(-150%, 0, -200px);
          opacity: 1;
          z-index: 1;
        }
        &.next {
          transform: translate3d(50%, 0, -200px);
          opacity: 1;
          z-index: 2;
        }
        img {
          width: 100%;
          height: 100%;
        }
        img:hover {
          transform: scale(1.06);
          transition: all 0.4s 0.1s;
        }
      }
      // .mask {
      //   position: absolute;
      //   width: 50%;
      //   height: 100%;
      //   top: 0;
      //   background: rgba(0, 0, 0, 0.6);
      //   cursor: pointer;
      // }
      .mask1 {
        left: 500px;
        position: absolute;
        width: 50%;
        height: 100%;
        top: 0;
        background: rgba(0, 0, 0, 0.6);
        cursor: pointer;
      }
      .mask2 {
        right: 500px;
        position: absolute;
        width: 50%;
        height: 100%;
        top: 0;
        background: rgba(0, 0, 0, 0.6);
        cursor: pointer;
      }
      .sliderCode {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translate(-50%);
        z-index: 4;
        text-align: center;
        li {
          width: 15px;
          height: 15px;
          background-color: rgba(255, 255, 255, 0.7);
          margin: 0 5px;
          float: left;
          border-radius: 50%;
        }
        .active {
          background: none;
          position: relative;
          i {
            color: white;
            position: absolute;
            top: -55%;
            left: -30%;
          }
        }
      }
    }
  }
  .content {
    .lists {
      margin: auto;
      background-size: 100% 100% !important;
      .w1200 {
        margin: auto;
        width: 1200px;
        padding: 40px 0;
        overflow: hidden;
        .left {
          width: 720px;
          float: left;
          margin-right: 20px;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
          .wait {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            span {
              display: inline-block;
              background-color: #747474;
              padding: 10px 30px;
              border-radius: 30px;
            }
          }
          .title {
            background: linear-gradient(#fe8435, #fd7f34);
            font-size: 18px;
            line-height: 48px;
            img {
              width: 42px;
              height: 42px;
              margin-left: 20px;
            }
            span {
              display: inline-block;
              text-indent: 10px;
              background-size: 35px !important;
            }
          }
          ul {
            overflow: hidden;

            li {
              float: left;
              width: 320px;
              padding: 20px;
              border-bottom: 1px solid #5c5268;
              min-height: 137px;
              overflow: hidden;
              position: relative;
              .tit {
                font-size: 15px;
                font-weight: 600;
                display: inline-block;
                width: 100%;
              }
              a {
                color: #fff;
                display: inline-block;
                background-color: #686073;
                width: 93px;
                margin-top: 20px;
                text-align: center;
                margin-right: 20px;
                line-height: 38px;
                white-space: nowrap;
                cursor: pointer;
              }
              a:nth-child(3n + 3) {
                margin-right: 0;
              }
              a:hover {
                background-color: #fe8435;
              }
            }
            li:nth-child(2n + 1) {
              border-right: 1px solid #5c5268;
              width: 319px;
            }
            li:nth-child(1),
            li:nth-child(2) {
              height: 194px;
            }
            li:nth-child(5),
            li:nth-child(6) {
              border-bottom: none;
            }
            li:hover {
              background-color: #110520;
            }
            .box {
              height: 194px;
              overflow: hidden;
            }
            li:nth-child(1):hover {
              overflow: unset;
              border-bottom: 0;
              .box {
                padding-left: 20px;
                padding-bottom: 20px;
                position: absolute;
                left: 0;
                height: auto;
                background-color: #110520;
                z-index: 1;
                overflow: unset;
              }
            }
          }
        }
        .right {
          width: 460px;
          float: left;
          .QG {
            background-color: #e3132b;
            .title {
              background: #bc041a;
              font-size: 18px;
              line-height: 48px;
              span {
                display: inline-block;
                text-indent: 80px;
              }
            }
            .centen {
              padding: 20px;
              font-size: 15px;
              font-weight: 600;
              display: inline-block;
              width: 420px;
              .lottery_list {
                overflow: hidden;
                a {
                  color: #fff;
                  display: inline-block;
                  background-color: #e94154;
                  border: 1px solid #d80000;
                  width: 91px;
                  margin-top: 15px;
                  text-align: center;
                  margin-right: 16px;
                  line-height: 38px;
                  cursor: pointer;
                }
                a:nth-child(4n + 4) {
                  margin-right: 0;
                }
                a:hover {
                  background-color: #e3132b;
                }
              }
            }
          }
          .QG:hover {
            background-color: #c8031a;
          }
          .VR {
            background-color: #870bff;
            margin-top: 27px;
            .title {
              background: #6704c7;
              font-size: 18px;
              line-height: 48px;
              span {
                display: inline-block;
                text-indent: 80px;
              }
            }
            .centen {
              padding: 20px;
              font-size: 15px;
              font-weight: 600;
              display: inline-block;
              width: 420px;
              .lottery_list {
                overflow: hidden;
                a {
                  color: #fff;
                  display: inline-block;
                  background-color: #9e3aff;
                  border: 1px solid #b76dff;
                  width: 91px;
                  margin-top: 17px;
                  text-align: center;
                  margin-right: 16px;
                  line-height: 38px;
                  white-space: nowrap;
                  cursor: pointer;
                }
                a:nth-child(4n + 4) {
                  margin-right: 0;
                }
                a:hover {
                  background-color: #870bff;
                }
              }
            }
          }
          .VR:hover {
            background-color: #7304e0;
          }
        }
      }
    }
  }
}
</style>
