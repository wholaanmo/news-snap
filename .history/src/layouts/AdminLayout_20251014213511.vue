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
  .admin-layout {
    min-height: 100vh;
  }
  
  .layout-body {
    display: flex;
    min-height: calc(100vh - 60px);
    margin-top: 30px; /* Account for navbar height */
  }
  
  .admin-content {
    flex: 1 1 0;
    margin-left: calc(1.5rem + 32px);
    transition: margin-left 0.2s ease-out;
    padding: 2rem;
  }
  
  .admin-content.sidebar-open {
    margin-left: var(--sidebar-width);
  }
  
  @media (max-width: 768px) {
    .admin-content {
      margin-left: 0;
      padding: 1rem;
    }
    
    .admin-content.sidebar-open {
      margin-left: 0;
    }
  }
  </style>
  