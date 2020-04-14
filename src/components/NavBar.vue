<template>
	<b-navbar type="light" variant="white shadow px-lg-5" toggleable="md" fixed="top">
		<b-navbar-brand style="height: 3rem">
			<img src="../assets/inviertem-logo.svg" class="h-100" />
		</b-navbar-brand>
		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
		<b-collapse id="nav-collapse" is-nav>
			
			<b-navbar-nav class="ml-auto mr-md-2 mt-2 mt-md-0">
				<router-link
					class="mx-md-1"
					v-for="nav in navigation"
					:key="nav.routeName"
					v-slot="{ href, navigate, isExactActive }"
					:to="{'name':nav.routeName}"
				>
					<b-nav-item
						:active="isExactActive"
						:href="href"
						@click="navigate"
						v-b-tooltip.hover
						:title="nav.routeName"
					>
						<i :class="nav.icon + ' mx-2 mx-md-0 fa-fw'" />
						<span class="d-md-none ml-2">{{ nav.routeName }}</span>
					</b-nav-item>
				</router-link>
			</b-navbar-nav>

			<b-navbar-nav>
				
				<b-nav-form class="d-md-none d-lg-inline-flex my-1 my-lg-0 mr-lg-3" v-if="$route.name!='Buscar'">
					<b-input-group>
						<b-form-input v-model="search" placeholder="Buscar..." class="bg-silver border-0" />
						<b-input-group-append>
							<router-link v-slot="{ href, navigate }" :to="{'name':'Buscar','params':{ search }}">
								<b-button variant="silver border-0" :href="href" @click="navigate">
									<i class="fas fa-search fa-fw" />
								</b-button>
							</router-link>
						</b-input-group-append>
					</b-input-group>
				</b-nav-form>

				

				<b-nav-form class="my-1 my-lg-0">
					<b-button variant="outline-golden text-nowrap" @click="logIn" v-if="!user.logged">{{ search }}</b-button>
					<b-nav-item-dropdown right v-else>
						<template v-slot:button-content>
							kkdvak
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
		search: "",
		navigation: [
			{ routeName: "Inicio", icon: "fas fa-home" },
			{ routeName: "Empresas", icon: "fas fa-building" },
			{ routeName: "Productos", icon: "fas fa-shopping-basket" },
			{ routeName: "Vacantes", icon: "fas fa-user-tag" },
			{ routeName: "Emprender", icon: "fas fa-chart-line" }
		],

		notifications: {
			messages: 0,
			cartItems: 0,
			investments: 0,
			businesses: 0
		},
		user: {
			logged: false,
			firstName: "Manuel",
			lastName: "González Martínez"
		}
	}),
	methods: {
		getRouteName() {
			return this.$route.params;
		},
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