import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import './custom-bootstrap.scss'

Vue.config.productionTip = false
Vue.use(BootstrapVue, {
  "BTooltip": {
    "boundary": "scrollParent",
    "boundaryPadding": 5,
    "customClass": null,
    "delay": 50,
    "variant": "golden"
  },
  "BDropdown": {
    "toggleText": "Toggle Dropdown",
    "size": null,
    "variant": "golden  ",
    "splitVariant": null
  },
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
