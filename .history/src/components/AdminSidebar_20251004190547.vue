<template>
    <aside :class="is_expanded && 'is_expanded'">
      <div class="menu">
        <router-link class="button" to="/users">
          <span class="material-icons">dashboard</span>
          <span class="text">Dashboard</span>
        </router-link>
        <router-link class="button" to="/req">
          <span class="material-icons">assignment</span>
          <span class="text">Requests</span>
        </router-link>
        <router-link class="button" to="/wla">
          <span class="material-icons">front_hand</span>
          <span class="text">Offers</span>
        </router-link>
        <router-link class="button" to="/wla">
          <span class="material-icons">account_circle</span>
          <span class="text">My Account</span>
        </router-link>
      </div>
  
      <div class="menu-bottom">
        <button class="button sign-out" @click="handleSignOut">
          <span class="material-icons">logout</span>
          <span class="text">Sign Out</span>
        </button>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  // Define props to accept external state
  const props = defineProps({
    isOpen: Boolean
  })
  
  const emit = defineEmits(['toggle'])
  
  // Local state for expansion (for the arrow animation)
  const is_expanded = ref(false)
  
  // Watch for changes from parent component
  watch(() => props.isOpen, (newVal) => {
    is_expanded.value = newVal
  })
  
  const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
    emit('toggle', is_expanded.value)
  }
  </script>
  
  <style lang="css" scoped>
  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Inter', sans-serif;
    width: calc(3.5rem + 32px);
    min-height: calc(100vh - 60px); /* Account for navbar height */
    overflow: hidden;
    padding: 1rem;
    background-color: var(--grey);
    color: var(--primary);
    transition: 0.5s ease-out; /* Slower transition */
    position: fixed;
    left: 0;
    top: 60px; /* Position below navbar */
    z-index: 97; /* Lower than navbar */
  }
  
  .menu {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1; /* Take available space */
  }
  
  .menu .button {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 1rem;
    transition: 0.2s ease-out;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
    justify-content: center;
  }
  
  .menu .button .material-icons {
    font-size: 2rem;
    color: var(--light);
    transition: 0.2s ease-out;
    min-width: 2rem;
    text-align: center;
  }
  
  .menu .button .text {
    color: var(--light);
    transition: 0.2s ease-out;
    opacity: 0;
    width: 0;
    overflow: hidden;
  }
  
  .menu .button:hover {
    background-color: var(--light);
  }
  
  .menu .button:hover .material-icons,
  .menu .button:hover .text {
    color: var(--grey);
  }
  
  .menu-bottom {
    justify-content: center; /* Keep centered when expanded */
    width: 100%;
    margin-top: auto; /* Push to bottom */
    padding-top: 1rem;
    border-top: 1px solid var(--primary);
  }
  
  .menu-bottom .sign-out {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 1rem;
    transition: 0.2s ease-out;
    border-radius: 0.5rem;
    width: 100%;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .menu-bottom .sign-out .material-icons {
    font-size: 2rem;
    color: var(--light);
    transition: 0.2s ease-out;
    min-width: 2rem;
    text-align: center;
  }
  
  .menu-bottom .sign-out .text {
    color: var(--light);
    transition: 0.2s ease-out;
    opacity: 0;
    width: 0;
    overflow: hidden;
    font-size: 1.1rem;
  }
  
  .menu-bottom .sign-out:hover {
    background-color: var(--light);
  }
  
  .menu-bottom .sign-out:hover .material-icons,
  .menu-bottom .sign-out:hover .text {
    color: var(--grey);
  }
  
  aside.is_expanded {
    width: var(--sidebar-width);
    align-items: flex-start;
  }
  
  aside.is_expanded .menu {
    align-items: stretch;
  }
  
  aside.is_expanded .menu .button {
    justify-content: flex-start;
  }
  
  aside.is_expanded .menu .button .text {
    opacity: 1;
    width: auto;
    padding-left: 1rem;
  }
  
  aside.is_expanded .menu .button .material-icons {
    margin-right: 0;
  }
  
  aside.is_expanded .menu-bottom .sign-out {
    justify-content: flex-start;
  }
  
  aside.is_expanded .menu-bottom .sign-out .text {
    opacity: 1;
    width: auto;
    padding-left: 1rem;
  }
  
  aside.is_expanded .menu-bottom .sign-out .material-icons {
    margin-right: 0;
    margin-left: 0.4rem;
  }
  
  @media (max-width: 768px) {
    aside {
      position: fixed;
      width: 280px; /* Slightly narrower on mobile */
      top: 60px; /* Position below navbar */
      height: calc(100vh - 60px); /* Full height minus navbar */
      z-index: 97; /* Lower than navbar */
      transform: translateX(-100%); /* Hide off-screen by default */
      transition: transform 0.5s ease-out; /* Slower slide transition */
    }
    
    aside.is_expanded {
      transform: translateX(0); /* Slide in when expanded */
    }
    
    /* Adjust logo text for very small screens */
    .logo-text {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    aside {
      width: 100%; /* Full width on very small screens */
    }
  }
  </style>