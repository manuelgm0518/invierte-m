import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue'
import './custom-bootstrap.scss'

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(BootstrapVue, {
  "BTooltip": {
    "variant": "golden"
  },
  "BDropdown": {
    "variant": "golden"
  },
});

const store = new Vuex.Store({
  state: {
      userId: null,
  },
  mutations: {
    userLogin(state, user) {
      state.loggedUser = user;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
