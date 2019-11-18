<template>
  <div class="CourseCommon" v-title="'平板教程'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="content">
      <main>
        <div class="tablet-tutorial">
          <!-- ....... 麵包屑 ....... -->
          <ul class="breadcrumbs">
            <li>
              <a href="index.html">DNS首页</a>
            </li>
            <li>平板教程</li>
          </ul>

          <!-- .......教程選擇....... -->
          <div class="tutorial-select">
            <div class="left-btn">
              <a
                href="javascript:;"
                @click="$router.replace({ name: 'course1' })"
                >手机教程</a
              >
            </div>
            <div
              class="img tablet"
              :style="
                `background-image: url(${staticZhpUrl}dns/tablet-tutorial.jpg)`
              "
            >
              <div class="img-bg">平板教程</div>
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
                    1.点击安卓的“
                    <span class="ponit">设置</span> ” - 应用程序
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/pingban/step1.jpg`" alt />
                  </div>
                </li>
                <li>
                  <p>2.点击Wi-Fi选项打开Wi-Fi列表</p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/pingban/step2.jpg`" alt />
                  </div>
                </li>
                <li>
                  <p>
                    3.在Wi-Fi列表选择已连接的Wi-Fi名称，长按之后选择“
                    <span class="ponit">修改网络</span> ”
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/pingban/step3.jpg`" alt />
                  </div>
                </li>
                <li>
                  <p>
                    4.选择“
                    <span class="ponit">显示高级选项</span> ”
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/pingban/step4.jpg`" alt />
                  </div>
                </li>
                <li>
                  <p>
                    点击“
                    <span class="ponit">IP设置</span> ”，在弹出的IP提示中选择“
                    <span class="ponit">静态</span> ”
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/pingban/step5.jpg`" alt />
                  </div>
                </li>
                <li>
                  <p>
                    6.将域名1和域名2改成需要更改的DNS数值本例子我们使用
                    <span class="ponit">8.8.8.8和8.8.4.4</span>，然后点击“
                    <span class="ponit">保存</span> ”即可
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/pingban/step6.jpg`" alt />
                  </div>
                </li>
              </ul>
            </div>
            <!-- ......iOS教程....... -->
            <div id="ios-tutorial" class="ios-tutorial" v-if="index == 1">
              <ul>
                <li>
                  <p>
                    1. 打开 ipad 的 “
                    <span class="ponit">设置</span> ” -应用程序
                  </p>
                  <div>
                    <img
                      :src="`${staticZhpUrl}dns/pingban/ios-step1.jpg`"
                      alt
                    />
                  </div>
                </li>
                <li>
                  <p>
                    2. 在设置中点击 “
                    <span class="ponit">无线局域网 ” (Wi-Fi)</span>
                    再点击已连接的 Wi-Fi 名称右边的图标
                  </p>
                  <div>
                    <img
                      :src="`${staticZhpUrl}dns/pingban/ios-step2.jpg`"
                      alt
                    />
                  </div>
                </li>
                <li>
                  <p>
                    3. 在该 Wi-Fi 网络详情的下面找到 “
                    <span class="ponit">DNS</span> ” 选项部分
                  </p>
                  <div>
                    <img
                      :src="`${staticZhpUrl}dns/pingban/ios-step3.jpg`"
                      alt
                    />
                  </div>
                </li>
                <li>
                  <p>
                    4. 修改配置 DNS 为 “
                    <span class="ponit">手动</span> ”
                  </p>
                  <div>
                    <img
                      :src="`${staticZhpUrl}dns/pingban/ios-step4.jpg`"
                      alt
                    />
                  </div>
                </li>
                <li>
                  <p>
                    5. 在弹出的键盘上输入您需要更改的 DNS 数值, 本例子中我们使用
                    “
                    <span class="ponit">8.8.8.8</span> ”
                  </p>
                  <div>
                    <img
                      :src="`${staticZhpUrl}dns/pingban/ios-step5.jpg`"
                      alt
                    />
                  </div>
                </li>
                <li>
                  <p>
                    6. 点击 “
                    <span class="ponit">无线局域网</span> ” 退出, 并重启 ipad
                    设备使设置生效
                  </p>
                  <div>
                    <img
                      :src="`${staticZhpUrl}dns/pingban/ios-step6.png`"
                      alt
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- .......返回鍵....... -->
          <div class="back">
            <a href="javascript:;" @click="$router.replace({ name: 'dns' })">
              <span>知道了，返回DNS首页</span>
              <img :src="`${staticZhpUrl}dns/arrow-blue.png`" alt />
            </a>
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
