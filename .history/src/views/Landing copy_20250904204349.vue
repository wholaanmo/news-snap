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
  <a href="#home" class="sidebar-link" @click="closeSidebar">
    <i class="fas fa-home"></i> Home
  </a>
  <a href="#services" class="sidebar-link" @click="closeSidebar">
    <i class="fas fa-cogs"></i> Services
  </a>
  <a href="#guide" class="sidebar-link" @click="closeSidebar">
    <i class="fas fa-book"></i> Guide
  </a>
  <a href="#footer" class="sidebar-link" @click="closeSidebar">
    <i class="fas fa-envelope"></i> Contact Us
  </a>
</div>


  </div>
  
  <!-- Hero Section -->
  <section id="home" class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">Welcome to <span class="highlight">CommuniTrade</span></h1>
      <p class="hero-subtitle">Your platform for community-based trading and sharing. Connect with your neighbors to trade goods, share resources, and build a stronger community.</p>
      <div class="hero-buttons">
        <button class="cta-button primary">Get Started</button>
        <button class="cta-button secondary">Learn More</button>
      </div>
    </div>
    <div class="hero-image">
      <div class="placeholder-image">
        <i class="fas fa-people-arrows"></i>
        <p>Community Trading Illustration</p>
      </div>
    </div>
  </section>
  
  <!-- Services Section -->
  <section id="services" class="services-section">
    <div class="container">
      <h2 class="section-title">Our Services</h2>
      <p class="section-subtitle">CommuniTrade offers a variety of services to help you engage with your community</p>
      
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-exchange-alt"></i>
          </div>
          <h3>Item Trading</h3>
          <p>Trade items you no longer need for things that you want with people in your community.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-hands-helping"></i>
          </div>
          <h3>Skill Sharing</h3>
          <p>Share your skills and learn from others through bartering and skill exchanges.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-calendar-alt"></i>
          </div>
          <h3>Community Events</h3>
          <p>Organize and participate in local trading events and community gatherings.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <h3>Local Networking</h3>
          <p>Connect with neighbors and build meaningful relationships within your community.</p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Guide Section -->
  <section id="guide" class="guide-section">
    <div class="container">
      <h2 class="section-title">How It Works</h2>
      <p class="section-subtitle">Getting started with CommuniTrade is easy and straightforward</p>
      
      <div class="steps-container">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Create Your Account</h3>
            <p>Sign up and set up your profile with your interests and items available.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>List Your Items</h3>
            <p>Add items you want to trade or share with your community.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Browse & Connect</h3>
            <p>Discover available items and connect with other users to arrange trades.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>Trade Safely</h3>
            <p>Meet in designated community spots and build your trading reputation.</p>
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
      <button class="cta-button large">Sign Up Now</button>
    </div>
  </section>
  
  <!-- Footer -->
  <footer id="footer" class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="logo-container">
            <img src="../assets/CommuniTrade.png" alt="CommuniTrade Logo" class="logo-img">
            <p class="logo-text">Communi<span class="logo-text1">Trade</span></p>
          </div>
          <p>Building stronger communities through sharing and trading.</p>
        </div>
        
        <div class="footer-section">
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#guide">How It Works</a>
          <a href="#footer">Contact</a>
        </div>
        
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p><i class="fas fa-envelope"></i> info@communitrade.com</p>
          <p><i class="fas fa-phone"></i> (555) 123-4567</p>
          <p><i class="fas fa-map-marker-alt"></i> 123 Community Street, Townsville</p>
        </div>
        
        <div class="footer-section">
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2023 CommuniTrade. All rights reserved.</p>
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
    handleLogin() {
      alert('Login functionality would open here!');
      this.closeSidebar();
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
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Login button functionality
    document.querySelector('.login-btn').addEventListener('click', function() {
      alert('Login functionality would open here!');
    });
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--light);
  color: var(--text-dark);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: var(--grey);
  color: var(--grey);
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 0 2rem;
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
}

.logo-text {
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--primary);
}

.logo-text1 {
  font-weight: 700;
  color: var(--light);
}

.nav-links {
  display: flex;
  gap: 2rem;
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
  color: var(--light);
  text-decoration: none;
  padding: 1rem 0;
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
}

.sidebar-link:hover {
  color: var(--primary);
}


/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 2rem 2rem;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%);
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--grey);
}

.highlight {
  color: var(--primary);
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: var(--text-light);
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.cta-button {
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.cta-button.primary {
  background-color: var(--primary);
  color: white;
}

.cta-button.primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
}

.cta-button.secondary {
  background-color: transparent;
  color: var(--primary);
  border-color: var(--primary);
}

.cta-button.secondary:hover {
  background-color: var(--primary);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.2);
}

.cta-button.large {
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder-image {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.placeholder-image i {
  font-size: 8rem;
  margin-bottom: 1.5rem;
}

.placeholder-image p {
  font-size: 1.2rem;
  font-weight: 500;
}

/* Sections Common Styles */
.services-section, .guide-section, .cta-section {
  padding: 5rem 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--grey);
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-light);
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

/* Services Section */
.services-section {
  background-color: var(--light-grey);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
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

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--grey);
}

.service-card p {
  color: var(--text-light);
  line-height: 1.6;
}

/* Guide Section */
.steps-container {
  max-width: 800px;
  margin: 0 auto;
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
  background: var(--primary);
  opacity: 0.3;
}

.step-number {
  width: 60px;
  height: 60px;
  background: var(--primary);
  color: white;
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
  color: var(--grey);
}

.step-content p {
  color: var(--text-light);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  text-align: center;
  padding: 6rem 0;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-section .cta-button {
  background: white;
  color: var(--primary);
  border: none;
}

.cta-section .cta-button:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Footer */
.footer {
  background-color: var(--dark);
  color: white;
  padding: 4rem 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.footer-section p {
  margin-bottom: 1rem;
  opacity: 0.8;
}

.footer-section a {
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 0.8rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.footer-section a:hover {
  opacity: 1;
}

.footer-section i {
  margin-right: 0.5rem;
  width: 20px;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;
}

.social-links a:hover {
  background: var(--primary);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.7;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 2.8rem;
  }
  
  .placeholder-image {
    width: 350px;
    height: 350px;
  }
}

@media (max-width: 900px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding-top: 8rem;
    gap: 3rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .navbar-left {
    gap: 2rem;
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
  
  .placeholder-image {
    width: 300px;
    height: 300px;
  }
  
  .placeholder-image i {
    font-size: 6rem;
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
}

@media (max-width: 480px) {
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
  
  .placeholder-image {
    width: 250px;
    height: 250px;
  }
  
  .placeholder-image i {
    font-size: 4rem;
  }
}
</style>