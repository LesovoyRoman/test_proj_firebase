import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import SignUp from '@/components/auth/SignUp'
import ResetPass from '@/components/auth/ResetPass'

import Dashboard from '@/components/Dashboard'
import Settings from '@/components/account/Settings'
import Posts from '@/components/Posts'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: {
          requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
          notAuthenticated: true
      }
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp,
        meta: {
            notAuthenticated: true
        }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPass,
      meta: {
          notAuthenticated: true
      }
    }
  ],
})

export default router
