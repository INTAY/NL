import Layout from '@/views/layout/Layout'

const userRouter = {
  id: '20191119150454ASKENE',
  path: '/basicInfo',
  component: Layout,
  redirect: 'basicInfo/equipmentManage',
  name: 'basicInfo',
  meta: { title: 'device_manage_title.title', icon: 'resourceManagement'},
  // alwaysShow: true,
  children: [
    {
      path: 'equipmentManage',
      component: () => import('@/views/basicInfo/equipmentManage/list'),
      name: 'equipmentManage',
      meta: { title: 'device_manage_title.title', icon: 'point'},
    },
    {
      path: 'customerManage',
      component: () => import('@/views/basicInfo/customerManage/list'),
      name: 'customerManage',
      meta: { title: 'customer_manage_title.title', icon: 'point'},
    },
  ]
}

export default userRouter
