<template>
	<b-container class="my-5">
		<b-modal
			id="add-vacant"
			centered
			title="Agregar nueva vacante"
			@ok="addVacant"
			ok-title="Agregar"
		>
			<b-form>
				<b-form-group label="Nombre del puesto:" label-for="vacant-puesto">
					<b-form-input id="vacant-puesto" v-model="vacant.name" required></b-form-input>
				</b-form-group>
				<b-form-group label="Descripción:" label-for="vacant-desc">
					<b-form-textarea id="vacant-desc" v-model="vacant.description" required></b-form-textarea>
				</b-form-group>
				<b-form-group label="Sueldo menusal:" label-for="vacant-sueldo">
					<b-input-group prepend="$">
						<b-form-input
							id="vacant-sueldo"
							type="number"
							min="0"
							v-model="vacant.monthlyPayment"
							required
						/>
					</b-input-group>
				</b-form-group>
			</b-form>
		</b-modal>

		<b-modal
			id="add-product"
			centered
			title="Agregar nuevo producto"
			ok-title="Agregar"
			@ok="addProduct"
		>
			<b-form>
				<b-form-group label="Imagen del producto:" label-for="filetl">
					<b-form-file
						id="filetl"
						v-model="file"
						:state="Boolean(file)"
						placeholder="Escoge una imagen o sueltala aquí..."
						drop-placeholder="Suelta una imagen aquí..."
					></b-form-file>
				</b-form-group>

				<b-form-group label="Nombre del producto:" label-for="product-nombre">
					<b-form-input id="product-nombre" v-model="product.name" required></b-form-input>
				</b-form-group>

				<b-form-group label="Descripción:" label-for="product-desc">
					<b-form-textarea id="product-desc" v-model="product.description" required></b-form-textarea>
				</b-form-group>

				<b-form-group label="Precio de venta:" label-for="product-price">
					<b-input-group prepend="$">
						<b-form-input id="product-price" type="number" min="0" v-model="product.salePrice" required />
					</b-input-group>
				</b-form-group>
			</b-form>
		</b-modal>

		<b-card class="border-0 shadow p-0">
			<b-row>
				<b-col cols="12" md="7">
					<b-carousel :interval="4000" :controls="imagesURL.length>1" :indicators="imagesURL.length>1">
						<b-carousel-slide v-for="url in imagesURL" :key="url" style="height:20rem">
							<template v-slot:img>
								<img
									style="position: absolute; top: 0; left: 0; min-width: 100%; height: 100%; max-width: 100%"
									:src="url"
								/>
							</template>
						</b-carousel-slide>
					</b-carousel>
				</b-col>
				<b-col class="pl-md-4 ml-md-3">
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

					<div v-if="owner==$store.state.user.id" class="mt-4">
						<b-button variant="success" block v-b-modal.add-vacant>Agregar Vacante</b-button>
						<b-button variant="success" block v-b-modal.add-product>Agregar Producto</b-button>
					</div>

					<b-button-group size="lg" class="w-100 mt-3" v-else>
						<b-button variant="golden" block v-on:click="invest">
							<i class="fas fa-money-bill-wave fa-fw mr-3"></i>Invertir
						</b-button>
						<b-button variant="outline-golden">
							<i class="fas fa-envelope"></i>
						</b-button>
						<b-button variant="outline-golden">
							<i class="fas fa-info-circle"></i>
						</b-button>
					</b-button-group>
				</b-col>
			</b-row>
		</b-card>

		<b-row>
			<b-col cols="12" md="7">
				<b-card class="border-0 shadow my-3" v-if="content.length>0">
					<div v-if="owner==$store.state.user.id">
						<ContentEditor @update="saveText" :content="content" />
						<div class="text-right mt-3">
							<b-button variant="secondary mr-1">Cancelar</b-button>
							<b-button variant="primary ml-1">Guardar Cambios</b-button>
						</div>
					</div>

					<div v-else v-html="content"></div>
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
					<b-button block v-b-toggle.vacancies-collapse variant="primary">
						<span class="font-weight-bold">
							La empresa busca:
							<i class="fas fa-sort-down"></i>
						</span>
					</b-button>
					<b-collapse id="vacancies-collapse" accordion="my-accordion" role="tabpanel">
						<b-button
							div
							v-for="vacant in lookingFor"
							:key="vacant._id"
							:to="{'name':'Vacante', 'params': {'id':vacant._id}}"
							variant="silver my-2 text-center"
							block
						>
							<span class="h5 font-weight-bold">{{ vacant.name }}</span>
							<br />
							<span class="text-muted">{{ vacant.description }}</span>
						</b-button>
					</b-collapse>
				</b-card>

				<b-card class="border-0 shadow mt-3" v-if="products.length>0">
					<b-button block v-b-toggle.products-collapse variant="primary">
						<span class="font-weight-bold">
							Productos
							<i class="fas fa-sort-down"></i>
						</span>
					</b-button>
					<b-collapse id="products-collapse" accordion="my-accordion" role="tabpanel">
						<b-button
							v-for="product in products"
							:key="product.id"
							variant="silver my-2 text-left"
							:to="{'name':'Producto', 'params':{'id':product._id}}"
							block
						>
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
import ContentEditor from "../components/ContentEditor";

export default {
	name: "Business",
	components: {
		ContentEditor
	},
	mounted() {
		this.vacant.business = this.$route.params.id;
		this.product.business = this.$route.params.id;
		new Promise(() => {
			setTimeout(() => {
				axios
					.get("http://189.168.127.125/api/business/" + this.$route.params.id)
					.then(res => {
						Object.assign(this, res.data);
						console.log(this.content);
						axios
							.get(
								"http://189.168.127.125/api/product/business/" +
									this.$route.params.id
							)
							.then(res => {
								this.products = res.data;
								axios
									.get(
										"http://189.168.127.125/api/vacant/business/" +
											this.$route.params.id
									)
									.then(res => {
										this.lookingFor = res.data;
									});
							});
					});
			}, 500);
		});
	},
	data: () => ({
		vacant: {
			business: "",
			name: "",
			description: "",
			monthlyPayment: ""
		},
		product: {
			business: "",
			name: "",
			salePrice: "",
			description: ""
		},
		file: null,
		owner: "",
		name: "",
		location: "",
		imagesURL: [],
		categories: [],
		description: "",
		content: "",
		/*{
				title: "kkdvak",
				content: "joaquin c la come"
			}*/

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
		]
	}),
	methods: {
		toast(title, message, variant = null, toaster = "b-toaster-bottom-right") {
			this.$bvToast.toast(message, {
				title,
				variant,
				toaster,
				solid: true
			});
		},
		saveText(html) {
			this.content = html;
		},
		invest() {
			alert("Invertir");
		},
		addVacant() {
			if (
				!this.vacant.name ||
				!this.vacant.description ||
				!this.vacant.monthlyPayment
			) {
				this.toast(
					"Error del formulario",
					"Rellene todos los campos",
					"danger"
				);
			} else if (isNaN(this.vacant.monthlyPayment)) {
				this.toast(
					"Error del formulario",
					"Agregar un sueldo mensual válido",
					"danger"
				);
			} else {
				axios
					.post("http://189.168.127.125/api/vacant", this.vacant)
					.then(res => {
						if (res.status == 200) {
							this.$router.push("/vacant/" + res.data._id);
						}
					});
			}
		},
		addProduct() {
			if (
				!this.product.name ||
				!this.product.salePrice ||
				!this.product.description ||
				!this.file
			) {
				this.toast(
					"Error del formulario",
					"Rellene todos los campos",
					"danger"
				);
			} else if (isNaN(this.product.salePrice)) {
				this.toast(
					"Error del formulario",
					"Agregar un precio válido",
					"danger"
				);
			} else {
				axios
					.post("http://189.168.127.125/api/product", this.product)
					.then(res => {
						if (res.status == 200) {
							let formData = new FormData();
							formData.append("file", this.file);
							axios
								.post(
									"http://189.168.127.125/api/product/file/" + res.data._id,
									formData,
									{ headers: { "Content-Type": "multipart/form-data" } }
								)
								.then(res2 => {
									if (res2.status == 200) {
										this.$router.push("/product/" + res.data._id);
									}
								});
						}
					});
			}
		}
	}
};
</script>

<style>
</style>