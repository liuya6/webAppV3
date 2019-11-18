import { fetch } from "@/axios/index";

// 首页数据
export function initHome() {
  return fetch({
    url: "/index/index",
    method: "post",
    loading: true
  });
}
// footer数据
export function ArticleDetail(query) {
  return fetch({
    url: "/system/ArticleDetail",
    method: "get",
    params: query,
    loading: true
  });
}
// 配置项
export function settings() {
  return fetch({
    url: "/system/settings",
    method: "get"
  });
}
/* 老虎机奖池 */
export function jackpot() {
  return fetch({
    url: "/index/jackpot",
    method: "get"
  });
}
/*长龙列表*/
export function changLongList() {
  return fetch({
    url: "/lottery/changLong",
    method: "get"
  });
}
/* 购买彩票 */
export function lotteryBuy(query) {
  return fetch({
    url: "/lottery/buy",
    method: "post",
    data: query,
    loading: true
  });
}
