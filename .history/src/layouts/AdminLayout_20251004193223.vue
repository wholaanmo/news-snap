<template>
    <div class="admin-layout">
      <AdminNavbar :toggle-sidebar="toggleSidebar" />
      <div class="layout-body">
        <AdminSidebar :isOpen="sidebarOpen" @toggle="sidebarOpen = $event" />
        <main class="admin-content" :class="sidebarOpen && 'sidebar-open'">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import AdminNavbar from '@/components/AdminNavbar.vue'
  import AdminSidebar from '@/components/AdminSidebar.vue'
  
  const sidebarOpen = ref(false)
  
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }
  </script>
  
  <style scoped>
  </style>
  