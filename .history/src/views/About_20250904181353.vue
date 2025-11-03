<template>
    <div class="app">
      <Navbar :toggle-sidebar="toggleSidebar" />
      <Sidebar :isOpen="sidebarOpen" @toggle="sidebarOpen = $event" />
      <main class="home-page" :class="{'sidebar-open': sidebarOpen}">
        <h1>Home</h1>
        <p>This is the about</p>
      </main>
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/Sidebar.vue'
  import Navbar from '../components/Navbar.vue'
  
  export default {
    name: 'HomePage',
    components: {
      Sidebar,
      Navbar
    },
    data() {
      return {
        sidebarOpen: false
      }
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen
      }
    }
  }
  </script>
  
  <style>
  .home-page {
    margin-left: calc(3.5rem + 32px);
    margin-top: 60px;
    padding: 2rem;
    transition: margin-left 0.2s ease-out;
  }
  
  .home-page.sidebar-open {
    margin-left: var(--sidebar-width);
  }
  
  /* Adjust for mobile */
  @media (max-width: 768px) {
    .home-page {
      margin-left: 0;
      padding: 1rem;
    }
    
    .home-page.sidebar-open {
      margin-left: 0;
    }
  }
  </style>