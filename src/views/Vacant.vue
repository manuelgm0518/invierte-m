<template>
    <div class="vacantV">
        <img class="businessImageV" v-bind:src="businessImage">
        <div class="vacantInformationV">
            <h2 class="vacantNameV">{{ vacant.name }}</h2>
            <p class="vacantMonthlyPaymentV"> $ {{ vacant.monthlyPayment }} Mensuales </p>
            <p class="vacantDescriptionV"> {{ vacant.description }} </p>
            <p class="businessNameV">Empresa: {{ business.name }}</p>
            <p class="businessLocationV">Localización: {{ business.location }}</p>
            <button v-on:click="showRequest">Realizar una solicitud</button>
            <div class="vacantRequest" v-if="request">
                <form v-on:submit.prevent="sendResume">
                    <label for="resume">Sube tu curriculum, la empresa pronto se comunicará contigo, de preferencia un PDF</label><br>
                    <input type="file" id="file" ref="file"><br>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            vacant:{},
            business:{},
            businessImage:'',
            request: false,
            file:''
        }
    },
    created(){
        /*new Promise(()=>{
            setTimeout(()=>{
                
            })
        });*/
        axios.get('http://localhost:3000/api/vacant/' + this.$route.params.id)
        .then(res => {
            this.vacant = res.data;
            this.business = res.data.business;
            if(this.business.imagesURL.length > 0)
                this.businessImage = this.business.imagesURL[0];
        });
    },
    methods:{
        getBusinessImage(){
            return 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Wikimania_hackathon_2.JPG';
        },
        showRequest(){
            if(!this.$store.state.user.id){
                alert('Debe iniciar sesión para poder agregar el producto al carrito'); //Podría ser más bonito
            }
            else{
                this.request = true;
            }
        },
        sendResume(){
            this.file = this.$refs.file.files[0];
            let formData = new FormData();
            formData.append('file', this.file);
            axios.post('http://localhost:3000/api/vacant/file/' + this.$store.state.user.id + '$' + this.$route.params.id, formData, { headers: {'Content-Type': 'multipart/form-data'}});
            alert('Archivo subido correctamente'); //Podría ser más bonito
        }
    }
}
</script>

<style>
.businessImageV{
    width: 30%;
}
</style>