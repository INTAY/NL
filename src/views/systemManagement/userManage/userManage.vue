<template>
  <div class="app-container">
    <div v-if="userManage">
      <div class="main_title">
        <b>{{ $t("user_manage_title.title") }}</b>
      </div>
      <div class="query-params">
        <el-form
          :model="queryParams"
          :inline="true"
          label-width="50px"
          ref="queryForm"
        >
          <el-form-item
            :label="this.$t('user_manage_query.input_title')"
            class="query-params-item"
          >
            <el-input
              v-model.trim="queryParams.name"
              size="small"
              :placeholder="this.$t('user_manage_query.input_placeholder')"
              style="min-width: 320px"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="this.$t('user_manage_table.user_state')"
            label-width="100px"
            class="query-params-item"
          >
            <el-select
              v-model="queryParams.state"
              size="small"
              :placeholder="this.$t('user_manage_query.select_placeholder2')"
            >
              <el-option
                v-for="item in stateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              class="btn_bg"
              size="small"
              :loading="btnLoading"
              @click="querySubmit(queryParams)"
              >{{ $t("user_manage_buttons.button1") }}</el-button
            >
            <el-button
              type="primary"
              plain
              icon="el-icon-refresh"
              size="small"
              @click="resetForm()"
              >{{ $t("user_manage_buttons.button2") }}</el-button
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
          style="margin: 10px 0"
          icon="el-icon-plus"
          size="small"
          @click="addUser"
          >{{ $t("user_manage_buttons.button3") }}</el-button
        >
      </div>

      <!-- 表格 -->
      <div class="table-item">
        <el-table
          :data="tableData"
          stripe
          class="w100p"
          max-height="570px"
          v-loading="tableLoading"
          :element-loading-text="this.$t('rules.loading')"
          @sort-change="sortChange"
        >
          <el-table-column
            prop="employeeCode"
            :label="this.$t('user_manage_table.user_id')"
            sortable="custom"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="username"
            :label="this.$t('user_manage_table.user_name')"
            sortable="custom"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="name"
            :label="this.$t('user_manage_table.name')"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="phone"
            :label="this.$t('user_manage_table.phone_number')"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            :label="this.$t('user_manage_table.creat_time')"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="state"
            :label="this.$t('user_manage_table.user_state')"
            min-width="120"
          ></el-table-column>
          <el-table-column
            :label="this.$t('user_manage_table.title_operation')"
            width="450"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                v-if="scope.row.status == 2"
                type="primary"
                @click="checkState(scope.row)"
                >{{ $t("user_manage_buttons.button7") }}</el-button
              >
              <el-button
                size="mini"
                type="warning"
                v-if="scope.row.status == 1"
                @click="checkState(scope.row)"
                >{{ $t("user_manage_buttons.button8") }}</el-button
              >
              <el-button size="mini" @click="viewDetail(scope.row)">{{
                $t("user_manage_buttons.button4")
              }}</el-button>
              <el-button size="mini" @click="edit(scope.row)">{{
                $t("user_manage_buttons.button5")
              }}</el-button>
              <el-button size="mini" @click="resetPwd(scope.row)">{{
                $t("user_manage_buttons.button9")
              }}</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteUser(scope.row)"
                >{{ $t("user_manage_buttons.button6") }}</el-button
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
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataTotal"
        ></el-pagination>
      </div>
    </div>
    <userAdd @showAdd="showAdd" v-if="add"></userAdd>
    <userUpdate
      @showUser="showUser"
      :staffId="staffId"
      v-if="update"
    ></userUpdate>
    <userDetail
      @showDetail="showDetail"
      :staffId="staffId"
      v-if="detail"
    ></userDetail>
  </div>
</template>

<script>
import { queryUserPageApi, updateUserStatusApi } from "@/api/userManage";
import { deleteUserApi } from "@/api/userManage";
// import { orgDeptlistApi } from "@/api/userManage";
import { resetPasswdApi } from "@/api/userManage";
import { updatePasswdApi } from "@/api/login";
import userAdd from "./component/add";
import userUpdate from "./component/update";
import userDetail from "./component/detail";
import md5 from "js-md5";
export default {
  name: "userManage",
  components: {
    userAdd,
    userUpdate,
    userDetail,
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("rules.enter_current_password")));
      } else {
        if (this.ruleForm.confirmPwd !== "") {
          this.$refs.ruleForm.validateField("confirmPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("rules.enter_again")));
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error(this.$t("rules.two_passwords")));
      } else {
        callback();
      }
    };
    return {
      userManage: true,
      add: false,
      update: false,
      detail: false,
      dialogFormVisible: false,
      staffId: "",
      userId: "",
      sortby: "",
      orderby: "",
      // userState: false,
      queryParams: {
        user: "0",
        role: "0",
        state: "",
      },

      //状态
      stateList: [
        { value: "", label: this.$t("role_manage_query.role_state_all")},
        { value: "1", label: this.$t("role_manage_query.role_state_using")},
        { value: "2", label: this.$t("role_manage_query.role_state_disabled")},
      ],
      selectedId: "",
      tableData: [],
      formLabelWidth: "120px",
      userInfo: {
        currentPassword: "",
        newPassword: "",
        passwordAgin: "",
      },
      tableLoading: false, //表格load效果
      btnLoading: false,//按钮load效果
      // resetPwdLoading: false,//重置密码按钮load效果
      pageNum: 1,
      pageSize: 20,
      tableDataTotal: 0,
      rules: {
        newPassword: [
          /* required: true, message: "请输入密码", trigger: "blur" },*/
          {
            min: 6,
            max: 16,
            message: this.$t("rules.length_up_6_16"),
            trigger: "blur",
          },
          { validator: validatePass, required: true, trigger: "blur" },
        ],
        passwordAgin: [
          /*{ required: true, message: "请确认密码", trigger: "blur" },*/
          {
            min: 6,
            max: 16,
            message: this.$t("rules.length_up_6_16"),
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur", required: true },
        ],
      },
    };
  },
  mounted() {
    this.queryUserPage();
    // this.orgDeptlist();
    window.localStorage.setItem("url", "systemManagement/userManage");
  },
  methods: {
    queryUserPage() {
      this.tableLoading = true;
      this.btnLoading = true;
      var params = {
        name: this.queryParams.name,
        username: this.queryParams.name,
        employeeCode: this.queryParams.name,
        status: this.queryParams.state,
        sortby: this.sortby,
        orderby: this.orderby,
        pageNum: this.pageNum, //重置页数
        pageSize: this.pageSize, //重置条数
      };
      queryUserPageApi(params).then((res) => {
        this.tableData = res.data.list;
        for (let j = 0, len = this.tableData.length; j < len; j++) {
          if (this.tableData[j].status == 1) {
            this.tableData[j].state = this.$t("role_manage_query.role_state_using");
          } else if (this.tableData[j].status == 2) {
            this.tableData[j].state = this.$t("role_manage_query.role_state_disabled");
          }
        }
        this.tableDataTotal = res.data.total;
        this.tableLoading = false;
        this.btnLoading = false;
      });
    },

    //排序
    sortChange: function (column, prop, order) {
      this.sortby = column.prop;
      if (this.sortby == "employeeCode") {
        this.sortby = "employee_code";
      }
      if (column.order == "descending") {
        this.orderby = "DESC";
      } else if (column.order == "ascending") {
        this.orderby = "ASC";
      }else{
        this.orderby = ''
        this.sortby = ''
      }
      
      this.queryUserPage();
    },

    //查询提交
    querySubmit(param) {
      this.pageNum = 1; //重置当前页
      this.queryUserPage();
    },
    //重置查询
    resetForm() {
      (this.queryParams = {
        user: "",
        organization: "",
        department: "",
      }),
        (this.pageNum = 1), //重置页数
        (this.pageSize = 20), //重置条数
        this.queryUserPage();
    },
    handleSizeChange(val) {
      this.pageNum = 1; //重置页数
      this.pageSize = val;
      this.queryUserPage();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.queryUserPage();
    },
    //添加用户
    addUser() {
      this.add = true;
      this.userManage = false;
    },
    //切换用户状态
    checkState(row) {
      var state = "";
      if (row.status == 1) {
        state = 2;
      }
      if (row.status == 2) {
        state = 1;
      }
      var params = {
        status: state,
        staffId: row.staffId
      };
      updateUserStatusApi(params).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: this.$t("change_sucess"),
            type: "success",
          });
          this.queryUserPage();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 修改
    edit(row) {
      this.update = true;
      this.userManage = false;
      this.staffId = row.staffId;
    },
    //配置
    viewDetail(row) {
      this.detail = true;
      this.userManage = false;
      this.staffId = row.staffId;
    },
    //删除
    deleteUser(row) {
      this.$confirm(
        this.$t("user_manage_table.confirm_text"),
        this.$t("user_manage_table.confirm_title"),
        {
          type: "warning",
        }
      ).then(() => {
        deleteUserApi(row.staffId).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: this.$t("user_manage_table.confirm_result"),
              type: "success",
            });
            this.queryUserPage();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    //重置密码
    resetPwd(row) {
      // this.resetPwdLoading = true;
      let params = {
        adminId: row.staffId,
      };
      this.$confirm(
        this.$t("rules.reset_password"),
        this.$t("user_manage_buttons.button9"),
        {
          type: "warning",
        }
      ).then(() => {
        resetPasswdApi(params).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: this.$t("rules.reset_password_tip"),
              type: "success",
            });
            // this.resetPwdLoading = false;
            this.queryUserPage();
          } else {
            this.$message.error(res.msg);
            // this.resetPwdLoading = false;
            return;
          }
        });
      });
    },
    /*//修改密码
    updatePasswd() {
      var param = {
        staffId: this.userId,
        oldPassword: md5(this.userInfo.currentPassword),
        newPassword: md5(this.userInfo.newPassword),
      };
      updatePasswdApi(param).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "密码修改成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.queryUserPage();
        } else {
          this.$message.error(res.msg);
          return;
        }
      });
    },*/
    handleChange(value) {
      this.queryParams.deptName = value;
      console.log(value);
    },
    showAdd() {
      this.add = false;
      this.userManage = true;
      this.queryUserPage();
    },
    showUser() {
      this.update = false;
      this.userManage = true;
      this.queryUserPage();
    },
    showDetail() {
      this.detail = false;
      this.userManage = true;
      this.queryUserPage();
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
</style>