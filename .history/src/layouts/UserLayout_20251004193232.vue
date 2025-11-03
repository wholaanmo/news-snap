<template>
    <div class="user-layout">
      <UserNavbar :toggle-sidebar="toggleSidebar" />
      <div class="layout-body">
        <UserSidebar :isOpen="sidebarOpen" @toggle="sidebarOpen = $event" />
        <main class="user-content" :class="sidebarOpen && 'sidebar-open'">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import UserNavbar from '@/components/Navbar.vue'
  import UserSidebar from '@/components/Sidebar.vue'
  
  const sidebarOpen = ref(false)
  
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }
  </script>
  
  <style scoped>
  </style>
  