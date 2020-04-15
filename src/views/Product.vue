<template>
  <div>
    <img class="productImageN" v-bind:src="product.imageURL">
    <div class="productInformationN">
      <h1 class="productNameN">{{ product.name }}</h1>
      <div class="productPriceN">Precio: $ {{product.salePrice }} MXN</div>
      <div class="productDescriptionN">{{ product.description }}</div>
      <div class="businessN">
        <div class="businessNameN">Negocio: {{ business.name }}</div>
        <div class="businessLocationN">Ubicación: {{ business.location }}</div>
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
      business:{}
    }
  },
  created(){
    axios.get('http://localhost:3000/api/product/' + this.id)
    .then(res => {
      this.product = res.data;
      this.business = this.product.business
    });
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
.businessN{
  margin-top: 10px;
}
</style>