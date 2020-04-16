<template>
  <div id="app" class="bg-light">
    <NavBar/>
    <transition name="fade">
      <router-view style="padding-top: 4rem; min-height: 100vh"/>
    </transition>
    <Footer/>
  </div>
</template>

<script>
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';
export default {
  components: {
    NavBar,
    Footer
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
    transition: opacity .33s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}
</style>
