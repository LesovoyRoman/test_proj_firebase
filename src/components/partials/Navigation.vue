<template>
    <div class="nav">
        <transition name="fade">
            <div v-if="currentUser !== null">
                <router-link v-bind:to="'/home'">Home</router-link>
                <router-link v-bind:to="'/dashboard'">Dashboard</router-link>
                <router-link v-bind:to="'/posts'">Posts</router-link>
                <button class="logout" @click="logout">logout</button>
            </div>
            <div v-if="currentUser == null">
                <router-link v-bind:to="'/home'">Home</router-link>
                <router-link v-bind:to="'/login'">Login</router-link>
                <router-link v-bind:to="'/sign-up'">Registration</router-link>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    let vm = {};
    const fb = require('./../../firebase.config.js')

    export default {
        name: 'Navigation',
        data(){
            return {
                user: {
                    auth: {}
                }
            }
        },
        computed: {
            ...mapState(['currentUser'])
        },
        methods: {
            logout(){
                fb.auth.signOut()
                    .then(user => {
                            alert('You have successfully logged out');
                            this.$store.dispatch('clearData');
                            vm.$router.replace('/login')
                        }).catch(err => {
                            alert('Oops, ' + err.message);
                        })
            },
        },
        created(){
            vm = this;
        },
    }
</script>

<style>
    .nav div {
        display: block;
        margin: 10px auto;
    }
</style>