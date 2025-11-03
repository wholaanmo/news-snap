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
  --grey: #.cta-button.primary {
  background: linear-gradient(135deg, #5a0000, #b30000);
  color: #EEEEEE;
  padding: 0.8rem 1.6rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(18, 23, 49, 0.25);
  text-decoration: none; /* removes underline */
  display: inline-block;
}

.cta-button.primary:hover {
  background: linear-gradient(135deg, #b30000, #ff4d4d); /* brighter red gradient on hover */
  color: #EEEEEE;
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(90, 0, 0, 0.4);
}
;
  --dark: #0F0E0E;
  --dark-alt: #37353E;
  --light: #e4e3df;
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