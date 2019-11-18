<template>
  <div class="bill">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      :before-leave="leaveTab"
    >
      <el-tab-pane
        v-for="(item, i) in TitleList"
        :key="i"
        :label="item.title"
        :name="item.typeKey"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-background="rgba(255, 255, 255, 0.3)"
      >
        <div v-if="activeName === 'bill'" class="isBill">
          <div class="main">
            <div class="header">
              <div class="category">
                <span>账单类别</span>
                <el-select
                  class="account"
                  v-model="parameter.billType"
                  placeholder="全部"
                  minlength="8"
                  maxlength
                >
                  <el-option
                    v-for="(item, index) in options"
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
              <span class="search" @click="search">搜索</span>
            </div>
            <ul class="maincontent">
              <li class="th">
                <div>时间</div>
                <div>帐变类型</div>
                <div>金额</div>
                <div>余额</div>
                <div>备注</div>
              </li>
              <li v-for="(item, i) in dataArr" :key="i">
                <div>{{ timestampToString(item.actionTime) }}</div>
                <el-tooltip :content="item.billTitle" placement="top"
                  ><div>{{ item.billTitle }}</div></el-tooltip
                >
                <div>{{ item.coin }}</div>
                <div>{{ item.beforeCoin }}</div>
                <el-tooltip :content="item.info" placement="top"
                  ><div>{{ item.info }}</div></el-tooltip
                >
              </li>
            </ul>
            <div v-show="noData" class="noData">
              <img
                :src="commonImgs('default/noData.png')"
                alt="暂无数据"
                draggable="false"
              />
              <p>暂无记录</p>
            </div>
            <div class="btm" v-show="total">
              <div class="btm-page">
                <el-pagination
                  class="Page"
                  background
                  layout="prev, pager, next"
                  :total="total"
                  :page-size="parameter.pageSize"
                  @current-change="handleCurrentChange"
                  :current-page="parameter.page"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="activeName === 'today'" class="isToday">
          <div class="isToday-top">
            <span
              v-for="(item, i) in tabList"
              :key="i"
              :class="{ on: item.type == statisticsType }"
              @click="changeTab(item.type)"
              >{{ item.title }}</span
            >
          </div>
          <dl v-if="statisticsAllList">
            <dt>
              <div>游戏</div>
              <div>投注</div>
              <div>有效投注</div>
              <!--              <div>派奖</div>-->
              <!--              <div>红利</div>-->
              <div>总盈亏</div>
            </dt>
            <dd v-for="(item, i) in statisticsList" :key="i">
              <div>{{ item.name }}</div>
              <div>{{ item.allBet }}</div>
              <div>{{ item.cellScore }}</div>
              <div>{{ item.profit }}</div>
            </dd>
          </dl>
          <ul v-if="statisticsAllList">
            <li>
              <div>
                <span>充值</span>
                <p>{{ statisticsAllList.all.rechargeAmount }}元</p>
              </div>
            </li>
            <li>
              <div>
                <span>提现</span>
                <p>{{ statisticsAllList.all.withdrawAmount }}元</p>
              </div>
            </li>
            <li>
              <div>
                <span><i class="iconfont"></i>总盈亏</span>
                <p>{{ statisticsAllList.all.profit }}元</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else-if="activeName === 'RechargeList'" class="rechargeList">
          <div class="main">
            <div class="header">
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
                  @change="changeDataRecharge"
                ></el-date-picker>
              </div>
              <span class="search" @click="searchRecharge">搜索</span>
            </div>
            <ul class="maincontent">
              <li class="th">
                <div>订单号</div>
                <div>类型</div>
                <div>充值金额</div>
                <div>提交时间</div>
                <div>状态</div>
              </li>
              <li v-for="(item, i) in dataArrRecharge" :key="i">
                <div>{{ item.rechargeId }}</div>
                <div>{{ item.mark }}</div>
                <div>{{ item.amount }}</div>
                <div>{{ timestampToString(item.actionTime) }}</div>
                <div>{{ item.state | changeStatusRecharge }}</div>
              </li>
            </ul>
            <div v-show="noDataRecharge" class="noData">
              <img
                :src="commonImgs('default/noData.png')"
                alt="暂无数据"
                draggable="false"
              />
              <p>暂无记录</p>
            </div>
            <div class="btm" v-show="totalRecharge">
              <div class="btm-page">
                <el-pagination
                  class="Page"
                  background
                  layout="prev, pager, next"
                  :total="totalRecharge"
                  :page-size="rechargeList.pageSize"
                  @current-change="handleCurrentChangeRecharge"
                  :current-page="rechargeList.page"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="withdrawList">
          <div class="main">
            <div class="header">
              <div class="date">
                <span>选择日期</span>
                <el-date-picker
                  v-model="dataVal2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="changeDataWithdraw"
                ></el-date-picker>
              </div>
              <span class="search" @click="searchWithdraw">搜索</span>
            </div>
            <ul class="maincontent">
              <li class="th">
                <div>申请时间</div>
                <div>银行名称</div>
                <div>银行账号</div>
                <div>充值金额</div>
                <div>状态</div>
              </li>
              <li v-for="(item, i) in dataArrWithdraw" :key="i">
                <div>{{ timestampToString(item.actionTime) }}</div>
                <div>{{ item.bankName }}</div>
                <el-tooltip :content="item.account" placement="top"
                  ><div>{{ item.account }}</div></el-tooltip
                >
                <div>{{ item.amount }}</div>
                <div>{{ item.state | changeStatusWithdraw }}</div>
              </li>
            </ul>
            <div v-show="noDataWithdraw" class="noData">
              <img
                :src="commonImgs('default/noData.png')"
                alt="暂无数据"
                draggable="false"
              />
              <p>暂无记录</p>
            </div>
            <div class="btm" v-show="totalWithdraw">
              <div class="btm-page">
                <el-pagination
                  class="Page"
                  background
                  layout="prev, pager, next"
                  :total="totalWithdraw"
                  :page-size="withdrawList.pageSize"
                  @current-change="handleCurrentChangeWithdraw"
                  :current-page="withdrawList.page"
                ></el-pagination>
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
import { account, statistics, rechargeRecord, WithdrawRecord } from "../../api";
const TitleList = [
  {
    title: "账变明细",
    typeKey: "bill"
  },
  {
    title: "今日盈亏",
    typeKey: "today"
  },
  {
    title: "充值记录",
    typeKey: "RechargeList"
  },
  {
    title: "提现记录",
    typeKey: "WithdrawList"
  }
];
const tabList = [
  {
    title:
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate(),
    type: "1"
  },
  { title: "昨日", type: "2" },
  { title: "近一周", type: "3" },
  { title: "近一月", type: "4" }
];
export default {
  name: "Bill",
  data() {
    return {
      TitleList,
      tabList,
      activeName: "bill",
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
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "10",
          label: "充值"
        },
        {
          value: "20",
          label: "提现"
        },
        {
          value: "30",
          label: "返点"
        },
        {
          value: "40",
          label: "派奖"
        },
        {
          value: "50",
          label: "撤单"
        },
        { value: "60", label: "投注" },
        {
          value: "70",
          label: "额度转换"
        },
        {
          value: "80",
          label: "活动"
        },
        {
          value: "90",
          label: "其他"
        }
      ],
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
      dataVal2: [
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
      dataArr: [],
      loading: false,
      total: 0,
      noData: false,
      parameter: {
        startTime: "",
        endTime: "",
        client: 1,
        billType: "",
        page: 1,
        pageSize: 10
      },
      statisticsAllList: "",
      statisticsList: "",
      statisticsType: "1",
      rechargeList: {
        offset: 0,
        pageSize: 10,
        timeType: 0,
        startTime: "",
        endTime: ""
      },
      dataArrRecharge: [],
      totalRecharge: 0,
      noDataRecharge: false,
      withdrawList: {
        offset: 0,
        pageSize: 10,
        timeType: 0,
        startTime: "",
        endTime: ""
      },
      dataArrWithdraw: [],
      totalWithdraw: 0,
      noDataWithdraw: false
    };
  },
  created() {
    this.initialArr();
  },
  computed: {
    ...mapGetters(["userInfo"]),
    isTest() {
      return this.userInfo.parentId == 312;
    }
  },
  filters: {
    changeStatusRecharge: function(value) {
      switch (value) {
        case 0:
          return "审核中";
        case 1:
          return "成功";
        case 2:
          return "充值单号已生成但未提交充值信息";
        case 3:
          return "拒绝";
        default:
          return "后台充值";
      }
    },
    changeStatusWithdraw: function(value) {
      switch (value) {
        case 0:
          return "确认到帐";
        case 1:
          return "审核中";
        case 4:
          return "提现失败";
        default:
          return "待确认";
      }
    }
  },
  methods: {
    leaveTab(activeName, oldActiveName) {
      console.log(activeName, oldActiveName);
      if (activeName === "RechargeList" || activeName === "WithdrawList") {
        if (this.isTest) {
          this.$message({
            type: "error",
            showClose: true,
            message: "试玩账号无法进入",
            duration: 1000
          });
          return false;
        }
      }
    },
    handleClick(tab) {
      if (tab.name === "bill") {
        this.initialArr();
      } else if (tab.name === "today") {
        this.statisticsInit();
      } else if (tab.name === "RechargeList") {
        if (!this.isTest) {
          this.initialArrRecharge();
        }
      } else if (tab.name === "WithdrawList") {
        if (!this.isTest) {
          this.initialArrWithdraw();
        }
      }
    },
    initialArr() {
      this.loading = true;
      this.noData = false;
      console.log(this.parameter, "账目记录请求参数-----------------");
      account(this.parameter).then(res => {
        this.loading = false;
        console.log(res, "账目记录返回数据---------------------------");
        if (res.status) {
          this.dataArr = res.data.list;
          this.total = res.data.total;
          if (!res.data.list.length) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        } else {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    handleCurrentChange(page) {
      console.log(page);
      this.parameter.page = page;
      this.initialArr();
    },
    changeData(val) {
      console.log(val);
      if (val) {
        this.parameter.startTime = val[0];
        this.parameter.endTime = val[1];
      }
    },
    search() {
      this.parameter.page = 1;
      console.log(this.parameter);
      this.initialArr();
    },
    statisticsInit() {
      this.loading = true;
      statistics({ timeType: this.statisticsType }).then(res => {
        console.log(this.statisticsType, "this.statisticsType");
        this.loading = false;
        if (res.status) {
          this.statisticsAllList = res.data;
          let obj = {};
          Object.keys(this.statisticsAllList)
            .filter(item => item !== "all")
            .forEach(item => {
              obj[item] = this.statisticsAllList[item];
            });
          this.statisticsList = obj;
        }
        console.log(res, "今日盈亏");
      });
    },
    changeTab(type) {
      this.statisticsType = type;
      this.statisticsInit();
      console.log(type);
    },
    initialArrRecharge() {
      console.log(this.rechargeList.startTime, "开始时间");
      this.loading = true;
      this.noDataRecharge = false;
      console.log(this.rechargeList, "充值记录请求参数-----------------");
      rechargeRecord(this.rechargeList).then(res => {
        this.loading = false;
        console.log(res, "充值记录返回数据---------------------------");
        if (res.status) {
          this.dataArrRecharge = res.data.list;
          this.totalRecharge = res.data.total;
          if (!res.data.list.length) {
            this.noDataRecharge = true;
          } else {
            this.noDataRecharge = false;
          }
        } else {
          this.$message.error({
            showClose: true,
            message: res.msg
          });
        }
      });
    },
    handleCurrentChangeRecharge(page) {
      console.log(page);
      this.rechargeList.page = page;
      this.initialArrRecharge();
    },
    changeDataRecharge(val) {
      console.log(val, "Rechargeval");
      if (val) {
        this.rechargeList.startTime = val[0];
        this.rechargeList.endTime = val[1];
      }
    },
    searchRecharge() {
      this.rechargeList.timeType = 10;
      this.initialArrRecharge();
    },
    initialArrWithdraw() {
      this.loading = true;
      this.noDataWithdraw = false;
      console.log(this.withdrawList, "充值记录请求参数-----------------");
      WithdrawRecord(this.withdrawList).then(res => {
        this.loading = false;
        console.log(res, "提现记录返回数据---------------------------");
        if (res.status) {
          this.dataArrWithdraw = res.data.list;
          this.totalWithdraw = res.data.total;
          if (!res.data.list.length) {
            this.noDataWithdraw = true;
          } else {
            this.noDataWithdraw = false;
          }
        } else {
          this.$message.error({
            showClose: true,
            message: res.msg
          });
        }
      });
    },
    handleCurrentChangeWithdraw(page) {
      console.log(page);
      this.withdrawList.page = page;
      this.initialArrWithdraw();
    },
    changeDataWithdraw(val) {
      console.log(val, "Withdrawval");
      if (val) {
        this.withdrawList.startTime = val[0];
        this.withdrawList.endTime = val[1];
      }
    },
    searchWithdraw() {
      this.withdrawList.timeType = 10;
      this.initialArrWithdraw();
    }
  }
};
</script>

<style scoped lang="scss">
.bill {
  display: flex;
  flex: 1;
  .isBill {
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
  .isToday {
    .isToday-top {
      padding-left: 40px;
      margin: 14px 0;
      span {
        display: inline-block;
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
        border: solid 1px #f0f0f0;
        margin-right: 20px;
        cursor: pointer;
        &.on {
          border-color: #cbb79f;
          color: #cbb79f;
        }
      }
    }
    dl {
      dt {
        display: flex;
        justify-content: space-around;
        background-color: #fafafa;
        height: 42px;
        line-height: 42px;
        color: #666666;
        border-top: 1px solid #e9e8ea;
        border-bottom: 1px solid #e9e8ea;
      }
      dd {
        display: flex;
        justify-content: space-around;
        height: 38px;
        line-height: 38px;
        &:nth-of-type(2n) {
          background-color: #fafafa;
        }
        &:last-child {
          border-bottom: 1px solid #e9e8ea;
        }
      }
      div {
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        text-align: center;
        &:nth-child(1) {
          width: 150px;
        }
        &:nth-child(2) {
          width: 150px;
        }
        &:nth-child(3) {
          width: 150px;
        }
        &:nth-child(4) {
          width: 150px;
        }
        &:nth-child(5) {
          width: 150px;
        }
        &:nth-child(6) {
          width: 150px;
        }
      }
    }
    ul {
      display: flex;
      margin: 50px 40px 0 40px;
      li {
        width: 128px;
        height: 74px;
        background-color: #ffffff;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        display: flex;
        align-items: center;
        margin-left: 10px;
        > div {
          padding-left: 20px;
          span {
            line-height: 30px;
          }
          p {
            line-height: 30px;
            color: #fa591e;
          }
        }
      }
    }
  }
  .rechargeList,
  .withdrawList {
    height: 100%;
    .main {
      height: 100%;
      position: relative;
      .header {
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #999;
        background: #fff;
        padding-left: 30px;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
        .date {
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
          display: block;
          float: right;
          font-size: 14px;
          border-radius: 5px;
          background: linear-gradient(#fdc937, #f37334);
          cursor: pointer;
          opacity: 0.6;
          margin-right: 15px;
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
}
</style>
