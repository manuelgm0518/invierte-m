<template>
	<div>
		<b-nav-item-dropdown ref="accessDropdown" no-caret right v-if="!$store.state.user.id">
			<template v-slot:button-content>
				<b-button variant="outline-golden">
					<i class="fas fa-sign-in-alt fa-fw mr-2" />Ingresar
				</b-button>
			</template>

			<!-- [ LOGIN] -->
			<b-tabs end small no-nav-style active-nav-item-class="d-none" style="width:20rem" align="center">
				<b-tab title="¿Ya tienes una cuenta?" active>
					<b-dropdown-form>
						<b-dropdown-text class="text-center w-100">
							<h5>Iniciar Sesión</h5>
						</b-dropdown-text>
						<b-input-group size="sm" class="mb-2 w-100">
							<b-input-group-prepend is-text>
								<i class="fas fa-envelope fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Correo electrónico" v-model="logIn.email"></b-form-input>
						</b-input-group>
						<b-input-group size="sm" class="mb-2 w-100">
							<b-input-group-prepend is-text>
								<i class="fas fa-unlock-alt fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Contraseña" type="password" v-model="logIn.password"></b-form-input>
						</b-input-group>
						<b-button variant="golden mt-1" block size="sm" @click="logInUser">Ingresar</b-button>
					</b-dropdown-form>
					<b-dropdown-divider />
				</b-tab>

				<!-- [ SIGN UP] -->
				<b-tab title="¿Todavía no tienes cuenta?">
					<b-dropdown-form>
						<b-dropdown-text class="text-center w-100">
							<h5>Registrarse</h5>
						</b-dropdown-text>
						<b-input-group size="sm" class="mb-2 w-100">
							<b-input-group-prepend is-text>
								<i class="fas fa-user fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Nombres" v-model="signUp.firstName"></b-form-input>
						</b-input-group>
						<b-input-group size="sm" class="mb-2 w-100">
							<b-input-group-prepend is-text>
								<i class="fas fa-user-tie fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Apellidos" v-model="signUp.lastName"></b-form-input>
						</b-input-group>
						<b-input-group size="sm" class="mb-2 w-100">
							<b-input-group-prepend is-text>
								<i class="fas fa-envelope fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Correo electrónico" v-model="signUp.email"></b-form-input>
						</b-input-group>
						<b-input-group size="sm" class="mb-2 w-100">
							<b-input-group-prepend is-text>
								<i class="fas fa-unlock-alt fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Contraseña" type="password" v-model="signUp.password"></b-form-input>
						</b-input-group>
						<b-input-group size="sm" class="mb-2 w-100">
							<b-input-group-prepend is-text>
								<i class="fas fa-check-circle fa-fw" />
							</b-input-group-prepend>
							<b-form-input
								placeholder="Confirmar contraseña"
								type="password"
								v-model="signUp.confirmPassword"
							></b-form-input>
						</b-input-group>
						<b-button variant="golden mt-1" block size="sm" @click="signUpUser">Ingresar</b-button>
					</b-dropdown-form>
					<b-dropdown-divider />
				</b-tab>
			</b-tabs>
		</b-nav-item-dropdown>

		<!-- [ MENU USUARIO ] -->
		<b-nav-item-dropdown right no-caret v-else>
			<template v-slot:button-content>
				<b-button variant="outline-golden">
					Hola, {{ $store.state.user.firstName }}
					<i
						class="fas fa-bell bell fa-fw ml-1"
						v-if="$store.getters.getNotificationCount>0"
					></i>
				</b-button>
			</template>
			<b-dropdown-item :to="{'name': 'Usuario', 'params': {'id':$store.state.user.id }}" class="w-100">
				<b-avatar rounded variant="silver" :src="$store.state.user.avatarURL" />
				<b class="ml-2">{{ $store.state.user.firstName + ' ' + $store.state.user.lastName }}</b>
			</b-dropdown-item>
			<b-dropdown-item :to="{ 'name': 'Chats' }" class="w-100">
				<i class="fas fa-comments fa-fw mr-2 text-golden" />Mensajes
				<b-badge
					variant="golden mx-1"
					pill
					v-if="$store.state.user.notifications.messages>0"
				>{{ $store.state.user.notifications.messages }}</b-badge>
			</b-dropdown-item>
			<b-dropdown-item :to="{ 'name': 'Carrito'}" class="w-100">
				<i class="fas fa-shopping-cart fa-fw mr-2 text-golden" />Carrito de compra
				<b-badge
					variant="golden mx-1"
					pill
					v-if="$store.state.user.notifications.shoppingCart>0"
				>{{ $store.state.user.notifications.shoppingCart }}</b-badge>
			</b-dropdown-item>
			<b-dropdown-item :to="{ 'name': 'Inversiones' }" class="w-100">
				<i class="fas fa-piggy-bank fa-fw mr-2 text-golden" />Mis inversiones
				<b-badge
					variant="golden mx-1"
					pill
					v-if="$store.state.user.notifications.investments>0"
				>{{ $store.state.user.notifications.investments }}</b-badge>
			</b-dropdown-item>
			<b-dropdown-item :to="{'name': 'MisEmpresas'}" class="w-100">
				<i class="fas fa-suitcase fa-fw mr-2 text-golden"></i>Mis empresas
				<b-badge
					variant="golden mx-1"
					pill
					v-if="$store.state.user.notifications.businesses>0"
				>{{ $store.state.user.notifications.businesses }}</b-badge>
			</b-dropdown-item>
			<b-dropdown-divider></b-dropdown-divider>
			<!--Oculto hasta cuando haya página de configuración
				<b-dropdown-item class="w-100">
				<i class="fas fa-cog fa-fw mr-2 text-primary"></i>Configuración
			</b-dropdown-item>-->
			<b-dropdown-item-btn class="w-100" @click="logOutUser">
				<i class="fas fa-power-off fa-fw mr-2 text-danger"></i>Salir
			</b-dropdown-item-btn>
		</b-nav-item-dropdown>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "NavBarUser",
	data: () => ({
		logIn: {
			email: "",
			password: ""
		},
		signUp: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	}),
	created() {
		if (localStorage.getItem("token") != null) {
			this.updateVuexStore();
		}
	},
	methods: {
		toast(title, message, variant = null, toaster = "b-toaster-bottom-right") {
			this.$bvToast.toast(message, {
				title,
				variant,
				toaster,
				solid: true
			});
		},
		logInUser() {
			var failed = false;
			if (this.logIn.email == "") {
				this.toast(
					"Error del formulario",
					"Debe llenar el campo con un correo",
					"danger"
				);
				failed = true;
			}
			if (this.logIn.password == "") {
				this.toast(
					"Error del formulario",
					"Debe llenar el campo con una contraseña",
					"danger"
				);
				failed = true;
			}
			if (!failed) {
				let logUser = {
					email: this.logIn.email,
					password: this.logIn.password
				};
				axios
					.post("http://localhost:3000/api/user/login", logUser)
					.then(res => {
						if (res.status == 200) {
							if (res.data.error == "User does not exist") {
								this.toast(
									"Error del formulario",
									"Correo o contraseña incorrectos",
									"danger"
								);
							} else {
								localStorage.setItem("token", res.data);
								this.updateVuexStore();
								this.toast("Información correcta", "Bienvenido", "success");
							}
						}
					});
			}
		},
		signUpUser() {
			if (
				this.signUp.email.indexOf("@") == -1 ||
				this.signUp.email.indexOf(".") == -1
			) {
				this.toast(
					"Error del formulario",
					"Debe llenar el formulario con un correo",
					"danger"
				);
			} else if (this.signUp.password.length < 8) {
				this.toast(
					"Error del formulario",
					"La contraseña debe tener al menos 8 caracteres",
					"danger"
				);
			} else if (this.signUp.password != this.signUp.confirmPassword) {
				this.toast(
					"Error del formulario",
					"Las contraseñas no coinciden",
					"danger"
				);
			} else if (this.signUp.firstName == "" || this.signUp.lastName == "") {
				this.toast(
					"Error del formulario",
					"Debe llenar todos los campos",
					"danger"
				);
			} else {
				let newUser = {
					firstName: this.signUp.firstName,
					lastName: this.signUp.lastName,
					email: this.signUp.email,
					password: this.signUp.password
				};
				axios.post("http://localhost:3000/api/user", newUser).then(res => {
					if (res.status == 200) {
						if (res.data.error == "User already exists") {
							this.toast(
								"Error del formulario",
								"El usuario ya existe",
								"danger"
							);
						} else {
							let logUser = {
								email: this.signUp.email,
								password: this.signUp.password
							};
							axios
								.post("http://localhost:3000/api/user/login", logUser)
								.then(res => {
									if (res.status == 200) {
										if (res.data.error == "User does not exist") {
											location.reload();
										} else {
											localStorage.setItem("token", res.data);
											this.updateVuexStore();
											this.toast("Información correcta", "Bienvenido", "success");
										}
									}
								});
						}
					}
				});
			}
		},
		logOutUser() {
			this.$store.commit("userLogIn", {
				id: null,
				avatarURL: "",
				firstName: "",
				lastName: "",
				notifications: {
					messages: 0,
					shoppingCart: 0,
					investments: 0,
					businesses: 0
				}
			});
			localStorage.clear();
		},
		updateVuexStore() {
			axios.get("http://localhost:3000/api/user", { headers: { token:localStorage.getItem('token') }})
			.then(res => {
				if (res.status == 200) {
					if(res.data.unauthorized)
						this.logOutUser();
					else{
						this.$store.commit("userLogIn", {
							id: res.data._id,
							avatarURL: res.data.avatarURL,
							firstName: res.data.firstName,
							lastName: res.data.lastName,
							notifications: {
								messages: 5,
								shoppingCart: res.data.shoppingCart.length,
								investments: 9,
								businesses: 1
							}
						});
					}
			}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/ring-bell-animation.scss";
</style>