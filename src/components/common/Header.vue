<template>
  <div class="header" v-if="NavList.length > 3">
    <div class="nav w1200">
      <div @click="$router.push({ name: 'HOME' })" style="cursor: pointer">
        <img :src="allConfig.webLogo" alt draggable="false" />
      </div>
      <ul @mouseleave="childNavShow = false">
        <li
          v-for="(item, i) in NavList"
          :key="i"
          :class="{ active: routerName === item.enName }"
          @click="tab(item.enName, item.list)"
          @mousemove="changeChildNav(item.classify, item.list, item.enName)"
        >
          <div>
            <span>{{ item.name }}</span>
            <p>{{ item.enName }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="childNav"
      :class="{ in: childNavShow }"
      @mouseleave="childNavShow = false"
      @mousemove="childNavShow = true"
    >
      <div class="lottery" v-if="type === 'LOTTERY'" key="lottery">
        <ul>
          <li
            v-for="(lottery, j) in childNavList[childNavList.length - 1][
              'list'
            ]"
            :key="j"
          >
            <h3>{{ lottery.gameTitle }}</h3>
            <p
              v-for="(lotteryChild, k) in lottery.gameData"
              @click="jumpLottery(lotteryChild.id)"
              :key="k"
            >
              {{ lotteryChild.title }}
            </p>
          </li>
        </ul>
        <div>
          <i
            v-for="(lottery, j) in childNavList.filter(
              item => item.typeKey !== 'LOTTERY'
            )"
            :key="j"
            @click="
              gotoPlay(
                lottery.typeKey,
                lottery.isHall,
                lottery.link,
                lottery.title
              )
            "
          >
            <img
              :src="
                commonImg(
                  `lottery/lottery-${lottery.typeKey.toLowerCase()}.png`
                )
              "
              alt
              draggable="false"
            />
          </i>
        </div>
        <!-- <dl>
          <dd
            v-for="(lottery, j) in childNavList.filter(
              item => item.typeKey !== 'LOTTERY'
            )"
            :key="j"
            @click="
              gotoPlay(
                lottery.typeKey,
                lottery.isHall,
                lottery.link,
                lottery.title
              )
            "
          >
            <div>
              <img :src="lottery.img" alt>
            </div>
            <p>{{ lottery.title }}</p>
            <i class="iconfont">&#xe6ee;</i>
          </dd>
        </dl>-->
      </div>
      <dl v-else key="other">
        <dd
          v-for="(child, j) in childNavList"
          :key="j"
          @click="
            gotoPlay(child.typeKey, child.isHall, child.link, child.title)
          "
        >
          <div>
            <img :src="child.img" alt draggable="false" />
          </div>
          <p>{{ child.title }}</p>
          <i class="iconfont">&#xe6ee;</i>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "my-Head",
  data() {
    return {
      childNavShow: false,
      childNavList: [],
      type: "",
      currentGame: "",
      lotteryUrl: "/api/auth/sLogin"
    };
  },
  created() {
    // console.log(this.navigationList, "navigationList");
    // if (!this.navigationList.length) {
    //   this.navigations();
    // }
    // console.log(this.NavList, "header---------------");
  },
  computed: {
    ...mapGetters(["navigationList", "allConfig"]),
    NavList() {
      // console.log(
      //   this.navigationList.navigation,
      //   "this.navigationList.navigation"
      // );
      let navList = [{ name: "首页", enName: "HOME" }];
      let ListLast = [
        { name: "活动", enName: "ACTIVITYS" },
        { name: "手机投注", enName: "MOBILE" }
      ];
      if (this.navigationList.navigation) {
        navList = navList
          .concat(this.navigationList.navigation)
          .concat(ListLast);
      } else {
        navList = navList.concat(ListLast);
      }
      return navList;
    },
    routerName() {
      return this.$router.currentRoute.name;
    }
  },
  methods: {
    ...mapActions(["navigations"]),
    tab(name, list) {
      // console.log(name, list, "1111s");
      this.$router.push({ name: name });
      if (name == "ACTIVITYS" || name == "MOBILE") {
        return;
      }
      if (list) {
        this.$store.commit("SET_CURRENT_GAME", list);
      }
    },
    changeChildNav(classify, list, enName) {
      // console.log(classify);
      this.type = enName;
      this.currentGame = list;
      if (list && classify !== "BY") {
        this.childNavShow = true;
        this.childNavList = list;
      } else {
        this.childNavShow = false;
      }
    },
    gotoPlay(type, isHall, link, title) {
      console.log(type, isHall, link, title, "gotoPlay");
      if (!isHall) {
        return this.playGame(link);
      }
      // this.$store.commit("SET_CURRENT_GAME", this.currentGame);
      this.$store.commit("CHANGE_TITLE", title);
      this.$router.push({ name: this.type, params: { typeKey: type } });
      // if(isHall) {
      //   this.$store.commit("SET_CURRENT_GAME", this.currentGame);
      //   this.$store.commit("CHANGE_TITLE", title);
      //   this.$router.push({name:this.type,query:{typeKey:type}});
      // }else {
      //   this.playGame(link);
      // }
    },
    jumpLottery(gameId) {
      if (!this.$store.getters.userInfo) {
        return this.$message.error({
          message: "请登录后开始游戏",
          showClose: true,
          duration: 1000,
          center: true
        });
      }
      window.open(
        this.lotteryUrl + "/gameId/" + gameId,
        "_blank",
        "height=700, width=1200, top=100, left=100"
      );
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  position: fixed;
  left: 0;
  top: 42px;
  right: 0;
  z-index: 1000;
  transition: 0.3s;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 25%,
    rgba(255, 255, 255, 0.7) 75%,
    rgba(255, 255, 255, 0) 100%
  );
  &:hover {
    background: #fff;
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    > div {
      width: 189px;
      height: 54px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    ul {
      width: 700px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      li {
        font-size: 18px;
        height: 100%;
        display: flex;
        align-items: center;
        color: #333333;
        cursor: pointer;
        text-align: center;
        border-bottom: 2px solid transparent;
        box-sizing: border-box;
        &:hover {
          color: #eaac02;
          border-bottom-color: #000;
        }
        span,
        p {
          text-align: center;
        }
        span {
          font-size: 14px;
        }
        p {
          font-size: 12px;
          color: #666666;
        }
        i {
          display: inline-block;
          margin-right: 10px;
          img {
            vertical-align: bottom;
          }
        }
      }
      .active {
        color: #eaac02;
      }
    }
  }
  .childNav {
    background-color: #fff;
    overflow: hidden;
    transition: 0.5s;
    height: 0;
    max-height: 0;
    &.in {
      height: auto;
      max-height: 280px;
      border-top: 1px solid #e9e8ea;
    }
    dl {
      display: flex;
      justify-content: center;
      align-items: center;
      dd {
        width: 120px;
        border-left: 1px solid #e9e8ea;
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        color: #666;
        &:last-child {
          border-right: 1px solid #e9e8ea;
        }
        &:hover {
          background: linear-gradient(#000000, #434343);
          color: #fff;
          img {
            filter: none;
          }
          i {
            color: #fff;
          }
        }
        div {
          width: 80px;
          height: 80px;
          margin-bottom: 10px;
          img {
            width: 100%;
            height: 100%;
            filter: grayscale(100%);
          }
        }
        i {
          font-size: 30px;
          color: #ccc;
          margin: 10px 0;
        }
      }
    }
    .lottery {
      display: flex;
      justify-content: center;
      ul {
        display: flex;
        justify-content: center;
        margin-right: 80px;
        li {
          padding-left: 20px;
          width: 120px;
          &:first-child {
            padding-left: 0;
          }
          h3 {
            color: #999;
            font-size: 14px;
            margin: 20px 0 10px 0;
          }
          p {
            line-height: 30px;
            border-left: 1px solid rgba(0, 0, 0, 0.1);
            padding-left: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            font-size: 14px;
            color: #333;
            &:hover {
              background: linear-gradient(#fe9739, #fd6c30);
              color: #fff;
            }
          }
        }
      }
      > div {
        margin-top: 27px;
        i {
          cursor: pointer;
          width: 343px;
          height: 100px;
          display: block;
          img {
            width: 100%;
            height: 100%;
            filter: grayscale(100%);
          }
          &:first-child {
            margin-bottom: 20px;
          }
          &:hover {
            img {
              filter: none;
            }
          }
        }
      }
    }
  }
}
</style>
