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
  --primary: #000000;
  --grey: #810000;
  --dark: #0F0E0E;
  --dark-alt: #37353E;
  --light: #EEEBDD;
  --sidebar-width: 230px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #1B1717 #f0f0f0; 
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
  min-height: 100vh;
}
</style>