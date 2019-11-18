<template>
  <div
    class="footer"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="top">
      <ul class="w1200 footUl flexC" v-if="footList">
        <li v-for="(item, i) in footList" :key="i" class="flexC">
          <img
            :src="commonImg(`icons/footer${i + 1}.png`)"
            alt
            draggable="false"
          />
          <div>
            <div>{{ item.div }}</div>
            <p>{{ item.p }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="w1200 wrap">
      <div class="main">
        <div>
          <div class="title">
            技术支持
            <span>Technical support</span>
          </div>
          <img :src="commonImg('home/footLogo.png')" alt draggable="false" />
          <p>吉祥用户研究与体验设计中心</p>
          <p>JX Customer Research & User Experience Design Center</p>
        </div>
        <div>
          <div class="title">
            合作伙伴
            <span>Partner</span>
          </div>
          <marquee
            behavior="alternate"
            width="720"
            loop="-1"
            scrollamount="8"
            onMouseOut="this.start()"
            onMouseOver="this.stop()"
          >
            <div class="marqueeDiv">
              <div v-for="(item, i) in navigationList.footerLogo" :key="i">
                <img :src="item.img" draggable="false" />
              </div>
            </div>
          </marquee>
        </div>
      </div>
      <ul class="listUl flexS">
        <!-- @click="details(item.list, i)" -->
        <li
          v-for="(item, i) in navigationList.footerConfig"
          :key="i"
          @click="aboutIndex(item.typeName, i)"
        >
          {{ item.typeName }}
        </li>
      </ul>
    </div>
    <p class="lastP">
      Auspicious持有菲律宾政府PAGCOR (Philippine Amusement and Gaming
      Corporation) 颁发的离岸博彩许可证并受其监督 (c) 2010-2019
      Auspicious版权所有
    </p>
    <!-- <div @click="close" class="popup" v-show="showFlag">
      <div class="content" @click.stop>
        <span @click="close">x</span>
        <div v-for="(item, i) in detail" :key="i">
          <h3>{{ item.title }}</h3>
          <div v-html="item.content"></div>
        </div>
      </div>
    </div>-->
    <div @click="close" class="popup" v-show="showFlag">
      <div class="content" @click.stop>
        <div class="tabContent">
          <ul>
            <li
              v-for="(item, i) in navigationList.footerConfig"
              :key="i"
              @click="changeContent(item.list, i)"
              :class="{ on: i == index }"
            >
              {{ item.typeName }}
            </li>
          </ul>
        </div>
        <div class="right">
          <span @click="close">x</span>
          <div v-for="(item, i) in detail" :key="i">
            <h3>{{ item.title }}</h3>
            <div v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "my-Foot",
  data() {
    return {
      detail: "",
      index: 0,
      showFlag: false,
      loading: false,
      footList: [
        {
          // imgSrc: "/images/new/footer1.png",
          div: "客户至上",
          p: "24×7为您提供优质服务"
        },
        {
          // imgSrc: "/images/new/footer2.png",
          div: "领先品牌",
          p: "业界博彩领先者"
        },
        {
          // imgSrc: "/images/new/footer3.png",
          div: "资金安全保障",
          p: "资金护航 博彩无忧"
        },
        {
          // imgSrc: "/images/new/footer4.png",
          div: "游戏多元",
          p: "提供上千款在线游戏"
        }
      ],
      list: []
    };
  },
  created() {
    // console.log(window.location.origin,'window.location.href')
    // console.log(this.navigationList, "navigationList");
  },
  computed: {
    ...mapGetters(["navigationList"])
  },
  methods: {
    ...mapActions(["navigations"]),
    aboutIndex(name, i) {
      // console.log(name, name.indexOf("DNS"), "name.indexOfDNS");
      if (name.indexOf("DNS") != -1) {
        this.$router.push({ name: "dns" });
      } else if (name.indexOf("技术") != -1) {
        this.$router.push({ name: "technology" });
        // window.open(window.location.origin+'/technology');
      } else {
        this.$router.push({ name: "about", query: { index: i } });
      }
    },
    details(content, i) {
      this.detail = content;
      this.showFlag = true;
      this.index = i;
    },
    changeContent(content, i) {
      this.detail = content;
      this.index = i;
    },
    // details(id) {
    //   console.log( id, " id");
    //   if (id == "注册") {
    //     return this.$router.push({ name: "register" });
    //   }
    //   this.loading = true;
    //   ArticleDetail({ id: id }).then(res => {
    //     console.log( res.data, " res.data");
    //     this.loading = false;
    //     if (res.status) {
    //       this.detail = res.data;
    //       this.showFlag = true;
    //     }
    //   });
    // },
    close() {
      this.showFlag = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  background: #1a1a1a;
  overflow: hidden;
  .top {
    border-bottom: 1px solid #676767;
    .footUl {
      height: 85px;
      padding-left: 20px;
      li {
        width: 25%;
        img {
          width: 40px;
          height: 40px;
          margin: 20px;
        }
        div {
          div {
            font-size: 18px;
            color: #fff;
          }
        }
        p {
          color: #7d8090;
        }
      }
    }
  }
  .wrap {
    padding: 20px;
    .main {
      display: flex;
      > div:first-child {
        margin-right: 40px;
        img {
          width: 140px;
          margin-bottom: 6px;
          // height: 50px;
        }
      }
      .title {
        font-size: 20px;
        color: #fff;
        margin-bottom: 20px;
      }
      span {
        font-size: 12px;
        margin-left: 6px;
        color: #7d8090;
      }
      p {
        font-size: 14px;
        color: #999999;
      }
      marquee {
        margin-top: 20px;
        .marqueeDiv {
          display: flex;
          div {
            margin-right: 10px;
          }
          img {
            height: 80px;
          }
          p {
            text-align: center;
            // font-size: 14px;
          }
        }
      }
    }
  }

  .listUl {
    padding-top: 20px;
    padding-bottom: 6px;
    li {
      padding: 0 20px;
      font-size: 14px;
      color: #fff;
      border-right: 1px solid #575757;
      cursor: pointer;
    }
    li:first-child {
      padding-left: 0;
    }
    // li:nth-last-child(2),
    li:last-child {
      border-right: 0;
    }
    // li:last-child {
    //   padding-left: 40px;
    //   cursor: initial;
    // }
  }
  .lastP {
    color: rgb(163, 163, 163);
    text-align: center;
    border-top: 1px solid #575757;
    padding-top: 10px;
    padding-bottom: 20px;
  }
}
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3000;
  //旧版单个弹窗
  // .content {
  //   background-color: #fff;
  //   width: 60%;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   padding: 10px 40px 0 40px;
  //   height: 72%;
  //   overflow-y: scroll;
  //   border-radius: 10px;
  //   h3 {
  //     text-align: center;
  //     margin: 20px 0;
  //     color: #000;
  //     font-size: 17px;
  //     font-weight: bold;
  //   }
  //   span {
  //     position: absolute;
  //     right: 20px;
  //     top: 10px;
  //     cursor: pointer;
  //     font-size: 30px;
  //     color: #000;
  //   }
  //   div {
  //     font-size: 16px;
  //     color: #666;
  //   }
  // }
  // .content::-webkit-scrollbar {
  //   display: none;
  // }

  .content {
    background-color: #fff;
    width: 60%;
    height: 72%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    .tabContent {
      height: 100%;
      border-right: 1px solid #e3ebf6;
      ul {
        .on {
          background-color: #e4e4e4;
        }
        li {
          width: 160px;
          height: 80px;
          text-align: center;
          box-sizing: border-box;
          border-bottom: 1px dashed #e3ebf6;
          cursor: pointer;
          line-height: 80px;
          color: #333333;
          font-size: 15px;
        }
      }
    }
    .right {
      overflow-y: scroll;
      padding: 8px 30px 20px 30px;
      h3 {
        text-align: center;
        margin: 18px 0;
        color: #000;
        font-size: 17px;
        font-weight: bold;
      }
      span {
        position: absolute;
        right: 13px;
        top: 5px;
        cursor: pointer;
        font-size: 36px;
        color: #000;
      }
      div {
        font-size: 16px;
        color: #666;
        line-height: 32px;
      }
    }
    .right::-webkit-scrollbar {
      display: none;
    }
  }
}

@media screen and (max-width: 1400px) {
  .footer {
    .footer_content {
      padding: 20px 0 0 20px;
      a {
        font-size: 12px !important;
      }
      a.active {
        bottom: 55px;
        right: 0;
      }
    }
  }
}
</style>
