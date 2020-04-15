<template>
  <div>
    <img class="productImageN" v-bind:src="product.imageURL">
    <div class="productInformationN">
      <h1 class="productNameN">{{ product.name }}</h1>
      <div class="productPriceN">Precio: $ {{product.salePrice }} MXN</div>
      <p class="productBuyN">Cantidad: <input type="number" value="1" min="1" max="100" v-model="quantity"> <button type="button" v-on:click="addShopingCart">Añadir al carrito</button></p>
      <div class="productDescriptionN">{{ product.description }}</div>
    </div>
    <div class="businessN">
      <div class="businessNameN">Negocio: {{ business.name }}</div>
      <div class="businessLocationN">Ubicación: {{ business.location }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Product",
  data(){
    return {
      id:this.$route.params.id,
      product:{},
      business:{},
      quantity:1
    }
  },
  created(){
    axios.get('http://localhost:3000/api/product/' + this.id)
    .then(res => {
      this.product = res.data;
      this.business = this.product.business
    });
  },
  methods:{
    addShopingCart(){
      if(!this.$store.state.user.id){
        alert('Debe iniciar sesión para poder agregar el producto al carrito');
      }
      else{
        let newShopingCart = {
            product:this.product._id,
            quantity:this.quantity
        }
        axios.put('http://localhost:3000/api/user/addShoppingCart/' + this.$store.state.user.id, newShopingCart);
        alert('Aquí te mandaría a la pagina de carrito.');
        this.$router.push('/');
      }
    }
  }
}
</script>

<style>
.productImageN{
  float: left;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  margin: 10px;
  margin-top: 20px;
  width: 30%;
}
.productInformationN{
  box-sizing: border-box;
  width: 60%;
  right: 8%;
  float: right;
  position: relative;
}
.productNameN{
  margin-top: 30px;
}
.productPriceN{
  box-shadow: 0px 0px 4px rgba(75, 82, 0, 0.5);
  position: static;
  padding: 3px 8px;
  border-radius: 3px;
  display: inline-block;
}
.productDescriptionN{
  border: 1px solid gray;
  margin-top: 10px;
  padding: 10px;
}
.productBuyN{
  margin: 10px;
}
.businessN{
  margin-left: 10px;
  clear: both;
  margin-top: 10px;
}
</style>