<template>
  <div class="record">
    <el-tabs v-model="parameter.classify" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, i) in gameRecordList"
        :key="i"
        :label="item.name"
        :name="item.classify"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-background="rgba(255, 255, 255, 0.3)"
      >
        <div class="content">
          <div class="top">
            <div>
              <p>游戏平台</p>
              <el-select v-model="parameter.typeKey" placeholder="全部游戏">
                <el-option
                  v-for="(child, j) in item.list"
                  :key="j"
                  :label="child"
                  :value="j"
                ></el-option>
              </el-select>
            </div>
            <div>
              <p>操作时间</p>
              <el-date-picker
                v-model="dataVal"
                type="datetimerange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions2"
                @change="changeData"
              ></el-date-picker>
            </div>
            <b @click="search">搜索</b>
          </div>
          <div class="middle">
            <div class="CP" v-if="parameter.classify === 'CP'">
              <dl>
                <dt>
                  <div>订单号</div>
                  <div>游戏类型</div>
                  <div>投注时间</div>
                  <div>投注期号</div>
                  <div>投注内容</div>
                  <div>下注金额</div>
                  <div>盈亏</div>
                </dt>
                <dd v-for="(item, i) in recordArr" :key="i">
                  <el-tooltip :content="item.round" placement="top">
                    <div>{{ item.round }}</div>
                  </el-tooltip>
                  <div>{{ item.title }}</div>
                  <div>{{ timestampToString(item.time) }}</div>
                  <div>{{ item.actionNo }}</div>
                  <el-tooltip :content="item.content" placement="top">
                    <div>{{ item.content }}</div>
                  </el-tooltip>
                  <div>{{ item.bet }}</div>
                  <div :class="parseInt(item.win) > 0 ? 'win' : 'loss'">
                    {{ item.win }}
                  </div>
                </dd>
                <template>
                  <div v-show="noData" class="noData">
                    <img
                      :src="commonImgs('default/noData.png')"
                      alt="暂无数据"
                      draggable="false"
                    />
                    <p>暂无记录</p>
                  </div>
                </template>
              </dl>
            </div>
            <div class="QP" v-else-if="parameter.classify === 'QP'">
              <dl>
                <dt>
                  <div>订单号</div>
                  <div>游戏类型</div>
                  <div>投注时间</div>
                  <div>有效投注</div>
                  <div>下注金额</div>
                  <div>盈亏</div>
                  <div>抽水</div>
                </dt>
                <dd v-for="(item, i) in recordArr" :key="i">
                  <el-tooltip :content="item.round" placement="top">
                    <div>{{ item.round }}</div>
                  </el-tooltip>
                  <div>{{ item.title }}</div>
                  <div>{{ timestampToString(item.time) }}</div>
                  <div>{{ item.cellScore }}</div>
                  <div>{{ item.bet }}</div>
                  <div :class="parseInt(item.win) > 0 ? 'win' : 'loss'">
                    {{ item.win }}
                  </div>
                  <div>{{ item.revenue }}</div>
                </dd>
                <template>
                  <div v-show="noData" class="noData">
                    <img
                      :src="commonImgs('default/noData.png')"
                      alt="暂无数据"
                      draggable="false"
                    />
                    <p>暂无记录</p>
                  </div>
                </template>
              </dl>
            </div>
            <div class="TY" v-else-if="parameter.classify === 'TY'">
              <dl>
                <dt>
                  <div>订单号</div>
                  <div>游戏类型</div>
                  <div>投注时间</div>
                  <div>投注内容</div>
                  <div>下注金额</div>
                  <div>盈亏</div>
                </dt>
                <dd v-for="(item, i) in recordArr" :key="i">
                  <el-tooltip :content="item.round" placement="top">
                    <div>{{ item.round }}</div>
                  </el-tooltip>
                  <div>{{ item.title }}</div>
                  <div>{{ timestampToString(item.time) }}</div>
                  <div>{{ item.content }}</div>
                  <div>{{ item.bet }}</div>
                  <div :class="parseInt(item.win) > 0 ? 'win' : 'loss'">
                    {{ item.win }}
                  </div>
                </dd>
                <template>
                  <div v-show="noData" class="noData">
                    <img
                      :src="commonImgs('default/noData.png')"
                      alt="暂无数据"
                      draggable="false"
                    />
                    <p>暂无记录</p>
                  </div>
                </template>
              </dl>
            </div>
            <div class="other" v-else>
              <dl>
                <dt>
                  <div>订单号</div>
                  <div>游戏类型</div>
                  <div>投注时间</div>
                  <div>下注金额</div>
                  <div>盈亏</div>
                </dt>
                <dd v-for="(item, i) in recordArr" :key="i">
                  <el-tooltip :content="item.round" placement="top">
                    <div>{{ item.round }}</div>
                  </el-tooltip>
                  <div>{{ item.title }}</div>
                  <div>{{ timestampToString(item.time) }}</div>
                  <div>{{ item.bet }}</div>
                  <div :class="parseInt(item.win) > 0 ? 'win' : 'loss'">
                    {{ item.win }}
                  </div>
                </dd>
                <template>
                  <div v-show="noData" class="noData">
                    <img
                      :src="commonImgs('default/noData.png')"
                      alt="暂无数据"
                      draggable="false"
                    />
                    <p>暂无记录</p>
                  </div>
                </template>
              </dl>
            </div>
          </div>
          <div class="btm" v-show="total">
            <div class="btm-page">
              <!--              <span @click="firstPage(1)">首页</span>-->
              <el-pagination
                class="Page"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="parameter.pageSize"
                @current-change="handleCurrentChange"
                :current-page="parameter.page"
              ></el-pagination>
              <!--              <span-->
              <!--                  @click="firstPage(Math.ceil(total / pageSize))"-->
              <!--                  style="margin-right: 10px;"-->
              <!--              >尾页</span-->
              <!--              >-->
              <!--              <span>共{{ Math.ceil(total / pageSize) }}页</span>-->
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { record } from "../../api";
import { mapGetters } from "vuex";
export default {
  name: "Record",
  data() {
    return {
      loading: false,
      noData: false,
      pickerOptions2: {
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
      parameter: {
        classify: "CP",
        typeKey: "Lottery",
        timeType: 0,
        startTime: "",
        endTime: "",
        page: 1,
        pageSize: 13
      },
      recordArr: [],
      total: 0
    };
  },
  created() {
    console.log(
      this.gameRecordList,
      "游戏记录tab列表***********************************"
    );
    this.initRecord();
  },
  computed: {
    ...mapGetters(["gameRecordList"])
  },
  methods: {
    handleClick() {
      this.recordArr = [];
      this.total = 0;
      this.noData = false;
      this.parameter.page = 1;
      this.parameter.typeKey = Object.keys(
        this.gameRecordList.filter(
          item => this.parameter.classify === item.classify
        )[0].list
      )[0];
      this.initRecord();
    },
    initRecord() {
      this.loading = true;
      record(this.parameter).then(res => {
        this.loading = false;
        if (res.status) {
          this.total = res.data.total;
          this.recordArr = res.data.list;
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
        if (!this.total) {
          this.noData = true;
        } else {
          this.noData = false;
        }
        console.log(res, "游戏记录数据--------------");
      });
    },
    changeData(time) {
      if (time) {
        this.parameter.startTime = time[0];
        this.parameter.endTime = time[1];
      }
    },
    handleCurrentChange(page) {
      this.parameter.page = page;
      this.initRecord();
    },
    search() {
      this.parameter.page = 1;
      this.initRecord();
      console.log(this.parameter);
    }
  }
};
</script>

<style scoped lang="scss">
.record {
  display: flex;
  flex: 1;
  .content {
    height: 100%;
    position: relative;
    .top {
      overflow: hidden;
      padding-top: 15px;
      margin: 0 29px 8px;
      font-size: 14px;
      color: #a1a1a1;
      div {
        float: left;
        display: flex;
        align-items: center;
        p {
          float: left;
          line-height: 38px;
          margin-right: 10px;
        }
        &:first-child {
          margin-right: 40px;
        }
      }
      b {
        float: right;
        text-align: center;
        line-height: 30px;
        color: white;
        width: 80px;
        height: 30px;
        background-image: linear-gradient(0deg, #fc4a1a 0%, #f7b733 100%),
          linear-gradient(#eeeeee, #eeeeee);
        font-size: 14px;
        border-radius: 5px;
        margin-top: 5px;
        cursor: pointer;
      }
    }
    .middle {
      div {
        dl {
          dt {
            display: flex;
            height: 42px;
            line-height: 42px;
            background-color: #fdf7ea;
          }
          dd {
            display: flex;
            height: 38px;
            line-height: 38px;
          }
          div {
            overflow: hidden;
            white-space: normal;
            text-overflow: ellipsis;
            color: #666666;
            &.win {
              color: #fb612b;
            }
            &.loss {
              color: #2698e8;
            }
          }
        }
        &.CP,
        &.QP {
          dt,
          dd {
            div {
              text-align: center;
              &:nth-child(1) {
                width: 180px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              &:nth-child(2) {
                width: 100px;
              }
              &:nth-child(3) {
                width: 150px;
              }
              &:nth-child(4) {
                width: 150px;
              }
              &:nth-child(5) {
                width: 100px;
              }
              &:nth-child(6) {
                width: 100px;
              }
              &:nth-child(7) {
                width: 120px;
              }
            }
          }
        }
        &.TY {
          dt,
          dd {
            div {
              text-align: center;
              &:nth-child(1) {
                width: 200px;
                overflow: hidden;
              }
              &:nth-child(2) {
                width: 130px;
              }
              &:nth-child(3) {
                width: 200px;
              }
              &:nth-child(4) {
                width: 130px;
              }
              &:nth-child(5) {
                width: 120px;
              }
              &:nth-child(6) {
                width: 120px;
              }
            }
          }
        }
        &.other {
          dt,
          dd {
            div {
              text-align: center;
              &:nth-child(1) {
                width: 200px;
              }
              &:nth-child(2) {
                width: 160px;
              }
              &:nth-child(3) {
                width: 160px;
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
}
</style>
