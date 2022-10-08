<template>
  <el-pagination background @size-change="sizeChange" @current-change="pageChange"
    :current-page="current" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper" :total="total">
  </el-pagination>
</template>

<script>

export default {
  data() {
    return {
     
    };
  },
  props:{
    current:{
      default:1
    },
    pageSize:{
      default:10
    },
    total:{
      default:0
    },
  },
  methods: {

    /**
     * 分页 - 数量改变
     */
    sizeChange(val) {
      this.$parent.sizeChange(val);
      // this.pageNum = 1; //重置页数
      // this.pageSize = val;
    },
    /**
     * 分页改变
     */
    pageChange(val) {
      this.$parent.pageChange(val)
      // this.pageNum = val;
      // this._accountPageList();
    },
    
  }
};
</script>

<style lang="scss" scoped>

</style>
