<template>
  <div class="userdetail">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(item, i) in TitleList"
        :key="i"
        :label="item.title"
        :name="item.typeKey"
      >
        <div v-if="item.typeKey === 'userDetail'" class="userdetail-content">
          <div class="content-top">
            <div>
              <img
                v-if="userInfo.avatar"
                :src="userInfo.avatar"
                alt
                draggable="false"
              />
              <img v-else src="../../assets/images/tx.png" alt />
              <p @click="[(txShow = true), (avatarId = '')]">编辑</p>
            </div>
            <ul>
              <li v-show="allConfig.enableTuijian == '1'">
                <span>推荐码</span>
                <b>{{ userInfo.uid }}</b>
              </li>
              <!--              <li>-->
              <!--                <span>借呗额</span>-->
              <!--                <b>10000</b>-->
              <!--              </li>-->
              <li>
                <span>会员等级</span>
                <b>{{ userInfo.levelName }}</b>
              </li>
            </ul>
          </div>
          <div class="content-btm">
            <dl>
              <dd>
                <div>
                  <span>账号</span>
                  <b>Username</b>
                </div>
                <el-input
                  :value="userInfo.username"
                  :disabled="true"
                ></el-input>
              </dd>
              <dd>
                <div>
                  <span>真实姓名</span>
                  <b>Name</b>
                </div>
                <el-input :value="userInfo.name" :disabled="true"></el-input>
              </dd>
              <dd>
                <div>
                  <span>昵称</span>
                  <b>Nickname</b>
                </div>
                <el-input
                  v-model="user.nickname"
                  :value="userInfo.nickname"
                ></el-input>
              </dd>
              <dd>
                <div>
                  <span>手机号</span>
                  <b>Cellphone Number</b>
                </div>
                <el-input :value="userInfo.mobile" :disabled="true"></el-input>
              </dd>
              <!--              <dd>-->
              <!--                <div>-->
              <!--                  <span>邮箱</span>-->
              <!--                  <b>E-mail</b>-->
              <!--                </div>-->
              <!--                <el-input></el-input>-->
              <!--              </dd>-->
              <dd>
                <div>
                  <span>QQ</span>
                  <b>QQ Number</b>
                </div>
                <el-input :value="userInfo.qq" v-model="user.qq"></el-input>
              </dd>
            </dl>
            <div class="btn submitBtn" @click="changeNickname">立即提交</div>
          </div>
        </div>
        <div v-if="item.typeKey === 'mySpread'" class="mySpread">
          <div class="mySpread-content">
            <div>我的推荐码：{{ userInfo.uid }}</div>
            <div>
              <div>我的推荐网址：</div>
              <div>
                <span>{{ tjUrl }}</span>
                <span
                  class="copy"
                  v-clipboard:copy="tjUrl"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  >复制</span
                >
                <p>您可以复制推荐网址给您的好友赚取更多丰厚收益</p>
              </div>
            </div>
            <div>
              本月推荐收益：
              <span>{{ mySpread }}</span>
            </div>
            <div>
              每天的7点更新收益，如3号7点，会计算2号0点-24点之间所有数据，然后增加您的收益。您的收益=推荐会员的有效投注额度总和
              ÷ 100 × 0.1(转换率),小数部份四舍五入!
              <span>(风险账号不参与收益计算)</span>
            </div>
            <div>我推荐的会员（共计{{ memberCount }}位）</div>
            <div>
              <span v-for="(item, i) in memberList" :key="i">
                {{ item.username }}
              </span>
            </div>
          </div>
        </div>
        <transition name="fadeUp">
          <div class="tx" v-show="txShow">
            <div class="txContent">
              <div class="title">
                修改头像
                <i class="iconfont" @click="txShow = false">&#xe60e;</i>
              </div>
              <div class="txImg">
                <ul>
                  <li
                    v-for="(item, i) in allConfig.avatarList"
                    :key="i"
                    @click="avatarId = item.id"
                    :class="{ on: avatarId == item.id }"
                  >
                    <img :src="item.avatar" alt />
                  </li>
                </ul>
              </div>
              <div class="txBtm">
                <span @click="txChange">确定</span>
                <span @click="txShow = false">取消</span>
              </div>
            </div>
          </div>
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { modifyUser, spread } from "../../api";
import BScroll from "better-scroll";
const TitleList = [
  {
    title: "个人资料",
    typeKey: "userDetail"
  },
  {
    title: "我的推广",
    typeKey: "mySpread"
  }
];
export default {
  name: "UserDetail",
  data() {
    return {
      TitleList,
      activeName: "userDetail",
      avatarId: "",
      txShow: false,
      user: {
        nickname: "",
        qq: ""
      },
      memberCount: 0,
      memberList: [],
      mySpread: 0
    };
  },
  computed: {
    ...mapGetters(["userInfo", "allConfig"]),
    tjUrl() {
      return window.location.origin + "/" + this.userInfo.uid;
    }
  },
  created: function() {
    // console.log(this.userInfo, "个人资料");
    this.user.nickname = this.userInfo.nickname;
    this.user.qq = this.userInfo.qq;
    // console.log(this.allConfig);
    this.$nextTick(() => {
      new BScroll(document.querySelector(".txImg"), {
        mouseWheel: true
      });
    });
    if (this.userInfo) {
      this.getSpread();
    }
    if (this.allConfig.enableTuijian !== "1" || this.userInfo.type == "3") {
      this.TitleList.splice(1, 1);
    }
  },
  methods: {
    getSpread() {
      spread().then(res => {
        console.log(res, "我的推荐-----------------");
        this.memberCount = res.data.num;
        this.memberList = res.data.child;
        this.mySpread = res.data.money;
      });
    },
    onCopy: function() {
      // console.log(e);
      this.$message({
        type: "success",
        showClose: true,
        duration: 1000,
        message: "复制成功"
      });
    },
    onError: function() {
      // console.log(e);
      this.$message({
        type: "error",
        showClose: true,
        duration: 1000,
        message: "复制失败"
      });
    },
    changeNickname() {
      modifyUser(this.user).then(res => {
        let type;
        if (res.status) {
          type = "success";
          this.$store.dispatch("userDetails");
        } else {
          type = "error";
        }
        this.$message({
          type: type,
          showClose: true,
          duration: 1000,
          message: res.msg
        });
      });
    },
    txChange() {
      if (!this.avatarId) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请选择更改的头像"
        });
      }
      modifyUser({ avatar: this.avatarId }).then(res => {
        let type;
        if (res.status) {
          type = "success";
          this.$store.dispatch("userDetails");
          this.txShow = false;
        } else {
          type = "error";
        }
        this.$message({
          type: type,
          showClose: true,
          duration: 1000,
          message: res.msg
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.userdetail {
  display: flex;
  flex: 1;
  .userdetail-content {
    padding-left: 40px;
    .content-top {
      height: 104px;
      background-image: linear-gradient(90deg, #ffffff 1%, #f83600 100%),
        linear-gradient(#1e1e1e, #1e1e1e);
      position: relative;
      > div {
        width: 104px;
        height: 104px;
        overflow: hidden;
        border-radius: 50%;
        border: 2px solid #fff;
        position: absolute;
        top: 50%;
        left: 0;
        img {
          width: 100%;
          height: 100%;
        }
        p {
          position: absolute;
          bottom: -30px;
          width: 104px;
          height: 30px;
          background-color: rgba(0, 0, 0, 0.3);
          text-align: center;
          line-height: 30px;
          color: #fff;
          transition: 0.3s;
          cursor: pointer;
        }
        &:hover {
          p {
            bottom: 0;
          }
        }
      }
      ul {
        display: flex;
        justify-content: space-around;
        width: 530px;
        float: right;
        li {
          text-align: right;
          padding-top: 30px;
          span {
            font-size: 12px;
            color: #ffffff;
            opacity: 0.6;
          }
          b {
            display: block;
            font-size: 30px;
            color: #fff;
          }
        }
      }
    }
    .content-btm {
      margin-top: 82px;
      dl {
        display: flex;
        flex-wrap: wrap;
        dd {
          margin-bottom: 20px;
          &:nth-of-type(2n) {
            margin-left: 80px;
          }
          div {
            margin-bottom: 14px;
            span {
              font-size: 14px;
              color: #666;
            }
            b {
              font-size: 12px;
              color: #999999;
              font-weight: normal;
              margin-left: 10px;
            }
          }
          .el-input {
            width: 370px;
            margin-bottom: 0;
          }
        }
      }
    }
    .btn {
      float: right;
      margin-right: 40px;
    }
  }
  .mySpread {
    border: 1px solid #f0f0f0;
    margin: 30px 38px;
    padding: 20px 15px;
    border-radius: 5px;
    .mySpread-content {
      div {
        line-height: 45px;
        font-size: 15px;
        color: #333;
        &:last-child {
          span {
            color: #999;
            margin-right: 10px;
            font-weight: normal;
          }
        }
        span {
          color: #fa591e;
          font-weight: bold;
        }
        &:nth-child(2) {
          overflow: hidden;
          div {
            float: left;
            span {
              &:nth-child(1) {
                color: #fa591e;
              }
              &:nth-child(2) {
                color: #2698e8;
                margin-left: 10px;
                cursor: pointer;
                &:hover {
                  color: blue;
                }
              }
            }
          }
        }
      }
    }
  }
  .tx {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    .txContent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 469px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #fa591e;
      .title {
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #fa591e;
        color: #fff;
        font-size: 16px;
        position: relative;
        i {
          position: absolute;
          right: 20px;
          cursor: pointer;
        }
      }
      .txImg {
        height: 500px;
        overflow: hidden;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 60px;
            height: 60px;
            margin: 9px;
            border-radius: 50%;
            box-sizing: border-box;
            border: 2px solid transparent;
            overflow: hidden;
            cursor: pointer;
            &.on {
              border-color: #fd7632;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .txBtm {
        line-height: 60px;
        height: 60px;
        border-top: 1px solid #f0f0f0;
        text-align: center;
        span {
          display: inline-block;
          width: 100px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 3px;
          color: #fff;
          cursor: pointer;
          &:nth-child(1) {
            background-color: #fd7632;
            margin-right: 8px;
          }
          &:nth-child(2) {
            background-color: #a9a9a9;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
