<template>
  <div class="ClearCache" v-title="'技术支援'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="conTent">
      <div
        class="conTop"
        :style="
          `background-image: url(${staticZhpUrl}technology/clear/icon_Remove_1.png); background-position: 880px center`
        "
      >
        <div class="GoBack">
          <a href="javascript:history.back(-1);">回上一页</a>
        </div>
        <img :src="`${staticZhpUrl}technology/clear/Firefox-icon.png`" />
        <div class="text">
          <h2>
            清除缓存
            <br />
          </h2>
          <p>请试试下方的步骤，为您排解问题</p>
        </div>
      </div>
      <div class="CearCachel">
        <div class="Text_A1" style="top: 90px;">
          点击 "
          <strong>右上方工具选项</strong>"
        </div>
        <div class="Text_A2" style="top: 385px;">
          点选 "
          <strong>选项</strong>"
        </div>
        <div class="Text_A3" style="top: 720px;">
          开启选项介面后
          <br />点击 " <strong>高级</strong>" 面板
        </div>
        <div class="Text_A4" style="top: 870px;">
          开启高级面板后
          <br />点选 “ <strong>网络</strong>” 分頁
        </div>
        <div class="Text_A5" style="top: 1545px; left: 110px;">
          在 "
          <strong>网络内容缓存</strong>" 中 <br />点击 "
          <strong>立刻清除</strong>"
        </div>
        <div class="Text_A6" style="top: 1545px;">
          经过以上操作后，重新登录游戏查看问题是否解决。
        </div>
        <img
          :src="`${staticZhpUrl}technology/clear/Cache_Firefox_01.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/clear/Cache_Firefox_02.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/clear/Cache_Firefox_03.jpg`"
          style="margin: 10px 0px;"
        />
      </div>
    </div>
    <questionMenu></questionMenu>
    <my-foot></my-foot>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "questionMenu",
  data() {
    return {
      setTimer: "",
      times: ""
    };
  },
  computed: {
    ...mapGetters(["staticZhpUrl"])
  }
};
</script>
