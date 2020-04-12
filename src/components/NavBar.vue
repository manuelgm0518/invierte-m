<template>
	<div class="shadow position-fixed w-100">
		<b-navbar type="light" variant="white" class="px-5">
			<b-navbar-brand style="height: 4.5rem;">
				<b-img
					src="../assets/logo.png"
					class="d-inline-block align-baseline"
					style="height:3.6rem"
					alt="..."
				></b-img>
				<div class="baloo mx-3 d-inline-block text-center">
					<b>
						<span style="font-size:2.5rem; line-height:2.5rem; color:black;">
							Invierte<font color="gold">M</font>
						</span>
						<br />
						<span
							style="font-size:1.1rem; line-height:1.1rem; color:grey;"
							class="align-top"
						>Invirtiendo por México</span>
					</b>
				</div>
			</b-navbar-brand>

			<b-navbar-nav class="ml-auto">
				<b-input-group class>
					<b-form-input placeholder="Buscar..." class="bg-light border-0"></b-form-input>
					<b-input-group-append>
						<b-button variant="golden bg-light border-0 text-golden">
							<i class="fas fa-search"></i>
						</b-button>
					</b-input-group-append>
				</b-input-group>
				
				<b-button variant="outline-golden text-nowrap ml-3">
					Ingresar / Registrarse
				</b-button>
				
			</b-navbar-nav>


		</b-navbar>
		<b-navbar type="light" variant="light px-5 poppins">
			<b-navbar-nav >
				<b-nav-item href="#" class="mr-1" active><i class="fas fa-home"></i> Inicio</b-nav-item>

				<b-nav-item href="#" class="mx-1"><i class="fas fa-building"></i> Empresas</b-nav-item>
				<b-nav-item href="#" class="mx-1"><i class="fas fa-pencil-ruler"></i> Proyectos</b-nav-item>
				<b-nav-item href="#" class="mx-1"><i class="fas fa-shopping-basket"></i> Productos</b-nav-item>
				<b-nav-item href="#" class="mx-1"><i class="fas fa-dollar-sign"></i> Financiación</b-nav-item>
				<b-nav-item href="#" class="mx-1"><i class="fas fa-plus"></i> Más...</b-nav-item>

				

			</b-navbar-nav>
		<b-navbar-nav class="ml-auto">
			<b-form-select class="bg-light border-0" v-model="selected" :options="options">
				<template v-slot:first>
        <b-form-select-option :value="null" disabled>Selecciona tu Estado...</b-form-select-option>
      </template>
			</b-form-select>
		</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
export default {
	name: "NavBar",
	data() {
		return {
			tabIndex: 0,
			selected: null,
			options: [
				{ value: "a", text: "Aguascalientes" },
				{ value: "a", text: "Aguascalientes" },
				{ value: "a", text: "Aguascalientes" },
				{ value: "a", text: "Aguascalientes" },
			]
		};
	},
	methods: {
		linkClass(idx) {
			if (this.tabIndex === idx) {
				return ["bg-golden", "text-white"];
			} else {
				return ["bg-transparent", "text-golden"];
			}
		}
	}
};
</script>

<style>
</style>