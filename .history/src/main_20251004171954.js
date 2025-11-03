import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'



const router = createRouter ({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home

        },
        {
            path: '/about',
            component: () => import ('./views/About.vue')

        },
        {
          path: '/account',
          component: () => import ('./views/account.vue')

        },
        {
          path: '/request',
          component: () => import ('./views/request.vue')

        },
        {
          path: '/offer',
          component: () => import ('./views/offer.vue')

        },
        {
          path: '/user',
          component: () => import ('./views/user.vue')

        },
        {
            path: '/landing',
            name: 'Landing',
            component: () => import('./views/landing.vue'),
            meta: { 
              hideNavbar: true,
              hideSidebar: true 
            }
          },
          {
            path: '/login',
            name: 'Login',
            component: () => import('./views/login.vue'),
            meta: { 
              hideNavbar: true,
              hideSidebar: true 
            }
          },
          {
            path: '/register',
            name: 'Register',
            component: () => import('./views/register.vue'),
            meta: { 
              hideNavbar: true,
              hideSidebar: true 
            }
          },
    ]
})
createApp(App).use(router).mount('#app')
