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
              `background-image: url(${staticZhpUrl}technology/icon_Download_bg.png)`
            "
          >
            <img :src="`${staticZhpUrl}technology/icon_Download.png`" />
            <div class="text">
              <h2>
                软件下载
                <br />
              </h2>
              <p>请扫描二维码下载APP</p>
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
              <img :src="`${staticZhpUrl}technology/icon_Game.png`" />
              <h1>手机版APP</h1>
              <p>随时娱乐 点指成金</p>
              <p>Android</p>
              <div class="pushButton1" id="android_qr_code">
                <img
                  v-if="allConfig && allConfig.androidErweima"
                  :src="allConfig.androidErweima"
                  alt="APP下载二维码"
                  draggable="false"
                />
              </div>
              <p>IOS</p>
              <div class="pushButton1" id="ios_qr_code">
                <img
                  v-if="allConfig && allConfig.iphoneErweima"
                  :src="allConfig.iphoneErweima"
                  alt="APP下载二维码"
                  draggable="false"
                />
              </div>
            </div>

            <div class="solveBox">
              <div
                class="number"
                :style="
                  `background-image: url(${staticZhpUrl}technology/No_2.png)`
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
                  `background-image: url(${staticZhpUrl}technology/No_3.png)`
                "
              ></div>
              <img :src="`${staticZhpUrl}technology/icon_Remote.png`" />
              <h1>远程工具</h1>
              <p>异常故障 远程协助排查</p>
              <div class="pushButton">
                <a
                  href="https://www.teamviewer.com/zhcn/download/windows/"
                  target="_blank"
                  >下载远程工具</a
                >
              </div>
              <div class="pushButton">
                <a
                  href="javascript:;"
                  @click="$router.push({ name: 'remoteSoftware' })"
                  >使用说明</a
                >
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
  computed: {
    ...mapGetters(["allConfig", "staticZhpUrl"])
  }
};
</script>
<style scoped lang="scss">
.pushButton1 {
  img {
    width: 131px;
  }
}
</style>
