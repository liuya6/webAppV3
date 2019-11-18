<template>
  <div
    class="promotion"
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
        <div
          v-if="activeName === 'description'"
          class="description"
          v-html="descriptionList"
        ></div>
        <div v-else-if="activeName === 'member'" class="member">
          <div class="top">
            <span>账号：</span>
            <el-input v-model="searchValue" @change="inputChange"></el-input>
            <b @click="searchAccount(searchValue)">搜索</b>
            <b @click="[(myFd = true), getMyAgents()]">我的返点</b>
          </div>
          <div class="member-content">
            <dl>
              <dt>
                <div style="width: 110px">账号</div>
                <div style="width: 110px">昵称</div>
                <div>等级</div>
                <div>账号状态</div>
                <div>投注状态</div>
                <div style="width: 80px">下级人数</div>
                <div>注册时间</div>
                <div>最后登录时间</div>
                <div>操作</div>
              </dt>
              <dd v-for="(item, i) in allMemberList.list" :key="i">
                <div style="width: 110px">{{ item.username }}</div>
                <div style="width: 110px">{{ item.nickname }}</div>
                <div>{{ item.levelName }}</div>
                <div>{{ item.statusName }}</div>
                <div>{{ item.statusName }}</div>
                <div
                  style="width: 80px"
                  @click="memberSubordinate(item.uid, item.childCount)"
                  :class="{ blue: item.childCount > 0 }"
                >
                  {{ item.childCount }}
                </div>
                <div class="time">{{ timestampToString(item.createtime) }}</div>
                <div class="time">{{ timestampToString(item.loginTime) }}</div>
                <div>
                  <p class="blue" @click="rebateDetails(item)">返点详情</p>
                  <p
                    v-if="item.grandpaId"
                    class="blue"
                    @click="backSuperior(item.grandpaId)"
                  >
                    返回上级
                  </p>
                </div>
              </dd>
            </dl>
          </div>
          <div class="btm" v-show="allMemberList.total">
            <div class="btm-page">
              <el-pagination
                class="Page"
                background
                layout="prev, pager, next"
                :total="allMemberList.total"
                :page-size="totalMemberList.pageSize"
                @current-change="changeCurrentMembers"
                :current-page="totalMemberList.page"
              ></el-pagination>
            </div>
          </div>
          <transition name="fadeUp">
            <div class="myFd" v-show="myFd">
              <div class="myFdContent">
                <div class="myFdContent-top">
                  当前返点
                  <i class="iconfont" @click="myFd = false">&#xe60e;</i>
                </div>
                <div class="myFdContent-btm">
                  <template
                    v-if="myAgentSet && myAgentSet.validBetSet.enable == '1'"
                  >
                    <h3>{{ myAgentSet.validBetSet.name }}</h3>
                    <ul>
                      <li
                        v-for="(item, i) in myAgentSet.validBetSet.list"
                        :key="i"
                      >
                        <span>{{ item.name }}</span>
                        <span>{{ toFixeds(item[i + "ValidBetFandian"]) }}</span>
                        <span>%</span>
                      </li>
                    </ul>
                  </template>
                  <template
                    v-if="myAgentSet && myAgentSet.lossSet.enable == '1'"
                  >
                    <h3>{{ myAgentSet.lossSet.name }}</h3>
                    <ul>
                      <li v-for="(item, i) in myAgentSet.lossSet.list" :key="i">
                        <span>{{ item.name }}</span>
                        <span>{{ toFixeds(item[i + "LossFandian"]) }}</span>
                        <span>%</span>
                      </li>
                    </ul>
                  </template>
                  <template
                    v-if="myAgentSet && myAgentSet.rechargeSet.enable == '1'"
                  >
                    <h3>{{ myAgentSet.rechargeSet.name }}</h3>
                    <div
                      v-for="(item, i) in myAgentSet.rechargeSet.list"
                      :key="i"
                    >
                      <span>{{ item.name }}</span>
                      <span>{{ toFixeds(item[i + "Fandian"]) }}</span>
                      <span>%</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </transition>
          <div v-show="!allMemberList" class="noData">
            <img
              :src="commonImgs('default/noData.png')"
              alt="暂无数据"
              draggable="false"
            />
            <p>暂无记录</p>
          </div>
        </div>
        <div v-else-if="activeName === 'management'" class="management">
          <div class="tab">
            <span
              v-for="(item, i) in managementTab"
              :key="i"
              :class="{ managementActive: managementActive === item.type }"
              @click="managementTabChange(item.type)"
              >{{ item.title }}</span
            >
          </div>
          <div class="add" v-if="managementActive === 'add'">
            <div>
              <span>推广名称</span>
              <el-input
                placeholder="不超过8个字且不包含空格"
                maxlength="8"
                v-model="managementParameter['name']"
              ></el-input>
            </div>
            <template v-if="mySetList && mySetList.validBetSet.enable == '1'">
              <h3>{{ mySetList.validBetSet.name }}</h3>
              <ul>
                <li v-for="(item, i) in mySetList.validBetSet.list" :key="i">
                  <span>{{ item.name }}</span>
                  <el-input
                    type="number"
                    v-model="managementParameter[i + 'ValidBetFandian']"
                  />
                  <span>%</span>
                  <span>
                    可设置范围{{ toFixeds(item[i + "MinValidBetFandian"]) }}%-{{
                      toFixeds(item[i + "ValidBetFandian"])
                    }}%
                  </span>
                </li>
              </ul>
            </template>
            <template v-if="mySetList && mySetList.lossSet.enable == '1'">
              <h3>{{ mySetList.lossSet.name }}</h3>
              <ul>
                <li v-for="(item, i) in mySetList.lossSet.list" :key="i">
                  <span>{{ item.name }}</span>
                  <el-input
                    type="number"
                    v-model="managementParameter[i + 'LossFandian']"
                  />
                  <span>%</span>
                  <span>
                    可设置范围{{ toFixeds(item[i + "MinLossFandian"]) }}%-{{
                      toFixeds(item[i + "LossFandian"])
                    }}%
                  </span>
                </li>
              </ul>
            </template>
            <template v-if="mySetList && mySetList.rechargeSet.enable == '1'">
              <h3>{{ mySetList.rechargeSet.name }}</h3>
              <div
                v-for="(item, i) in mySetList.rechargeSet.list"
                :key="i"
                class="recharge"
              >
                <span>{{ item.name }}</span>
                <el-input
                  type="number"
                  v-model="managementParameter[i + 'Fandian']"
                />
                <span>
                  可设置范围{{ toFixeds(item[i + "MinFandian"]) }}%-{{
                    toFixeds(item[i + "Fandian"])
                  }}%
                </span>
              </div>
            </template>
            <b class="save" @click="addLink">保存</b>
          </div>
          <div v-else class="list">
            <table
              border="1"
              cellspacing="0"
              cellpadding="0"
              bordercolor="#dfdfdf"
            >
              <thead>
                <tr>
                  <td>推广链接</td>
                  <td>二维码</td>
                  <td>推广名称</td>
                  <td>生成时间</td>
                  <td>注册人数</td>
                  <td>操作</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in managementList" :key="i">
                  <td>
                    {{
                      myUrl + "/about?index=register&promotionCode=" + item.code
                    }}
                    <p
                      class="event"
                      v-clipboard:copy="
                        myUrl +
                          '/about?index=register&promotionCode=' +
                          item.code
                      "
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                    >
                      复制
                    </p>
                  </td>
                  <td>
                    <my-QrCode
                      :promotionCode="item.code"
                      :myQrUrl="
                        myUrl +
                          '/about?index=register&promotionCode=' +
                          item.code
                      "
                    ></my-QrCode>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ timestampToString(item.createtime) }}</td>
                  <td>{{ item.memberRegisterCount }}</td>
                  <td>
                    <span class="event" @click="getLinkDetails(item.id)"
                      >返点详情</span
                    >
                    <span class="event" @click="toDeleteLinks(item.id)"
                      >删除</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="btm" v-show="managementTotal">
              <div class="btm-page">
                <el-pagination
                  class="Page"
                  background
                  layout="prev, pager, next"
                  :total="managementTotal"
                  :page-size="managementListParameter.pageSize"
                  @current-change="currentManagement"
                  :current-page="managementListParameter.page"
                ></el-pagination>
              </div>
            </div>
            <div v-show="!managementList" class="noData">
              <img
                :src="commonImgs('default/noData.png')"
                alt="暂无数据"
                draggable="false"
              />
              <p>暂无记录</p>
            </div>
          </div>
          <transition>
            <div class="managementDetail" v-show="managementDetailShow">
              <div class="managementDetailBox">
                <h1>
                  返点详情
                  <i class="iconfont" @click="managementDetailShow = false"
                    >&#xe60e;</i
                  >
                </h1>
                <h3>推广名称</h3>
                <div>
                  <el-input
                    v-model="parameter.name"
                    maxlength="8"
                    placeholder="不超过8个字且不包含空格"
                  ></el-input>
                </div>
                <template
                  v-if="
                    managementDetails &&
                      managementDetails.validBetSet.enable == '1'
                  "
                >
                  <h3>{{ managementDetails.validBetSet.name }}</h3>
                  <ul>
                    <li
                      v-for="(item, i) in managementDetails.validBetSet.list"
                      :key="i"
                    >
                      <span>{{ item.name }}</span>
                      <input
                        type="number"
                        v-model="parameter[i + 'ValidBetFandian']"
                      />
                      <span>%</span>
                      <span>
                        可设置范围{{
                          toFixeds(item[i + "MinValidBetFandian"])
                        }}-{{ toFixeds(item[i + "MaxValidBetFandian"]) }}%
                      </span>
                    </li>
                  </ul>
                </template>
                <template
                  v-if="
                    managementDetails && managementDetails.lossSet.enable == '1'
                  "
                >
                  <h3>{{ managementDetails.lossSet.name }}</h3>
                  <ul>
                    <li
                      v-for="(item, i) in managementDetails.lossSet.list"
                      :key="i"
                    >
                      <span>{{ item.name }}</span>
                      <input
                        type="number"
                        v-model="parameter[i + 'LossFandian']"
                      />
                      <span>%</span>
                      <span>
                        可设置范围{{ toFixeds(item[i + "MinLossFandian"]) }}-{{
                          toFixeds(item[i + "MaxLossFandian"])
                        }}%
                      </span>
                    </li>
                  </ul>
                </template>
                <template
                  v-if="
                    managementDetails &&
                      managementDetails.rechargeSet.enable == '1'
                  "
                >
                  <h3>{{ managementDetails.rechargeSet.name }}</h3>
                  <div
                    v-for="(item, i) in managementDetails.rechargeSet.list"
                    :key="i"
                    class="recharge"
                  >
                    <span>{{ item.name }}</span>
                    <input type="number" v-model="parameter[i + 'Fandian']" />
                    <span>
                      可设置范围{{ toFixeds(item[i + "MinFandian"]) }}-{{
                        toFixeds(item[i + "MaxFandian"])
                      }}%
                    </span>
                  </div>
                </template>
                <div class="determine" @click="determine">确定</div>
              </div>
            </div>
          </transition>
        </div>
        <div v-else-if="activeName === 'teamReport'" class="teamReport">
          <div class="header">
            <div class="category">
              <span>账号:</span>
              <el-input
                placeholder="请输入会员账号"
                v-model="teamSearchMember"
              ></el-input>
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
              ></el-date-picker>
            </div>
            <span class="search" @click="searchTeamMember">搜索</span>
          </div>
          <div class="teamReportContent">
            <ul>
              <li v-for="(item, i) in teamReportList" :key="i">
                <p>{{ teamReportArr[item.type] | 0 }}</p>
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
          <div class="tips">
            <h3>温馨提示：</h3>
            <p>
              1.推广佣金（下级）和推广佣金（自身）统计该账号自己获得的佣金；
            </p>
            <p>2.下级人数（即时）统计该账号的所有下级人数，不含该账号；</p>
            <p>3.其余栏位为查询账号与其所有下级的数据之和；</p>
            <p>4.不统计升级日期之前数据；</p>
          </div>
        </div>
        <div
          v-else-if="activeName === 'subordinateReport'"
          class="subordinateReport"
        >
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
            <span class="search" @click="searchUnderReport">搜索</span>
          </div>
          <dl>
            <dt>
              <div>账号</div>
              <div>等级</div>
              <div>投注金额</div>
              <div>中奖金额</div>
              <!-- <div>所得优惠金额</div> -->
              <div>团队佣金</div>
              <div>投注人数</div>
              <div>充值人数</div>
              <div>盈利</div>
              <div>操作</div>
            </dt>
            <dd v-for="(item, i) in underReportList" :key="i">
              <div>{{ item.nickname }}</div>
              <div>{{ item.levelName }}</div>
              <div>{{ item.betAmount }}</div>
              <div>{{ item.winAmount }}</div>
              <!-- <div>{{item.giveAmount}}</div> -->
              <div>{{ item.teamCommissionAmount }}</div>
              <div>{{ item.betCount }}</div>
              <div>{{ item.rechargeCount }}</div>
              <div :class="item.teamWinAmount > 0 ? 'profit' : 'loss'">
                {{ item.teamWinAmount }}
              </div>
              <div>
                <span
                  @click="viewSubordinate(item.grandpaId)"
                  v-if="item.hasPrevPage"
                  class="blue"
                  >上级</span
                >
                <span v-else-if="!item.hasPrevPage && !item.hasNextPage"
                  >--</span
                >
                <span
                  @click="viewSubordinate(item.uid)"
                  v-if="item.hasNextPage"
                  class="blue"
                  >下级</span
                >
              </div>
            </dd>
          </dl>
          <div class="btm" v-show="totalUnderMembers">
            <div class="btm-page">
              <el-pagination
                class="Page"
                background
                layout="prev, pager, next"
                :total="totalUnderMembers"
                :page-size="underParameter.pageSize"
                @current-change="changeCurrentUnderReport"
                :current-page="underParameter.page"
              ></el-pagination>
            </div>
          </div>
          <div v-show="!underReportList" class="noData">
            <img
              :src="commonImgs('default/noData.png')"
              alt="暂无数据"
              draggable="false"
            />
            <p>暂无记录</p>
          </div>
        </div>
        <div
          v-else-if="activeName === 'transactionDetails'"
          class="transactionDetails"
        >
          <div class="tab">
            <span
              class="tabSpan"
              v-for="(item, i) in transactionDetailsTab"
              :key="i"
              :class="{
                transactionDetailsActive: transactionDetailsActive === item.type
              }"
              @click="SwitchingRecords(item.type)"
              >{{ item.title }}</span
            >
            <div class="date">
              <span class="dataSpan">选择日期</span>
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
          </div>
          <div v-if="transactionDetailsActive === 'betting'" class="betting">
            <div class="betting-top">
              <ul>
                <li>类型：</li>
                <li
                  v-for="(item, i) in gameRecordList"
                  @click="
                    changeClassify(item.name, item.classify, item.typeList)
                  "
                  :class="{ active: item.classify == teamParameter.classify }"
                  :key="i"
                >
                  {{ item.name }}
                  <span>|</span>
                </li>
              </ul>
              <ul>
                <li>平台：</li>
                <li
                  v-for="(item, i) in childTypeList"
                  :key="i"
                  @click="changeTypekey(item.typeKey)"
                  :class="{ active: item.typeKey == teamParameter.typeKey }"
                >
                  {{ item.name }}
                  <span>|</span>
                </li>
              </ul>
              <div>
                <span>账号：</span>
                <el-input
                  placeholder="请输入会员账号"
                  v-model="teamReportAccount"
                ></el-input>
                <b @click="teamReportSearch">搜索</b>
              </div>
            </div>
            <dl>
              <dt>
                <div>用户名</div>
                <div class="long">订单号</div>
                <div>有效下注</div>
                <div>盈亏</div>
                <div>游戏类型</div>
              </dt>
              <dd v-for="(item, i) in betTeamRecordArr" :key="i">
                <div>{{ item.username }}</div>
                <div class="long">{{ item.round }}</div>
                <div>{{ item.cellScore }}</div>
                <div>{{ item.win }}</div>
                <div>{{ item.title }}</div>
              </dd>
            </dl>
            <div class="btm" v-if="betTeamRecordTotal">
              <div class="btm-page">
                <el-pagination
                  class="Page"
                  background
                  layout="prev, pager, next"
                  :total="betTeamRecordTotal"
                  :page-size="teamParameter.pageSize"
                  @current-change="changeTeamParameter"
                  :current-page="teamParameter.page"
                ></el-pagination>
              </div>
            </div>
          </div>

          <div v-else class="contacts">
            <div class="header">
              <div class="category">
                <span>账号:</span>
                <el-input
                  placeholder="请输入会员账号"
                  v-model="teamLogAccount"
                ></el-input>
              </div>
              <!-- <div class="date">
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
              </div>-->
              <span class="search" @click="teamLogSearch">搜索</span>
            </div>
            <dl>
              <dt>
                <div>用户名</div>
                <div>账目类型</div>
                <div>账目信息</div>
                <div>时间</div>
                <div>变动金额</div>
                <div>变动后金额</div>
              </dt>
              <dd v-for="(item, i) in teamLogArr" :key="i">
                <div>{{ item.username }}</div>
                <el-tooltip :content="item.billTitle" placement="top">
                  <div>{{ item.billTitle }}</div>
                </el-tooltip>
                <el-tooltip :content="item.info" placement="top">
                  <div>{{ item.info }}</div>
                </el-tooltip>
                <div>{{ timestampToString(item.actionTime) }}</div>
                <div>{{ item.coin }}</div>
                <div>{{ item.userCoin }}</div>
              </dd>
            </dl>
            <div class="btm" v-show="teamLogTotal">
              <div class="btm-page">
                <el-pagination
                  class="Page"
                  background
                  layout="prev, pager, next"
                  :total="teamLogTotal"
                  :page-size="teamLogParameter.pageSize"
                  @current-change="changeTeamLog"
                  :current-page="teamLogParameter.page"
                ></el-pagination>
              </div>
            </div>
            <div v-show="!teamLogArr" class="noData">
              <img
                :src="commonImgs('default/noData.png')"
                alt="暂无数据"
                draggable="false"
              />
              <p>暂无记录</p>
            </div>
          </div>
          <div
            v-if="
              transactionDetailsActive == 'betting' && !betTeamRecordArr.length
            "
            class="noData"
          >
            <img
              :src="commonImgs('default/noData.png')"
              alt="暂无数据"
              draggable="false"
            />
            <p>暂无记录</p>
          </div>
          <div
            v-else-if="
              transactionDetailsActive == 'contacts' && !teamLogArr.length
            "
            class="noData"
          >
            <img
              :src="commonImgs('default/noData.png')"
              alt="暂无数据"
              draggable="false"
            />
            <p>暂无记录</p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  description,
  getSetList,
  addLinks,
  getLinks,
  getLinksList,
  getMySet,
  deleteLinks,
  teamReport,
  agentReport,
  betRecordList,
  teamLog,
  modifyLinks,
  getMemberList
} from "../../api";
import { mapGetters, mapActions } from "vuex";
const TitleList = [
  {
    title: "团队说明",
    typeKey: "description"
  },
  {
    title: "团队成员",
    typeKey: "member"
  },
  {
    title: "推广管理",
    typeKey: "management"
  },
  {
    title: "团队报表",
    typeKey: "teamReport"
  },
  {
    title: "下级报表",
    typeKey: "subordinateReport"
  },
  {
    title: "交易明细",
    typeKey: "transactionDetails"
  }
];
export default {
  name: "Promotion",
  data() {
    return {
      saveTabName: "",
      TitleList,
      activeName: "description",
      loading: false,
      myUrl: window.location.origin,
      // 团队说明 -----------------------------------------------------
      descriptionList: "",
      // 推广管理 -----------------------------------------------------
      // 团队成员 -----------------------------------------------------
      myFd: false,
      myAgentSet: "",
      allMemberList: "",
      initialMembers: "",
      searchValue: "",
      totalMemberList: {
        pageSize: 11,
        page: 1,
        uid: "",
        username: ""
      },
      mySetList: "",
      managementList: "",
      managementListParameter: {
        page: 1,
        pageSize: 5
      },
      managementTotal: "",
      managementDetails: "",
      parameter: {
        id: "",
        name: ""
      },
      managementTab: [
        {
          type: "add",
          title: "添加链接"
        },
        {
          type: "list",
          title: "推广列表"
        }
      ],
      managementActive: "add",
      managementDetailShow: false,
      managementParameter: {
        name: ""
      },
      // 团队报表 -----------------------------------------------------
      teamReportList: [
        { title: "投注金额", type: "betAmount" },
        { title: "中奖金额", type: "winAmount" },
        // { title: "所得优惠金额", type: "giveAmount" },
        { title: "团队佣金", type: "teamCommissionAmount" },
        { title: "团队盈利", type: "teamWinAmount" },
        { title: "投注人数", type: "betCount" },
        { title: "充值人数", type: "rechargeCount" },
        { title: "注册人数", type: "registerCount" },
        { title: "下级人数（即时）", type: "childCount" },
        { title: "充值金额", type: "rechargeAmount" },
        { title: "提现金额", type: "cashAmount" },
        { title: "推广佣金（自身）", type: "selfPromotionCommission" },
        { title: "推广佣金（下级）", type: "childPromotionCommission" }
      ],
      teamSearchMember: "",
      teamReportArr: [],
      // 下级报表 -----------------------------------------------------
      underReportList: [],
      totalUnderMembers: 0,
      underParameter: {
        page: 1,
        pageSize: 11
      },
      showAgentBack: false,
      AgentBackArr: [],
      noData: false,
      startTime: "",
      endTime: "",
      // 交易明细 -----------------------------------------------------
      transactionDetailsTab: [
        {
          title: "团队投注记录",
          type: "betting"
        },
        {
          title: "团队往来记录",
          type: "contacts"
        }
      ],
      betTeamRecordArr: [],
      betTeamRecordTotal: "",
      teamReportAccount: "",
      teamParameter: {
        startTime: "",
        endTime: "",
        classify: "",
        username: "",
        typeKey: "",
        page: 1,
        pageSize: 9
      },
      teamLogArr: [],
      teamLogTotal: "",
      teamLogParameter: {
        username: "",
        startTime: "",
        endTime: "",
        page: 1,
        pageSize: 10
      },
      teamLogAccount: "",
      transactionDetailsActive: "betting",
      ifFirstContacts: true,
      // 日期 --------------------------------------------------------
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
      ],
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
      }
    };
  },
  created() {
    this.descriptions();
    this.toGetMemberList();
    console.log(this.gameRecordList, "this.gameRecordList111111");
    if (this.gameRecordList) {
      this.teamParameter.classify = this.gameRecordList[0].classify;
      this.teamParameter.typeKey = this.gameRecordList[0].typeList[0].typeKey;
    }
  },
  computed: {
    ...mapGetters(["gameRecordList"]),
    childTypeList() {
      let list;
      if (this.gameRecordList) {
        this.gameRecordList.forEach(item => {
          console.log(
            item.classify,
            this.teamParameter.classify,
            " this.teamParameter.classify"
          );
          if (item.classify == this.teamParameter.classify) {
            list = item.typeList;
            console.log(list, "list");
          }
        });
      }
      return list;
    }
  },
  methods: {
    initializationTime() {
      return [
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
      ];
    },
    handleClick(tab) {
      // console.log(tab.name,'tab.name');
      if (tab.name == this.saveTabName) return;
      this.saveTabName = tab.name;
      if (tab.name === "member") {
      } else if (tab.name === "management") {
        if (this.managementActive === "add") {
          if (this.mySetList) return;
          this.getSetLists();
        } else {
          if (this.managementList.length) return;
          // this.managementList = "";
          this.getLinksLists();
        }
      } else if (tab.name === "teamReport") {
        // if (this.teamReportArr.betAmount>=0) return;
        this.dataVal = this.initializationTime();
        console.log(this.searchValue, "searchValue");
        this.teamSearchMember = "";
        console.log(this.searchValue, "searchValue");
        this.getInitialTime();
        this.toTeamReport({
          startTime: this.dataInitial[0],
          endTime: this.dataInitial[1]
        });
      } else if (tab.name === "subordinateReport") {
        // if (this.underReportList.length) return;
        this.dataVal = this.initializationTime();
        // console.log(this.startTime, this.endTime, "this.startTime");
        this.startTime = this.dataInitial[0];
        this.endTime = this.dataInitial[1];
        this.toAgentReport();
      } else if (tab.name === "transactionDetails") {
        if (this.teamLogAccount) {
          this.teamLogParameter.username = "";
          this.teamLogAccount = "";
        }
        if (this.teamReportAccount) {
          this.teamParameter.username = "";
          this.teamReportAccount = "";
        }
        this.dataVal = this.initializationTime();
        if (!this.teamParameter.startTime) {
          this.teamParameter.startTime = this.dataInitial[0];
          this.teamParameter.endTime = this.dataInitial[1];
        }
        this.toBetRecordList();
        this.toTeamLog();
      }
    },

    inputChange(e) {
      if (!e) {
        this.allMemberList = this.initialMembers;
      }
    },
    changeData(val) {
      this.startTime = val[0];
      this.endTime = val[1];
      console.log(val, this.startTime, this.endTime, "changeData");
    },
    searchUnderReport() {
      this.underParameter.page = 1;
      this.toAgentReport();
    },
    allClose() {
      this.myFd = false;
    },
    // 团队说明 -----------------------------------------------------
    descriptions() {
      this.loading = true;
      description().then(res => {
        this.loading = false;
        if (res.status) {
          this.descriptionList = res.data[0].content;
        }
      });
    },
    // 团队成员 -----------------------------------------------------
    getMyAgents() {
      this.loading = true;
      getMySet().then(res => {
        this.loading = false;
        if (res.status) {
          this.myAgentSet = res.data;
          console.log(this.myAgentSet, "this.myAgentSet");
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    rebateDetails(list) {
      this.myFd = true;
      this.myAgentSet = list;
    },
    toGetMemberList() {
      this.loading = true;
      getMemberList(this.totalMemberList).then(res => {
        this.loading = false;
        if (res.status) {
          this.allMemberList = res.data;
          this.initialMembers = res.data;
          console.log(this.allMemberList, "this.allMemberList");
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    searchAccount(v) {
      this.loading = true;
      this.totalMemberList = { username: v, page: 1, pageSize: 11, uid: "" };
      getMemberList(this.totalMemberList).then(res => {
        this.loading = false;
        if (res.status) {
          this.allMemberList = res.data;
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    memberSubordinate(uid, c) {
      if (c < 1) return;
      this.totalMemberList.uid = uid;
      this.totalMemberList.page = 1;
      this.toGetMemberList();
    },
    backSuperior(grandpaId) {
      this.totalMemberList.uid = grandpaId;
      this.totalMemberList.page = 1;
      this.totalMemberList.username = this.searchValue;
      this.toGetMemberList();
    },
    changeCurrentMembers(page) {
      console.log(page, "pagepage");
      this.totalMemberList.page = page;
      this.toGetMemberList();
    },
    // 推广管理 -----------------------------------------------------
    getSetLists() {
      this.loading = true;
      getSetList().then(res => {
        this.loading = false;
        if (res.status) {
          this.mySetList = res.data;
          console.log(this.mySetList, "addList");
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    //推广列表
    getLinksLists() {
      this.loading = true;
      getLinksList(this.managementListParameter).then(res => {
        this.loading = false;
        if (res.status) {
          this.managementList = res.data.list;
          this.managementTotal = res.data.total;
          console.log(this.managementList, "this.managementList");
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    currentManagement(page) {
      console.log(page, "pagepage0");
      this.managementListParameter.page = page;
      this.getLinksLists();
    },
    getLinkDetails(id) {
      this.loading = true;
      getLinks({ id }).then(res => {
        this.loading = false;
        if (res.status) {
          this.managementDetailShow = true;
          this.managementDetails = res.data;
          console.log(this.managementDetails, "this.managementDetails");
          this.initParameter();
          this.parameter.id = id;
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    initParameter() {
      this.$nextTick(() => {
        this.parameter.name = this.managementDetails.name;
        if (this.managementDetails.validBetSet.enable == "1") {
          let list = this.managementDetails.validBetSet.list;
          for (let i in list) {
            this.parameter[i + "ValidBetFandian"] =
              list[i][i + "ValidBetFandian"];
          }
        }
        if (this.managementDetails.lossSet.enable == "1") {
          let list = this.managementDetails.lossSet.list;
          for (let i in list) {
            this.parameter[i + "LossFandian"] = list[i][i + "LossFandian"];
          }
        }
        if (this.managementDetails.rechargeSet.enable == "1") {
          let list = this.managementDetails.rechargeSet.list;
          for (let i in list) {
            this.parameter[i + "Fandian"] = list[i][i + "Fandian"];
          }
        }
        console.log(this.parameter, "parameter");
      });
    },
    determine() {
      if (!this.parameter.name) {
        return this.$message({
          type: "error",
          showClose: true,
          duration: 1000,
          message: "请输入推广名称"
        });
      } else {
        if (/\s/g.test(this.parameter.name)) {
          return this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: "推广名称不能包括空格"
          });
        }
      }
      console.log(this.parameter);
      if (this.managementDetails.validBetSet.enable == "1") {
        let validBetSetList = this.managementDetails.validBetSet.list;
        for (let i in validBetSetList) {
          if (!this.parameter[i + "ValidBetFandian"]) {
            return this.$message({
              type: "error",
              showClose: true,
              duration: 1000,
              message:
                "请填写" +
                validBetSetList[i].name +
                this.managementDetails.validBetSet.name
            });
          } else {
            if (
              this.parameter[i + "ValidBetFandian"] <
                validBetSetList[i][i + "MinValidBetFandian"] ||
              this.parameter[i + "ValidBetFandian"] >
                validBetSetList[i][i + "MaxValidBetFandian"]
            ) {
              return this.$message({
                type: "error",
                showClose: true,
                duration: 1000,
                message:
                  validBetSetList[i].name +
                  this.managementDetails.validBetSet.name +
                  "范围在" +
                  this.toFixeds(validBetSetList[i][i + "MinValidBetFandian"]) +
                  "%~" +
                  this.toFixeds(validBetSetList[i][i + "MaxValidBetFandian"]) +
                  "%之间"
              });
            }
          }
        }
      }
      if (this.managementDetails.lossSet.enable == "1") {
        let lossSetList = this.managementDetails.lossSet.list;
        for (let i in lossSetList) {
          if (!this.parameter[i + "LossFandian"]) {
            return this.$message({
              type: "error",
              showClose: true,
              duration: 1000,
              message:
                "请填写" +
                lossSetList[i].name +
                this.managementDetails.lossSet.name
            });
          } else {
            if (
              this.parameter[i + "LossFandian"] <
                lossSetList[i][i + "MinLossFandian"] ||
              this.parameter[i + "LossFandian"] >
                lossSetList[i][i + "MaxLossFandian"]
            ) {
              return this.$message({
                type: "error",
                showClose: true,
                duration: 1000,
                message:
                  lossSetList[i].name +
                  this.managementDetails.lossSet.name +
                  "范围在" +
                  this.toFixeds(lossSetList[i][i + "MinLossFandian"]) +
                  "%~" +
                  this.toFixeds(lossSetList[i][i + "MaxLossFandian"]) +
                  "%之间"
              });
            }
          }
        }
      }
      if (this.managementDetails.rechargeSet.enable == "1") {
        let rechargeSetList = this.managementDetails.rechargeSet.list;
        for (let i in rechargeSetList) {
          if (!this.parameter[i + "Fandian"]) {
            return this.$message({
              type: "error",
              showClose: true,
              duration: 1000,
              message:
                "请填写" +
                rechargeSetList[i].name +
                this.managementDetails.rechargeSet.name
            });
          } else {
            if (
              this.parameter[i + "Fandian"] <
                rechargeSetList[i][i + "MinFandian"] ||
              this.parameter[i + "Fandian"] >
                rechargeSetList[i][i + "MaxFandian"]
            ) {
              return this.$message({
                type: "error",
                showClose: true,
                duration: 1000,
                message:
                  rechargeSetList[i].name +
                  this.managementDetails.rechargeSet.name +
                  "范围在" +
                  this.toFixeds(rechargeSetList[i][i + "MinFandian"]) +
                  "%~" +
                  this.toFixeds(rechargeSetList[i][i + "MaxFandian"]) +
                  "%之间"
              });
            }
          }
        }
      }
      modifyLinks(this.parameter).then(res => {
        this.$message.success({
          showClse: true,
          duration: 1000,
          message: res.msg
        });
      });
      this.managementDetailShow = false;
    },
    toDeleteLinks(id) {
      this.$msgbox
        .confirm("确定删除此链接吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          console.log(id, "id");
          this.loading = true;
          deleteLinks({ id }).then(res => {
            this.loading = false;
            if (res.status) {
              this.getLinksLists();
              this.$message.success({
                showClose: true,
                duration: 1000,
                message: res.msg
              });
            } else {
              this.$message({
                type: "error",
                showClose: true,
                duration: 1000,
                message: res.msg
              });
            }
          });
        })
        .catch(res => {
          console.log(res, "点了取消");
        });
    },
    //团队报表
    toTeamReport(e) {
      this.loading = true;
      teamReport(e).then(res => {
        this.loading = false;
        if (res.status) {
          console.log(res.data, "res.data");
          this.teamReportArr = res.data;
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    getInitialTime() {
      if (!this.startTime) {
        this.startTime = this.dataInitial[0];
        this.endTime = this.dataInitial[1];
      }
    },
    searchTeamMember() {
      // this.getInitialTime();
      console.log(
        this.dataInitial,
        "dataInitial",
        this.startTime,
        "startTime",
        this.endTime,
        "endTime"
      );
      this.toTeamReport({
        username: this.teamSearchMember,
        startTime: this.startTime,
        endTime: this.endTime
      });
    },
    //下级报表
    toAgentReport() {
      this.loading = true;
      console.log(
        this.underParameter.startTime,
        "this.underParameter.startTime"
      );
      if (!this.underParameter.startTime) {
        this.underParameter.startTime = this.dataInitial[0];
        this.underParameter.endTime = this.dataInitial[1];
      } else {
        this.underParameter.startTime = this.startTime;
        this.underParameter.endTime = this.endTime;
      }
      agentReport(this.underParameter).then(res => {
        this.loading = false;
        console.log(res, "agentReport");
        if (res.status) {
          this.underReportList = res.data.list;
          this.totalUnderMembers = res.data.total;
        }
      });
    },
    viewSubordinate(uid) {
      this.underParameter.uid = uid;
      this.underParameter.page = 1;
      this.toAgentReport();
      this.AgentBackArr.push(uid);
      if (!this.showAgentBack) {
        this.showAgentBack = true;
      }
    },
    returnSuperior() {
      this.AgentBackArr.pop();
      let i = this.AgentBackArr.length;
      if (i > 0) {
        this.underParameter.uid = this.AgentBackArr[i - 1];
        this.toAgentReport();
      } else {
        this.underParameter.uid = "";
        this.showAgentBack = false;
        this.toAgentReport();
      }
    },
    changeCurrentUnderReport(page) {
      console.log(page, "pagepage1");
      this.underParameter.page = page;
      this.toAgentReport();
    },
    //团队投注记录
    toBetRecordList() {
      this.loading = true;
      if (!this.startTime) {
        this.teamParameter.startTime = this.dataInitial[0];
        this.teamParameter.endTime = this.dataInitial[1];
      } else {
        this.teamParameter.startTime = this.startTime;
        this.teamParameter.endTime = this.endTime;
      }
      betRecordList(this.teamParameter).then(res => {
        this.loading = false;
        if (res.status) {
          console.log(res.data, "betRecordList");
          this.betTeamRecordArr = res.data.list;
          this.betTeamRecordTotal = res.data.total;
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    changeTeamParameter(page) {
      this.teamParameter.page = page;
      this.toBetRecordList();
    },
    SwitchingRecords(type) {
      this.transactionDetailsActive = type;
      console.log(type, this.ifFirstContacts, "ifFirstContacts");
      console.log(this.teamParameter.page, "this.teamParameter.page");
      console.log(this.teamLogParameter.page, "this.teamLogParameter.page");
      if ((type == "contacts") & this.ifFirstContacts) {
        this.teamLogParameter.username = "";
        this.toTeamLog();
        this.ifFirstContacts = false;
      }
      if (type == "betting") {
        this.teamParameter.username = "";
        this.teamParameter.page = 1;
        this.toBetRecordList();
      }
    },
    changeClassify(name, classify, list) {
      console.log(classify, "classify", list, "list");
      this.typeTitle = name;
      this.teamParameter.classify = classify;
      this.teamParameter.typeKey = list[0].typeKey;
      console.log(this.teamParameter.typeKey, "this.teamParameter.typeKey");
    },
    changeTypekey(typeKey) {
      this.teamParameter.typeKey = typeKey;
    },
    teamReportSearch() {
      this.teamParameter.username = this.teamReportAccount;
      this.teamParameter.page = 1;
      this.toBetRecordList();
    },
    //团队往来记录
    toTeamLog() {
      this.loading = true;
      if (!this.startTime) {
        this.teamLogParameter.startTime = this.dataInitial[0];
        this.teamLogParameter.endTime = this.dataInitial[1];
      } else {
        this.teamLogParameter.startTime = this.startTime;
        this.teamLogParameter.endTime = this.endTime;
      }
      console.log(this.teamLogParameter, "this.teamLogParameter");
      teamLog(this.teamLogParameter).then(res => {
        this.loading = false;
        if (res.status) {
          console.log(res.data, "teamLog");
          this.teamLogArr = res.data.list;
          this.teamLogTotal = res.data.total;
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    changeTeamLog(page) {
      this.teamLogParameter.page = page;
      this.toTeamLog();
    },
    teamLogSearch() {
      console.log(this.teamLogParameter.page, "this.teamLogParameter.page");
      this.teamLogParameter.username = this.teamLogAccount;
      this.teamLogParameter.page = 1;
      this.toTeamLog();
      console.log(this.teamLogParameter.page, "this.teamLogParameter.page");
    },
    managementTabChange(type) {
      if (this.managementActive === type) {
        return false;
      }
      this.managementActive = type;
      if (type === "add") {
        if (this.mySetList) return;
        this.getSetLists();
      } else {
        if (this.managementList.length) return;
        // this.managementList = "";
        this.getLinksLists();
      }
    },
    addLink() {
      if (!this.managementParameter.name) {
        return this.$message.error({
          showClose: true,
          message: "请输入推广名称"
        });
      }
      if (this.managementParameter.name.indexOf(" ") >= 0) {
        return this.$message.error({
          showClose: true,
          message: "推广名称不能包含空格"
        });
      }
      if (this.mySetList.validBetSet.enable == "1") {
        let validBetSetList = this.mySetList.validBetSet.list;
        for (let i in validBetSetList) {
          console.log(validBetSetList[i], i);
          if (!this.managementParameter[i + "ValidBetFandian"]) {
            return this.$message.error({
              showClose: true,
              message:
                "请填写" +
                validBetSetList[i].name +
                this.mySetList.validBetSet.name
            });
          } else {
            if (
              this.managementParameter[i + "ValidBetFandian"] <
                validBetSetList[i][i + "MinValidBetFandian"] ||
              this.managementParameter[i + "ValidBetFandian"] >
                validBetSetList[i][i + "ValidBetFandian"]
            ) {
              return this.$message.error({
                showClose: true,
                message:
                  validBetSetList[i].name +
                  this.mySetList.validBetSet.name +
                  "范围在" +
                  this.toFixeds(validBetSetList[i][i + "MinValidBetFandian"]) +
                  "%~" +
                  this.toFixeds(validBetSetList[i][i + "ValidBetFandian"]) +
                  "之间"
              });
            }
          }
        }
      }
      if (this.mySetList.lossSet.enable == "1") {
        let lossSetList = this.mySetList.lossSet.list;
        for (let i in lossSetList) {
          console.log(lossSetList[i], i);
          if (!this.managementParameter[i + "LossFandian"]) {
            return this.$message.error({
              showClose: true,
              message:
                "请填写" + lossSetList[i].name + this.mySetList.lossSet.name
            });
          } else {
            if (
              this.managementParameter[i + "LossFandian"] <
                lossSetList[i][i + "MinLossFandian"] ||
              this.managementParameter[i + "LossFandian"] >
                lossSetList[i][i + "LossFandian"]
            ) {
              return this.$message.error({
                showClose: true,
                message:
                  lossSetList[i].name +
                  this.mySetList.lossSet.name +
                  "范围在" +
                  this.toFixeds(lossSetList[i][i + "MinLossFandian"]) +
                  "%~" +
                  this.toFixeds(lossSetList[i][i + "LossFandian"]) +
                  "之间"
              });
            }
          }
        }
      }
      if (this.mySetList.rechargeSet.enable == "1") {
        let rechargeSetList = this.mySetList.rechargeSet.list;
        for (let i in rechargeSetList) {
          console.log(rechargeSetList[i], i);
          if (!this.managementParameter[i + "Fandian"]) {
            return this.$message.error({
              showClose: true,
              message:
                "请填写" +
                rechargeSetList[i].name +
                this.mySetList.rechargeSet.name
            });
          } else {
            if (
              this.managementParameter[i + "Fandian"] <
                rechargeSetList[i][i + "MinFandian"] ||
              this.managementParameter[i + "Fandian"] >
                rechargeSetList[i][i + "Fandian"]
            ) {
              return this.$message.error({
                showClose: true,
                message:
                  rechargeSetList[i].name +
                  this.mySetList.rechargeSet.name +
                  "范围在" +
                  this.toFixeds(rechargeSetList[i][i + "MinFandian"]) +
                  "%~" +
                  this.toFixeds(rechargeSetList[i][i + "Fandian"]) +
                  "之间"
              });
            }
          }
        }
      }
      addLinks(this.managementParameter).then(res => {
        console.log(res);
        if (res.status) {
          this.$message.success({
            showClse: true,
            message: res.msg
          });
          this.managementActive = "list";
          this.managementList = "";
          this.getLinksLists();
        } else {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1000,
            message: res.msg
          });
        }
      });
    },
    onCopy() {
      this.$message({
        type: "success",
        showClose: true,
        duration: 1000,
        message: "复制成功"
      });
    },
    onError() {
      this.$message({
        type: "error",
        showClose: true,
        duration: 1000,
        message: "复制失败"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.promotion {
  display: flex;
  flex: 1;
  .member {
    height: 100%;
    .top {
      height: 60px;
      display: flex;
      align-items: center;
      span {
        margin-left: 40px;
      }
      b {
        font-weight: normal;
        display: inline-block;
        width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        color: #fff;
        background-color: #fea24d;
        text-align: center;
        margin-left: 28px;
        cursor: pointer;
      }
    }
    .member-content {
      dl {
        dt {
          background-image: linear-gradient(#fdf7ea, #fdf7ea),
            linear-gradient(#f0f0f0, #f0f0f0), linear-gradient(#fafafa, #fafafa);
          display: flex;
          div {
            flex: 0 0 auto;
            height: 42px;
            line-height: 42px;
            color: #666;
            text-align: center;
            // width: 100px;
            width: 100px;
          }
        }
        dd {
          display: flex;
          div {
            flex: 0 0 auto;
            height: 44px;
            line-height: 44px;
            color: #666;
            text-align: center;
            // width: 100px;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            // word-wrap: break-word;
            // word-break: break-all;
            // &:last-child,&:nth-child(n-1){
            //   width: 120px;
            // }
            p {
              height: 22px;
              line-height: 22px;
            }
          }
          .time {
            line-height: unset;
            padding-top: 4px;
          }
        }
        .blue {
          color: blue;
          cursor: pointer;
        }
      }
    }
    .myFd {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      .myFdContent {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        background-color: #fff;
        .myFdContent-top {
          border-bottom: 1px solid #f0f0f0;
          line-height: 60px;
          font-weight: bold;
          color: #333;
          padding-left: 30px;
          font-size: 20px;
          i {
            float: right;
            margin-right: 20px;
            cursor: pointer;
            color: #999;
            &:hover {
              color: #fea24d;
            }
          }
        }
        .myFdContent-btm {
          padding: 10px 30px 30px 30px;
          h3 {
            line-height: 40px;
            background-color: #fdf7ea;
            padding-left: 10px;
            color: #666;
            margin-bottom: 10px;
            margin-top: 10px;
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              flex: 0 0 auto;
              width: 50%;
              height: 40px;
              border-top: 1px solid #f0f0f0;
              border-left: 1px solid #f0f0f0;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              &:nth-of-type(2n) {
                border-right: 1px solid #f0f0f0;
              }
              &:last-child {
                border-bottom: 1px solid #f0f0f0;
                border-right: 1px solid #f0f0f0;
              }
              &:nth-last-child(2) {
                border-bottom: 1px solid #f0f0f0;
              }
              span {
                &:nth-child(1) {
                  display: inline-block;
                  width: 76px;
                  height: 39px;
                  line-height: 40px;
                  background-color: #fdf7ea;
                  text-align: center;
                }
                &:nth-child(2) {
                  border: 1px solid #f0f0f0;
                  padding: 5px 10px;
                  margin-left: 20px;
                }
                &:nth-child(3) {
                  margin-left: 10px;
                }
              }
            }
          }
          div {
            border: 1px solid #f0f0f0;
            span {
              &:nth-child(1) {
                display: inline-block;
                width: 76px;
                height: 39px;
                line-height: 40px;
                background-color: #fdf7ea;
                text-align: center;
              }
              &:nth-child(2) {
                border: 1px solid #f0f0f0;
                padding: 5px 10px;
                margin-left: 20px;
              }
              &:nth-child(3) {
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
  .AgentBackbtn {
    padding: 8px 12px;
    color: #fff;
    background: linear-gradient(#fdc937, #f37334);
    position: absolute;
    left: 30px;
    bottom: 20px;
    border-radius: 6px;
    cursor: pointer;
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
  .management {
    height: 100%;
    position: relative;
    .tab {
      height: 60px;
      display: flex;
      align-items: center;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
      span {
        width: 80px;
        height: 30px;
        background-color: #f0f0f0;
        border-radius: 5px;
        color: #999;
        text-align: center;
        line-height: 30px;
        margin-left: 30px;
        cursor: pointer;
        &.managementActive {
          background-color: #fea24d;
          color: #fff;
        }
      }
    }
    .add {
      padding: 10px;
      h3 {
        line-height: 40px;
        background-color: #fdf7ea;
        padding-left: 10px;
        color: #666;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          flex: 0 0 auto;
          width: 50%;
          height: 46px;
          border-top: 1px solid #f0f0f0;
          border-left: 1px solid #f0f0f0;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          &:nth-of-type(2n) {
            border-right: 1px solid #f0f0f0;
          }
          &:last-child {
            border-bottom: 1px solid #f0f0f0;
            border-right: 1px solid #f0f0f0;
          }
          &:nth-last-child(2) {
            border-bottom: 1px solid #f0f0f0;
          }
          span {
            &:nth-child(1) {
              display: inline-block;
              width: 76px;
              height: 45px;
              line-height: 40px;
              background-color: #fdf7ea;
              text-align: center;
              color: #666;
            }
            &:nth-child(3) {
              margin-left: 10px;
            }
          }
          .el-input {
            width: 60px;
            margin-left: 25px;
          }
        }
      }
      > div {
        border: 1px solid #f0f0f0;
        &:nth-child(1) {
          span {
            background-color: #fff !important;
          }
          .el-input {
            width: 360px;
            margin-left: 25px;
          }
        }
        &.recharge {
          .el-input {
            width: 60px;
            margin-left: 25px;
          }
        }
        span {
          &:nth-child(1) {
            display: inline-block;
            width: 76px;
            height: 46px;
            line-height: 46px;
            background-color: #fdf7ea;
            text-align: center;
            color: #666;
          }
          &:nth-child(2) {
            border: 1px solid #f0f0f0;
            padding: 5px 10px;
            margin-left: 20px;
          }
          &:nth-child(3) {
            margin-left: 10px;
          }
        }
      }
      .save {
        display: inline-block;
        width: 106px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background-color: #fea24d;
        color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translate(-50%);
        cursor: pointer;
      }
    }
    .list {
      padding: 0 5px;
      table {
        margin-top: 10px;
        text-align: center;
        border-color: #dfdfdf;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
        thead {
          background-color: #fdf7ea;
          border: none;
          td {
            height: 46px;
            border: none;
          }
        }
        td {
          padding: 0 10px;
          .event {
            color: blue;
            cursor: pointer;
            display: block;
            &:hover {
              color: #fea24d;
            }
          }
          &:nth-child(1) {
            width: 240px;
          }
          &:nth-child(2) {
            width: 160px;
            img {
              width: 76px;
              height: 76px;
              display: inline-block;
              vertical-align: middle;
            }
            a {
              display: inline-block;
              vertical-align: middle;
            }
          }
          &:nth-child(3) {
            width: 160px;
          }
          &:nth-child(4) {
            width: 130px;
          }
          &:nth-child(5) {
            width: 95px;
          }
          &:nth-child(6) {
            width: 120px;
            .event {
              margin-left: 5px;
            }
          }
        }
      }
    }
    .managementDetail {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      .managementDetailBox {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        padding: 0 10px 10px 10px;
        width: 800px;
        h1 {
          height: 42px;
          line-height: 42px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px solid #f0f0f0;
          color: #333;
          i {
            float: right;
            margin-right: 10px;
            cursor: pointer;
            &:active {
              color: #fea24d;
            }
          }
        }
        h3 {
          line-height: 40px;
          background-color: #fdf7ea;
          padding-left: 10px;
          color: #666;
          margin-bottom: 10px;
          margin-top: 10px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            flex: 0 0 auto;
            width: 50%;
            height: 46px;
            border-top: 1px solid #f0f0f0;
            border-left: 1px solid #f0f0f0;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            &:nth-of-type(2n) {
              border-right: 1px solid #f0f0f0;
            }
            &:last-child {
              border-bottom: 1px solid #f0f0f0;
              border-right: 1px solid #f0f0f0;
            }
            &:nth-last-child(2) {
              border-bottom: 1px solid #f0f0f0;
            }
            span {
              &:nth-child(1) {
                display: inline-block;
                width: 76px;
                height: 45px;
                line-height: 40px;
                background-color: #fdf7ea;
                text-align: center;
                color: #666;
              }
              &:nth-child(3) {
                margin-left: 10px;
              }
            }
            .el-input {
              width: 60px;
              margin-left: 25px;
            }
            input {
              width: 60px;
              margin-left: 25px;
              height: 30px;
              line-height: 30px;
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              text-align: center;
            }
          }
        }
        > div {
          border: 1px solid #f0f0f0;
          &:nth-child(3) {
            border: none;
          }
          &.recharge {
            input {
              width: 60px;
              margin-left: 25px;
              height: 30px;
              line-height: 30px;
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              text-align: center;
            }
          }
          span {
            &:nth-child(1) {
              display: inline-block;
              width: 76px;
              height: 46px;
              line-height: 46px;
              background-color: #fdf7ea;
              text-align: center;
              color: #666;
            }
            &:nth-child(2) {
              border: 1px solid #f0f0f0;
              padding: 5px 10px;
              margin-left: 20px;
            }
            &:nth-child(3) {
              margin-left: 10px;
            }
          }
        }
        .save {
          display: inline-block;
          width: 106px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          background-color: #fea24d;
          color: #fff;
          border-radius: 3px;
          margin-left: 50%;
          margin-top: 20px;
          transform: translate(-50%);
          cursor: pointer;
        }
      }
      .determine {
        position: absolute;
        right: 20px;
        bottom: 18px;
        background-color: #fea24d;
        color: #fff;
        border: 0 !important;
        border-radius: 6px;
        width: 80px;
        height: 32px;
        line-height: 32px;
        text-align: center;
      }
    }
  }
  .teamReport {
    height: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #999;
      background: #fff;
      padding: 0 30px;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
      .category {
        span {
          margin-right: 10px;
        }
        .el-input {
          width: 130px;
        }
      }
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
        float: right;
        font-size: 14px;
        border-radius: 5px;
        background: linear-gradient(#fdc937, #f37334);
        cursor: pointer;
        opacity: 0.6;
        margin-top: 15px;
      }
    }
    .teamReportContent {
      padding: 40px 40px 0 40px;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        li {
          width: 140px;
          height: 70px;
          background-color: #f7f7f7;
          margin-left: 25px;
          margin-bottom: 20px;
          border: 1px solid #d0d0d0;
          text-align: center;
          &:nth-of-type(5n + 1) {
            margin-left: 0;
          }
          p {
            color: #fea24d;
            margin-top: 13px;
            margin-bottom: 5px;
          }
          span {
            color: #666;
          }
        }
      }
    }
    .tips {
      padding-left: 40px;
      h3 {
        color: #fea24d;
        margin-bottom: 15px;
      }
      p {
        line-height: 25px;
        color: #666;
      }
    }
  }
  .subordinateReport {
    height: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #999;
      background: #fff;
      padding: 0 30px;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
      .date {
        span {
          margin-right: 15px;
        }
      }
      span.search {
        float: right;
        color: #fff;
        width: 80px;
        text-align: center;
        line-height: 30px;
        height: 30px;
        font-size: 14px;
        border-radius: 5px;
        background: linear-gradient(#fdc937, #f37334);
        cursor: pointer;
        opacity: 0.6;
        margin-top: 15px;
      }
    }
    dl {
      margin-top: 6px;
      dt,
      dd {
        height: 46px;
        line-height: 46px;
        display: flex;
      }
      dt {
        background-color: #fdf7ea;
      }
      div {
        width: 11%;
        text-align: center;
      }
      div:first-child {
        width: 13%;
      }
      .profit {
        color: #fb612b;
      }
      .loss {
        color: #2698e8;
      }
      .blue {
        color: blue;
        cursor: pointer;
      }
      .blue:first-child {
        display: inline-block;
        margin-right: 8px;
      }
    }
  }
  .transactionDetails {
    height: 100%;
    .tab {
      height: 60px;
      display: flex;
      align-items: center;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
      .tabSpan {
        width: 100px;
        height: 30px;
        background-color: #f0f0f0;
        border-radius: 5px;
        color: #999;
        text-align: center;
        line-height: 30px;
        margin-left: 30px;
        cursor: pointer;
        &.transactionDetailsActive {
          background-color: #fea24d;
          color: #fff;
        }
      }
      .dataSpan {
        margin-left: 40px;
        margin-right: 20px;
      }
    }
    .betting {
      .betting-top {
        box-shadow: 6px 6px 6px 0 rgba(0, 0, 0, 0.1);
        ul {
          padding: 4px;
          display: flex;
          flex-wrap: wrap;
          li {
            padding: 5px 10px;
            cursor: pointer;
            color: #666;
            &:hover {
              color: #fea24d;
            }
            span {
              margin-left: 5px;
            }
          }
          li:first-child {
            cursor: unset;
            &:hover {
              color: #666;
            }
          }
          .active {
            color: #fea24d;
          }
        }
        > div {
          height: 40px;
          display: flex;
          align-items: center;
          padding-left: 30px;
          padding-bottom: 8px;
          color: #666;
          .el-input {
            width: 176px;
          }
          b {
            font-weight: normal;
            display: inline-block;
            margin-left: 20px;
            width: 80px;
            height: 30px;
            background-color: #fea24d;
            border-radius: 5px;
            text-align: center;
            line-height: 30px;
            color: #fff;
            cursor: pointer;
          }
        }
      }
      dl {
        dt {
          background-color: #fdf7ea;
          height: 40px;
          line-height: 40px;
          display: flex;
        }
        div {
          width: 19%;
          text-align: center;
        }
        dd {
          display: flex;
          div {
            width: 19%;
            flex: 0 0 auto;
            height: 44px;
            line-height: 44px;
            color: #666;
            text-align: center;
          }
          .time {
            line-height: unset;
            padding-top: 4px;
          }
        }
        .long {
          width: 24%;
        }
      }
    }
    .contacts {
      .header {
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #999;
        background: #fff;
        padding: 0 30px;
        margin-top: 5px;
        .category {
          span {
            margin-right: 10px;
          }
          .el-input {
            width: 130px;
          }
        }
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
          float: right;
          font-size: 14px;
          border-radius: 5px;
          background: linear-gradient(#fdc937, #f37334);
          cursor: pointer;
          opacity: 0.6;
          margin-top: 15px;
        }
      }
      dl {
        dt {
          background-color: #fdf7ea;
          height: 46px;
          line-height: 46px;
          display: flex;
        }
        div {
          width: 20%;
          text-align: center;
        }
        dd {
          display: flex;
          div {
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            width: 20%;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            word-break: break-all;
          }
          div:nth-child(2) {
            line-height: unset;
          }
          .time {
            line-height: unset;
            padding-top: 4px;
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
