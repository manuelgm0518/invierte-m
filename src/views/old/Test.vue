<template>
    <dir>
        <button type="button" @click="logOut">Cerrar sesión</button>
    </dir>
</template>

<script>
import axios from 'axios';

export default {
    name:'Test',
    created(){
        if(localStorage.getItem('token') == null){
            this.$router.push('/LogIn');
        }
    },
    methods:{
        logOut(){
            localStorage.clear();
            this.$router.push('/LogIn');
        }
    },
    mounted(){
        axios.get('http://localhost:3000/api/user', { headers: { token: localStorage.getItem('token') }})
        .then(res => {
            console.log(res.data);
        });
    }
}
</script>