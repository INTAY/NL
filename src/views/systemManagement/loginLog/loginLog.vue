<template>
  <div class="app-container">
    <div>
      <div class="main_title">
        <b>{{ $t("login_title.title") }}</b>
      </div>
      <div class="query-params">
        <el-form
          :model="queryParams"
          :inline="true"
          label-width="50px"
          ref="queryForm"
        >
          <el-form-item
            :label="this.$t('login_query.input_title')"
            class="query-params-item"
            prop="name"
          >
            <el-input
              v-model.trim="queryParams.name"
              size="small"
              :placeholder="this.$t('login_query.input_placeholder')"
              style="min-width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label-width="120px"
            :label="this.$t('login_query.select_title')"
            class="query-params-item"
            prop="time"
          >
            <el-date-picker
              v-model="queryParams.time"
              size="small"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="——"
              :start-placeholder="this.$t('login_query.select_placeholder1')"
              :end-placeholder="this.$t('login_query.select_placeholder2')"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            :label="this.$t('login_query.select_action_title')"
            class="query-params-item"
            prop="action"
          >
            <el-select
              v-model="queryParams.action"
              prop="action"
              size="small"
              style="width: 270px"
            >
              <el-option
                v-for="item in actionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
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
              >{{ $t("login_buttons.button1") }}</el-button
            >
            <el-button
              type="primary"
              plain
              icon="el-icon-refresh"
              size="small"
              @click="resetForm()"
              >{{ $t("login_buttons.button2") }}</el-button
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
            prop="name"
            :label="this.$t('login_table.user_name')"
            sortable="custom"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="realname"
            :label="this.$t('login_table.name')"
            sortable="custom"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="ip"
            label="IP"
            min-width="200"
          ></el-table-column>
          <el-table-column
            v-if="language=='zh'"
            prop="action"
            :label="this.$t('login_table.action')"
            min-width="160"
          ></el-table-column>
          <el-table-column
            v-if="language=='en'"
            prop="msg"
            :label="this.$t('login_table.action')"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="created"
            :label="this.$t('login_table.time')"
            sortable="custom"
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
import { loginLogListApi } from "@/api/operationLog";
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
        action: "0",
      },
      actionList: [
        {
          value: "0",
          label: this.$t("login_query.action_option1"),
        },
        {
          value: "1",
          label: this.$t("login_query.action_option2"),
        },
        {
          value: "2",
          label: this.$t("login_query.action_option3"),
        },
      ],
      tableData: [],
      language:"",
      tableLoading: false, //表格load效果
      btnLoading: false,//按钮load效果
      pageNum: 1,
      pageSize: 20,
      tableDataTotal: 0,
    };
  },
  mounted() {
    this.getLoginLogList();
    this.language = window.localStorage.getItem('language');
  },
  methods: {
    //查询提交
    querySubmit() {
      this.pageNum = 1; //重置当前页
      this.getLoginLogList();
    },
    getLoginLogList() {
      this.tableLoading = true;
      this.btnLoading = true;
      var startDate,endDate;
      if (this.queryParams.time) {
        startDate = this.queryParams.time[0];
        endDate = this.queryParams.time[1];
      } else {
        startDate = null;
        endDate = null;
      }
      var loginAction = '';
      if (this.queryParams.action == 0) {
        loginAction = ''
      }
      if (this.queryParams.action == 1) {
        loginAction = '登陆'
      }
      if (this.queryParams.action == 2) {
        loginAction = '退出'
      }
      var param = {
        sortby: this.sortby,
        orderby: this.orderby,
        pageNum: this.pageNum,
        name: this.queryParams.name,
        pageSize: this.pageSize,
        minCreated: startDate,
        maxCreated: endDate,
        action: loginAction,
      };
      loginLogListApi(param).then((res) => {
        this.tableData = res.data.list;
        /*for(let i=0; i<this.tableData.length; i++) {
          this.tableData[i].action = "登录";
        }*/
        this.tableDataTotal = res.data.total;
        this.tableLoading = false;
        this.btnLoading = false;
      });
    },
    //排序
    sortChange: function (column, prop, order) {
      // console.log(column);
      // console.log(column.order);
      if (column.prop == "name") {
        this.sortby = "a.name"
      }
      if (column.prop == "realname") {
        this.sortby = "a.realname"
      }
      if (column.prop == "created") {
        this.sortby = "al.created"
      }
      if (column.order == "descending") {
        this.orderby = "DESC";
      } else if (column.order == "ascending") {
        this.orderby = "ASC";
      } else {
        this.orderby = "";
        this.sortby = "";
      }
      this.getLoginLogList();
    },
    //重置查询
    resetForm() {
      this.queryParams = {
        name:"",
        time:""
      },
      console.log(this.queryParams);
      this.pageNum = 1; //重置页数
      this.pageSize = 20; //重置条数
      this.getLoginLogList();
    },
    handleSizeChange(val) {
      this.pageNum = 1; //重置页数
      this.pageSize = val;
      this.getLoginLogList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getLoginLogList();
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