<template>
  <div class="withdraw" @click="changeCardFlag = false">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(item, i) in TitleList"
        :key="i"
        :label="item.title"
        :name="item.typeKey"
      >
        <div class="content">
          <ul>
            <li>
              <span>可用余额</span>
              <div>
                <b>{{ userInfo.coin }}</b
                >元
              </div>
            </li>
            <li>
              <span><b>*</b>提现银行卡</span>
              <div v-if="myBank.length" key="hasBank">
                <div @click.stop="changeCard">
                  <i>
                    <img :src="myBankCard.logo" alt="" />
                  </i>
                  <span>
                    {{ myBankCard.oldBankName }}
                  </span>
                  <span> 卡号：{{ bankNum(myBankCard.account) }} </span>
                  <i class="iconfont">&#xe724;</i>
                </div>
                <dl :class="{ isChangeCard: changeCardFlag }">
                  <dt></dt>
                  <dd
                    v-for="(item, i) in myBank"
                    :key="i"
                    @click="changeBankCard(item.id)"
                  >
                    <i>
                      <img :src="item.logo" alt="" />
                    </i>
                    <span>
                      {{ item.oldBankName }}
                    </span>
                    <span> 卡号：{{ bankNum(item.account) }} </span>
                  </dd>
                  <dd @click="gotoAddBank">
                    <p @click="addBankCard">添加银行卡<b>+</b></p>
                  </dd>
                </dl>
              </div>
              <div v-else class="noBank" key="noBank" @click="gotoAddBank">
                +添加银行卡
              </div>
            </li>
            <li>
              <span><b>*</b>提现金额</span>
              <div>
                <el-input
                  v-model="bankWithdraw.amount"
                  placeholder="请输入整数提现金额"
                  type="number"
                  @blur="withdrawBlur"
                ></el-input>
                <div>
                  <img src="../../assets/recharge.png" alt="" />
                  单次最小提现金额为<b>{{ allConfig.cashMin }}</b
                  >元，最大提现金额为<b>{{ allConfig.cashMax }}</b
                  >元
                </div>
              </div>
            </li>
            <li>
              <span>资金密码</span>
              <el-input
                v-model="bankWithdraw.coinpwd"
                placeholder="请输入资金密码"
                maxlength="6"
                show-password
                type="number"
              ></el-input>
            </li>
          </ul>
          <div class="submitBtn" @click="submit">立即提交</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { withdraw } from "../../api";
const TitleList = [
  {
    title: "提现",
    typeKey: "withdraw"
  }
];
export default {
  name: "Withdraw",
  data() {
    return {
      TitleList,
      activeName: "withdraw",
      changeCardFlag: false,
      bankWithdraw: {
        bankId: "",
        amount: "",
        coinpwd: ""
      }
    };
  },
  created() {
    console.log(this.myBank, "我的银行卡");
    if (!this.myBank || !this.myBank.length) {
      this.$store.dispatch("myBanks");
    }
  },
  computed: {
    ...mapGetters(["userInfo", "myBank", "allConfig", "bankId"]),
    myBankCard() {
      for (let i = 0; i < this.myBank.length; i++) {
        let item = this.myBank[i];
        if (item.id == this.bankId) {
          return item;
        }
      }
      return false;
    }
  },
  methods: {
    changeCard() {
      this.changeCardFlag = !this.changeCardFlag;
    },
    changeBankCard(id) {
      this.$store.commit("SET_BANK_ID", id);
      localStorage.setItem("bankId", id);
      this.changeCard();
    },
    addBankCard() {
      if (this.myBank.length >= 5) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "最多只能绑定5张银行卡哦！",
          duration: 1000
        });
      }
    },
    submit() {
      if (!this.userInfo.bankNum) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请先绑定银行卡！",
          duration: 1000
        });
      }
      if (this.toNum(this.userInfo.coin) <= 0) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "账户余额为空！",
          duration: 1000
        });
      }
      if (!this.bankWithdraw.amount) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入提现金额！",
          duration: 1000
        });
      }
      if (!/(^[1-9]\d*$)/.test(this.bankWithdraw.amount)) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "提现金额只能为正整数",
          duration: 1000
        });
      }
      if (
        this.allConfig.cashMin &&
        this.bankWithdraw.amount < parseFloat(this.allConfig.cashMin)
      ) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "不得低于最小金额！",
          duration: 1000
        });
      }
      if (
        this.allConfig.cashMax &&
        this.bankWithdraw.amount > parseFloat(this.allConfig.cashMax)
      ) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "不得高于最大金额！",
          duration: 1000
        });
      }
      if (parseInt(this.userInfo.coin) < this.bankWithdraw.amount) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "账户余额不足！",
          duration: 1000
        });
      }
      if (!this.bankWithdraw.coinpwd) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入资金密码！",
          duration: 1000
        });
      }
      this.bankWithdraw.bankId = this.bankId;
      withdraw(this.bankWithdraw).then(res => {
        let type;
        if (res.status) {
          type = "success";
          this.$store.dispatch("userDetails");
          this.bankWithdraw.coinpwd = "";
          this.bankWithdraw.amount = "";
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
    },
    gotoAddBank() {
      if (this.userInfo.bankNum >= 5) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "最多只能绑定5张银行卡噢",
          duration: 1000
        });
      }
      this.$store.commit("SET_ACTIVE_NAME", "addBank");
      this.$parent.componentsName = "BankCenter";
    },
    withdrawBlur() {
      // console.log(this.bankWithdraw.amount,'this.bankWithdraw.amount')
      if (this.bankWithdraw.amount.indexOf(".") != -1) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "提现金额不能包含小数点",
          duration: 1000
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.withdraw {
  display: flex;
  flex: 1;
  .content {
    height: 500px;
    ul {
      li {
        display: flex;
        align-items: center;
        margin-top: 30px;
        > span {
          width: 121px;
          text-align: right;
          color: #666;
          margin-right: 20px;
          b {
            color: #dc001a;
            font-weight: normal;
          }
        }
        .el-input {
          width: 406px;
          margin-right: 10px;
        }
        &:nth-child(1) {
          div {
            width: 370px;
            height: 42px;
            border-radius: 4px;
            border: solid 1px #f0f0f0;
            line-height: 42px;
            color: #666;
            background-color: #fdf7ea;
            font-size: 18px;
            b {
              margin-left: 20px;
              color: #dc001a;
              font-weight: normal;
            }
          }
        }
        &:nth-child(2) {
          .noBank {
            border: 0;
            font-size: 15px;
            color: #333;
            width: auto;
            &:hover {
              color: #fa591e;
            }
          }
          > div {
            height: 48px;
            line-height: 48px;
            width: 406px;
            border: 1px solid #cbb79f;
            float: left;
            box-sizing: border-box;
            position: relative;
            cursor: pointer;
            border-radius: 4px;
            > div,
            dl {
              i {
                display: inline-block;
                width: 20px;
                height: 20px;
                line-height: 20px;
                vertical-align: middle;
                margin-left: 16px;
                margin-right: 5px;
                img {
                  width: 100%;
                  display: inline-block;
                }
                &:last-child {
                  position: absolute;
                  right: 12px;
                  top: 14px;
                  line-height: 18px;
                  font-size: 15px;
                  color: #cbb79f;
                }
              }
              span {
                &:nth-child(2) {
                  color: #cbb79f;
                }
                &:nth-child(3) {
                  color: #cbb79f;
                  float: right;
                  margin-right: 45px;
                }
              }
            }
            > div,
            dd {
              position: relative;
            }
          }
          dl {
            position: absolute;
            left: 0;
            top: 60px;
            width: 406px;
            box-sizing: border-box;
            cursor: pointer;
            z-index: 5;
            background-color: #fff;
            border-top: none;
            box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.2);
            dt {
              border: 10px solid transparent;
              border-bottom-color: #fff;
              position: absolute;
              top: -20px;
              left: 15px;
            }
            dd {
              height: 0;
              transition: 0.2s;
              overflow: hidden;
              &:hover {
                background-color: #fafafa;
              }
              &:last-child {
                text-align: center;
                p {
                  text-align: center;
                  color: #999;
                  b {
                    margin-left: 3px;
                  }
                }
                &:hover {
                  background-color: #fff;
                }
              }
            }
          }
          .isChangeCard {
            border: 1px solid #f0f0f0;
            dd {
              height: 48px;
            }
          }
        }
        &:nth-child(3) {
          align-items: initial;
          > span {
            line-height: 40px;
          }
          div {
            overflow: hidden;
            img {
              display: inline-block;
              margin: 6px 5px 0 18px;
            }
            b {
              color: #dc001a;
            }
          }
        }
        &:nth-child(4) {
          /*.el-input {*/
          /*  width: 200px;*/
          /*}*/
        }
      }
    }
    .submitBtn {
      float: right;
      margin-right: 40px;
      margin-top: 150px;
    }
  }
}
</style>
