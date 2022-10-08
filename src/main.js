import 'babel-polyfill' //让IE支持es6
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import localeElement from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './assets/lang/en'
import zh from './assets/lang/zh'

import '@/styles/index.scss' // global css
import axios from './https'

import BaiduMap from 'vue-baidu-map'
import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import md5 from 'js-md5';
// 引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;

Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(BaiduMap, {
  ak: 'zAwMXS11dTwSRNdHV4C808P06GhXnDPw'
})

Vue.config.productionTip = false

import moment from 'moment';
Vue.filter('dateFormat', function (value) {
  if(value){
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }else{
    return ''
  }
  
})

Vue.filter('statusFilter', function (value) {
  return value == 1 ? '有效' : '无效';
})

const i18n = new VueI18n(
  {
    locale: window.localStorage.getItem('language') == null ? "zh" : window.localStorage.getItem('language'),    // 语言标识
    messages: {
      'en':{...en,...enLocale},
      'zh':{...zh,...zhLocale}
    }
  }
)
localeElement .i18n((key, value) => i18n.t(key, value)) //重点：为了实现element插件的多语言切换

new Vue({
  // el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
