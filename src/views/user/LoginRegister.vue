<template>
  <div class="big-box">
    <transition name="fade">
      <div
        class="loginRegister"
        v-show="loginShow == '1'"
        @keydown.enter="keyDown"
      >
        <div class="content">
          <div class="top">
            <img src="../../assets/images/login.png" alt />
            <i class="iconfont" @click="close">&#xe60e;</i>
          </div>
          <div v-if="registerSuccess == '1'" class="SuccessWrap">
            <div class="title flexC">
              <div class="iconBg flexC">
                <i class="iconfont">&#xe755;</i>
              </div>
              <h5>恭喜您，注册成功！</h5>
            </div>
            <div class="boxWrap">
              <div class="box flexB">
                <div>
                  <i class="iconfont">&#xe755;</i>
                  <span>会员账号:</span>
                </div>
                <p>{{ userInfo.username }}</p>
              </div>
              <div class="box flexB">
                <div>
                  <i class="iconfont">&#xe755;</i>
                  <span>会员密码:</span>
                </div>
                <p>{{ password }}</p>
                <!-- <p v-if="registerPassword">{{ registerPassword }}</p> -->
              </div>
              <div class="box flexB">
                <div>
                  <i class="iconfont">&#xe755;</i>
                  <span>账户余额:</span>
                </div>
                <p>{{ userInfo.coin }}</p>
              </div>
              <div class="bottom flexC" @click="depositNow">立即存款</div>
            </div>
          </div>
          <div v-else class="btm">
            <!--            <div class="title">-->
            <!--              <span-->
            <!--                v-for="(item, i) in titleList"-->
            <!--                :key="i"-->
            <!--                :class="{ active: item.type === activeType }"-->
            <!--                @click="changeTitle(item.type)"-->
            <!--                >{{ item.title }}</span-->
            <!--              >-->
            <!--            </div>-->
            <div class="login" v-show="activeType === 'login'">
              <el-input
                placeholder="用户名/手机号"
                v-model="login.username"
              ></el-input>
              <el-input
                placeholder="密码"
                v-model="login.password"
                show-password
              ></el-input>
              <el-input
                placeholder="验证码"
                v-model="login.verifyCode"
                maxlength="4"
              >
                <i slot="suffix" class="code" @click="changeCodeImg">
                  <img :src="codeImg" alt="点击重新获取" />
                </i>
              </el-input>
              <p>
                <span @click="service">
                  <b>忘记密码？</b>
                </span>
                <span @click="goRegisters">
                  没有账号？
                  <b>在此注册</b>
                </span>
              </p>
              <div>
                <span @click="registerFrees">试玩</span>
                <span @click="goToLogin">立即登陆</span>
              </div>
              <span>
                <b>{{ allConfig.webName }}欢迎您</b>
              </span>
            </div>
            <!--            <div class="register" v-show="activeType === 'register'">-->
            <!--              <div class="box">-->
            <!--                <div>-->
            <!--                  <el-input-->
            <!--                    placeholder="用户名(5-15个字母或数字组合)"-->
            <!--                    v-model="register.username"-->
            <!--                  ></el-input>-->
            <!--                  <el-input-->
            <!--                    placeholder="设置密码(6~12个包含字母和数字的组合)"-->
            <!--                    show-password-->
            <!--                    v-model="register.password"-->
            <!--                  ></el-input>-->
            <!--                  <el-input-->
            <!--                    placeholder="再次输入密码"-->
            <!--                    show-password-->
            <!--                    v-model="register.password_confirm"-->
            <!--                  ></el-input>-->
            <!--                  <div-->
            <!--                    v-for="(FieldItem, i) in registerBeforeList.paramsList"-->
            <!--                    :key="i"-->
            <!--                  >-->
            <!--                    <el-input-->
            <!--                      v-if="FieldItem.formtype != 'select'"-->
            <!--                      :type="FieldItem.formtype"-->
            <!--                      :placeholder="-->
            <!--                        '请输入' +-->
            <!--                          FieldItem.name +-->
            <!--                          (FieldItem.isrequired ? '(必填)' : '(选填)')-->
            <!--                      "-->
            <!--                      v-model="register[FieldItem.field]"-->
            <!--                      :readonly="readOnly && FieldItem.field == 'xcode'"-->
            <!--                    ></el-input>-->
            <!--                    <el-select-->
            <!--                      v-else-->
            <!--                      v-model="register[FieldItem.field]"-->
            <!--                      placeholder="请选择银行卡"-->
            <!--                    >-->
            <!--                      <el-option-->
            <!--                        v-for="item in bankList"-->
            <!--                        :key="item.id"-->
            <!--                        :label="item.name"-->
            <!--                        :value="item.id"-->
            <!--                      ></el-option>-->
            <!--                    </el-select>-->
            <!--                  </div>-->
            <!--                  <el-input-->
            <!--                    v-show="otherBankShowFlag"-->
            <!--                    v-model="otherBankName"-->
            <!--                    placeholder="请输入银行名称"-->
            <!--                  ></el-input>-->
            <!--                  <el-input-->
            <!--                    placeholder="输入验证码"-->
            <!--                    v-model="register.verifyCode"-->
            <!--                    maxlength="4"-->
            <!--                  >-->
            <!--                    <i slot="suffix" class="code" @click="changeCodeImg">-->
            <!--                      <img :src="codeImg" alt="点击重新获取" />-->
            <!--                    </i>-->
            <!--                  </el-input>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="read">-->
            <!--                <input-->
            <!--                  type="checkbox"-->
            <!--                  name-->
            <!--                  id="keep"-->
            <!--                  v-model="register.accept"-->
            <!--                />-->
            <!--                <label for="keep"></label>-->
            <!--                <span>-->
            <!--                  注册即同意{{ allConfig.webName }}-->
            <!--                  <b @click="showFlag = true">服务协议</b>-->
            <!--                </span>-->
            <!--              </div>-->
            <!--              <div class="registerBtn" @click="goRegister">立即注册</div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div @click="showFlag = false" class="popup" v-show="showFlag">
        <div class="content" @click.stop>
          <span @click="showFlag = false">x</span>
          <div>
            <div class="clause-list">
              <h3>一、相关定义</h3>
              <p>
                1、用户：指在{{ allConfig.webName }}注册登记，并得到{{
                  allConfig.webName
                }}在线认可，有资格享受{{ allConfig.webName }}服务的注册会员
              </p>
              <p>
                2、购彩：指注册的用户可在本站购买彩票，并且对所购买的彩票拥有完整的奖金获得权利。
              </p>
              <p>
                3、用户资料：指用户在注册时提供的个人信息，包括：用户名、注册帐户密码、银行卡帐号、用户真实姓名等。
              </p>

              <h3>二、本协议服务范围</h3>
              <p>
                本协议服务范围包括：提供购彩平台；提供彩票相关资讯；提供彩票信息交互平台；提供在线预付支付结算服务。
              </p>
              <p>
                本协议服务范围不包括向注册会员提供电脑终端及其附属设备、网络和通信等资源。
              </p>
            </div>
            <div class="clause-list">
              <h3>三、用户的权利</h3>
              <p>
                1、帐户管理权。用户有权随时查询用户资料，并可对用户名、用户真实姓名以外的信息进行修改。
              </p>
              <p>
                2、免费使用权。用户有权免费使用{{
                  allConfig.webName
                }}的彩票投注系统以及免费获得彩票资讯。
              </p>
              <p>
                3、彩票查询权。用户通过{{
                  allConfig.webName
                }}购彩成功后，有权免费在{{
                  allConfig.webName
                }}查询所购买的彩票的状态。
              </p>
              <p>
                4、奖金获得权。用户通过{{
                  allConfig.webName
                }}购彩成功的，若彩票中奖，用户有权获得相应奖金。
              </p>
              <p>5、帐户核查权。用户可以随时对帐户进行资金余额核查。</p>
              <p>
                6、申请提款权。用户在任何时间都可对自己的余额申请提款，{{
                  allConfig.webName
                }}在核对用户资金来源正常的情况下，在收到提款请求3个工作日内将用户预付款中需提取的款项转帐到用户注册的银行账户上。用户提款转帐所产生的银行费用由用户承担。
                当用户余额小于转帐所需的银行费用时，请及时联系客服处理。
              </p>
            </div>
            <div class="clause-list">
              <h3>四、用户的义务</h3>
              <p>
                1、全面遵守本协议的义务。在注册登记成为{{
                  allConfig.webName
                }}用户之前，须认真阅读、理解本协议各条款，一经注册成功即视为同意本协议全部条款，用户有义务全面遵守本协议。
              </p>
              <p>
                2、如实提供用户资料义务。为保障用户的合法权益，避免在中奖时出现用户注册资料与真实情况不符导致兑奖不能等情况，请用户按照真实、全面、准确的原则提供用户资料。因用户资料不真实、不全面、不准确造成不能兑奖、不能提款等情况，由用户承担全部责任。
              </p>
              <p>
                3、对应注册义务。严禁任何形式的重复注册及多次恶意注册，因此而造成的一切后果，由用户自行承担。同时，为保证用户的安全性，用户应以一个银行卡帐号对应一个用户真实姓名名，因银行卡帐号与用户真实姓名不能一一对应而产生的不利后果，由用户自行承担。
              </p>
              <p>
                4、保持用户名义务。为保护用户帐户的安全性，用户名、用户真实姓名、银行卡号一经注册确认后，不得再行更改。
              </p>
              <p>
                5、保护帐户资料义务。用户帐户资料包括用户密码、个人帐号以及用户帐号操作所需的资料。用户务必对其帐户资料自行保密，以免帐号资料被盗用或篡改。因用户保护不周导致帐户资料被盗用或篡改而给用户造成的任何损失及法律责任由用户自行承担。
              </p>
              <p>
                6、遵守网络安全管理的义务。用户不得利用{{
                  allConfig.webName
                }}制作、复制和传播下列信息：
              </p>
              <p>（1）煽动抗拒、破坏宪法和法律、行政法规实施的；</p>
              <p>（2）煽动颠覆国家政权，推翻社会主义制度的；</p>
              <p>（3）煽动分裂国家、破坏国家统一的；</p>
              <p>（4）煽动民族仇恨、民族歧视，破坏民族团结的；</p>
              <p>（5）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；</p>
              <p>
                （6）宣扬迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；
              </p>
              <p>
                （7）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；
              </p>
              <p>（8）损害国家机关信誉的；</p>
              <p>
                （9）其他违反宪法、法律、行政法规、行政规章、地方性法规的行为。
              </p>
              <p>
                7、保护网站安全的义务。禁止以任何方式对{{
                  allConfig.webName
                }}进行各种破坏行为。
              </p>
              <p>
                8、承担银行费用的义务。在申请提款至用户银行卡的银行费用由用户承担。
              </p>
            </div>
            <div class="clause-list">
              <h3>五、{{ allConfig.webName }}的权利</h3>
              <p>
                1、管理用户帐户的权利。如果用户提供的资料包含有第四条第3款多次恶意注册信息或第7款所列信息，{{
                  allConfig.webName
                }}保留冻结其用户账户、注销其用户帐户或者限制其使用全部或部分服务内容的权利。一经发现用户利用{{
                  allConfig.webName
                }}制作、复制和传播的信息明显属于第三条第7款所列信息之一的，{{
                  allConfig.webName
                }}将立即采取屏蔽信息、发出警告、直至关闭用户帐户等措施。
              </p>
              <p>
                2、修改本协议条款的权利。{{
                  allConfig.webName
                }}有权在必要时修改协议条款，协议条款一旦发生变动，将会在{{
                  allConfig.webName
                }}相关页面上提示或公告修改内容。如果不同意所改动的内容，用户可以主动取消获得的服务。如果用户继续享用服务，则视为接受服务条款的变动。{{
                  allConfig.webName
                }}保留随时修改或中断服务而不需知照用户的权利。主要包括以下情况：
              </p>
              <p>
                （1）增加或减少彩票品种。{{
                  allConfig.webName
                }}的彩票品种以当期可以实现购买的品种为准，长期或临时增加或减少彩票品种均不需事先告知用户。
              </p>
              <p>
                （2）调整彩票销售截止时间的权利。{{
                  allConfig.webName
                }}有权根据彩票种类和当期销售情况调整彩票销售截止时间，而不需事先告知用户。
              </p>
              <p>
                3、在用户向{{ allConfig.webName }}提出购彩请求后，{{
                  allConfig.webName
                }}有权从其余额提取请求购彩所需的款项金额。
              </p>
              <p>
                4、兑奖、领取奖金、分配奖金的权利和义务。在彩票中奖情况下，由{{
                  allConfig.webName
                }}根据中奖比例计算出的中奖金额，直接汇入中奖用户。
              </p>
              <p>
                5、制止公款购彩的权利。{{
                  allConfig.webName
                }}有权拒绝非个人资金通过{{
                  allConfig.webName
                }}购买彩票，一旦发现有款项自非个人帐户资金转入用户预付款帐户，{{
                  allConfig.webName
                }}有权采取强行将款项退回原帐户、终止协议等措施。{{
                  allConfig.webName
                }}并将向有关管理机关报告。
              </p>
              <p>
                6、制止未满18周岁的未成年人购买彩票的权利。如未成年人提供虚假用户资料冒充成年人的，其在{{
                  allConfig.webName
                }}进行的一切彩票购买行为将自始无效，由此给{{
                  allConfig.webName
                }}及其本人造成的损失以及不能领奖的后果均由该未成年人及其法定代理人承担。
              </p>
            </div>
            <div class="clause-list">
              <h3>六、{{ allConfig.webName }}的义务</h3>
              <p>
                1、用户帐户资料保护义务。{{
                  allConfig.webName
                }}对用户帐户资料提供最大限度的安全保护。当{{
                  allConfig.webName
                }}用户涉嫌盗用他人第三方支付渠道（如：银联、财付通、支付宝等）帐户资金，或涉嫌其第三方支付渠道帐户被盗用的，应涉嫌被盗用人或第三方支付公司的要求，在其承诺仅将用户资料用于涉嫌盗用事件并予以保密的前提下，{{
                  allConfig.webName
                }}将向请求方提供涉嫌盗用人的用户资料。{{
                  allConfig.webName
                }}用户同意放弃在此情况下向{{
                  allConfig.webName
                }}追究任何责任的权利。
              </p>
              <p>
                2、公布中奖情况的义务。在官方彩票发行和销售机构发布中奖结果后，{{
                  allConfig.webName
                }}以官方彩票发行机构和销售机构公布的中奖情况为准。
              </p>
              <p>
                3、转帐义务。在达到一定投注量情况下，用户在任何时间都可对自己的余额申请提款，{{
                  allConfig.webName
                }}在核对用户资金来源正常的情况下，在收到提款请求3个工作日内将用户需提取的款项转帐到用户注册的银行账户上。
              </p>
            </div>
            <div class="clause-list">
              <h3>七、协议成立、变更和终止</h3>
              <p>
                1、因网络故障、超过指定购买时间、金额不足等原因，未能完成购彩的。{{
                  allConfig.webName
                }}将返还用户预付资金。
              </p>
              <p>
                2、{{
                  allConfig.webName
                }}有权对本协议条款进行变更而无需事先通知用户。
              </p>
              <p>
                3、任何一方未能履行本协议规定的任何义务，且在收到另一方发出更正通知15日内未能改正错误的，均被视为自动放弃本协议，协议同时终止。
              </p>
              <p>
                4、一经发现公款购彩嫌疑、未成年人购彩嫌疑等本协议禁止的情况，{{
                  allConfig.webName
                }}有权立即终止协议。
              </p>
            </div>
            <div class="clause-list">
              <h3>八、免责条款</h3>
              <p>
                发生下列情况时，{{ allConfig.webName }}不予承担任何法律责任：
              </p>
              <p>
                1、用户资料泄露。由于用户将密码告知他人或与他人共享注册帐户，或由于用户的疏忽，由此导致的任何个人资料泄露，以及由此产生的纠纷。
              </p>
              <p>
                无论何种原因导致的用户资料未授权使用、修改，用户密码、个人帐号或注册信息被未授权篡改、盗用而产生的一切后果。
              </p>
              <p>
                2、不可抗力及不可预见的情势发生。不可抗力和不可预见情势包括：自然灾害、政府行为、罢工、战争等；黑客攻击、计算机病毒侵入或发作、政府管制、彩票发行和销售机构的原因、彩票出票机或服务的故障、网络故障、国家政策变化、法律法规之变化等。因不可抗力和不可预见情势造成：暂时性关闭，用户资料或购彩指令泄露、丢失、被盗用、被篡改，购彩失败，{{
                  allConfig.webName
                }}未能收到购彩指令等，以及由此产生的纠纷。
              </p>
              <p>因不可抗力和不可预见的情势造成本协议不能履行的。</p>
              <p>
                3、用户原因或第三方原因造成损失。由于用户自身原因、或违反法律法规，以及第三方的原因，造成用户无法使用{{
                  allConfig.webName
                }}服务或产生其他损失的。
              </p>
              <p>
                4、用户购彩而产生的损失。用户根据本协议进行购彩而发生的直接、间接、偶然、特殊及继起的损害。
              </p>
              <p>
                5、用户使用链接或下载资料产生的损害。由于使用与{{
                  allConfig.webName
                }}链接的其它网站，或者使用通过{{
                  allConfig.webName
                }}下载或取得的资料，造成用户资料泄露、用户电脑系统损坏等情况及由此而导致的任何争议和后果。
              </p>
            </div>
            <div class="clause-list">
              <h3>九、合同组成</h3>
              <p>
                {{
                  allConfig.webName
                }}主页以及其他页面有关（包括但不限于）会员注册流程、变更流程、购彩流程、会员支付与结算、相关奖励、会员服务等运营内容的细则以及法律声明均为本协议的有效组成部分，是对本协议的解释扩充，与本协议有着相同的法律效力。
              </p>
              <p>
                用户资料隐私保护、网站禁止行为、网站知识产权保护等约定详见《法律声明》。
              </p>
            </div>
            <div class="clause-list">
              <h3>-------------------注意事项-------------------</h3>
              <p>
                1、禁止未满18周岁(未成年)者在本站注册。同时，不提倡学生购买彩票，其中也包括在校大学生。
              </p>
              <p>
                2、为确保您的购买申请能及时成功提交，请您务必在当期购买申请前有足够款项在您的账号。
              </p>
              <p>
                3、在使用网络支付平台时请注意：无论使何种网络支付系统时都将收取一定的手续费。
              </p>
              <p>
                4、请确认您的电子邮箱地址为长期使用之有效邮箱。并随时留意查收本站的邮件。
              </p>
              <p>5、有任何疑问请及时与我们取得联系。</p>
              <p>提醒：购买彩票有风险，在线投注需谨慎</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { register, goLogin, registerFree } from "../../api";
import { Base64 } from "js-base64";
// import BScroll from "better-scroll";
// import { userInfo } from "os";
export default {
  name: "LoginRegister",
  data() {
    return {
      showFlag: false,
      // titleList: [
      // { title: "登录", type: "login" },
      // { title: "注册", type: "register" }
      // ],
      activeType: "login",
      login: {
        username: "",
        password: "",
        verifyCode: ""
      },
      register: {
        username: "",
        password: "",
        password_confirm: "",
        verifyCode: "",
        accept: true,
        name: "",
        qq: "",
        mobile: "",
        email: "",
        coinPassword: "",
        bankId: "",
        cardNo: "",
        weixin: "",
        xcode: "",
        mobiles: "",
        verifyCodes: ""
      },
      codeImg: "",
      bankList: [],
      registerField: [],
      xcode: "",
      otherBankShowFlag: "",
      otherBankName: ""
      // registerSuccess: false
    };
  },
  created() {
    this.codeImg = "/api/auth/captcha";
    // if (!this.once) {
    //   registerBefore().then(res => {
    //     console.log(res, "registerBefore");
    //     this.$store.commit("SET_REGISTER_BEFORE_LIST", res.data);
    //     this.setXcode();
    //     let list = res.data.paramsList;
    //     this.registerField = list;
    //     for (let i = 0; i < list.length; i++) {
    //       let tempField = list[i].field;
    //       if (tempField === "xcode") {
    //         this.register[tempField] = this.xcode;
    //       } else {
    //         this.register[tempField] = "";
    //       }
    //     }
    //     this.bankList = res.data.bankList;
    //   });
    // }
  },
  computed: {
    ...mapGetters([
      "allConfig",
      "userInfo",
      "registerBeforeList",
      "registerSuccess",
      "password",
      "loginShow"
    ]),
    readOnly() {
      return !!this.xcode;
    }
    // once() {
    //   return this.registerBeforeList && this.registerBeforeList.paramsList;
    // }
  },
  watch: {
    "register.bankId": {
      handler(newVal) {
        // console.log(newVal);
        if (newVal == "10000") {
          this.otherBankShowFlag = true;
          return;
        }
        this.otherBankShowFlag = false;
      },
      deep: true
    }
  },
  methods: {
    service() {
      window.open(
        this.allConfig.kefuGG,
        "_blank",
        "height=700, width=1200, top=100, left=100"
      );
    },
    close() {
      this.$store.commit("SET_LOGIN_SHOW", "0");
      this.$store.commit("SET_REGISTER_SUCCESS", "0");
    },
    // changeTitle(type) {
    //   this.activeType = type;
    // },
    // registerScroll() {
    //   let wrapper = document.querySelector(".box");
    //   new BScroll(wrapper, {
    //     scrollY: true,
    //     mouseWheel: true
    //   });
    // },
    changeCodeImg() {
      this.login.verifyCode = "";
      this.register.verifyCode = "";
      this.codeImg = "/api/auth/captcha?" + Math.random();
    },
    setXcode() {
      let xcode = this.$route.params.xcode || "";
      let cookieXcode = this.$cookies.get("xcode") || "";
      if (cookieXcode !== "" && /^[1-9]\d*$/.test(cookieXcode)) {
        xcode = cookieXcode;
      }
      if (xcode !== "" && !/^[1-9]\d*$/.test(xcode)) {
        xcode = "";
      }
      if (xcode !== "" && parseInt(xcode) >= 0) {
        this.$cookies.set("xcode", xcode, "1D");
      }
      this.xcode = xcode;
    },
    bankName(bank) {
      for (let i = 0; i < this.bankList.length; i++) {
        let bankListOne = this.bankList[i];
        if (bankListOne.id === bank) {
          return bankListOne.name;
        }
      }
    },
    goToLogin() {
      if (!this.login.username) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "用户名不能为空",
          duration: 1000
        });
      }
      if (!this.login.password) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "密码不能为空",
          duration: 1000
        });
      }
      if (!this.login.verifyCode) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入验证码",
          duration: 1000
        });
      }
      this.$cookies.set("username", Base64.encode(this.login.username), "7d");
      // if (this.keep) {
      //   this.$cookies.set("password", Base64.encode(this.user.password), "7d");
      // } else {
      //   if (this.$cookies.get("password")) this.$cookies.remove("password");
      // }
      goLogin(this.login).then(res => {
        // console.log(res, "登录信息---------------------------------------");
        if (res.status) {
          this.$message({
            type: "success",
            showClose: true,
            message: res.msg,
            duration: 1000
          });
          this.$store.commit("SET_USER_INFO", res.data);
          this.$store.dispatch("userDetails");
          this.close();
          this.$router.push({ name: "HOME" });
        } else {
          this.changeCodeImg();
          this.$message({
            type: "error",
            showClose: true,
            message: res.msg,
            duration: 1000
          });
        }
      });
    },
    goRegisters() {
      this.close();
      this.$router.push({ name: "about", query: { index: "register" } });
    },
    goRegister() {
      if (!this.register.username) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "用户名不能为空",
          duration: 1000
        });
      } else {
        if (!/^[a-zA-Z0-9_-]{5,15}$/.test(this.register.username)) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请按照要求填写用户名（5~15个字母或数字）",
            duration: 1000
          });
        }
      }
      if (!this.register.password || !this.register.password_confirm) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "密码不能为空",
          duration: 1000
        });
      } else {
        if (
          !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,12}$/.test(
            this.register.password
          )
        ) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请按要求填写密码（6~12个包含字母和数字的组合）",
            duration: 1000
          });
        } else {
          if (this.register.password !== this.register.password_confirm) {
            return this.$message({
              type: "error",
              showClose: true,
              message: "两次输入的密码不同",
              duration: 1000
            });
          }
        }
      }
      for (let i = 0; i < this.registerField.length; i++) {
        let item = this.registerField[i];
        if (item.isrequired) {
          if (!this.register[item.field]) {
            return this.$message({
              type: "error",
              showClose: true,
              message: "请输入" + item.name,
              duration: 1000
            });
          } else {
            if (item.pattern) {
              if (!this.$_eval(item.pattern).test(this.register[item.field])) {
                return this.$message({
                  type: "error",
                  showClose: true,
                  message: item.errortips,
                  duration: 1000
                });
              }
            }
          }
        }
      }
      if (this.allConfig.isOpenSmsReg == "1") {
        if (!this.register.mobiles) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请输入常用手机号",
            duration: 1000
          });
        }
        if (!this.register.verifyCodes) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请输入短信验证码",
            duration: 1000
          });
        }
      } else {
        if (!this.register.verifyCode) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请输入验证码",
            duration: 1000
          });
        }
      }
      if (!this.register.accept) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请阅读并同意法律声明",
          duration: 1000
        });
      }
      let users = { ...this.register };
      if (this.otherBankShowFlag) {
        if (!/^([\u4e00-\u9fa5]){4,10}$/.test(this.otherBankName)) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请输入正确的开户银行名称",
            duration: 1000
          });
        }
        users.bankName = this.otherBankName;
      } else {
        users = {
          ...this.register,
          bankName: this.bankName(this.register.bankId)
        };
      }
      // console.log(users, "注册数据--------------");
      register(users).then(res => {
        if (res.status) {
          this.$message({
            type: "success",
            showClose: true,
            message: res.msg,
            duration: 1000
          });
          this.$store.commit("SET_USER_INFO", res.data);
          this.registerSuccess = true;
          this.$store.dispatch("userDetails");
        } else {
          this.$message({
            type: "error",
            showClose: true,
            message: res.msg,
            duration: 1000
          });
          this.changeCodeImg();
        }
      });
    },
    keyDown() {
      if (this.activeType === "login") {
        this.goToLogin();
      } else {
        this.goRegister();
      }
    },
    registerFrees() {
      registerFree().then(res => {
        let type;
        if (res.status) {
          type = "success";
          this.$store.commit("SET_USER_INFO", res.data);
          this.close();
          this.$router.push({ name: "HOME" });
        } else {
          type = "error";
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg,
          duration: 1000
        });
      });
    },
    depositNow() {
      this.close();
      this.$parent.userShow = true;
      this.$parent.$children[1].componentsName = "Recharge";
      // this.registerSuccess = false;
    }
  }
};
</script>

<style scoped lang="scss">
.loginRegister {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 426px;
    .top {
      height: 108px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .iconfont {
        position: absolute;
        font-size: 34px;
        right: 6px;
        top: 60px;
        color: #fff;
        cursor: pointer;
      }
    }
    .SuccessWrap {
      background: linear-gradient(#434343, #000000);
      border-radius: 0 0 8px 8px;
      height: 360px;
      .title {
        padding: 20px 0;
        .iconBg {
          background: linear-gradient(#fe8c00, #f83600);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          i {
            color: #fff;
            font-size: 26px;
          }
        }
        h5 {
          font-size: 18px;
          color: #f83600;
          margin-left: 20px;
        }
      }
      .boxWrap {
        width: 300px;
        margin: auto;
        font-size: 16px;
        .box {
          border: 1px solid #666666;
          padding: 8px;
          margin-bottom: 20px;
          i {
            margin-right: 10px;
          }
          // span{
          //   color: #000;
          // }
          div,
          p {
            color: #fea24d;
          }
        }
        .bottom {
          height: 40px;
          background: linear-gradient(#fe8c00, #f83600);
          color: #fff;
          border-radius: 6px;
          margin-top: 30px;
          cursor: pointer;
        }
      }
    }
    .btm {
      background: linear-gradient(#434343, #000000);
      overflow: hidden;
      border-radius: 0 0 8px 8px;
      .title {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        span {
          display: inline-block;
          width: 102px;
          text-align: center;
          color: #fff;
          opacity: 0.8;
          font-size: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid #5c5c5c;
          cursor: pointer;
          box-sizing: border-box;
          &.active {
            border-bottom: 3px solid #ff8514;
          }
        }
      }
      .login {
        width: 309px;
        margin: auto;
        .el-input {
          margin-top: 30px;
          position: relative;
          .code {
            position: absolute;
            right: -3px;
            top: 2px;
            width: 90px;
            height: 37px;
            border-radius: 5px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        p {
          text-align: right;
          line-height: 50px;
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
          span {
            cursor: pointer;
            b {
              color: #ff8514;
              font-weight: normal;
            }
          }
        }
        > div {
          display: flex;
          justify-content: space-between;
          span {
            display: inline-block;
            cursor: pointer;
            &:first-child {
              width: 107px;
              height: 39px;
              border-radius: 4px;
              border: solid 1px #bcbcbc;
              text-align: center;
              line-height: 39px;
              color: #fff;
              opacity: 0.8;
            }
            &:nth-child(2) {
              width: 192px;
              height: 39px;
              line-height: 39px;
              text-align: center;
              color: #fff;
              background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%),
                linear-gradient(90deg, #ff5e62 0%, #ff9966 100%),
                linear-gradient(#000000, #000000);
              border-radius: 4px;
            }
          }
        }
        > span {
          display: block;
          text-align: center;
          margin-top: 30px;
          margin-bottom: 10px;
          b {
            position: relative;
            color: #5c5c5c;
            &::after {
              position: absolute;
              content: "";
              height: 1px;
              width: 60px;
              background-color: #5c5c5c;
              left: -70px;
              top: 10px;
            }
            &::before {
              position: absolute;
              content: "";
              height: 1px;
              width: 60px;
              background-color: #5c5c5c;
              left: 108px;
              top: 10px;
            }
          }
        }
      }
      .register {
        width: 309px;
        margin: auto;
        .el-input {
          margin-top: 30px;
          position: relative;
          .code {
            position: absolute;
            right: -3px;
            top: 2px;
            width: 90px;
            height: 37px;
            border-radius: 5px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .el-select {
          margin-top: 30px;
          width: 100%;
        }
        .box {
          height: 320px;
          overflow: auto;
        }
        .read {
          line-height: 50px;
          text-align: center;
          color: #5c5c5c;
          input {
            display: none;
          }
          input + label {
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            width: 16px;
            height: 16px;
            text-align: center;
            line-height: 16px;
            background: linear-gradient(#fe6704, #f37334);
            border-radius: 3px;
            margin-right: 5px;
          }
          input:checked + label::before {
            content: "\2714";
            color: #fff;
          }
          b {
            color: #fe6704;
            font-weight: normal;
            cursor: pointer;
          }
        }
        .registerBtn {
          width: 309px;
          height: 39px;
          text-align: center;
          line-height: 39px;
          color: #fff;
          margin-bottom: 40px;
          background-image: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%),
            linear-gradient(90deg, #ff5e62 0%, #ff9966 100%),
            linear-gradient(#000000, #000000);
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
}
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3000;
  .content {
    background-color: #fff;
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px;
    height: 70%;
    overflow-y: scroll;
    border-radius: 10px;
    h3 {
      text-align: center;
      margin: 20px 0;
      font-size: 17px;
      font-weight: bold;
    }
    span {
      position: absolute;
      right: 20px;
      top: 10px;
      cursor: pointer;
      font-size: 30px;
      color: #000;
    }
    div {
      // overflow-y: scroll;
      // max-height: 500px;
      font-size: 16px;
      color: #666;
    }
  }
  .clause-list p {
    color: #666;
    font-size: 14px;
    line-height: 50px;
  }

  .clause-list h3 {
    font-size: 16px;
    color: #666666;
    line-height: 50px;
    font-weight: bold;
    text-align: center;
  }

  .clause-list:first-child {
    color: #444;
  }
}
</style>
