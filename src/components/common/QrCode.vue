<template>
  <div class="qrBox">
    <vue-qr :text="myQrUrl" :size="320" crossorigin="anonymous" dotScale="1" />
    <!-- :bgSrc="srcBg" -->
    <div class="dib">
      <p @click="showImg">展示</p>
      <div @click="showImg">
        <!-- <a :href="QrImg" :download="QrImg" class="event">下载</a> -->
        下载
      </div>
      <div class="imgWrap" :class="{ showImg: show }">
        <div class="imgWrapBox" ref="refBox">
          <img class="imgBg" :src="srcBg" alt crossorigin="anonymous" />
          <img :src="codeImg" class="qrImg" alt crossorigin="anonymous" />
          <p>{{ promotionCode }}</p>
        </div>
        <a class="shadow flexC" :href="QrImg" :download="QrImg">
          <div class="download">立即下载</div>
        </a>
        <img
          @click="showImg"
          src="../../assets/redPack/icon-close.png"
          alt
          draggable="false"
          class="close"
        />
      </div>
      <vue-qr
        v-if="show"
        :text="myQrUrl"
        margin="0"
        :callback="callback"
        style="display: none"
        crossorigin="anonymous"
        dotScale="1"
      />
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  name: "QrCode",
  data() {
    return {
      codeImg: "",
      QrImg: "",
      srcBg: require("../../assets/qrbg.png"),
      show: false
    };
  },
  props: {
    myQrUrl: String,
    promotionCode: String
  },
  methods: {
    callback(dataUrl) {
      if (dataUrl) {
        // console.log(dataUrl,'dataUrl')
        this.codeImg = dataUrl;
        let _this = this;
        this.$nextTick(() => {
          // console.log(this.$refs.refBox, "this.$refs.refBox");
          html2canvas(this.$refs.refBox, {
            allowTaint: false, //是否允许污染
            taintTest: true, //在渲染前测试图片(没整明白有啥用)
            useCORS: true //使用跨域(当allowTaint为true时这段代码没什么用)
          }).then(function(canvas) {
            // console.log(canvas, "canvas");
            // console.log(canvas.toDataURL(), "canvas.toDataURL()");
            if (canvas.toDataURL().length > 10) {
              _this.QrImg = canvas.toDataURL();
            }
          });
        });
      }
    },
    showImg() {
      this.show = !this.show;
      // if (this.show == true) {
      //   setTimeout(() => {
      //     this.show = false;
      //   }, 5000);
      // }
    }
  }
};
</script>

<style scoped lang="scss">
.qrBox {
  display: flex;
  > img {
    width: 100px;
    height: 100px;
    display: inline-block;
    vertical-align: middle;
  }
  .dib {
    padding-top: 30px;
    line-height: 20px;
    position: relative;
    color: blue;
    cursor: pointer;
    &:hover {
      color: #fea24d;
      // .imgWrapBox {
      //   visibility: visible;
      // }
    }
    .imgWrap {
      visibility: hidden;
      position: fixed;
      top: 24%;
      right: 8%;
      &:hover {
        .shadow {
          visibility: visible;
        }
      }
    }
    .imgWrapBox {
      position: relative;
      z-index: 1;
      width: 310px;
      height: 349px;
      img {
        z-index: 3;
      }
      .imgBg {
        width: 100%;
        height: 100%;
      }
      .qrImg {
        position: absolute;
        top: 204px;
        left: 35px;
        width: 90px;
      }
      p {
        position: absolute;
        width: 120px;
        right: 60px;
        top: 254px;
        color: #000;
        font-size: 19px;
      }
    }
    .shadow {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      top: 0;
      z-index: 2;
      visibility: hidden;
    }
    .download {
      // position: absolute;
      // bottom: -40px;
      // left: 106px;
      width: 120px;
      height: 40px;
      line-height: 40px;
      background: linear-gradient(1deg, #ff8229, #ff461c);
      color: white;
      border-radius: 20px;
    }
    .close {
      position: absolute;
      top: -30px;
      right: -30px;
      transition: 0.3s;
      &:hover {
        transform: rotate(90deg);
      }
    }
    .showImg {
      visibility: visible;
    }
  }
  // .event {
  //   color: blue;
  //   cursor: pointer;
  //   &:hover {
  //     color: #fea24d;
  //   }
  // }
}
</style>
