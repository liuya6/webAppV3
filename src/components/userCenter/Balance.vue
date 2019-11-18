<template>
  <div
    class="balance"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.3)"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, i) in TitleList"
        :key="i"
        :label="item.title"
        :name="item.typeKey"
      >
        <div v-if="item.typeKey === 'yuEBao'" class="yuEBao">
          <div class="img">
            <img src="../../assets/images/yeb.png" alt="" draggable="false" />
          </div>
          <div class="content">
            <div class="left">
              <div class="left-top">
                <div>
                  <span>总金额（¥）</span>
                  <i class="iconfont" @click="moneyShow = !moneyShow">{{
                    moneyShow ? "&#xe756;" : "&#xe757;"
                  }}</i>
                  <span @click="trfIn">转入</span>
                  <span @click="trfOut">转出</span>
                </div>
                <div>
                  {{ moneyShow ? yueBaoIndexList.yuebaoCoin : "****" }}
                </div>
              </div>
              <div class="left-btm">
                <ul>
                  <li>
                    <p>总本金（¥）</p>
                    <span>{{
                      moneyShow ? yueBaoIndexList.baseCoin : "****"
                    }}</span>
                  </li>
                  <li>
                    <p>当前收益（¥）</p>
                    <span>{{
                      moneyShow ? yueBaoIndexList.currentProfit : "****"
                    }}</span>
                  </li>
                  <li>
                    <p>累计收益（¥）</p>
                    <span>{{
                      moneyShow ? yueBaoIndexList.totalProfit : "****"
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="right">
              <h3>当前日利率</h3>
              <ul>
                <li>
                  <p>基准利率（¥）</p>
                  <span>{{ yueBaoIndexList.yuebaoBaseRate }}%</span>
                </li>
                <li>
                  <p>额外利率（¥）</p>
                  <span>{{ yueBaoIndexList.yuebaoAdditionalRate }}%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else-if="item.typeKey === 'transfer'" class="transfer">
          <div class="main">
            <div class="header">
              <div class="category">
                <span>交易类型</span>
                <el-select
                  class="account"
                  v-model="transferParameter.status"
                  placeholder="全部"
                  minlength="8"
                  maxlength
                >
                  <el-option
                    v-for="(item, index) in transferOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="date">
                <span>选择日期</span>
                <el-date-picker
                  v-model="dataVal"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="changeData"
                >
                </el-date-picker>
              </div>
              <span class="search" @click="transferSearch">搜索</span>
            </div>
            <ul class="maincontent">
              <li class="th">
                <div>时间</div>
                <div>订单号</div>
                <div>本金</div>
                <div>收益</div>
                <div>备注</div>
              </li>
              <li v-for="(item, i) in transferList" :key="i">
                <div>{{ timestampToString(item.startTime) }}</div>
                <el-tooltip :content="item.orderId" placement="top"
                  ><div>{{ item.orderId }}</div></el-tooltip
                >
                <div>{{ item.money }}</div>
                <div>{{ item.profit }}</div>
                <el-tooltip :content="item.remark" placement="top"
                  ><div>{{ item.remark }}</div></el-tooltip
                >
              </li>
            </ul>
            <div v-show="transferNoData" class="noData">
              <img
                :src="commonImgs('default/noData.png')"
                alt="暂无数据"
                draggable="false"
              />
              <p>暂无记录</p>
            </div>
            <div class="btm" v-show="transferTotal">
              <div class="btm-page">
                <el-pagination
                  class="Page"
                  background
                  layout="prev, pager, next"
                  :total="transferTotal"
                  :page-size="transferParameter.pageSize"
                  @current-change="handleCurrentChange"
                  :current-page="transferParameter.page"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="item.typeKey === 'income'" class="income">
          <div class="main">
            <div class="header">
              <div class="category">
                <span>交易类型</span>
                <el-select
                  class="account"
                  v-model="incomeParameter.billType"
                  placeholder="全部"
                  minlength="8"
                  maxlength
                >
                  <el-option
                    v-for="(item, index) in incomeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="date">
                <span>选择日期</span>
                <el-date-picker
                  v-model="dataVal1"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="changeData"
                >
                </el-date-picker>
              </div>
              <span class="search" @click="incomeSearch">搜索</span>
            </div>
            <ul class="maincontent">
              <li class="th">
                <div>时间</div>
                <div>变动金额</div>
                <div>变动后金额</div>
                <div>备注</div>
              </li>
              <li v-for="(item, i) in incomeList" :key="i">
                <div>{{ timestampToString(item.actionTime) }}</div>
                <div>{{ item.coin }}</div>
                <div>{{ item.userCoin }}</div>
                <el-tooltip :content="item.info" placement="top"
                  ><div>{{ item.info }}</div></el-tooltip
                >
              </li>
            </ul>
            <div v-show="incomeNoData" class="noData">
              <img
                :src="commonImgs('default/noData.png')"
                alt="暂无数据"
                draggable="false"
              />
              <p>暂无记录</p>
            </div>
            <div class="btm" v-show="incomeTotal">
              <div class="btm-page">
                <el-pagination
                  class="Page"
                  background
                  layout="prev, pager, next"
                  :total="incomeTotal"
                  :page-size="incomeParameter.pageSize"
                  @current-change="handleCurrentChange"
                  :current-page="incomeParameter.page"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="directions">
          <div class="img">
            <img src="../../assets/images/yebkf.png" alt="" draggable="false" />
          </div>
          <dl>
            <dt>
              猜您的问题
            </dt>
            <dd v-for="(item, i) in yueBaoHelpList" :key="i">
              <h3>
                {{ item.title }}
              </h3>
              <p v-html="item.content"></p>
            </dd>
          </dl>
        </div>
      </el-tab-pane>
    </el-tabs>
    <transition name="fadeUp">
      <div class="transferIn" v-show="transferInShow == '1'">
        <div class="content">
          <div>
            <span>转入金额：</span>
            <el-input
              type="number"
              v-model="transferInParameter.money"
              placeholder="请输入转入金额"
            ></el-input>
          </div>
          <div>
            <span>资金密码：</span>
            <el-input
              type="number"
              maxlength="6"
              v-model="transferInParameter.coinPwd"
              placeholder="请输入资金密码"
              show-password
            ></el-input>
          </div>
          <div>
            <span @click="close">取消</span>
            <span @click="transferIns">确定</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fadeUp">
      <div class="transferOut" v-show="transferOutShow == '1'">
        <div class="content">
          <div>
            <span>转出至：</span>
            <el-select class="account" v-model="transferOutStatus">
              <el-option
                v-for="(item, index) in transferOutOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div v-show="transferOutStatus == '1'">
            <span>转出至：</span>
            <el-select class="account" v-model="transferOutParameter.bankId">
              <el-option
                v-for="(item, index) in myBank"
                :key="index"
                :label="item.oldBankName + '、尾号' + item.account.substr(-4)"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="money">
            <span>转出金额：</span>
            <div v-if="transferOutList.length">
              <el-checkbox-group v-model="transferOutParameter.yuIds">
                <el-checkbox
                  :label="item.id"
                  v-for="(item, i) in transferOutList"
                  :key="i"
                  >{{ item.money }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
            <div v-else>
              您余额宝资金为空
            </div>
          </div>
          <div>
            <span>资金密码：</span>
            <el-input
              type="number"
              maxlength="6"
              v-model="transferOutParameter.coinPwd"
              placeholder="请输入资金密码"
              show-password
            ></el-input>
          </div>
          <div>
            <span @click="close">取消</span>
            <span @click="transferOuts">确定</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  yueBao,
  yueBaoHelp,
  yuebaoRecord,
  yuebaoLog,
  transFerIn,
  transferOut
} from "../../api";
const TitleList = [
  {
    title: "余额宝",
    typeKey: "yuEBao"
  },
  {
    title: "转入记录",
    typeKey: "transfer"
  },
  {
    title: "收支明细",
    typeKey: "income"
  },
  {
    title: "余额宝说明",
    typeKey: "directions"
  }
];
export default {
  name: "Balance",
  data() {
    return {
      TitleList,
      loading: false,
      activeName: "yuEBao",
      yueBaoIndexList: "",
      yueBaoHelpList: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dataVal: [
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          "00",
          "00",
          "00"
        ),
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1,
          "00",
          "00",
          "00"
        )
      ],
      dataVal1: [
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          "00",
          "00",
          "00"
        ),
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1,
          "00",
          "00",
          "00"
        )
      ],
      moneyShow: true,
      // 转入，
      transferInParameter: {
        money: "",
        coinPwd: ""
      },
      // 转出
      urlStr: {
        status: 0
      },
      transferOutParameter: {
        yuIds: [],
        bankId: "",
        coinPwd: ""
      },
      transferOutOptions: [
        {
          value: "0",
          label: "转出至账户余额"
        },
        {
          value: "1",
          label: "转出至银行卡"
        }
      ],
      transferOutStatus: "0",
      transferOutList: [],
      // 转入记录
      transferOptions: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "进行中"
        },
        {
          value: "2",
          label: "已终止"
        },
        {
          value: "3",
          label: "赎回中"
        },
        {
          value: "4",
          label: "已赎回"
        }
      ],
      transferParameter: {
        startTime: "",
        endTime: "",
        status: "0",
        page: 1,
        pageSize: 10
      },
      transferList: [],
      transferTotal: 0,
      transferNoData: false,
      // 收支明细
      incomeOptions: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "160",
          label: "转入余额宝"
        },
        {
          value: "161",
          label: "余额宝转出至余额"
        },
        {
          value: "162",
          label: "余额宝转出至银行卡"
        },
        {
          value: "163",
          label: "收益转出至余额"
        },
        {
          value: "164",
          label: "收益转出至银行卡"
        }
      ],
      incomeParameter: {
        startTime: "",
        endTime: "",
        billType: "0",
        page: 1,
        pageSize: 10
      },
      incomeList: [],
      incomeTotal: 0,
      incomeNoData: false,
      dataInitial: [
        new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate(),
        new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          (new Date().getDate() + 1)
      ]
    };
  },
  created() {
    this.yueBaoIndex();
    if (!this.myBank || !this.myBank.length) {
      // 我的银行卡
      this.$store.dispatch("myBanks");
    }
    console.log(this.myBank);
  },
  computed: {
    ...mapGetters(["transferInShow", "transferOutShow", "allConfig", "myBank"])
  },
  watch: {
    transferOutStatus(newVal) {
      console.log(newVal);
      if (newVal == "0") {
        this.transferOutParameter.bankId = "";
      }
    }
  },
  methods: {
    handleClick(tab) {
      if (tab.name === "yuEBao") {
        this.yueBaoIndex();
      } else if (tab.name === "transfer") {
        this.transferParameter.page = 1;
        this.transfers();
      } else if (tab.name === "income") {
        this.incomeParameter.page = 1;
        this.incomes();
      } else {
        this.yueBaoHelps();
      }
    },
    changeData(val) {
      console.log(val);
      if (this.activeName === "transfer") {
        this.transferParameter.startTime = val[0];
        this.transferParameter.endTime = val[1];
      } else {
        this.incomeParameter.startTime = val[0];
        this.incomeParameter.endTime = val[1];
      }
    },
    handleCurrentChange(page) {
      console.log(page);
      if (this.activeName === "transfer") {
        this.transferParameter.page = page;
        this.transfers();
      } else {
        this.incomeParameter.page = page;
        this.incomes();
      }
    },
    yueBaoIndex() {
      this.loading = true;
      yueBao().then(res => {
        this.loading = false;
        if (res.status) {
          this.yueBaoIndexList = res.data;
        }
        console.log(res, "余额宝首页");
      });
    },
    yueBaoHelps() {
      if (this.yueBaoHelpList) {
        return false;
      }
      this.loading = true;
      yueBaoHelp().then(res => {
        this.loading = false;
        console.log(res, "yueBaoHelpList");
        this.yueBaoHelpList = res.data;
      });
    },
    // 转入记录
    transfers() {
      this.loading = true;
      this.incomeNoData = false;
      if (!this.transferParameter.startTime) {
        this.transferParameter.startTime = this.dataInitial[0];
        this.transferParameter.endTime = this.dataInitial[1];
      }
      yuebaoRecord(this.transferParameter).then(res => {
        this.loading = false;
        console.log(res, "transfer---------------------------");
        if (res.status) {
          this.transferTotal = res.data.total;
          this.transferList = res.data.list;
          if (!res.data.total) {
            this.transferNoData = true;
          } else {
            this.transferNoData = false;
          }
        }
      });
    },
    transferSearch() {
      this.transferParameter.page = 1;
      this.transfers();
    },
    // 收支明细
    incomes() {
      this.loading = true;
      if (!this.incomeParameter.startTime) {
        this.incomeParameter.startTime = this.dataInitial[0];
        this.incomeParameter.endTime = this.dataInitial[1];
      }
      this.incomeNoData = false;
      yuebaoLog(this.incomeParameter).then(res => {
        this.loading = false;
        console.log(res, "income---------------------------");
        if (res.status) {
          this.incomeTotal = res.data.total;
          this.incomeList = res.data.list;
          if (!res.data.total) {
            this.incomeNoData = true;
          } else {
            this.incomeNoData = false;
          }
        }
      });
    },
    incomeSearch() {
      this.incomeParameter.page = 1;
      this.incomes();
    },
    transferIns() {
      if (!this.transferInParameter.money) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入转入金额",
          duration: 1000
        });
      }
      if (this.transferInParameter.money < parseFloat(this.allConfig.cashMin)) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "金额不能低于" + this.allConfig.cashMin + "元",
          duration: 1000
        });
      }
      if (this.transferInParameter.money > parseFloat(this.allConfig.cashMax)) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "金额不能高于" + this.allConfig.cashMax + "元",
          duration: 1000
        });
      }
      if (!this.transferInParameter.coinPwd) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入资金密码",
          duration: 1000
        });
      }
      this.loading = true;
      transFerIn(this.transferInParameter).then(res => {
        this.loading = false;
        let type = "success";
        if (res.status) {
          this.yueBaoIndex();
          this.close();
        } else {
          type = "error";
          this.transferInParameter.coinPwd = "";
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg,
          duration: 1000
        });
      });
    },
    transferOuts() {
      if (!this.transferOutList.length) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "您余额宝资金为空",
          duration: 1000
        });
      }
      if (this.transferOutStatus == "1") {
        if (!this.transferOutParameter.bankId) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请选择转出银行卡",
            duration: 1000
          });
        }
      }
      if (!this.transferOutParameter.yuIds.length) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请选择转出金额",
          duration: 1000
        });
      }
      if (!this.transferOutParameter.coinPwd) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请填写资金密码",
          duration: 1000
        });
      }
      this.loading = true;
      this.transferOutParameter.yuIds = this.transferOutParameter.yuIds.toString();
      transferOut(this.transferOutParameter).then(res => {
        console.log(res);
        this.loading = false;
        let type = "success";
        if (res.status) {
          this.yueBaoIndex();
          this.close();
        } else {
          type = "error";
          this.transferOutParameter.coinPwd = "";
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg,
          duration: 1000
        });
      });
    },
    trfIn() {
      this.$store.commit("SET_TRANSFER_IN_SHOW", 1);
      this.$store.commit("SET_TRANSFER_OUT_SHOW", 0);
    },
    trfOut() {
      this.$store.commit("SET_TRANSFER_OUT_SHOW", 1);
      this.$store.commit("SET_TRANSFER_IN_SHOW", 0);
      this.transferOutList = [];
      this.loading = true;
      yuebaoRecord(this.urlStr).then(res => {
        this.loading = false;
        res.data.list.forEach(element => {
          if (element.status == 1 || element.status == 2) {
            this.transferOutList.push(element);
          }
        });
        console.log(this.transferOutList, "转出金额-------------------------");
      });
    },
    close() {
      this.$store.commit("SET_TRANSFER_OUT_SHOW", 0);
      this.$store.commit("SET_TRANSFER_IN_SHOW", 0);
      this.initData();
    },
    initData() {
      this.transferInParameter.money = "";
      this.transferInParameter.coinPwd = "";
      this.transferOutStatus = "0";
      this.transferOutParameter.yuIds = [];
      this.transferOutParameter.bankId = "";
      this.transferOutParameter.coinPwd = "";
    }
  }
};
</script>

<style scoped lang="scss">
.balance {
  display: flex;
  flex: 1;
  position: relative;
  .yuEBao {
    height: 100%;
    display: flex;
    flex-direction: column;
    .img {
      width: 100%;
      height: 210px;
      border-bottom: 3px solid #f0f0f0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      flex: 1;
      display: flex;
      .left {
        width: 580px;
        border-right: 3px solid #f0f0f0;
        padding-left: 10px;
        .left-top {
          padding-top: 30px;
          div {
            &:nth-child(1) {
              display: flex;
              align-items: center;
              span {
                display: inline-block;
                &:nth-child(1) {
                  width: 108px;
                  height: 30px;
                  background-color: #f9f9f9;
                  color: #333;
                  text-align: center;
                  line-height: 30px;
                }
                &:nth-child(3) {
                  width: 76px;
                  height: 30px;
                  margin-left: 20px;
                  text-align: center;
                  line-height: 30px;
                  background-color: #fea24d;
                  color: #fff;
                  border-radius: 3px;
                  cursor: pointer;
                }
                &:nth-child(4) {
                  width: 76px;
                  height: 30px;
                  margin-left: 30px;
                  text-align: center;
                  line-height: 30px;
                  border: 1px solid #fea24d;
                  color: #fea24d;
                  border-radius: 3px;
                  cursor: pointer;
                }
              }
              i {
                margin: 0 15px;
                font-size: 24px;
                cursor: pointer;
                &:active {
                  color: #fea24d;
                }
              }
            }
            &:nth-child(2) {
              padding-left: 10px;
              font-size: 20px;
              color: #fea24d;
              padding-top: 15px;
              padding-bottom: 18px;
              border-bottom: 3px solid #f0f0f0;
              font-weight: bold;
            }
          }
        }
        .left-btm {
          ul {
            display: flex;
            li {
              flex: 0 0 auto;
              border-right: 2px solid #f0f0f0;
              width: 184px;
              padding-left: 10px;
              margin-top: 20px;
              &:last-child {
                border: none;
              }
              p {
                width: 108px;
                height: 30px;
                background-color: #f9f9f9;
                color: #333;
                text-align: center;
                line-height: 30px;
                margin-bottom: 10px;
              }
              span {
                padding-left: 15px;
                color: #fea24d;
                font-size: 18px;
                font-weight: bold;
              }
            }
          }
        }
      }
      .right {
        width: 100%;
        padding-top: 30px;
        h3 {
          width: 284px;
          height: 40px;
          background-color: #f9f9f9;
          text-align: center;
          line-height: 40px;
          color: #333;
          margin: auto;
        }
        ul {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          li {
            flex: 0 0 auto;
            border-right: 2px solid #f0f0f0;
            width: 134px;
            padding-left: 10px;
            margin-top: 20px;
            &:last-child {
              border: none;
            }
            p {
              width: 108px;
              height: 30px;
              background-color: #f9f9f9;
              color: #333;
              text-align: center;
              line-height: 30px;
              margin-bottom: 10px;
            }
            span {
              padding-left: 15px;
              color: #fea24d;
              font-size: 18px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .transfer,
  .income {
    height: 100%;
    .main {
      height: 100%;
      position: relative;
      .header {
        height: 60px;
        line-height: 60px;
        display: flex;
        font-size: 14px;
        color: #999;
        background: #fff;
        padding-left: 30px;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
        .category {
          span {
            margin-right: 10px;
          }
          .el-select {
            width: 117px;
          }
        }
        .date {
          margin-left: 40px;
          span {
            margin-right: 15px;
          }
        }
        span.search {
          color: #fff;
          width: 80px;
          text-align: center;
          line-height: 30px;
          height: 30px;
          margin-left: 80px;
          display: block;
          float: right;
          font-size: 14px;
          border-radius: 5px;
          background: linear-gradient(#fdc937, #f37334);
          cursor: pointer;
          opacity: 0.6;
          margin-top: 15px;
        }
      }
      .maincontent {
        overflow: hidden;
        li.th {
          height: 42px;
          background-image: linear-gradient(#fdf7ea, #fdf7ea),
            linear-gradient(#f0f0f0, #f0f0f0), linear-gradient(#fafafa, #fafafa);
          background-blend-mode: normal, normal, normal;
        }
        li {
          line-height: 38px;
          height: 38px;
          font-size: 14px;
          color: #666;
          display: flex;
          &:nth-of-type(2n - 1) {
            background-color: #fafafa;
          }
          div {
            overflow: hidden;
            white-space: normal;
            text-overflow: ellipsis;
            flex: 0 0 auto;
            text-align: center;
          }
        }
      }
      .btm {
        position: absolute;
        width: 100%;
        bottom: 10px;
        text-align: right;
        .btm-page {
          display: inline-block;
          overflow: hidden;
          padding-right: 30px;
          span {
            float: left;
            line-height: 32px;
            font-size: 16px;
            cursor: pointer;
          }
          .Page {
            float: left;
          }
        }
      }
    }
  }
  .transfer {
    .main {
      .maincontent {
        li {
          div {
            &:nth-child(1) {
              width: 180px;
            }
            &:nth-child(2) {
              width: 160px;
            }
            &:nth-child(3) {
              width: 180px;
            }
            &:nth-child(4) {
              width: 160px;
            }
            &:nth-child(5) {
              width: 220px;
            }
          }
        }
      }
    }
  }
  .income {
    .main {
      .maincontent {
        li {
          div {
            &:nth-child(1) {
              width: 235px;
            }
            &:nth-child(2) {
              width: 215px;
            }
            &:nth-child(3) {
              width: 235px;
            }
            &:nth-child(4) {
              width: 215px;
            }
          }
        }
      }
    }
  }
  .directions {
    .img {
      width: 100%;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    dl {
      margin-top: 10px;
      height: 420px;
      overflow-y: scroll;
      padding: 0 10px;
      &::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
      }
      dt {
        font-size: 16px;
        margin-bottom: 5px;
        color: #333;
        font-weight: bold;
      }
      dd {
        padding-left: 15px;
        h3 {
          color: #fea24d;
          font-size: 16px;
          line-height: 40px;
          position: relative;
          &:after {
            content: " ";
            position: absolute;
            left: -15px;
            top: 50%;
            transform: translate(0, -50%);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #fea24d;
          }
        }
        p {
          color: #666;
          line-height: 24px;
          margin-bottom: 5px;
        }
      }
    }
  }
  .noData {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    img {
      display: inline-block;
    }
  }
  .transferIn {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    .content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      padding: 20px;
      border-radius: 3px;
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 80px;
        span {
          display: inline-block;
          width: 80px;
          white-space: normal;
          text-align: center;
        }
        .el-input {
          width: 200px;
        }
        &:nth-child(3) {
          span {
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
            &:nth-child(1) {
              background-color: #f0f0f0;
            }
            &:nth-child(2) {
              color: #fff;
              background-image: linear-gradient(0deg, #fc4a1a 0%, #f7b733 100%),
                linear-gradient(#eeeeee, #eeeeee);
            }
          }
        }
      }
    }
  }
  .transferOut {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    .content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      padding: 20px;
      border-radius: 3px;
      > div {
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          display: inline-block;
          white-space: normal;
          width: 100px;
        }
        .el-input,
        .el-select {
          width: 230px;
        }

        &:last-child {
          span {
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
            text-align: center;
            &:nth-child(1) {
              background-color: #f0f0f0;
            }
            &:nth-child(2) {
              color: #fff;
              background-image: linear-gradient(0deg, #fc4a1a 0%, #f7b733 100%),
                linear-gradient(#eeeeee, #eeeeee);
            }
          }
        }
        &.money {
          div {
            width: 230px;
            .el-checkbox-group {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              align-items: center;
              .el-checkbox {
                width: 115px;
                margin: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
