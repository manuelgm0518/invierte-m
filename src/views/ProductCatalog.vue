<template>
  <div>
    <h1 style="padding-left: 10px;">Catálogo de Productos</h1>

    <p style="padding-left: 10px;">Ordenar por <select v-model="order" v-on:change="getProducts">
        <option v-bind:value="['name', 1]" selected>Nombre A - Z</option>
        <option v-bind:value="['name', -1]">Nombre Z - A</option>
        <option v-bind:value="['salePrice', -1]">Mayor precio</option>
        <option v-bind:value="['salePrice', 1]">Menor precio</option>
      </select></p>

    <p style="padding-left: 10px;">Productos por página <select v-model="show" v-on:change="getProducts">
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select></p>

    <div class="productsContainer">
      <div class="product" v-for="(product, i) in products" v-bind:key="i" v-on:click="sendProduct(product._id)">
        <div class="productName">
          {{ product.name }}
        </div>
        <div class="productImage">
          <img v-bind:src="product.imageURL">
        </div>
        <div class="productPrice">
          $ {{ product.salePrice }} MXN
        </div>
      </div>
    </div>

  <ul class="pagination">
    <li><div class="paginationPage" v-on:click="changePage(actual - 1)">Anterior</div></li>
    <li v-for="(page, i) in pages" v-bind:key="i">
      <div class="paginationPage" v-if="page != actual" v-on:click="changePage(page)"> {{page}} </div>
      <div class="paginationActual" v-if="page == actual"> {{page}} </div>
    </li>
    <li><div class="paginationPage" v-on:click="changePage(actual + 1)">Siguiente</div></li>
  </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ProductCatalog",
  data(){
    return {
      products:[],
      count:0,
      show:30,
      actual:1,
      pages:[],
      numPages:0,
      order:['name', 1]
    }
  },
  created(){
    axios.get('http://localhost:3000/api/product/count')
    .then(res => {
      this.count = res.data.count;
      this.getPages();
    });
  },
  methods:{
    getProducts(){
      let interval = {
        min: (this.actual - 1) * this.show,
        max: (this.actual) * this.show,
        order: this.order
      }
      axios.post('http://localhost:3000/api/product/interval', interval)
      .then(res => {
        this.products = res.data;
      });
    },
    getPages(){
      this.numPages = parseInt((this.count - 1) / this.show) + 1;
      for(var i = this.actual - 4 > 1?this.actual - 4:1; i <= (this.actual + 5 <= this.numPages?this.actual + 5:this.numPages); i++)
        this.pages.push(i);
      this.getProducts();
    },
    changePage(page){
      if(page > 1 && page <= this.numPages && page != this.page){
        this.actual = page;
        this.getPages();
      }
    },
    sendProduct(_id){
      alert(_id);
    }
  }
}
</script>

<style>
.productsContainer{
  padding: 10px;
}
.product{
  width: 20%;
  float: left;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  cursor: pointer;
}
.product:hover{
  background-color: rgb(240, 240, 240);
}
.productName{
  padding: 5px;
  text-align: center;
}
.productPrice{
  padding: 5px;
  text-align: center;
}
.productImage{
  height: 150px;
  overflow: hidden;
}
.productImage img{
  width: 100%;
}
.pagination{
  clear: both;
  padding: 10px;
}
.paginationPage, .paginationActual{
  margin-right: 10px;
}
.paginationPage{
  color: rgb(104, 104, 255);
  text-decoration: underline;
  cursor: pointer;
}
.paginationPage:hover{
  color: blue;
}
</style>