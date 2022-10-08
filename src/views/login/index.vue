<template>
  <div class="login-container">
    <div class="login-item">
      <div slot="header">
        <!-- <svg-icon icon-class="login" /> -->
        <span class="header-tit">Log In</span>
      </div>
      <div class="form-item">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              name="username"
              type="text"
              v-model="loginForm.username"
              placeholder="Please enter the user name"
            >
              <svg-icon
                slot="prefix"
                icon-class="user"
                class="user-icon"
              ></svg-icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="password-item">
            <el-input
              name="password"
              :type="pwdType"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              placeholder="Please enter login password"
            >
              <svg-icon slot="prefix" icon-class="password"></svg-icon>
            </el-input>
            <span
              class="show-pwd"
              @click="showPwd"
              v-show="loginForm.password !== ''"
            >
              <svg-icon :icon-class="pwdType == 'password' ? 'eye2' : 'eye'" />
            </span>
          </el-form-item>
          <el-form-item prop="vCode" class="vCode-item" v-if="imgGenShow">
            <el-input
              class="code-inp"
              name="vCode"
              type="text"
              v-model="loginForm.vCode"
              placeholder="Please enter verification code"
            >
              <svg-icon slot="prefix" icon-class="code"></svg-icon>
            </el-input>
            <div class="vCode-img-item">
              <img @click="createdUUID" :src="imageUrl" />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click.native.prevent="handleLogin"
              >login</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import img_code from "@/assets/images/code.jpg";
import { loginService, getSubSysList,getShowImage } from "@/api/login";
import md5 from "js-md5";
// import { imgUrl } from "@/api/userData";
import { queryUserDetailApi } from "@/api/userManage";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "login",
  data() {
    return {
      img_code,
      imageUrl: "",
      imgGenShow: false,
      loginForm: {
        username: "",
        password: "",
        vCode: "",
      },
      staffId: "",
      UUID: "",
      // subSysList: [],
      userInfo: {},
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "User name required" },
          {
            min: 5,
            message: "The user name cannot be less than 5 digits",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "Password required" },
          {
            min: 6,
            message: "The password cannot be less than 6 bits",
            trigger: "blur",
          },
        ],
        vCode: [
          {
            required: true,
            trigger: "blur",
            message: "Captcha required",
            trigger: "blur",
          },
        ],
      },
      pwdType: "password",
      imageSrc: "",
    };
  },
  mounted() {
    this.showImage();
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    showImage() {
      if (window.localStorage.getItem("language") == null) {
        window.localStorage.setItem("language", "zh");
      };
      this.$store.dispatch("delAllViews");
      // this.$router.push("/");
      getShowImage().then((res) => {
        if (res.code == 200) {
          this.imgGenShow = true;
          this.createdUUID();
        } else {
          this.imgGenShow = false;
        }
      });
    },
    //获取验证码
    createdUUID() {
      //判断是否有 token
      sessionStorage.removeItem("uuid"); //如果有，清除 sessionStorage 中的 uuid
      //未登录状态生成 uuid
      let uuid = sessionStorage.getItem("uuid");
      if (!uuid) {
        sessionStorage.setItem("uuid", uuidv4());
      }
      this.UUID = uuidv4();
      this.imageUrl = imgGenUrl + this.UUID;
    },

    //查询用户详情
    getUserDetail(staffId) {
      queryUserDetailApi(staffId).then((res) => {
        if (res.data) {
          if (res.data.orgName) {
            window.localStorage.setItem("orgName", res.data.orgName);
            window.localStorage.setItem(
              "organizationId",
              res.data.organizationId
            );
          } else {
            window.localStorage.setItem("orgName", "");
          }
          if (res.data.deptName) {
            window.localStorage.setItem("deptName", res.data.deptName);
            window.localStorage.setItem("departmentId", res.data.departmentId);
          } else {
            window.localStorage.setItem("deptName", "");
          }
          if (res.data.imgUrl != undefined) {
            this.imageSrc = imgUrl + res.data.imgUrl;
          }
          window.localStorage.setItem("imageSrc", this.imageSrc);
          window.localStorage.setItem("username", res.data.username);
          window.localStorage.setItem("name", res.data.name);
          window.localStorage.setItem("imgUrl", res.data.imgUrl);
        }
        // this.$router.push({ path: "/index" });
        // this.loading = true;
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          var params = {
            userLoginname: this.loginForm.username,
            userPassword: md5(this.loginForm.password), // bcecb35d0a12baad472fbe0392bcc043
            loginCode: this.loginForm.vCode,
          };
          loginService(params).then((res) => {
            if (res.code == 200) {
              window.localStorage.setItem("token", res.data.token);
              this.chooseSubSys();
              //token
            } else {
              this.$message.error(res.msg);
              this.showImage();
              return false;
            }
          });
        }
      });
    },
    chooseSubSys(id, key, sysId) {
      var param = {
        appid: 1,
        appkey: 'c2add694bf942dc77b376592d9c862cd',
        subSysId: 1,
      };
      window.localStorage.setItem("subSysId", '1');
      window.localStorage.setItem("appkey", 'c2add694bf942dc77b376592d9c862cd');
      getSubSysList(param).then((res) => {
        if (res.code == 200) {
          this.staffId = res.data.staffId;
          this.getUserDetail(this.staffId);
          window.localStorage.setItem("staffId", res.data.staffId);
          //用户名
          window.localStorage.setItem("userName", this.loginForm.username);
          // this.loading = true;
          this.$store.dispatch("GetMenuData").then((res) => {
            this.$router.push({ path: "/index" });
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url("~@/assets/images/login-bg.jpg") no-repeat;
  background-size: 100% 100%;
  .login-item {
    width: 420px;
    position: absolute;
    right: 9%;
    top: 32%;
    .header-tit {
      font-size: 28px;
      font-weight: bold;
      line-height: 70px;
      padding-top: 10px;
      border-top: 6px solid #647cf6;
    }
    .user-icon {
      font-size: 16px;
    }
    .productIcon {
      width: 30px;
      height: 30px;
      border-radius: 6px;
      float: left;
      margin-left: 10px;
    }
    .password-item {
      position: relative;
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 0;
        cursor: pointer;
      }
    }
    .code-inp {
      width: 66%;
    }
    .vCode-item {
      position: relative;
      .vCode-img-item {
        position: absolute;
        top: 0;
        right: 0px;
        width: 128px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        padding-top: 1px;
        img {
          width: 128px;
          height: 38px;
        }
      }
    }
  }
  .login-form {
    max-height: 500px;
    overflow: auto;
  }
  .copyright {
    position: absolute;
    left: 0;
    bottom: 28px;
    width: 100%;
    line-height: 38px;
    background: rgba($color: #000000, $alpha: 0.6);
    color: #fff;
    text-align: center;
    font-size: 12px;
  }
}
/deep/ .el-input__inner {
  border-radius: 20px;
  padding: 0 20px;
  padding-left: 40px;
  border: none;
  background: #f6f5fa;
}
/deep/ .el-input__prefix {
  left: 15px;
}
.el-button {
  width: 66%;
  border-radius: 20px;
  float: right;
  background: #647cf6;
}
.el-button:hover {
  background: #8fa1ff;
}
.el-form-item {
  margin-bottom: 36px;
  margin-top: 15px;
}
.login-container .login-item .password-item .show-pwd {
  position: absolute;
  right: 20px;
}
/deep/ .el-form-item__error {
  left: 40px;
}
</style>
