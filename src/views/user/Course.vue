<template>
  <div class="CourseCommon" v-title="'电脑教程'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="content">
      <main>
        <section class="web-tutorial">
          <!-- ....... 麵包屑 ....... -->
          <ul class="breadcrumbs">
            <li>
              <a href="index.html">DNS首頁</a>
            </li>
            <li>
              电脑教程
            </li>
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
              class="img web"
              :style="
                `background-image: url(${staticZhpUrl}dns/web/computer-tutorial.jpg)`
              "
            >
              <div class="img-bg">电脑教程</div>
            </div>
            <div class="right-btn">
              <a
                href="javascript:;"
                @click="$router.replace({ name: 'course2' })"
                >平板教程</a
              >
            </div>
          </div>

          <!-- .......教程按鈕....... -->
          <div class="tutorial-button-box">
            <div class="tutorial-button-title"></div>
            <ul class="tutorial-button">
              <!-- <li>
                    <a href="#key-change-tutorial">一键修改</a>
                </li> -->
              <li>
                <a
                  href="javascript:;"
                  :class="{ activeA: index == 0 }"
                  @click="change"
                  >手动教程</a
                >
              </li>
              <li>
                <a
                  href="javascript:;"
                  :class="{ activeA: index == 1 }"
                  @click="change1"
                  >Mac教程</a
                >
              </li>
            </ul>
          </div>

          <div class="main-box">
            <div id="manual-tutorial" class="manual-tutorial" v-if="index == 0">
              <h3>方法一</h3>
              <ul>
                <li>
                  <p>
                    1. 点击右键 dns.bat 文件, 选择 “
                    <span class="ponit">以管理员身份运行</span> ”
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/web/1-step1.png`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    2. 安装杀毒软件会提示, 关掉杀毒软件或者点击 “
                    <span class="ponit">允许本次操作</span> ”
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/web/1-step2.png`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    3. 更换成功后会出现此页面提示
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/web/1-step3.png`" alt="" />
                  </div>
                </li>
              </ul>
              <h3>方法二</h3>
              <ul>
                <li>
                  <p>
                    1. 请连接到网络更改设备的 DNS 设置, 请先点击小电脑图标,
                    然后再点击 “ <span class="ponit">打开网络和共享中心</span> ”
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/web/2-step1.png`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    2. 网络和共享中心的左边列表中找到 “
                    <span class="ponit">更改适配器设置</span> ” 点击
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/web/2-step2.png`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    3. 网络连接列表中找到自己连接的网络「本地连接」点击右键,
                    右键列表中点击 “
                    <span class="ponit">打开网络和共享中心</span> ”
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/web/2-step3.png`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    4. 在弹出的连接属性中选择 “
                    <span class="ponit">Internet协议版本4(TCP/IPv4)</span> ”,
                    然后点击 “ <span>属性</span> ”
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/web/2-step4.png`" alt="" />
                  </div>
                </li>
                <li>
                  <p>
                    5. 在弹出的属性窗又中点击 “
                    <span class="ponit">使用下面的 DNS 服务器地址</span> ”,
                    然后在服务器中输入更改的 DNS, 最后点击 “
                    <span class="ponit">确定</span> ” 即可
                  </p>
                  <div>
                    <img :src="`${staticZhpUrl}dns/web/2-step5.png`" alt="" />
                  </div>
                </li>
              </ul>
            </div>
            <!-- ......mac教程....... -->
            <div id="mac-tutorial" class="mac-tutorial" v-if="index == 1">
              <ul>
                <li>
                  <p>
                    1. 单击最左上角的苹果图标, 在下拉菜单中点击 “
                    <span class="ponit">系统偏好设置</span> ” 进入设置
                  </p>
                  <div>
                    <img
                      class="img-508"
                      :src="`${staticZhpUrl}dns/web/step1.jpg`"
                      alt=""
                    />
                  </div>
                </li>
                <li>
                  <p>
                    2. 单击 “ <span class="ponit">网络</span> ” 图标进入网络设置
                  </p>
                  <div>
                    <img
                      class="img-508"
                      :src="`${staticZhpUrl}dns/web/step2.jpg`"
                      alt=""
                    />
                  </div>
                </li>
                <li>
                  <p>
                    3. 从列表中选择相应的网络连接服务, 然后单击 “
                    <span class="ponit">高级</span> ” 选项
                  </p>
                  <div>
                    <img
                      class="img-508"
                      :src="`${staticZhpUrl}dns/web/step3.jpg`"
                      alt=""
                    />
                  </div>
                </li>
                <li>
                  <p>
                    4. 点击DNS的选项卡, 然后点击左下角 “ + ”, 添加
                    <span class="ponit"> 8.8.8.8 和 8.8.4.4 </span>, 单击 “ 好 ”
                  </p>
                  <div>
                    <img
                      class="img-508"
                      :src="`${staticZhpUrl}dns/web/step4.jpg`"
                      alt=""
                    />
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

<style lang="scss"></style>
