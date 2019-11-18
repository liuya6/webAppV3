<template>
  <div class="chess" v-title="'捕鱼'">
    <my-kefu></my-kefu>
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <div
      class="content"
      id="fishingContent"
      :style="
        `background: url(${commonUrl()}fishing/bg.png) no-repeat 0 0 #22262a`
      "
    >
      <img
        class="logo"
        :src="commonImg('fishing/logo.png')"
        alt
        draggable="false"
      />
      <ul class="fishList flexC">
        <li
          :class="'li' + (i + 1)"
          v-for="(item, i) in fishList"
          :key="i"
          @click="playGame(item.link)"
        >
          <div class="fishBox">
            <img
              class="fishImg"
              :src="commonImg('fishing/ballBg.png')"
              alt
              draggable="false"
            />
            <img class="fishTo" :src="item.bigImg" alt draggable="false" />
          </div>
          <div class="titleBox">
            <img
              class="title"
              :src="commonImg('fishing/title.png')"
              alt
              draggable="false"
            />
            <p>{{ item.title }}</p>
            <div class="shadow">开始游戏</div>
          </div>
        </li>
      </ul>
      <canvas id="bubbles"></canvas>
      <div id="bubble-field"></div>
      <div class="fish">
        <div class="top-fin"></div>
        <div class="fish-body"></div>
        <div class="tail-fin"></div>
        <div class="side-fin"></div>
        <div class="scale scale1"></div>
        <div class="scale scale2"></div>
        <div class="scale scale3"></div>
      </div>
      <div class="fish blue-fish">
        <div class="top-fin"></div>
        <div class="fish-body"></div>
        <div class="tail-fin"></div>
        <div class="side-fin"></div>
        <div class="scale scale1"></div>
        <div class="scale scale2"></div>
        <div class="scale scale3"></div>
      </div>
    </div>
    <my-foot></my-foot>
  </div>
</template>

<script>
// import { mapGetters, mapActions, mapMutations } from "vuex";
import { getGroupList } from "../../api";
export default {
  name: "BY",
  data() {
    return {
      fishList: [],
      searchGameTitle: ""
    };
  },
  created() {
    getGroupList({ classify: "BY" }).then(res => {
      console.log(res, "res");
      this.fishList = res.data;
    });
    this.$nextTick(() => {
      this.fish();
      (function(window) {
        let winsize = {
          width: window.innerWidth,
          height: window.innerHeight
        }; //用于记录屏幕的大小
        // console.log(winsize, "winsize");
        let bubbles = {
          canvas: null,
          ctx: null,
          mousex: winsize.width - 30,
          mousey: winsize.height - 30,
          cntr: 0,
          circleArr: new Array(), //用于气泡队列
          requestTd: undefined,
          contentBox: document.querySelector("#fishingContent"),
          init: function() {
            this.canvas = document.getElementById("bubbles"); //获取canvas
            this.ctx = this.canvas.getContext("2d"); //2d绘画模式
            this.canvas.width = this.contentBox.offsetWidth;
            this.canvas.height = this.contentBox.offsetHeight;
            //浏览器resize调整canvas画布的大小
            let that = this;
            this.debounceResize = function() {
              winsize = {
                width: window.innerWidth,
                height: window.innerHeight
              };
              that.canvas.height = that.contentBox.offsetHeight; //winsize.height;
              that.canvas.width = that.contentBox.offsetWidth; //winsize.width;
              // console.log(that.contentBox,that.contentBox.getBoundingClientRect(),'1111111');
            };
            window.addEventListener("resize", this.debounceResize);
          },
          loop: function() {
            //每一帧调用的方法（循环）
            this.requestTd = requestAnimationFrame(bubbles.loop.bind(this));
            //requestID 是一个长整型非零值,作为一个唯一的标识符.你可以将该值作为参数传给
            //这就要求你的动画函数执行会先于浏览器重绘动作。通常来说，被调用的频率是每秒60次
            this.update(); //更新气泡的位置
            this.render(); //重新绘制
          },
          update: function() {
            if (this.cntr++ % 1 == 0) {
              //多少次循环，执行添加一个圆
              this.createCircle();
            }
            for (let circle in this.circleArr) {
              circle = this.circleArr[circle];
              let max = 2,
                min = -2;
              if (this.mousex <= winsize.width / 2 - winsize.width * 0.1) {
                //当处于左边
                min = -4;
              } else if (
                this.mousex >=
                winsize.width / 2 + winsize.width * 0.1
              ) {
                //当处于右边
                max = 4;
              }
              circle.x += Math.floor(Math.random() * (max - min + 1)) + min; //floor向下取整，泡泡的左右移动，当处于屏幕左右两边上升过程有偏移
              circle.y -= Math.random() * 15;
            }
            //当泡泡跑出可视范围则把该泡泡从队列中去除
            if (
              this.circleArr.length > 2 &&
              (this.circleArr[0].x + this.circleArr[0].s > winsize.width ||
                this.circleArr[0].x + this.circleArr[0].s < 0 ||
                this.circleArr[0].y + this.circleArr[0].s > winsize.height ||
                this.circleArr[0].y + this.circleArr[0].s < 0)
            ) {
              this.circleArr.shift(); //方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
            }
          },
          render: function() {
            //遍历队列，调用画圆方法
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear
            for (let circle in this.circleArr) {
              let current = this.circleArr[circle];
              this.drawCircle(current.x, current.y, current.s);
            }
          },
          createCircle: function() {
            //间隔时间在队列中添加气泡圆
            this.circleArr[this.circleArr.length] = {
              x: this.mousex,
              y: this.mousey,
              s: (Math.random() * winsize.height) / 50
            };
          },
          drawCircle: function(x, y, radius) {
            //画圆方法
            this.ctx.fillStyle = "rgba(255,255,255,0.5)";
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            this.ctx.fill();
          },
          start: function() {
            //开始画圆
            if (!this.requestId) {
              document.onmousemove = this.getMouseCoordinates.bind(this);
              this.loop();
            }
          },
          stop: function() {
            //停止画圆
            if (this.requestId) {
              window.canclelAnimationFrame(this.requestId);
              this.requestId = undefined;
              document.onmousemove = null;
              this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
          },
          getMouseCoordinates: function(e) {
            //记录鼠标当时所在的位置，mousemove..
            e = e || window.event;
            this.mousex = e.pageX;
            this.mousey = e.pageY - this.contentBox.offsetTop; //鼠标坐标减去canvas距离页头的高度;
          }
        };
        bubbles.init();
        bubbles.start();
      })(window);
    });
  },
  methods: {
    fish() {
      let bubbleCount = 5;
      let bubbleField = document.getElementById("bubble-field");
      for (let i = 0; i < bubbleCount; i++) {
        let randNum = Math.floor(Math.random() * 20) + 1;
        let animDur = 2 + 0.5 * randNum;
        let moveEl = document.createElement("div");
        moveEl.setAttribute("class", "bubble-rise");
        moveEl.setAttribute("style", "animation-duration: " + animDur + "s;");
        let bubbleEl = document.createElement("div");
        bubbleEl.setAttribute("class", "bubble");
        let bubbleElContent = document.createTextNode("");
        bubbleEl.appendChild(bubbleElContent);
        moveEl.appendChild(bubbleEl);
        bubbleField.appendChild(moveEl);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.chess {
  .content {
    margin-top: 42px;
    // background: url("/images/buyu/bg.png") no-repeat 0 0 #22262a;
    background-size: 100% 100% !important;
    height: 1100px;
    width: 100%;
    position: relative;
    overflow: hidden;
    .logo {
      position: absolute;
      left: 50%;
      top: 18%;
      transform: translate(-50%, -50%);
      z-index: 1;
      transform-style: preserve-3d;
      transform-origin: center center;
      animation: wave 3s ease-in-out infinite;
    }
    #bubbles {
      position: absolute;
      z-index: 0;
      left: 0;
      width: 100%;
    }
    .fishList {
      width: 1200px;
      position: absolute;
      z-index: 10;
      left: 50%;
      top: 60%;
      transform: translate(-50%, -50%);
      flex-wrap: wrap;
      li {
        margin: 0 30px;
        height: 260px;
        width: 180px;
        position: relative;
        margin-bottom: 40px;
        cursor: pointer;
        .fishBox {
          // width: 180px;
          // height: 180px;
          position: absolute;
          top: 10px;
          // animation: fishMove 2s linear infinite;
          .fishImg {
            width: 200px;
          }
          .fishTo {
            position: absolute;
            width: 200px;
            left: 0px;
            top: 10px;
          }
        }
        .fishBox:hover {
          .fishTo {
            transition: all 0.5s;
            transform: scale(1.2);
          }
        }
        .titleBox {
          position: absolute;
          left: 34px;
          bottom: -3px;
          font-size: 20px;
          cursor: pointer;
          .title {
            margin: 0 auto;
            width: 140px;
            height: 46px;
          }
          p {
            position: absolute;
            top: 8px;
            width: 140px;
            text-align: center;
            color: #e100ff;
          }
        }
      }
      li:hover {
        .shadow {
          display: block;
        }
      }
      .shadow {
        display: none;
        position: absolute;
        top: 0;
        left: -1px;
        width: 141px;
        height: 46px;
        line-height: 44px;
        text-align: center;
        color: #fff;
        border-radius: 24px;
        background: linear-gradient(#8e2ce3, #4c01e0);
      }
    }
    @keyframes wave {
      0% {
        transform: translate(-50%, -40%);
      }
      50% {
        transform: translate(-50%, -50%);
      }
      100% {
        transform: translate(-50%, -40%);
      }
    }
    // @keyframes fishMove {
    //   0% {
    //     top: 0;
    //   }
    //   50% {
    //     top: 28px;
    //   }
    //   100% {
    //     top: 0;
    //   }
    // }

    @keyframes fish {
      0% {
        transform: translate(0vw);
        -webkit-transform: translate(0vw);
        -moz-transform: translate(0vw);
        -ms-transform: translate(0vw);
        -o-transform: translate(0vw);
      }
      10% {
        transform: translate(20vw, -124px);
        -webkit-transform: translate(20vw, -124px);
        -moz-transform: translate(20vw, -124px);
        -ms-transform: translate(20vw, -124px);
        -o-transform: translate(20vw, -124px);
      }
      20% {
        transform: translate(40vw, -45px) rotateZ(22deg);
        -webkit-transform: translate(40vw, -45px) rotateZ(22deg);
        -moz-transform: translate(40vw, -45px) rotateZ(22deg);
        -ms-transform: translate(40vw, -45px) rotateZ(22deg);
        -o-transform: translate(40vw, -45px) rotateZ(22deg);
      }
      30% {
        transform: translate(60vw, -250px);
        -webkit-transform: translate(60vw, -250px);
        -moz-transform: translate(60vw, -250px);
        -ms-transform: translate(60vw, -250px);
        -o-transform: translate(60vw, -250px);
      }
      40% {
        transform: translate(80vw, -80px) rotateZ(22deg);
        -webkit-transform: translate(80vw, -80px) rotateZ(22deg);
        -moz-transform: translate(80vw, -80px) rotateZ(22deg);
        -ms-transform: translate(80vw, -80px) rotateZ(22deg);
        -o-transform: translate(80vw, -80px) rotateZ(22deg);
      }
      50% {
        transform: translate(100vw, -145px);
        -webkit-transform: translate(100vw, -145px);
        -moz-transform: translate(100vw, -145px);
        -ms-transform: translate(100vw, -145px);
        -o-transform: translate(100vw, -145px);
      }
      51% {
        transform: translate(100vw, -145px) rotateY(180deg);
        -webkit-transform: translate(100vw, -145px) rotateY(180deg);
        -moz-transform: translate(100vw, -145px) rotateY(180deg);
        -ms-transform: translate(100vw, -145px) rotateY(180deg);
        -o-transform: translate(100vw, -145px) rotateY(180deg);
      }
      60% {
        transform: translate(80vw, -80px) rotateY(180deg) rotateZ(22deg);
        -webkit-transform: translate(80vw, -80px) rotateY(180deg) rotateZ(22deg);
        -moz-transform: translate(80vw, -80px) rotateY(180deg) rotateZ(22deg);
        -ms-transform: translate(80vw, -80px) rotateY(180deg) rotateZ(22deg);
        -o-transform: translate(80vw, -80px) rotateY(180deg) rotateZ(22deg);
      }
      70% {
        transform: translate(60vw, -250px) rotateY(180deg);
        -webkit-transform: translate(60vw, -250px) rotateY(180deg);
        -moz-transform: translate(60vw, -250px) rotateY(180deg);
        -ms-transform: translate(60vw, -250px) rotateY(180deg);
        -o-transform: translate(60vw, -250px) rotateY(180deg);
      }
      80% {
        transform: translate(40vw, -45px) rotateY(180deg) rotateZ(22deg);
        -webkit-transform: translate(40vw, -45px) rotateY(180deg) rotateZ(22deg);
        -moz-transform: translate(40vw, -45px) rotateY(180deg) rotateZ(22deg);
        -ms-transform: translate(40vw, -45px) rotateY(180deg) rotateZ(22deg);
        -o-transform: translate(40vw, -45px) rotateY(180deg) rotateZ(22deg);
      }
      90% {
        transform: translate(20vw, -124px) rotateY(180deg);
        -webkit-transform: translate(20vw, -124px) rotateY(180deg);
        -moz-transform: translate(20vw, -124px) rotateY(180deg);
        -ms-transform: translate(20vw, -124px) rotateY(180deg);
        -o-transform: translate(20vw, -124px) rotateY(180deg);
      }
      99% {
        transform: translate(0vw) rotateY(180deg) rotateZ(22deg);
        -webkit-transform: translate(0vw) rotateY(180deg) rotateZ(22deg);
        -moz-transform: translate(0vw) rotateY(180deg) rotateZ(22deg);
        -ms-transform: translate(0vw) rotateY(180deg) rotateZ(22deg);
        -o-transform: translate(0vw) rotateY(180deg) rotateZ(22deg);
      }
      100% {
        transform: translate(0vw);
        -webkit-transform: translate(0vw);
        -moz-transform: translate(0vw);
        -ms-transform: translate(0vw);
        -o-transform: translate(0vw);
      }
    }

    .fish {
      position: absolute;
      left: 0px;
      bottom: 475px;
      animation: fish 40s cubic-bezier(0.9, 1, 0.3, 0.75) 0s infinite normal;
    }

    .blue-fish {
      left: 0;
      bottom: 325px;
      animation: fish 25s cubic-bezier(0.7, 1, 0.3, 0.5) 0s infinite normal;
    }

    .fish-body {
      position: absolute;
      width: 115px;
      height: 75px;
      border-radius: 50%;
      background-color: orange;
      box-shadow: 0px -7px 7px inset #00000045;
      -webkit-box-shadow: 0px -7px 7px inset #00000045;
      -moz-box-shadow: 0px -7px 7px inset #00000045;
      -o-box-shadow: 0px -7px 7px inset #00000045;
      -ms-box-shadow: 0px -7px 7px inset #00000045;
      transform: skewX(5deg) skewY(-10deg);
      -webkit-transform: skewX(5deg) skewY(-10deg);
      -moz-transform: skewX(5deg) skewY(-10deg);
      -ms-transform: skewX(5deg) skewY(-10deg);
      -o-transform: skewX(5deg) skewY(-10deg);
    }

    .blue-fish .fish-body {
      background-color: #0098e0;
    }

    .fish-body:before {
      content: "";
      width: 15px;
      height: 15px;
      background-color: #ffffff;
      position: absolute;
      border-radius: 50%;
      right: 18px;
      top: 16px;
    }

    .fish-body:after {
      content: "";
      width: 7px;
      height: 9px;
      background-color: #000000;
      position: absolute;
      border-radius: 50%;
      right: 20px;
      top: 18px;
    }

    .top-fin {
      position: absolute;
      left: 35px;
      top: -23px;
      width: 28px;
      height: 50px;
      border-radius: 20% 50%;
      background-color: orange;
      box-shadow: 2px -11px 7px inset #00000080;
      -webkit-box-shadow: 2px -11px 7px inset #00000080;
      -moz-box-shadow: 2px -11px 7px inset #00000080;
      -o-box-shadow: 2px -11px 7px inset #00000080;
      -ms-box-shadow: 2px -11px 7px inset #00000080;
      transform: rotate(80deg) skewX(-23deg);
      -webkit-transform: rotate(80deg) skewX(-23deg);
      -moz-transform: rotate(80deg) skewX(-23deg);
      -ms-transform: rotate(80deg) skewX(-23deg);
      -o-transform: rotate(80deg) skewX(-23deg);
    }

    .blue-fish .top-fin {
      background-color: #0098e0;
    }

    @keyframes tail-fin {
      0% {
        transform: rotate(25deg) skewX(-18deg) skewY(-5deg);
        -webkit-transform: rotate(25deg) skewX(-18deg) skewY(-5deg);
        -moz-transform: rotate(25deg) skewX(-18deg) skewY(-5deg);
        -ms-transform: rotate(25deg) skewX(-18deg) skewY(-5deg);
        -o-transform: rotate(25deg) skewX(-18deg) skewY(-5deg);
        left: -35px;
      }
      50% {
        transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
        -webkit-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
        -moz-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
        -ms-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
        -o-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
        left: -33px;
      }
      100% {
        transform: rotate(25deg) skewX(-18deg) skewY(-5deg);
        -webkit-transform: rotate(25deg) skewX(-18deg) skewY(-5deg);
        -moz-transform: rotate(25deg) skewX(-18deg) skewY(-5deg);
        -ms-transform: rotate(25deg) skewX(-18deg) skewY(-5deg);
        -o-transform: rotate(25deg) skewX(-18deg) skewY(-5deg);
        left: -35px;
      }
    }

    .tail-fin {
      position: absolute;
      left: -35px;
      bottom: -89px;
      width: 43px;
      height: 50px;
      border-radius: 40% 50%;
      background-color: orange;
      box-shadow: 1px -13px 7px inset #00000080;
      -webkit-box-shadow: 1px -13px 7px inset #00000080;
      -moz-box-shadow: 1px -13px 7px inset #00000080;
      -o-box-shadow: 1px -13px 7px inset #00000080;
      -ms-box-shadow: 1px -13px 7px inset #00000080;
      transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      -webkit-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      -moz-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      -ms-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      -o-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      animation: tail-fin 1s ease 0s infinite normal;
    }

    .blue-fish .tail-fin {
      background-color: #0098e0;
    }

    .tail-fin:before {
      content: "";
      z-index: 9;
      position: absolute;
      left: -16px;
      bottom: 19px;
      width: 40px;
      height: 48px;
      border-radius: 40% 50%;
      background-color: orange;
      box-shadow: 1px -13px 7px inset #00000080;
      -webkit-box-shadow: 1px -13px 7px inset #00000080;
      -moz-box-shadow: 1px -13px 7px inset #00000080;
      -o-box-shadow: 1px -13px 7px inset #00000080;
      -ms-box-shadow: 1px -13px 7px inset #00000080;
      transform: rotate(85deg);
      -webkit-transform: rotate(85deg);
      -moz-transform: rotate(85deg);
      -ms-transform: rotate(85deg);
      -o-transform: rotate(85deg);
    }

    .blue-fish .tail-fin:before {
      background-color: #0098e0;
    }

    @keyframes side-fin {
      0% {
        transform: rotate(15deg) skewX(-18deg) skewY(-15deg);
        -webkit-transform: rotate(15deg) skewX(-18deg) skewY(-15deg);
        -moz-transform: rotate(15deg) skewX(-18deg) skewY(-15deg);
        -ms-transform: rotate(15deg) skewX(-18deg) skewY(-15deg);
        -o-transform: rotate(15deg) skewX(-18deg) skewY(-15deg);
      }
      50% {
        transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
        -webkit-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
        -moz-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
        -ms-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
        -o-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      }
      100% {
        transform: rotate(15deg) skewX(-18deg) skewY(-15deg);
        -webkit-transform: rotate(15deg) skewX(-18deg) skewY(-15deg);
        -moz-transform: rotate(15deg) skewX(-18deg) skewY(-15deg);
        -ms-transform: rotate(15deg) skewX(-18deg) skewY(-15deg);
        -o-transform: rotate(15deg) skewX(-18deg) skewY(-15deg);
      }
    }

    .side-fin {
      position: absolute;
      left: 39px;
      bottom: -77px;
      width: 33px;
      height: 38px;
      border-radius: 50% 40%;
      background-color: orange;
      box-shadow: 1px -13px 7px inset #00000080;
      -webkit-box-shadow: 1px -13px 7px inset #00000080;
      -moz-box-shadow: 1px -13px 7px inset #00000080;
      -o-box-shadow: 1px -13px 7px inset #00000080;
      -ms-box-shadow: 1px -13px 7px inset #00000080;
      transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      -webkit-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      -moz-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      -ms-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      -o-transform: rotate(25deg) skewX(-18deg) skewY(-15deg);
      animation: side-fin 2s ease 0s infinite normal;
    }

    .blue-fish .side-fin {
      background-color: #0098e0;
    }

    .scale {
      position: absolute;
      width: 21px;
      height: 24px;
      border-radius: 39%;
      background-color: orange;
      box-shadow: 3px -3px 5px inset #00000020;
      -webkit-box-shadow: 3px -3px 5px inset #00000020;
      -moz-box-shadow: 3px -3px 5px inset #00000020;
      -o-box-shadow: 3px -3px 5px inset #00000020;
      -ms-box-shadow: 3px -3px 5px inset #00000020;
      transform: rotate(22deg) skewX(-3deg) skewY(-10deg);
      -webkit-transform: rotate(22deg) skewX(-3deg) skewY(-10deg);
      -moz-transform: rotate(22deg) skewX(-3deg) skewY(-10deg);
      -ms-transform: rotate(22deg) skewX(-3deg) skewY(-10deg);
      -o-transform: rotate(22deg) skewX(-3deg) skewY(-10deg);
    }

    .blue-fish .scale {
      background-color: #0098e0;
    }

    .scale1 {
      left: 20px;
      bottom: -44px;
    }

    .scale2 {
      left: 36px;
      bottom: -32px;
    }

    .scale3 {
      left: 53px;
      bottom: -37px;
    }
  }
}
</style>
