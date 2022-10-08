<template>
  <div class="app-container">
    <div v-if="equipmentManagement">
      <div class="main_title">
        <b>{{ $t("device_manage_title.title") }}</b>
      </div>
      <div class="query-params">
        <el-form :model="queryParams" :inline="true" ref="queryForm">
          <el-form-item :label="input_title1" class="query-params-item" prop="devUuid">
            <el-input
              v-model.trim="queryParams.devUuid"
              size="small"
              :placeholder="input_placeholder1"
              style="min-width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item :label="input_title2" class="query-params-item" prop="createTimeList"  label-width="150px" >
            <el-date-picker
              v-model="queryParams.createTimeList"
              size="small"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="——"
              :start-placeholder="this.$t('operation_query.select_placeholder1')"
              :end-placeholder="this.$t('operation_query.select_placeholder2')">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="btn">
            <el-button type="primary" icon="el-icon-search" size="small" @click="querySubmit(queryParams)" :loading="loading">{{ $t("device_manage_buttons.button1") }}</el-button>
            <el-button type="primary" plain icon="el-icon-refresh" size="small" @click="resetForm()">{{ $t("device_manage_buttons.button2") }}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 分割线 -->
      <el-divider content-position="right">
        <svg-icon icon-class="groupManage" class="divider-icon" />
      </el-divider>

      <!-- 表格 -->
      <div class="table-item">
        <el-table
          :data="tableData"
          stripe
          class="w100p"
          max-height="590px"
          v-loading="tableLoading"
          element-loading-text="加载中..."
          @sort-change='sortChange'
        >
          <el-table-column prop="devUuid" :label="title_device_id"  sortable='custom' min-width="160"></el-table-column>
          <el-table-column prop="owner" :label="title_custname" min-width="160"></el-table-column>
          <el-table-column prop="createTime" :label="title_time"  sortable='custom' min-width="160"></el-table-column>
          <el-table-column prop="deviceAuthCount" :label="title_times" min-width="160"></el-table-column>
          <el-table-column prop="authTime" :label="title_newtime"  sortable='custom' min-width="180"></el-table-column>
          <!-- 操作 -->
          <el-table-column :label="title_operation" width="240" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" title="查看" @click="viewDetail(scope.row)">{{ $t("device_manage_buttons.button3") }}</el-button>
              <el-button size="mini" title="修改" @click="edit(scope.row)">{{ $t("device_manage_buttons.button4") }}</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.row)">{{ $t("device_manage_buttons.button5") }}</el-button>
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
    </div>
    <equipmentUpdate
      @showEquipment="showEquipment"
      :deviceId="deviceId"
      :devUuid="devUuid"
      v-if="update"
    ></equipmentUpdate>
    <equipmentDetail
      @showDetail="showDetail"
      :deviceId="deviceId"
      :devUuid="devUuid"
      v-if="detail"
    ></equipmentDetail>
  </div>
</template>

<script>
import { queryEquipPageApi } from "@/api/equipmentManage";
import { deleteEquipApi } from "@/api/equipmentManage";

import equipmentUpdate from "./component/update";
import equipmentDetail from "./component/detail";
import md5 from "js-md5";
export default {
  name: "equipmentManagement",
  components: {
    equipmentUpdate,
    equipmentDetail,
  },
  data() {
    return {
      equipmentManagement: true,
      update: false,
      detail: false,
      deviceId: "",
      devUuid:"",
      queryParams: {
        devUuid: "",
        createTimeList:[],
      },
      tableData: [],
      formLabelWidth: "120px",
      tableLoading: false, //表格load效果
      loading: false,
      pageNum: 1,
      pageSize: 20,
      tableDataTotal: 0,
      sortby:"",
      orderby:"",
      //国际化配置数据
      input_title1: this.$t("device_manage_query.input_title1"), //查询输入框
      input_placeholder1: this.$t("device_manage_query.input_placeholder1"), //查询输入框提示语
      input_title2: this.$t("device_manage_query.input_title2"), //查询输入框
      input_placeholder2: this.$t("device_manage_query.input_placeholder2"), //查询输入框提示语
      //表格标题
      title_device_id: this.$t("device_manage_table.title_device_id"), //设备ID
      title_custname: this.$t("device_manage_table.title_custname"), //客户名称
      title_time: this.$t("device_manage_table.title_time"), //注册时间
      title_times: this.$t("device_manage_table.title_times"), //鉴权次数
      title_newtime: this.$t("device_manage_table.title_newtime"), //最近鉴权时间
      title_operation: this.$t("device_manage_table.title_operation"), //操作
    };
  },
  mounted() {
    this.queryEquipPage();
    window.localStorage.setItem("url", "basicInfo/equipmentManage");
  },
  methods: {
    queryEquipPage() {
      var params = {
        condition: this.queryParams.devUuid,
        minCreateTime: this.queryParams.createTimeList[0],
        maxCreateTime: this.queryParams.createTimeList[1],
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sortby: this.sortby,
        orderby: this.orderby,
      };
      this.loading = true;
      this.tableLoading = true;
      queryEquipPageApi(params).then((res) => {
        this.tableData = res.data.list;
        this.tableDataTotal = res.data.total;
        this.tableLoading = false;
        this.loading = false;
      });
    },
    //查询提交
    querySubmit(param) {
      this.pageNum = 1; //重置当前页
      this.queryEquipPage();
    },
    //重置查询
    resetForm() {
      (this.queryParams = {
        equipment: "",
        createTimeList:[],
      }),
        (this.pageNum = 1), //重置页数
        (this.pageSize = 20), //重置条数
        this.queryEquipPage();
    },
    handleSizeChange(val) {
      this.pageNum = 1; //重置页数
      this.pageSize = val;
      this.queryEquipPage();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.queryEquipPage();
    },
    // 修改
    edit(row) {
      this.update = true;
      this.equipmentManagement = false;
      this.deviceId = row.deviceId;
      this.devUuid = row.devUuid;
    },
    //查看
    viewDetail(row) {
      this.detail = true;
      this.equipmentManagement = false;
      this.deviceId = row.deviceId;
      this.devUuid = row.devUuid;
    },
    //删除
    deleteUser(row) {
      var data = {
        deviceId: row.deviceId,
        // devUuid: this.devUuid,
      }
      this.$confirm(this.$t("device_manage_table.confirm_text"), this.$t("device_manage_table.confirm_title"), {
        type: "warning",
      }).then(() => {
        deleteEquipApi(data).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: this.$t("device_manage_table.confirm_result"),
              type: "success",
            });
            this.queryEquipPage();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    showEquipment() {
      this.update = false;
      this.equipmentManagement = true;
      this.queryEquipPage();
    },
    showDetail() {
      this.detail = false;
      this.equipmentManagement = true;
      this.queryEquipPage();
    },
    //排序
    sortChange:function(column, prop, order){
      // console.log(column);
      // console.log(column.order);
      if(column.prop == 'devUuid'){
        this.sortby = 'md.dev_uuid';
      } else if (column.prop == 'createTime'){
        this.sortby = 'md.create_time';
      } else if (column.prop == 'authTime'){
        this.sortby = 'mda.update_time';
      }
      if(column.order == 'descending'){
        this.orderby = 'DESC';
      }else if(column.order == 'ascending'){
        this.orderby = 'ASC';
      }else{
        this.orderby = '';
        this.sortby = '';
      }
      this.queryEquipPage();
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
.el-input {
  width: 90%;
}
.el-form{
  overflow: hidden;
}
.btn{
  float: right;
}
</style>