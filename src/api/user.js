import { fetch } from "@/axios/index";

// 登录
export function goLogin(query) {
  return fetch({
    url: "/auth/login",
    method: "post",
    data: query,
    loading: true
  });
}
// 登出
export function loginOut() {
  return fetch({
    url: "/auth/logout",
    method: "post",
    loading: true
  });
}

// 个人中心
export function userDetail() {
  return fetch({
    url: "/member/index",
    method: "get"
  });
}

// 检查登录状态
export function checkLogin() {
  return fetch({
    url: "/auth/checkLogin",
    method: "get"
  });
}
// 注册准备
export function registerBefore() {
  return fetch({
    url: "/auth/registerBefore",
    method: "get",
    loading: true
  });
}
// 注册
export function register(query) {
  return fetch({
    url: "/auth/register",
    method: "post",
    data: query,
    loading: true
  });
}
// 试玩
export function registerFree() {
  return fetch({
    url: "/auth/registerFree",
    method: "post",
    loading: true
  });
}
//会员中心
export function getMember() {
  return fetch({
    url: "/member/memberLevel",
    method: "get",
    loading: true
  });
}
// 修改登录密码
export function changeUserPwd(query) {
  return fetch({
    url: "/member/resetPassword",
    method: "post",
    data: query,
    loading: true
  });
}
// 修改提现密码
export function changeWithdrawPwd(query) {
  return fetch({
    url: "/member/resetCoinPassword",
    method: "post",
    data: query,
    loading: true
  });
}
// 充值准备
export function rechargeBefore() {
  return fetch({
    url: "/cash/rechargeBefore",
    method: "get",
    loading: true
  });
}
// 充值申请
export function rechargeApply(query) {
  return fetch({
    url: "/cash/rechargeApply",
    method: "post",
    data: query,
    loading: true
  });
}
// 充值提交
export function rechargeSubmit(query) {
  return fetch({
    url: "/cash/rechargeSubmit",
    method: "post",
    data: query,
    loading: true
  });
}
// 绑卡准备
export function bindingBefore() {
  return fetch({
    url: "/member/bindingBefore",
    method: "get",
    loading: true
  });
}
// 我的银行卡
export function getMyBank() {
  return fetch({
    url: "/member/bank",
    method: "get",
    loading: true
  });
}
// 绑定银行卡
export function boundCard(query) {
  return fetch({
    url: "/member/binding",
    method: "post",
    data: query,
    loading: true
  });
}
/* 公告列表 */
export function announcement(query) {
  return fetch({
    url: "/system/notice",
    method: "get",
    params: query,
    loading: true
  });
}
/* 活动申请记录 */
export function activityApplyList(query) {
  return fetch({
    url: "/activity/applyList",
    method: "post",
    data: query,
    loading: true
  });
}
/* 提现 */
export function withdraw(query) {
  return fetch({
    url: "/Cash/withdraw",
    method: "post",
    data: query,
    loading: true
  });
}
// 系统设置 最小提现金额~最大提现金额
export function cashConfigs() {
  return fetch({
    url: "/system/cashConfigs",
    method: "get"
  });
}

// 游戏余额
export function thirdMoney(query) {
  return fetch({
    url: "/game/thirdMoney",
    method: "post",
    data: query
  });
}
// 一键归户
export function exchangeAllToLottery() {
  return fetch({
    url: "/game/exchangeAllToLottery",
    method: "get",
    loading: true
  });
}
// 余额转换
export function exchangeMoney(query) {
  return fetch({
    url: "/game/exchangeMoney",
    method: "post",
    data: query,
    loading: true
  });
}
// 7日统计
export function statCount() {
  return fetch({
    url: "/cash/statCount",
    method: "post",
    loading: true
  });
}
// 当日统计
export function serchCount(query) {
  return fetch({
    url: "/cash/serchCount",
    method: "get",
    params: query,
    loading: true
  });
}
// 账目类别
export function getCoinType() {
  return fetch({
    url: "/cash/getCoinType",
    method: "post",
    loading: true
  });
}
// 账目类别查询
export function account(query) {
  return fetch({
    url: "/cash/account",
    method: "get",
    params: query,
    loading: true
  });
}
/* 游戏记录游戏列表 */
export function gameRecordList(query) {
  return fetch({
    url: "/game/gameRecordList",
    method: "get",
    params: query,
    loading: true
  });
}
// 游戏记录
// export function thirdRecord(query) {
//     return fetch({
//         url: "/game/thirdRecord",
//         method: "get",
//         params: query,
//         loading: true
//     });
// }
// 修改昵称
export function modifyUser(query) {
  return fetch({
    url: "/member/modifyUser",
    method: "post",
    data: query,
    loading: true
  });
}

// 发送短信
export function sendSms(query) {
  return fetch({
    url: "/Auth/sendSms",
    method: "post",
    data: query,
    loading: true
  });
}

// 绑定手机号
export function bindMobiles(query) {
  return fetch({
    url: "/member/bindMobile",
    method: "post",
    data: query,
    loading: true
  });
}

// 今日盈亏
export function statistics(query) {
  return fetch({
    url: "/member/statistics",
    method: "get",
    params: query,
    loading: true
  });
}
// 充值记录
export function rechargeRecord(query) {
  return fetch({
    url: "/cash/rechargeRecord",
    method: "get",
    params: query,
    loading: true
  });
}
// 提现记录
export function WithdrawRecord(query) {
  return fetch({
    url: "/cash/WithdrawRecord",
    method: "get",
    params: query,
    loading: true
  });
}

// 帮助中心
export function help() {
  return fetch({
    url: "/member/help",
    method: "get"
  });
}

// 个人消息
export function message(query) {
  return fetch({
    url: "/member/message",
    method: "get",
    params: query
  });
}

//个人消息详情
export function messageDetail(query) {
  return fetch({
    url: "/member/messageDetail",
    method: "get",
    params: query
  });
}

// 删除消息
export function deleteMessage(query) {
  return fetch({
    url: "/member/deleteMessage",
    method: "get",
    params: query
  });
}

/*推荐码*/
export function spread() {
  return fetch({
    url: "member/spread",
    method: "get"
  });
}

/*红包详情*/
export function redPacket() {
  return fetch({
    url: "activity/redPacket",
    method: "get"
  });
}

/*红包详情*/
export function grabRedPacket(query) {
  return fetch({
    url: "activity/grabRedPacket",
    method: "post",
    data: query
  });
}

/* 领取洗码金 */
export function getWashcode() {
  return fetch({
    url: "Memberwashcode/getWashcode",
    method: "post"
  });
}

// /* 洗码等级比例 */
// export function washCodeRateLevel(query) {
//   return fetch({
//     url: "Memberwashcode/washCodeRateLevel",
//     method: "get",
//     params: query
//   });
// }

/* 洗码比例分类 */
export function washCodeRateList() {
  return fetch({
    url: "Memberwashcode/washCodeRateList",
    method: "get"
  });
}

/* 洗码统计 */
export function washCodeStatistics() {
  return fetch({
    url: "Memberwashcode/washCodeStatistics",
    method: "get"
  });
}

/* 余额宝首页 */
export function yueBao(query) {
  return fetch({
    url: "/yuebao/index",
    method: "post",
    data: query
  });
}
/* 余额宝问题 */
export function yueBaoHelp(query) {
  return fetch({
    url: "/yuebao/help",
    method: "post",
    data: query,
    loading: true
  });
}
/* 转入记录 */
export function yuebaoRecord(query) {
  return fetch({
    url: "/yuebao/record",
    method: "get",
    params: query,
    loading: true
  });
}
/* 收支明细 */
export function yuebaoLog(query) {
  return fetch({
    url: "/yuebao/log",
    method: "get",
    params: query,
    loading: true
  });
}
/* 转入余额宝 */
export function transFerIn(query) {
  return fetch({
    url: "/yuebao/transferIn",
    method: "get",
    params: query,
    loading: true
  });
}
/* 转出余额宝 */
export function transferOut(query) {
  return fetch({
    url: "/yuebao/transferOut",
    method: "get",
    params: query,
    loading: true
  });
}
