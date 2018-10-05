<template>
  <div class="home">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
//import firebase from 'firebase'
const fb = require('./../firebase.config.js')
let vm = {};

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home',
      user: { auth: {}, }
    }
  },
  created(){
    vm = this;
  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
