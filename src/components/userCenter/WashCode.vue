<template>
  <div
    v-loading="loading"
    class="washCode"
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
        <div class="content">
          <div v-if="item.typeKey === 'self'" class="self">
            <h3>
              <span>洗码总额（元）</span>
              <span>{{ toFixeds(washCodeMoney) }}</span>
              <b @click="getWashCode">一键洗码</b>
            </h3>
            <ul class="washTitle flexC">
              <li>游戏类型</li>
              <li>可结算有效投注额</li>
              <li>未结算洗码金额</li>
              <!--              <li>当周总有效投注额</li>-->
            </ul>
            <ul class="listUl">
              <li v-for="(item, i) in washCodeList" :key="i" class="flexS">
                <div>
                  {{ item.typeName }}
                </div>
                <div>{{ toFixeds(item.totalBetAmount) }}</div>
                <div>
                  <p>
                    <span>{{ toFixeds(item.totalWashcodeAmount) }}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="aboutWashCode">
            <div class="aboutTitle">
              <div
                v-for="(oItem, i) in titleList"
                :key="i"
                @click="onChange(oItem.type)"
                :class="{ active: aboutActive === oItem.type }"
              >
                {{ oItem.title }}
              </div>
            </div>
            <div class="aboutContent">
              <div class="list" v-for="(roteItem, j) in washCodeRate" :key="j">
                <div>
                  {{ roteItem.typeName }}
                </div>
                <ul>
                  <li v-for="(rateChild, k) in roteItem.list" :key="k">
                    <span>{{ rateChild.name }}</span
                    >{{ rateChild.rate }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { washCodeStatistics, getWashcode, washCodeRateList } from "../../api";
export default {
  name: "WashCode",
  data() {
    return {
      loading: false,
      TitleList: [
        {
          title: "实时洗码",
          typeKey: "self"
        },
        {
          title: "洗码比例",
          typeKey: "about"
        }
      ],
      activeName: "self",
      washCodeList: [],
      washCodeMoney: "",
      titleList: [
        { title: "当前等级", type: "current" },
        { title: "下一等级", type: "next" }
      ],
      aboutActive: "current",
      aboutWashCodeValue: "",
      washCodeRate: ""
    };
  },
  created() {
    this.washCode();
    console.log(this.washCodeRateArr);
    if (!this.washCodeRateArr || !this.washCodeRateArr.currentWashcodeRate) {
      washCodeRateList().then(res => {
        console.log(res);
        if (res.status) {
          this.$store.commit("SET_WASH_CODE_ARR", res.data);
          this.washCodeRate = res.data.currentWashcodeRate;
        }
      });
    } else {
      this.washCodeRate = this.washCodeRateArr.currentWashcodeRate;
    }
  },
  computed: {
    ...mapGetters(["userInfo", "washCodeRateArr"])
  },
  methods: {
    getWashCode() {
      if (this.washCodeMoney < 1) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "金额不能小于1元",
          duration: 1000
        });
      }
      getWashcode().then(res => {
        console.log(res);
        let type = "error";
        if (res.status) {
          type = "success";
          this.washCode();
          this.$store.dispatch("userDetails");
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg,
          duration: 1000
        });
      });
    },
    washCode() {
      this.loading = true;
      washCodeStatistics().then(res => {
        this.loading = false;
        if (res.status) {
          this.washCodeList = res.data.list;
          this.washCodeMoney = res.data.washcodeCoin;
        }
      });
    },
    onChange(type) {
      if (this.aboutActive === type) {
        return;
      }
      this.aboutActive = type;
      if (type === "next") {
        this.washCodeRate = this.washCodeRateArr.nextWashcodeRate;
      } else {
        this.washCodeRate = this.washCodeRateArr.currentWashcodeRate;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.washCode {
  display: flex;
  flex: 1;
  .content {
    .self {
      h3 {
        width: 820px;
        height: 60px;
        line-height: 60px;
        background: url("../../assets/zh.png");
        border-radius: 10px;
        margin: 17px auto 10px;
        span {
          color: #fff;
          &:nth-child(1) {
            padding-left: 20px;
          }
          &:nth-child(2) {
            font-size: 40px;
          }
        }
        b {
          float: right;
          width: 139px;
          height: 41px;
          line-height: 41px;
          background-image: linear-gradient(#ffffff, #ffffff),
            linear-gradient(#ebeef5, #ebeef5);
          border-radius: 21px;
          opacity: 0.6;
          text-align: center;
          color: #5d63d4;
          font-size: 16px;
          margin-right: 20px;
          margin-top: 10px;
          font-weight: normal;
          cursor: pointer;
        }
      }
      .washTitle {
        margin: 8px auto;
        font-weight: bold;
        width: 820px;
        border: 1px solid #f0f0f0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        box-sizing: border-box;
        li {
          width: 33.33%;
          text-align: center;
          color: #666;
          border-left: 1px solid #f0f0f0;
          margin-top: 10px;
          margin-bottom: 10px;
          box-sizing: border-box;
          &:nth-child(1) {
            border-left: 0;
          }
        }
      }
      .listUl {
        width: 820px;
        margin: auto;
        li {
          border: 1px solid #f0f0f0;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          box-sizing: border-box;
          margin-bottom: 5px;
          div {
            width: 33.33%;
            text-align: center;
            &:first-child {
              font-size: 16px;
            }
          }
          p {
            color: #dc001a;
            span {
              font-weight: bold;
            }
          }
          p,
          div {
            height: 66px;
            line-height: 66px;
            text-align: center;
            border-left: 1px solid #f0f0f0;
            box-sizing: border-box;
          }
        }
      }
    }
    .aboutWashCode {
      .aboutTitle {
        display: flex;
        margin-top: 26px;
        > div {
          height: 40px;
          line-height: 40px;
          width: 50%;
          text-align: center;
          font-size: 17px;
          cursor: pointer;
          box-sizing: border-box;
          &.active {
            color: #fd7632;
            border-bottom: 5px solid #fd7632;
          }
        }
      }
      .aboutContent {
        .list {
          display: flex;
          background-color: #fafafa;
          border-top: 1px solid #e9e8ea;
          border-bottom: 1px solid #e9e8ea;
          margin-bottom: 10px;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
          > div {
            display: flex;
            flex: 0 0 auto;
            width: 100px;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            color: #040202;
            position: relative;
            &:after {
              content: "";
              position: absolute;
              right: 0;
              width: 3px;
              height: 85%;
              background-color: #fd7632;
            }
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              width: 199px;
              height: 42px;
              line-height: 42px;
              border-bottom: 1px solid #f0f0f0;
              font-size: 15px;
              color: #333;
              box-sizing: border-box;
              position: relative;
              &:after {
                content: "";
                position: absolute;
                width: 1px;
                height: 34px;
                background-color: #dddada;
                right: 0;
                top: 4px;
              }
              span {
                margin-left: 40px;
              }
              &:last-child {
                &:after {
                  content: none;
                }
                border: none;
              }
              &:nth-of-type(4n) {
                &:after {
                  content: none;
                }
              }
            }
          }
        }
      }
      /*.gameTitle {*/
      /*  margin-left: 40px;*/
      /*}*/
      /*.about-content {*/
      /*  .title {*/
      /*    display: flex;*/
      /*    border-bottom: 1px solid #f0f0f0;*/
      /*    line-height: 50px;*/
      /*    div {*/
      /*      width: 50%;*/
      /*      text-align: center;*/
      /*      font-size: 16px;*/
      /*      box-sizing: border-box;*/
      /*      cursor: pointer;*/
      /*      &.on {*/
      /*        border-bottom: 4px solid #f58638;*/
      /*        color: #f58638;*/
      /*      }*/
      /*    }*/
      /*  }*/
      /*  .list {*/
      /*    dl {*/
      /*      line-height: 40px;*/
      /*      height: 448px;*/
      /*      overflow-y: scroll;*/
      /*      &::-webkit-scrollbar {*/
      /*        width: 2px;*/
      /*        height: 2px;*/
      /*        background-color: #fff;*/
      /*      }*/
      /*      dt {*/
      /*        border-bottom: 1px solid #f0f0f0;*/
      /*      }*/
      /*      span {*/
      /*        display: inline-block;*/
      /*        text-align: center;*/
      /*        color: #666;*/
      /*        &:nth-child(1) {*/
      /*          width: 33.33%;*/
      /*        }*/
      /*        &:nth-child(2) {*/
      /*          width: 33.33%;*/
      /*        }*/
      /*        &:nth-child(3) {*/
      /*          width: 33.33%;*/
      /*        }*/
      /*      }*/
      /*      dd {*/
      /*        &:nth-of-type(2n) {*/
      /*          background-color: rgb(247, 247, 247);*/
      /*        }*/
      /*      }*/
      /*    }*/
      /*  }*/
      /*}*/
    }
  }
}
</style>
