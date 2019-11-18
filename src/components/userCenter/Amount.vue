<template>
  <div
    class="amount"
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
        <div class="content">
          <h3>
            <span>余额（元）</span>
            <span>{{ userInfo.coin }}</span>
            <b @click="guihu">一键归户</b>
          </h3>
          <div>
            <span>
              <el-select
                v-model="parameter.type"
                placeholder="请选择"
                class="select"
                @change="changeText"
              >
                <el-option
                  v-for="(item, j) in typeList"
                  :key="j"
                  :label="item.text"
                  :value="item.type"
                >
                </el-option>
              </el-select>
            </span>
            <el-select
              v-model="parameter.apiKey"
              placeholder="请选择"
              class="select"
              @change="changeIndex"
            >
              <el-option
                v-for="(item, j) in third_Game_Lists"
                :key="j"
                :label="item.name"
                :value="item.typeKey"
              >
              </el-option>
            </el-select>
            <span>{{ text }}金额</span>
            <el-input
              :placeholder="'输入' + text + '金额'"
              v-model="parameter.money"
              type="number"
            ></el-input>
            <b @click="confirm">立即{{ text }}</b>
          </div>
          <ul>
            <li v-for="(item, i) in third_Game_Lists" :key="i">
              <i>
                <img :src="item.img" alt="" draggable="false" />
              </i>
              <div>
                <span>{{ item.name }}</span>
                <p>{{ moneyList[i] }}</p>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { thirdMoney, exchangeAllToLottery, exchangeMoney } from "../../api";
import { mapGetters } from "vuex";
const TitleList = [
  {
    title: "额度转换",
    typeKey: "amount"
  }
];
export default {
  name: "Amount",
  data() {
    return {
      TitleList,
      activeName: "amount",
      loading: false,
      typeList: [{ text: "转入", type: 1 }, { text: "转出", type: 2 }],
      parameter: {
        type: 1, //1=转出到第三方，2=转入回来
        apiKey: "",
        money: ""
      },
      text: "转入",
      gameIndex: "",
      moneyList: []
    };
  },
  computed: {
    ...mapGetters(["userInfo", "third_Game_Lists"])
  },
  created() {
    this.initMoney();
    console.log(this.third_Game_Lists);
  },
  methods: {
    getThirdMoney(typekey) {
      thirdMoney({ type: typekey })
        .then(res => {
          if (res.status) {
            this.moneyList.splice(
              this.gameIndex,
              1,
              res.data.money == "0" ? "0.00" : res.data.money
            );
          } else {
            this.moneyList.splice(this.gameIndex, 1, "0.00");
          }
        })
        .catch(err => {
          console.log(err);
          this.moneyList.splice(this.gameIndex, 1, "获取失败");
        });
    },
    initMoney() {
      for (let i in this.third_Game_Lists) {
        let item = this.third_Game_Lists[i];
        this.moneyList[i] = "获取中...";
        thirdMoney({ type: item.typeKey })
          .then(res => {
            if (res.status) {
              console.log(res.data.money);
              this.moneyList.splice(
                i,
                1,
                res.data.money == "0" ? "0.00" : res.data.money
              );
            } else {
              this.moneyList.splice(i, 1, "0.00");
            }
          })
          .catch(err => {
            console.log(err);
            this.moneyList.splice(i, 1, "获取失败");
          });
      }
    },
    changeText(type) {
      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].type == type) {
          this.text = this.typeList[i].text;
        }
      }
    },
    changeIndex(type) {
      for (let i in this.third_Game_Lists) {
        let item = this.third_Game_Lists[i];
        if (item.typeKey == type) {
          this.gameIndex = i;
        }
      }
    },
    guihu() {
      this.loading = true;
      exchangeAllToLottery().then(res => {
        this.loading = false;
        this.initMoney();
        this.$store.dispatch("userDetails");
        if (res.status) {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    confirm() {
      if (!this.parameter.money) {
        return this.$message.error("请输入金额");
      }
      if (!this.parameter.apiKey) {
        return this.$message.error("请选择转出游戏");
      }
      console.log(this.loading);
      this.loading = true;
      exchangeMoney(this.parameter).then(res => {
        this.loading = false;
        if (res.status) {
          this.$message({
            type: "success",
            showClose: true,
            message: res.msg,
            duration: 1000
          });
          this.getThirdMoney(this.parameter.apiKey);
          this.$store.dispatch("userDetails");
          this.parameter.money = "";
          this.parameter.apiKey = "";
        } else {
          this.$message({
            type: "error",
            showClose: true,
            message: res.msg,
            duration: 1000
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.amount {
  display: flex;
  flex: 1;
  .content {
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
        color: #5d63d4;
        border-radius: 21px;
        opacity: 0.6;
        text-align: center;
        font-size: 16px;
        margin-right: 20px;
        margin-top: 10px;
        font-weight: normal;
        cursor: pointer;
      }
      b:hover {
        background-image: linear-gradient(#8cafff, #d2e0ff);
        color: #3e48ff;
      }
    }
    > div {
      width: 822px;
      height: 62px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      margin: auto;
      display: flex;
      align-items: center;
      .el-select {
        width: 214px;
      }
      .el-input {
        width: 214px;
      }
      span {
        &:nth-child(1) {
          padding: 0 20px;
          .el-select {
            width: 80px;
          }
        }
        &:nth-child(3) {
          padding-left: 20px;
          padding-right: 20px;
          white-space: nowrap;
        }
      }
      b {
        display: inline-block;
        width: 139px;
        height: 41px;
        background-image: linear-gradient(0deg, #fc4a1a 0%, #f7b733 100%),
          linear-gradient(#ebeef5, #ebeef5);
        color: #fff;
        border-radius: 21px;
        opacity: 0.6;
        text-align: center;
        line-height: 41px;
        font-weight: normal;
        font-size: 16px;
        margin-left: 17px;
        cursor: pointer;
      }
      b:hover {
        background-image: linear-gradient(1deg, #ff8229, #ff461c);
        color: rgb(255, 241, 241);
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-left: 40px;
      margin-right: 40px;
      margin-top: 9px;
      li {
        flex: 0 0 auto;
        width: 156px;
        height: 66px;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        i {
          display: inline-block;
          width: 50px;
          height: 50px;
          margin-left: 8px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        > div {
          margin-left: 8px;
          span {
            color: #4b4b4b;
          }
          p {
            &.on {
              color: #fd7632;
            }
          }
        }
      }
    }
  }
}
</style>
