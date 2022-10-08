<template>
  <div>
    <div class="main_title">
      <b>{{ $t("role_add_title.title2") }}</b>
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
import { updateRoleApi } from "@/api/roleManage";
import { getEffectiveTimeApi } from "@/api/roleManage";
import { queryRoleDetailApi } from "@/api/roleManage";
export default {
  name: "upDate",
  components: {},
  props: ["roleId"],
  data() {
    let userRule = this.$t("role_manage_table.role_notice");
    let userValid = function (rule, value, callback) {
      if (value.trim() == "") {
        callback(userRule);
      }else{
        callback()
      }
    };
    return {
      pageTitle: "",
      effectiveTime: "",
      expireTime: "",
      btnLoading: false,
      roleInfo: {
        name: "",
        blockFlag: "1",
        description: "",
      },
      isAdd: true,
      rules: {
        name: [
          {
            required: true,
            message: this.$t("main_content.input_placeholder1"),
            trigger: ["blur", "change"],
          },
          { max: 60, message: this.$t("rules.length_up_30"), trigger: ["blur", "change"] },
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
  mounted() {
    // 修改页
    this.getVillDetail();
  },
  methods: {
    init() {},
    //获取详情
    getVillDetail() {
      var param = {
        roleId: this.roleId,
      };
      queryRoleDetailApi(param).then((res) => {
        if (res.code == 200) {
          this.roleInfo = {
            name: res.data.name,
            blockFlag: res.data.blockFlag.toString(),
            description: res.data.description,
          };
        }
      });
    },
    submit() {
      this.$refs.roleInfo.validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          var params = {
            roleId: this.roleId,
            name: this.roleInfo.name,
            blockFlag: this.roleInfo.blockFlag,
            description: this.roleInfo.description,
          };
          updateRoleApi(params).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: this.$t("change_sucess"),
                type: "success",
              });
              this.btnLoading = false;
              this.reBack();
            } else {
              this.$message.error(res.msg);
              this.btnLoading = false;
            }
          });
        }
      });
    },
    reBack() {
      this.update = false;
      this.$emit("showRole");
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
