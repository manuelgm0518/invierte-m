<template>
	<b-container fluid class="p-0 m-0 w-100">
		<!--<div class="area">
			<ul class="circles">
				<li v-for="index in 20" :key="index"></li>
			</ul>
		</div>-->

		<b-row class="bg-white text-center w-100">
			<b-col class="landing">
				<b-img src="../assets/inviertem-logo-alt.svg" style="width: 10vh;"></b-img>
				<p
					class="text-white h4 w-75 mx-auto mt-4"
				>Una plataforma en la cual todos podemos ayudar a impulsar al engranaje de la economía Mexicana</p>
				<i class="fas fa-chevron-down text-white"></i>
			</b-col>
		</b-row>

		<b-row class="bg-white w-100 p-3">
			<b-col>
				<h1>Sección no c k</h1>
			</b-col>
		</b-row>

		<b-row class="bg-golden text-center m-0 p-0">
			<b-col cols="12" md="4">
				<h3>
					<b>Misión</b>
				</h3>
				<p>Nuestra misión es blablabla</p>
			</b-col>
			<b-col cols="12" md="4">
				<h3>
					<b>Visión</b>
				</h3>
				<p>Nuestro objetivo es gsomsemfksef</p>
			</b-col>
			<b-col cols="12" md="4">
				<h4>
					<b>Objetivo</b>
				</h4>
				<p>aefioesmfkeom</p>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
	name: "Home"
};
</script>

<style lang="scss" scoped>
@import "../assets/anim-landing.scss";
.landing {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
</style>