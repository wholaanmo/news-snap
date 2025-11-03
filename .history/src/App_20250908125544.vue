<template>
  <div class="app">
    <Navbar :toggle-sidebar="toggleSidebar" />
    <Sidebar v-if="showSidebar" :isOpen="sidebarOpen" @toggle="sidebarOpen = $event" />
    <main :class="sidebarOpen && showSidebar && 'sidebar-open'">
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

const sidebarOpen = ref(false)
const route = useRoute()

// Hide Navbar on specific routes
const showNavbar = computed(() => {
  return route.path !== '/landing' && route.path !== '/login'
})

// Hide Sidebar on specific routes
const showSidebar = computed(() => {
  return route.path !== '/landing' && route.path !== '/login'
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<style lang="css">
:root {
  --primary: #1a2530;
  --grey: #728a9c;
  --dark: #0F0E0E;
  --dark-alt: #37353E;
  --light: #EEEEEE;
  --sidebar-width: 230px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;
  min-height: 100vh;
}

.app main {
  flex: 1 1 0;
  margin-left: calc(3.5rem + 32px);
  margin-top: 60px; /* Account for navbar height */
  transition: margin-left 0.2s ease-out;
}

.app main.sidebar-open {
  margin-left: var(--sidebar-width);
}

/* Adjust main content when sidebar is hidden */
.app main:not(.sidebar-open) {
  margin-left: 0;
}

@media (max-width: 768px) {
  .app main {
    margin-left: 0;
    margin-top: 60px; /* Ensure content starts below navbar */
  }
  
  .app main.sidebar-open {
    margin-left: 0;
  }
}
</style>