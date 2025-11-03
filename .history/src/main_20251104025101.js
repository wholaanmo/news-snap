import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Import layouts
import AdminLayout from '@/layouts/AdminLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // User routes with UserLayout
    {
      path: '/',
      component: UserLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home.vue')
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/About.vue')
        },
        {
          path: 'account',
          name: 'Account',
          component: () => import('@/views/account.vue')
        },
        {
          path: 'request',
          name: 'Request',
          component: () => import('@/views/request.vue')
        },
        {
          path: 'message',
          name: 'Message',
          component: () => import('@/views/message.vue')
        },
        {
          path: 'offer',
          name: 'Offer',
          component: () => import('@/views/offer.vue')
        }
      ]
    },
    
    // Admin routes with AdminLayout
    {
      path: '/admin',
      component: AdminLayout,
      children: [
      ]
    },
    
    // Auth routes (no layout)
    {
      path: '/landing',
      name: 'Landing',
      component: () => import('@/views/landing.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register.vue')
    }
  ]
})

createApp(App).use(router).mount('#app')
