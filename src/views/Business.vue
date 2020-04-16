<template>
	<b-container class="my-5">
		<b-row>
			<b-col cols="12" md="7">
				<b-carousel
					id="carousel-1"
					v-model="carousel.slide"
					:interval="4000"
					controls
					indicators
					@sliding-start="onSlideStart"
					@sliding-end="onSlideEnd"
				>
					<b-carousel-slide
						v-for="image in imagesURL"
						:key="image"
						:img-src="image"
						style="max-height:20rem"
					/>
				</b-carousel>
			</b-col>
			<b-col>
				<b-card class="border-0 shadow">
					<h1 class="font-weight-bold p-0 m-0">{{ name }}</h1>
					<span class="text-golden">{{ location }}</span>
					<h5 class="text-muted text-justify mt-2">{{ description }}</h5>
					<div class="mt-3">
						<span
							class="text-golden font-weight-bold h2"
						>${{ Number(fundRaising.collected).toLocaleString('en') }}</span>
						<span
							class="text-secondary h5 text-align-top"
						>/ ${{ Number(fundRaising.goal).toLocaleString('en') }}</span>
					</div>
					<b-progress :value="fundRaising.collected" :max="fundRaising.goal" variant="golden" />
					<div class="text-muted h5">{{ fundRaising.investors }} Inversores</div>
					<b-button-group size="lg" class="w-100 mt-3">
						<b-button variant="golden" block>
							<i class="fas fa-money-bill-wave fa-fw mr-3"></i>Invertir
						</b-button>
						<b-button variant="outline-golden">
							<i class="fas fa-envelope"></i>
						</b-button>
						<b-button variant="outline-golden">
							<i class="fas fa-info-circle"></i>
						</b-button>
					</b-button-group>
				</b-card>
			</b-col>
		</b-row>

		<b-row>
			<b-col cols="12" md="7">
				<b-card class="border-0 shadow my-3" v-if="content.length>0">
					<div v-for="section in content" :key="section.name" class="my-2">
						<span class="font-weight-bold h4 text-golden">{{ section.title}}</span>
						<div v-html="section.content"></div>
					</div>
				</b-card>

				<b-card v-for="update in updates" :key="update.date" class="border-0 shadow mt-3">
					<div>
						<span class="h5 font-weight-bold">Actualización {{update.date}}</span>
						<div v-html="update.content"></div>
					</div>
				</b-card>
			</b-col>
			<b-col>
				<b-card class="border-0 shadow mt-3" v-if="lookingFor.length>0">
					<b-button block href="#" v-b-toggle.vacancies-collapse variant="primary">
						<span class="font-weight-bold">
							La empresa busca:
							<i class="fas fa-sort-down"></i>
						</span>
					</b-button>
					<b-collapse id="vacancies-collapse" visible accordion="my-accordion" role="tabpanel">
						<b-button
							div
							v-for="vacant in lookingFor"
							:key="vacant.id"
							variant="silver my-2 text-center"
							block
						>
							<span class="h5 font-weight-bold">{{ vacant.name }}</span><br/>
							<span class="text-muted">{{ vacant.description }}</span>
						</b-button>
					</b-collapse>
				</b-card>

				<b-card class="border-0 shadow mt-3" v-if="products.length>0">
					<b-button block href="#" v-b-toggle.products-collapse variant="primary">
						<span class="font-weight-bold">
							Productos
							<i class="fas fa-sort-down"></i>
						</span>
					</b-button>
					<b-collapse id="products-collapse" visible accordion="my-accordion" role="tabpanel">
						<b-button v-for="product in products" :key="product.id" variant="silver my-2 text-left" block>
							<b-avatar :src="product.imageURL" class="align-top mt-1" />
							<div class="d-inline-block ml-3">
								<span class="h5 font-weight-bold">{{ product.name }}</span>
								<br />
								<span class="text-golden font-weight-bold">${{ product.salePrice }}</span>
							</div>
						</b-button>
					</b-collapse>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import axios from "axios";
export default {
	name: "Business",
	created() {
		axios.get("http://localhost:3000/api/business/" + this.$route.params.id).then(res => {
			Object.assign(this, res.data);
		});
		axios.get("http://localhost:3000/api/product/business/" + this.$route.params.id).then(res => {	
				this.products = res.data;	
		});
		axios.get("http://localhost:3000/api/vacant/business/" + this.$route.params.id).then(res => {	
				this.lookingFor = res.data;	
		});

		/*this.products = [
			{ id: "777", name: "segsgdsg", salePrice: 0.00, imageURL: "" }
		];*/
		/*this.content = [
					{
						title: "kkdvak",
						content: "joaquin c la come"
					},
					{
						title: "kkdvak2",
						content: "joaquin c la come x2"
					}
				];
				this.updates = [
					{ date: "15/04/2020", content: "Joquín c la sigue comiendo" },
					{ date: "16/04/2020", content: "Joquín c la sigue comiendo" }
				];*/
	},
	data: () => ({
		owner: "",
		name: "",
		location: "",
		imagesURL: [],
		categories: [],
		description: "",
		content: [
			{
				title: "kkdvak",
				content: "joaquin c la come"
			}
		],
		updates: [
			/*{ date: "",content: "" }*/
		],
		lookingFor: [
			/*{id: "", name: "", description:""}*/
		],
		fundRaising: {
			goal: 0.0,
			collected: 0.0,
			investors: 0,
			startDate: "",
			finishDate: ""
		},
		registrationDate: "",

		products: [
			/*{ id: "", name: "", salePrice: 0.00, imageURL: "" }*/
		],

		carousel: {
			slide: 0,
			sliding: null
		}
	}),
	methods: {
		onSlideStart() {
			this.carousel.sliding = true;
		},
		onSlideEnd() {
			this.carousel.sliding = false;
		}
	}
};
</script>

<style>
</style>