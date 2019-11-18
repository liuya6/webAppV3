<template>
  <div class="ClearCache" v-title="'技术支援'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="conTent">
      <div class="conTop">
        <div class="GoBack">
          <a href="javascript:history.back(-1);">回上一页</a>
        </div>
        <img :src="`${staticZhpUrl}technology/icon_DNS.png`" />
        <div class="text">
          <h2>DNS手動修改</h2>
          <p>请试试下方的步骤，为您排解问题</p>
        </div>
        <div class="ben_menu">
          <div
            v-for="(item, i) in menu"
            :key="i"
            :class="{ active: i == index }"
            @click="change(i)"
          >
            {{ item }}
          </div>
          <!-- <a href="ClearDNS_File_zb.html">windows XP</a>
          <a
            href="ClearDNS_File_za.html"
            style=""
          >windows 7</a>
          <a href="ClearDNS_File_zc.html">windows 8.1</a>
          <a href="ClearDNS_File_zd.html">windows 10</a>-->
        </div>
      </div>
      <div class="CearCachel" v-if="index == 1">
        <div class="Text_A1" style="top: 175px;">
          开启 "
          <strong>开始</strong>"，选择 " <strong>控制面板</strong>"
        </div>
        <div class="Text_A2" style="top: 615px;">
          选择 "
          <strong>网络和Internet</strong>"
        </div>
        <div class="Text_A3" style="top: 960px;">
          于
          <strong>网络和共享中心</strong>项目下 <br />点击 "
          <strong>查看网络状态和任务</strong>"
        </div>
        <div class="Text_A4" style="top: 1300px;">
          点击"
          <strong>本地连接</strong>"
        </div>
        <div class="Text_A5" style="top: 1640px;">
          开启本地连接的介面后
          <br />点击 " <strong>属性(P)</strong>"
        </div>
        <div class="Text_A6" style="top: 2165px;">
          开启属性(P)的介面后
          <br />勾选 " <strong>Internet协议版本 4 (TCP/IPv4)</strong>"
          <br />点击 " <strong>属性(R)</strong>"
        </div>
        <div class="Text_A7" style="top: 2685px;">
          开启属性(R)的介面后
          <br />选择 " <strong>使用下面的 DNS 服务器地址(E)</strong>"，
          <br />并修改: <br />首选DNS服务器(P):
          <strong>8 . 8 . 8 . 8</strong>
          <br />备用DNS服务器(A):
          <strong>8 . 8 . 4 . 4</strong>
          <br />点击 " <strong>确定</strong>"即完成DNS设置。
        </div>
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win7_01.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win7_02.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win7_03.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win7_04.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win7_05.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win7_06.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win7_07.jpg`"
          style="margin: 10px 0px;"
        />
      </div>

      <div class="CearCachel" v-else-if="index == 0">
        <div class="Text_A1" style="top: 175px;">
          开启 "<strong>开始</strong>"，选择 "<strong>控制面板</strong>"
        </div>
        <div class="Text_A2" style="top: 615px;">
          选择 "<strong>网络连接</strong>"
        </div>
        <div class="Text_A3" style="top: 960px;">
          于<strong>本地连接</strong>按下滑鼠右键
        </div>
        <div class="Text_A4" style="top: 1300px;">
          于本地连接按右鍵后 <br />点击 "<strong>属性(R)</strong>"
        </div>
        <div class="Text_A5" style="top: 1640px;">
          开启属性(R)的介面后 <br />勾选 "<strong>Internet 协议 (TCP/IP)</strong
          >" <br />点击 "<strong>属性(R)</strong>"
        </div>
        <div class="Text_A6" style="top: 2165px;">
          开启属性(R)的介面后 <br />选择 "<strong
            >使用下面的 DNS 服务器地址(E)</strong
          >"， <br />并修改: <br />首选DNS服务器(P):
          <strong>8 . 8 . 8 . 8</strong> <br />
          备用DNS服务器(A): <strong>8 . 8 . 4 . 4</strong> <br />点击
          "<strong>确定</strong>"即完成DNS设置。
        </div>
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_WinXP_01.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_WinXP_02.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_WinXP_03.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_WinXP_04.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_WinXP_05.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_WinXP_06.jpg`"
          style="margin: 10px 0px;"
        />
      </div>

      <div class="CearCachel" v-else-if="index == 2">
        <div class="Text_A1" style="top: 175px;">
          开启 "<strong>设置</strong>"
        </div>
        <div class="Text_A2" style="top: 625px;">
          选择 "<strong>控制面板</strong>"
        </div>
        <div class="Text_A3" style="top: 1065px;">
          选择 "<strong>网络和共享中心</strong>"
        </div>
        <div class="Text_A4" style="top: 1410px;">
          点击 "<strong>本地连接</strong>"
        </div>
        <div class="Text_A5" style="top: 1755px;">
          开启本地连接的介面后 <br />点击 "<strong>属性(P)</strong>"
        </div>
        <div class="Text_A6" style="top: 2100px;">
          开启属性(P)的介面后 <br />勾选 "<strong
            >Internet 协议版本 4 (TCP/IPv4)</strong
          >" <br />点击 "<strong>属性(R)</strong>"
        </div>
        <div class="Text_A7" style="top: 2815px;">
          开启属性(R)的介面后 <br />选择 "<strong
            >使用下面的 DNS 服务器地址(E)</strong
          >"， <br />并修改: <br />首选DNS服务器(P):
          <strong>8 . 8 . 8 . 8</strong> <br />
          备用DNS服务器(A): <strong>8 . 8 . 4 . 4</strong> <br />点击
          "<strong>确定</strong>"即完成DNS设置。
        </div>
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win8_01.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win8_02.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win8_03.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win8_04.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win8_05.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win8_06.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win8_07.jpg`"
          style="margin: 10px 0px;"
        />
      </div>

      <div class="CearCachel" v-else>
        <div class="Text_A1" style="top: 175px;">
          点击开始，选择 "<strong>设置</strong>"
        </div>
        <div class="Text_A2" style="top: 615px;">
          开启设置介面 <br />点击 "<strong>网络和Internet</strong>" 项目
        </div>
        <div class="Text_A3" style="top: 960px;">
          选择 "以太网" <br />点击 "<strong>网络和共享中心</strong>"
        </div>
        <div class="Text_A4" style="top: 1300px;">
          开启网络和共享中心介面 <br />点击 "<strong>以太网</strong>"
        </div>
        <div class="Text_A5" style="top: 1640px;">
          开启以太网介面 <br />点击 "<strong>属性(P)</strong>"
        </div>
        <div class="Text_A6" style="top: 2315px;">
          开启属性(P)的介面后 <br />勾选
          "<strong>Internet协议版本4(TCP/IPv4)</strong>" <br />点击
          "<strong>属性(R)</strong>"
        </div>
        <div class="Text_A7" style="top: 2990px;">
          开启属性(R)的介面后 <br />选择 "<strong
            >使用下面的 DNS 服务器地址(E)</strong
          >"， <br />并修改: <br />首选DNS服务器(P):
          <strong>8 . 8 . 8 . 8</strong> <br />
          备用DNS服务器(A): <strong>8 . 8 . 4 . 4</strong> <br />点击
          "<strong>确定</strong>"即完成DNS设置。
        </div>
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win10_01.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win10_02.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win10_03.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win10_04.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win10_05.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win10_06.jpg`"
          style="margin: 10px 0px;"
        />
        <img
          :src="`${staticZhpUrl}technology/dns/DNS_Win10_07.jpg`"
          style="margin: 10px 0px;"
        />
      </div>
    </div>
    <questionMenu></questionMenu>
    <my-foot></my-foot>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "MOBILE",
  data() {
    return {
      index: 1,
      menu: ["windows XP", "windows 7", "windows 8.1", "windows 10"]
    };
  },

  created() {},
  methods: {
    change(i) {
      this.index = i;
    }
  },
  computed: {
    ...mapGetters(["staticZhpUrl"])
  }
};
</script>
<style scoped lang="scss"></style>
