<template>
  <div >
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
body{
  background: rgba(236, 229, 190, 0.548);
}

.productImageN{
  float: left;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  margin: 10px;
  margin-top: 20px;
  width: 30%;
  background: white;
}
.productInformationN{
  box-sizing: border-box;
  width: 60%;
  right: 8%;
  float: right;
  position: relative;
}
.productNameN{
  text-align: center;
  background: -webkit-linear-gradient(left top, #fb9918, yellow);
  background: linear-gradient(to bottom right, #fb9918, yellow);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 30px;
}
.productPriceN{
  box-shadow: 0px 0px 4px rgb(255, 51, 0);
  position: static;
  padding: 3px 8px;
  border-radius: 3px;
  display: inline-block;
  background: white;
}
.productDescriptionN{
  border: 3px solid #fbcd18;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  background: white;
}
.productBuyN{
  margin: 10px 0px;
  width: 390px;
  border: 3px solid greenyellow;
  padding: 10px;
  border-radius: 10px;
}
.businessN{
  margin-left: 10px;
  clear: both;
  margin-top: 10px;
  padding: 10px;
  border: 3px solid rgb(51, 51, 77);
  border-radius: 10px;
  background: white;
}
</style>