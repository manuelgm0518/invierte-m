<template>
	<b-container fluid class="my-3 my-md-5">
		<b-row class="px-2 px-md-5">
			<b-col cols="12" md="3">
				<b-card class="border-0 shadow text-center my-2">
					<span class="h3 font-weight-bold text-golden">Catálogo de Empresas</span>
					<div class="my-3 text-left">
						Ordenar por
						<b-form-select
							v-model="order"
							:options="sorting"
							@change="getPages"
							size="sm"
							class="border-0 bg-silver"
						/>
					</div>

					<div class="my-3 text-left">
						Negocios por página
						<b-form-spinbutton
							v-model="show"
							min="10"
							max="100"
							step="10"
							@change="getPages"
							size="sm"
							class="border-0 bg-silver"
						></b-form-spinbutton>
					</div>

					<div class="text-left">
						Página
						<b-pagination
							@input="changePage"
							v-model="actual"
							:total-rows="count"
							:per-page="show"
							size="sm"
							align="fill"
						></b-pagination>
					</div>
				</b-card>
			</b-col>

			<b-col>
				<b-row>
					<b-col
						cols="12"
						md="4"
						class="py-2"
						v-for="(bus, i) in business"
						v-bind:key="i"
						v-on:click="sendBusiness(bus._id)"
					>
						<b-card class="border-0 shadow business" :img-src="getImage(bus.imagesURL)" img-top>
							<span class="h4 text-weight-bold">{{bus.name}}</span>
							<br />
							<span class="text-golden">{{bus.location}}</span>
						</b-card>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import axios from "axios";

export default {
	name: "BusinessCatalog",
	data() {
		return {
			sorting: [
				{
					value: ["name", 1],
					text: "Nombre A - Z"
				},
				{
					value: ["name", -1],
					text: "Nombre Z - A"
				},
				{
					value: ["registrationDate", 1],
					text: "Registro más reciente"
				},
				{
					value: ["registrationDate", -1],
					text: "Registro más antiguo"
				}
			],
			business: [],
			count: 0,
			show: 30,
			actual: 1,
			pages: [],
			numPages: 0,
			order: ["name", 1]
		};
	},
	created() {
		axios.get("http://localhost:3000/api/business/count").then(res => {
			this.count = res.data.count;
			this.getPages();
		});
	},
	methods: {
		getBusiness() {
			let interval = {
				min: (this.actual - 1) * this.show,
				max: this.actual * this.show,
				order: this.order
			};
			axios
				.post("http://localhost:3000/api/business/interval", interval)
				.then(res => {
					this.business = res.data;
				});
		},
		getImage(img) {
			if (img.length < 1) {
				return undefined;
			} else {
				return img[0];
			}
		},
		getPages() {
			this.numPages = parseInt((this.count - 1) / this.show) + 1;
			this.pages = [];
			for (
				var i = this.actual - 4 > 1 ? this.actual - 4 : 1;
				i <=
				(this.actual + 5 <= this.numPages ? this.actual + 5 : this.numPages);
				i++
			)
				this.pages.push(i);
			this.getBusiness();
		},
		changePage() {
			/*if (page >= 1 && page <= this.numPages && page != this.page) {
				this.actual = page;
				this.getPages();
            }*/

			this.getPages();
		},
		sendBusiness(_id) {
			this.$router.push({ name: "Empresa", params: { id: _id } });
		}
	}
};
</script>

<style scoped>
.business {
	transition: transform 0.2s;
}
.business:hover {
	transform: translateY(-0.5rem);
	cursor: pointer;
}
</style>