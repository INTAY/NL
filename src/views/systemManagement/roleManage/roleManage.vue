<template>
  <div class="app-container">
    <div v-if="roleManage">
      <div class="main_title">
        <b>{{ $t("role_manage_title.title") }}</b>
      </div>
      <div class="query-params">
        <el-form
          :model="queryParams"
          :inline="true"
          label-width="50px"
          ref="queryForm"
        >
          <el-form-item
            :label="input_title"
            class="query-params-item"
            prop="name"
          >
            <el-input
              v-model.trim="queryParams.name"
              size="small"
              :placeholder="input_placeholder"
              style="min-width: 270px"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="select_title"
            label-width="90px"
            class="query-params-item"
            prop="roleState"
          >
            <el-select
              v-model.trim="queryParams.roleState"
              :placeholder="select_placeholder"
              prop="roleState"
              size="small"
              style="width: 270px"
            >
              <el-option
                v-for="item in roleStateList"
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
              icon="el-icon-search"
              class="btn_bg"
              size="small"
              :loading="btnLoading"
              @click="querySubmit()"
              >{{ $t("role_manage_buttons.button1") }}</el-button
            >
            <el-button
              type="primary"
              plain
              icon="el-icon-refresh"
              size="small"
              @click="resetForm()"
              >{{ $t("role_manage_buttons.button2") }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <!-- 分割线 -->
      <el-divider content-position="right">
        <!-- <svg-icon icon-class="arrowUp" class="divider-icon" /> -->
        <svg-icon icon-class="groupManage" class="divider-icon" />
      </el-divider>

      <!-- 按钮 -->
      <div class="btn-item">
        <el-button
          type="primary"
          class="btn_bg"
          style="float: right; margin-bottom: 15px"
          icon="el-icon-plus"
          size="small"
          @click="addRole()"
          >{{ $t("role_manage_buttons.button3") }}</el-button
        >
      </div>

      <!-- 表格 -->
      <div class="table-item">
        <el-table
          :data="tableData"
          stripe
          class="w100p"
          max-height="580px"
          v-loading="tableLoading"
          :element-loading-text="this.$t('rules.loading')"
          @sort-change="sortChange"
        >
          <el-table-column
            prop="code"
            :label="title_role_number"
            sortable="custom"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="name"
            :label="title_role_name"
            sortable="custom"
            min-width="100"
          ></el-table-column>
          <el-table-column :label="title_role_status" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.blockFlag == 2" style="color:#F56C6C">{{ scope.row.roleState }}</span>
              <span v-else style="color:#409EFF">{{ scope.row.roleState }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            :label="title_note"
            min-width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            :label="title_operation"
            width="350"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                v-if="scope.row.blockFlag == 2"
                type="primary"
                @click="checkState(scope.row)"
                >{{ $t("role_manage_buttons.button7") }}</el-button
              >
              <el-button
                size="mini"
                type="warning"
                v-if="scope.row.blockFlag == 1"
                @click="checkState(scope.row)"
                >{{ $t("role_manage_buttons.button8") }}</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="configurate(scope.row)"
                >{{ $t("role_manage_buttons.button4") }}</el-button
              >
              <el-button size="mini" type="primary" @click="edit(scope.row)">{{
                $t("role_manage_buttons.button5")
              }}</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteRole(scope.row)"
                >{{ $t("role_manage_buttons.button6") }}</el-button
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
    <roleAdd @showAdd="showAdd" v-if="add"></roleAdd>
    <roleUpdate
      @showRole="showRole"
      :roleId="roleId"
      v-if="update"
    ></roleUpdate>
    <roleConfig
      @showConfig="showConfig"
      :roleId="roleId"
      v-if="config"
    ></roleConfig>
  </div>
</template>

<script>
import { queryRolePageApi,updateRoleApi,deleteRoleApi,updateStatusApi } from "@/api/roleManage";
import roleAdd from "./component/add";
import roleUpdate from "./component/update";
import roleConfig from "./component/configurate";
export default {
  name: "roleManage",
  components: {
    roleAdd,
    roleUpdate,
    roleConfig,
  },
  data() {
    return {
      roleManage: true,
      add: false,
      update: false,
      config: false,
      roleId: "",
      roleState: false,
      roleStateList: [
        {
          value: "",
          label: this.$t("role_manage_query.role_state_all"),
        },
        {
          value: "1",
          label: this.$t("role_manage_query.role_state_using"),
        },
        {
          value: "2",
          label: this.$t("role_manage_query.role_state_disabled"),
        },
      ],
      queryParams: {
        name: "",
        roleState: "",
      },
      sortby: "",
      orderby: "",
      tableData: [],
      tableLoading: false, //表格load效果
      btnLoading: false,//按钮load效果
      pageNum: 1,
      pageSize: 20,
      tableDataTotal: 0,
      //国际化配置数据
      input_title: this.$t("role_manage_query.input_title"), //查询输入框
      input_placeholder: this.$t("role_manage_query.input_placeholder"), //查询输入框提示语
      select_title: this.$t("role_manage_query.select_title"), //查询选择框
      select_placeholder: this.$t("role_manage_query.select_placeholder"), //查询输入框提示语
      //表格标题
      title_role_number: this.$t("role_manage_table.title_role_number"), //角色编号
      title_role_name: this.$t("role_manage_table.title_role_name"), //角色名称
      title_role_status: this.$t("role_manage_table.title_role_status"), //角色状态
      title_note: this.$t("role_manage_table.title_note"), //备注
      title_operation: this.$t("role_manage_table.title_operation"), //操作
    };
  },
  mounted() {
    this.queryRolePage();
    window.localStorage.setItem("url", "systemManagement/roleManage");
  },
  methods: {
    //查询角色分页数据
    queryRolePage() {
      this.tableLoading = true;
      this.btnLoading = true;
      var params = {
        name: this.queryParams.name,
        blockFlag: this.queryParams.roleState,
        sortby: this.sortby,
        orderby: this.orderby,
        pageNum: this.pageNum, //重置页数
        pageSize: this.pageSize, //重置条数
      };
      queryRolePageApi(params).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].blockFlag == 1) {
            this.tableData[i].roleState = this.$t("role_manage_query.role_state_using");
          } else if (this.tableData[i].blockFlag == 2) {
            this.tableData[i].roleState = this.$t("role_manage_query.role_state_disabled");
          } else if (this.tableData[i].blockFlag == 3) {
            this.tableData[i].roleState = this.$t("role_manage_buttons.button6");
          }
        }
        this.tableDataTotal = res.data.total;
        this.tableLoading = false;
        this.btnLoading = false;
      });
    },
    //查询提交
    querySubmit() {
      this.pageNum = 1; //重置当前页
      this.queryRolePage();
    },
    //重置查询
    resetForm() {
      (this.queryParams = {
        name: "",
      }),
        (this.pageNum = 1); //重置页数
      this.pageSize = 20; //重置条数
      this.queryRolePage();
    },
    handleSizeChange(val) {
      this.pageNum = 1; //重置页数
      this.pageSize = val;
      this.queryRolePage();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.queryRolePage();
    },
    //排序
    sortChange: function (column, prop, order) {
      // console.log(column);
      // console.log(column.order);
      this.sortby = column.prop;
      if (column.order == "descending") {
        this.orderby = "DESC";
      } else if (column.order == "ascending") {
        this.orderby = "ASC";
      } else {
        this.orderby = '';
        this.sortby = '';
      }
      this.queryRolePage();
    },
    //添加角色
    addRole() {
      this.add = true;
      this.roleManage = false;
    },
    // 修改
    edit(row) {
      this.update = true;
      this.roleManage = false;
      this.roleId = row.roleId;
    },
    //切换状态
    checkState(row) {
      var state = '';
      if (row.blockFlag == 1) {
        state = 2
      }
      if (row.blockFlag == 2) {
        state = 1
      }
      var params = {
        roleId: row.roleId,
        blockFlag: state,
      };
      updateStatusApi(params).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: this.$t("change_sucess"),
            type: "success",
          });
          this.queryRolePage();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //配置
    configurate(row) {
      this.config = true;
      this.roleManage = false;
      this.roleId = row.roleId;
    },
    showAdd() {
      this.add = false;
      this.roleManage = true;
      this.queryRolePage();
    },
    showRole() {
      this.update = false;
      this.roleManage = true;
      this.queryRolePage();
    },
    showConfig() {
      this.config = false;
      this.roleManage = true;
    },
    //删除
    deleteRole(row) {
      this.$confirm(
        this.$t("role_manage_table.confirm_text"),
        this.$t("role_manage_table.confirm_title"),
        {
          type: "warning",
        }
      ).then(() => {
        var param = {
          code: row.code,
          roleId: row.roleId,
        };
        deleteRoleApi(param).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: this.$t("role_manage_table.confirm_result"),
              type: "success",
            });
            this.queryRolePage();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
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
    margin-top: 16px;
  }

  .pagination-item {
    margin-top: 16px;
  }
  // /deep/.el-tooltip__popper .is-dark{
  //   width: 50%;
  // }
}
</style>