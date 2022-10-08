<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      background-color="#ffffff"
      text-color="#65767f"
      active-text-color="#3d40a1"
      :collapse-transition="true"
      :unique-opened="true"
      :router="true"
     
    > 
    <div v-if="this.switchState == 'en'">
       <div v-for="item in menuData" :key="item.name">
        <el-submenu :index="item.name||item.url" v-if="item.children.length">
          <template slot="title">
            <img :src="url(item.icon)" alt="" style="width:14px;height:14px;margin-right:15px;" v-if="item.icon" />
            <svg-icon icon-class="resourceManagement" v-else></svg-icon>
            <span>{{item.description}}</span>
          </template>
          <el-menu-item v-for="n in item.children" :key="n.name||n.url" :index="getUrl(n.url)">{{n.description}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="getUrl(item.url)" v-else>
          <template slot="title">
            <img :src="url(item.icon)" alt="" style="width:14px;height:14px;margin-right:15px;" v-if="item.icon" />
            <svg-icon icon-class="home" v-else></svg-icon>
            <span>{{item.description}}</span>
          </template>
        </el-menu-item>
      </div>
    </div>
    <div v-else>
      <div v-for="item in menuData" :key="item.name">
        <el-submenu :index="item.name||item.url" v-if="item.children.length">
          <template slot="title">
            <img :src="url(item.icon)" alt="" style="width:14px;height:14px;margin-right:15px;" v-if="item.icon" />
            <svg-icon icon-class="resourceManagement" v-else></svg-icon>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="n in item.children" :key="n.name||n.url" :index="getUrl(n.url)">{{n.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="getUrl(item.url)" v-else>
          <template slot="title">
            <img :src="url(item.icon)" alt="" style="width:14px;height:14px;margin-right:15px;" v-if="item.icon" />
            <svg-icon icon-class="home" v-else></svg-icon>
            <span>{{item.name}}</span>
          </template>
        </el-menu-item>
      </div>
    </div>
      <!-- <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item> -->
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { queryResourceTreeApi,getMenu } from "@/api/roleManage";
export default {
  data(){
    return {
      menuData:[],
      switchState:"",
      firstPage:[
          {
          name:'首页',
          url:'index',
          description: "Home",
          children:[]
        }
      ],
       
    }
  },
  inject:['reload'],
  mounted () {
    this.$store.dispatch("GetMenuData").then((res) => {});
    this.switchState = window.localStorage.getItem("language");
    this.menuData = JSON.parse(window.localStorage.getItem("menuData"))
    this.menuData = this.firstPage.concat(this.menuData)
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar', 'historyRouter'
    ]),
    routes() {
      console.log(this.$router.options.routes,'this.$router.options.routes')
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    pathRuter() {
      return sessionStorage.getItem('pathUrl')
    },
    
  },
  watch:{
    $router(to,form) {
    }
  },
  methods: {
    url(val){
      var imageUrl = '/web/static/head_icons/';
      return imageUrl+val+'.png'
    },
    getUrl(val){
      let arr = val.split("")
      if(arr[0] == '/'){
        return val
      }else{
        return `/`+val
      }
    },
    handleSelect(index, indexPath) {
      sessionStorage.setItem('pathUrl', index);

      this.$store.commit('historyRouter', this.$router.history.current.name);
      if (this.$router.history.current.name == this.historyRouter) {
        this.reload();
      }
        this.reload();
    },
    // getMenuA(){
    //   getMenu().then(res=>{
    //     console.log(res,'菜单权限出参1111')
    //     this.menuData = res.data
    //   })
    // }
  }
}
</script>

<style scoped>
  .scrollbar-wrapper{
    position:absolute;
    left: 0;
  }
  /* .el-submenu {
    padding-left: 50px
  } */
  .el-submenu .el-menu-item{
  padding-left: 54px !important;
  }
</style>
