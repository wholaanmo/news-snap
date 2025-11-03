<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
// No need for layout logic here anymore - it's handled by individual layouts
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
  scrollbar-width: thin;             /* makes it thin */
  scrollbar-color: #728a9c #f0f0f0; 
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