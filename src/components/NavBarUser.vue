<template>
	<div>
		<b-nav-item-dropdown ref="accessDropdown" no-caret right v-if="!$store.state.userId">
			<template v-slot:button-content>
				<b-button variant="outline-golden">
					<i class="fas fa-sign-in-alt fa-fw mr-2" />Ingresar
				</b-button>
			</template>

			<b-tabs end small no-nav-style active-nav-item-class="d-none" style="width:20rem" align="center">
				<b-tab title="¿Ya tienes una cuenta?" active>
					<b-dropdown-form>
						<b-dropdown-text class="text-center">
							<h5>Iniciar Sesión</h5>
						</b-dropdown-text>
						<b-input-group size="sm" class="mb-2">
							<b-input-group-prepend is-text>
								<i class="fas fa-envelope fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Correo electrónico"></b-form-input>
						</b-input-group>
						<b-input-group size="sm" class="mb-2">
							<b-input-group-prepend is-text>
								<i class="fas fa-unlock-alt fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Contraseña" type="password"></b-form-input>
						</b-input-group>
						<b-button variant="golden mt-1" block size="sm">Ingresar</b-button>
					</b-dropdown-form>
					<b-dropdown-divider />
				</b-tab>

				<b-tab title="¿Todavía no tienes cuenta?">
					<b-dropdown-form>
						<b-dropdown-text class="text-center">
							<h5>Registrarse</h5>
						</b-dropdown-text>
						<b-input-group size="sm" class="mb-2">
							<b-input-group-prepend is-text>
								<i class="fas fa-user fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Nombres"></b-form-input>
						</b-input-group>
						<b-input-group size="sm" class="mb-2">
							<b-input-group-prepend is-text>
								<i class="fas fa-user-tie fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Apellidos"></b-form-input>
						</b-input-group>
						<b-input-group size="sm" class="mb-2">
							<b-input-group-prepend is-text>
								<i class="fas fa-envelope fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Correo electrónico"></b-form-input>
						</b-input-group>
						<b-input-group size="sm" class="mb-2">
							<b-input-group-prepend is-text>
								<i class="fas fa-unlock-alt fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Contraseña" type="password"></b-form-input>
						</b-input-group>
						<b-input-group size="sm" class="mb-2">
							<b-input-group-prepend is-text>
								<i class="fas fa-check-circle fa-fw" />
							</b-input-group-prepend>
							<b-form-input placeholder="Confirmar contraseña" type="password"></b-form-input>
						</b-input-group>
						<b-button variant="golden mt-1" block size="sm">Ingresar</b-button>
					</b-dropdown-form>
					<b-dropdown-divider />
				</b-tab>
			</b-tabs>
		</b-nav-item-dropdown>

		<b-nav-item-dropdown right v-else>
			<template v-slot:button-content>
				kkdvak
				<b-badge
					variant="golden mx-1"
					pill
				>{{ notifications.messages + notifications.cartItems + notifications.investments + notifications.businesses }}</b-badge>
			</template>
			<b-dropdown-item>
				<b-avatar rounded class="m-2" />
				{{ user.firstName+" "+user.lastName}}
			</b-dropdown-item>
			<b-dropdown-item-btn>
				<i class="fas fa-comments fa-fw mr-2 text-golden"></i>Mensajes
				<b-badge variant="golden mx-1" pill>{{ notifications.messages }}</b-badge>
			</b-dropdown-item-btn>
			<b-dropdown-item-btn>
				<i class="fas fa-shopping-cart fa-fw mr-2 text-golden"></i>Carrito de compra
				<b-badge variant="golden mx-1" pill>{{ notifications.cartItems }}</b-badge>
			</b-dropdown-item-btn>
			<b-dropdown-item-btn>
				<i class="fas fa-piggy-bank fa-fw mr-2 text-golden"></i>Mis inversiones
				<b-badge variant="golden mx-1" pill>{{ notifications.investments }}</b-badge>
			</b-dropdown-item-btn>
			<b-dropdown-item-btn>
				<i class="fas fa-suitcase fa-fw mr-2 text-golden"></i>Mis empresas
				<b-badge variant="golden mx-1" pill>{{ notifications.businesses }}</b-badge>
			</b-dropdown-item-btn>
			<b-dropdown-divider />
			<b-dropdown-item-button>
				<i class="fas fa-cog fa-fw mr-2 text-primary"></i>Ajustes
			</b-dropdown-item-button>
			<b-dropdown-item-button v-on:click="logOut">
				<i class="fas fa-power-off fa-fw mr-2 text-danger"></i>Salir
			</b-dropdown-item-button>
		</b-nav-item-dropdown>
	</div>
</template>

<script>
export default {
	name: "NavBarUser",
	data: () => ({
		notifications: {
			messages: 0,
			cartItems: 0,
			investments: 0,
			businesses: 0
		},
		user: {
			logged: false,
			firstName: "Manuel",
			lastName: "González Martínez"
		}
	})
};
</script>

<style lang="scss" scoped>
</style>