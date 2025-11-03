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
        <button class="login-btn" @click="navigateToLogin">Login</button>
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
  
  <!-- Hero Section -->
  <section id="home" class="hero-section">
    <div class="hero-content">
      <div class="hero-container">
        <h1 class="hero-title">Welcome to <span class="highlight">CommuniTrade</span></h1>
        <p class="hero-subtitle">Your platform for community-based trading and sharing of skills and services without using money. Connect with your neighbors to exchange what you can do, share resources, and build a stronger community together.</p>
        <div class="hero-buttons">
          <a href="#services" class="cta-button primary">Learn More</a>
        </div>
      </div>
    </div>
    <div class="hero-image">
      <div class="image-container">
        <img src="../assets/picture.png" alt="CommuniTrade Illustration" class="hero-img">
        <p class="image-quote">A <span class="design">Money-Free</span> Way <br> to Exchange <span class="design">Skills</span></p>
      </div>
    </div>
  </section>
  
  <!-- Services Section -->
  <section id="services" class="services-section">
    <div class="container2">
      <h2 class="section-title">Our Services</h2>
      <p class="section-subtitle">CommuniTrade offers a variety of services to help you engage with your community</p>
      
      <div class="services-grid">
        <!-- Item Trading Card -->
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="service-icon">
                <i class="fas fa-handshake"></i>
              </div>
              <h3>Skill & Service Exchange</h3>
            </div>
            <div class="flip-card-back">
              <h3>Skill & Service Exchange</h3>
              <p>Easily trade your skills and services with others without using money. Build connections while meeting your needs through fair exchanges.</p>
            </div>
          </div>
        </div>
        
        <!-- Skill Sharing Card -->
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="service-icon">
                <i class="fas fa-file-alt"></i>
              </div>
              <h3>Request Job Posting</h3>
            </div>
            <div class="flip-card-back">
              <h3>Request Job Posting</h3>
              <p>Post requests for the help you need and highlight what you can offer in return, making it simple to connect with the right people.</p>
            </div>
          </div>
        </div>
        
        <!-- Community Events Card -->
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="service-icon">
                <i class="fas fa-tools"></i>
              </div>
              <h3>Skill/Service Listings</h3>
            </div>
            <div class="flip-card-back">
              <h3>Skill/Service Listings</h3>
              <p>Create a personal listing of your skills and services so others can quickly discover and reach out to you for exchanges.</p>
            </div>
          </div>
        </div>
        
        <!-- Local Networking Card -->
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="service-icon">
                <i class="fas fa-comment-dots"></i>
              </div>
              <h3>Direct Messaging</h3>
            </div>
            <div class="flip-card-back">
              <h3>Direct Messaging</h3>
              <p>Use a secure chat system to communicate, discuss details, and confirm agreements before starting an exchange.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

   <!-- Guide Section -->
   <section id="guide" class="guide-section">
      <div class="container">
        <h2 class="section-title1">How It Works</h2>
        <p class="section-subtitle1">Begin your CommuniTrade experience with ease</p>
        
        <div class="steps-container">
          <!-- Left Column (Steps 1-3) -->
          <div class="steps-column">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Sign Up and Create a Profile</h3>
                <p>Start by registering on CommuniTrade. Build your profile by adding your skills, services, and any experience you’d like to share.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>Post What You Need or What You Can Offer</h3>
                <p>Create a Job Posting to request the service you need and offer something in return, or use the Job Seeker Posting to showcase your skills and make them available to others.</p>
              </div>
            </div>
          </div>
          
          <!-- Right Column (Steps 4-6) -->
          <div class="steps-column">
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Browse and Search</h3>
                <p>Use the Search function to explore available skills and services. You can filter by category, location, or keywords to quickly find what matches your needs.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>Connect with Other Members</h3>
                <p>When you find someone offering what you need, view their User Profile to check their skills, and use Direct Messaging to securely communicate and discuss the details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  <!-- CTA Section -->
  <section class="cta-section">
    <div class="container">
      <h2>Ready to Join Your Community?</h2>
      <p>Start trading and building connections today</p>
      <router-link to="/register" class="cta-button large">Sign Up Now</router-link>
    </div>
  </section>
  
  <!-- Footer -->
  <footer id="footer" class="footer">
    <div class="container3">
      <div class="footer-content">
        <div class="footer-section">
          <div class="logo-container3">
            <img src="../assets/CommuniTrade.png" alt="CommuniTrade Logo" class="logo-img3">
            <div class="design1">
            <p class="logo-text3">Communi<span class="logo-text4">Trade</span></p>
          </div>
          </div>
          <p style="margin-left: 1rem;">Building stronger communities through sharing and trading.</p>
        </div>
        
        <div class="footer-section1">
          <h3>Contact Us</h3>
          <p><i class="fas fa-envelope"></i> CommuniTrade@gmail.com</p>
          <p><i class="fas fa-phone"></i> 0912-345-6789</p>
        </div>
        
        <div class="footer-section2">
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2025 CommuniTrade. All rights reserved.</p>
      </div>
    </div>
  </footer>
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
    },
    navigateToLogin() {
      // Navigate to login page
      this.$router.push('/login');
    },
    navigateToLoginAndClose() {
      this.closeSidebar();
      this.navigateToLogin();
    }
  },
  mounted() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
      link.addEventListener('click', function(e) {
        // Only prevent default for anchor links, not for the login link
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Add click event for mobile devices to ensure flip works on touch devices
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('touchstart', function() {
        if (window.innerWidth < 768) { // Only for mobile devices
          this.classList.toggle('flipped');
        }
      });
    });
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

/* Add CSS variables at the top */
:root {
  --primary: #1a2530;
  --grey: #728a9c;
  --dark: #0F0E0E;
  --dark-alt: #37353E;
  --light: #EEEEEE;
}

/* Force layout calculations on initial load */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

html {
  scroll-behavior: smooth;
}

/* Ensure body styles are applied */
body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--light);
  color: var(--dark-alt);
  line-height: 1.6;
  overflow-x: hidden; /* Prevent horizontal scroll */
}

#services {
  scroll-margin-top: 70px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Navigation - Add will-change for better performance */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: rgba(114, 138, 156, 0.95); /* Increased opacity */
  color: #728a9c;
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 0 2rem;
  will-change: transform; /* Performance optimization */
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 15rem;
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
  width: 50px;
  height: 50px;
  object-fit: contain;
  display: block; /* Ensure proper rendering */
}

.logo-text {
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--primary);
}

.logo-text1 {
  font-weight: 700;
  color: #ffffff;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #ffffff;
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
  background-color: var(--light);
  color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

/* Mobile Menu Button */
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
  background-color: var(--primary);
  border-radius: 5px;
  transition: all 0.3s ease;
}

/* Sidebar */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
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
  z-index: 1000;
  transition: left 0.3s ease;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar.active {
  left: 0;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.sidebar-link {
  color: #ffffff;
  text-decoration: none;
  padding: 0.8rem 1.2rem;
  font-weight: 500;
  display: block;
  border-radius: 8px;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.sidebar-link:hover {
  color: var(--primary);
  background: var(--light);
  transform: translateX(5px);
}

/* Hero Section - Add backface-visibility for performance */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 4rem 2rem;
  background-color: #ffffff;
  margin-top: 70px; /* Fixed margin instead of negative */
  backface-visibility: hidden; /* Performance optimization */
}

.hero-content {
  flex: 1;
}

.hero-container {
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--grey);
  text-align: center;
}

.highlight {
  color: var(--primary);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  color: var(--dark-alt);
  line-height: 1.8;
  max-width: 100%;
  text-align: justify;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.hero-image {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.image-container {
  position: relative;
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background: 
    linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.9)) padding-box,
    linear-gradient(135deg, #121731, #728a9c) border-box;
  border: 3px solid transparent;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12), 
              0 4px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-container:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.15), 
              0 6px 12px rgba(0, 0, 0, 0.08);
  background: 
    linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.9)) padding-box,
    linear-gradient(135deg, #728a9c, #EEEEEE) border-box;
}

.hero-img {
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: contain;
  display: block; /* Ensure proper rendering */
}

.image-quote {
  margin-top: 1.5rem;
  font-size: 2rem;
  color: var(--primary);
  text-align: center;
  font-weight: 500;
  max-width: 90%;
  line-height: 1.3;
}

.cta-button {
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  text-decoration: none;
  outline: none;
  display: inline-block; /* Ensure proper button layout */
}

.cta-button.primary {
  background: linear-gradient(135deg, #121731, #728a9c);
  color: #EEEEEE;
  padding: 0.8rem 1.6rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(18, 23, 49, 0.25);
  text-decoration: none;
  display: inline-block;
}

.cta-button.primary:hover {
  background: linear-gradient(135deg, #728a9c, #EEEEEE);
  color: #121731;
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(114, 138, 156, 0.4);
}

.design {
  color: var(--grey);
  font-style: italic;
}

/* Services Section */
.container2 {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1px;
}

.services-section {
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 67px;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
  color: #121731;
  letter-spacing: 0.5px;
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #728a9c;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  font-weight: 400;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

/* Flip Card Styles */
.flip-card {
  background-color: transparent;
  perspective: 1000px;
  height: 300px;
  transform-style: preserve-3d; /* Ensure 3D transforms work properly */
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flip-card-front {
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 3px solid transparent;
  background-image: linear-gradient(white, white), 
                  linear-gradient(135deg, #121731, #728a9c, #EEEEEE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

.flip-card-back {
  background: white;
  transform: rotateY(180deg);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  border: 3px solid transparent;
  background-image: linear-gradient(white, white), 
                  linear-gradient(135deg, #728a9c, #121731, #EEEEEE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

.service-icon {
  width: 80px;
  height: 80px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
}

.service-icon i {
  font-size: 2.5rem;
  color: var(--primary);
}

.flip-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--grey);
}

/* Guide Section */
.guide-section {
  padding: 1.8em;
  background-color: #ffffff;
}

.section-title1 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--grey);
}

.section-subtitle1 {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-light);
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.steps-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1300px;
  border-radius: 12px;
  padding: 2rem 3rem 0rem 3rem;
  border: 3px solid transparent;
  background-image: 
    linear-gradient(135deg, #121731, #728a9c),
    linear-gradient(135deg, #121731, #728a9c, #eeeeee);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
}

.steps-container:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background-image: 
    linear-gradient(135deg, #728a9c, #a0c4c7),
    linear-gradient(135deg, #121731, #728a9c, #eeeeee);
  cursor: pointer;
}

.steps-column {
  width: 48%;
}

.step {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  position: relative;
}

.step:not(:last-child):after {
  content: '';
  position: absolute;
  left: 30px;
  top: 70px;
  bottom: -2.5rem;
  width: 2px;
  background: #ffffff;
  opacity: 0.3;
}

.step-number {
  width: 60px;
  height: 60px;
  background: var(--light);
  color: var(--primary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 2rem;
  flex-shrink: 0;
}

.step-content {
  padding-top: 0.5rem;
}

.step-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.step-content h3:hover {
  color:#121731;
}

.step-content p {
  color: #ffffff;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  position: relative;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--primary);
  text-align: center;
  padding: 3.5rem 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.cta-section .container {
  position: relative;
  z-index: 2;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.8s ease-out;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.cta-button.large {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary), var(--grey));
  color: #fff;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.cta-button.large:hover {
  background: linear-gradient(135deg, var(--grey), var(--primary));
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
}

/* Footer */
.footer {
  background: linear-gradient(135deg, #2c3e50, #1a2530);
  color: #ecf0f1;
  padding: 1.5rem 0 1rem;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.6px;
}

.container3 {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 2rem;
}

.logo-container3 {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.logo-img3 {
  width: 55px;
  height: 55px;
  margin-right: 10px;
  display: block; /* Ensure proper rendering */
}

.design1 {
  margin-top: 15px;
}

.logo-text3 {
  font-size: 1.8rem;
  font-weight: 700;
}

.logo-text4 {
  color: var(--grey);
}

.footer-section1 {
  flex: 1;
  min-width: 250px;
  margin-bottom: 2rem;
  margin-left: 12rem;
}

.footer-section1 p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.footer-section1 h3 {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  margin-top: 15px;
}

.footer-section1 i {
  margin-right: 10px;
  color: #2177b1;
}

.footer-section2 {
  flex: 1;
  min-width: 250px;
  margin-bottom: 2rem;
  margin-left: 110px;
}

.footer-section2 p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.footer-section2 h3 {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  margin-top: 15px;
}

.footer-section2 i {
  margin-right: 10px;
  color: #2177b1;
}

.footer-section p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.footer-section h3 {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  margin-top: 15px;
}

.footer-section i {
  margin-right: 10px;
  color: #2177b1;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #2c3e50;
  border-radius: 50%;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background-color: var(--light);
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 3px solid #EEEEEE;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .navbar-left {
    gap: 8rem;
  }
  
  .footer-content {
    justify-content: space-around;
  }
  
  .footer-section1, 
  .footer-section2 {
    margin-left: 0;
  }
}

@media (max-width: 900px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
    margin-top: 70px;
    padding-top: 2rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .navbar-left {
    gap: 2rem;
  }
  
  .steps-column {
    width: 100%;
  }
  
  .steps-container {
    flex-direction: column;
    padding: 2rem 1.5rem 0rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .navbar {
    padding: 0 1rem;
  }
  
  .navbar-left {
    gap: 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-section {
    padding: 0 2rem 2rem;
    margin-top: 70px;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-top: 3rem;
  }
  
  .flip-card {
    height: 260px;
  }
  
  .flip-card-front, .flip-card-back {
    padding: 1.5rem;
  }
  
  .step {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .step-number {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .step:not(:last-child):after {
    display: none;
  }
  
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
  
  .logo-container3 {
    justify-content: center;
  }
  
  .footer-section,
  .footer-section1,
  .footer-section2 {
    width: 100%;
    max-width: 400px;
    margin-left: 0;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .cta-section {
    padding: 4rem 1.5rem;
  }
  
  .cta-section h2 {
    font-size: 2rem;
  }
  
  .cta-section p {
    font-size: 1.1rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .cta-button {
    padding: 0.8rem 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 3rem auto;
  }
  
  .flip-card {
    height: 250px;
  }
  
  .flip-card-front, .flip-card-back {
    padding: 1.2rem;
  }
  
  .hero-section {
    padding: 0 1.5rem 2rem;
    margin-top: 70px;
    gap: 2.5rem;
  }
  
  .image-container {
    padding: 1rem;
    max-width: 100%;
    border-width: 2px;
  }
  
  .hero-img {
    max-width: 250px;
  }
  
  .image-quote {
    font-size: 1.4rem;
    margin-top: 1rem;
    max-width: 95%;
  }
  
  .cta-button.primary {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .logo-text3 {
    font-size: 1.5rem;
  }
  
  .footer-section h3,
  .footer-section1 h3,
  .footer-section2 h3 {
    font-size: 1.2rem;
  }
  
  .social-links a {
    width: 35px;
    height: 35px;
  }
  
  .hero-section {
    padding: 0 1rem 1.5rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .image-container {
    padding: 0.8rem;
  }
  
  .hero-img {
    max-width: 220px;
  }
  
  .image-quote {
    font-size: 1.2rem;
  }
}

@media (max-width: 400px) {
  .services-section {
    padding: 1.5rem 0.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .flip-card {
    height: 230px;
  }
  
  .flip-card-front, .flip-card-back {
    padding: 1rem;
  }
  
  .service-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 0.8rem;
  }
  
  .service-icon i {
    font-size: 1.6rem;
  }
  
  .flip-card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
  }
  
  .flip-card p {
    font-size: 0.85rem;
  }
}

/* Mobile touch support */
@media (hover: none) {
  .flip-card.flipped .flip-card-inner {
    transform: rotateY(180deg);
  }
  
  .flip-card .flip-card-inner {
    transform: rotateY(0);
  }
}

/* Add fadeInUp animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>