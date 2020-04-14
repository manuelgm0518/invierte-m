<template>
	<b-navbar type="light" variant="white shadow px-lg-5" toggleable="md" fixed="top">
		<b-navbar-brand style="height: 3rem">
			<img src="../assets/inviertem-logo.svg" class="h-100"/>
		</b-navbar-brand>
		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="ml-auto mr-md-3 mt-2 mt-lg-0">
				<b-nav-item href="#" v-b-tooltip.hover title="Inicio" v-on:click="() => {const path = '/'; if (this.$route.path !== path) this.$router.push(path)}" active>
					<i class="fas fa-home mx-1 fa-fw"></i>
					<span class="d-md-none ml-2">Inicio</span>
				</b-nav-item>
				<b-nav-item href="#" v-b-tooltip.hover title="Empresas" v-on:click="() => {const path = '/business'; if (this.$route.path !== path) this.$router.push(path)}">
					<i class="fas fa-building mx-1 fa-fw"></i>
					<span class="d-md-none ml-2">Empresas</span>
				</b-nav-item>
				<b-nav-item href="#" v-b-tooltip.hover title="Productos">
					<i class="fas fa-shopping-basket mx-1 fa-fw"></i>
					<span class="d-md-none ml-2">Productos</span>
				</b-nav-item>
				<b-nav-item href="#" v-b-tooltip.hover title="Vacantes">
					<i class="fas fa-user-tag mx-1 fa-fw"></i>
					<span class="d-md-none ml-2">Vacantes</span>
				</b-nav-item>
				<b-nav-item href="#" v-b-tooltip.hover title="Emprender">
					<i class="fas fa-chart-line ml-1 fa-fw"></i>
					<span class="d-md-none ml-2">Emprender</span>
				</b-nav-item>
			</b-navbar-nav>
			<b-navbar-nav>
				<b-nav-form class="d-md-none d-lg-inline-flex my-1 my-lg-0 mr-lg-3">
					<b-input-group class>
						<b-form-input placeholder="Buscar..." class="bg-silver border-0"></b-form-input>
						<b-input-group-append>
							<b-button variant="golden">
								<i class="fas fa-search fa-fw"></i>
							</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-nav-form>
				<b-nav-form class="my-1 my-lg-0">
					<b-button
						variant="outline-golden text-nowrap"
						@click="logIn"
						v-if="!user.logged"
					>Ingresar / Registrarse</b-button>
					<b-nav-item-dropdown right v-else>
						<template v-slot:button-content>
							{{ user.firstName }}
							<b-badge
								variant="golden mx-1"
								pill
							>{{ notifications.messages + notifications.cartItems + notifications.investments + notifications.businesses }}</b-badge>
						</template>
						<b-dropdown-item>
							<b-avatar rounded class="m-2" />
							{{ user.firstName+" "+user.lastName}}
						</b-dropdown-item>
						<b-dropdown-item-btn>
							<i class="fas fa-comments fa-fw mr-2 text-golden"></i>Mensajes
							<b-badge variant="golden mx-1" pill>{{ notifications.messages }}</b-badge>
						</b-dropdown-item-btn>
						<b-dropdown-item-btn>
							<i class="fas fa-shopping-cart fa-fw mr-2 text-golden"></i>Carrito de compra
							<b-badge variant="golden mx-1" pill>{{ notifications.cartItems }}</b-badge>
						</b-dropdown-item-btn>
						<b-dropdown-item-btn>
							<i class="fas fa-piggy-bank fa-fw mr-2 text-golden"></i>Mis inversiones
							<b-badge variant="golden mx-1" pill>{{ notifications.investments }}</b-badge>
						</b-dropdown-item-btn>
						<b-dropdown-item-btn>
							<i class="fas fa-suitcase fa-fw mr-2 text-golden"></i>Mis empresas
							<b-badge variant="golden mx-1" pill>{{ notifications.businesses }}</b-badge>
						</b-dropdown-item-btn>
						<b-dropdown-divider />
						<b-dropdown-item-button>
							<i class="fas fa-cog fa-fw mr-2 text-primary"></i>Ajustes
						</b-dropdown-item-button>
						<b-dropdown-item-button v-on:click="logOut">
							<i class="fas fa-power-off fa-fw mr-2 text-danger"></i>Salir
						</b-dropdown-item-button>
					</b-nav-item-dropdown>
				</b-nav-form>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
import axios from 'axios';

export default {
	name: "NavBar",
	data: () => ({
		notifications: {
			messages: 0,
			cartItems: 0,
			investments: 0,
			businesses: 0
		},
		user: {
            logged: false,
			firstName: '',
			lastName: ''
		}
	}),
	methods: {
		logIn() {
			const path = '/logIn'; if (this.$route.path !== path) this.$router.push(path)
		},
		logOut(){
			localStorage.clear();
			location.reload();
		}
	},
	created(){
		if(localStorage.getItem('token') == null){
            this.user.logged = false;
		}
		else{
			this.user.logged = true;
			axios.get('http://localhost:3000/api/user', { headers: { token: localStorage.getItem('token') }})
			.then(res => {
				if(res.status == 200){
					this.user.firstName = res.data.firstName;
					this.user.lastName = res.data.lastName;
				}
				else{
					localStorage.clear();
					location.reload();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
a.nav-link.active {
	color: black !important;
	background: #fbcd18;
	border-radius: 0.5rem;
}
</style>