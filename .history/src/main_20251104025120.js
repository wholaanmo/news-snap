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
    }
  ]
})

createApp(App).use(router).mount('#app')
