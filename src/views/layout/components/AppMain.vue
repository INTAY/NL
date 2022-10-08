<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    data() {
      return {
        views: []
      }
    },
    computed: {
      key() {
        return this.$route.fullPath
      },
      //需要缓存的页面，在路由配置中的meta中设置keepAlive为true。同是组件中的name属性需要和路由中的一样
      includedViews() {
        let isRepeat = this.views.indexOf(this.$route.name) > -1;
        if(this.$route.meta.keepAlive && !isRepeat){
          this.views.push(this.$route.name)
        }
        return this.views
      }
    },
  }

</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    max-height: calc(100vh - 85px);
    position: relative;
    overflow: hidden;
    background: none;
  }
</style>
