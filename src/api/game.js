import { fetch } from "@/axios/index";

// 导航栏header
export function navigation() {
  return fetch({
    url: "/index/navigation",
    method: "get",
    loading: true
  });
}
// 游戏分类
export function hallType(query) {
  return fetch({
    url: "/game/hallType",
    method: "get",
    params: query,
    loading: true
  });
}
// 查询游戏
export function serchGame(query) {
  return fetch({
    url: "/game/searchGame",
    method: "get",
    params: query,
    loading: true
  });
}
// 游戏记录列表
export function GameRecordList() {
  return fetch({
    url: "/game/gameRecordList",
    method: "get",
    loading: true
  });
}
// 查询棋牌游戏记录
export function chessRecord(query) {
  return fetch({
    url: "/Game/chessRecord",
    method: "get",
    params: query,
    loading: true
  });
}
// 查询电子真人游戏记录
export function thirdRecord(query) {
  return fetch({
    url: "/game/thirdRecord",
    method: "get",
    params: query,
    loading: true
  });
}
// 查询捕鱼游戏记录
export function getGroupList(query) {
  return fetch({
    url: "/game/getThirdRecommend",
    method: "get",
    params: query,
    loading: true
  });
}
// 查询吉祥彩票
export function lotteryHall(query) {
  return fetch({
    url: "/lottery/lotteryHall",
    method: "get",
    params: query,
    loading: true
  });
}
// 第三方游戏列表(额度转换)
export function thirdGameList() {
  return fetch({
    url: "/game/thirdGameList",
    method: "get",
    loading: true
  });
}

// 游戏记录TAB列表
export function thirdListRecord() {
  return fetch({
    url: "/lottery/thirdList",
    method: "get",
    loading: true
  });
}

// 游戏记录
export function record(query) {
  return fetch({
    url: "/lottery/record",
    method: "get",
    params: query,
    loading: true
  });
}
