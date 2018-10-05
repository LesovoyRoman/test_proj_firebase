<template>
    <div class="sing_up">
        <transition name="fade">
            <img src="./../../../src/assets/img/load/icon-load.gif" v-if="performingRequest" alt="" class="performingGif">
        </transition>
        <div  v-if="!performingRequest">
            <h3 class="sing_up_header">Sign Up</h3>
            <input type="text" v-model="signUpForm.name" placeholder="Name">
            <input type="text" v-model="signUpForm.title" placeholder="Title">
            <input type="text" v-model="signUpForm.email" placeholder="Email">
            <input type="password" v-model="signUpForm.password" placeholder="Password">
            <button @click="signUp">Sign Up</button>
            <router-link v-bind:to="'/login'"><p class="registr_tip">Do you have an account? Sign in</p></router-link>
        </div>
    </div>
</template>

<script>
    //import firebase from 'firebase'
    const fb = require('./../../firebase.config.js')
    let vm = {};

    export default {
        name: 'Login',
        data(){
            return {
                signUpForm: {
                    name: '',
                    title: '',
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
            signUp() {
                this.performingRequest = true;

                fb.auth.createUserWithEmailAndPassword(this.signUpForm.email, this.signUpForm.password)
                    .then(user => {
                        this.$store.commit('setCurrentUser', user.user)

                        fb.usersCollection.doc(user.user.uid).set({
                            name: this.signUpForm.name,
                            title: this.signUpForm.title
                        }).then(() => {
                            this.performingRequest = false;
                            this.$store.dispatch('fetchUserProfile')
                            alert('Your account has been created!')
                            vm.$router.replace('dashboard')
                        }).catch(err => {
                            this.performingRequest = false;
                            alert('Oops, ' + err.message)
                        })
                    }).catch(err => {
                        this.performingRequest = false;
                        alert('Oops, ' + err.message)
                    })
            }
        }
    }
</script>

<style>
    .sing_up {
        font-size: 16px;
    }
    .sing_up_header {
        font-size: 26px;
        color: #0000006e;
        font-family: monospace;
    }
    .sing_up input {
        display: block;
        margin: 10px auto;
        border: none;
        font-size: 16px;
        outline: none;
        padding: 6px 12px;
    }
    .registr_tip {
        font-size: 12px;
        margin-top: 25px;
        display: block;
        color: #2c3e5069;
    }
</style>