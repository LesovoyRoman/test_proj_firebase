<template>
    <div class="login">
       <transition name="fade">
            <img src="./../../../src/assets/img/load/icon-load.gif" v-if="performingRequest" alt="" class="performingGif">
        </transition>
        <div  v-if="!performingRequest">
            <h3 class="login_header">Sign In</h3>
            <input type="text" v-model="user.email" placeholder="Email">
            <input type="password" v-model="user.password" placeholder="Password">
            <button v-on:click="login">Connection</button>
            <router-link v-bind:to="'/sign-up'"><p class="registr_tip">You don't have an account? You can create</p></router-link>
            <router-link v-bind:to="'/reset-password'"><p class="registr_tip">Forgot password? You can rescue account</p></router-link>
        </div>
    </div>
</template>

<script>
    let vm = {};
    const fb = require('./../../firebase.config.js')

    export default {
        name: 'Login',
        data(){
            return {
                user: {
                    email: '',
                    password: ''
                },
                performingRequest: false,
            }
        },
        created(){
            vm = this;
        },
        methods: {
            login: function() {
                this.performingRequest = true;

                fb.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
                    .then(user => {
                        this.$store.commit('setCurrentUser', user.user)
                        this.$store.dispatch('fetchUserProfile')
                        this.performingRequest = false;
                        alert('You successfully authenticated')
                        vm.$router.replace('dashboard')
                    }).catch(err => {
                        this.performingRequest = false;
                        alert('Oops, ' + err.message)
                    })
            }
        }
    }
</script>

<style>
    .login {
        font-size: 16px;
    }
    .login_header {
        font-size: 26px;
        color: #0000006e;
        font-family: monospace;
    }
    .login input {
        display: block;
        margin: 10px auto;
        border: none;
        font-size: 16px;
        outline: none;
        padding: 6px 12px;
    }
    .login button {
        display: block;
        margin: 5px auto;
        border: none;
        background: #41B883;
        color: white;
        padding: 6px 12px;
        cursor: pointer;
        font-size: 16px;
    }
    .login button:hover {
        background: #389e70;
    }
    .registr_tip {
        font-size: 12px;
        margin-top: 25px;
        display: block;
        color: #2c3e5069;
    }
</style>