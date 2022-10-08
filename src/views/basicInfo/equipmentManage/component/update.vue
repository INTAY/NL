<template>
  <div>
    <div class="main_title">
      <b>{{ $t("device_edit_title.title") }}</b>
    </div>
    <el-form label-width="160px" :model="equipmentInfo" :rules="rules" ref="equipmentInfo" v-loading="formLoading">
      <div class="area">
        <el-form-item :label="title_device_id" prop="devUuid">
          {{equipmentInfo.devUuid}}
        </el-form-item>
        <el-form-item :label="title_times" prop="deviceAuthCount">
          {{equipmentInfo.deviceAuthCount}}
        </el-form-item>
        <el-form-item :label="title_custname" prop="owner">
          {{equipmentInfo.owner}}
        </el-form-item>
        <el-form-item :label="title_note" prop="remark">
          <el-input
            v-model="equipmentInfo.remark"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            :placeholder="this.$t('device_edit_title.title1')"
            maxlength="400"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="main_bottom">
      <el-form class="bottom">
        <el-button type="primary" icon="el-icon-circle-check" :disabled="btn" @click="submit()" :loading="loading">{{ $t("device_edit_buttons.button1") }}</el-button>
        <el-button type="primary" icon="el-icon-circle-close" plain @click="reBack()">{{ $t("device_edit_buttons.button2") }}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
//编辑/修改
import { updateEquipApi } from "@/api/equipmentManage";
import { queryEquipDetailApi } from "@/api/equipmentManage";

export default {
  name: "upDate",
  components: {},
  props: ["deviceId","devUuid"],
  data() {
    return {
      equipmentInfo: {
        devUuid: "",
        deviceAuthCount: "",
        owner: "",
        remark: "",
      },
      btn:false,
      rules: {
        remark: [{ max: 400, message: "长度最多400 个字符", trigger: "blur" },],
      },
      formLoading: false,
      loading: false,
      //标题
      title_device_id: this.$t("device_view_form.title_device_id"), //设备ID
      title_times: this.$t("device_view_form.title_times"), //鉴权次数
      title_custname: this.$t("device_view_form.title_custname"), //客户名称
      title_note: this.$t("device_view_form.title_note"), //备注
    };
  },
  mounted() {
    this.getEquipDetail()
  },
  methods: {
    //获取详情
    getEquipDetail() {
      var param = {
        deviceId: this.deviceId,
        devUuid: this.devUuid,
      }
      this.formLoading = true
      queryEquipDetailApi(param).then((res) => {
        this.equipmentInfo = res.data;
        this.formLoading = false
      });
    },

    //提交
    submit() {
      this.$refs.equipmentInfo.validate((valid) => {
        if (valid) {
          this.loading = true;
          var param2 = {
            deviceId: this.deviceId,
            devUuid: this.devUuid,
            remark: this.equipmentInfo.remark,
          };
          updateEquipApi(param2).then((res) => {
            this.btn = true;
            this.loading = false;
            if (res.code == 200) {
              this.$message({
                message: this.$t('device_edit_form.title_success'),
                type: "success",
              });
              this.reBack();
              this.btn = false;
            } else {
              this.$message.error(res.msg);
              this.btn = false;
            }
          });
        }
      })
    },
    reBack() {
      this.update = false;
      this.$emit("showEquipment");
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
