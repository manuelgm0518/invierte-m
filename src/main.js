import Vue from 'vue';
import App from './App.vue';
import router from './plugins/VueRouter';
import store from './plugins/Vuex';
import './plugins/BootstrapVue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
