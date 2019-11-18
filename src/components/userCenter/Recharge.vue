<template>
  <div
    class="recharge"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.3)"
  >
    <el-tabs v-if="rechargeList" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, i) in rechargeList"
        :key="i"
        :label="item.title"
        :name="item.type + ''"
        :disabled="paying"
      >
        <div class="common" v-if="!paying">
          <ul v-show="activeName !== '40'">
            <li v-for="(child, j) in item.data" :key="j">
              <div>
                <el-radio
                  v-model="methodId"
                  :label="child.id"
                  @change="
                    changeRadio(
                      child.payWay,
                      child.desc,
                      child.rechargeMoney,
                      child.rechargeMoneyType,
                      child.rechargeMin,
                      child.rechargeMax
                    )
                  "
                >
                  <div>
                    <h3>{{ child.rechargeName }}</h3>
                    <!-- <span>{{ child.desc }}</span> -->
                  </div>
                </el-radio>
              </div>
            </li>
          </ul>
          <div class="content">
            <h3>
              <span>支付方式</span>
              <div v-if="activeName === '40'">
                <el-select v-model="bankSelect" @change="changeBank">
                  <el-option
                    v-for="(bank, k) in item.data"
                    :key="k"
                    :label="bank.rechargeName"
                    :value="
                      bank.id +
                        ',' +
                        bank.payWay +
                        ',' +
                        bank.desc +
                        ',' +
                        bank.rechargeMoney
                    "
                  >
                  </el-option>
                </el-select>
              </div>
              <i v-else>
                <img :src="item.typeImg" :alt="item.title" />
              </i>
            </h3>
            <div>
              <span>转入金额</span>
              <div>
                <el-input
                  placeholder="请输入金额"
                  type="number"
                  v-model="amount"
                  :disabled="isReadonly"
                ></el-input>
                <div>
                  <img src="../../assets/recharge.png" alt="" />
                  <span>{{ desc }}</span>
                </div>
              </div>
            </div>
            <div v-if="rechargeMoney.length" class="selectMoney">
              <span
                v-for="(item, i) in rechargeMoney"
                :key="i"
                @click="changeMoney(item)"
                :class="{ on: item === amount }"
                >{{ item }}</span
              >
            </div>
          </div>
          <div class="submitBtn" @click="Application">
            立即提交
          </div>
        </div>
        <div v-else class="paying">
          <div class="left">
            <div class="bank" v-if="bankPayWay">
              <dl>
                <dt>
                  转账银行信息
                </dt>
                <dd>
                  <span>银行：</span>
                  <span>{{ order.rechargeMethod.rechargeName }}</span>
                </dd>
                <dd>
                  <span>收款人：</span>
                  <span>{{ order.rechargeMethod.username }}</span>
                  <span
                    v-clipboard:copy="order.rechargeMethod.username"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                  >
                </dd>
                <dd>
                  <span>帐号：</span>
                  <span>{{ order.rechargeMethod.account }}</span>
                  <span
                    v-clipboard:copy="order.rechargeMethod.account"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                  >
                </dd>
                <dd>
                  <span>备注码（必填）：</span>
                  <span>{{ order.recharge.remarkCode }}</span>
                  <span
                    v-clipboard:copy="order.recharge.remarkCode"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                  >
                </dd>
              </dl>
              <div class="btm tips" v-if="order && order.rechargeMethod.tips">
                <div v-html="order.rechargeMethod.tips"></div>
              </div>
              <div class="btm" v-else>
                <h3>温馨提示：</h3>
                <ul>
                  <li>推荐使用银行卡入款： 更快捷/3分钟到账 更大额度</li>
                  <li>*接下来您可以通过以下方式完成转帐:</li>
                  <li>※1.网银转帐:登录您的网上银行完成转帐。</li>
                  <li>※2.ATM转帐:到您最近的ATM将款项转到左侧收款账号。</li>
                  <li>※3.ATM现存:到银行ATM以现金存入到左侧收款账号。</li>
                  <li>※4.银行柜台:到您最近的银行将款项转到左侧收款账号。</li>
                  <li>※5.手机转帐:通过您的手机验证将款项转到左侧收款账号。</li>
                </ul>
              </div>
            </div>
            <div class="bank" v-else-if="otherPayWay">
              <dl>
                <dt>
                  转账信息
                </dt>
                <dd>
                  <span>银行：</span>
                  <span>{{ order.rechargeMethod.rechargeName }}</span>
                </dd>
                <dd>
                  <span>收款人：</span>
                  <span>{{ order.rechargeMethod.username }}</span>
                  <span
                    v-clipboard:copy="order.rechargeMethod.username"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                  >
                </dd>
                <dd>
                  <span>帐号：</span>
                  <span>{{ order.rechargeMethod.account }}</span>
                  <span
                    v-clipboard:copy="order.rechargeMethod.account"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                  >
                </dd>
                <dd>
                  <span>备注码（必填）：</span>
                  <span>{{ order.recharge.remarkCode }}</span>
                  <span
                    v-clipboard:copy="order.recharge.remarkCode"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                  >
                </dd>
              </dl>
              <div class="btm tips" v-if="order && order.rechargeMethod.tips">
                <div v-html="order.rechargeMethod.tips"></div>
              </div>
              <div class="btm" v-else>
                <h3>温馨提示：</h3>
                <ul>
                  <li>※1.请如实填写存入时间、存入金额、存款人姓名。</li>
                  <li>※2.每笔转账请提交一次。</li>
                  <li>
                    ※3.如转账金额添加零头如5003.10，便于查收，加快到账速度。
                  </li>
                  <li>※4.转账完成后请保留单据作为核对凭证</li>
                </ul>
              </div>
            </div>
            <div v-else class="noBank">
              <h3>扫描以下二维码进行支付</h3>
              <img
                :src="order.rechargeMethod.image"
                alt="支付二维码"
                draggable="false"
              />
              <div class="remarkCode">
                <span>备注码（必填）：</span>
                <span>{{ order.recharge.remarkCode }}</span>
                <span
                  v-clipboard:copy="order.recharge.remarkCode"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  >复制</span
                >
              </div>
              <div class="btm tips" v-if="order && order.rechargeMethod.tips">
                <div v-html="order.rechargeMethod.tips"></div>
              </div>
              <div class="btm" v-else>
                <h3>操作步骤：</h3>
                <ul>
                  <li>
                    ※1.支付宝/云闪付
                    支付（扫一扫直接到账）方便快捷，支付完成立即到账
                  </li>
                  <li>※2.24小时存款不限次数，免除所有手续费，3分钟火速到账</li>
                  <li>※3.为了加快审核速度，请不要支付整数，如100.1</li>
                  <li>※4.公司收款二维码试试更新，请不要保存二维码</li>
                  <li>※5.存款遇到问题？立即联络在线客服为你服务</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="right">
            <dl class="bank" v-if="bankPayWay">
              <dt>
                确认充值信息
              </dt>
              <!--              <dd>-->
              <!--                <span>充值单号：</span>-->
              <!--                <span>{{ order.recharge.rechargeId }}</span>-->
              <!--              </dd>-->
              <dd>
                <span>{{
                  order.rechargeMethod.orderdesc
                    ? order.rechargeMethod.orderdesc + ":"
                    : "存款人姓名："
                }}</span>
                <el-input
                  type="text"
                  placeholder="请输入存款人姓名"
                  v-model="payAccountName"
                />
              </dd>
              <dd>
                <span>存款金额：</span>
                <el-input type="text" v-model="amount" />
              </dd>
              <dd>
                <span>存款时间：</span>
                <el-input
                  type="text"
                  readonly="readonly"
                  :placeholder="timestampToString(order.recharge.actionTime)"
                />
              </dd>
              <!--              <dd>-->
              <!--                <span>存款方式：</span>-->
              <!--                <el-select v-model="bankPos" placeholder="请选择">-->
              <!--                  <el-option-->
              <!--                    v-for="item in options"-->
              <!--                    :key="item.label"-->
              <!--                    :label="item.label"-->
              <!--                    :value="item.label"-->
              <!--                  >-->
              <!--                  </el-option>-->
              <!--                </el-select>-->
              <!--              </dd>-->
              <dd>
                <span @click="prev">上一步</span>
                <span @click="submit">提交订单</span>
              </dd>
            </dl>
            <div class="noBank" v-else>
              <h3>确认充值信息</h3>
              <ul>
                <!--                <li>-->
                <!--                  <span>充值单号：</span>-->
                <!--                  <span>{{ order.recharge.rechargeId }}</span>-->
                <!--                </li>-->
                <!--                <li>-->
                <!--                  <span>商户名称：</span>-->
                <!--                  <span>{{ order.rechargeMethod.ext2 }}</span>-->
                <!--                </li>-->
                <li>
                  <span>{{
                    order.rechargeMethod.orderdesc
                      ? order.rechargeMethod.orderdesc + "："
                      : "存款人姓名："
                  }}</span>
                  <el-input
                    type="text"
                    placeholder="请输入存款人姓名"
                    v-model="payAccountName"
                  />
                </li>
                <li>
                  <span>存款金额：</span>
                  <el-input type="text" v-model="amount" />
                </li>
                <li>
                  <span>存款时间：</span>
                  <el-input
                    type="text"
                    readonly="readonly"
                    :placeholder="timestampToString(order.recharge.actionTime)"
                  />
                </li>
                <li>
                  <span @click="prev">上一步</span>
                  <span @click="submit">提交订单</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { rechargeApply, rechargeSubmit } from "../../api";
export default {
  name: "Recharge",
  data() {
    return {
      rechargeMoney: "",
      rechargeMoneyType: "",
      rechargeMin: "",
      rechargeMax: "",
      // options: [
      //   {
      //     label: "网银转账"
      //   },
      //   {
      //     label: "ATM自动柜员机"
      //   },
      //   {
      //     label: "ATM现金入款"
      //   },
      //   {
      //     label: "银行柜台转账"
      //   },
      //   {
      //     label: "手机银行转账"
      //   },
      //   {
      //     label: "其他"
      //   }
      // ],
      bankSelect: "",
      activeName: "10",
      amount: "",
      desc: "请选择充值通道",
      payWay: "", // 1 跳外链 2 扫码 3 银行卡
      paying: false, // 购买状态
      methodId: "",
      rechargeId: "",
      date: "",
      payAccountName: "",
      payAccountNameFull: ""
      // bankPos: "网银转账"
    };
  },
  created() {
    console.log(
      this.rechargeList,
      "充值数据",
      this.order,
      this.allConfig,
      "==========="
    );
    if (!this.rechargeList || !this.rechargeList.length) {
      this.$store.dispatch("rechargeBefores");
    }
    // this.payAccountName = this.userInfo.name;
  },
  computed: {
    ...mapGetters([
      "rechargeList",
      "order",
      "loading",
      "allConfig",
      "userInfo"
    ]),
    bankPayWay() {
      return this.payWay == "3";
    },
    otherPayWay() {
      return this.payWay == "4";
    },
    isReadonly() {
      return this.rechargeMoneyType == 1;
    }
  },
  // watch: {
  //   bankSelect(newVal) {
  //     console.log(newVal,'newVal');
  //   }
  // },
  methods: {
    onCopy: function() {
      this.$message({
        type: "success",
        showClose: true,
        message: "复制成功，可直接Ctrl+V进行粘贴",
        duration: 1000
      });
    },
    onError: function() {
      this.$message({
        type: "error",
        showClose: true,
        message: "复制失败",
        duration: 1000
      });
    },
    changeMoney(money) {
      this.amount = money;
    },
    Application() {
      // console.log(this.methodId, this.payWay);
      if (!this.amount) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入充值金额",
          duration: 1000
        });
      }
      if (!this.payWay) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请选择充值通道",
          duration: 1000
        });
      } else {
        if (this.payWay == "1") {
          if (parseFloat(this.rechargeMin) > this.amount) {
            return this.$message({
              type: "error",
              showClose: true,
              message: "金额不能少于" + this.rechargeMin + "元",
              duration: 1000
            });
          }
          if (parseFloat(this.rechargeMax) < this.amount) {
            return this.$message({
              type: "error",
              showClose: true,
              message: "金额不能大于" + this.rechargeMax + "元",
              duration: 1000
            });
          }
          this.reCharge(
            "/api/common/pay/create/methodId/" +
              this.methodId +
              "/money/" +
              this.amount
          );
        } else {
          this.$store.commit("CHANGE_LOADING", 1);
          rechargeApply({ methodId: this.methodId }).then(res => {
            this.$store.commit("CHANGE_LOADING", 0);
            console.log(res);
            if (res.status) {
              this.$store.commit("ORDERS", res.data);
              this.paying = true;
            }
          });
        }
      }
    },
    submit() {
      if (!this.payAccountName) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入存款人姓名",
          duration: 1000
        });
      }
      if (!this.amount) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入存入金额",
          duration: 1000
        });
      }
      // console.log(
      //   this.order.rechargeMethod.orderdesc,
      //   "this.order.rechargeMethod.orderdesc"
      // );
      this.rechargeId = this.order.recharge.rechargeId;
      this.date = this.timestampToString(this.order.recharge.actionTime);
      this.payAccountNameFull =
        "备注码：" +
        this.order.recharge.remarkCode +
        ",存款人姓名：" +
        this.payAccountName;
      if (parseFloat(this.order.rechargeMethod.rechargeMin) > 0) {
        if (this.amount < parseFloat(this.order.rechargeMethod.rechargeMin)) {
          return this.$message({
            type: "error",
            showClose: true,
            message:
              "充值金额不能低于" + this.order.rechargeMethod.rechargeMin + "元",
            duration: 1000
          });
        }
      }
      if (parseFloat(this.order.rechargeMethod.rechargeMax) > 0) {
        if (this.amount > parseFloat(this.order.rechargeMethod.rechargeMax)) {
          return this.$message({
            type: "error",
            showClose: true,
            message:
              "充值金额不能高于" + this.order.rechargeMethod.rechargeMax + "元",
            duration: 1000
          });
        }
      }
      // if (this.otherPayWay) {
      //   console.log(this.order.rechargeMethod.type);
      //   switch (this.order.rechargeMethod.type) {
      //     case 10:
      //       this.bankPos = "微信转卡";
      //       break;
      //     case 20:
      //       this.bankPos = "支付宝转卡";
      //       break;
      //     default:
      //       this.bankPos = "QQ转卡";
      //   }
      // }
      let parameter;
      if (this.bankPayWay || this.otherPayWay) {
        parameter = {
          rechargeId: this.rechargeId,
          methodId: this.methodId,
          amount: this.toFixeds(this.amount),
          date: this.date,
          payAccountNameFull: this.payAccountNameFull
          // bankPos: this.bankPos
        };
      } else {
        parameter = {
          rechargeId: this.rechargeId,
          amount: this.toFixeds(this.amount),
          date: this.date,
          payAccountNameFull: this.payAccountNameFull
          // bankPos: this.bankPos
        };
      }
      console.log(parameter, "充值提交数据------------------");
      this.$store.commit("CHANGE_LOADING", 1);
      rechargeSubmit(parameter).then(res => {
        this.$store.commit("CHANGE_LOADING", 0);
        let type;
        if (res.status) {
          type = "success";
          this.prev();
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
    prev() {
      this.initData();
    },
    changeRadio(
      payWay,
      desc,
      rechargeMoney,
      rechargeMoneyType,
      rechargeMin,
      rechargeMax
    ) {
      // console.log(rechargeMin, "/", rechargeMax, "/", rechargeMoneyType);
      // console.log(rechargeMoney, rechargeMoney.length, "rechargeMoney");
      // console.log(payWay, "payWay");
      // console.log(
      //   typeof rechargeMoney,
      //   typeof rechargeMoney == "string",
      //   "typeof(rechargeMoney)"
      // );
      this.payWay = payWay;
      this.desc = desc;
      if (rechargeMoney && typeof rechargeMoney == "string") {
        let arr = [];
        arr.push(rechargeMoney);
        this.rechargeMoney = arr;
      } else {
        this.rechargeMoney = rechargeMoney;
      }
      this.rechargeMoneyType = rechargeMoneyType;
      this.rechargeMin = rechargeMin;
      this.rechargeMax = rechargeMax;
      this.amount = "";
    },
    changeBank(val) {
      this.amount = "";
      let valArr = val.split(",");
      this.methodId = valArr[0];
      this.payWay = valArr[1];
      this.desc = valArr[2];
      let r = valArr[3];
      console.log(valArr, valArr.length, "valArr");
      if (r && typeof r == "string") {
        let arr = [];
        for (let i = 3; i < valArr.length; i++) {
          arr.push(valArr[i]);
        }
        this.rechargeMoney = arr;
      } else {
        this.rechargeMoney = r;
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.initData();
      this.rechargeMoney = "";
      this.rechargeMoneyType = "";
    },
    initData() {
      this.paying = false;
      this.bankSelect = "";
      this.methodId = "";
      this.payWay = "";
      this.amount = "";
      this.desc = "请选择充值通道";
      // this.bankPos = "网银转账";
    }
  }
};
</script>

<style scoped lang="scss">
.recharge {
  display: flex;
  flex: 1;
  .common {
    height: 100%;
    position: relative;
    ul {
      display: flex;
      max-width: 900px;
      flex-wrap: wrap;
      border-bottom: 1px solid #e9e8ea;
      li {
        flex: 0 0 auto;
        padding: 0 0 0 20px;
        /*width: 179px;*/
        > div {
          position: relative;
          &:after {
            width: 1px;
            height: 46px;
            content: "";
            background-image: linear-gradient(#e9e8ea, #e9e8ea),
              linear-gradient(#fc7f07, #fc7f07);
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
          }
          label {
            height: 79px;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-radio__label {
              div {
                margin-left: 5px;
                h3 {
                  color: #666666;
                  font-size: 16px;
                  margin-bottom: 5px;
                  /*width: 100px;*/
                  // overflow: hidden;
                  // text-overflow: ellipsis;
                  padding-right: 20px;
                }
                span {
                  display: inline-block;
                  color: #999999;
                  width: 100px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
      }
    }
    .content {
      padding-left: 40px;
      padding-top: 34px;
      h3 {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        span {
          color: #666666;
        }
        .el-select {
          width: 214px;
          margin-left: 20px;
        }
        i {
          margin-left: 20px;
          display: inline-block;
          width: 115px;
          height: 41px;
          img {
            height: 100%;
          }
        }
      }
      > div {
        display: flex;
        span {
          color: #666;
          line-height: 40px;
        }
        > div {
          margin-left: 20px;
          .el-input {
            width: 214px;
          }
          > div {
            img {
              float: left;
              color: #000000;
              margin: 6px 5px 0 18px;
            }
            span {
              color: #cbb79f;
            }
          }
        }
        &.selectMoney {
          margin-left: 76px;
          display: flex;
          // margin-top: 10px;
          flex-wrap: wrap;

          span {
            min-width: 80px;
            height: 40px;
            border: 1px solid #eeeeee;
            border-radius: 4px;
            margin-right: 10px;
            margin-bottom: 10px;
            text-align: center;
            color: #999999;
            cursor: pointer;
            &.on {
              color: #fc7f07;
              border-color: #fc7f07;
            }
            &:hover {
              border-color: #fc7f07;
            }
          }
        }
      }
    }
    .submitBtn {
      position: absolute;
      right: 40px;
      bottom: 19px;
    }
  }
  .paying {
    height: 100%;
    display: flex;
    .left {
      flex: 1;
      width: 522px;
      background-color: #fdf7ea;
      border-right: 1px solid #f0f0f0;
      .bank {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        dl {
          padding-bottom: 90px;
          dt {
            text-align: center;
            margin-top: 33px;
            color: #999999;
            font-size: 16px;
            margin-bottom: 30px;
          }
          dd {
            span {
              display: inline-block;
              line-height: 35px;
              &:nth-child(1) {
                width: 150px;
                text-align: right;
                white-space: normal;
              }
              &:nth-child(2) {
                width: 320px;
                margin-left: 10px;
                color: red;
              }
              &:nth-child(3) {
                color: #666666;
                cursor: pointer;
                &:hover {
                  color: #fd7632;
                }
              }
            }
          }
        }
        .btm {
          flex: 1;
          padding-top: 20px;
          padding-left: 40px;
          line-height: 30px;
          background: #fff;
          // overflow-y: scroll;
          h3 {
            font-size: 17px;
          }
        }
      }
      .noBank {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        overflow: hidden;
        h3 {
          padding: 20px 0;
          color: #999999;
          font-size: 16px;
        }
        img {
          /*display: inline-block;*/
          width: 230px;
          height: 230px;
          margin-left: 50%;
          transform: translate(-50%);
          overflow: hidden;
        }
        .btm {
          text-align: left;
          padding-left: 38px;
          padding-top: 20px;
          background: #fff;
          height: 230px;
          overflow-y: scroll;
          h3 {
            margin-top: 0;
            margin-bottom: 5px;
            padding: 0;
          }
          ul {
            li {
              line-height: 40px;
            }
          }
        }
      }
    }
    .right {
      width: 378px;
      .bank {
        dt {
          text-align: center;
          margin-top: 38px;
          margin-bottom: 48px;
          font-size: 16px;
          color: #333333;
        }
        dd {
          line-height: 42px;
          margin-bottom: 10px;
          span {
            color: #666;
            &:nth-child(1) {
              display: inline-block;
              width: 104px;
              text-align: right;
            }
          }
          .el-input {
            width: 214px;
          }
          .el-select {
            width: 214px;
          }
          &:last-child {
            margin-top: 120px;
            span {
              cursor: pointer;
              display: inline-block;
              text-align: center;
              color: #fff;
              width: 118px;
              height: 42px;
              border-radius: 4px;
              &:nth-child(1) {
                background-image: linear-gradient(
                    0deg,
                    #4f52a1 0%,
                    #52c0d9 100%
                  ),
                  linear-gradient(#eeeeee, #eeeeee);
                margin-left: 45px;
                margin-right: 58px;
              }
              &:nth-child(2) {
                background-image: linear-gradient(
                    0deg,
                    #fc4a1a 0%,
                    #f7b733 100%
                  ),
                  linear-gradient(#eeeeee, #eeeeee);
              }
            }
          }
        }
      }
      .noBank {
        h3 {
          text-align: center;
          margin-top: 38px;
          margin-bottom: 48px;
          font-size: 16px;
          color: #333333;
        }
        ul {
          li {
            line-height: 42px;
            margin-bottom: 10px;
            span {
              color: #666;
              &:nth-child(1) {
                display: inline-block;
                width: 104px;
                text-align: right;
              }
            }
            .el-input {
              width: 214px;
            }
            .el-select {
              width: 214px;
            }
            &:last-child {
              margin-top: 120px;
              span {
                cursor: pointer;
                display: inline-block;
                text-align: center;
                color: #fff;
                width: 118px;
                height: 42px;
                border-radius: 4px;
                &:nth-child(1) {
                  background-image: linear-gradient(
                      0deg,
                      #4f52a1 0%,
                      #52c0d9 100%
                    ),
                    linear-gradient(#eeeeee, #eeeeee);
                  margin-left: 45px;
                  margin-right: 58px;
                }
                &:nth-child(2) {
                  background-image: linear-gradient(
                      0deg,
                      #fc4a1a 0%,
                      #f7b733 100%
                    ),
                    linear-gradient(#eeeeee, #eeeeee);
                }
              }
            }
          }
        }
      }
    }
  }
  .remarkCode {
    font-size: 22px;
    margin: 10px 0;
    span {
      &:nth-child(1) {
      }
      &:nth-child(2) {
        color: red;
        margin-right: 20px;
      }
      &:nth-child(3) {
        color: #666666;
        cursor: pointer;
        &:hover {
          color: #fd7632;
        }
      }
    }
  }
}
</style>
