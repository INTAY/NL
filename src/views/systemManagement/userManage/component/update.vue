<template>
  <div>
    <div class="main_title">
      <b>{{ $t("user_add_title.title2") }}</b>
    </div>
    <el-form
      label-width="120px"
      :model="userInfo"
      :rules="rules"
      ref="userInfo"
    >
      <div class="area">
        <el-form-item
          :label="this.$t('user_manage_table.user_id')"
          prop="employeeCode"
        >
          {{ userInfo.employeeCode }}
        </el-form-item>
        <el-form-item
          :label="this.$t('user_main_content.input_title1')"
          prop="username"
        >
          <el-input
            v-model="userInfo.username"
            :placeholder="this.$t('user_main_content.input_placeholder1')"
            size="medium"
            maxlength="30"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('user_main_content.input_title2')"
          prop="name"
        >
          <el-input
            v-model="userInfo.name"
            :placeholder="this.$t('user_main_content.input_placeholder2')"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('user_main_content.sex')" prop="gender">
          <el-radio v-model="userInfo.gender" label="0">{{
            $t("user_main_content.sex_female")
          }}</el-radio>
          <el-radio v-model="userInfo.gender" label="1">{{
            $t("user_main_content.sex_male")
          }}</el-radio>
        </el-form-item>
        <el-form-item
          :label="this.$t('user_main_content.user_status')"
          prop="status"
        >
          <el-radio v-model="userInfo.status" label="1">{{
            $t("user_main_content.status_enable")
          }}</el-radio>
          <el-radio v-model="userInfo.status" label="2">{{
            $t("user_main_content.status_disable")
          }}</el-radio>
        </el-form-item>
        <el-form-item
          :label="this.$t('user_main_content.input_title3')"
          prop="phone"
        >
          <el-input
            v-model="userInfo.phone"
            :placeholder="this.$t('user_main_content.input_placeholder3')"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('user_main_content.input_title4')"
          prop="email"
        >
          <el-input
            v-model="userInfo.email"
            :placeholder="this.$t('user_main_content.input_placeholder4')"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('user_main_content.select_title1')"
          prop="roles"
        >
          <el-select
            @change="$forceUpdate()"
            v-model="userInfo.roles"
            :placeholder="this.$t('user_main_content.select_placeholder1')"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="this.$t('user_main_content.input_title5')"
          prop="description"
        >
          <el-input
            v-model="userInfo.description"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            :placeholder="this.$t('user_main_content.input_placeholder5')"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="main_bottom">
      <el-form class="bottom">
        <el-button
          type="primary"
          icon="el-icon-circle-check"
          :loading="btnLoading"
          @click="submit()"
          >{{ this.$t("user_main_content.button_name1") }}</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-circle-close"
          plain
          @click="reBack()"
          >{{ this.$t("user_main_content.button_name2") }}</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
//查询角色列表
import { getRoleListApi } from "@/api/roleManage";
//查询用户详情
import { queryUserDetailApi } from "@/api/userManage";
//新增
import { addUserApi } from "@/api/userManage";
//编辑/修改
import { updateUserApi } from "@/api/userManage";
export default {
  name: "upDate",
  components: {},
  props: ["staffId"],
  data() {
    //用户名称字母和数字验证
    // let userName1 = this.$t("rules.enter_username");
    // let userName2 = this.$t("rules.Username_rules");
    // let userValid = function (rule, value, callback) {
    //   if (!value) {
    //     return callback(new Error(userName1));
    //   }
    //   let words = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{5,30})$/.test(value);
    //   if (words) {
    //     callback();
    //   } else {
    //     callback(new Error(userName2));
    //   }
    // };
    //姓名验证
    let nameRule1 = this.$t("rules.enter_name");
    let nameRule2 = this.$t("rules.length_up_10");
    let nameRule3 = this.$t("user_manage_table.user_name_notice");
    let nameValid = function (rule, value, callback) {
      if (!value) {
        return callback(new Error(nameRule1));
      }
      if (value.trim() == "") {
        callback(nameRule3);
      }
      if (value.length > 10) {
        return callback(new Error(nameRule2));
      }else{
        callback();
      }
    };
    //手机号验证
    let phone1 = this.$t("rules.enter_phone");
    let phone2 = this.$t("rules.enter_correct_phone");
    let validatorMobile = function (rule, value, callback) {
      if (!value) {
        return callback(new Error(phone1));
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
    let email1 = this.$t("rules.enter_email");
    let email2 = this.$t("rules.length_up_40");
    let email3 = this.$t("rules.enter_correct_email");
    let sendEmail = function (rule, value, callback) {
      if (!value) {
        return callback(new Error(email1));
      }
      if (value.length > 40) {
        return callback(new Error(email2));
      }
      let regEmail = /^[\u4e00-\u9fa5a-zA-Z0-9]+@[\u4e00-\u9fa5a-zA-Z0-9_-]+(\.[\u4e00-\u9fa5a-zA-Z0-9_-]+)+$/.test(
        value
      );
      if (regEmail) {
        callback();
      } else {
        callback(new Error(email3));
      }
    };
    return {
      paggeTitle: "",
      orgId: "",
      orgForbidden: false,
      deptForbidden: false,
      btnLoading: false,
      userInfo: {
        employeeCode: "",
        username: "",
        name: "",
        gender: "0",
        isManager: Boolean,
        phone: "",
        email: "",
        status: "1",
        organization: {},
        orgName: "",
        organizationId: "",
        description: "",
        department: {},
        deptName: "",
        departmentId: "",
        roles: "",
        note: "",
      },
      selectedId: "",
      returnSelectedId: "",
      //组织
      // organizationList: [],
      //部门
      // departmentList: [],
      //角色roleList
      roleList: [],
      rules: {
        name: [
          { validator: nameValid, required: true, trigger: ["blur", "change"] },
        ],
        phone: [
          {
            validator: validatorMobile,
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        roles: [
          {
            required: true,
            message: this.$t("rules.select_role"),
            trigger: "blur",
          },
        ],
        email: [
          { validator: sendEmail, required: true, trigger: ["blur", "change"] },
        ],
        description: [
          {
            max: 400,
            message: this.$t("rules.length_up_400"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    //获取角色列表
    this.getRoleList();
  },

  methods: {
    init() {
      this.userInfo = {
        username: "",
        name: "",
        gender: "",
        papers: "",
        phone: "",
        email: "",
        status: "1",
        departmentId: "",
        roles: "",
        note: "",
      };
    },
    getOrgDeptlist() {
      var params = {
        conditions: "",
      };
      orgDeptlistApi(params).then((res) => {
        this.organizationList = res.data;
        // 修改赋值
        this.getUserDetail();
      });
    },
    //获取详情
    getUserDetail() {
      var selected = "";
      queryUserDetailApi(this.staffId).then((res) => {
        if (res.data) {
          this.userInfo = res.data;
          this.userInfo.gender = this.userInfo.gender + "";
          this.userInfo.roles = res.data.roleList[0].roleId;
          this.userInfo.status = res.data.status.toString();
        }
      });
    },

    getRoleList() {
      // this.userInfo.roles = "";
      this.roleList = [];
      var params = {
        // subSysId: window.localStorage.getItem("subSysId"),
        orgId: "",
      };
      getRoleListApi(params).then((res) => {
        for (let i = 0, len = res.data.length; i < len; i++) {
          let newObj = {
            label: res.data[i].name,
            code: res.data[i].code,
            id: res.data[i].roleId,
          };
          this.roleList.push(newObj);
        }
      });
      this.getUserDetail();
    },

    // selectRoles(){
    //   this.$forceUpdate();
    // },

    chooseCheckTree(data, target) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].departmentId == target) {
          this.deptName = data[i].name;
        }
        if (data[i].children != null) {
          this.chooseCheckTree(data[i].children, target);
        }
      }
    },
    //提交
    submit() {
      this.$refs.userInfo.validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          var rolesArr = [];
          var rolesCodeArr = [];
          for (let j = 0, len = this.roleList.length; j < len; j++) {
            if (this.userInfo.roles == this.roleList[j].id) {
              rolesArr.push(this.roleList[j].id);
              rolesCodeArr.push(this.roleList[j].code);
            }
          }
          var param = {
            username: this.userInfo.username,
            name: this.userInfo.name,
            gender: this.userInfo.gender,
            papers: this.userInfo.papers,
            phone: this.userInfo.phone,
            email: this.userInfo.email,
            siteid: 1,
            status: this.userInfo.status,
            roles: rolesArr,
            roleCodes: rolesCodeArr,
            description: this.userInfo.description,
            staffId: this.staffId,
          };
          updateUserApi(param).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: this.$t("change_sucess"),
                type: "success",
              });
              this.btnLoading = false;
              this.reBack();
              this.queryUserPage();
            } else {
              this.$message.error(res.msg);
              this.btnLoading = false;
            }
          });
        };
      });
    },
    reBack() {
      this.update = false;
      this.$emit("showUser");
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .area {
    width: 500px;
    margin: 0 auto;
    padding-top: 20px;
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
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 250px;
  margin-right: 20px;
}
.el-switch__label.is-active {
  color: #6442f5;
}
.el-switch {
  margin-top: 8px;
}
</style>
