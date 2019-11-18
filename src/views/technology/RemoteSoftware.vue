<template>
  <div class="ClearCache" v-title="'使用说明'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="conTent">
      <div
        class="conTop"
        :style="
          `background-image: url(${staticZhpUrl}technology/foot/icon_Remote.png); background-position: 880px center`
        "
      >
        <div class="GoBack">
          <a href="javascript:history.back(-1);">回上一页</a>
        </div>
        <img :src="`${staticZhpUrl}technology/foot/TeamViewer.png`" />
        <div class="text">
          <h2>远程工具<br /></h2>
          <p>按步骤安装远程软件，我们将与您远程连线进行故障排查</p>
        </div>
      </div>
      <div class="CearCachel">
        <div class="Text_A1" style="top: 90px;">
          点击下载 "<a
            href="https://www.teamviewer.com/zhcn/download/windows/"
            target="_blank"
            ><strong>TeamViewer</strong></a
          >" 远程协助软件，并安装
        </div>
        <div class="Text_A2" style="top: 535px;">
          注册软件账号后，启动软件的远程连接
        </div>
        <div class="Text_A3" style="top: 920px;">
          经过一会后，在下方左侧的<strong>ID与密码</strong>字段中会自动产生一些数值，如果要被远程遥控时，请把<strong>ID与密码</strong>提供给我们，稍后程序将透过安全联机由远程帮您协助处理问题。
        </div>
        <img
          :src="`${staticZhpUrl}technology/foot/TeamViewer_01.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/foot/TeamViewer_02.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/foot/TeamViewer_03.jpg`"
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
