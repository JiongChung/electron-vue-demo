import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// import db from './datastore'
// Vue.prototype.$db = db;

import {numberIntercept} from './services/numberIntercept';
Vue.filter("numberIntercept", numberIntercept);

import moment from 'moment';
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    if(dataStr){
        return moment(dataStr).format(pattern);
    }
});


// import VueSocketIO from 'vue-socket.io';
// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: 'http://metinseylan.com:1992',
//     options: { path: "/my-app/" }
// }))

import './assets/css/reset.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
