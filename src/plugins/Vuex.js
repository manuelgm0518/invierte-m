import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const Store = new Vuex.Store({
	state: {
		user: {
			id: null,
			avatarURL: '',
			firstName: '',
			lastName: '',
			notifications: {
				messages: 5,
				shoppingCart: 0,
				investments: 0,
				businesses: 0
			}
		}
	},
	mutations: {
		userLogIn(state, user) {
			state.user.id = user.id;
			state.user.avatarURL = user.avatarURL;
			state.user.firstName = user.firstName;
			state.user.lastName = user.lastName;
			state.user.notifications = user.notifications;
		}
	},
	getters: {
		getNotificationCount: state => {
			const { messages, shoppingCart, investments, businesses } = state.user.notifications;
			return messages + shoppingCart + investments + businesses;
		}
	}
});

export default Store;