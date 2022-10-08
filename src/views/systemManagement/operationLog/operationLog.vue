<template>
  <div class="app-container">
    <div>
      <div class="main_title">
        <b>{{ $t("operation_title.title") }}</b>
      </div>
      <div class="query-params">
        <el-form
          :model="queryParams"
          :inline="true"
          label-width="120px"
          ref="queryForm"
        >
          <el-form-item
            :label="this.$t('operation_query.input_title')"
            label-width="50px"
            class="query-params-item"
            prop="name"
          >
            <el-input
              v-model.trim="queryParams.name"
              size="small"
              :placeholder="this.$t('operation_query.input_placeholder')"
              style="min-width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="this.$t('operation_query.select_title')"
            class="query-params-item"
            prop="time"
          >
            <el-date-picker
              v-model="queryParams.time"
              size="small"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="——"
              :start-placeholder="
                this.$t('operation_query.select_placeholder1')
              "
              :end-placeholder="this.$t('operation_query.select_placeholder2')"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            :label="this.$t('operation_query.select_action_title')"
            class="query-params-item"
            prop="type"
          >
            <el-select
              v-model="queryParams.type"
              size="small"
              style="min-width: 240px"
            >
              <el-option
                v-for="item in typeList"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="btnLoading"
              icon="el-icon-search"
              class="btn_bg"
              size="small"
              @click="querySubmit"
              >{{ $t("operation_buttons.button1") }}</el-button
            >
            <el-button
              type="primary"
              plain
              icon="el-icon-refresh"
              size="small"
              @click="resetForm()"
              >{{ $t("operation_buttons.button2") }}</el-button
            >
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
          @sort-change="sortChange"
          :element-loading-text="this.$t('loading')"
        >
          <el-table-column
            prop="extendName"
            :label="this.$t('operation_table.user_name')"
            sortable="custom"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="staffName"
            :label="this.$t('operation_table.name')"
            sortable="custom"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="objectname"
            label="IP"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="operateTime"
            :label="this.$t('operation_table.time')"
            sortable="custom"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="operateType"
            :label="this.$t('operation_table.type')"
            min-width="160"
          ></el-table-column>
          <el-table-column
            v-if="language=='zh'"
            prop="remark"
            :label="this.$t('operation_table.description')"
            min-width="200"
          ></el-table-column>
          <el-table-column
            v-if="language=='en'"
            prop="orgName"
            :label="this.$t('operation_table.description')"
            min-width="200"
          ></el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="pagination-item">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { operationLogListApi } from "@/api/operationLog";
export default {
  name: "operationLog",
  components: {},
  data() {
    return {
      sortby: "",
      orderby: "",
      queryParams: {
        name: "",
        time: "",
        type: "",
      },
      language:"",
      //操作类型
      typeList: [
        { label: this.$t('operation_query.action_option1'), value: "" },
        { label: this.$t('operation_query.action_option2'), value: 2 },
        { label: this.$t('operation_query.action_option3'), value: 3 },
        { label: this.$t('operation_query.action_option4'), value: 4 },
        { label: this.$t('operation_query.action_option5'), value: 0 },
      ],
      tableData: [],
      tableLoading: false, //表格load效果
      btnLoading: false,//按钮load效果
      pageNum: 1,
      pageSize: 20,
      tableDataTotal: 0,
    };
  },
  mounted() {
    this.getOperationLogList();
    this.language = window.localStorage.getItem('language');
  },
  methods: {
    //查询提交
    querySubmit() {
      this.pageNum = 1; //重置当前页
      this.getOperationLogList();
    },
    getOperationLogList() {
      this.tableLoading = true;
      this.btnLoading = true;
      var param = {
        sortby: this.sortby,
        orderby: this.orderby,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        extendName: this.queryParams.name, //用户名
        staffName: this.queryParams.name, //姓名
        createTimeStart: this.queryParams.time[0],
        createTimeEnd: this.queryParams.time[1],
        operateType: this.queryParams.type,
      };
      operationLogListApi(param).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].operateType == 0) {
            this.tableData[i].operateType = this.$t('operation_query.action_option5');
          } else if (this.tableData[i].operateType == 2) {
            this.tableData[i].operateType = this.$t('operation_query.action_option2');
          } else if (this.tableData[i].operateType == 3) {
            this.tableData[i].operateType = this.$t('operation_query.action_option3');
          } else if (this.tableData[i].operateType == 4) {
            this.tableData[i].operateType = this.$t('operation_query.action_option4');
          }
        }
        this.tableDataTotal = res.data.total;
        this.tableLoading = false;
        this.btnLoading = false;
      });
    },
    //排序
    sortChange: function (column, prop, order) {
      // console.log(column);
      // console.log(column.order);
      this.sortby = column.prop;
      if (this.sortby == 'extendName') {
        this.sortby = 'extend_name';
      }
      if (this.sortby == 'staffName') {
        this.sortby = 'staff_name';
      }
      if (this.sortby == 'operateTime') {
        this.sortby = 'operate_time';
      }
      if (column.order == "descending") {
        this.orderby = "DESC";
      } else if (column.order == "ascending") {
        this.orderby = "ASC";
      } else {
        this.orderby = "";
        this.sortby = "";
      }      
      this.getOperationLogList();
    },
    //重置查询
    resetForm(formName) {
      this.queryParams = {
        extendName:"",
        staffName: "",
        time:[],
        operateType: "",
      }
      this.pageNum = 1 //重置页数
      this.pageSize = 20; //重置条数
      this.getOperationLogList();
    },
    handleSizeChange(val) {
      this.pageNum = 1; //重置页数
      this.pageSize = val;
      this.getOperationLogList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getOperationLogList();
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
    margin-top: 20px;
  }
  .table-item {
    margin-top: 30px;
  }

  .pagination-item {
    margin-top: 16px;
  }
}
</style>