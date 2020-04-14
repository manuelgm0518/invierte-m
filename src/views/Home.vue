<template>
  <div class="home">
    <NavBar></NavBar>
    <h1 style="padding-top: 200px; padding-left: 200px;">Home</h1>
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
