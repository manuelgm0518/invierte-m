import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import '../assets/custom-bootstrap.scss';

Vue.use(BootstrapVue, {
    "BTooltip": {
        "variant": "golden"
    },
    "BDropdown": {
        "variant": "golden"
    },
});
