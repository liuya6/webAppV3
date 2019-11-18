<template>
  <div class="RealPerson" v-title="'真人'">
    <my-kefu></my-kefu>
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <div
      class="content"
      :style="`background: url(${staticZhpUrl}casino/personBg.png) no-repeat`"
    >
      <div class="wrap w1400">
        <img
          class="person"
          :class="{ fade2: ifFadein }"
          :src="`${staticZhpUrl}casino/${typeKey}.png`"
          alt
          draggable="false"
        />
        <img
          class="live"
          :class="{ fade2: ifFadein }"
          :src="`${staticZhpUrl}casino/${typeKey}LIVE.png`"
          alt
          draggable="false"
        />
        <div class="navcontent" v-if="homeToPerson">
          <div
            class="btn"
            v-for="(item, i) in homeToPerson"
            :key="i"
            @click="change(item.typeKey, i)"
          >
            <span class="goto" :class="{ active: index == i }">
              {{ item.title }}
            </span>
          </div>
        </div>
        <div>
          <div class="rightWrap" :class="{ fade1: ifFadein }">
            <div class="button flexC" @click="playNow()">立即游戏</div>
            <div class="logoBox flexC">
              <img
                class="logo"
                :src="`${staticZhpUrl}casino/${typeKey}logo.png`"
                alt
                draggable="false"
              />
            </div>
            <img
              class="game"
              :src="`${staticZhpUrl}casino/${typeKey}game.png`"
              alt
              draggable="false"
            />
          </div>
        </div>
        <div v-show="typeKey == 'BG'">
          <img
            class="bg0"
            :src="`${staticZhpUrl}casino/BG0.png`"
            alt
            draggable="false"
          />
          <img
            class="bg1"
            :src="`${staticZhpUrl}casino/BG1.png`"
            alt
            draggable="false"
          />
        </div>
        <div v-show="typeKey == 'LeBo'">
          <img
            class="lebo0"
            :src="`${staticZhpUrl}casino/LeBo0.png`"
            alt
            draggable="false"
          />
          <img
            class="lebo1"
            :src="`${staticZhpUrl}casino/LeBo1.png`"
            alt
            draggable="false"
          />
          <img
            class="lebo2"
            :src="`${staticZhpUrl}casino/LeBo2.png`"
            alt
            draggable="false"
          />
        </div>
        <div v-show="typeKey == 'DS'">
          <img
            class="ds0"
            :src="`${staticZhpUrl}casino/LeBo1.png`"
            alt
            draggable="false"
          />
          <img
            class="ds1"
            :src="`${staticZhpUrl}casino/LeBo0.png`"
            alt
            draggable="false"
          />
        </div>
        <div v-show="typeKey == 'BBIN'">
          <img
            class="bbin0"
            :src="`${staticZhpUrl}casino/BBIN0.png`"
            alt
            draggable="false"
          />
          <img
            class="bbin1"
            :src="`${staticZhpUrl}casino/BBIN1.png`"
            alt
            draggable="false"
          />
          <img
            class="bbin2"
            :src="`${staticZhpUrl}casino/BBIN2.png`"
            alt
            draggable="false"
          />
          <img
            class="bbin3"
            :src="`${staticZhpUrl}casino/BBIN3.png`"
            alt
            draggable="false"
          />
          <img
            class="bbin4"
            :src="`${staticZhpUrl}casino/BBIN4.png`"
            alt
            draggable="false"
          />
          <img
            class="bbin5"
            :src="`${staticZhpUrl}casino/BBIN5.png`"
            alt
            draggable="false"
          />
        </div>
        <div v-show="typeKey == 'AG'">
          <img
            class="ag0"
            :src="`${staticZhpUrl}casino/AG0.png`"
            alt
            draggable="false"
          />
          <img
            class="ag1"
            :src="`${staticZhpUrl}casino/AG1.png`"
            alt
            draggable="false"
          />
        </div>
        <div v-show="typeKey == 'OG'">
          <img
            class="og0"
            :src="`${staticZhpUrl}casino/LeBo2.png`"
            alt
            draggable="false"
          />
          <img
            class="og1"
            :src="`${staticZhpUrl}casino/OG0.png`"
            alt
            draggable="false"
          />
        </div>
      </div>
    </div>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RealPerson",
  data() {
    return {
      searchBarFixed: "",
      typeKey: "",
      index: 0,
      ifFadein: true
    };
  },
  computed: {
    ...mapGetters(["homeToPerson", "homeToPerson0", "staticZhpUrl"])
  },
  created() {
    this.typeKey = this.homeToPerson0 || "BG";
  },
  methods: {
    change(typeKey, i) {
      if (this.index == i) return;
      this.ifFadein = false;
      setTimeout(() => {
        this.ifFadein = true;
      }, 0);
      this.typeKey = typeKey;
      this.index = i;
    },
    playNow() {
      this.homeToPerson.forEach(e => {
        if (e.typeKey == this.typeKey) {
          this.playGame(e.link);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  overflow: hidden;
  margin-top: 42px;
  color: #fff;
  // width: 100%;
  // width: 1900px;
  // background: url("/realPerson/personBg.png") no-repeat;
  // background-size: contain;
  .wrap {
    height: 783px;
    position: relative;
    > div {
      > img {
        position: absolute;
      }
    }
    .person {
      position: absolute;
      z-index: 2;
      bottom: 0;
      height: 700px;
    }
    .live {
      position: absolute;
      top: 170px;
      left: -70px;
    }
    .rightWrap {
      width: 520px;
      height: 500px;
      position: absolute;
      top: 250px;
      left: 700px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .logoBox {
        width: 520px;
        height: 233px;
      }
      .game {
        margin: 14px 0 80px 0;
      }
      .button {
        font-size: 16px;
        width: 195px;
        height: 60px;
        box-shadow: 0px 8px 14px 0px rgba(248, 60, 0, 0.4);
        border-radius: 30px;
        margin-bottom: 40px;
        background: linear-gradient(#fe8c00, #f83600);
        cursor: pointer;
      }
    }
    .fade1 {
      animation: personFadein1 0.8s forwards;
    }
    .fade2 {
      animation: personFadein2 0.8s forwards;
    }

    .bg0 {
      left: 40px;
      top: 120px;
      animation: chessFloat0 5s infinite;
    }
    .bg1 {
      left: 460px;
      top: 400px;
      animation: chessFloat1 5s infinite;
    }
    .lebo0 {
      left: 80px;
      top: 190px;
      animation: chessFloat0 5s infinite;
    }
    .lebo1 {
      left: 460px;
      top: 400px;
      animation: chessFloat1 5s infinite;
    }
    .lebo2 {
      left: 110px;
      top: 440px;
      animation: poker1 5s infinite;
    }
    .ds0 {
      left: 40px;
      top: 260px;
      animation: chessFloat0 5s infinite;
    }
    .ds1 {
      left: 410px;
      top: 350px;
      animation: chessFloat1 5s infinite;
    }
    .bbin0 {
      left: 490px;
      top: 250px;
      animation: chessFloat1 5s infinite;
    }
    .bbin1 {
      left: -70px;
      top: 340px;
      animation: poker1 5s infinite;
    }
    .bbin2 {
      left: 470px;
      top: 390px;
      animation: poker2 5s infinite;
    }
    .bbin3 {
      left: -20px;
      z-index: 3;
      top: 470px;
      animation: poker2 5s infinite;
    }
    .bbin4 {
      left: 170px;
      z-index: 3;
      top: 540px;
      animation: chessFloat0 5s infinite;
    }
    .bbin5 {
      left: 380px;
      top: 486px;
      animation: poker1 5s infinite;
    }
    .ag0 {
      left: 530px;
      top: 250px;
      animation: chessFloat0 5s infinite;
    }
    .ag1 {
      left: -10px;
      top: 350px;
      animation: chessFloat1 5s infinite;
    }
    .og0 {
      left: -10px;
      top: 356px;
      animation: chessFloat0 5s infinite;
    }
    .og1 {
      left: 400px;
      top: 390px;
      animation: chessFloat1 5s infinite;
    }
    @keyframes chessFloat0 {
      0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      50% {
        -webkit-transform: translateY(20px);
        transform: translateY(20px);
      }
      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }
    @keyframes chessFloat1 {
      0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      50% {
        -webkit-transform: translateY(-20px);
        transform: translateY(-20px);
      }
      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }
    @keyframes poker1 {
      0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
      }
      50% {
        -webkit-transform: translateX(10px);
        transform: translateX(10px);
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
      }
    }
    @keyframes poker2 {
      0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
      }
      50% {
        -webkit-transform: translateX(-10px);
        transform: translateX(-10px);
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
      }
    }

    .navcontent {
      width: 520px;
      position: absolute;
      top: 100px;
      left: 700px;
      .btn {
        float: left;
        margin-bottom: 10px;
        margin-right: 25px;
        span {
          display: inline-block;
          width: 156px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: #333;
          font-size: 15px;
          background: linear-gradient(#ffffff, #f0f0f0);
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0px 8px 14px 0px #e7e7e7;
        }
        &:nth-child(3n + 3) {
          margin-right: 0;
        }
        &:hover span {
          background: linear-gradient(#fe8c00, #f83600);
          color: #fff;
        }
        .active {
          box-shadow: 0px 8px 14px 0px rgba(248, 60, 0, 0.4);
          background: linear-gradient(#fe8c00, #f83600);
          color: #fff;
        }
      }
    }
  }
}
</style>
