<template>
	<b-container fluid class="p-0">
		<div class="area">
			<ul class="circles">
				<li v-for="index in 20" :key="index"></li>
			</ul>
		</div>
		<b-row class="bg-white text-center m-0 vh-100 landing">
			<b-col class="text-center">
				<div class="my-auto">
					<b-img src="../assets/inviertem-logo-alt.svg" style="height: 50vh;"></b-img>
					<p class="text-white h4 w-75 mx-auto mt-4">Una plataforma en la cual todos podemos ayudar a impulsar al engranaje de la economía Mexicana</p>
					<i class="fas fa-chevron-down text-white"></i>
				</div>
			</b-col>
		</b-row>

    <b-row class="bg-white p-3 w-100">
      <b-col>
        <h1>Sección no c k</h1>
      </b-col>
    </b-row>

		<b-row class="bg-golden text-center m-0 p-4">
			<b-col>
				<h3>
					<b>Misión</b>
				</h3>
				<p>Nuestra misión es blablabla</p>
			</b-col>
			<b-col>
				<h3>
					<b>Visión</b>
				</h3>
				<p>Nuestro objetivo es gsomsemfksef</p>
			</b-col>
			<b-col>
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