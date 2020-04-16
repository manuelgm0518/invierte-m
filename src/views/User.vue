<template>
	<b-container class="mt-5">
		<b-card class="border-0 shadow">
			<b-row class="px-md-5">
				<b-col cols="12" md="3" class="text-center">
					<b-avatar variant="silver my-2" size="100" :src="avatarURL" rounded />
				</b-col>
				<b-col>
					<span class="h2 font-weight-bold">{{ firstName + " " + lastName}}</span>
					<br />
					<span class="h5 text-golden">{{ location }}</span>
					<div class="bg-silver p-3 mt-3 rounded">{{ biography }}</div>
				</b-col>
			</b-row>
		</b-card>

		<b-card class="border-0 shadow mt-3">
			<span class="h1 font-weight-bold text-center">Empresas</span>
		</b-card>
	</b-container>
</template>

<script>
import axios from "axios";
export default {
	name: "User",
	data: () => ({
		avatarURL: "https://placekitten.com/300/300",
		firstName: "Joaquín",
		lastName: "'El Comedor' Pedroza",
		biography:
			"Ah no mames, ¿Qué pedo? Por cierto me la como. Lorem ipsum senfomaekiunaeifmo jnoiaeijnifosdfsiisodfsioofdsoeesdfiso",
		location: "La metrópoli Yisus Mery",
		businesses: []
  }),
  created() {
    this.getUserBusinesses();
  },
	methods: {
		getUserBusinesses() {
			axios.get("http://localhost:3000/api/business").then(res => {
				const businesses = res.data;
				this.businesses = businesses.filter(b => b.owner._id == this.$route.id);
			});
		}

		//return this.clients.filter(c => c.name.toLowerCase().indexOf(search) > -1);
	}
};
</script>

<style>
</style>