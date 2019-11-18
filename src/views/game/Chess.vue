<template>
  <div class="chess" @keydown.enter="searchGames" v-title="'棋牌'">
    <my-kefu></my-kefu>
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <div class="content">
      <div
        class="topWrap"
        :style="`background: url(${staticZhpUrl}chess/chessBg0.png) no-repeat`"
      >
        <div class="top w1200">
          <dl class="cl">
            <dd
              v-for="(item, i) in homeToPoker"
              :key="i"
              :class="[{ on: gameDetail.typeKey === item.typeKey }]"
              @click="changeGame(item.typeKey, item.title)"
            >
              <div class="chessItem">
                <img :src="item.img" alt="x" draggable="false" />
                <p>{{ item.title }}</p>
              </div>
              <div class="line"></div>
            </dd>
          </dl>
        </div>
      </div>
      <div
        class="chess-content"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :style="`background: url(${staticZhpUrl}chess/chessBg1.png) no-repeat`"
      >
        <div class="middle w1200">
          <div class="title">
            <span>{{ title || refreshTitle }}-全部游戏（{{ total }}个）</span>
            <div>
              <input
                type="text"
                placeholder="请输入游戏名称"
                v-model="searchGameTitle"
              />
              <i class="iconfont" @click="searchGames">&#xe749;</i>
            </div>
          </div>
          <ul>
            <li
              v-for="(item, j) in gameList"
              :key="j"
              @click="playGame(item.link)"
            >
              <i>
                <img :src="item.img" alt draggable="false" />
              </i>
              <p>{{ item.title }}</p>
              <div>开始游戏</div>
            </li>
          </ul>
        </div>
        <div class="btm" v-show="total">
          <div class="btm-page">
            <span @click="firstPage(1)">首页</span>
            <el-pagination
              class="page"
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
  name: "Chess",
  data() {
    return {
      active: 0,
      refreshTitle: "",
      gameDetail: {
        typeKey: "YiYou",
        classify: "QP",
        pageSize: 15,
        page: 1
      },
      searchGameTitle: ""
    };
  },
  created() {
    console.log(this.homeToPoker, "homeToPoker");
    if (this.$route.params.typeKey) {
      this.gameDetail.typeKey = this.$route.params.typeKey;
    } else {
      if (this.homeToPoker.length) {
        this.gameDetail.typeKey = this.homeToPoker[0].typeKey;
        this.refreshTitle = this.homeToPoker[0].title;
      } else {
        setTimeout(() => {
          if (this.homeToPoker.length) {
            this.refreshTitle = this.homeToPoker[0].title;
          }
        }, 500);
      }
    }
    this.SET_GAME_LIST("");
    this.$store.commit("CHANGE_LOADING", 1);
    this.hallTypes(this.gameDetail);
  },
  computed: {
    ...mapGetters([
      "homeToPoker",
      "gameList",
      "total",
      "title",
      "loading",
      "staticZhpUrl"
    ])
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
  methods: {
    ...mapActions(["hallTypes", "serchGames"]),
    ...mapMutations(["CHANGE_LOADING", "SET_GAME_LIST"]),
    changeGame(type, title) {
      this.$store.commit("CHANGE_LOADING", 1);
      this.$store.commit("CHANGE_TITLE", title);
      this.gameDetail.typeKey = type;
      this.gameDetail.page = 1;
      this.hallTypes(this.gameDetail);
      if (this.active == 0) {
        this.active = "";
      }
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
.chess {
  color: #fff;
  .content {
    margin-top: 42px;
    overflow: hidden;
    img {
      height: 100%;
    }
    .topWrap {
      height: 517px;
      // background: url("/images/game/chessBg0.png") no-repeat;
      background-size: 100% 100% !important;
      .top {
        padding-top: 360px;
        dl {
          height: 130px;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
          display: flex;
          dd {
            cursor: pointer;
            position: relative;
            flex: 1;
            text-align: center;
            position: relative;
            &.on {
              .chessItem {
                img {
                  filter: none;
                }
              }
            }
            .chessItem {
              width: 164px;
              height: 80px;
              margin: 13px auto 0;
              text-align: center;
              img {
                display: inline-block;
                filter: grayscale(100%);
              }
              .bright {
                filter: none;
              }
            }
            .chessItem:hover {
              img {
                filter: none;
              }
            }
            .line {
              position: absolute;
              background: rgba(255, 255, 255, 0.2);
              width: 1px;
              height: 90px;
              top: 18px;
            }
            p {
              line-height: 28px;
            }
            i {
              border: 10px solid transparent;
              border-top-color: #fff;
              position: absolute;
              bottom: -20px;
              left: 50%;
              transform: translate(-50%);
              display: none;
            }
          }
        }
      }
    }
    .chess-content {
      width: 100%;
      min-height: 500px;
      // background: url("/images/game/chessBg1.png") no-repeat;
      background-size: 100% 100% !important;
      .middle {
        min-height: 500px;
        .title {
          color: white;
          text-align: left;
          overflow: hidden;
          width: 100%;
          span {
            line-height: 92px;
            font-size: 18px;
            color: #c7944b;
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
              display: inline-block;
              vertical-align: top;
              height: 37px;
              width: 174px;
              border: none;
              font-size: 17px;
              color: #c7944b;
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
          height: 850px;
          // border-bottom: 1px solid #727272;
          li {
            width: 211px;
            height: 243px;
            float: left;
            margin-left: 35px;
            margin-bottom: 40px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            &:nth-of-type(5n + 1) {
              margin-left: 0;
            }
            &:hover {
              border: 2px solid #eec58f;
              border-radius: 10px;
              div {
                top: 190px;
              }
              p {
                display: none;
              }
            }
            i {
              display: block;
              width: 150px;
              height: 150px;
              margin: 20px auto 0;
            }
            p {
              text-align: center;
              margin: 23px auto 0;
              font-size: 17px;
              color: #fff;
            }
            div {
              position: absolute;
              top: 300px;
              left: 50px;
              width: 106px;
              height: 34px;
              background: linear-gradient(#eec58f, #c18d40);
              text-align: center;
              line-height: 34px;
              font-size: 17px;
              color: #333;
              cursor: pointer;
              border-radius: 34px;
              transition: 0.3s;
            }
          }
          .on {
            background: url("/images/game/bg-on.png") no-repeat;
          }
        }
      }
      .btm {
        // background-color: #22262a;
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
        .page {
          float: left;
        }
      }
    }
  }
}
</style>
