<template>
  <div>
    <div class="main_title">
      <b>{{ $t("user_add_title.title") }}</b>
    </div>
    <el-form
      label-width="120px"
      :model="userInfo"
      :rules="rules"
      ref="userInfo"
    >
      <div class="area">
        <el-form-item
          :label="this.$t('user_main_content.input_title1')"
          prop="username"
        >
          <el-input
            v-model="userInfo.username"
            :placeholder="this.$t('user_main_content.input_placeholder1')"
            size="medium"
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
            v-model="userInfo.roles"
            :placeholder="this.$t('user_main_content.select_placeholder1')"
            value-key="id"
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
          :loading="btnLoading"
          icon="el-icon-circle-check"
          @click="submit('userInfo')"
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
//查询组织部门
// import { orgDeptlistApi } from "@/api/userManage";
//新增
import { addUserApi } from "@/api/userManage";
export default {
  name: "add",
  components: {},
  data() {
    //用户名称字母和数字验证
    let userName2 = this.$t("rules.username_up");
    let userName3 = this.$t("rules.enter_username");
    let userValid = function (rule, value, callback) {
      if (!value) {
        return callback(new Error(userName3));
      }
      let words = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{5,30})$/.test(value);
      if (words) {
        callback();
      } else {
        callback(new Error(userName2));
      }
    };
    //手机号验证
    let phone1 = this.$t("rules.enter_phone");
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
    let email1 = this.$t("rules.enter_email");
    let email2 = this.$t("rules.enter_correct_email");
    let email3 = this.$t("rules.length_up_40");
    let emailCheck = function (rule, value, callback) {
      if (!value) {
        return callback(new Error(email1));
      }
      if (value.length > 40) {
        return callback(new Error(email3));
      }
      let regEmail = /^[\u4e00-\u9fa5a-zA-Z0-9]+@[\u4e00-\u9fa5a-zA-Z0-9_-]+(\.[\u4e00-\u9fa5a-zA-Z0-9_-]+)+$/.test(
        value
      );
      if (regEmail) {
        callback();
      } else {
        callback(new Error(email2));
      }
    };
    return {
      paggeTitle: "",
      unrevisable: false,
      orgForbidden: false,
      deptForbidden: false,
      btnLoading: false,
      userInfo: {
        username: "",
        name: "",
        gender: "0",
        papers: "",
        phone: "",
        email: "",
        description: "",
        roles: "",
        roleId: "",
        roleCodes: "",
        status: "1",
      },
      selectedId: "",
      //组织
      organizationList: [],
      //部门
      departmentList: [],
      //角色roleList
      roleList: [],
      isAdd: true,
      rules: {
        username: [
          {
            validator: userValid,
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        name: [
          { validator: nameCheck, required: true, trigger: ["blur", "change"] },
        ],
        phone: [
          {
            validator: validatorMobile,
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        roles: [
          { required: true, message: this.$t("rules.select_role"), trigger: ["blur", "change"] },
        ],
        email: [
          {
            validator: emailCheck,
            required: true,
            trigger: "blur",
          },
        ],
        description: [
          {
            max: 400,
            // message: this.rules4,
            message:this.$t("rules.length_up_400"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getRoleList();
  },
  methods: {
    selectRole() {},
    getRoleList() {
      this.roleList = [];
      var params = {
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
    },
    handleChange(label) {
      console.log(label);
    },

    chooseCheckTree(data, target) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].departmentId == target) {
          // debugger;
          this.deptName = data[i].name;
        }
        if (data[i].children != null) {
          this.chooseCheckTree(data[i].children, target);
        }
      }
    },
    //提交
    submit(formName) {
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
          var isManage = Boolean;
          if (this.userInfo.status == 0) {
            isManage = true;
          } else {
            isManage = false;
          }
          var param = {
            username: this.userInfo.username,
            name: this.userInfo.name,
            gender: this.userInfo.gender,
            papers: this.userInfo.papers,
            phone: this.userInfo.phone,
            email: this.userInfo.email,
            siteId: 1,
            // organizationId: 1,
            // orgName: "",
            // departmentId: "",
            // deptName: "",
            status: this.userInfo.status,
            roles: rolesArr,
            roleCodes: rolesCodeArr,
            description: this.userInfo.description,
            staffId: this.staffId,
          };
          addUserApi(param).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: this.$t("add_sucess"),
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
        }
      });
    },
    reBack() {
      this.add = false;
      this.$emit("showAdd");
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
