<template>
  <div class="RealPerson" v-title="'体育'">
    <my-kefu></my-kefu>
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <div
      class="content"
      :style="
        `background: url(${staticZhpUrl}sports/sport_02.png) no-repeat #12151b`
      "
    >
      <div class="w900">
        <div
          class="title"
          :style="
            `background: url(${staticZhpUrl}sports/sport_09.png) no-repeat`
          "
        ></div>
        <div class="navcontent" v-if="homeToSports">
          <div
            @click="playGame(item.link)"
            class="btn"
            v-for="(item, i) in homeToSports"
            :key="i"
            :style="
              i == 0
                ? `background: url(${staticZhpUrl}sports/sport_05.png) no-repeat left 0`
                : `background: url(${staticZhpUrl}sports/sport_03.png) no-repeat right 0`
            "
          >
            <span
              class="goto"
              :style="
                `background: url(${staticZhpUrl}sports/sport_13.png) no-repeat left 0`
              "
            >
              <div class="pro">
                <div class="img">
                  <img :src="item.img" alt />
                </div>
                <i>{{ item.title }}</i>
              </div>
              <p>立即游戏</p>
            </span>
          </div>
        </div>
      </div>
      <canvas id="sp-bg-1"></canvas>
      <canvas id="sp-bg-2"></canvas>
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
      searchBarFixed: ""
    };
  },
  computed: {
    ...mapGetters(["homeToSports", "staticZhpUrl"])
  },
  created() {
    this.$nextTick(() => {
      var canvas = document.querySelector("#sp-bg-1");
      var canvas1 = document.querySelector("#sp-bg-2");
      var w = (canvas.width = canvas1.width = canvas.offsetWidth);
      var h = (canvas.height = canvas1.height = canvas.offsetHeight);
      var ctx = canvas.getContext("2d");
      var ctx2 = canvas1.getContext("2d");
      ctx2.globalCompositeOperation = "copy";
      ctx.globalAlpha = 0.75;
      var starts = [];
      var max = 100;
      for (var i = 0; i < max; i++) {
        starts.push([
          -0.5 * w + w * 15 * Math.random(),
          -h * 2 * Math.random(),
          2.5 * Math.random(),
          0.2 + Math.random()
        ]);
      }
      function draw() {
        ctx2.drawImage(canvas, 0, 0, w, h);
        ctx.clearRect(0, 0, w, h);
        starts.forEach(function(o) {
          ctx.beginPath();
          ctx.arc(o[0], o[1], o[2], 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = "hsla(0,0%,100%," + o[3] + ")";
          ctx.fill();
        });
        ctx.drawImage(canvas1, 0, 0, w, h);
        move();
        requestAnimationFrame(draw);
      }
      function move() {
        starts.forEach(function(o) {
          var r = o[2];
          var s = r * 0.5 + 2;
          o[0] = (o[0] - s + w) % w;
          var y = (o[1] += s);
          o[2] *= 0.999;
          if (y > w || r < 0.05) {
            o[0] = w * Math.random();
            o[1] = (-h / 5) * Math.random();
            o[2] = 2.5 + Math.random();
            o[3] = 0.2 + Math.random();
          }
        });
      }
      requestAnimationFrame(draw);
    });
  }
};
</script>

<style lang="scss" scoped>
.content {
  color: #fff;
  position: relative;
  overflow: hidden;
  margin-top: 41px;
  height: 1160px;
  background-size: 100%;
  .w900 {
    width: 1200px;
    margin: 244px auto;
    position: relative;
  }
  .title {
    background-size: 100% 100%;
    width: 100%;
    height: 291px;
  }
  .navcontent {
    position: absolute;
    z-index: 1;
    background-color: #0f1319;
    width: 1080px;
    height: 476px;
    padding: 40px 60px;
    .btn {
      height: 228px;
      width: 100%;
      background-size: 80% !important;
      cursor: pointer;
      span {
        cursor: pointer;
        display: block;
        float: right;
        width: 20%;
        height: 208px;
        margin-top: 20px;
        position: relative;
        p {
          text-align: center;
          background-color: #444444;
          color: #fff;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 48px;
          line-height: 48px;
          font-size: 15px;
        }
      }
      .pro {
        text-align: center;
        img {
          margin: 30px auto;
          margin-bottom: 14px;
          width: 76px;
        }
        i {
          font-style: normal;
        }
      }
    }
    .btn:hover {
      p {
        background-color: #6d6d6d;
      }
    }
    .btn:last-child {
      background-size: 80%;
      margin-top: 20px;
      span {
        float: left;
        margin-top: 12px;
        height: 210px;
      }
    }
  }
  #sp-bg-1,
  #sp-bg-2 {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: block;
    width: 100%;
    height: 100%;
  }

  #sp-bg-2 {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  }
}
</style>
