import Layout from '@/views/layout/Layout'

var menu = JSON.parse(localStorage.getItem('menu'))

const systemManagementRouter = {
  path: '/systemManagement',
  component: Layout,
  redirect: '/systemManagement/groupManage',
  name: 'systemManagement',
  id: '17',
  meta: { title: 'router.system_management', icon: 'resourceManagement'},
  children: [ 
    //用户信息
    {
      path: 'userData',
      name: 'userData',
      component: () => import('@/views/systemManagement/userData/userData'),
      meta: { title: 'router.user_data',icon: 'point', keepAlive:true},
      hidden:true
    },
    //消息管理
    {
      path: 'msgCenter',
      name: 'msgCenter',
      component: () => import('@/views/systemManagement/msgCenter/msgCenter'),
      meta: { title: 'router.msg_center',icon: 'point', keepAlive:true},
      hidden:true
    },
    //租户管理
    // {
    //   path: 'tenantManage',
    //   name: 'tenantManage',
    //   component: () => import('@/views/systemManagement/tenantManage/tenantManage'),
    //   meta: { title: '租户管理',icon: 'point', keepAlive:false},
    
    // },
    //组织部门管理
    // {
    //   path: 'groupManage',
    //   name: 'GroupManage',
    //   component: () => import('@/views/systemManagement/groupManage/groupManage'),
    //   meta: { title: '组织/部门管理',icon: 'point', keepAlive:false}
    // },
    //角色管理
    {
      path: 'roleManage',
      name: 'roleManage',
      component: () => import('@/views/systemManagement/roleManage/roleManage'),
      meta: { title: 'router.role_manage',icon: 'point', keepAlive:false}
    },
    //用户管理
    {
      path: 'userManage',
      name: 'userManage',
      component: () => import('@/views/systemManagement/userManage/userManage'),
      meta: { title: 'router.user_manage',icon: 'point', keepAlive:false}
    },

    /*{
      path: 'productManage',
      name: 'productManage',
      component: () => import('@/views/systemManagement/productManage/productManage'),
      meta: { title: '产品管理',icon: 'point', keepAlive:false}
    },*/
    // {
    //   path: 'resourceManage',
    //   name: 'resourceManage',
    //   component: () => import('@/views/systemManagement/resourceManage/resourceManage'),
    //   meta: { title: '资源管理',icon: 'point', keepAlive:false}
    // },
    {
      path: 'operationLog',
      name: 'operationLog',
      component: () => import('@/views/systemManagement/operationLog/operationLog'),
      meta: { title: 'router.operation_log',icon: 'point', keepAlive:false}
    },
    {
      path: 'loginLog',
      name: 'loginLog',
      component: () => import('@/views/systemManagement/loginLog/loginLog'),
      meta: { title: 'router.login_log',icon: 'point', keepAlive:false}
    }
  ]
}

export default systemManagementRouter