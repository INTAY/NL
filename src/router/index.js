import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/* Router Modules */
import basicInfoRouter from './modules/basicInfo' //系统设置
import systemManagementRouter from './modules/systemManagement' //系统管理
// import apiRouter from './modules/api' //系统设置
// import platformRouter from './modules/platformManagement' //系统设置

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    keepAlive: true              页面是否缓存
  }
**/

// 基础路由--没有权限要求的基本页,所有角色都可以访问
export const constantRoutes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/login'
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'home_title.title' , icon: 'home', keepAlive:false},
    }]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/userData', component: () => import('@/views/userData/userData'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
]

//异步路由--需要根据用户角色动态加载的路由
export const asyncRoutes = [
  basicInfoRouter,
  systemManagementRouter,
  // { path: '*', redirect: '/404', hidden: true }
]

//开发时合并
constantRoutes.push(...asyncRoutes)

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})