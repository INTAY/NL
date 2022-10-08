<template>
  <div class="app-container">
    <div v-if="customerManagement">
      <div class="main_title">
        <b>{{ $t("customer_manage_title.title") }}</b>
      </div>
      <div class="query-params">
        <el-form
          :model="queryParams"
          :inline="true"
          label-width="68px"
          ref="queryForm"
        >
          <el-form-item
            :label="input_title"
            class="query-params-item"
            prop="condition"
          >
            <el-input
              v-model.trim="queryParams.condition"
              size="small"
              :placeholder="input_placeholder"
              style="min-width: 360px"
            ></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              :loading = "loading"
              @click="querySubmit(queryParams)"
              >{{ $t("customer_manage_buttons.button1") }}</el-button
            >
            <el-button
              type="primary"
              plain
              icon="el-icon-refresh"
              size="small"
              @click="resetForm()"
              :loading = "loading2"
              >{{ $t("customer_manage_buttons.button2") }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <!-- 分割线 -->
      <el-divider content-position="right">
        <svg-icon icon-class="groupManage" class="divider-icon" />
      </el-divider>

      <!-- 按钮 -->
      <div class="btn-item">
        <el-button
          type="primary"
          class="btn_bg"
          style="margin: 10px 10px"
          icon="el-icon-plus"
          size="small"
          @click="importEquip"
          >{{ $t("customer_manage_buttons.button4") }}</el-button
        >
        <el-button
          type="primary"
          class="btn_bg"
          style="margin: 10px 0"
          icon="el-icon-plus"
          size="small"
          @click="addCust"
          >{{ $t("customer_manage_buttons.button3") }}</el-button
        >
      </div>

      <!-- 表格 -->
      <div class="table-item">
        <el-table
          :data="tableData"
          stripe
          class="w100p"
          max-height="590px"
          v-loading="tableLoading"
          element-loading-text="加载中..."
          @sort-change="sortChange"
        >
          <el-table-column
            prop="name"
            :label="title_customer_name"
            sortable="custom"
            min-width="190"
          ></el-table-column>
          <el-table-column
            prop="phone"
            :label="title_phone"
            min-width="170"
          ></el-table-column>
          <el-table-column
            prop="telephone"
            :label="title_telephone"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="count"
            :label="title_number"
            sortable="custom"
            min-width="170"
          ></el-table-column>
          <el-table-column
            :label="title_operation"
            width="220"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                title="查看"
                @click="viewDetail(scope.row)"
                >{{ $t("customer_manage_buttons.button5") }}</el-button
              >
              <el-button size="mini" title="修改" @click="edit(scope.row)">{{
                $t("customer_manage_buttons.button6")
              }}</el-button>
              <el-button
                size="mini"
                title="删除"
                type="danger"
                @click="deleteCust(scope.row)"
                >{{ $t("customer_manage_buttons.button7") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="pagination-item">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataTotal"
        ></el-pagination>
      </div>

      <!-- 导入设备 -->
      <el-dialog :visible.sync="dialogTableVisible" :show-close="false">
        <template slot="title" style="display: flex">
          <span style="display: inline-block; float:left; line-height: 32px; font-size:15px; font-weight: 600;">{{
            $t("customer_import_title.title1")
          }}</span>
          <span style="display: inline-block; float:right;">
            <el-button
              type="primary"
              size="small"
              @click="template()"
              >{{ $t("customer_import_title.title2") }}</el-button
            >
            <!-- <el-button type="primary" class="btn_bg" size="small" @click="Import()">{{ $t("customer_import_title.title3") }}</el-button>    -->
            <el-button style="padding: 0; border: 0;">
              <upload-page :url="url" @passValue="passValue"></upload-page>
            </el-button>
          </span>
        </template>
        <el-table :data="gridData">
          <el-table-column
            property="name"
            :label="title_custname"
            width="180"
          ></el-table-column>
          <el-table-column
            property="devStart"
            :label="title_dev_start"
            width="180"
          ></el-table-column>
          <el-table-column
            property="devEnd"
            :label="title_dev_end"
            width="180"
          ></el-table-column>
          <el-table-column
            property="state"
            :label="title_status"
            width="160"
          ></el-table-column>
          <el-table-column
            property="remark"
            :label="title_explain"
            width="220"
          ></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-check"
            @click="Import()"
            :loading="loading3"
            >{{ $t("customer_import_buttons.button1") }}</el-button
          >
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-close"
            plain
            @click="cancel()"
            >{{ $t("customer_import_buttons.button2") }}</el-button
          >
        </div>
        <!-- <div style="text-align:center">
          <el-pagination
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
        </div> -->
      </el-dialog>
    </div>

    <customer-update
      ref="customerUpdate"
      @showCust="showCust"
      :staffId="staffId"
      :isAdd="isAdd"
      v-if="update"
    ></customer-update>
    <customer-detail
      @showDetail="showDetail"
      :staffId="staffId"
      v-if="detail"
    ></customer-detail>
  </div>
</template>

<script>
import { queryCustPageApi } from "@/api/custManage";
import { queryCustDetailApi } from "@/api/custManage";
import { deleteCustApi } from "@/api/custManage";
import { importApi } from "@/api/custManage";
import { importEquipApi } from "@/api/custManage";

import customerUpdate from "./component/update";
import customerDetail from "./component/detail";
import uploadPage from "@/components/upload";
import md5 from "js-md5";
export default {
  name: "customerManage",
  components: {
    customerUpdate,
    customerDetail,
    uploadPage,
  },
  data() {
    return {
      customerManagement: true,
      url: "/service/551/api/v1/equipInfo",
      isAdd: false,
      update: false,
      detail: false,
      dialogTableVisible: false,
      staffId: "",
      queryParams: {
        condition: "",
      },
      tableData: [],
      gridData: [],
      uuid: 0,
      sortby: "",
      orderby: "",
      tableLoading: false, //表格load效果
      loading: false,
      loading2: false,
      loading3: false,
      pageNum: 1,
      pageSize: 20,
      tableDataTotal: 0,
      //国际化配置数据
      input_title: this.$t("customer_manage_query.input_title"), //查询输入框
      input_placeholder: this.$t("customer_manage_query.input_placeholder"), //查询输入框提示语
      //表格标题
      title_customer_name: this.$t("customer_manage_table.title_customer_name"), //客户姓名
      title_phone: this.$t("customer_manage_table.title_phone"), //手机
      title_telephone: this.$t("customer_manage_table.title_telephone"), //固定电话
      title_number: this.$t("customer_manage_table.title_number"), //设备数量
      title_operation: this.$t("customer_manage_table.title_operation"), //操作
      title_custname: this.$t("customer_import_table.title_custname"), //客户名称
      title_dev_start: this.$t("customer_import_table.title_dev_start"), //起始号段
      title_dev_end: this.$t("customer_import_table.title_dev_end"), //结束号段
      title_status: this.$t("customer_import_table.title_status"), //导入状态
      title_explain: this.$t("customer_import_table.title_explain"), //说明
    };
  },
  mounted() {
    window.localStorage.setItem("url", "basicInfo/customerManage");
    this.queryCustPage();
  },
  methods: {
    queryCustPage() {
      var params = {
        current: this.pageNum,
        size: this.pageSize,
        sortby: this.sortby,
        orderby: this.orderby,
        condition: this.queryParams.condition,
      };
      this.loading = true;
      this.loading2 = true;
      this.tableLoading = true;
      queryCustPageApi(params).then((res) => {
        this.tableData = res.data.records;
        this.tableDataTotal = res.data.total;
        this.loading = false;
        this.loading2 = false;
        this.tableLoading = false;
      });
    },
    //查询提交
    querySubmit(param) {
      this.pageNum = 1; //重置当前页
      this.queryCustPage();
    },
    //重置查询
    resetForm() {
      (this.queryParams = {
        condition: "",
      }),
        (this.pageNum = 1), //重置页数
        (this.pageSize = 20), //重置条数
        this.queryCustPage();
    },
    handleSizeChange(val) {
      this.pageNum = 1; //重置页数
      this.pageSize = val;
      this.queryCustPage();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.queryCustPage();
    },
    importEquip() {
      this.dialogTableVisible = true;
      this.gridData = [];
    },
    //添加客户
    addCust() {
      this.isAdd = true;
      this.update = true;
      this.customerManagement = false;
    },
    // 修改
    edit(row) {
      this.isAdd = false;
      this.update = true;
      this.customerManagement = false;
      this.staffId = row.staffId;
    },
    //查看
    viewDetail(row) {
      this.detail = true;
      this.customerManagement = false;
      this.staffId = row.staffId;
    },
    //删除
    deleteCust(row) {
      console.log(row)
      this.$confirm(
        this.$t("customer_manage_table.confirm_text"),
        this.$t("customer_manage_table.confirm_title"),
        {
          type: "warning",
        }
      ).then(() => {
        deleteCustApi(row.staffId).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: this.$t("customer_manage_table.confirm_result"),
              type: "success",
            });
            this.queryCustPage();
          } else {
            this.$message.error(res.message);
          }
        });
      });
    },
    showCust() {
      this.update = false;
      this.customerManagement = true;
      this.queryCustPage();
    },
    showDetail() {
      this.detail = false;
      this.customerManagement = true;
      this.queryCustPage();
    },
    //模板下载
    template() {
      this.$message({
        message: this.$t('sucess.cust_download'),
        type: "success",
      });
      let language = window.localStorage.getItem('language');
      if (language == 'en') {
        language = 'en_US'
      } else {
        language = 'zh_CN'
      }
      window.location.href = "/service/551/api/v1/model/" + language;
    },
    //导入
    Import() {
      this.loading3 = true;
      importEquipApi(this.uuid).then((res) => {
        this.$message({
          showClose: true,
          message: this.$t('sucess.timeout')
        });
        if (res.code == 200) {
          this.$message({
            message: this.$t('sucess.cust_import'),
            type: "success",
          });
          this.uuid = 0;
          this.dialogTableVisible = false;
          this.queryCustPage();
        } else {
          this.$message.error(res.message);
        }
        this.loading3 = false;
      });
    },
    cancel(){
      this.dialogTableVisible = false ;
      this.uuid = 0;
    },
    passValue(val) {
      this.gridData = val.excelListVos;
      this.uuid = val.uuid;
    },
    //排序
    sortChange: function (column, prop, order) {
      if (column.order == "descending") {
        this.orderby = "DESC";
      } else if (column.order == "ascending") {
        this.orderby = "ASC";
      } else {
        this.orderby = '';
        this.sortby = '';
      }
      this.sortby = column.prop;
      this.queryCustPage();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/#app .main-container {
  background-color: #e5e5e5;
}
.app-container {
  .divider-icon {
    font-size: 18px;
  }
  .btn-item {
    margin: 10px 0px;
    float: right;
  }
  .table-item {
    margin-top: 16px;
  }

  .pagination-item {
    margin-top: 16px;
  }
}
/deep/.el-dialog {
  width: 30% !important;
}
/deep/ .el-dialog__header{
  overflow: hidden;
  padding:15px 20px;
  margin-bottom: 10px;
}
.el-input {
  width: 90%;
}
.el-form {
  overflow: hidden;
}
.btn {
  float: right;
}
</style>