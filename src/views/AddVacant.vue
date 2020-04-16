<template>
    <div>
        <!-- <h2 style="padding-left: 20px;">{{this.$route.params.id}}</h2> -->
        <form style="padding-left: 20px;" v-on:submit.prevent="addVacant">
            <label>Nombre del puesto</label><br><input type="text" v-model="vacant.name"><br>
            <label>Descripción</label><br><textarea v-model="vacant.description"></textarea><br>
            <label>Sueldo mensual</label><br><input type="text" v-model="vacant.monthlyPayment"><br>
            <button type="submit">Agregar vacante</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'AddVacant',
    data(){
        return {
            vacant:{
                business:this.$route.params.id,
                name:'',
                description:'',
                monthlyPayment:''
            }
        }
    },
    methods:{
        addVacant(){
            if(!this.vacant.name || !this.vacant.description || !this.vacant.monthlyPayment){
                alert('Llene todos los campos.'); //Se podría hacer más bonito
            }
            else if(isNaN(this.vacant.monthlyPayment)){
                alert('Agregar un sueldo mensual válido.'); //Se podría hacer más bonito
            }
            else{
                axios.post('http://localhost:3000/api/vacant', this.vacant)
                .then(res => {
                    if(res.status == 200){
                        alert('Vacante agregada con exito'); //Se podría hacer más bonito
                        this.$router.push('/vacant');
                    }
                });
            }
        }
    }
}
</script>