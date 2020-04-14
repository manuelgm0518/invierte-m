<template>
    <div>
        <NavBar></NavBar>
        <h1 style="padding-top: 155px; padding-left: 20px;">Iniciar sesión</h1>
        <form style="padding-left: 50px;" v-on:submit.prevent="logIn">
            <label>Correo</label><br>
            <input type="text" v-model="user.email"><br>
            <label>Contraseña</label><br>
            <input type="password" v-model="user.password"><br>
            <button type="submit">Sign in</button>
        </form>
        <p style="padding-left: 50px; padding-top: 10px;">Si aún no tienes una cuenta <router-link to="/LogUp">regístrate</router-link></p>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios';

export default {
    name:'LogIn',
    components:{
        NavBar
    },
    data(){
        return {
            user:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        logIn(){
            let logUser = {
                email:this.user.email,
                password:this.user.password
            }
            axios.post('http://localhost:3000/api/user/login', logUser)
            .then(res => {
                if(res.status == 200){
                    if(res.data.error == 'User does not exist'){ //Falta ponerlo de una manera más bonita
                        alert('Usuario o contraseña incorrecto');
                    }
                    else{
                       localStorage.setItem('token', res.data);
                       const path = '/'; if (this.$route.path !== path) this.$router.push(path);
                    }
                }
            });
        }
    }
}
</script>