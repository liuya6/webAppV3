<template>
  <div class="download" v-title="'手机投注'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <!-- <my-kefu></my-kefu> -->
    <div class="content">
      <div
        class="topImg"
        :style="`background-image:url(${staticZhpUrl}download/top.png)`"
      ></div>
      <div class="erweima">
        <div class="imgWrap">
          <div class="imgBox">
            <img
              :src="allConfig.androidErweima"
              alt="APP下载二维码"
              draggable="false"
            />
          </div>
          <div class="imgBox">
            <img
              :src="allConfig.iphoneErweima"
              alt="APP下载二维码"
              draggable="false"
            />
          </div>
        </div>
        <ul>
          <li class="flexS" :class="{ active: index == 0 }">
            <i class="iconfont">&#xe74d;</i>
            <div class="right">
              <p>Android</p>
              <div>安卓版下载</div>
            </div>
          </li>
          <li class="flexS" :class="{ active: index == 1 }">
            <i class="iconfont">&#xe74e;</i>
            <div class="right">
              <p>Iphone</p>
              <div>苹果版下载</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="top">
        <p>安全可靠 让你的账户更安全</p>
        <div>
          我们为了保障在Internet上数据传输之安全，利用数据加密(Encryption)技术，
        </div>
        <div>可确保数据在网络上之传输过程中不会被截取及窃听</div>
      </div>
      <div class="middle">
        <div class="main">
          <p>
            IOS安装步骤
            <span>SERVICE</span>
          </p>
          <div>
            由于苹果大量封杀软件，为了更好的用户体验，请大家记住官网，若软件信任
          </div>
          <div>证书失效无法进入时，重新下载信任即可</div>
          <ul>
            <li
              class="flexS"
              v-for="(item, i) in list"
              :class="[{ stayLi: imgI == i }]"
              :key="i"
              @click="changeStep(i)"
            >
              <span class="flexC">第{{ i + 1 }}步</span>
              <p>{{ item }}</p>
              <img
                class="step"
                :src="`${staticZhpUrl}download/step${i}.png`"
                alt
                draggable="false"
              />
            </li>
          </ul>
          <img
            class="stepWrap"
            :src="`${staticZhpUrl}download/stepWrap.png`"
            alt
            draggable="false"
          />
        </div>
      </div>
      <div class="bottom flexB">
        <img
          class="phone2"
          :src="`${staticZhpUrl}download/bottom.png`"
          alt
          draggable="false"
        />
        <div>
          <p>拿你手上的 APP比一比。</p>
          <div>总想给你不一样的全新UI,更多内容一目了然</div>
        </div>
      </div>
    </div>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MOBILE",
  data() {
    return {
      list: [
        "Iphone手机主界面找到设置",
        "设置中选择“通用”",
        "找到设备管理",
        // "选择吉祥国际",
        "点击蓝色“信任...”",
        "选择信任按钮，完成安装"
      ],
      src: "",
      index: 3,
      imgI: 0
    };
  },

  created() {
    if (this.downloadText) {
      this.list.splice(3, 0, this.downloadText);
    } else {
      setTimeout(() => {
        if (this.downloadText) {
          this.list.splice(3, 0, this.downloadText);
        }
      }, 500);
    }
  },
  methods: {
    changeImg(src, i) {
      if (this.src == src) return;
      this.src = src;
      this.index = i;
    },
    changeStep(i) {
      this.imgI = i;
      console.log(this.imgI, i, "iiiiiiiiiiiii");
    }
  },
  computed: {
    ...mapGetters(["downloadText", "staticZhpUrl", "allConfig"])
  }
};
</script>

<style scoped lang="scss">
.download {
  color: #fff;
  .content {
    margin-top: 42px;
    position: relative;
    .topImg {
      // background: url("/images/download/top.png") no-repeat;
      height: 580px;
      background-size: 100% 100%;
    }
    .erweima {
      position: absolute;
      top: 18.4%;
      left: 52%;
      // display: flex;
      .imgWrap {
        display: flex;
        .imgBox {
          border-radius: 10px;
          border: 5px solid #fff;
          margin-right: 50px;
          img {
            width: 120px;
            height: 120px;
          }
        }
      }
      ul {
        display: flex;
        margin-left: -10px;
        li {
          width: 120px;
          padding: 0 20px 0 10px;
          height: 54px;
          background-color: #474747;
          // background-color: #b6b6b6;
          // cursor: pointer;
          border-radius: 10px;
          color: #fff;
          margin-top: 10px;
          i {
            font-size: 38px;
            margin-right: 12px;
          }
          .right {
            p {
              font-size: 17px;
              font-weight: bold;
            }
            div {
              font-size: 12px;
            }
          }
        }
        .active {
          background-color: #474747;
        }
        li:first-child {
          margin-right: 30px;
        }
        li:hover {
          background-color: #474747;
        }
      }
    }

    .top {
      height: 110px;
      padding: 86px 0;
      text-align: center;
      p {
        margin-bottom: 24px;
        font-size: 32px;
        color: #000;
        font-weight: bold;
      }
      div {
        font-size: 20px;
        color: #333333;
        margin-bottom: 8px;
      }
    }
    .middle {
      height: 576px;
      background-color: #3d3744;
      .main {
        width: 1010px;
        margin: auto;
        position: relative;
        > p {
          font-size: 34px;
          padding-top: 42px;
          padding-bottom: 17px;
          span {
            font-size: 24px;
            color: #6a676d;
          }
        }
        > div {
          font-size: 16px;
          color: #ffb423;
        }
        .stepWrap {
          height: 731px;
          position: absolute;
          right: -77px;
          top: -41px;
          z-index: 10;
        }
        ul {
          padding-top: 24px;
          li {
            display: flex;
            padding-bottom: 14px;
            height: 52px;
            cursor: pointer;
            span {
              width: 52px;
              height: 53px;
              background-color: #7a7a7a;
              border-radius: 50%;
              color: #3d3744;
              font-size: 16px;
              margin-right: 26px;
            }
            p {
              font-size: 22px;
              color: #6a676d;
            }
            .step {
              position: absolute;
              right: 0;
              top: -16px;
              opacity: 0;
              transition: all 0.3s ease-in-out;
            }
          }
          .stayLi {
            span {
              background-color: #f5f5f7;
            }
            p {
              color: #fff;
            }
            .step {
              opacity: unset;
            }
          }
          li:hover {
            span {
              background-color: #f5f5f7;
            }
            p {
              color: #fff;
            }
            .step {
              z-index: 1;
              opacity: unset;
            }
          }
        }
      }
    }
    .bottom {
      height: 424px;
      padding-top: 110px;
      width: 1148px;
      margin: auto;
      > div {
        p {
          font-size: 42px;
          color: #000;
          font-weight: bold;
          margin-bottom: 20px;
        }
        div {
          padding-left: 38px;
          color: #333333;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
