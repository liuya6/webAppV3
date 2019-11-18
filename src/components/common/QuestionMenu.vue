<template>
  <div class="questionMenu flexC">
    <div
      @click="$router.replace({ name: 'technology' })"
      :style="
        `background-image:url(${staticZhpUrl}technology/foot/icon_Back_s.png)`
      "
    >
      <!-- style="background-image:url(/images/technology/foot/icon_Back_s.png)" -->
      返回主菜单
    </div>
    <div
      @click="$router.replace({ name: 'solveProblem', query: { index: 1 } })"
      :style="
        `background-image:url(${staticZhpUrl}technology/foot/icon_Black_s.png)`
      "
    >
      游戏黑屏
    </div>
    <div
      @click="$router.replace({ name: 'solveProblemGame' })"
      :style="
        `background-image:url(${staticZhpUrl}technology/foot/icon_Question_s.png)`
      "
    >
      无法进行游戏
    </div>
    <div
      @click="$router.replace({ name: 'solveProblem', query: { index: 2 } })"
      :style="
        `background-image:url(${staticZhpUrl}technology/foot/icon_Slow_s.png)`
      "
    >
      网站访问异常缓慢
    </div>
    <div
      @click="$router.replace({ name: 'solveProblem', query: { index: 3 } })"
      :style="
        `background-image:url(${staticZhpUrl}technology/foot/icon_Internet_s.png)`
      "
    >
      其他网路问题
    </div>
    <div
      @click="$router.replace({ name: 'softwareDownload' })"
      :style="
        `background-image:url(${staticZhpUrl}technology/foot/icon_Download_s.png)`
      "
    >
      软件下载
    </div>
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
  created() {},
  computed: {
    ...mapGetters(["staticZhpUrl"])
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.questionMenu {
  margin-bottom: 20px;
  height: 35px;
  div {
    font-size: 14px;
    padding: 0 35px 0 30px;
    background-repeat: no-repeat;
    background-position: center right;
    height: 35px;
    line-height: 35px;
    color: #eeeeee;
    display: block;
    float: left;
    filter: alpha(opacity=65);
    opacity: 0.65;
    cursor: pointer;
  }
  div:hover {
    color: #ffffff;
    -moz-background-size: 28px;
    -webkit-background-size: 28px;
    -o-background-size: 28px;
    background-size: 28px;
    filter: alpha(opacity=100);
    opacity: 1;
  }
}
</style>
