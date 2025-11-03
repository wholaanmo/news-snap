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
  .user-layout {
    min-height: 100vh;
  }
  
  .layout-body {
    display: flex;
    min-height: calc(100vh - 60px);
    margin-top: 30px; /* Account for navbar height */
  }
  
  .user-content {
    flex: 1 1 0;
    margin-left: calc(3.5rem + 32px);
    transition: margin-left 0.2s ease-out;
    padding: 2rem;
  }
  
  .user-content.sidebar-open {
    margin-left: var(--sidebar-width);
  }
  
  @media (max-width: 768px) {
    .user-content {
      margin-left: 0;
      padding: 1rem;
    }
    
    .user-content.sidebar-open {
      margin-left: 0;
    }
  }
  </style>
  