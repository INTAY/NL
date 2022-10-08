<template>
  <div>
    <div class="main_title">
      <b>{{ $t("customer_view_title.title") }}</b>
    </div>
    <el-form label-width="200px" :model="custInfo" v-loading="formLoading">
      <div class="area">
        <el-form-item :label="title_custname">{{custInfo.name}}</el-form-item>
        <el-form-item :label="title_device_id">
          <template>
            <div>
              {{ count }}&nbsp;{{ $t("customer_manage_title.title2") }}
              <el-button type="primary" size="small" @click="dialogVisible = true" style="margin-left:20px" v-if="devList.length>0">{{ $t("customer_manage_title.title1") }}</el-button>
            </div>
          </template>
        </el-form-item>
        <el-form-item :label="title_industry">{{custInfo.trade}}</el-form-item>
        <el-form-item :label="title_concat">{{custInfo.contact}}</el-form-item>
        <el-form-item :label="title_phone">{{custInfo.phone}}</el-form-item>
        <el-form-item :label="title_telephone">{{custInfo.telephone}}</el-form-item>
        <el-form-item :label="title_email">{{custInfo.email}}</el-form-item>
      </div>
    </el-form>
    <div class="main_bottom">
      <el-form class="bottom">
        <el-button type="primary" icon="el-icon-back" @click="reBack()">{{ $t("customer_view_buttons.button1") }}</el-button>
      </el-form>
    </div>

    <el-dialog
      :title=title_view
      :visible.sync="dialogVisible">
      <!-- <div v-show="devList.length == '0'" style="margin:0 auto;width:70px;font-size:16px;height:70px">{{ $t("customer_manage_title.title4") }}</div> -->
      <div v-for="(item,i) in devList" :key="i" style="margin:0 auto;width:450px;height:50px">
        <span>{{ $t("customer_manage_title.title2") }}{{ i+1 }}： </span>
        <span>{{ item.devStart }}</span>
        <span>&nbsp;&nbsp;{{ $t("customer_edit_query.input_placeholder") }}&nbsp;&nbsp;</span>
        <span>{{ item.devEnd }}</span>
      </div>
      <!-- <span>号段1：{{custInfo.devStart}}&nbsp;{{ $t("customer_edit_query.input_placeholder") }}&nbsp;{{custInfo.devEnd}}</span> -->
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>

  </div>
</template>

<script>
//查询用户详情
import { queryCustDetailApi } from "@/api/custManage";

export default {
  name: "Detail",
  components: {},
  props: ["staffId"],
  data() {
    return {
      dialogVisible:false,
      detail: true,
      custInfo: {
        name: "",
        trade:"",
        contact:"",
        phone: "",
        telephone:"",
        email: "",
      },
      devList:[],
      count:"",
      formLoading: false,
      //标题
      title_custname: this.$t("customer_view_form.title_custname"), //客户名称
      title_device_id: this.$t("customer_view_form.title_device_id"), //设备ID号段
      title_industry: this.$t("customer_view_form.title_industry"), //所属行业
      title_concat: this.$t("customer_view_form.title_concat"), //联系人
      title_phone: this.$t("customer_view_form.title_phone"), //手机号码
      title_telephone: this.$t("customer_view_form.title_telephone"), //固定电话
      title_email: this.$t("customer_view_form.title_email"), //邮箱
      title_view: this.$t("customer_manage_title.title1"),
    };
  },
  mounted() {
    this.getCustDetail();
  },
  methods: {
    // init() {},
    // regionChange(data) {
    //   this.location = data;
    // },
    //获取详情
    getCustDetail() {
      this.formLoading = true
      queryCustDetailApi(this.staffId).then(res => {
        this.custInfo = res.data;
        this.count = res.data.list.length;
        this.devList = res.data.list;
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
  .el-dialog__body{
    height: 200px;
  }
}
</style>
