import Vue from 'vue'
import moment from 'moment';


/**
 * 
 */
Vue.filter('dateFormat', function (value) {
    return moment().format('yyyy-MM-dd hh:mm:ss')
})