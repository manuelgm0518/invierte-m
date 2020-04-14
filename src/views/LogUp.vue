<template>
    <div>
        <NavBar></NavBar>
        <h1 style="padding-top: 155px; padding-left: 20px;">Regístrate</h1>
        <form style="padding-left: 50px;" v-on:submit.prevent="addUser">
            <label>Nombres</label><br><input type="text" required v-model="user.firstName"><br>
            <label>Apellidos</label><br><input type="text" required v-model="user.lastName"><br>
            <label>Correo electrónico</label><br><input type="email" required v-model="user.email"><br>
            <label>Contraseña</label><br><input type="password" required v-model="user.password"><br>
            <label>Vuelve a escribir la contraseña</label><br><input type="password" required v-model="verPass"><br>
            <button type="submit">Regístrate</button>
        </form>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';

export default {
    name:'LogUp',
    components: {
        NavBar
    },
    data(){
        return {
            user:{
                firstName:'',
                lastName:'',
                email:'',
                password:''
            },
            verPass:''
        }
    },
    methods:{
        addUser(){
            if(this.user.password.length <= 8){
                alert('La contraseña debe de contener más de 8 carácteres'); //Falta ponerlo de una manera más bonita
            }
            else if(this.user.password != this.verPass){
                alert('Las contraseñas no coinciden'); //Falta ponerlo de una manera más bonita
            }
            else{
                let newUser = {
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                    password: this.user.password
                }
                axios.post('http://localhost:3000/api/user', newUser)
                .then(res => {
                    if(res.status == 200){
                        if(res.data.error == 'User already exists'){
                            alert('El usurio ya existe'); //Falta ponerlo de una manera más bonita
                        }
                        else{
                            this.user.lastName = this.user.firstName = this.user.email = this.user.password = this.verPass = '';
                            const path = '/logIn'; if (this.$route.path !== path) this.$router.push(path);
                        }
                    }
                });
            }
        }
    }
}
</script>