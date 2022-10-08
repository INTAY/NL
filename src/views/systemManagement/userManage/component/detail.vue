<template>
  <div>
    <div class="main_title">
      <b>{{ $t("user_manage_title.title2") }}</b>
    </div>
    <el-form label-width="140px" :model="userInfo">
      <div class="area">
        <el-form-item :label="this.$t('user_manage_table.user_id')+':'">{{
          userInfo.employeeCode
        }}</el-form-item>
        <el-form-item :label="this.$t('user_manage_table.user_name')+':'">{{
          userInfo.username
        }}</el-form-item>
        <el-form-item :label="this.$t('user_manage_table.name')+':'">{{
          userInfo.name
        }}</el-form-item>
        <el-form-item :label="this.$t('user_main_content.sex')+':'">{{
          userInfo.gender
        }}</el-form-item>
        <el-form-item :label="this.$t('user_main_content.user_status')+':'">{{
          userInfo.state
        }}</el-form-item>
        <el-form-item :label="this.$t('user_main_content.input_title3')+':'">{{
          userInfo.phone
        }}</el-form-item>
        <el-form-item :label="this.$t('user_main_content.input_title4')+':'">{{
          userInfo.email
        }}</el-form-item>
        <el-form-item v-if="userInfo.roles" :label="this.$t('user_main_content.select_title1')+':'">
          <span v-for="(item, index) in userInfo.roles" :key="index"
            >{{ item.name }}&nbsp;&nbsp;</span
          >
        </el-form-item>

        <el-form-item v-if="!userInfo.roles" :label="this.$t('user_main_content.select_title1')+':'">{{
          userInfo.name
        }}
        </el-form-item>
        <el-form-item :label="this.$t('user_main_content.input_title5')+':'">
          <div class="remarkInfo">
            {{userInfo.description}}
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div style="width:100%;height:40px;"></div>
    <div class="main_bottom">
      <el-form class="bottom">
        <el-button type="primary" icon="el-icon-back" @click="reBack()">{{
          $t("user_main_content.button_name2")
        }}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
//查询用户详情
import { queryUserDetailApi } from "@/api/userManage";

export default {
  name: "userDetail",
  components: {},
  props: ["staffId"],
  data() {
    return {
      detail: true,
      userInfo: {
        employeeCode: "",
        username: "",
        name: "",
        gender: "",
        papers: "",
        phone: "",
        email: "",
        orgName: "",
        deptName: "",
        roles: [],
        description: "",
        enable:"",
        disable:"",
      },
    };
  },
  created() {},
  mounted() {
    this.getUserDetail();
  },
  methods: {
    init() {},
    regionChange(data) {
      this.location = data;
    },
    //获取详情
    getUserDetail() {
      queryUserDetailApi(this.staffId).then((res) => {
        if (res.data) {
          this.userInfo = res.data;
          this.userInfo.roles = res.data.roleList;
          if (this.userInfo.gender == 0) {
            this.userInfo.gender = this.$t("personal_content.sex_female");
          } else if (this.userInfo.gender == 1) {
            this.userInfo.gender = this.$t("personal_content.sex_male");
          }
          var language = window.localStorage.getItem('language');
          if (language == 'zh') {
            this.enable = '启用',
            this.disable = '禁用'
          } else if (language == 'en') {
            this.enable = 'Enable',
            this.disable = 'Disable'
          }
          if (res.data.status == 1) {
            this.userInfo.state = this.enable;
          } else if (res.data.status == 2){
            this.userInfo.state = this.disable;
          }
        }
      });
    },
    reBack() {
      this.detail = false;
      this.$emit("showDetail");
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  position: relative;
  .area {
    // width: 800areapx;
    margin: 0 auto;
    padding-top: 20px;
    padding-right: 80px;
    max-height: calc(100vh - 300px);
    overflow-y: auto;
    .remarkInfo{
      // width: 90%;
      word-wrap:break-word;
    }
  }
  .main_bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    background: #f6f5fa;
    width: 100%;
    border-radius: 0 0 8px 8px;
    padding: 20px 0;
    .bottom {
      text-align: center;
    }
  }
}
</style>
