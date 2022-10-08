<template>
  <div class="app-container">
    <div class="main_title">
      <b>{{ $t("personal_title.title") }}</b>
    </div>
    <div class="query-params">
      <el-form
        :model="userInfo"
        :inline="true"
        label-width="190px"
        ref="queryForm"
        style="margin-left: 0px"
      >
        <el-form-item
          :label="this.$t('personal_content.user_avatar')"
          class="query-params-item"
          prop="imageSrc"
          style="line-height: 90px"
        >
          <div class="headIcon" @click="chooseHeadIcon()">
            <img v-if="userInfo.imageSrc" :src="userInfo.imageSrc" />
            <img v-if="!userInfo.imageSrc" :src="imageSrc" />
          </div>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.user_name')"
          class="query-params-item"
          prop="username"
        >
          <span>{{ userInfo.username }}</span>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.role')"
          class="query-params-item"
          prop="roles"
        >
          <span>{{ userInfo.roles }}</span>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.name')"
          class="query-params-item"
          prop="name"
        >
          <span style="width:300px;word-break:break-all">{{ userInfo.name }}</span>
          <el-button type="text" @click="showNameDialog()">{{
            $t("personal_buttons.button1")
          }}</el-button>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.sex')"
          class="query-params-item"
          prop="gender"
          v-if="userInfo.gender"
        >
          <span>{{ userInfo.gender }}</span>
          <el-button type="text" @click="changeGender(userInfo.gender)">{{
            $t("personal_buttons.button1")
          }}</el-button>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.mobile_phone')"
          class="query-params-item"
          prop="phone"
        >
          <span>{{ userInfo.phone | mobileFilter }}</span>
          <el-button type="text" @click="phoneDilog = true">{{
            $t("personal_buttons.button1")
          }}</el-button>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.email')"
          class="query-params-item"
          prop="email"
        >
          <span>{{ userInfo.email | mobileFilter }}</span>
          <el-button type="text" @click="emailDilog = true">{{
            $t("personal_buttons.button1")
          }}</el-button>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.password')"
          class="query-params-item"
          prop="password"
        >
          <span>********</span>
          <el-button type="text" @click="passwordDilog = true">{{
            $t("personal_buttons.button1")
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 修改头像弹窗 -->
    <el-dialog
      :title="this.$t('personal_content.modify_head_icon')"
      :visible.sync="headIconShow"
      width="35%"
    >
      <div class="headIconBox">
        <div :key="i" v-for="(item, i) in headIconList">
          <img :id="item.name" @click="chooseImg(item.name)" :src="item.url" />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateImage()">{{
          $t("personal_buttons.button2")
        }}</el-button>
        <el-button @click="headIconShow = false">{{
          $t("personal_buttons.button3")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 修改姓名弹窗 -->
    <el-dialog
      :title="this.$t('personal_content.modify_name')"
      :visible.sync="userNameDilog"
    >
      <el-form :model="nameInfo" :rules="nameRule" ref="nameInfo">
        <el-form-item
          :label="this.$t('personal_content.name')"
          label-width="60px"
          style="margin-bottom: 30px"
          prop="newName"
        >
          <el-input
            v-model.trim="nameInfo.newName"
            autocomplete="off"
            @input="inputChange"
            :placeholder="this.$t('personal_text.enter_name')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateName()">{{
          $t("personal_buttons.button2")
        }}</el-button>
        <el-button @click="userNameCancel()">{{
          $t("personal_buttons.button3")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 修改性别弹窗 -->
    <el-dialog
      :title="this.$t('personal_content.modify_sex')"
      :visible.sync="userGenderDilog"
    >
      <el-form :model="userInfo">
        <el-form-item
          :label="this.$t('personal_content.sex')"
          :label-width="formLabelWidth"
          style="margin-bottom: 30px"
        >
          <el-radio v-model="genderRadio" :label="1">{{
            $t("personal_content.sex_male")
          }}</el-radio>
          <el-radio v-model="genderRadio" :label="0">{{
            $t("personal_content.sex_female")
          }}</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateGender()">{{
          $t("personal_buttons.button2")
        }}</el-button>
        <el-button @click="userGenderDilog = false">{{
          $t("personal_buttons.button3")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 修改手机号弹窗 -->
    <el-dialog
      :title="this.$t('personal_content.modify_mobile_phone')"
      :visible.sync="phoneDilog"
    >
      <el-form :model="userInfo" :rules="phoneRules" ref="phoneRules">
        <el-form-item
          :label="this.$t('personal_content.current_mobile_phone')"
          label-width="230px"
          style="margin-bottom: 30px"
          prop="oldPhone"
        >
          <el-input
            v-model="userInfo.oldPhone"
            @input="inputChange"
            :placeholder="this.$t('personal_text.enter_current_mobile_phone')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.new_mobile_phone')"
          label-width="230px"
          style="margin-bottom: 30px"
          prop="newPhone"
        >
          <el-input
            v-model="userInfo.newPhone"
            @input="inputChange"
            :placeholder="this.$t('personal_text.enter_new_mobile_phone')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePhone()">{{
          $t("personal_buttons.button2")
        }}</el-button>
        <el-button @click="phoneCancel()">{{
          $t("personal_buttons.button3")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 修改邮箱弹窗 -->
    <el-dialog
      :title="this.$t('personal_content.modify_Email')"
      :visible.sync="emailDilog"
    >
      <el-form :model="userInfo" :rules="emailRules" ref="emailRules">
        <el-form-item
          :label="this.$t('personal_content.current_email')"
          :label-width="formLabelWidth"
          style="margin-bottom: 30px"
          prop="currentEmail"
        >
          <el-input
            v-model="userInfo.currentEmail"
            @input="inputChange"
            :placeholder="this.$t('personal_text.current_email')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.new_email')"
          :label-width="formLabelWidth"
          style="margin-bottom: 30px"
          prop="newEmail"
        >
          <el-input
            v-model="userInfo.newEmail"
            @input="inputChange"
            :placeholder="this.$t('personal_text.new_email')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateEmail()">{{
          $t("personal_buttons.button2")
        }}</el-button>
        <el-button @click="emailCancel()">{{
          $t("personal_buttons.button3")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog
      :title="this.$t('personal_content.modify_password')"
      :visible.sync="passwordDilog"
    >
      <el-form :model="userInfo" :rules="passwordRules" ref="passwordRule">
        <el-form-item
          :label="this.$t('personal_content.current_login_password')"
          label-width="200px"
          style="margin-bottom: 30px"
          prop="currentPassword"
        >
          <el-input
            v-model="userInfo.currentPassword"
            type="password"
            @input="inputChange"
            :placeholder="this.$t('personal_text.current_password')"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.new_login_password')"
          label-width="200px"
          style="margin-bottom: 30px"
          prop="newPassword"
        >
          <el-input
            v-model="userInfo.newPassword"
            type="password"
            @input="inputChange"
            :placeholder="this.$t('personal_text.new_password')"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('personal_content.enter_again')"
          label-width="200px"
          style="margin-bottom: 30px"
          prop="passwordAgin"
        >
          <el-input
            v-model="userInfo.passwordAgin"
            type="password"
            @input="inputChange"
            :placeholder="this.$t('personal_text.enter_agin')"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePasswd()">{{
          $t("personal_buttons.button2")
        }}</el-button>
        <el-button @click="cancelPassword">{{
          $t("personal_buttons.button3")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryUserDetailApi, updateUserDetailApi } from "@/api/userManage";
import { updatePasswdApi } from "@/api/login";
import { upLoadFileApi, downLoadFileApi, updateImageApi } from "@/api/userData";
import md5 from "js-md5";
export default {
  name: "userManage",
  components: {},
  filters: {
    mobileFilter(val) {
      let reg = /^(.{3}).*(.{3})$/;
      return val.replace(reg, "$1****$2");
    },
  },
  data() {
    let passwordRule = this.$t("rules.two_passwords");
    let passwordRule2 = this.$t("rules.length_up_6_16");
    let validatePass2 = (rule, value, callback) => {
      if (value !== this.userInfo.newPassword) {
        callback(new Error(passwordRule));
      } else {
        if (value.length < 6) {
          callback(new Error(passwordRule2));
        } else {
          callback(); 
        }
      }
    };
    //姓名验证
    let name1 = this.$t("rules.enter_name");
    let name2 = this.$t("rules.length_up_10");
    let nameRule3 = this.$t("user_manage_table.user_name_notice");
    let nameCheck = function (rule, value, callback) {
      if (!value) {
        return callback(new Error(name1));
      } else {
        if (value.trim() == "") {
          callback(nameRule3);
        } if (value.length > 10) {
          return callback(new Error(name2));
        } else {
          callback();
        }
      }
    };
    // 手机号验证
    let phone1 = this.$t("user_main_content.input_placeholder3");
      let phone2 = this.$t("rules.enter_correct_phone");
    let validatorMobile = function (rule, value, callback) {
      if (!value) {
        return callback(new Error(phone1)); //请输入联系电话
      }
      // let isMobile = /^(\+\d{2}-)?([1][34578]\d{9})$/.test(value);
      let isMobile = /^([0-9]|[+-]){6,20}$/.test(value);
      if (isMobile) {
        callback();
      } else {
        callback(new Error(phone2));
      }
    };
    //邮箱验证
    let emailRule1 = this.$t("rules.enter_email");
    let emailRule2 = this.$t("rules.enter_correct_email");
    let emailRule3 = this.$t("rules.length_up_40");
    // let emailAddress = this.userInfo.email;
    let sendEmail = function (rule, value, callback) {
      if (!value) {
        return callback(new Error(emailRule1));
      }
      if (value.length > 40) {
        return callback(new Error(emailRule3));
      }
      let regEmail = /^[\u4e00-\u9fa5a-zA-Z0-9]+@[\u4e00-\u9fa5a-zA-Z0-9_-]+(\.[\u4e00-\u9fa5a-zA-Z0-9_-]+)+$/.test(value);
      if (regEmail) {
        callback();
      } else {
        callback(new Error(emailRule2));
      }
    };
    let checkEmail = function (rule, value, callback) {
      if (!value) {
        return callback(new Error(emailRule1));
      }
      if (value.length > 40) {
        return callback(new Error(emailRule3));
      }
      let regEmail = /^[\u4e00-\u9fa5a-zA-Z0-9]+@[\u4e00-\u9fa5a-zA-Z0-9_-]+(\.[\u4e00-\u9fa5a-zA-Z0-9_-]+)+$/.test(value);
      if (regEmail) {
        callback();
      } else {
        callback(new Error(emailRule2));
      }
    };
    return {
      headIconShow: false,
      userNameDilog: false,
      userGenderDilog: false,
      phoneDilog: false,
      emailDilog: false,
      passwordDilog: false,
      formLabelWidth: "180px",
      sending: true, //是否发送验证码
      disabled: false, //是否禁发验证码
      second: 60, //倒计时间
      staffId: Number,
      genderRadio:'',
      userInfo: {
        imageSrc: "",
        username: "",
        roles: [],
        name: "",
        gender: "",
        // genderRadio:'',
        phone: "",
        email: "",
        password: "",
        oldPhone: "", //当前手机号
        newPhone: "", //新手机号
        newEmail: "", //新邮箱
        VerificationCode: "", //验证码
        currentPassword: "", //当前密码
        newPassword: "", //新密码
        passwordAgin: "", //确认密码
      },
      nameInfo: {
        newName: "",
      },
      headIconList: [
        {
          name: "head_icon1",
          url: "/web/static/head_icons/head_icon1.jpg",
        },
        {
          name: "head_icon2",
          url: "/web/static/head_icons/head_icon2.jpg",
        },
        {
          name: "head_icon3",
          url: "/web/static/head_icons/head_icon3.jpg",
        },
        {
          name: "head_icon4",
          url: "/web/static/head_icons/head_icon4.jpg",
        },
        {
          name: "head_icon5",
          url: "/web/static/head_icons/head_icon5.jpg",
        },
        {
          name: "head_icon6",
          url: "/web/static/head_icons/head_icon6.jpg",
        },
        {
          name: "head_icon7",
          url: "/web/static/head_icons/head_icon7.jpg",
        },
        {
          name: "head_icon8",
          url: "/web/static/head_icons/head_icon8.jpg",
        },
        {
          name: "head_icon9",
          url: "/web/static/head_icons/head_icon9.jpg",
        },
        {
          name: "head_icon10",
          url: "/web/static/head_icons/head_icon10.jpg",
        },
      ],
      imgName: "",
      imageSrc: "/web/static/head_icons/head_icon.jpg",
      nameRule: {
        newName: [
          { validator: nameCheck, required: true, trigger: ["blur", "change"] },
        ],
      },
      passwordRules: {
        currentPassword: [
          { required: true, message:this.$t("personal_text.current_password"), trigger:["blur", "change"] },
          {
            min:6,
            max:16,
            message: this.$t("rules.length_up_6_16"),
            trigger: ["blur", "change"],
          },
        ],
        newPassword: [
          {
            required: true,
            message: this.$t("personal_text.new_password"),
            trigger: ["blur", "change"],
          },
          { validator: validatePass2, trigger: ["blur", "change"] },
        ],
        passwordAgin: [
          {
            required: true,
            message: this.$t("personal_text.enter_agin"),
            trigger: ["blur", "change"],
          },
          { validator: validatePass2, trigger: ["blur", "change"] },
        ],
        newName:[
          {
            required: true,
            message: this.$t("personal_text.enter_name"),
            trigger: ["blur", "change"],
          },
          {
            max:10,
            message: this.$t("rules.length_up_10"),
            trigger: ["blur", "change"],
          },
        ],
      },
      //手机好验证
      phoneRules: {
        oldPhone: [
          {
            validator: validatorMobile,
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        newPhone: [
          {
            validator: validatorMobile,
            required: true,
            trigger: ["blur", "change"],
          },
        ],
      },
      //邮箱验证
      emailRules: {
        currentEmail: [
          { validator: sendEmail, required: true, trigger: ["blur", "change"] },
        ],
        newEmail: [
          { validator: checkEmail, required: true, trigger: ["blur", "change"] },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getUserDetail();
    window.localStorage.setItem("url", "NO_AUTHENTICATION_REQUIRED");
  },
  methods: {
    changeGender(){
      this.userGenderDilog = true
    },
    newPasswordA() {
      this.passwordDilog = true;
      // this.$nextTick(()=>{
      //   this.$refs.passwordRule.resetFields();
      // })
    },
    //查询用户详情
    getUserDetail() {
      this.staffId = window.localStorage.getItem("staffId");
      queryUserDetailApi(this.staffId).then((res) => {
        this.userInfo = res.data;
        this.nameInfo.newName = res.data.name;
        if (res.data.imgUrl) {
          this.userInfo.imageSrc =
            "/web/static/head_icons/" + res.data.imgUrl + ".jpg";
        }
        // this.userInfo.genderRadio = this.userInfo.gender+'';
        this.genderRadio = this.userInfo.gender
        if (this.userInfo.gender == 0) {
          this.userInfo.gender = this.$t("personal_content.sex_female");
        } else if (this.userInfo.gender == 1) {
          this.userInfo.gender = this.$t("personal_content.sex_male");
        }
        if (this.userInfo.orgName == undefined) {
          this.userInfo.orgName = "";
          // this.userInfo.organizationId = "";
        }
        if (this.userInfo.deptName == undefined) {
          this.userInfo.deptName = "";
          // this.userInfo.departmentId = "";
        }
        window.localStorage.setItem("orgName", this.userInfo.orgName);
        window.localStorage.setItem("deptName", this.userInfo.deptName);
        window.localStorage.setItem("name", this.userInfo.name);
        window.localStorage.setItem("imageSrc", this.userInfo.imageSrc);
        for (let i = 0; i < res.data.roleList.length; i++) {
          this.userInfo.roles = res.data.roleList[i].name;
        }
      });
    },
    getCodeFun() {
      //his.sending原为true,请求成功，!this.sending == true，主要是防止有人把disabled属性去掉，多次点击；
      if (!this.sending) return;
      getCode(this.userInfo.email).then((res) => {
        this.sending = false;
        this.disabled = true;
        this.timeDown();
      });
    },
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        if (this.second < 0) {
          clearInterval(result);
          this.sending = true;
          this.disabled = false;
          this.second = 60;
        }
      }, 1000);
    },
    //头像上传
    chooseHeadIcon() {
      this.headIconShow = true;
    },
    chooseImg(name) {
      this.imgName = "";
      this.imgName = name;
      for (let i = 0; i < this.headIconList.length; i++) {
        if (this.headIconList[i].name == this.imgName) {
          document.getElementById(this.imgName).style.borderColor = "#0080ff";
        } else {
          document.getElementById(this.headIconList[i].name).style.borderColor =
            "#e5e5e5";
        }
      }
    },
    updateImage() {
      var param = {
        adminId: this.staffId,
        imageUrl: this.imgName,
      };
      updateImageApi(param).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: this.$t("personal_placeholder.dialog_placeholder2"),
            type: "success",
          });
          this.headIconShow = false;
          this.getUserDetail();
          this.$store.dispatch("GetInfo");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    showNameDialog() {
      this.userNameDilog = true;
    },
    //修改姓名
    inputChange(){
      this.$forceUpdate()
    },
    updateName() {
      this.$refs.nameInfo.validate((valid) => {
        if (valid) {
          var param = {
            staffId: this.staffId,
            name: this.nameInfo.newName,
          };
          updateUserDetailApi(param).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: this.$t("personal_placeholder.dialog_placeholder1"),
                type: "success",
              });
              this.userNameDilog = false;
              this.getUserDetail();
              this.$store.dispatch("GetInfo");
              // this.$router.go(0);
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      })
    },
    //修改性别
    updateGender() {
      var param = {
        staffId: this.staffId,
        gender: this.genderRadio,
      };
      updateUserDetailApi(param).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: this.$t("personal_placeholder.dialog_placeholder1"),
            type: "success",
          });
          this.userGenderDilog = false;
          this.getUserDetail();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //修改手机号码
    updatePhone() {
      this.$refs.phoneRules.validate((valid) => {
        if (valid) {
          if (this.userInfo.newPhone == this.userInfo.oldPhone) {
            this.$message.error(this.$t("personal_content.current_phone_notice"));
            return;
          }
          var param = {
            staffId: this.staffId,
            oldPhone: this.userInfo.oldPhone,
            newPhone: this.userInfo.newPhone,
          };
          updateUserDetailApi(param).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: this.$t("personal_placeholder.dialog_placeholder1"),
                type: "success",
              });
              this.phoneDilog = false;
              this.$refs.phoneRules.resetFields();
              this.getUserDetail();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    //修改邮箱
    updateEmail() {
      this.$refs.emailRules.validate((valid) => {
        if (valid) {
          if (this.userInfo.currentEmail != this.userInfo.email) {
            this.$message.error(this.$t("personal_content.current_email_notice"));
            return;
          }
          var param = {
            staffId: this.staffId,
            email: this.userInfo.newEmail,
          };
          updateUserDetailApi(param).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: this.$t("personal_placeholder.dialog_placeholder1"),
                type: "success",
              });
              this.emailDilog = false;
              this.$refs.emailRules.resetFields();
              this.getUserDetail();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    //修改密码
    updatePasswd() {
      // if (this.userInfo.currentPassword != this.userInfo.passwordAgin) {
      //   this.$message({
      //       message: "新密码两次输入不一致",
      //       type: "error"
      //     });
      // }
      this.$refs.passwordRule.validate((valid) => {
        if (valid) {
          var param = {
            oldPassword: md5(this.userInfo.currentPassword),
            newPassword: md5(this.userInfo.newPassword),
          };
          console.log(param);
          updatePasswdApi(param).then((res) => {
            if (res.code == 200) {
              // this.$message({
              //   message: this.$t("personal_placeholder.dialog_placeholder1"),
              //   type: "success",
              // });
              // this.$refs.passwordRule.resetFields();
              // this.passwordDilog = false;
              // this.getUserDetail();
              this.$router.go(0);
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    cancelPassword() {
      this.$refs.passwordRule.resetFields();
      this.passwordDilog = false;
    },
    //修改姓名清除校验
    userNameCancel(){
      this.userNameDilog = false;
      this.cleanValidate('name');
    },
    //修改手机号清除校验
    phoneCancel(){
      this.phoneDilog = false;
      this.$refs.phoneRules.resetFields();
      // this.cleanValidate('phoneRules');
      // this.cleanValidate('newPhone');
    },
    //修改邮箱清除校验
    emailCancel(){
      this.emailDilog = false;
      // this.cleanValidate('emailRules');
      this.$refs.emailRules.resetFields();
    },
    cleanValidate(formName){
      // 清除表单校验的提示
      if (this.$refs[formName]) {
        // 延时执行
        this.$nextTick(function () {
          this.$refs[formName].clearValidate();
        })
      };
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/#app .main-container {
  background-color: #e5e5e5;
}
/deep/.avatar-uploader .el-upload {
  border-radius: 50%;
  overflow: hidden;
}

.app-container {
  .el-form-item {
    width: 600px;
    margin: 10px 20%;
    .upload_button {
      margin-top: 28px;
      margin-left: 10px;
    }
    .el-form-item__content {
      .el-col {
        width: 270px;
      }
      span {
        width: 300px;
        padding-left: 20px;
        display: inherit;
      }
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 90px;
      height: 90px;
      line-height: 90px;
      text-align: center;
    }
    .avatar {
      width: 90px;
      height: 90px;
      display: block;
    }
  }
  .divider-icon {
    font-size: 18px;
  }
  .btn-item {
    margin-top: 20px;
  }
  .table-item {
    margin-top: 16px;
  }

  .pagination-item {
    margin-top: 16px;
  }
  .headIcon {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .headIconBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    img {
      width: 100px;
      height: 100px;
      margin: 5px;
      cursor: pointer;
      border: 1px solid #e5e5e5;
    }
    img:hover {
      border: 1px solid #409eff;
    }
  }
}
</style>