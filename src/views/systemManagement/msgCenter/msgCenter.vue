<template>
  <div class="app-container">
    <div class="main_title">
      <b>{{ $t("msg_title.title") }}</b>
    </div>
    <el-form
      :model="queryParams"
      :inline="true"
      ref="queryForm"
      style="text-align: right; height: 30px"
    >
      <el-form-item class="query-params-item" prop="name">
        <el-input
          v-model.trim="queryParams.name"
          size="small"
          :placeholder="this.$t('msg_buttons.input_placeholder')"
          style="min-width: 240px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          class="btn_bg"
          size="small"
          @click="querySubmit()"
          >{{ $t("msg_buttons.button1") }}</el-button
        >
        <el-button
          type="primary"
          plain
          icon="el-icon-refresh"
          size="small"
          @click="resetForm()"
          >{{ $t("msg_buttons.button2") }}</el-button
        >
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="this.$t('msg_buttons.button3')" name="2">
      </el-tab-pane>
      <el-tab-pane :label="this.$t('msg_buttons.button4')" name="1">
      </el-tab-pane>
      <el-tab-pane :label="this.$t('msg_buttons.button5')" name="0">
      </el-tab-pane>
    </el-tabs>
    <!-- 表格 -->
    <div class="table-item">
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        class="w100p"
        max-height="590px"
        v-loading="tableLoading"
        @selection-change="handleSelectionChange"
        :element-loading-text="this.$t('loading')"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column width="50">
          <template slot-scope="scope">
            <svg-icon
              icon-class="icon-read"
              v-if="scope.row.isRead == 1"
              class="icon_msg"
            />
            <svg-icon
              icon-class="icon-unread"
              v-if="scope.row.isRead == 0"
              class="icon_msg"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="language == 'zh'"
          prop="title"
          :label="this.$t('msg_table.title')"
          min-width="100"
        ></el-table-column>
        <el-table-column
          v-if="language == 'en'"
          prop="titleEnUs"
          :label="this.$t('msg_table.title')"
          min-width="100"
        ></el-table-column>
        <el-table-column
          v-if="language == 'zh'"
          prop="content"
          :label="this.$t('msg_table.content')"
          min-width="300"
        ></el-table-column>
        <el-table-column
          v-if="language == 'en'"
          prop="contentEnUs"
          :label="this.$t('msg_table.content')"
          min-width="300"
        ></el-table-column>
        <el-table-column
          prop="pushTime"
          :label="this.$t('msg_table.time')"
          min-width="100"
        ></el-table-column>
        <el-table-column
          :label="this.$t('device_manage_table.title_operation')"
          min-width="50"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="viewDetail(scope.row)">{{
              $t("customer_manage_buttons.button5")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-item">
      <el-button
        type="primary"
        size="small"
        :disabled="!multipleSelection.length"
        @click="delMsg"
        style="float: left"
        icon="el-icon-delete"
        >{{ $t("msg_buttons.button6") }}</el-button
      >
      <el-pagination
        style="float: right"
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
    <el-dialog
      :title="msgDialogTitle"
      :visible.sync="msgDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="msgDialogMain">
        <p class="content">{{ msgDialogContent }}</p>
        <p class="time">{{ msgDialogTime }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">{{
          $t("device_edit_buttons.button2")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryMsgListApi,
  viewDetailApi,
  deleteMsgApi,
  msgRedApi,
} from "@/api/messageCenter";

export default {
  name: "msgrManage",
  components: {},
  data() {
    return {
      activeName: "2",
      queryParams: {
        name: "",
      },
      language: "",
      tableData: [],
      deleteBtn: true,
      msgState: false,
      tableLoading: false, //表格load效果
      pageNum: 1,
      pageSize: 10,
      tableDataTotal: 0,
      msgDialogVisible: false,
      msgDialogTitle: "",
      msgDialogContent: "",
      msgDialogTime: "",
      multipleSelection:[]
    };
  },
  mounted() {
    this.language = window.localStorage.getItem("language");
    this.getMsgList("");
  },
  methods: {
    handleClick(tab, event) {
      if (this.activeName == 2) {
        this.activeName = "";
      }
      this.getMsgList(this.activeName);
    },
    //查询提交
    querySubmit() {
      this.pageNum = 1; //重置当前页
      this.handleClick();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getMsgList(val) {
      var param = {};
      if (this.language == "en") {
        param = {
          isRead: val,
          likeTitleContentEnUs: this.queryParams.name,
          current: this.pageNum,
          size: this.pageSize,
          receiverId: localStorage.getItem("staffId"),
        };
      } else if (this.language == "zh") {
        param = {
          isRead: val,
          likeTitleContent: this.queryParams.name,
          current: this.pageNum,
          size: this.pageSize,
          receiverId: localStorage.getItem("staffId"),
        };
      }
      queryMsgListApi(param).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.tableDataTotal = res.data.total;
          if (this.tableDataTotal == 0) {
            this.deleteBtn = false;
          } else {
            this.deleteBtn = true;
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //重置查询
    resetForm(formName) {
      (this.queryParams = {
        name: "",
      }),
        (this.pageNum = 1); //重置页数
      this.pageSize = 10; //重置条数
      this.handleClick();
    },
    handleSizeChange(val) {
      this.pageNum = 1; //重置页数
      this.pageSize = val;
      this.handleClick();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.handleClick();
    },
    //查询详情
    viewDetail(row) {
      console.log(row);
      this.msgDialogVisible = true;
      this.getMsgDetail(row);
    },
    cancel() {
      this.msgDialogVisible = false;
      this.handleClick();
    },
    handleClose() {
      this.msgDialogVisible = false;
      this.handleClick();
    },
    getMsgDetail(row) {
      viewDetailApi(row.messageId).then((res) => {
        if (res.code == 200) {
          if (this.language == "en") {
            this.msgDialogTitle = res.data.titleEnUs;
            this.msgDialogContent = res.data.contentEnUs;
            this.msgDialogTime = res.data.pushTime;
          } else if (this.language == "zh") {
            this.msgDialogTitle = res.data.title;
            this.msgDialogContent = res.data.content;
            this.msgDialogTime = res.data.pushTime;
          }
          this.getMsgRed(row.id);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getMsgRed(id) {
      msgRedApi(id).then((res) => {
        if (res.code == 200) {
          this.$store.dispatch("GetMsgUnreadCount");
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //删除消息
    delMsg() {
      var ids = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id);
      }
      console.log(ids);
      var param = ids;
      deleteMsgApi(param).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
          });
          this.getMsgList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/#app .main-container {
  background-color: #e5e5e5;
}
/deep/.avatar-uploader .el-upload {
  border-radius: 50%;
}

.app-container {
  .icon_msg {
    font-size: 16px;
  }
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
  .msgDialogMain {
    width: 100%;
    padding: 0 20px;
    min-height: 140px;
    display: flex;
    .content {
      width: 70%;
      line-height: 24px;
      color: #1c1c1c;
    }
    .time {
      width: 30%;
      line-height: 24px;
      font-size: 12px;
      margin: 14px;
      color: #b1b1b1;
      text-align: right;
    }
  }
}
/deep/ .el-dialog__header {
  margin-bottom: 0px;
}
</style>