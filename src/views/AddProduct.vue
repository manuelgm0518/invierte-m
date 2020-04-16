<template>
    <div>
        <!-- <h2 style="padding-left: 20px;">{{this.$route.params.id}}</h2> -->
        <form style="padding-left: 20px;" v-on:submit.prevent="addProduct">
            <label>Nombre</label><br><input type="text" v-model="product.name"><br>
            <label>Precio de venta en MXN</label><br><input type="text" v-model="product.salePrice"><br>
            <label>Imagen</label><br><input type="file" id="file" ref="file"><br>
            <label>Descripción</label><br><textarea v-model="product.description"></textarea><br>
            <button type="submit">Agregar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'AddProduct',
    data(){
        return {
            product:{
                business:this.$route.params.id,
                name:'',
                salePrice:'',
                description:''
            },
            file:''
        }
    },
    methods:{
        addProduct(){
            this.file = this.$refs.file.files[0];
            if(!this.product.name || !this.product.salePrice || !this.product.description || !this.file){
                alert('Llene todos los campos.'); //Se podría hacer más bonito
            }
            else if(isNaN(this.product.salePrice)){
                alert('Agregue un precio válido.'); //Se podría hacer más bonito
            }
            else{
                axios.post('http://localhost:3000/api/product', this.product)
                .then(res => {
                    if(res.status == 200){
                        let formData = new FormData();
                        formData.append('file', this.file);
                        axios.post('http://localhost:3000/api/product/file/' + res.data._id, formData, { headers: {'Content-Type': 'multipart/form-data'}})
                        .then(res => {
                            if(res.status == 200){
                                alert('Agregado con exito.'); //Se podría hacer más bonito
                                this.$router.push('/product'); //Cambiar la ruta
                            }
                        });
                    }
                });
            }
        }
    }
}
</script>