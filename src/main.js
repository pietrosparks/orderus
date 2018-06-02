// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy';
import 'buefy/lib/buefy.css'
import axios from 'axios'


Vue.use(Buefy);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = process.env.API_BASE_URL_PROD;
} else axios.defaults.baseURL = process.env.API_BASE_URL;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
