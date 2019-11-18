<template>
  <div class="Technology" v-title="'技术支援'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="wrapper">
      <div class="conTent">
        <div
          class="dh4"
          style="padding: 30px 0px 10px 0px; margin-bottom: 30px; background-color:#141b2e;"
        >
          <span>请选择您的问题类型</span>
        </div>
        <div class="solveProblem">
          <div class="questionBox">
            <div @click="$router.push({ name: 'solveProblem' })">
              <img :src="`${staticZhpUrl}technology/icon_404.png`" />
              <h2>无法开启网页</h2>
              <p>网页无法显示或出现错误信息</p>
            </div>
          </div>
          <div class="questionBox">
            <div
              @click="
                $router.push({ name: 'solveProblem', query: { index: 1 } })
              "
            >
              <img :src="`${staticZhpUrl}technology/icon_Black.png`" />
              <h2>游戏黑屏</h2>
              <p>进入游戏后，画面显示异常</p>
            </div>
          </div>
          <div class="questionBox">
            <div @click="$router.push({ name: 'solveProblemGame' })">
              <img :src="`${staticZhpUrl}technology/icon_Question.png`" />
              <h2>无法进行游戏</h2>
              <p>登入后，无法开启任何游戏</p>
            </div>
          </div>
          <div class="questionBox">
            <div
              @click="
                $router.push({ name: 'solveProblem', query: { index: 2 } })
              "
            >
              <img :src="`${staticZhpUrl}technology/icon_Slow.png`" />
              <h2>网站访问异常缓慢</h2>
              <p>技术团队为您双向解决问题</p>
            </div>
          </div>
          <div class="questionBox">
            <div
              @click="
                $router.push({ name: 'solveProblem', query: { index: 3 } })
              "
            >
              <img :src="`${staticZhpUrl}technology/icon_Internet.png`" />
              <h2>其他网络问题</h2>
              <p>网页无法正常显示或无法联机</p>
            </div>
          </div>
          <div class="questionBox">
            <div @click="$router.push({ name: 'softwareDownload' })">
              <img :src="`${staticZhpUrl}technology/icon_Download.png`" />
              <h2>软件下载</h2>
              <p>手机端APP、远程工具下载</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MOBILE",
  data() {
    return {
      index: 0
    };
  },

  created() {},
  methods: {
    change() {
      this.index = 0;
    },
    change1() {
      this.index = 1;
    }
  },
  computed: {
    ...mapGetters(["staticZhpUrl"])
  }
};
</script>

<style scoped lang="scss">
.Technology {
  padding-top: 140px;
  background-color: #24304c;
  .conTent {
    margin: 0 auto;
    width: 1002px;
    background-color: #24304c;
  }
  .conTent:after {
    display: block;
    content: "";
    clear: left;
  }
  .conTent .dh4 span {
    width: 322px;
    height: 40px;
    display: block;
    line-height: 40px;
    font-size: 20px;
    color: #f0bc18;
    border: 1px solid #f0bc18;
    text-align: center;
    margin: 0px 340px 30px;
    margin-top: 10px;
  }
  .solveProblem {
    padding-left: 16px;
    width: 986px;
    clear: both;
  }
  .questionBox {
    width: 290px;
    height: auto;
    float: left;
    margin: 0 16px 33px 17px;
    background-color: #2e3542;
  }
  .questionBox img {
    margin: 43px 67px 0 67px;
  }
  .questionBox div {
    cursor: pointer;
    filter: alpha(opacity=100);
    opacity: 1;
  }
  .questionBox div:hover {
    filter: alpha(opacity=100);
    opacity: 0.8;
  }
  .questionBox h2 {
    font-size: 17px;
    width: 290px;
    text-align: center;
    height: 71px;
    line-height: 71px;
    color: #f0bc18;
    display: block;
  }
  .questionBox p {
    font-size: 14px;
    color: #ffffff;
    width: 235px;
    height: 35px;
    background-repeat: no-repeat;
    background-position: center right;
    background-color: #4f5257;
    line-height: 35px;
    padding-left: 55px;
    display: block;
  }
}
</style>
