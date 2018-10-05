<template>
    <div class="resetPass">
        <transition name="fade">
            <img src="./../../../src/assets/img/load/icon-load.gif" v-if="performingRequest" alt="" class="performingGif">
        </transition>
        <div  v-if="!performingRequest">
            <h3 class="resetPass_header">Reset Password</h3>
            <input type="text" v-model="resetPass.email" placeholder="Email">
            <button @click="resetPassword">Reset</button>
        </div>
    </div>
</template>

<script>
    let vm = {};
    const fb = require('./../../firebase.config.js')

    export default {
        name: 'ResetPass',
        data(){
            return {
                resetPass: {
                    email: '',
                },
                performingRequest: false,
                passwordResetSuccess: false,
            }
        },
        created(){
            vm = this;
        },
        methods: {
            resetPassword(){
                this.performingRequest = true;

                fb.auth.sendPasswordResetEmail(this.resetPass.email).then(() => {
                    this.performingRequest = false;
                    this.passwordResetSuccess = true;
                    this.resetPass.email = ''
                }).catch(err => {
                    alert('Oops, ' + err);
                    this.performingRequest = false;
                })
            }
        }
    }
</script>

<style>
    .resetPass {
        font-size: 16px;
    }
    .resetPass_header {
        font-size: 26px;
        color: #0000006e;
        font-family: monospace;
    }
    .resetPass input {
        display: block;
        margin: 10px auto;
        border: none;
        font-size: 16px;
        outline: none;
        padding: 6px 12px;
    }
    .resetPass button {
        display: block;
        margin: 5px auto;
        border: none;
        background: #41B883;
        color: white;
        padding: 6px 12px;
        cursor: pointer;
        font-size: 16px;
    }
    .resetPass button:hover {
        background: #389e70;
    }
</style>