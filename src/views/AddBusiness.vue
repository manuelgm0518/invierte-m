<template>
	<b-container class="my-3 my-md-5">
		<b-card class="shadow border-0">
			<div class="text-center h2 text-golden font-weight-bold">Crear tu empresa</div>

			<b-row class="mx-0 my-3 mx-md-2">
				<b-col cols="12" md="5">
					<b-form-group label="Nombre de tu empresa:" label-for="business-name" class="my-3">
						<b-form-input
							id="business-name"
							v-model="name"
							type="email"
							required
							placeholder="Ingresa el nombre de la empresa"
						/>
					</b-form-group>
					<b-form-group label="Dirección de tu empresa:" label-for="business-location" class="my-3">
						<b-form-input
							id="business-location"
							v-model="location"
							required
							placeholder="Ingresa la dirección de tu empresa"
						/>
					</b-form-group>
					<b-form-group label="Descripción de la empresa:" label-for="business-description">
						<b-form-textarea
							id="business-description"
							placeholder="Ingresa una breve descripción sobre tu empresa"
							v-model="description"
							required
						></b-form-textarea>
					</b-form-group>

					<b-form-group label="Meta de recaudación:" label-for="business-goal">
						<b-input-group prepend="$" append=".00">
							<b-form-input type="number" min="0.00" v-model="goal"></b-form-input>
						</b-input-group>
					</b-form-group>
				</b-col>

				<b-col class="px-0 px-md-5">
					<div class="h5 w-100 text-center">Agrega imágenes de tu empresa</div>
					<b-carousel :interval="4000" :controls="imagesURL.length>1" :indicators="imagesURL.length>1">
						<b-carousel-slide v-for="url in imagesURL" :key="url" style="height:16rem">
							<template v-slot:img>
								<img
									style="position: absolute; top: 0; left: 0; min-width: 100%; height: 100%; max-width: 100%"
									:src="url"
								/>
							</template>
						</b-carousel-slide>
					</b-carousel>
					<b-button @click="addImage" variant="primary mt-3" block>Agregar imagen</b-button>
				</b-col>
			</b-row>
			<b-row class="mx-0 my-3 mx-md-2">
				<b-col>
					<div class="h5 w-100 text-center">Contenido de la página</div>
					<div class="w-100">
						<ContentEditor @update="updateContent" :content="content" />
					</div>
				</b-col>
			</b-row>
			<div class="text-right mx-0 my-3 mx-md-2 px-3">
				<b-button variant="secondary mr-3" :to="{'name':'Inicio'}">Cancelar</b-button>
				<b-button variant="success" @click="createBusiness">Aceptar</b-button>
			</div>
		</b-card>
	</b-container>
</template>

<script>
import ContentEditor from "../components/ContentEditor";
import axios from "axios";
export default {
	name: "AddBusiness",
	components: {
		ContentEditor
	},
	data: () => ({
		name: "",
		location: "",
		description: "",
		goal: 0,
		content:
			"<p>Ingresa información completa y detallada de tu empresa para ganar el interés y confianza de los posibles inversores.<p>",
		imagesURL: []
	}),
	methods: {
		createBusiness() {
			axios
				.post("http://localhost:3000/api/business/", {
					owner: this.$store.state.user.id,
          name: this.name,
          description: this.description,
					location: this.location,
					imagesURL: this.imagesURL,
					content: this.content,
					fundRaising: {
						goal: this.goal,
						collected: 0.0,
						startDate: new Date().toISOString(),
						finishDate: new Date().toISOString(),
						investors: 0
					}
				})
				.then(res => {
					console.log("awebo", res);
					this.$router.push({ name: "Empresa", params: {id:res.data._id}});
				})
				.catch(err => {
					console.log("Error", err);
				});
		},
		updateContent(html) {
			this.content = html;
		},
		addImage() {
			var url = prompt(
				"Ingresa la url de la magen:",
				"https://ejemplo/imagen.png"
			);
			if (url != null && url.length > 0) this.imagesURL.push(url);
		}
	}
};
</script>

<style>
</style>