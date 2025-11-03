<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-left">
        <div class="logo-container">
          <img src="../assets/CommuniTrade.png" alt="CommuniTrade Logo" class="logo-img">
          <p class="logo-text">Communi<span class="logo-text1">Trade</span></p>
        </div>
        
        <div class="nav-links">
          <a @click="scrollToSection('home')" class="nav-link">Home</a>
          <a @click="scrollToSection('services')" class="nav-link">Services</a>
          <a @click="scrollToSection('guide')" class="nav-link">Guide</a>
          <a @click="scrollToSection('footer')" class="nav-link">Contact Us</a>
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
      <a @click="scrollToSectionAndClose('home')" class="sidebar-link">Home</a>
      <a @click="scrollToSectionAndClose('services')" class="sidebar-link">Services</a>
      <a @click="scrollToSectionAndClose('guide')" class="sidebar-link">Guide</a>
      <a @click="scrollToSectionAndClose('footer')" class="sidebar-link">Contact Us</a>
    </div>
  </div>
  
  <!-- Hero Section -->
  <section id="home" class="hero-section">
    <div class="hero-content">
      <div class="hero-container">
        <h1 class="hero-title">Welcome to <span class="highlight">CommuniTrade</span></h1>
        <p class="hero-subtitle">Your platform for community-based trading and sharing of skills and services without using money. Connect with your neighbors to exchange what you can do, share resources, and build a stronger community together.</p>
        <div class="hero-buttons">
          <a @click="scrollToSection('services')" class="cta-button primary">Learn More</a>
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
      this.$router.push('/login');
    },
    scrollToSection(sectionId) {
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    },
    scrollToSectionAndClose(sectionId) {
      this.scrollToSection(sectionId);
      this.closeSidebar();
    }
  },
  mounted() {
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
/* Your existing CSS styles remain exactly the same */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

html {
  scroll-behavior: smooth;
}

#services {
  scroll-margin-top: 70px; /* height of your navbar or header */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: thin;             /* makes it thin */
  scrollbar-color: #728a9c #f0f0f0; 
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--light);
  color: var(--dark-alt);
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
  background-color: rgba(114, 138, 156, 0.9); /* #728a9c with transparency */
  color: #728a9c;
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
  cursor: pointer; /* Add cursor pointer for clickable elements */
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
  display: block; /* makes the whole row clickable */
  border-radius: 8px;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer; /* Add cursor pointer for clickable elements */
}

.sidebar-link:hover {
  color: var(--primary);
  background: var(--light); /* subtle hover bg */
  transform: translateX(5px); /* smooth slide on hover */
}

/* The rest of your CSS styles remain exactly the same... */
/* [All your existing CSS styles continue here without changes] */
</style>