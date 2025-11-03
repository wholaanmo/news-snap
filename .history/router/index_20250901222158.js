import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'About',
    component: Home
  }
  // Add other routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router