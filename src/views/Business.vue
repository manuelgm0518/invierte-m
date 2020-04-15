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
						style="height: 100%"
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
				<b-card class="border-0 shadow my-3">
					<div v-html="content"></div>
				</b-card>
				<b-card v-for="update in updates" :key="update.date" :header="'Actualización '+update.date" class="border-0 shadow">
					<div v-html="update.content"></div>
				</b-card>
			</b-col>
			<b-col>
				<b-card class="border-0 shadow mt-3">
					<h3 class="font-weight-bold">La empresa busca:</h3>
					<b-button
						div
						v-for="vacant in lookingFor"
						:key="vacant.id"
						variant="silver my-2 text-left"
						block
					>
						<span class="h5 font-weight-bold">{{ vacant.name }}:&nbsp;</span>
						<span class="text-muted">{{ vacant.description }}</span>
					</b-button>
				</b-card>

				<b-card class="border-0 shadow mt-3">
					<h3 class="font-weight-bold">Productos</h3>
					<b-button v-for="product in products" :key="product.id" variant="silver my-2 text-left" block>
						<b-avatar :src="product.imageURL" class="align-top mt-1" />
						<div class="d-inline-block ml-3">
							<span class="h5 font-weight-bold">{{ product.name }}</span>
							<br />
							<span class="text-golden font-weight-bold">${{ product.salePrice }}</span>
						</div>
					</b-button>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
	name: "Business",
	data: () => ({
		owner: {
			id: "joaquinclacome",
			firstName: "Manuel",
			lastName: "González Martínez",
			avatarURL: "https://image.flaticon.com/icons/svg/483/483361.svg",
			biography: ""
		},
		name: "Trecemil",
		location: "Aguascalientes, Ags. México",
		imagesURL: [
			"https://pop.inquirer.net/files/2020/04/dancing_coffin.jpg",
			"	https://i.ytimg.com/vi/qdWkngzQEGc/maxresdefault.jpg"
		],
		categories: [],
		description:
			"Un proyecto revolucionario que estuvo a punto de cambiar la historia tal como la conocemos.",
		content: `
		 <span class='h3 font-weight-bold mt-2'>Joaquín c la come</span>
		 <p>
			 Descripción mamalona acá 4k bien chida<br>
			 denmen dinero qlos
		 </p>
		 <span class='h3 font-weight-bold mt-2'>Mi empresa</span>
		 <p>
			 está bien chida siono karnal
		 </p>
		
		`,
		updates: [
			{
				date: "30/04/2020",
				content: `<p>Joaquín c la sigue comiendo</p>`
			}
		],
		lookingFor: [
			{
				id: "7777esfsef",
				name: "Patrón",
				description:
					"Esta persona se encargará de mandar a chingar su madre al América"
			}
		],
		fundRaising: {
			goal: 69420.0,
			collected: 10000.0,
			investors: 47,
			startDate: "",
			finishDate: "20/04/2020"
		},
		registrationDate: "",
		products: [
			{
				id: "444",
				name: "Mayonesa McCormick",
				salePrice: 777.5,
				imageURL: "https://image.flaticon.com/icons/svg/2630/2630075.svg"
			}
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