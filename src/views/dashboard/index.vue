<template>
  <div class="app-container">
    <h3><i class="el-icon-time"></i>&nbsp;&nbsp;{{ nowDate }}</h3>
    <div>
      <lineEcharts ref="lineEcharts"> </lineEcharts>
    </div>
  </div>
</template>

<script>
import lineEcharts from "./components/lineEcharts";
import moment from "moment"; //导入文件
export default {
  name: "Index",
  components: {
    lineEcharts,
  },
  data() {
    return {
      nowDate: "", // 当前日期
    };
  },
  methods: {
    currentTime() {
      setInterval(this.formatDate, 500);
    },
    formatDate() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.nowDate = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    },
  },
  mounted() {
    this.currentTime();
    
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.app-container {
  h3 {
    margin: 0;
    font-weight: normal;
    line-height: 24px;
    font-size: 16px;
    margin-bottom: 10px;
  }
}
</style>
