<template>
  <div class="notice">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(item, i) in TitleList"
        :key="i"
        :label="item.title"
        :name="item.typeKey"
      >
        <div
          class="content"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-background="rgba(255, 255, 255, 0.3)"
        >
          <div class="tabContent">
            <ul v-show="announcementList">
              <li
                v-for="(item, i) in announcementList"
                :key="i"
                @click="
                  changeContent(item.id, item.content, item.title, item.addTime)
                "
                :class="{ on: item.id == id }"
              >
                <p>【温馨提示】{{ item.title }}</p>
                <span>{{ timestampToString(item.addTime) }}</span>
              </li>
            </ul>
          </div>
          <div class="right" v-show="title">
            <div class="title" v-show="title">【温馨提示】{{ title }}</div>
            <div v-show="title">
              尊敬的用户：
            </div>
            <div v-text="txt"></div>
            <div>
              <p>{{ time }}</p>
              <span v-show="title">{{ allConfig.webName }}祝您生活愉快</span>
            </div>
          </div>
        </div>
        <div v-show="noData" class="noData">
          <img
            :src="commonImgs('default/noData.png')"
            alt="暂无数据"
            draggable="false"
          />
          <p>暂无记录</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { announcement } from "../../api";
import { mapGetters } from "vuex";
import BScroll from "better-scroll";
const TitleList = [
  {
    title: "公告列表",
    typeKey: "notice"
  }
];
export default {
  name: "Notice",
  data() {
    return {
      TitleList,
      activeName: "notice",
      announcementList: [],
      loading: true,
      noData: false,
      noticeDetail: {
        page: 1,
        pageSize: 20
      },
      txt: "",
      title: "",
      time: "",
      id: ""
    };
  },
  created() {
    this.inint();
    this.$nextTick(() => {
      let wrapper = document.querySelector(".tabContent");
      new BScroll(wrapper, {
        mouseWheel: true
      });
    });
    // console.log(this.allConfig);
  },
  computed: {
    ...mapGetters(["allConfig"])
  },
  methods: {
    changeContent(id, content, title, time) {
      if (!id) {
        this.inint();
      } else {
        this.id = id;
        this.txt = content;
        this.title = title;
        this.time = this.timestampToString(time);
      }
    },
    inint() {
      announcement({
        page: this.noticeDetail.page,
        pageSize: this.noticeDetail.pageSize
      }).then(res => {
        if (res.status) {
          this.loading = false;
          console.log(res.data);
          if (res.data || res.data.length) {
            this.noData = false;
          } else {
            this.noData = true;
          }
          this.announcementList = res.data;
          this.txt = res.data[0].content;
          this.title = res.data[0].title;
          this.id = res.data[0].id;
          this.time = this.timestampToString(res.data[0].addTime);
          this.total = Number(res.data.length);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.notice {
  display: flex;
  flex: 1;
  .content {
    flex: 1;
    display: flex;
    .tabContent {
      width: 259px;
      height: 590px;
      overflow: hidden;
      border-right: 1px solid #e3ebf6;
      ul {
        box-sizing: border-box;
        .on {
          background-color: #fafafa;
        }
        li {
          height: 80px;
          box-sizing: border-box;
          border-bottom: 1px dashed #e3ebf6;
          padding-left: 28px;
          cursor: pointer;
          p {
            padding-top: 8px;
            line-height: 43px;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 15px;
          }
          span {
            font-size: 13px;
            color: #999999;
          }
        }
        li.active {
          background: #f0f0f0;
        }
      }
    }
    > div.right {
      overflow: hidden;
      flex: 1;
      position: relative;
      .title {
        line-height: 80px;
        height: 80px;
        border-bottom: 1px dashed #e3ebf6;
        text-align: center;
        font-size: 20px;
        color: #333;
      }
      div {
        color: #333;
        padding-right: 50px;
        padding-left: 29px;
        font-size: 15px;
        &:nth-child(2) {
          margin-top: 50px;
          margin-bottom: 26px;
        }
        &:nth-child(3) {
          line-height: 37px;
        }
        &:nth-child(4) {
          position: absolute;
          text-align: right;
          bottom: 20px;
          right: 0;
          p {
            line-height: 45px;
          }
        }
      }
    }
    .btm {
      width: 100%;
      background-color: #333;
      height: 68px;
      overflow: hidden;
      .btm-page {
        margin: 20px auto 0;
        width: 235px;
        overflow: hidden;
      }
      span {
        float: left;
        line-height: 32px;
        font-size: 16px;
        color: #6a6a6a;
      }
      .page {
        float: left;
      }
    }
  }
  .noData {
    margin-top: 50px;
    text-align: center;
    font-size: 15px;
    img {
      display: inline-block;
    }
    p {
      margin-top: 20px;
    }
  }
}
</style>
