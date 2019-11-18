<template>
  <div
    class="activity"
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
        <div class="isActivity">
          <dl>
            <dt>
              <div>活动名称</div>
              <div>申请时间</div>
              <div>备注</div>
              <div>活动状态</div>
            </dt>
            <template v-if="!noData">
              <dd v-for="(item, i) in activityList" :key="i">
                <div>{{ item.title }}</div>
                <div>{{ timestampToString(item.createtime) }}</div>
                <el-tooltip :content="item.info | changeInfo" placement="top"
                  ><div>{{ item.info | changeInfo }}</div></el-tooltip
                >
                <div>{{ item.status | changeStatus }}</div>
              </dd>
            </template>
            <template v-else>
              <div class="noData">
                <img
                  :src="commonImgs('default/noData.png')"
                  alt="暂无数据"
                  draggable="false"
                />
                <p>暂无记录</p>
              </div>
            </template>
          </dl>
          <div class="pageBox" v-show="total">
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
              <!--                  @click="firstPage(Math.ceil(total / parameter.pageSize))"-->
              <!--                  style="margin-right: 10px;"-->
              <!--              >尾页</span-->
              <!--              >-->
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { activityApplyList } from "../../api";
const TitleList = [
  {
    title: "活动申请",
    typeKey: "activity"
  }
];
export default {
  name: "Activity",
  data() {
    return {
      TitleList,
      activeName: "activity",
      noData: false,
      activityList: [],
      total: 0,
      loading: false,
      parameter: {
        pageSize: 12,
        page: 1
      }
    };
  },
  created() {
    this.initData();
  },
  filters: {
    changeStatus: function(value) {
      switch (value) {
        case 0:
          return "待处理";
        case 1:
          return "已处理";
        default:
          return "已拒绝";
      }
    },
    changeInfo(value) {
      if (!value) {
        return "暂无备注";
      } else {
        return value;
      }
    }
  },
  methods: {
    initData() {
      this.loading = true;
      activityApplyList(this.parameter).then(res => {
        console.log(res, "活动申请-------------");
        this.loading = false;
        if (res.status) {
          this.activityList = res.data.list;
          this.total = res.data.total;
          console.log(res.data.list);
          if (!res.data.list.length) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        }
      });
    },
    handleCurrentChange(num) {
      this.parameter.page = num;
      this.initData();
    }
  }
};
</script>

<style scoped lang="scss">
.activity {
  display: flex;
  flex: 1;
  .isActivity {
    height: 100%;
    position: relative;
    dl {
      dt {
        height: 42px;
        background-color: #fdf7ea;
        border-bottom: 1px solid #e9e8ea;
        display: flex;
        line-height: 42px;
      }
      dd {
        display: flex;
        height: 38px;
        line-height: 38px;
      }
      div {
        text-align: center;
        color: #666;
        flex: 0 0 auto;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        &:nth-child(1) {
          width: 200px;
        }
        &:nth-child(2) {
          width: 200px;
        }
        &:nth-child(3) {
          width: 400px;
        }
        &:nth-child(4) {
          width: 100px;
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
    .pageBox {
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
</style>
