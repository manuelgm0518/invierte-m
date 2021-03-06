import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: '/', name: 'Inicio',
		component: () => import('../views/Home.vue')
	}, {
		path: '/search', name: 'Buscar',
		component: () => import('../views/Search.vue')
	}, {
		path: '/business', name: 'Empresas',
		component: () => import('../views/BusinessCatalog.vue')
	}, {
		path: '/business/:id', name: 'Empresa',
		component: () => import('../views/Business.vue')
	}, {
		path: '/product', name: 'Productos',
		component: () => import('../views/ProductCatalog.vue')
	}, {
		path: '/product/:id', name: 'Producto',
		component: () => import('../views/Product.vue')
	}, {
		path: '/vacant', name: 'Vacantes',
		component: () => import('../views/VacantCatalog.vue')
	}, {
		path: '/vacant/:id', name: 'Vacante',
		component: () => import('../views/Vacant.vue')
	}, {
		path: '/start-business', name: 'Emprender',
		component: () => import('../views/StartBusiness.vue')
	}, {
		path: '/chat', name: 'Chats',
		component: () => import('../views/Chat.vue')
	}, {
		path: '/shopping-cart', name: 'Carrito',
		component: () => import('../views/ShoppingCart.vue')
	}, {
		path: '/user/:id', name: 'Usuario',
		component: () => import('../views/User.vue')
	}, {
		path: '/addbusiness/:id', name: 'AgregarEmpresa',
		component: () => import('../views/AddBusiness.vue')
	}],
	scrollBehavior(to, from, savedPosition) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(savedPosition ? savedPosition : { x: 0, y: 0 })
			}, 300)
		})
	}
});

export default Router;