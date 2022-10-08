<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  mounted () {
    // this.$store.dispatch("terminalTypeList");
    // this.$store.dispatch("userStatusList");
    // this.$store.dispatch("dataSourcesList");
    // this.$store.dispatch("industryDataList");
    // this.$store.dispatch("positionChannelList");
  },
  methods:{
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>
