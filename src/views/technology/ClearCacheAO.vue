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
        <img :src="`${staticZhpUrl}technology/clear/Maxthon-icon.png`" />
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
        <div class="Text_A2" style="top: 465px;">
          点选 "
          <strong>清除浏览数据</strong>"
        </div>
        <div class="Text_A3" style="top: 695px;">
          开启清除浏览数据介面后
          <br />勾选" <strong>清除缓存文件</strong>" <br />点击"
          <strong>立即清除</strong>"
        </div>
        <div class="Text_A4" style="top: 960px;">
          经过以上操作后，重新登录游戏查看问题是否解决。
        </div>
        <img
          :src="`${staticZhpUrl}technology/clear/Cache_MaxThon_01.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/clear/Cache_MaxThon_02.jpg`"
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
