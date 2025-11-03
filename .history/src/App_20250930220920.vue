<template>
  <div class="app">
    <!-- Only show Navbar/Sidebar on authenticated routes, not on landing/auth pages -->
    <div v-if="showAppLayout">
      <Navbar v-if="showNavbar" :toggle-sidebar="toggleSidebar" />
      <Sidebar
        v-if="showSidebar"
        :isOpen="sidebarOpen"
        @toggle="sidebarOpen = $event"
      />
    </div>

    <main :class="showAppLayout && sidebarOpen && showSidebar ? 'sidebar-open' : ''">
      <router-view />
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

// Define which routes should use the app layout (with navbar/sidebar)
const useAppLayoutRoutes = ['/dashboard', '/profile', '/messages'] // Add your main app routes here

// Show app layout only on specific routes
const showAppLayout = computed(() => {
  return useAppLayoutRoutes.includes(route.path)
})

// Hide Navbar on specific routes
const showNavbar = computed(() => {
  return !['/landing', '/login', '/register'].includes(route.path) && showAppLayout.value
})

// Hide Sidebar on specific routes
const showSidebar = computed(() => {
  return !['/landing', '/login', '/register'].includes(route.path) && showAppLayout.value
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

/* Only apply these styles when using app layout */
.app main {
  flex: 1 1 0;
  transition: margin-left 0.2s ease-out;
}

.app .show-app-layout main {
  margin-left: calc(3.5rem + 32px);
  margin-top: 60px;
}

.app .show-app-layout main.sidebar-open {
  margin-left: var(--sidebar-width);
}

/* Adjust main content when sidebar is hidden */
.app .show-app-layout main:not(.sidebar-open) {
  margin-left: 0;
}

@media (max-width: 768px) {
  .app .show-app-layout main {
    margin-left: 0;
    margin-top: 60px;
  }
  
  .app .show-app-layout main.sidebar-open {
    margin-left: 0;
  }
}
</style>