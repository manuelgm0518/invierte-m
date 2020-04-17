<template>
  <div>
    <h1 style="padding-left: 30px;">Carrito de compra</h1>
    <p class="numberProductsS" style="padding-left: 30px;">Número de productos: {{ shoppingCart.length }}</p>
    <div class="shoppingCart">
      <div v-for="(product, i) in shoppingCart" v-bind:key="i" class="productS">
        <div class="productImageS">
          <img v-bind:src="product.product.imageURL">
        </div>
        <div class="productNameS"  v-on:click="goProduct(product.product._id)">
          {{ product.product.name }}
        </div>
        <div class="productQuantityS">
          Cantidad: {{ product.quantity }}
        </div>
        <div class="productPriceS">
          Precio: $ {{ product.product.salePrice }} MXN
        </div>
        <div class="productTotalPriceS">
          Total: $ {{ product.product.salePrice * product.quantity }} MXN
        </div>
        <button class="productRemoveS" v-on:click="removeProduct(product._id)">X</button>
      </div>
    </div>
    <h3 class="totalS">El total es: $ {{ total }} MXN <button v-on:click="pay">Pagar</button></h3>
  </div>
</template>

<script>
import axios from "axios";

export default {
	name: "ShoppingCart",
	data() {
		return {
      shoppingCart: {},
      total:0
		};
	},
	mounted() {
		new Promise(() => {
			setTimeout(() => {
				this.getProducts();
			}, 100);
		});
  },
  methods:{
    getProducts(){
      axios.get("http://189.168.127.125/api/user/" + this.$store.state.user.id)
      .then(res => {
        this.shoppingCart = res.data.shoppingCart;
        this.total = 0;
        for(var product of this.shoppingCart){
          this.total += product.product.salePrice * product.quantity;
        }
      });
    },
    goProduct(_id){
      this.$router.push('/product/' + _id);
    },
    removeProduct(_id){
      let pro = {
        user:this.$store.state.user.id,
        product:_id
      };
      axios.post('http://189.168.127.125/api/user/removeShoppingCart', pro);
      this.getProducts();
    },
    pay(){
      alert('La página se encuentra en proceso de desarrollo, por lo que esta opción no está disponible. Se asumirá que se pagó todo.');
      axios.get('http://189.168.127.125/api/user/clearShoppingCart/' + this.$store.state.user.id);
      this.getProducts();
    }
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
.productQuantityS,
.productPriceS,
.productTotalPriceS {
	display: inline-block;
	padding: 5px;
}
.productImageS img {
	height: 40px;
}
.productRemoveS{
	float: right;
}
.totalS{
  padding-left: 30px;
}
.productNameS{
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
.productNameS:hover{
  color: lightblue;
}
</style>