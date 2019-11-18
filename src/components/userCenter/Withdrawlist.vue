<template>
  <div class="Withdrawlist">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(item, i) in TitleList"
        :key="i"
        :label="item.title"
        :name="item.typeKey"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-background="rgba(255, 255, 255, 0.3)"
      >
        <div v-if="activeName === 'Withdrawlist'" class="isBill">
          <div class="main">
            <div class="header">
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
                ></el-date-picker>
              </div>
              <span class="search" @click="search">搜索</span>
            </div>
            <ul class="maincontent">
              <li class="th">
                <div>提现金额</div>
                <div>申请时间</div>
                <div>提现银行</div>
                <!-- <div>银行尾号</div> -->
                <div>状态</div>
                <div>备注</div>
              </li>
              <li v-for="(item, i) in dataArr" :key="i">
                <div>{{ item.amount }}</div>
                <div>{{ timestampToString(item.actionTime) }}</div>
                <div>{{ item.bankName }}</div>
                <div>{{ item.state | changeStatus }}</div>
                <div>{{ item.info || "--" }}</div>
                <!--<div>-->
                <!--{{ timestampToString(item.rechargeTime) | changeInfo }}-->
                <!--</div>-->
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
import { WithdrawRecord } from "../../api";
const TitleList = [
  {
    title: "提现记录",
    typeKey: "Withdrawlist"
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
  name: "Withdrawlist",
  data() {
    return {
      TitleList,
      tabList,
      activeName: "Withdrawlist",
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
      dataArr: [],
      loading: false,
      total: 0,
      noData: false,
      parameter: {
        offset: 0,
        pageSize: 10,
        timeType: 0,
        startTime: "",
        endTime: ""
      }
    };
  },
  created() {
    this.initialArr();
  },
  filters: {
    changeStatus: function(value) {
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
    },
    changeInfo(value) {
      if (!value) {
        return "-";
      } else {
        return value;
      }
    }
  },
  methods: {
    initialArr() {
      console.log(this.parameter.startTime, "开始时间");
      this.loading = true;
      console.log(this.parameter, "提现记录请求参数-----------------");
      WithdrawRecord(this.parameter).then(res => {
        this.loading = false;
        console.log(res, "提现记录返回数据---------------------------");
        if (res.status) {
          this.dataArr = res.data.list;
          this.total = res.data.total;
          if (!res.data.list.length) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        } else {
          this.$message({
            type: "error",
            showClose: true,
            message: res.msg,
            duration: 1000
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
      this.parameter.timeType = 10;
      this.initialArr();
    }
  }
};
</script>

<style scoped lang="scss">
.Withdrawlist {
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
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
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
            flex: 0 0 auto;
            text-align: center;
            &:nth-child(1) {
              width: 190px;
            }
            &:nth-child(2) {
              width: 210px;
            }
            &:nth-child(3) {
              width: 140px;
            }
            &:nth-child(4) {
              width: 160px;
            }
            &:nth-child(5) {
              width: 150px;
            }
            &:nth-child(6) {
              width: 170px;
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
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
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
