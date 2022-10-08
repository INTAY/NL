<template>
  <div>
    <div class="main_title">
      <b>{{ $t("device_view_title.title") }}</b>
    </div>
    <el-form label-width="200px" :model="equipmentInfo" v-loading="formLoading">
      <div class="content">
        <el-form-item :label="title_device_id">{{equipmentInfo.devUuid}}</el-form-item>
        <el-form-item :label="title_times">{{equipmentInfo.deviceAuthCount}}</el-form-item>
        <el-form-item :label="title_custname">{{equipmentInfo.owner}}</el-form-item>
        <el-form-item :label="title_time">{{equipmentInfo.createTime}}</el-form-item>
        <el-form-item :label="title_newtime">{{equipmentInfo.authTime}}</el-form-item>
        <!-- <el-form-item :label="title_note">{{equipmentInfo.remark}}</el-form-item> -->
        <el-form-item :label="title_note">
          <!-- <el-input
            :value="equipmentInfo.remark"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            maxlength="400"
            readonly
          ></el-input> -->
          <div class="note">
            {{equipmentInfo.remark}}
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div class="main_bottom">
      <el-form class="bottom">
        <el-button type="primary" icon="el-icon-back" @click="reBack()">{{ $t("device_view_buttons.button1") }}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
//查询详情
import { queryEquipDetailApi } from "@/api/equipmentManage";

export default {
  name: "Detail",
  components: {},
  props: ["deviceId","devUuid"],
  data() {
    return {
      detail: true,
      equipmentInfo: {
        devUuid: "",
        deviceAuthCount: "",
        owner: "",
        createTime: "",
        authTime: "",
        remark:"",
      },
      // loading:"",
      formLoading: false,
      //标题
      title_device_id: this.$t("device_view_form.title_device_id"), //设备ID
      title_times: this.$t("device_view_form.title_times"), //鉴权次数
      title_custname: this.$t("device_view_form.title_custname"), //客户名称
      title_time: this.$t("device_view_form.title_time"), //注册时间
      title_newtime: this.$t("device_view_form.title_newtime"), //最近鉴权时间
      title_note: this.$t("device_view_form.title_note"), //备注
    };
  },
  created() {},
  mounted() {
    this.getEquipDetail();
  },
  methods: {
    // init() {},
    // regionChange(data) {
    //   this.location = data;
    // },
    // openFullScreen2() {
    //   this.loading = this.$loading({
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   });
    // },
    //获取详情
    getEquipDetail() {
      var param = {
        deviceId: this.deviceId,
        devUuid: this.devUuid,
      }
      this.formLoading = true;
      // this.openFullScreen2();
      queryEquipDetailApi(param).then(res => {
        if(res.code = 200){
          // this.loading.close()
          this.equipmentInfo = res.data;
        }else{
          this.$message.error(res.msg)
        }
        // this.loading.close()
        this.formLoading = false;
      });
    },
    reBack() {
      this.detail = false;
      this.$emit("showDetail");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .content {
    width: 500px;
    margin: 0 auto;
    padding-top: 20px;
  }
  .main_bottom {
    position: fixed;
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
  .note{
    width: 400px;
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    word-wrap: break-word;
    word-break: break-all;
    overflow-y:auto
  }
}
</style>
