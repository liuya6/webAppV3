<template>
  <div class="CourseCommon" v-title="'手机教程'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="content">
      <main>
        <section class="mobile-tutorial">
          <!-- ....... 麵包屑 ....... -->
          <ul class="breadcrumbs">
            <li>
              <a href="index.html">DNS首頁</a>
            </li>
            <li>
              手机教程
            </li>
          </ul>

          <!-- .......教程選擇....... -->
          <div class="tutorial-select">
            <div class="left-btn">
              <a
                href="javascript:;"
                @click="$router.replace({ name: 'course2' })"
                >平板教程</a
              >
            </div>
            <div
              class="img mobile"
              :style="
                `background-image: url(${staticZhpUrl}dns/phone/mobile-tutorial.jpg)`
              "
            >
              <div class="img-bg">
                手机教程
              </div>
            </div>
            <div class="right-btn">
              <a
                href="javascript:;"
                @click="$router.replace({ name: 'course' })"
                >电脑教程</a
              >
            </div>
          </div>
          <!-- .......教程按鈕....... -->
          <div class="tutorial-button-box">
            <div class="tutorial-button-title"></div>
            <ul class="tutorial-button">
              <li>
                <a
                  href="javascript:void();"
                  :class="{ activeA: index == 0 }"
                  @click="change"
                  >Android教程</a
                >
              </li>
              <li>
                <a
                  href="javascript:void();"
                  :class="{ activeA: index == 1 }"
                  @click="change1"
                  >iOS教程</a
                >
              </li>
            </ul>
          </div>

          <div class="main-box">
            <!-- .......Android教程....... -->
            <div
              id="android-tutorial"
              class="android-tutorial"
              v-if="index == 0"
            >
              <ul>
                <li>
                  <p>
                    1. 点击安卓的 “ <span class="ponit">设置</span> ” -应用程序
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step1.jpg`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    2. 点击 WLAN 选项打开 Wi-Fi 列表
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step2.jpg`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    3. 在 Wi-Fi 列表选择已连接的 Wi-Fi 名称, 长按之后选择 “
                    <span class="ponit">修改网络</span> ”
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step3.jpg`" alt="" />
                  </div>
                </li>
                <li>
                  <p>4. 选择 “ <span class="ponit">显示高级选项</span> ”</p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step4.jpg`" alt="" />
                  </div>
                </li>
                <li>
                  <p>5. 点击 “ <span class="ponit">IP 设置</span> ”</p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step5.jpg`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    6. 在弹出的 IP 提示中选择 “
                    <span class="ponit">静态</span> ”
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step6.jpg`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    7. 将域名1 和域名2 改成需要更改的 DNS 数值本例子我们使用
                    <span class="ponit"> 8.8.8.8 和 8.8.4.4 </span>, 然后点击 “
                    <span class="ponit">保存</span> ” 即可
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step7.jpg`" alt="" />
                  </div>
                </li>
              </ul>
            </div>

            <!-- ......iOS教程....... -->
            <div id="ios-tutorial" class="ios-tutorial" v-if="index == 1">
              <ul>
                <li>
                  <p>
                    1. 点击 ios 的 “ <span class="ponit">设置</span> ” -应用程序
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step1.png`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    2. 点击 “ <span class="ponit">Wi-Fi</span> ” 进入 Wi-Fi
                    列表选择可用 Wi-Fi
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step2.png`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    3. 右边的图标连接上可用的 Wi-Fi 后点击该 Wi-Fi 名称
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step3.png`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    4. 在该 Wi-Fi 网络详情部分向下滚动找到 “
                    <span class="ponit">DNS</span> ” 选项部分,
                    在弹出的键盘上输入您需要更改的 DNS 数值,使用
                    <span class="ponit">8.8.8.8</span>
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step4.png`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    5. 点击 “ <span class="ponit">Wi-Fi</span> ” 按钮退出,
                    并重启设备使设置生效
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/phone/step5.png`" alt="" />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- .......返回鍵....... -->
          <div class="back">
            <a href="javascript:;" @click="$router.replace({ name: 'dns' })">
              <span>知道了，返回 DNS 首页</span>
              <img :src="`${staticZhpUrl}dns/arrow-blue.png`" alt="" />
            </a>
          </div>
        </section>
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
      index: 0
    };
  },

  created() {
    let i = this.$route.query.index;
    if (i) {
      this.index = i;
    }
  },
  methods: {
    change() {
      this.index = 0;
    },
    change1() {
      this.index = 1;
    }
  },
  computed: {
    ...mapGetters(["staticZhpUrl"])
  }
};
</script>

<style scoped lang="scss"></style>
