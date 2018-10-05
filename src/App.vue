<template>
  <div id="app">
    <div class="container">
      <img src="./assets/logo.png">
      <nav-custom></nav-custom>
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import NavCustom from './components/partials/Navigation.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
      NavCustom
  },
  computed: {
      ...mapState(['currentUser'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  img.performingGif {
    display: block;
    margin: 15px auto;
    width: 50px;
  }

  a {
    text-decoration: none !important;
  }
  a:hover {

  }
  .nav a {
    font-size: 16px;
    margin-top: 25px;
    color: #41B883;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: bold;
    padding: 6px 12px;
    margin-bottom: 10px;
    display: inline-block;
  }
  .nav a.router-link-active {
    color: #0e8651;
    background-color: #0000001a;
  }

button {
  display: block;
  margin: 5px auto;
  border: none;
  background: #41B883;
  color: white;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background: #389e70;
}
</style>
