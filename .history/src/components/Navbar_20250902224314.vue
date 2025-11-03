<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-left">
        <div class="logo-container">
          <img src="../assets/CommuniTrade.png" alt="CommuniTrade Logo" class="logo-img">
          <p class="logo-text">Communi<span class="logo-text">Trade</span></p>
        </div>
      </div>
      
      <div class="navbar-right">
        <button class="hamburger-btn" @click="toggleSidebar">
          <span class="material-icons">menu</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  toggleSidebar: Function
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: var(--grey);
  color: var(--light);
  z-index: 98;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1rem;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.logo-text {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--light);
}

.hamburger-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  color: var(--light);
}

.hamburger-btn:hover {
  color: var(--primary);
  transform: rotate(180deg);
}

/* Remove the media query that hides the logo text */
/* @media (max-width: 768px) {
  .logo-text {
    display: none;
  }
} */

/* Instead, adjust font size for very small screens */
@media (max-width: 480px) {
  .logo-text {
    font-size: 1rem;
  }
  
  .logo-img {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 360px) {
  .logo-text {
    font-size: 0.9rem;
  }
}
</style>