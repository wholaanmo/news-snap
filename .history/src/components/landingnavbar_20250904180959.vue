<template>
      <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-left">
        <div class="logo-container">
          <img src="../assets/CommuniTrade.png" alt="CommuniTrade Logo" class="logo-img">
          <p class="logo-text">Communi<span class="logo-text1">Trade</span></p>
        </div>
        
        <div class="nav-links">
          <a href="#home" class="nav-link">Home</a>
          <a href="#services" class="nav-link">Services</a>
          <a href="#guide" class="nav-link">Guide</a>
          <a href="#footer" class="nav-link">Contact Us</a>
        </div>
      </div>
      
      <div class="navbar-right">
        <button class="login-btn">Login</button>
        <button class="mobile-menu-btn" @click="toggleSidebar">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Sidebar for mobile -->
  <div class="sidebar-overlay" :class="{ active: sidebarOpen }" @click="closeSidebar"></div>
  <div class="sidebar" :class="{ active: sidebarOpen }">
    <div class="sidebar-header">
      <div class="logo-container">
        <img src="../assets/CommuniTrade.png" alt="CommuniTrade Logo" class="logo-img">
        <p class="logo-text">Communi<span class="logo-text1">Trade</span></p>
      </div>
    </div>
    <div class="sidebar-links">
      <a href="#home" class="sidebar-link" @click="closeSidebar">Home</a>
      <a href="#services" class="sidebar-link" @click="closeSidebar">Services</a>
      <a href="#guide" class="sidebar-link" @click="closeSidebar">Guide</a>
      <a href="#footer" class="sidebar-link" @click="closeSidebar">Contact Us</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    }
  },
  mounted() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Login button functionality
    document.querySelector('.login-btn').addEventListener('click', function() {
      alert('Login functionality would open here!');
      // In a real application, this would open a login modal or redirect to a login page
    });
  }
};
</script>
