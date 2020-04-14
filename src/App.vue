<template>
  <div id="app">
    <NavBar/>
    
    <router-view class="bg-light" style="margin-top: 4rem"></router-view>
    
  </div>
</template>

<script>
import NavBar from '../src/components/NavBar';
export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
</style>
