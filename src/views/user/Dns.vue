<template>
  <div class="CourseCommon" v-title="'DNS防劫持教程'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="content">
      <main>
        <div
          class="ibet-dns"
          :style="`background-image: url(${staticZhpUrl}dns/hero.jpg)`"
        >
          <div class="cover">
            <h2>
              <span class="t-length">
                <!-- <span id="title-id">宏图娱乐</span> -->
                DNS 防劫持教程
              </span>
              <span class="qcode-box" style="margin-top: -28px;">
                <p class="qcode-title">反劫持建议下载APP</p>
                <p
                  v-if="allConfig && allConfig.androidErweima"
                  id="qcode"
                  class="flexC"
                >
                  <!-- <a href="../../Index.html"> -->
                  <img
                    class="qcode-blur"
                    :src="allConfig.androidErweima"
                    style="animation-delay: .7s;"
                    width="130"
                  />
                  <!-- </a> -->
                </p>
                <p class="qcode-buttom">推荐【UC浏览器】扫码</p>
              </span>
            </h2>
            <p class="cover-text">
              <span>
                当您打开网站时，若页面突然跳转至其他网站（与日常访问网站不同），
                或弹出改版公告等现象，此时您的DNS已被劫持，而且很可能会被恶意指向钓鱼网站，严重影响您的账户资金安全。请即时联系在线客服说明情况，并根据以下教程自行修改DNS，以保证正常娱乐。
              </span>
            </p>
          </div>
        </div>
        <div class="container">
          <div class="tutorial-box reverse">
            <div
              class="img-box computer"
              :style="`background-image: url(${staticZhpUrl}dns/computer.jpg)`"
            ></div>
            <div class="content-box">
              <h2>
                电脑教程
                <small>
                  <span class="sub-title">防劫持官方网址</span>
                  <span class="sub-title">
                    <a class="url-text">
                      <span class="url-text-h">{{ location }}</span>
                      <!-- <span class="url-text-s" style="color:#ffc107"></span>
                      <span class="url-text-c"></span> -->
                    </a>
                  </span>
                </small>
              </h2>
              <p>
                DNS
                劫持又称域名劫持，是指在劫持的网络范围内拦截域名解析的请求，分析请求的域名，
                把审查范围以外的请求放行，否则返回假的 IP
                地址或者什么都不做使请求失去响应，
                其效果就是对特定的网络不能反应或访问的是假网址。
                最简单的办法就是把 DNS 解析换成国外的谷歌解析即可安全又对大家的
                IP、游戏、首存、优惠活动等没有影响。
              </p>
              <!-- <p class="ponit">* 您可以单击「一键修改」进行档案下载，快速解除 DNS 劫持状态，此档案并不影响到您电脑的使用安全性，请放心下载！</p> -->
              <ul>
                <li>
                  <a :href="`${staticZhpUrl}dns/dns.rar`">
                    一键修改
                    <img
                      class="arrow-icon"
                      :src="`${staticZhpUrl}dns/arrow-yellow.png`"
                      alt
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    @click="$router.push({ name: 'course' })"
                  >
                    手动教程
                    <img
                      class="arrow-icon"
                      :src="`${staticZhpUrl}dns/arrow-yellow.png`"
                      alt
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    @click="
                      $router.push({ name: 'course', query: { index: 1 } })
                    "
                  >
                    Mac教程
                    <img
                      class="arrow-icon"
                      :src="`${staticZhpUrl}dns/arrow-yellow.png`"
                      alt
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="tutorial-box">
            <div
              class="img-box tablet"
              :style="`background-image: url(${staticZhpUrl}dns/tablet.jpg)`"
            ></div>
            <div class="content-box">
              <h2>
                平板教程
                <small>
                  <span class="sub-title">防劫持官方网址</span>
                  <span class="sub-title">
                    <a class="url-text">
                      <span class="url-text-h">{{ location }}</span>
                      <!-- <span class="url-text-s" style="color:#ffc107"></span>
                      <span class="url-text-c"></span> -->
                    </a>
                  </span>
                </small>
              </h2>
              <p>
                网络黑客劫持了 DNS
                服务器，意思是通过某些手段取得某域名的解析记录控制权，
                进而修改此域名的解析结果，导致对该域名的访问由原 IP
                地址转入到修改后的指定 IP，
                其结果就是对特定的网址不能访问或访问的是假网址，从而实现窃取资料或者破坏原有正常服务的目的。
                最简单的办法就是把 DNS 解析换成国外的谷歌解析即可安全对大家的
                IP、游戏、首存、优惠活动等没有影响。
              </p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    @click="$router.push({ name: 'course2' })"
                  >
                    Android教程
                    <img
                      class="arrow-icon"
                      :src="`${staticZhpUrl}dns/arrow-yellow.png`"
                      alt
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    @click="
                      $router.push({ name: 'course2', query: { index: 1 } })
                    "
                  >
                    iOS教程
                    <img
                      class="arrow-icon"
                      :src="`${staticZhpUrl}dns/arrow-yellow.png`"
                      alt
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="tutorial-box reverse">
            <div
              class="img-box mobile"
              :style="`background-image: url(${staticZhpUrl}dns/mobile.jpg)`"
            ></div>
            <div class="content-box">
              <h2>
                手机教程
                <small>
                  <span class="sub-title">防劫持官方网址</span>
                  <span class="sub-title">
                    <a class="url-text">
                      <span class="url-text-h">{{ location }}</span>
                      <!-- <span class="url-text-s" style="color:#ffc107"></span>
                      <span class="url-text-c"></span> -->
                    </a>
                  </span>
                </small>
              </h2>
              <p>
                黑客利用宽带路由器的缺陷对用户 DNS
                进行篡改—用户只要浏览一下黑客所掌控的 WEB 页面， 其宽带路由器的
                DNS 就会被黑客篡改，因为该 WEB
                页面设有特别的恶意代码，所以可以成功躲过安全软件检测，
                导致大量用户被 DNS 钓鱼诈骗。最简单的办法就是把 DNS
                解析换成国外的谷歌解析即可安全对大家的 IP、
                游戏、首存、优惠活动等没有影响。
              </p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    @click="$router.push({ name: 'course1' })"
                  >
                    Android教程
                    <img
                      class="arrow-icon"
                      :src="`${staticZhpUrl}dns/arrow-yellow.png`"
                      alt
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    @click="
                      $router.push({ name: 'course1', query: { index: 1 } })
                    "
                  >
                    iOS教程
                    <img
                      class="arrow-icon"
                      :src="`${staticZhpUrl}dns/arrow-yellow.png`"
                      alt
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MOBILE",
  data() {
    return {
      location: "",
      index: "",
      homeIndex: 0
    };
  },
  created() {
    this.location = window.location.origin;
  },
  methods: {},
  computed: {
    ...mapGetters(["allConfig", "staticZhpUrl"])
  }
};
</script>
