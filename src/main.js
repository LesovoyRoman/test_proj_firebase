// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import bootstrapVue from 'bootstrap-vue'
import router from './router'
import { store } from './store.js'
import firebase from 'firebase'
const fb = require('./firebase.config.js')
import './assets/styles/scss/app.scss'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(bootstrapVue);

Vue.config.productionTip = false

// Initialize Firebase
let app;

fb.auth.onAuthStateChanged(user => {
    if (!app) {
       app = new Vue({
           el: '#app',
           router,
           store,
           render: h => h(App)
       })
    }
})
/* eslint-disable no-new */


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const notAuthenticated = to.matched.some(record => record.meta.notAuthenticated);
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
        next('/login')
    } else if (notAuthenticated && currentUser) {
        next('/home')
    } else {
        next()
    }
})