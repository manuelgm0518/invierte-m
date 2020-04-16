<template>
  <div class="separate">
    <img class="productImageN" v-bind:src="product.imageURL">
    <div class="containerproduct">
      <h2 class="productNameN">{{ product.name }}</h2>
      <p class="productBuyN">Cantidad: <input type="number" value="1" min="1" max="100" v-model="quantity"> <button type="button" v-on:click="addShopingCart">Añadir al carrito</button></p>
      <div class="productInformationN">
        <div class="productPriceN"> <p id="price">Precio:</p>  $ {{product.salePrice }} MXN</div>
        <div class="productDescriptionN">{{ product.description }}</div>
        <div class="businessN">
        <div class="businessNameN">Negocio: {{ business.name }}</div>
        <div class="businessLocationN">Ubicación: {{ business.location }}</div>
      </div>    
    </div>
    
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
        this.$router.push('/shopping-cart');
      }
    }
  }
}
</script>

<style>
.separate{
  display: flex;
}
.businessNameN{
  text-align: center;
  background: white;
  border-radius: 15px;
  margin: 8px;
}
.productBuyN{
  border: 3px solid  #fbcd18;
  padding: 4px;
  border-radius: 10px;
  width: 100%;
  margin-left: 25px;
}
.businessLocationN{
  height: 45px;
  text-align: center;
  background: white;
  border-radius: 15px;
  margin: 8px;
}


.productImageN{
  float: left;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  height: 30%;
  margin: 3% 3%;
  width: 30%;
  background: white;
}

.productNameN{
  font-size: 50px;
  text-align: center;
  background: wheat;
  background: -webkit-linear-gradient(left top, #fb9918, yellow);
  background: linear-gradient(to bottom right, #fb9918, yellow);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 30px;
  width: 180%;
}
.productDescriptionN{
  text-align: center;
  background: white;
  border-radius: 15px;
  margin: 8px;
  height: 45%;
}
.productPriceN {
  text-align: center;
  background: white;
  border-radius: 15px;
  margin: 8px;
}
#price{
  background: grey;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;


}

.productInformationN{
  block-size: 350px;
  width: 160%;
  background: #fbcd18;
  padding: 5px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  margin:15px;
}
</style>