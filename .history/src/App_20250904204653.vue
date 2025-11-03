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

// Compute whether to show sidebar based on current route
const showSidebar = computed(() => {
  // Add routes where you want the sidebar to appear
  return route.path !== '/landing' // Hide sidebar on landing page
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<style lang="css">
:root {
  --primary: #121731;
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