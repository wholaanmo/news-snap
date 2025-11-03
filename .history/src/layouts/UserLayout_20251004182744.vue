<template>
    <div class="user-layout">
      <UserNavbar />
      <div class="layout-body">
        <UserSidebar />
        <main class="content">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import UserNavbar from '@/components/UserNavbar.vue'
  import UserSidebar from '@/components/UserSidebar.vue'
  </script>
  
  <style scoped>
  .layout-body {
    display: flex;
  }
  .content {
    flex: 1;
    padding: 1rem;
  }
  </style>
  