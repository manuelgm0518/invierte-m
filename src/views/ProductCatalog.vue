<template>
	<b-container fluid class="my-3 my-md-5">
		<b-row class="px-2 px-md-5">
			<b-col cols="12" md="3">
				<b-card class="border-0 shadow text-center my-2">
					<span class="h3 font-weight-bold text-golden">Catálogo de Productos</span>
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
						Productos por página
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
						v-for="(product, i) in products"
						v-bind:key="i"
						v-on:click="sendProduct(product._id)"
					>
						<b-card
							class="border-0 shadow item-card h-100"
							:img-src="product.imageURL"
							img-top
						>
							<span class="h4 font-weight-bold">{{product.name}}</span>
							<br />
							<span class="text-golden h3">${{product.salePrice}}</span>
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
	name: "ProductCatalog",
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
			products: [],
			count: 0,
			show: 10,
			actual: 1,
			pages: [],
			numPages: 0,
			order: ["name", 1]
		};
	},
	created() {
		axios.get("http://189.168.127.125/api/product/count").then(res => {
			this.count = res.data;
			this.getPages();
		});
	},
	methods: {
		getProducts() {
			let interval = {
				min: (this.actual - 1) * this.show,
				max: this.actual * this.show,
				order: this.order
			};
			axios
				.post("http://189.168.127.125/api/product/interval", interval)
				.then(res => {
					this.products = res.data;
				});
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
			this.getProducts();
		},
		changePage(page) {
			if (page >= 1 && page <= this.numPages && page != this.page) {
				this.actual = page;
				this.getPages();
			}
		},
		sendProduct(_id) {
			this.$router.push("/product/" + _id);
		}
	}
};
</script>

<style scoped>
.item-card {
	transition: transform 0.2s;
}
.item-card:hover {
	transform: translateY(-0.5rem);
	cursor: pointer;
}
</style>