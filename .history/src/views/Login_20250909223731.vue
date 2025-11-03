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
          <router-link to="/login" class="login-btn">Login</router-link>
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
        <router-link to="/login" class="sidebar-link" @click="closeSidebar">Login</router-link>
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
                  <p>Start by registering on CommuniTrade. Build your profile by adding your skills, services, and any experience you'd like to share.</p>
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
        <router-link to="/login" class="cta-button large">Sign Up Now</router-link>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("/background.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    }
  
    .container {
    display: flex;
    width: 850px;
    height: 550px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 
                0 5px 10px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 4px solid rgba(255, 255, 255);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.left-panel {
    flex: 1;
    background: linear-gradient(135deg, #121731, #728a9c 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    position: relative;
    overflow: hidden;
}

.logo-circle {
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.logo {
    font-size: 45px;
    transform: rotate(-15deg);
}

.brand-name {
    font-size: 35px;
    font-weight: 700;
    margin-top: 10px;
    text-align: center;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    color: var(--light)
}

.tagline {
    text-align: center;
    font-size: 16px;
    opacity: 0.9;
    max-width: 300px;
    line-height: 1.5;
}

.right-panel {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
}

.login-box {
    width: 100%;
    max-width: 380px;
}

.login-header {
    margin-bottom: 35px;
}

.login-header h2 {
    font-size: 40px;
    font-weight: 600;
    text-align: center;
    background: linear-gradient(90deg, #182848, #4d6699);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}


.login-header p {
    color: #7f8c8d;
    margin-top: 8px;
    font-size: 18px;
    text-align: center;
}

.input-group {
    margin-bottom: 25px;
    position: relative;
}

.input-group input {
    width: 100%;
    padding: 15px 15px 15px 45px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;
    background: #fff;
    color: #333;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
}

.input-group input:hover {
    border-color: var(--primary);
    background: var(--light);
}

.input-group input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 6px rgba(75, 108, 183, 0.25);
    background: #fff;
}


.input-group i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--primary);
    font-size: 18px;
}

.login-button {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #121731, #728a9c 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 10px rgba(75, 108, 183, 0.3);
}

.login-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(75, 108, 183, 0.4);
    background: linear-gradient(135deg, var(--grey), var(--primary)); 
}

.signup-text {
    text-align: center;
    margin-top: 25px;
    color: #7f8c8d;
    font-size: 15px;
}

.signup-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
}

.signup-link:hover {
    color: #182848;
    text-decoration: underline;
}

.decoration-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
    width: 80px;
    height: 80px;
    top: -20px;
    left: 30%;
}

.circle-2 {
    width: 120px;
    height: 120px;
    bottom: -50px;
    right: -30px;
}

.circle-3 {
    width: 50px;
    height: 50px;
    top: 45%;
    left: -25px;
}

.circle-4 {
    width: 80px;
    height: 80px;
    top: 25%;
    left: 380px;
}

/* Responsive design */
@media (max-width: 900px) {
    .container {
        flex-direction: column;
        height: auto;
        width: 100%;
        max-width: 500px;
    }
    
    .left-panel {
        padding: 30px;
    }
    
    .right-panel {
        padding: 30px;
    }
}
</style>