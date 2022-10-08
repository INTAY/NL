<template>
  <div>
    <div class="main_title">
      <b>{{$t('role_configuration_title.title')}}</b>
    </div>
    <div class="main">
      <div class="area">
        <b>{{$t('role_configuration_title.title2')}}</b>
          <el-tree
            :data="dataTree"
            show-checkbox
            v-loading="treeLoading"
            :default-checked-keys="roleIds"
            node-key="id"
            ref="tree"
            @check-change="handleCheckChange"
            default-expand-all
            :props="defaultProps"
          ></el-tree>
      </div>
    </div>
    <div class="main_bottom">
      <el-form class="bottom">
        <el-button type="primary" :loading="btnLoading" icon="el-icon-circle-check" @click="submit()">{{$t('main_content.button_name1')}}</el-button>
        <el-button type="primary" icon="el-icon-circle-close" plain @click="reBack()">{{$t('main_content.button_name2')}}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { queryResourceTreeApi } from "@/api/roleManage";
import { addRoleResApi } from "@/api/roleManage";

export default {
  name: "add",
  components: {},
  props: ["roleId"],
  data() {
    return {
      // data: [],
      dataTree: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      treeData: [],
      treeLoading: false,
      btnLoading: false,
      roleIds: [],
      checkedTree:[],
    };
  },
  mounted() {
    this.queryResourceTree();
  },
  methods: {
    //查询权限
    queryResourceTree() {
      this.treeLoading = true;
      console.log(this.roleId);
      var param = {
        subSysId: window.localStorage.getItem("subSysId"),
        roleId: this.roleId,
      };
      queryResourceTreeApi(param).then((res) => {
        this.dataTree = res.data;
        this.chooseCheckTree(this.dataTree);
        this.treeLoading = false;
      });
    },
    handleCheckChange(data, checked) {
      data.checked = checked;
    },
    getCheckedNodes() {
      var tree = [];
      tree = this.$refs.tree.getCheckedNodes(false, true);
      var checkTree = [];
      checkTree = JSON.parse(JSON.stringify(tree));
      checkTree = this.mergeTreeArray(checkTree, null);
      this.checkedTree = checkTree;
      console.log('101010101100',this.checkedTree);
    },
    mergeTreeArray(tree, parentId) {
      var checkTree = [];
      var mergeTree = JSON.parse(JSON.stringify(tree));
      for (var i = 0; i < tree.length; i++) {
        if (tree[i].parentId == parentId) {
          this.remove(mergeTree, tree[i].roleResId);
          tree[i].children = this.mergeTreeArray(mergeTree, tree[i].roleResId);
          checkTree.push(tree[i]);
        }
      }
      return checkTree;
    },
    remove(mergeTree, roleResId) {
      for (var i = 0; i < mergeTree.length; i++) {
        if (mergeTree[i] == roleResId) {
          mergeTree.splice(i, 1);
          break;
        }
      }
    },
    chooseCheckTree(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].checked == true) {
          this.roleIds.push(data[i].id);
          console.log(this.roleIds,'this.roleIdsthis.roleIds');
        }
        if (data[i].checked == undefined) {
          // data.splice(i, 1);
          // i--;
        }
      }
      for (var i = 0; i < data.length; i++) {
        if (data[i].checked == false && data[i].children.length == 0) {
          // data.splice(i, 1);
          // i--;
        } else if (data[i].checked == false && data[i].children.length > 0) {
          this.chooseCheckTree(data[i].children);
        }
      }
    },
    submit() {
      this.btnLoading = true;
      this.getCheckedNodes();
      this.treeData = JSON.parse(JSON.stringify(this.checkedTree));
      if(!this.treeData.length){
        this.btnLoading = false;
        this.$message.error(this.$t('role_manage_table.chooseRole'));
        return
      }
      var param = {
        roleId: this.roleId,
        json: JSON.stringify(this.treeData),
        // data: this.treeData.toString()
      };
      addRoleResApi(param).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: this.$t('Configuration_sucess'),
            type: "success",
          });
          this.btnLoading = false;
          this.reBack();
        } else {
          this.$message.error(res.msg);
          this.btnLoading = false;
        }
      });
    },
    reBack() {
      this.config = false;
      this.$emit("showConfig");
      // this.userManage= true
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .main {
    margin: 0;
    padding: 0 20;
    height: 70vh;
    overflow: auto;
    .area {
      width: 500px;
      margin: 0 auto;
      padding-top: 20px;
      .el-tree{
        margin:20px 50px;
      }
    }
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
/deep/.el-tree .el-tree-node .el-tree-node__content {
  height: 36px;
}
</style>
