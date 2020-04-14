import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const Store = new Vuex.Store({
	state: {
		userId: null,
	},
	mutations: {
		userLogin(state, user) {
			state.loggedUser = user;
		}
	}
});

export default Store;