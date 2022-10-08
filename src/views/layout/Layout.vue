<template>
  <div class="app-wrapper" :class="classObj">
    <!-- 固定顶部 设置fixedHeader为true -->
    <div
      v-if="fixedHeader"
      class="top-header"
      :class="sidebar.opened ? '' : 'closeSidebar-width'"
    >
      <navbar ref="Navbar"></navbar>
      <tags-view></tags-view>
    </div>
    <!-- 固定顶部结束 -->
    <!-- 不固定顶部 设置fixedHeader为false -->
    <div v-if="!fixedHeader">
      <navbar></navbar>
      <tags-view></tags-view>
    </div>
    <!-- 不固定顶部结束 -->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
export default {
  // name: 'layout',
  data() {
    return {
      fixedHeader: true,
    };
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  created() {
    //页面刚进入时开启长连接
    this.initWebSocket();
  },
  mounted() {
  },
  destroyed: function () {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  methods: {
    //初始化weosocket
    initWebSocket() {
      var userId = localStorage.getItem('staffId');
      var pushSourceId = 10001;
      const wsuri =
        wsUrl+userId +"&pushSourceId=" +pushSourceId; //连接地址，可加参数
      this.websocket = new WebSocket(wsuri);
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("WebSocket连接成功----");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误----");
    },
    websocketonmessage(e) {
      if (e) {
        let obj = JSON.parse(e.data);
        console.log(obj);
        //数据接收
        let language = window.localStorage.getItem('language');
        let titleText ="";
        let contentText ="";
        if (language == 'zh'){
          titleText = obj.title,
          contentText = obj.content
        } else if (language == 'en'){
          titleText = obj.titleEnUs,
          contentText = obj.contentEnUs
        };
        this.$notify({
          title: titleText,
          message: contentText,
          position: "top-right",
          // duration: 9000,
          offset: 100,
          type: "warning",
        });
      }
    },
    //关闭常连接
    websocketclose(e) {},

    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .top-header {
    box-shadow: 2px 2px 6px #d9d9d9;
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  background-color: #f2f1ff;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.main-container {
  height: calc(100vh - 85px);
}
</style>
