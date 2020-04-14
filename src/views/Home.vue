<template>
  <div class="home">
    <NavBar></NavBar>
    <div class="vh-100 bg-light"></div>
    <div class="vh-100 bg-light"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'Home',
  components: {
    NavBar
  }
}
</script>
