<template>
	<b-container class="my-3 my-md-5">
		<b-row>
			<b-col cols="12" md="5">
				<b-card class="border-0 shadow my-2">
					<b-row class>
						<b-col cols="12" md="3" class="text-center">
							<b-avatar variant="silver my-2" size="75" :src="avatarURL" rounded />
						</b-col>
						<b-col>
							<span class="h2 font-weight-bold">{{ firstName + " " + lastName}}</span>
							<br />
							<div class="h5 text-golden">{{ location }}</div>
							<div class="text-muted">{{ joinedDate }}</div>
						</b-col>
					</b-row>
					<div class="bg-light border p-3 mt-3 rounded">{{ biography }}</div>
				</b-card>
			</b-col>
			<b-col>
				<b-card class="border-0 shadow my-2" v-if="businesses.length>0">
					<div class="h3 font-weight-bold mb-3">Empresas</div>
					<b-list-group>
						<b-list-group-item
							button
							v-for="business in businesses"
							variant="silver"
							:key="business._id"
						>{{business.name}}</b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import axios from "axios";
export default {
	name: "User",
	data: () => ({
		avatarURL: "https://placekitten.com/300/300",
		firstName: "Joaquín Emiliano",
		lastName: "Pedroza",
		biography:
			"Emprendedor apasionado por la programación que busca la manera de mejorar a Mexico.",
		location: "Jesus Maria, Aguascalientes.",
		joinedDate: "16/04/2020",
		businesses: []
	}),
	mounted() {
		this.getUserBusinesses();
		axios.get("http://localhost:3000/api/user/" + this.$route.params.id).then(res=> {
			//this.avatarURL = res.data.avatarURL;
			this.firstName = res.data.firstName;
			this.lastName = res.data.lastName;
		});
	},
	methods: {
		getUserBusinesses() {
			axios
				.get("http://localhost:3000/api/business/user/" + this.$route.params.id)
				.then(res => {
					this.businesses = res.data;
				});
		}

		//return this.clients.filter(c => c.name.toLowerCase().indexOf(search) > -1);
	}
};
</script>

<style>
</style>