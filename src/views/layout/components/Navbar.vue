<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- <breadcrumb></breadcrumb> -->
    <!-- logo -->
    <div class="logo">
      <i class="logo-side"></i>
      <!-- <span class="logo-txt">物联网管理平台</span> -->
    </div>
    <hamburger
      class="hamburger-container"
      :toggleClick="toggleSideBar"
      :isActive="sidebar.opened"
    ></hamburger>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <span class="username" style="margin-right: 50px">{{
          $store.state.user.name
        }}</span>
        <img class="icon_user" v-if="$store.state.user.imgUrl" :src="'/web/static/head_icons/' + $store.state.user.imgUrl + '.jpg'" />
        <img
          class="icon_user"
          v-if="!$store.state.user.imgUrl"
          src="/web/static/head_icons/head_icon.jpg"
        />
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item>
          <span @click="userCenter">{{
            $t("navbar.personal_information")
          }}</span>
        </el-dropdown-item>
        <!-- <el-dropdown-item divided>
          <span @click="userCenter">个人资料</span>
        </el-dropdown-item>-->
        <el-dropdown-item divided>
          <span @click="logout" style="display: block">{{
            $t("navbar.logout")
          }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-badge :value="$store.state.user.msgCount" v-if="$store.state.user.msgCount != 0" :max="999" class="item">
      <i class="el-icon-message" @click="msgCenter()"></i>
    </el-badge>
    <el-badge  v-if="$store.state.user.msgCount == 0" class="item">
      <i class="el-icon-message" @click="msgCenter()"></i>
    </el-badge>
    <el-radio-group
      class="switch_languages"
      size="mini"
      @change="switchLanguage"
      v-model="switchLanguages"
    >
      <el-radio-button label="0">English</el-radio-button>
      <el-radio-button label="1">中文</el-radio-button>
    </el-radio-group>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Cookies from "js-cookie";
import { loginOutService } from "@/api/login";
import { queryUserDetailApi } from "@/api/userManage";
import { msgUnreadCountApi } from "@/api/messageCenter";
// import { imgUrl } from "@/api/userData";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  // inject: ['reload'],
  data() {
    return {
      userInfo: {
        orgName: "",
        deptName: "",
        username: "",
        name: "",
      },
      switchLanguages: "",
      imageSrc: "",
    };
  },
  mounted() {
    this.getSwitchState();
    // this.getUserDetail();
    this.$store.dispatch("GetMsgUnreadCount");
    this.$store.dispatch("GetInfo");
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    //查询用户详情
    getUserDetail() {
      let staffId = window.localStorage.getItem("staffId");
      window.localStorage.removeItem("orgName");
      window.localStorage.removeItem("organizationId");
      window.localStorage.removeItem("deptName");
      window.localStorage.removeItem("departmentId");
      window.localStorage.removeItem("imageSrc");
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("name");
      queryUserDetailApi(staffId).then((res) => {
        if (res.data) {
          if (res.data.orgName) {
            window.localStorage.setItem("orgName", res.data.orgName);
            window.localStorage.setItem(
              "organizationId",
              res.data.organizationId
            );
            this.userInfo.orgName = res.data.orgName;
          } else {
            window.localStorage.setItem("orgName", "");
          }
          if (res.data.deptName) {
            window.localStorage.setItem("deptName", res.data.deptName);
            window.localStorage.setItem("departmentId", res.data.departmentId);
            this.userInfo.deptName = res.data.deptName;
          } else {
            window.localStorage.setItem("deptName", "");
          }
          if (res.data.imgUrl) {
            this.imageSrc = "/web/static/head_icons/" + res.data.imgUrl + ".jpg";
          }
          this.userInfo.username = res.data.username;
          this.userInfo.name = res.data.name;
          window.localStorage.setItem("imageSrc", this.imageSrc);
          window.localStorage.setItem("username", res.data.username);
          window.localStorage.setItem("name", res.data.name);
          // window.localStorage.setItem("imgUrl", res.data.imgUrl);
        }
      });
    },

    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
      // this.$router.go(0);
    },

    //中英文切换
    getSwitchState() {
      var switchState = window.localStorage.getItem("language");
      if (switchState == "zh") {
        this.switchLanguages = "1";
      } else if (switchState == "en") {
        this.switchLanguages = "0";
      } else if (switchState == null) {
        this.switchLanguages = "1";
      }
    },
    switchLanguage() {
      var languageItem = "";
      if (this.switchLanguages == 1) {
        languageItem = "zh";
      } else if (this.switchLanguages == 0) {
        languageItem = "en";
      }
      window.localStorage.setItem("language", languageItem);
      this.$router.go(0);
    },
    logout() {
      // this.$router.push({ path: "/login" });
      loginOutService().then((res) => {
        console.log(res);
        if (res.code == 200) {
          window.localStorage.removeItem("url");
          window.localStorage.removeItem("menuData");
          var storage = window.localStorage;
          storage.clear();
          var languageItem = "";
          if (this.switchLanguages == 1) {
            languageItem = "zh";
          } else if (this.switchLanguages == 0) {
            languageItem = "en";
          }
          window.localStorage.setItem("language", languageItem);
          this.$router.push({ path: "/login" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      /* this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      }) */
    },
    userCenter() {
      this.$router.push("../../systemManagement/userData");
    },
    msgCenter() {
      this.$router.push("../../systemManagement/msgCenter");
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 44px;
  border-radius: 0px !important;
  .logo {
    float: left;
    line-height: 49px;
    height: 48px;
    background-color: #ffffff;
    color: #3d40a1;
    font-size: 18px;
    font-weight: 900;
    padding-left: 16px;
  }
  .logo.hide-side {
    padding-left: 0px;
  }
  .logo .logo-side {
    width: 240px;
    height: 38px;
    background: url("~@/assets/images/logo.png") no-repeat;
    display: inline-block;
    vertical-align: middle;
    background-size: cover;
    margin-bottom: 4px;
  }
  .logo .logo-txt {
    display: inline-block;
    vertical-align: middle;
    margin-left: 3px;
  }
  .hamburger-container {
    line-height: 54px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    margin-right: 35px;
    float: right;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .icon_user {
        position: absolute;
        width: 42px;
        height: 42px;
        right: 0px;
        top: 4px;
        border-radius: 50%;
        border: 1px solid #d9d9d9;
      }
      .username {
        display: inline-block;
        margin-right: 6px;
        vertical-align: middle;
      }
      .tx {
        display: inline-block;
        font-size: 36px;
        color: #3a40a2;
        vertical-align: middle;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
.item {
  float: right;
  margin-top: 6px;
  margin-right: 40px;
  cursor: pointer;
  .el-icon-message {
    font-size: 24px;
    line-height: 24px;
  }
}
.switch_languages {
  float: right;
  margin-top: 10px;
  margin-right: 30px;
  cursor: pointer;
}
/deep/ .el-badge__content.is-fixed {
  top: 10px;
  right: 8px;
}
/deep/ .el-dropdown-menu__item{
    padding: 0;
    cursor: auto;
    line-height: normal;
    span{
      line-height: 30px;
      padding: 0 20px;
      cursor: pointer;
    }
  }
</style>

