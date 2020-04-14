<template>
	<div id="main-navbar" :class="{ 'hidden-navbar': !showNavbar }">
		<b-navbar type="light" variant="white px-5">

			<b-navbar-brand>
				<img src="../assets/logotype.svg" width="100%" alt="InvierteM" />
			</b-navbar-brand>

			<b-navbar-nav class="ml-auto">
				<b-nav-form class="mr-2">
					<b-input-group>
						<b-form-input placeholder="Buscar..." class="bg-silver border-0"></b-form-input>
						<b-input-group-append>
							<b-button variant="golden bg-silver border-0 text-golden">
								<i class="fas fa-search ml-auto"></i>
							</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-nav-form>

				<b-button variant="outline-golden border-0" v-b-tooltip.hover title="Mis inversiones" v-if="logged">
					<i class="fas fa-piggy-bank"></i>
					<b class>{{ investments }}</b>
				</b-button>
				<b-button variant="outline-golden border-0" v-b-tooltip.hover title="Mi carrito" v-if="logged">
					<i class="fas fa-shopping-cart"></i>
					<b class>{{ cartItems }}</b>
				</b-button>
				<b-button variant="outline-golden border-0" v-b-tooltip.hover title="Mensajes" v-if="logged">
					<i class="fas fa-comments"></i>
					<b class>{{ messages }}</b>
				</b-button>

				<b-nav-item-dropdown id="user-settings" v-if="logged" v-bind:text="username" toggle-class="btn btn-golden text-dark" right>
					<b-dropdown-item>Ajustes xd</b-dropdown-item>
				</b-nav-item-dropdown>
				
				<b-button variant="outline-golden text-nowrap ml-2" v-if="!logged" v-on:click="logIn">
					Ingresar / Registrarse
				</b-button>

			</b-navbar-nav>
		</b-navbar>


		<b-navbar type="light" variant="silver shadow py-1 px-5">

			<b-navbar-nav>
				<b-nav-item href="#" class="mr-1" active>
					<i class="fas fa-home"></i> Inicio
				</b-nav-item>
				<b-nav-item href="#" class="mx-1">
					<i class="fas fa-building"></i> Empresas
				</b-nav-item>
				<b-nav-item href="#" class="mx-1">
					<i class="fas fa-pencil-ruler"></i> Proyectos
				</b-nav-item>
				<b-nav-item href="#" class="mx-1">
					<i class="fas fa-shopping-basket"></i> Productos
				</b-nav-item>
				<b-nav-item href="#" class="mx-1">
					<i class="fas fa-dollar-sign"></i> Financiación
				</b-nav-item>
				<b-nav-item href="#" class="mx-1">
					<i class="fas fa-plus"></i> Más...
				</b-nav-item>
			</b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				<b-form-select class="bg-silver border-0" v-model="selected" :options="options">
					<template v-slot:first>
						<b-form-select-option :value="null" disabled>Selecciona tu Estado...</b-form-select-option>
					</template>
				</b-form-select>
			</b-navbar-nav>

		</b-navbar>
	</div>
</template>

<script>
const OFFSET = 60;
//const axios = require('axios');

export default {
	name: "NavBar",
	data() {
		return {
			logged: false,
			investments: 2,
			cartItems: 5,
			messages: 3,
			username: "Yomero",
			showNavbar: true,
			lastScrollPosition: 0,
			scrollValue: 0,
			selected: null,
			options: [
				{ value: "AGS", text: "AGUASCALIENTES" },
				{ value: "BC",  text: "BAJA CALIFORNIA" },
				{ value: "BCS", text: "BAJA CALIFORNIA SUR" },
				{ value: "CHI", text: "CHIHUAHUA" },
				{ value: "CHS", text: "CHIAPAS" },
				{ value: "CMP", text: "CAMPECHE" },
				{ value: "CMX", text: "CIUDAD DE MEXICO" },
				{ value: "COA", text: "COAHUILA" },
				{ value: "COL", text: "COLIMA" },
				{ value: "DGO", text: "DURANGO" },
				{ value: "GRO", text: "GUERRERO" },
				{ value: "GTO", text: "GUANAJUATO" },
				{ value: "HGO", text: "HIDALGO" },
				{ value: "JAL", text: "JALISCO" },
				{ value: "MCH", text: "MICHOACAN" },
				{ value: "MEX", text: "ESTADO DE MEXICO" },
				{ value: "MOR", text: "MORELOS" },
				{ value: "NAY", text: "NAYARIT" },
				{ value: "NL",  text: "NUEVO LEON" },
				{ value: "OAX", text: "OAXACA" },
				{ value: "PUE", text: "PUEBLA" },
				{ value: "QR",  text: "QUINTANA ROO" },
				{ value: "QRO", text: "QUERETARO" },
				{ value: "SIN", text: "SINALOA" },
				{ value: "SLP", text: "SAN LUIS POTOSI" },
				{ value: "SON", text: "SONORA" },
				{ value: "TAB", text: "TABASCO" },
				{ value: "TLX", text: "TLAXCALA" },
				{ value: "TMS", text: "TAMAULIPAS" },
				{ value: "VER", text: "VERACRUZ" },
				{ value: "YUC", text: "YUCATAN" },
				{ value: "ZAC", text: "ZACATECAS" } 
			]
		};
	},
	mounted() {
		this.lastScrollPosition = window.pageYOffset;
		window.addEventListener("scroll", this.onScroll);
		const viewportMeta = document.createElement("meta");
		viewportMeta.name = "viewport";
		viewportMeta.content = "width=device-width, initial-scale=1";
		document.head.appendChild(viewportMeta);
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.onScroll);
	},
	methods: {
		onScroll() {
			if (window.pageYOffset < 0) 
				return;
			if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) 
				return;
			this.showNavbar = window.pageYOffset < this.lastScrollPosition;
			this.lastScrollPosition = window.pageYOffset;
		},
		logIn() {
			this.$router.push('/LogIn');
		}
	}
};
</script>

<style>
#main-navbar {
	height: 6.5rem;
	width: 100vw;
	position: fixed;
	transform: translate3d(0, 0, 0);
	transition: 0.1s all ease-out;
}
#main-navbar.hidden-navbar {
	box-shadow: none;
	transform: translate3d(0, -100%, 0);
}
</style>