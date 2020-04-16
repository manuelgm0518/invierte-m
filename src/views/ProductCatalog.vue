<template>
  <div>
    <h1  style="padding-left: 10px;">Catálogo de Productos</h1>
    
      <p id="ordenarpor" >Ordenar por <select v-model="order" v-on:change="getPages">
        <option v-bind:value="['name', 1]" selected>Nombre A - Z</option>
        <option v-bind:value="['name', -1]">Nombre Z - A</option>
        <option v-bind:value="['salePrice', -1]">Mayor precio</option>
        <option v-bind:value="['salePrice', 1]">Menor precio</option>
      </select></p>

    <p id="cantpagina">Productos por página <select v-model="show" v-on:change="getPages">
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
      this.count = res.data;
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
      this.pages = [];
      for(var i = this.actual - 4 > 1?this.actual - 4:1; i <= (this.actual + 5 <= this.numPages?this.actual + 5:this.numPages); i++)
        this.pages.push(i);
      this.getProducts();
    },
    changePage(page){
      if(page >= 1 && page <= this.numPages && page != this.page){
        this.actual = page;
        this.getPages();
      }
    },
    sendProduct(_id){
      this.$router.push('/product/' + _id);
    }
  }
}
</script>

<style scoped>

#ordenarpor{
  /* color: transparent;
  background: #fbcd18;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  font-size: 20px;
  text-shadow: 0px 3px 3px rgba(255,255,255,0.5); */
  background: #fbcd18;
  border-bottom-right-radius: 20px;
  width: 248px;
  padding:  3px;
}

.productsContainer{
  padding: 10px;
}
.product{
  box-sizing: border-box;
  width: 20%;
  margin-right: 3%;
  margin-bottom: 3%;
  float: left;
  background: #fbcd18;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  cursor: pointer;
}
.product:hover{
  background-color: #ddb514;
  transform: scale(1.03);
}
.productName{
  padding: 5px;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: bold;
  text-align: center;
}
.productPrice{
  padding: 5px;
  font-size: 20px;
  text-align: center;
  color: rgb(0, 0, 0);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.productImage{
  height: 150px;
  overflow: hidden;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  background: rgb(223, 219, 219);
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
h1 {  
  text-align: center;
  font-size: 72px;  
  background: -webkit-linear-gradient(left top, #fb9918, yellow);
  background: linear-gradient(to bottom right, #fb9918, yellow);
  background-clip: text;
  -webkit-text-fill-color: transparent;
} 
#cantpagina{
    background: rgb(204, 200, 200);
    padding: 3px;
    width: 248px;
	border-bottom-right-radius: 20px;
}
</style>