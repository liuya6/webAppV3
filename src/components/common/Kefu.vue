<template>
  <div class="kf">
    <div v-if="allConfig.tpl_pc == 'fumin'">
      <div class="huminWrapper">
        <ul>
          <li :class="{ marginLeft0: ifOpen }" @click="service" class="flexA">
            <i class="iconfont">&#xe752;</i>
            <p>在线客服</p>
          </li>
          <li :class="{ marginLeft0: ifOpen }" class="flexA" @click="qq">
            <i class="iconfont">&#xe751;</i>
            <p>QQ客服</p>
          </li>
          <li
            :class="{ marginLeft0: ifOpen }"
            @click="registerFrees"
            class="flexA"
          >
            <i class="iconfont">&#xe753;</i>
            <p>免费试玩</p>
          </li>
        </ul>
        <div
          class="wrap"
          :class="{ marginLeft0: ifOpen }"
          :style="`background: url(${commonImg('home/codeBg.png')}) no-repeat`"
        >
          <div class="flexS">
            <i class="iconfont">&#xe754;</i>
            <img
              v-if="allConfig.length != 0"
              :src="allConfig.iphoneErweima || allConfig.androidErweima"
              alt="APP下载二维码"
              draggable="false"
            />
          </div>
          <p>下载APP</p>
        </div>
        <img
          class="open"
          :src="
            ifOpen ? commonImg('home/collapse.png') : commonImg('home/open.png')
          "
          @click="shrink"
          alt
        />
      </div>
    </div>
    <div
      v-else
      class="dingWrapper"
      :class="{ dingClose: !ifOpenRight }"
      style="top:350px"
    >
      <div v-if="ifOpenRight">
        <img class="bg" :src="commonImg('home/dingWrapperBg.png')" alt />
        <div class="wrap">
          <div class="close" @click="close(true)">-</div>
          <div class="box flexC" @click="service">
            在线客服
            <div class="flexC">
              <i class="iconfont">&#xe752;</i>
            </div>
          </div>
          <div class="box boxQQ" @click="qq">
            <div class="text">QQ客服</div>
            <div class="flexC">
              <i class="iconfont">&#xe751;</i>
            </div>
            <p>{{ allConfig.qqkefuGG }}</p>
          </div>
          <div class="box flexC" @click="$router.push({ name: 'MOBILE' })">
            APP下载
            <div class="flexC">
              <i class="iconfont">&#xe750;</i>
            </div>
          </div>
        </div>
        <img
          class="goTop"
          @click="goTop"
          :src="commonImg('home/goTop.png')"
          alt
        />
      </div>
      <div v-else class="closeBox" @click="close">
        <div class="flexC">
          <i class="iconfont">&#xe752;</i>
        </div>
        <div class="flexC">
          <i class="iconfont">&#xe751;</i>
        </div>
        <div class="flexC">
          <i class="iconfont">&#xe750;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { registerFree } from "../../api";
export default {
  name: "my-Kefu",
  data() {
    return {
      src: "",
      index: "",
      ifOpen: false,
      freePlay: false,
      href: "",
      // routeAbout: false,
      ifOpenRight: true
    };
  },
  props: ["kefuOnline"],
  created() {
    if (this.allConfig.tpl_pc == "fumin") return;
    console.log(this.closeService, "this.closeService");
    if (this.closeService) {
      this.ifOpenRight = false;
    }
    this.$nextTick(() => {
      let wrapper = document.getElementsByClassName("dingWrapper")[0];
      window.addEventListener("scroll", () => {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        wrapper.style.top = scrollTop + 300 + "px";
      });
    });
    // if (this.$route.name == "about") {
    //   this.routeAbout = true;
    // } else {
    //   this.$nextTick(() => {
    //     let wrapper = document.getElementsByClassName("CodeWrapper")[0];
    //     window.addEventListener("scroll", () => {
    //       let scrollTop =
    //         window.pageYOffset ||
    //         document.documentElement.scrollTop ||
    //         document.body.scrollTop;
    //       wrapper.style.top = scrollTop + 300 + "px";
    //     });
    //   });
    // }
  },
  methods: {
    close(e) {
      if (e) {
        this.$store.commit("RETRACT_SERVICE", !this.closeService);
      }
      this.ifOpenRight = !this.ifOpenRight;
    },
    goTop() {
      window.scrollTo(0, 0);
    },
    changeImg(src, i) {
      if (this.index == i) return;
      // this.$router.push({name:'download'})
      this.src = src;
      this.index = i;
    },
    service() {
      window.open(
        this.allConfig.kefuGG,
        "_blank",
        "height=700, width=1200, top=100, left=100"
      );
    },
    qq() {
      let qq = this.allConfig.qqkefuGG;
      window.open(
        "https://jlwz.cn/qq/?qq=" + qq,
        // "http://wpa.qq.com/msgrd?v=3&uin=" + qq,
        // "tencent://message/?uin="+qq+"&Site=sc.chinaz.com&Menu=yes",
        "_blank",
        "height=700, width=1200, top=100, left=100"
      );
    },
    shrink() {
      this.ifOpen = !this.ifOpen;
    },
    registerFrees() {
      if (this.userInfo.parentId == 312) {
        this.$message({
          type: "error",
          showClose: true,
          message: "当前已是试玩状态",
          duration: 1000
        });
        return;
      }
      registerFree().then(res => {
        let type;
        if (res.status) {
          type = "success";
          this.$store.commit("SET_USER_INFO", res.data);
          this.freePlay = true;
        } else {
          type = "error";
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg,
          duration: 1000
        });
      });
    }
  },
  computed: {
    ...mapGetters(["allConfig", "userInfo", "closeService"])
  }
};
</script>
<style lang="scss" scoped>
.huminWrapper {
  position: fixed;
  width: 188px;
  height: 195px;
  top: 230px;
  right: 0;
  transition: 0.2s ease-out;
  z-index: 20;
  color: #f3c666;
  ul {
    li {
      width: 188px;
      height: 64px;
      padding-bottom: 1px;
      background: url("../../assets/home/kefuBg.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 126px;
      cursor: pointer;
      transition: 0.2s ease-out;
      i {
        font-size: 38px;
      }
      p {
        font-size: 16px;
        margin-right: 20px;
      }
    }
    li:hover {
      margin-left: 0;
    }
    a {
      color: #f3c666;
    }
  }
  .wrap {
    background-size: 100% 100%;
    padding: 14px 6px 0 12px;
    width: 188px;
    margin-left: 126px;
    transition: 0.2s ease-out;
    i {
      font-size: 38px;
    }
    img {
      width: 120px;
      margin-left: 12px;
    }
    p {
      text-align: center;
      padding-left: 40px;
      padding-bottom: 4px;
      color: #999;
    }
  }
  .wrap:hover {
    margin-left: 0;
  }
  .open {
    position: fixed;
    right: 0;
    cursor: pointer;
  }
  .marginLeft0 {
    margin-left: 0;
  }
}
.dingWrapper {
  width: 172px;
  height: 351px;
  position: absolute;
  right: 0;
  z-index: 100;
  transition: 0.5s;
  border-radius: 4px;
  &:hover {
    .goTop {
      bottom: -28px;
    }
  }
  &.dingClose {
    width: 38px;
  }
  .closeBox {
    margin-top: 104px;
    cursor: pointer;
    .flexC {
      background: linear-gradient(#fb9e3b, #fb6b3f);
      width: 32px;
      height: 32px;
      border: 2px solid #fff;
      color: #fff;
      border-radius: 50%;
      margin-top: 40px;
      i {
        font-size: 24px;
      }
    }
  }
  .bg {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .wrap {
    position: absolute;
    z-index: 2;
    padding-top: 70px;
    padding-left: 52px;
    .close {
      margin-left: 90px;
      font-size: 32px;
      line-height: 15px;
      box-sizing: border-box;
      color: #fff;
      text-align: center;
      text-shadow: rgba(0, 0, 0, 0.3) -1px 1px 1px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4), 0 0 5px rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      border: 2px solid #fff;
      width: 23px;
      height: 23px;
      cursor: pointer;
    }
    .box {
      background: linear-gradient(#fb9e3b, #fb6b3f);
      width: 110px;
      height: 38px;
      border: 2px solid #fff;
      color: #fff;
      border-radius: 4px;
      font-size: 16px;
      margin-top: 28px;
      position: relative;
      cursor: pointer;
      .flexC {
        background: linear-gradient(#fb9e3b, #fb6b3f);
        position: absolute;
        width: 32px;
        height: 32px;
        border: 2px solid #fff;
        border-radius: 50%;
        left: -20px;
        top: -15px;
        i {
          font-size: 24px;
        }
      }
    }
    .boxQQ {
      height: 50px;
      text-align: center;
      .text {
        font-size: 15px;
        margin-top: 4px;
      }
    }
  }
  .goTop {
    position: absolute;
    right: 10px;
    bottom: -11px;
    transition: 0.3s;
    cursor: pointer;
  }
}
</style>
