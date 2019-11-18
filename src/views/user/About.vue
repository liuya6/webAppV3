<template>
  <div class="About" v-title="'关于我们'" @keyup.enter="goRegister">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="content w1200">
      <ul class="listUl">
        <li
          class="flexC"
          v-for="(item, i) in navigationList.footerConfig"
          :key="i"
          @click="changeContent(item.typeName, i)"
        >
          <div
            :class="{
              active:
                i ==
                (homeIndex > navigationList.footerConfig.length - 1
                  ? 0
                  : homeIndex)
            }"
          >
            {{ item.typeName }}
          </div>
        </li>
      </ul>
      <div class="registerRight" v-if="showRegister">
        <div class="registerTitle">会员注册</div>
        <div class="box">
          <div class="inputBox flexS">
            <div class="text">
              用户名
              <span>*</span>
            </div>
            <el-input
              placeholder="用户名(5-15个字母或数字组合)"
              v-model="register.username"
              @blur="testUser(register.username)"
            ></el-input>
            <div
              v-show="register.username && nameTips"
              class="tips flexS"
              :class="nameTips ? 'red' : 'green'"
            >
              <!--              <i class="iconfont" v-html="nameTips?'&#xe727;':'&#xe755;'"></i>-->
              {{ nameTips }}
            </div>
          </div>
          <div class="inputBox flexS">
            <div class="text">
              密码
              <span>*</span>
            </div>
            <el-input
              placeholder="设置密码(6~16个可包含字母和数字或下划线_的组合)"
              show-password
              v-model="register.password"
              @blur="testPassword(register.password)"
            ></el-input>
            <div
              v-show="register.password && passwordTips"
              class="tips flexS"
              :class="passwordTips ? 'red' : 'green'"
            >
              <i
                class="iconfont"
                v-html="passwordTips ? '&#xe727;' : '&#xe755;'"
              ></i>
              {{ passwordTips }}
            </div>
          </div>
          <!--          <div class="inputBox flexS">-->
          <!--            <div class="text">密码强度</div>-->
          <!--            <div class="strength" :class="{'orange':register.password}"></div>-->
          <!--            <div class="strength" :class="{'orange':ifStrength>=1}"></div>-->
          <!--            <div class="strength" :class="{'orange':ifStrength>=2}"></div>-->
          <!--            <div class="strength" :class="{'orange':ifStrength>=3}"></div>-->
          <!--          </div>-->
          <div class="inputBox flexS">
            <div class="text">
              确认密码
              <span>*</span>
            </div>
            <el-input
              placeholder="再次输入密码"
              show-password
              v-model="register.password_confirm"
              @blur="testConfirmPassword()"
            ></el-input>
            <div
              v-show="register.password_confirm && confirmPassword"
              class="tips flexS"
              :class="confirmPassword ? 'red' : 'green'"
            >
              <i
                class="iconfont"
                v-html="confirmPassword ? '&#xe727;' : '&#xe755;'"
              ></i>
              {{ confirmPassword }}
            </div>
          </div>
          <div
            class="inputBox flexS"
            v-for="(FieldItem, i) in registerBeforeList.paramsList"
            :key="i"
          >
            <div class="text">
              {{ FieldItem.name }}
              <span v-if="FieldItem.isrequired">*</span>
            </div>
            <div>
              <el-input
                v-if="FieldItem.formtype != 'select'"
                :type="FieldItem.formtype"
                :placeholder="
                  '请输入' +
                    FieldItem.name +
                    (FieldItem.isrequired ? '(必填)' : '(选填)')
                "
                v-model="register[FieldItem.field]"
                :readonly="
                  !!xcode &&
                    (FieldItem.field == 'xcode' ||
                      FieldItem.field == 'promotionCode')
                "
              ></el-input>
              <el-select
                v-else
                v-model="register[FieldItem.field]"
                placeholder="请选择银行卡"
              >
                <el-option
                  v-for="item in bankList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="inputBox flexS" v-show="otherBankShowFlag">
            <div class="text">
              银行名称
              <!-- <span>*</span> -->
            </div>
            <el-input
              v-model="otherBankName"
              placeholder="请输入银行名称"
            ></el-input>
          </div>
          <div class="mobile" v-if="allConfig.isOpenSmsReg == '1'">
            <div class="inputBox flexS">
              <div class="text">
                常用手机号码
                <span>*</span>
              </div>
              <el-input
                v-model="register.mobiles"
                placeholder="请输入常用手机号码"
                maxlength="11"
              ></el-input>
              <b class="getCodeBtn" @click="getCode">
                {{ registerTime > 0 ? registerTime : "获取验证码" }}
              </b>
            </div>
            <div class="inputBox flexS">
              <div class="text">
                短信验证码
                <span>*</span>
              </div>
              <el-input
                v-model="register.verifyCodes"
                placeholder="输入短信验证码"
              ></el-input>
            </div>
          </div>
          <div class="inputBox flexS" v-else>
            <div class="text">
              验证码
              <span>*</span>
            </div>
            <el-input placeholder="输入验证码" v-model="register.verifyCode">
              <i slot="suffix" class="code" @click="changeCodeImg">
                <img :src="codeImg" alt="点击重新获取" />
              </i>
            </el-input>
          </div>
        </div>
        <div class="lastButton">
          <div class="read">
            <input type="checkbox" name id="keep1" v-model="register.accept" />
            <label for="keep1"></label>
            <span>
              注册即同意{{ allConfig.webName }}
              <b @click="showFlag = true">服务协议</b>
            </span>
          </div>
          <div class="registerBtn" @click="goRegister">立即注册</div>
        </div>
        <div class="remarks">
          <div>备注：</div>
          <p>
            标记有
            <span>*</span>者为必填项目。
          </p>
          <p>取款密码为取款金额时的凭证，请会员务必填写牢记。</p>
          <p>
            温馨提示：注册时如遇到同名或注册不了等其它问题请联系在线客服，我们会第一时间为您解决好！
          </p>
        </div>
      </div>
      <div class="right" v-else-if="navigationList.footerConfig">
        <div
          v-for="(item, i) in navigationList.footerConfig[
            homeIndex > navigationList.footerConfig.length - 1 ? 0 : homeIndex
          ].list"
          :key="i"
        >
          <h3>{{ item.title }}</h3>
          <div v-html="item.content"></div>
        </div>
      </div>
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
    <my-login></my-login>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { registerBefore, register, sendSms } from "../../api";
// import { Base64 } from "js-base64";

export default {
  name: "MOBILE",
  data() {
    return {
      showFlag: false,
      detail: "",
      index: "",
      homeIndex: 0,
      showRegister: false,
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
        verifyCodes: "",
        promotionCode: ""
      },
      xcode: "",
      showOldXcode: false,
      codeImg: "",
      bankList: [],
      registerField: [],
      otherBankShowFlag: "",
      otherBankName: "",
      loginShow: false,
      nameTips: "",
      passwordTips: "",
      confirmPassword: "",
      registerTime: 0,
      timer: null
      // ifStrength: "",
      // topTitle: ""
    };
  },
  created() {
    console.log(this.$route, this.$route.query.promotionCode, "this.$route");
    let i = this.$route.query.index;
    if (i == "register") {
      // this.topTitle = "会员注册";
      this.homeIndex = null;
      this.changeCodeImg();
      this.showRegister = true;
      registerBefore().then(res => {
        this.setXcode();
        console.log(res, "registerBefore");
        this.$store.commit("SET_REGISTER_BEFORE_LIST", res.data);
        let list = res.data.paramsList;
        this.registerField = list;
        for (let i = 0; i < list.length; i++) {
          let tempField = list[i].field;
          console.log(this.showOldXcode, "this.showOldXcode");
          if (!this.xcode) {
            console.log(this.xcode, "this.xcode!!!!!");
            if (tempField === "promotionCode") {
              this.registerField.splice(i, 1);
              console.log(this.registerField, "this.registerField0");
            }
          } else {
            if (this.showOldXcode) {
              if (tempField === "promotionCode") {
                this.registerField.splice(i, 1);
                this.register["xcode"] = this.xcode;
                console.log(this.registerField, "this.registerField1");
              }
            } else {
              if (tempField === "xcode") {
                this.registerField.splice(i, 1);
                this.register["promotionCode"] = this.xcode;
                console.log(this.registerField, "this.registerField2");
              }
            }
          }
        }
        this.bankList = res.data.bankList;
      });
      if (localStorage.getItem("registerTime")) {
        this.registerTime = localStorage.getItem("registerTime");
        if (this.registerTime > 0) {
          this.times();
        }
      }
    } else if (i) {
      this.homeIndex = i;
      // this.topTitle = "关于我们";
      console.log(this.homeIndex, "homeIndexcreated");
    } else {
      this.homeIndex = 0;
    }
  },
  watch: {
    $route(val) {
      console.log(this.homeIndex, "this.homeIndex");
      let i = val.query.index;
      if (i == "register") {
        // this.topTitle = "会员注册";
        this.homeIndex = null;
        console.log(this.homeIndex, "this.homeIndex11");
        this.showRegister = true;
      } else if (i) {
        // this.topTitle = "关于我们";
        this.homeIndex = i;
        console.log(this.homeIndex, "homeIndex");
      } else {
        this.homeIndex = 0;
      }
    }
  },
  methods: {
    setXcode() {
      let xcode = this.$route.query.promotionCode;
      let promotionCode = xcode;
      // console.log(xcode, "xcode00000");
      let cookieXcode = this.$cookies.get("xcode") || "";
      console.log(cookieXcode, "cookieXcode!!!!!!!!!");
      if (xcode && /^[0-9a-zA-Z]+$/.test(xcode)) {
        this.$cookies.set("xcode", xcode, "1D");
      } else {
        xcode = "";
      }
      if (!xcode && /^[0-9a-zA-Z]+$/.test(cookieXcode)) {
        xcode = cookieXcode;
        this.showOldXcode = true;
      }
      this.xcode = xcode;
      console.log(xcode, "xcodexcode");
      console.log(cookieXcode, "cookieXcode");
      if (promotionCode) {
        this.$cookies.remove("oldXcode");
        return;
      }
      let xcode1 =
        this.$route.path.split("/about/")[1] || this.$route.params.xcode || "";
      console.log(this.$route.path.split("/about/")[1], "this.$route");
      console.log(xcode1, "xcode11111111111");
      if (xcode1) {
        this.showOldXcode = true;
        if (!/^[0-9a-zA-Z]+$/.test(xcode1)) {
          xcode1 = "";
        }
        this.$cookies.set("xcode", xcode1, "1D");
        this.$cookies.set("oldXcode", 1, "1D");
        this.xcode = xcode1;
      }
      console.log(
        this.$cookies.get("oldXcode"),
        'this.$cookies.get("oldXcode")'
      );
      console.log(
        this.$cookies.get("oldXcode"),
        !!this.$cookies.get("oldXcode"),
        "***********"
      );
      if (this.$cookies.get("oldXcode")) {
        console.log("????????????");
        this.showOldXcode = true;
      }
    },
    getCode() {
      if (this.registerTime <= 0) {
        if (!this.register.mobiles) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请输入手机号码",
            duration: 1000
          });
        }
        this.registerTime = 60;
        this.times();
        sendSms({ mobile: this.register.mobiles }).then(res => {
          let type;
          if (res.status) {
            type = "success";
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
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "请" + this.registerTime + "秒后再试",
          duration: 1000
        });
      }
    },
    times() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.registerTime--;
        localStorage.setItem("registerTime", this.registerTime);
        if (this.registerTime <= 0) {
          this.registerTime = 0;
          clearInterval(this.timer);
        }
      }, 1000);
    },
    changeContent(typeName, i) {
      if (this.showRegister) {
        this.showRegister = false;
      }
      console.log(typeName, "typeName");
      if (typeName.indexOf("DNS") != -1) {
        this.$router.push({ name: "dns" });
      } else if (typeName.indexOf("技术") != -1) {
        this.$router.push({ name: "technology" });
      } else {
        this.$router.replace({ name: "about", query: { index: i } });
      }
    },
    testUser(name) {
      if (!name) {
        return (this.nameTips = "");
      }
      if (!/^[a-zA-Z0-9_-]{5,15}$/.test(name)) {
        this.nameTips = "用户名:(5~15个字母或数字)";
      } else {
        this.nameTips = "";
      }
    },
    testPassword(t) {
      if (!t) {
        return (this.passwordTips = "");
      }
      if (
        !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_\-@&=.!#$%^&*()+~]{6,12}$/.test(
          t
        )
      ) {
        this.passwordTips = "密码:(6~12个包含字母和数字的组合)";
      } else {
        this.passwordTips = "";
      }
    },
    testConfirmPassword() {
      if (!this.register.password_confirm) {
        return (this.confirmPassword = "");
      }
      if (this.register.password !== this.register.password_confirm) {
        this.confirmPassword = "两次输入的密码不同";
      } else {
        this.confirmPassword = "";
      }
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
            duration: 1500
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
        // !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,12}$/
        if (
          !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_\-@&=.!#$%^&*()+~]{6,16}$/.test(
            this.register.password
          )
        ) {
          return this.$message({
            type: "error",
            showClose: true,
            message: "请按要求填写密码（6~18个包含字母和数字的组合）",
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
      console.log(this.register);
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
        let type = "success";
        if (res.status) {
          this.$store.commit("SET_USER_INFO", res.data);
          this.$store.dispatch("userDetails");
          this.$router.push({ name: "HOME" });
          this.$store.commit("SET_REGISTER_SUCCESS", "1");
          this.$store.commit("SET_PASSWORD", this.register.password);
          this.$store.commit("SET_LOGIN_SHOW", "1");
        } else {
          type = "error";
          this.changeCodeImg();
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg,
          duration: 1000
        });
      });
    },
    changeCodeImg() {
      this.register.verifyCode = "";
      this.codeImg = "/api/auth/captcha?" + Math.random();
    },
    bankName(bank) {
      for (let i = 0; i < this.bankList.length; i++) {
        let bankListOne = this.bankList[i];
        if (bankListOne.id === bank) {
          return bankListOne.name;
        }
      }
    }
  },
  computed: {
    ...mapGetters(["navigationList", "registerBeforeList", "allConfig"]),
    once() {
      console.log(this.registerBeforeList, "this.registerBeforeList");
      return this.registerBeforeList && this.registerBeforeList.paramsList;
    }
  }
};
</script>

<style scoped lang="scss">
.About {
  margin-top: 120px;
  background: #f4f4f4;
  .content {
    display: flex;
    padding: 60px 0;
    ul {
      padding: 0 24px;
      margin-right: 14px;
      background: #fff;
      height: 100%;
      li {
        width: 190px;
        height: 80px;
        border-bottom: 1px solid #ededed;
        color: #4c4c4c;
        cursor: pointer;
        div:hover {
          width: 136px;
          text-align: center;
          height: 46px;
          line-height: 46px;
          font-size: 14px;
          border: none;
          transform: skewX(-16deg);
          color: #fff;
          background: #fe8c00;
          box-shadow: 1px 1px 6px 1px #fe8c00;
        }
      }
      li:last-child {
        border: 0;
      }
      .active {
        width: 136px;
        text-align: center;
        height: 46px;
        line-height: 46px;
        font-size: 14px;
        border: none;
        transform: skewX(-16deg);
        color: #fff;
        background: #fe8c00;
        box-shadow: 1px 1px 6px 1px #fe8c00;
      }
    }
    .right {
      background: #fff;
      width: 1000px;
      min-height: 300px;
      padding: 25px;
      // p {
      //   text-indent: 28px;
      // }
      // span {
      //   font-family: "Adobe 黑体";
      // }
      img {
        min-width: 100%;
      }
      h3 {
        margin: 18px 0;
        color: #000;
        font-size: 17px;
        font-weight: bold;
      }
      div {
        font-size: 16px;
        color: #666;
        line-height: 32px;
      }
    }
    .registerRight {
      background: #fff;
      width: 818px;
      min-height: 485px;
      padding: 0 0 60px 150px;
      .registerTitle {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        padding-top: 40px;
        padding-right: 140px;
      }
      .el-input {
        position: relative;
        width: 300px;
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
        width: 300px;
      }
      .box {
        .inputBox {
          margin-top: 30px;
          .strength {
            width: 50px;
            height: 4px;
            background: #808080;
            margin-right: 8px;
          }
          .orange {
            background: orange;
          }
          .text {
            width: 110px;
          }
          span {
            color: red;
          }
          .tips {
            margin-left: 20px;
            i {
              font-size: 24px;
              margin-right: 10px;
            }
          }
          .red {
            color: red;
          }
          .green {
            color: green;
          }
        }
      }
      .lastButton {
        margin-right: 100px;
        .read {
          line-height: 50px;
          text-align: center;
          color: #5c5c5c;
          margin: 20px 0 20px 0;
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
          width: 320px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: #fff;
          margin: 0 auto;
          // background-image: linear-gradient(90deg, #ee0979, #ff6a00);
          background-image: linear-gradient(90deg, #ff9041, #ff5934);
          border-radius: 4px;
          cursor: pointer;
        }
        .registerBtn:hover {
          background-image: linear-gradient(90deg, #ff6a00, #ff2f00);
        }
      }
      .remarks {
        background: #ffe5df;
        border-radius: 10px;
        padding: 20px 30px;
        margin-top: 30px;
        margin-left: -20px;
        width: 620px;
        div {
          font-size: 16px;
          margin-bottom: 10px;
        }
        p {
          margin-bottom: 10px;
          span {
            color: #ff461c;
          }
        }
      }
    }
    .mobile {
      .getCodeBtn {
        display: inline-block;
        vertical-align: top;
        width: 92px;
        height: 40px;
        box-sizing: border-box;
        text-align: center;
        line-height: 40px;
        background-image: linear-gradient(#ffffff, #ffffff),
          linear-gradient(#eeeeee, #eeeeee);
        border-radius: 4px;
        border: solid 1px #fc8700;
        color: #fc8700;
        font-weight: normal;
        margin-left: 12px;
        cursor: pointer;
        position: absolute;
        left: 307px;
      }
      > div {
        &:nth-child(1) {
          position: relative;
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
  }
}
</style>
