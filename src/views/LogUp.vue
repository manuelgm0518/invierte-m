<template>
    <div>
        <NavBar></NavBar>
        <h1 style="padding-top: 155px; padding-left: 20px;">Regístrate</h1>
        <form style="padding-left: 50px;" v-on:submit.prevent="addUser">
            <label>Nombres</label><br><input type="text" required v-model="user.firstName"><br>
            <label>Apellidos</label><br><input type="text" required v-model="user.lastName"><br>
            <label>Correo electrónico</label><br><input type="email" required v-model="user.email"><br>
            <label>Constraseña</label><br><input type="password" required v-model="user.password"><br>
            <label>Vuelve a escribir la contraseña</label><br><input type="password" required v-model="verPass"><br>
            <button type="submit">Regístrate</button>
        </form>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

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
                alert('La contraseña debe de contener más de 8 carácteres');
            }
            else if(this.user.password != this.verPass){
                alert('Las contraseñas no coinciden'); //Falta ponerlo de una manera más bonita
            }
            else{
                console.log(JSON.stringify(this.user));
                fetch('http://localhost:3000/api/user', {
                    method: 'POST',
                    body: JSON.stringify(this.user),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    //this.user.name = this.user.email = this.user.password = this.verPass = '';
                    alert('En mantenimiento');
                });
            }
        }
    }
}
</script>