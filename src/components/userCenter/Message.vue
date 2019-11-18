<template>
  <div
    class="msg"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.3)"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(item, i) in TitleList"
        :key="i"
        :label="item.title"
        :name="item.typeKey"
      >
        <div class="content" v-if="msgList.length > 0">
          <div class="top">
            <div>
              <div>
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  v-model="checkAll"
                  @click="checkedAll"
                />
                <label for="all">全选</label>
              </div>
              <div @click="delet">
                <i class="iconfont">&#xe71d;</i>
                <span>删除</span>
              </div>
            </div>
            <div>
              <span>未读：{{ userInfo.unread }}</span>
            </div>
          </div>
          <div class="msgDetail">
            <div class="left" id="tabContent">
              <ul>
                <li
                  v-for="(item, i) in msgList"
                  :key="i"
                  @click="getDetail(item)"
                  :class="[
                    { isRead: item.is_readed === 1 },
                    { on: activeMsg.id === item.id }
                  ]"
                >
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        v-model="checkList"
                        :value="item.id"
                      />
                      <span>发件人：{{ item.from_username }}</span>
                    </div>
                    <div>
                      {{ timestampToString(item.time) }}
                    </div>
                  </div>
                  <div>
                    <span>{{ item.title }}</span
                    ><span class="no-read" v-show="item.is_readed !== 1"
                      >未读</span
                    >
                  </div>
                </li>
                <li class="btm-tip">{{ loadText }}</li>
              </ul>
            </div>
            <div class="right" v-show="activeMsg">
              <div class="title">
                <div>{{ activeMsg.title }}</div>
                <div>
                  <span>发件人：{{ activeMsg.from_username }}</span>
                  <span>{{ timestampToString(activeMsg.time) }}</span>
                </div>
              </div>
              <div class="right-content">
                {{ activeMsg.content }}
              </div>
              <div class="btm">
                <p>{{ allConfig.webName }}</p>
                <span>{{ timestampToString(activeMsg.time) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="noData" class="noData">
          <img
            :src="commonImgs('default/noData.png')"
            alt="暂无数据"
            draggable="false"
          />
          <p>暂无消息记录</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { message, messageDetail, deleteMessage } from "../../api";
import BScroll from "better-scroll";
const TitleList = [
  {
    title: "个人消息",
    typeKey: "message"
  }
];
export default {
  name: "Message",
  data() {
    return {
      TitleList,
      activeName: "message",
      msgList: [],
      activeMsg: "",
      checkList: [],
      checkAll: false,
      noData: false,
      loading: false,
      oScroll: "",
      parameter: {
        page: 1,
        pageSize: 10
      },
      loadText: "加载中..."
    };
  },
  created() {
    this.initMsg();
  },
  computed: {
    ...mapGetters(["allConfig", "userInfo"])
  },
  watch: {
    checkList(newVal) {
      if (newVal.length === this.msgList.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    }
  },
  methods: {
    checkedAll() {
      console.log(this.checkAll, "this.checkAll");
      if (this.checkAll) {
        this.checkList = [];
      } else {
        this.msgList.forEach(item => {
          this.checkList.push(item.id);
        });
      }
    },
    getDetail(msgDetail) {
      this.activeMsg = msgDetail;
      this.msgDetail(this.activeMsg.id);
    },
    initMsg() {
      this.loading = true;
      message(this.parameter).then(res => {
        this.loading = false;
        console.log(res, "个人消息");
        if (res.status) {
          this.msgList = res.data;
          this.activeMsg = res.data[0];
          if (this.msgList.length > 0) {
            this.noData = false;
            this.$nextTick(() => {
              this.oScroll = new BScroll(
                document.querySelector("#tabContent"),
                {
                  probeType: 2,
                  pullUpLoad: {
                    threshold: 10
                  },
                  mouseWheel: true
                }
              );
              this.loadMore();
            });
            if (this.msgList.length < 10) {
              this.loadText = "没有更多了";
            }
            this.msgDetail(this.activeMsg.id);
          } else {
            this.noData = true;
          }
        }
      });
    },
    msgDetail(msgId) {
      messageDetail({ id: msgId }).then(res => {
        if (res.status) {
          this.$store.dispatch("userDetails");
        }
      });
    },
    delet() {
      if (!this.checkList.length) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请选择要删除的消息",
          duration: 1000
        });
      }
      this.deleteMsg(this.checkList.toString());
    },
    deleteMsg(id) {
      this.$msgbox
        .confirm("确定删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          deleteMessage({ id: id }).then(res => {
            this.checkList = [];
            console.log(res);
            if (res.status) {
              this.activeMsg = "";
              this.$message({
                type: "success",
                showClose: true,
                message: res.msg,
                duration: 1000
              });
              this.initMsg();
            } else {
              this.$message({
                type: "error",
                showClose: true,
                message: "系统繁忙，请稍后再试",
                duration: 1000
              });
            }
          });
        })
        .catch(res => {
          console.log(res, "点了取消");
        });
    },
    loadMore() {
      this.oScroll.on("pullingUp", () => {
        this.parameter.page += 1;
        message(this.parameter).then(res => {
          console.log("loadMore------------------------------");
          if (res.status) {
            if (res.data.length) {
              this.msgList = this.msgList.concat(res.data);
              this.oScroll.refresh();
              this.oScroll.finishPullUp();
              if (res.data.length < 10) {
                this.loadText = "没有更多了";
                this.oScroll.pullUpLoad = false;
              }
            } else {
              this.loadText = "没有更多了";
              this.oScroll.pullUpLoad = false;
            }
          }
        });
      });
    }
  },
  destroyed() {
    this.$store.dispatch("userDetails");
  }
};
</script>

<style scoped lang="scss">
.msg {
  flex: 1;
  display: flex;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 40px;
      border-bottom: 1px solid #e9e8ea;
      > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #666;
        &:first-child {
          div {
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #666;
          }
          input {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background: #fff;
          }
          i {
            margin-left: 40px;
            color: #a0a0a0;
            margin-right: 10px;
            font-size: 20px;
          }
          label {
            cursor: pointer;
          }
          span {
            cursor: pointer;
          }
        }
        &:nth-child(2) {
          span {
            margin-left: 20px;
            &:first-child {
              color: #dc001a;
            }
          }
        }
      }
    }
    .msgDetail {
      flex: 1;
      display: flex;
      flex-direction: row;
      .left {
        flex: 0 0 auto;
        width: 342px;
        height: 620px;
        overflow: hidden;
        border-right: 1px solid #e9e8ea;
        box-sizing: border-box;
        position: relative;
        ul {
          position: relative;
          li {
            padding: 20px 20px 0 20px;
            border-bottom: 1px solid #e9e8ea;
            box-sizing: border-box;
            color: #333333;
            height: 84px;
            cursor: pointer;
            &:hover {
              &:not(.isRead) {
                background-color: #fdf7ea;
              }
            }
            &.isRead {
              background-color: #fafafa;
              color: #999999;
            }
            &.on {
              background-color: #fdf7ea;
            }
            > div {
              &:first-child {
                display: flex;
                justify-content: space-between;
                align-items: center;
                input {
                  width: 20px;
                  height: 20px;
                  margin-right: 5px;
                }
                span {
                  display: inline-block;
                  vertical-align: top;
                }
              }
              &:last-child {
                padding-left: 23px;
                line-height: 30px;
                display: flex;
                justify-content: space-between;
              }
            }
            .no-read {
              color: #dc001a;
              text-align: right;
            }
          }
          .btm-tip {
            position: absolute;
            bottom: -30px;
            left: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            overflow: hidden;
            margin: 0;
            padding: 0;
            border: 0;
            text-align: center;
            color: #999999;
            &:hover {
              background-color: #fff !important;
              cursor: auto;
            }
          }
        }
      }
      .right {
        flex: 1;
        position: relative;
        .title {
          height: 84px;
          border-bottom: 1px solid #e9e8ea;
          padding-left: 20px;
          padding-top: 20px;
          padding-right: 20px;
          box-sizing: border-box;
          div {
            &:first-child {
              color: #333;
              font-size: 16px;
            }
            &:nth-child(2) {
              margin-top: 5px;
              display: flex;
              justify-content: space-between;
            }
          }
        }
        .right-content {
          color: #666;
          padding-top: 40px;
          padding-left: 20px;
        }
        .btm {
          position: absolute;
          bottom: 20px;
          right: 20px;
          color: #666;
          text-align: left;
          p {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .noData {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}
</style>
