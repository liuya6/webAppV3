<template>
  <div class="Electronic" v-title="'电子'">
    <my-kefu></my-kefu>
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <div
      class="content"
      :style="
        `background: url(${staticZhpUrl}chess/electronicBg.png) no-repeat #110f28`
      "
    >
      <div
        class="game"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <div class="gameTab">
          <ul>
            <li
              v-for="(item, i) in homeToSlots"
              :key="i"
              :class="{ on: item.typeKey === gameDetail.typeKey }"
              @click="changeGame(item.typeKey, item.title, item.link)"
            >
              <i>
                <img :src="item.img" :alt="item.title" />
              </i>
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </div>
        <div class="middle">
          <div class="title">
            <span>
              {{ title || gameDetail.typeKey + "电子" }}-全部游戏（{{
                total
              }}个）
            </span>
            <div>
              <input
                type="text"
                placeholder="请输入游戏名称"
                v-model="searchGameTitle"
                @keydown.enter="searchGames"
              />
              <i class="iconfont" @click="searchGames">&#xe749;</i>
            </div>
          </div>
          <ul>
            <li
              v-for="(item, i) in gameList"
              :key="i"
              @click="playGame(item.link)"
            >
              <i>
                <img :src="item.img" alt draggable="false" />
              </i>
              <p>{{ item.title }}</p>
              <div>
                <span>开始游戏</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="btm" v-show="total">
          <div class="btm-page">
            <span @click="firstPage(1)">首页</span>
            <el-pagination
              class="pages"
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="gameDetail.pageSize"
              @current-change="handleCurrentChange"
              :current-page="gameDetail.page"
            ></el-pagination>
            <span
              @click="firstPage(Math.ceil(total / gameDetail.pageSize))"
              style="margin-right: 10px;"
              >尾页</span
            >
            <span>共{{ Math.ceil(total / gameDetail.pageSize) }}页</span>
          </div>
        </div>
      </div>
    </div>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Electronic",
  data() {
    return {
      gameDetail: {
        typeKey: "CQ9",
        classify: "DZ",
        pageSize: 15,
        page: 1
      },
      searchGameTitle: ""
    };
  },
  created() {
    if (this.$route.params.typeKey) {
      this.gameDetail.typeKey = this.$route.params.typeKey;
    }
    this.SET_GAME_LIST("");
    this.$store.commit("CHANGE_LOADING", 1);
    this.hallTypes(this.gameDetail);
  },
  watch: {
    $route(newVal) {
      console.log(newVal);
      if (newVal) {
        this.gameDetail.typeKey = newVal.params.typeKey;
        this.gameDetail.page = 1;
        this.hallTypes(this.gameDetail);
      }
    }
  },
  computed: {
    ...mapGetters([
      "homeToSlots",
      "gameList",
      "total",
      "title",
      "loading",
      "staticZhpUrl"
    ])
  },
  methods: {
    ...mapActions(["hallTypes", "serchGames"]),
    ...mapMutations(["CHANGE_LOADING", "SET_GAME_LIST"]),
    changeGame(type, title, link) {
      console.log(type, title, link);
      if (type == "JDB") {
        return this.playGame(link);
      }
      this.$store.commit("CHANGE_LOADING", 1);
      this.$store.commit("CHANGE_TITLE", title);
      this.gameDetail.typeKey = type;
      this.gameDetail.page = 1;
      this.hallTypes(this.gameDetail);
    },
    handleCurrentChange(num) {
      this.gameDetail.page = num;
      this.hallTypes(this.gameDetail);
    },
    firstPage(num) {
      this.gameDetail.page = num;
      this.hallTypes(this.gameDetail);
    },
    searchGames() {
      if (!this.searchGameTitle) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入游戏名称",
          duration: 1000
        });
      }
      this.serchGames({
        typeKey: this.gameDetail.typeKey,
        title: this.searchGameTitle,
        pageSize: 15,
        page: 1
      });
    }
  }
};
</script>

<style scoped lang="scss">
.Electronic {
  .content {
    margin-top: 42px;
    // background: url("/images/game/electronicBg.png") no-repeat #110f28;
    -webkit-background-size: 100%;
    background-size: 100%;
    overflow: hidden;
    .game {
      width: 1307px;
      min-height: 500px;
      margin: 388px auto 0;
      .gameTab {
        margin: 0 50px;
        min-height: 74px;
        ul {
          line-height: 74px;
          background-color: rgba(23, 21, 48, 0.8);
          border-radius: 10px;
          overflow: hidden;
          padding: 10px 20px;
          display: flex;
          li {
            // width: 128px;
            flex: 1;
            overflow: hidden;
            // display: inline-block;
            vertical-align: middle;
            text-align: center;
            cursor: pointer;
            padding: 10px 0;
            line-height: initial;
            border-right: 1px solid rgba(255, 255, 255, 0.2);
            i {
              display: inline-block;
              height: 40px;
              vertical-align: middle;
              width: 100%;
              padding: 10px 0;
              img {
                transform: scale(1.5) translateY(-4px);
                display: inline-block;
                height: 100%;
                filter: grayscale(100%);
              }
            }
            span {
              color: #fff;
              display: inline-block;
            }
            &:last-child {
              border: none;
            }
          }
          li:hover {
            img {
              filter: none;
            }
          }
          .on {
            i {
              img {
                filter: none;
              }
            }
          }
        }
      }
      .middle {
        background-color: #292838;
        margin: 30px 50px 0;
        border-radius: 10px;
        padding: 0 20px;
        .title {
          color: #c7944b;
          text-align: left;
          overflow: hidden;
          width: 100%;
          span {
            line-height: 92px;
            font-size: 18px;
          }
          div {
            float: right;
            margin-top: 30px;
            width: 211px;
            height: 37px;
            overflow: hidden;
            border-radius: 37px;
            line-height: 37px;
            padding-left: 20px;
            border: 1px solid #c7944b;
            input {
              color: #c7944b;
              display: inline-block;
              vertical-align: top;
              height: 37px;
              width: 170px;
              border: none;
              font-size: 17px;
              background-color: #292838;
            }
            input::-webkit-input-placeholder {
              color: #c7944b;
            }
            i {
              color: #c7944b;
              cursor: pointer;
              font-size: 26px;
            }
          }
        }
        ul {
          overflow: hidden;
          // border-bottom: 1px solid #727272;
          li {
            width: 203px;
            height: 273px;
            float: left;
            background-color: #333333;
            text-align: center;
            margin-left: 37px;
            margin-bottom: 35px;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            &:hover {
              div {
                display: block;
              }
              p {
                background: #f4d091;
                color: #fff;
              }
            }
            &:nth-of-type(5n + 1) {
              margin-left: 0;
            }
            i {
              display: block;
              height: 209px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            p {
              line-height: 64px;
              font-size: 16px;
              color: #333;
              background: #f0f0f0;
            }
            div {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              background-color: rgba(0, 0, 0, 0.6);
              display: none;
              span {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                width: 106px;
                height: 34px;
                border-radius: 34px;
                cursor: pointer;
                background: #fff;
                color: #fc501e;
                font-size: 17px;
                line-height: 34px;
              }
            }
          }
        }
      }
      .btm {
        // background-color: #010e17;
        height: 68px;
        overflow: hidden;
        text-align: center;
        padding-top: 20px;
        .btm-page {
          display: inline-block;
          overflow: hidden;
        }
        span {
          float: left;
          line-height: 32px;
          font-size: 16px;
          color: #6a6a6a;
          cursor: pointer;
        }
        .pages {
          float: left;
        }
      }
    }
  }
}
</style>
