<template>
  <div class="SolveProblem" v-title="'技术支援'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="content">
      <div class="wrapper">
        <div class="conTent">
          <div
            class="conTop"
            :style="
              `background-image: url(${staticZhpUrl}technology/${style}.png)`
            "
          >
            <img
              v-if="!index"
              :src="`${staticZhpUrl}technology/icon_404.png`"
            />
            <img
              v-if="index == 1"
              :src="`${staticZhpUrl}technology/icon_Black.png`"
            />
            <img
              v-if="index == 2"
              :src="`${staticZhpUrl}technology/icon_Slow.png`"
            />
            <img
              v-if="index == 3"
              :src="`${staticZhpUrl}technology/icon_Internet.png`"
            />
            <div class="text">
              <h2>{{ title }}</h2>
              <p>请试试下方的步骤，为您排解问题</p>
            </div>
          </div>
          <div class="soluTions">
            <div
              class="solveBox"
              v-if="index != 3"
              :class="{ margin110: index == 2 }"
            >
              <div
                class="number"
                :style="
                  `background-image: url(${staticZhpUrl}technology/No_1.png)`
                "
              ></div>
              <img :src="`${staticZhpUrl}technology/icon_Remove.png`" />
              <h1>清除缓存</h1>
              <p>依浏览器类型，照步骤清除缓存</p>
              <div class="pushButton">
                <div @click="$router.push({ name: 'clearCache' })">谷歌</div>
                <div @click="$router.push({ name: 'clearCacheIE' })">IE</div>
                <div @click="$router.push({ name: 'clearCacheAO' })">
                  傲游云
                </div>
                <div @click="$router.push({ name: 'clearCacheHUO' })">火狐</div>
              </div>
            </div>
            <div class="solveBox" v-if="index != 2 && index != 3">
              <div
                class="number"
                :style="
                  `background-image: url(${staticZhpUrl}technology/No_2.png)`
                "
              ></div>
              <img :src="`${staticZhpUrl}technology/icon_DNS.png`" />
              <h1>修改DNS</h1>
              <p>下载工具，一键修改DNS</p>
              <div class="pushButton">
                <a
                  href="https://htbet03.com/download/dnshelper.zip"
                  id="dns"
                  target="_blank"
                  >下载DNS修改工具</a
                >
                <div @click="$router.push({ name: 'clearDNS' })">手动设置</div>
              </div>
            </div>
            <div
              class="solveBox"
              :class="{ margin110: index == 2, marginL: index == 3 }"
            >
              <div
                class="number"
                :style="
                  `background-image: url(${staticZhpUrl}technology/No_3.png)`
                "
              ></div>
              <img :src="`${staticZhpUrl}technology/icon_Replace.png`" />
              <h1>更换浏览器</h1>
              <p>点选下载其他浏览器</p>
              <div class="pushButton">
                <!-- <a href="javascript:" class="downBrowser" target="_blank">专属浏览器</a> -->
                <a href="http://www.google.com/chrome" target="_blank">谷歌</a>
                <a href="http://windows.microsoft.com/ie" target="_blank">IE</a>
                <a href="http://www.maxthon.cn/" target="_blank">傲游云</a>
                <a href="https://www.firefox.com/" target="_blank">火狐</a>
                <a href="http://chrome.360.cn/" target="_blank">360极速</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <questionMenu></questionMenu>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "solveProblem",
  data() {
    return {
      title: "无法开启网页",
      index: "",
      style: "icon_404_bg"
    };
  },
  created() {
    let i = this.$route.query.index;
    if (i == 1) {
      this.index = 1;
      this.title = "游戏黑屏";
      this.style = "icon_404_bg";
    } else if (i == 2) {
      this.index = 2;
      this.title = "网站访问异常缓慢";
      this.style = "icon_Slow_bg";
    } else if (i == 3) {
      this.index = 3;
      this.title = "其他网路问题";
      this.style = "icon_Internet_bg";
    } else {
      this.index = "";
      this.title = "无法开启网页";
      this.style = "icon_Black_bg";
    }
  },
  watch: {
    $route(val) {
      let i = val.query.index;
      console.log(i, "iiiiiiiiiiiii");
      if (i == 1) {
        this.index = 1;
        this.title = "游戏黑屏";
        this.style = "icon_404_bg";
      } else if (i == 2) {
        this.index = 2;
        this.title = "网站访问异常缓慢";
        this.style = "icon_Slow_bg";
      } else if (i == 3) {
        this.index = 3;
        this.title = "其他网路问题";
        this.style = "icon_Internet_bg";
      } else {
        this.index = "";
        this.title = "无法开启网页";
        this.style = "icon_Black_bg";
      }
    }
  },
  computed: {
    ...mapGetters(["staticZhpUrl"])
  }
};
</script>
<style lang="scss" scoped>
.margin110 {
  margin: 0 110px;
}
.marginL {
  margin-left: 360px;
}
</style>
