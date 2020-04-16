<template>
	<div class="container card p-3 mt-5">
		<div class="mt-5 mb-4 text-center">
			<div class="h2 text-golden font-weight-bold">¿Deseas iniciar un Proyecto que reditúe ingresos?</div>
			<div class="h4 text-muted font-weight-bold">Aquí te damos unos consejos que te ayudarán</div>
		</div>
		<div>
			<b-card no-body class="m-3">
				<b-tabs pills card fill>
					<b-tab :title="item.titulo" v-for="(item,i) in sections" :key="i">
						<b-card-text>
							<ul>
								<li v-for="tip in item.tips" :key="tip">{{ tip }}</li>
							</ul>
						</b-card-text>
					</b-tab>
				</b-tabs>
			</b-card>
		</div>
		<div class="mx-5">
			<center>
				<div class="h2 mb-4 text-golden font-weight-bold">¿Qué avala los préstamos e inversiones?</div>
			</center>
			<div>
				<div class="h4 text-black font-weight-bold">Préstamos</div>
				<div class="h5 text-muted ml-5">Ley de operaciones y títulos de crédito</div>
				<div class="h4 text-black font-weight-bold">Inversiones</div>
				<div class="h5 text-muted ml-5">Ley general de sociedades mercantiles</div>
			</div>
		</div>
		<div class="text-center my-5">
			<h1 class="font-weight-bold">¡Crea tu primera empresa ahora!</h1>
			<b-button size="lg" variant="success" @click="gotoAddBusiness">Crear empresa</b-button>
		</div>
	</div>
</template>

<script>
export default {
	name: "StartBusiness",
	methods: {
		gotoAddBusiness() {
			if (this.$store.state.user.id == null)
				alert("Debes iniciar sesión primero!");
			else
				this.$router.push({
					name: "AgregarEmpresa",
					params: { id: this.$store.state.user.id }
				});
		}
	},
	data() {
		return {
			sections: [
				{
					titulo: "¿Cómo empezar?",
					tips: [
						"Desarrolla una idea",
						"Prueba tu credibilidad",
						" Escribe un plan de negocios",
						" Determina la estructura legal",
						"Seleciona el nombre de tu empresa"
					]
				},
				{
					titulo: "¿Qué hacer?",
					tips: [
						"Identifica tu mercado",
						"Determina los costos",
						"Establece un presupuesto",
						"Elige la locación adecuada",
						"Da un servicio impecable al cliente"
					]
				},
				{
					titulo: "Los inversionistas y tú",
					tips: [
						"Encuentra a los inversionistas adecuados",
						"Escucha a los inversionistas",
						"Sé flexible ante la probabilidad de cambio de tu idea",
						"Evita las peleas con socios e inversionistas",
						"No te preocupes por perder un porcentaje de la compañía"
					]
				},
				{
					titulo: "¿Cómo seguir desarrollando mi proyecto?",
					tips: [
						"Arregla los libros de contabilidad",
						"Ofrece nuevos productos o servicios",
						"No te preocupes en exceso por tu economía",
						"Encuentra a los empleados adecuados",
						"Asigna resposabilidades"
					]
				},
				{
					titulo: "Tomar en cuenta",
					tips: [
						"La patente puede esperar",
						"Ignora a los negativos",
						"Sé paciente",
						"Ofrece una experiencia al cliente",
						"No esperes el éxito de inmediato"
					]
				}
			]
		};
	}
};
</script>

<style scoped>
.nav-pills .nav-link.active,
.show > .nav-pills .nav-link {
	background: green !important;
}
#frase {
	background: #fbcd18;
	border-radius: 10px;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
	width: 1050px;
	margin-bottom: 15px;
}
#contorno {
	margin-top: 0;
	padding: 7px;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
	border-radius: 10px;
}
</style>