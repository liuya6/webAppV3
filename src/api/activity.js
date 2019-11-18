import { fetch } from "@/axios/index";

/* 全部活动 */
export function activity(query) {
  return fetch({
    url: "/activity/index",
    method: "get",
    params: query,
    loading: true
  });
}
/* 活动申请 √ */
export function appllyActivity(query) {
  return fetch({
    url: "/activity/apply",
    method: "post",
    data: query,
    loading: true
  });
}
/* 投诉建议
 √ */
export function addSuggest(query) {
  return fetch({
    url: "/member/addSuggest",
    method: "post",
    data: query,
    loading: true
  });
}
