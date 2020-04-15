<template>
  <div>
    <h1 style="padding-left: 10px;">Catálogos de negocios</h1>
    
    <p style="padding-left: 10px;">Ordenar por <select v-model="order" v-on:change="getPages">
        <option v-bind:value="['name', 1]" selected>Nombre A - Z</option>
        <option v-bind:value="['name', -1]">Nombre Z - A</option>
        <option v-bind:value="['registrationDate', 1]">Registro más reciente</option>
        <option v-bind:value="['registrationDate', -1]">Registro más antiguo</option>
    </select></p>

    <p style="padding-left: 10px;">Negocios por página <select v-model="show" v-on:change="getPages">
            <option value="30" selected>30</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select></p>

    <div class="businessContainer">
        <div class="business" v-for="(bus, i) in business" v-bind:key="i" v-on:click="sendBusiness(bus._id)">
            <div class="businessName">
                {{ bus.name }}
            </div>
            <div class="businessImage">
                <img v-bind:src="getImage(bus.imagesURL)">
            </div>
        </div>
    </div>

    <ul>
        <li><div class="pagination" v-on:click="changePage(actual - 1)">Anterior</div></li>
        <li v-for="(page, i) in pages" v-bind:key="i">
            <div class="pagination" v-on:click="changePage(page)" v-if="page != actual">{{page}}</div>
            <div class="paginationActual" v-on:click="changePage(page)" v-if="page == actual">{{page}}</div>
        </li>
        <li><div class="pagination" v-on:click="changePage(actual + 1)">Siguiente</div></li>
    </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'BusinessCatalog',
    data(){
        return {
            business:[],
            count:0,
            show:30,
            actual: 1,
            pages:[],
            numPages:0,
            order:['name', 1]
        }
    },
    created(){
        axios.get('http://localhost:3000/api/business/count')
        .then(res => {
            this.count = res.data.count;
            this.getPages();
        });
    },
    methods:{
        getBusiness(){
            let interval = {
                min: (this.actual - 1) * this.show,
                max: (this.actual) * this.show,
                order: this.order
            }
            axios.post('http://localhost:3000/api/business/interval', interval)
            .then(res => {
                this.business = res.data;
            });
        },
        getImage(img){
            if(img.length < 1){
                return undefined;
            }
            else{
                return img[0];
            }
        },
        getPages(){
            this.numPages = parseInt((this.count - 1) / this.show) + 1;
            this.pages = [];
            for(var i = this.actual - 4 > 1?this.actual - 4:1; i <= (this.actual + 5 <= this.numPages?this.actual + 5:this.numPages); i++)
                this.pages.push(i);
            this.getBusiness();
        },
        changePage(page){
            if(page > 1 && page <= this.numPages && page != this.page){
                this.actual = page;
                this.getPages();
            }
        },
        sendBusiness(_id){
            alert(_id);
        }
    }
}
</script>

<style>
.business{
    box-sizing: border-box;
    float: left;
    border-radius: 3px;
    width: 20%;
    height: 150px;
    padding: 5px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    cursor: pointer;
}
.business:hover{
    background-color: rgb(233, 233, 233);
}
.businessContainer{
    margin: 10px;
}
.businessImage img{
    height: 100px;
}
ul{
    list-style: none;
    clear: both;
}
ul li{
    float: left;
}
ul li .paginationActual{
    color: black;
    padding: 5px;
}
ul li .pagination{
    color: rgb(104, 104, 255);
    padding: 5px;
    text-decoration: underline;
    cursor: pointer;
}
ul li .pagination:hover{
    color: blue;
}
</style>