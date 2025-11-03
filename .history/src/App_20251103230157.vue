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
  --grey: #810000;
  --dark: #0F0E0E;
  --dark-alt: #37353E;
  --light: #EEEEEE;
  --sidebar-width: 230px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: thin;
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
  min-height: 100vh;
}
</style>