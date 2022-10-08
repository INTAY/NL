<template>
  <div>
    <div class="main_title">
      <b>{{ $t("role_add_title.title") }}</b>
    </div>
    <el-form
      label-width="160px"
      :model="roleInfo"
      :rules="rules"
      ref="roleInfo"
    >
      <div class="area">
        <el-form-item :label="this.$t('main_content.input_title1')" prop="name">
          <el-input
            v-model="roleInfo.name"
            oninput="if(value.length>30)value=value.slice(0,30)"
            :placeholder="this.$t('main_content.input_placeholder1')"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="this.$t('main_content.input_title3')"
          prop="blockFlag"
        >
          <el-radio v-model="roleInfo.blockFlag" label="1">{{
            $t("role_manage_buttons.button7")
          }}</el-radio>
          <el-radio v-model="roleInfo.blockFlag" label="2">{{
            $t("role_manage_buttons.button8")
          }}</el-radio>
        </el-form-item>
        <el-form-item :label="this.$t('main_content.input_title2')">
          <el-input
            v-model="roleInfo.description"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 8 }"
            :placeholder="this.$t('main_content.input_placeholder2')"
            maxlength="400"
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
          @click="submit()"
          >{{ $t("main_content.button_name1") }}</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-circle-close"
          plain
          @click="reBack()"
          >{{ $t("main_content.button_name2") }}</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { addRoleApi } from "@/api/roleManage";
// import { getEffectiveTimeApi } from "@/api/roleManage";
export default {
  name: "add",
  components: {},
  data() {
    let username = this.$t('main_content.input_rolename')
    let userValid = function (rule, value, callback) {
      if (value.trim() == "") {
        callback(new Error(username));
      }else{
        callback()
      }
    };
    return {
      pageTitle: "",
      roleInfo: {
        name: "",
        blockFlag: "1",
        description: "",
      },
      btnLoading: false,
      isAdd: true,
      rules: {
        name: [
          {
            required: true,
            message: this.$t("main_content.input_placeholder1"),
            trigger: ["blur", "change"],
          },
          { max: 60, message: this.$t("rules.length_up_30"), trigger:["blur", "change"]},
          { validator: userValid, trigger: "blur"},
        ],
        description: [
          {
            max: 800,
            message: this.$t("rules.length_up_400"),
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    init() {},
    submit() {
      this.$refs.roleInfo.validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          var bytesLen = this.roleInfo.name.replace(/[^\x00-\xff]/g, "xx")
            .length;
          if (bytesLen > 30) {
            this.$message.error(this.$t("rules.length_up_30"));
            return;
          }
          if (!this.roleInfo.name) {
            this.$message.error(this.$t("enter_required"));
            return;
          }
          var params = {
            roleId: this.roleId,
            name: this.roleInfo.name,
            blockFlag: this.roleInfo.blockFlag,
            description: this.roleInfo.description,
          };
          addRoleApi(params).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: this.$t("add_sucess"),
                type: "success",
              });
              this.reBack();
            } else {
              this.$message.error(res.msg);
            }
            this.btnLoading = false;
          });
        }
      });
    },
    reBack() {
      this.add = false;
      this.$emit("showAdd");
      // this.userManage= true
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .area {
    width: 600px;
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
  width: 260px;
  margin-right: 20px;
}
.el-switch__label.is-active {
  color: #6442f5;
}
.el-switch {
  margin-top: 8px;
}
</style>
