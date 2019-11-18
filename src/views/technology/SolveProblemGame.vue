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
              `background-image: url(${staticZhpUrl}technology/icon_Question_bg.png)`
            "
          >
            <img :src="`${staticZhpUrl}technology/icon_Question.png`" />
            <div class="text">
              <h2>无法进行游戏</h2>
              <p>请试试下方的步骤，为您排解问题</p>
            </div>
          </div>
          <div class="soluTions">
            <div class="solveBox">
              <div
                class="number"
                :style="
                  `background-image: url(${staticZhpUrl}technology/No_1.png)`
                "
              ></div>
              <img :src="`${staticZhpUrl}technology/icon_Flash.png`" />
              <h1>更新Flash</h1>
              <p>请下载新版Flash</p>
              <div class="pushButton">
                <a
                  target="_blank"
                  href="https://get.adobe.com/flashplayer/?loc=cn"
                  >Flash更新</a
                >
              </div>
            </div>
            <div class="solveBox">
              <div
                class="number"
                :style="
                  `background-image: url(${staticZhpUrl}technology/No_2.png)`
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

            <div class="solveBox">
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
    return {};
  },
  computed: {
    ...mapGetters(["staticZhpUrl"])
  }
};
</script>
