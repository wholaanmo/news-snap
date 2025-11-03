<template>
    <div class="admin-layout">
      <AdminNavbar />
      <div class="layout-body">
        <AdminSidebar />
        <main class="content">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import AdminNavbar from '@/components/AdminNavbar.vue'
  import AdminSidebar from '@/components/AdminSidebar.vue'
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
  