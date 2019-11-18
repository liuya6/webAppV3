<template>
  <div
    class="help"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.3)"
  >
    <el-tabs v-if="help" v-model="activeName">
      <el-tab-pane
        v-for="(item, i) in help"
        :key="i"
        :label="item.typeName"
        :name="item.typeId + ''"
      >
        <div class="content">
          <el-collapse v-model="activeNames">
            <el-collapse-item
              v-for="(child, j) in item.list"
              :key="j"
              :title="child.title"
              :name="child.id"
            >
              <div v-html="child.content"></div>
              <div v-html="child.content"></div>
              <!-- <p>为确保你的中奖权益，注册后须在用户中心绑定银行卡，提交用户真实姓名，设置提款密码。</p> -->
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Help",
  data() {
    return {
      activeName: "8",
      activeNames: ""
    };
  },
  created() {
    if (!this.help) {
      this.$store.dispatch("helps");
    }
    console.log(this.help, "this.help");
  },
  computed: {
    ...mapGetters(["help", "loading"])
  }
};
</script>

<style scoped lang="scss">
.help {
  display: flex;
  flex: 1;
  // max-height: 740px;
  // overflow-y: scroll;

  .content {
    margin: 18px 18px 0 18px;
    max-height: 700px;
    overflow-y: scroll;
  }
  .content::-webkit-scrollbar {
    // display: none;
  }
  // .el-tabs__content {
  //   max-height: 740px;
  //   overflow-y: scroll;
  // }
  // .el-tabs__content::-webkit-scrollbar {
  //   display: none;
  // }
}
.help::-webkit-scrollbar {
  // display: none;
}
</style>
