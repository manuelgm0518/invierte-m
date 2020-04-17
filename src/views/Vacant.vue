<template>
    <div class="vacantV">
        <img class="businessImageV" v-bind:src="businessImage">
        <div>
            <div>
                <h2 class="vacantNameV">{{ vacant.name }}</h2>
                <hr id="line"> 
            </div>
        <div class="vacantInformationV">
            <p class="vacantMonthlyPaymentV fondo" > $ {{ vacant.monthlyPayment }} Mensuales </p>
            <p class="vacantDescriptionV fondo"> {{ vacant.description }} </p>
            <p class="businessNameV fondo">Empresa: {{ business.name }}</p>
            <p class="businessLocationV fondo">Localización: {{ business.location }}</p>
            <center>
            <button v-on:click="showRequest" type="button" class="btn btn-secondary">Realizar una solicitud</button>
            </center>
            <div class="vacantRequest" v-if="request">
                <form v-on:submit.prevent="sendResume">
                    <label for="resume">Sube tu curriculum, la empresa pronto se comunicará contigo, de preferencia un PDF</label><br>
                    <input type="file" id="file" ref="file"><br>
                    <button type="submit">Enviar</button>
                </form>
            </div>
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
        axios.get('http://189.168.127.125/api/vacant/' + this.$route.params.id)
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
            axios.post('http://189.168.127.125/api/vacant/file/' + this.$store.state.user.id + '$' + this.$route.params.id, formData, { headers: {'Content-Type': 'multipart/form-data'}});
            alert('Archivo subido correctamente'); //Podría ser más bonito
        }
    }
}
</script>

<style>
.fondo{
    background: white;
    border-top-right-radius: 15px;
}
#line{
    height: 4px;
    background: #fb9918;   
    width: 700px;
}
.businessImageV{
    margin: 25px 45px 0 25px;
    width: 30%;
    height: 30%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.vacantV{
    display: flex;
}
.vacantNameV{
  font-size: 50px;
  text-align: center;
  background: -webkit-linear-gradient(left top, #fb9918, yellow);
  background: linear-gradient(to bottom right, #fb9918, yellow);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 40px 40px 0px 40px ;
}
.vacantInformationV{
    background: #fbcd18;
    block-size: 310px;
    padding: 30px 30px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
}

</style>