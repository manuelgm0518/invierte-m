<template>
    <div>
        <h1>Empresas</h1>
        <div class="businessContainer">
            <div class="business" v-for="(bus, i) in business" v-bind:key="i">
                <div class="businessName">
                    {{ bus.name }}
                </div>
                <div class="businessImage">
                    <p>Falta agregar las imágenes</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'BusinessCatalog',
    data(){
        return {
            count:0,
            show:10,
            actual: 1,
            business:[]
        }
    },
    created(){
        axios.get('http://localhost:3000/api/business/count')
        .then(res => {
            this.count = res.data.count;
        });
        this.getBusiness();
    },
    methods:{
        getBusiness(){
            let interval = {
                min:0,
                max:10
            }
            axios.get('http://localhost:3000/api/business', interval)
            .then(res => {
                this.business = res.data;
            });
        }
    }
}
</script>

<style scoped>
.business{
    box-sizing: border-box;
    float: left;
    border-radius: 3px;
    width: 20%;
    padding: 5px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
}
.businessContainer{
    margin: 10px;
}
.businessImage img{
    height: 100px;
}
</style>