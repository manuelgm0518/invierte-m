<template>
	<b-container fluid class="p-0 w-100">
		<div class="area">
			<ul class="circles">
				<li v-for="index in 20" :key="index"></li>
			</ul>
		</div>

		<b-row class="bg-golden text-center m-0 landing">
			<b-col>
				<b-img src="../assets/inviertem-logo-alt.svg" style="width: 50vh; max-width: 75vw"></b-img>
				<p
					class="text-white h4 mt-4 mx-auto"
					style="width: 100vh; max-width: 90vw"
				>Una plataforma en la cual todos podemos ayudar a impulsar al engranaje de la economía Mexicana</p>
				<i class="fas fa-chevron-down text-white"></i>
			</b-col>
		</b-row>

		<b-row class="bg-white m-0 p-3 p-md-5 text-center">
			<b-col>
				<h2>
					¿Qué es
					<span class="baloo text-black h1 font-weight-bold">
						Invierte<font color="gold">M</font></span>?
				</h2>
				<p class="mx-auto" style="width: 100vh; max-width: 75vw">
					Somos una plataforma enfocada al crecimiento de las pequeñas y medianas empresas de México.
					Ofrecemos a estas empresas la solución a los problemas más comunes que enfrentan:
				</p>

				<b-row>
					<b-col class="p-2" md>
						<div class="bg-silver rounded py-2 px-4 h-100">
							<span class="h4 text-golden font-weight-bold">Financiamiento</span>
							<p>Muchos pequeños empresarios temen al financiamiento externo, o bien, recurren a un financiamiento incorrecto con más problemas que soluciones.</p>
						</div>
					</b-col>
					<b-col class="p-2" md>
						<div class="bg-silver rounded py-2 px-4 h-100">
							<span class="h4 text-golden font-weight-bold">Clientes</span>
							<p>Para que un negocio genere utilidad necesita ventas, y para vender necesita clientes.</p>
						</div>
					</b-col>
					<b-col class="p-2" md>
						<div class="bg-silver rounded py-2 px-4 h-100">
							<span class="h4 text-golden font-weight-bold">Personal Capacitado</span>
							<p>Un negocio depende de sus trabajadores, si el personal es insuficiente o inexperto la empresa terminará por estancarse.</p>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col class="p-2" md>
						<div class="bg-silver rounded py-2 px-4">
							<span class="h4 text-golden font-weight-bold">Proveedores</span>
							<p>Para que un negocio pueda producir necesita materia prima, sin buenos proveedores la empresa no podrá seguir operando.</p>
						</div>
					</b-col>
					<b-col class="p-2" md>
						<div class="bg-silver rounded py-2 px-4">
							<span class="h4 text-golden font-weight-bold">Visibilidad en Internet</span>
							<p>En los tiempos que corren, darse a conocer a través de la red es algo esencial para llegar a un público mucho mayor.</p>
						</div>
					</b-col>
				</b-row>
			</b-col>
		</b-row>

		<b-row class="bg-white m-0 p-3 p-md-5 text-center">
			<b-col>
				<p class="divisor">¿Qué te permite nuestra plataforma?</p>

				<b-row>
					<b-col class="p-2" md>
						<div class="bg-silver rounded py-2 px-4 h-100">
							<span class="h4 text-golden font-weight-bold">Financiamiento</span>
							<p>Con INVIERTE-M seleccionas de entre todas las alternativas de inversión, la que consideres más viable a tus condiciones, logrando con esto que tu capital sea el que genere mayores ingresos.</p>
						</div>
					</b-col>
					<b-col class="p-2" md>
						<div class="bg-silver rounded py-2 px-4 h-100">
							<span class="h4 text-golden font-weight-bold">Clientes</span>
							<p>A través de esta plataforma, ofreces los mejores productos y miles de personas podrán conocerlos, generando mayores utilidades a tu empresa.</p>
						</div>
					</b-col>
					<b-col class="p-2" md>
						<div class="bg-silver rounded py-2 px-4 h-100">
							<span class="h4 text-golden font-weight-bold">Personal Capacitado</span>
							<p>En INVIERTE-M se visualizan las ofertas de trabajo, a través del cual puedes postularte para que desarrolles tus habilidades en una empresa.</p>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col class="p-2" md>
						<div class="bg-silver rounded py-2 px-4">
							<span class="h4 text-golden font-weight-bold">Proveedores</span>
							<p>Si deseas ofrecer tus bienes o servicios, e incrementar tus ingresos, esta plataforma es la mejor opción, ya que a través de ella los puedes dar a conocer y que tu mercado se vea incrementado. </p>
						</div>
					</b-col>
					<b-col class="p-2" md>
						<div class="bg-silver rounded py-2 px-4">
							<span class="h4 text-golden font-weight-bold">Visibilidad en Internet</span>
							<p>Los servicios que ofrece INVIERTE-M a través de la Web, son alternativas económicas a través de la cual puedes recibir y otorgar beneficios, generando con esto activar la economía de sus usuarios.  </p>
						</div>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<b-row class="bg-golden text-center m-0 p-3">
			<b-col cols="12" md="4">
				<h3>
					<b>Misión</b>
				</h3>
				<p>Proporcionar las herramientas e información adecuada a fin de facilitar a los capitalistas la elección de invertir, impulsando el crecimiento financiero de las empresas.</p>
			</b-col>
			<b-col cols="12" md="4">
				<h3>
					<b>Visión</b>
				</h3>
				<p>Ser la plataforma web de vanguardia más utilizada por los inversionistas y las empresas como primera opción para generar recursos y reactivar su economía.</p>
			</b-col>
			<b-col cols="12" md="4">
				<h4>
					<b>Objetivo</b>
				</h4>
				<p>Honestidad, Servicio, Responsabilidad, Lealtad, Respeto, Creatividad</p>
			</b-col>
		</b-row>

		<b-row class="bg-white m-0 p-3">
			<h1>Joaquín c la come</h1>
		</b-row>
	</b-container>
</template>

<script>
export default {
	name: "Home",
	data: () => ({
		problems: [
			{
				name: "Financiamiento",
				content:
					"Muchos pequeños empresarios temen al financiamiento externo, o bien, recurren a un financiamiento incorrecto que les genera más problemas que soluciones."
			},
			{
				name: "Clientes",
				content:
					"Para que un negocio genere utilidad necesita ventas, y para vender necesita clientes"
			}
		]
	})
};
</script>

<style lang="scss" scoped>
.divisor{
	background: #fbcd18;
	font-size: 40px;
	border-radius: 10px;
}
@import "../assets/anim-landing.scss";
.landing {
	height: 100vh;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
</style>