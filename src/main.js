// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-toast-notification/dist/index.css';

import BootstrapVue from 'bootstrap-vue';
import VueToast from 'vue-toast-notification';

import Vue from 'vue';
import Axios from 'axios';

import './middlewares/logger';
import App from './App';
import router from './router';
import store from './store';

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueToast, {
  position: 'bottom'
});

if (localStorage.getItem('sid') !== null && localStorage.getItem('sid') !== '') {
  store.commit('setUserAuth', true);
}

router.beforeEach((to, from, next) => {
  if (to.path !== '/') {
    if (localStorage.getItem('sid') === null || localStorage.getItem('sid') === '') {
      location = '/';
    } else {
      store.commit('setUserAuth', true);
    }
  }
  document.title = to.meta.title;
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});
