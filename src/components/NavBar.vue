<template>
	<b-navbar
		type="light"
		variant="white shadow px-lg-5 responsive-scroll mh-100"
		toggleable="md"
		fixed="top"
	>
		<b-navbar-brand :to="{'name':'Inicio'}" style="height: 3rem">
			<img src="../assets/inviertem-logo.svg" class="h-100" />
		</b-navbar-brand>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
		<b-collapse id="nav-collapse" ref="NavCollapse" is-nav>
			<b-navbar-nav class="ml-auto mr-md-2 mt-2 mt-md-0">
				<b-nav-item
					v-for="nav in navigation"
					:key="nav.name"
					v-b-tooltip.hover
					:title="nav.name"
					:to="{'name':nav.name}"
					exact-active-class="active"
					class="mx-md-1"
				>
					<i :class="nav.icon + ' mx-2 mx-md-0 fa-fw'" />
					<span class="d-md-none ml-2">{{ nav.name }}</span>
				</b-nav-item>
			</b-navbar-nav>

			<b-navbar-nav>
				<b-nav-form
					class="d-md-none d-lg-inline-flex my-1 my-lg-0 mr-lg-3"
					v-if="$route.name!='Buscar'"
				>
					<b-input-group>
						<b-form-input v-model="search" placeholder="Buscar..." class="bg-silver border-0" />
						<b-input-group-append>
							<b-button
								variant="silver border-0"
								:to="{'name':'Buscar','params':{ search }}"
								@click="search=''"
							>
								<i class="fas fa-search fa-fw" />
							</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-nav-form>
				<b-nav-form class="my-1 my-lg-0">
					<NavBarUser />
				</b-nav-form>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
//import axios from "axios";
import NavBarUser from "./NavBarUser";

export default {
	name: "NavBar",
	components: {
		NavBarUser
	},
	data: () => ({
		search: "",
		navigation: [
			{ name: "Inicio", icon: "fas fa-home" },
			{ name: "Empresas", icon: "fas fa-building" },
			{ name: "Productos", icon: "fas fa-shopping-basket" },
			{ name: "Vacantes", icon: "fas fa-user-tag" },
			{ name: "Emprender", icon: "fas fa-chart-line" }
		]
	}),
	created() {
		/*if (localStorage.getItem("token") == null) {
			this.user.logged = false;
		} else {
			this.user.logged = true;
			axios
				.get("http://localhost:3000/api/user", {
					headers: { token: localStorage.getItem("token") }
				})
				.then(res => {
					if (res.status == 200) {
						this.user.firstName = res.data.firstName;
						this.user.lastName = res.data.lastName;
					} else {
						localStorage.clear();
						location.reload();
					}
				});
		}*/
	}
};
</script>

<style lang="scss" scoped>
a.nav-link.active {
	color: black !important;
	background: #fbcd18;
	border-radius: 0.5rem;
}
@media only screen and (max-width: 768px) {
	.responsive-scroll {
		overflow: auto !important;
	}
}
</style>