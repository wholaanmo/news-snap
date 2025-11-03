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

<style>
   :root {
      --primary: #4CAF50;
      --secondary: #2196F3;
      --accent: #FF9800;
      --light: #FFFFFF;
      --grey: #2C3E50;
      --dark: #1A252F;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #f5f7fa;
      color: #333;
      line-height: 1.6;
    }
    
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
      gap: 25rem; 
      margin-left: 1.5rem;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      margin-right: 7rem;
    }
      
    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo-img {
      width: 52px;
      height: 52px;
      object-fit: contain;
      margin-left: 0.3rem;
    }
      
    .logo-text1 {
      font-weight: bold;
      font-size: 1.5rem;
      color: var(--light);
    }
      
    .logo-text {
      font-weight: bold;
      font-size: 1.5rem;
      color: var(--primary);
    }
      
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
      
    .nav-link {
      color: var(--light);
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0;
      position: relative;
      transition: all 0.3s ease;
    }
      
    .nav-link:hover {
      color: var(--primary);
    }
      
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--primary);
      transition: width 0.3s ease;
    }
      
    .nav-link:hover::after {
      width: 100%;
    }
      
    .login-btn {
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 0.6rem 1.5rem;
      border-radius: 30px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
      
    .login-btn:hover {
      background-color: #3d8b40;
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }
    
    /* Mobile Menu Button (Hamburger) */
    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      justify-content: space-around;
      width: 30px;
      height: 25px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      margin-left: 15px;
    }
    
    .mobile-menu-btn span {
      width: 100%;
      height: 3px;
      background-color: var(--light);
      border-radius: 5px;
      transition: all 0.3s ease;
    }
    
    /* Sidebar Styles */
    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 99;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .sidebar-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    
    .sidebar {
      position: fixed;
      top: 0;
      left: -300px;
      width: 300px;
      height: 100%;
      background-color: var(--grey);
      z-index: 100;
      transition: left 0.3s ease;
      overflow-y: auto;
    }
    
    .sidebar.active {
      left: 0;
    }
    
    .sidebar-header {
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .sidebar-links {
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }
    
    .sidebar-link {
      color: var(--light);
      text-decoration: none;
      padding: 1rem 0;
      font-weight: 500;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: color 0.3s ease;
    }
    
    .sidebar-link:hover {
      color: var(--primary);
    }</style>
