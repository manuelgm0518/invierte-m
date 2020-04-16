<template>
	<div>
		<h1>Carrito de compra {{ $store.state.user.id }}</h1>
		<div class="shoppingCart">
			<div v-for="(product, i) in shoppingCart" v-bind:key="i" class="productS">
				<div class="productImageS">
					<img v-bind:src="product.product.imageURL" />
				</div>
				<div class="productNameS">{{ product.product.name }}</div>
				<div class="productQuantityS">{{ product.quantity }}</div>
				<button class="productRemoveS">X</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "ShoppingCart",
	data() {
		return {
			shoppingCart: {}
		};
	},
	mounted() {
		new Promise(() => {
			setTimeout(() => {
				axios
					.get("http://localhost:3000/api/user/" + this.$store.state.user.id)
					.then(res => {
						this.shoppingCart = res.data.shoppingCart;
					});
			}, 50);
		});
	}
};
</script>

<style>
.shoppingCart {
	margin: 20px;
}
.productS {
	box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.5);
	padding: 5px;
	margin: 10px 0;
	border-radius: 5px;
}
.productImageS,
.productNameS,
.productQuantityS {
	display: inline-block;
	padding: 5px;
}
.productImageS img {
	height: 40px;
}
.productRemoveS {
	position: relative;
	right: 0;
}
</style>