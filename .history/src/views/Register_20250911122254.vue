<template>
    <div class="container">
      <!-- Left Panel with Registration Form -->
      <div class="left-panel">
        <div class="register-box">
          <div class="register-header">
            <h2>Create Account</h2>
            <p>Join CommuniTrade to start trading and helping your community.</p>
          </div>
          
          <form>
            <div class="input-group">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Full Name" required>
            </div>
            
            <div class="input-group">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Email Address" required>
            </div>
            
            <div class="input-group">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" required>
            </div>
            
            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" required>
            </div>
            
            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" required>
            </div>
            
            <div class="terms-group">
              <input type="checkbox" id="terms" required>
              <label for="terms">I agree to the <a href="#">Terms & Conditions</a></label>
            </div>
            
            <button type="submit" class="register-button">Create Account</button>
            
            <div class="login-text">
              Already have an account? <a href="#" class="login-link">Log In</a>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Right Panel with Branding -->
      <div class="right-panel">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
        <div class="decoration-circle circle-4"></div>
        
        <div>
          <img src="../assets/CommuniTrade.png" alt="CommuniTrade Logo" class="logo-circle">
        </div>
        <h1 class="brand-name">CommuniTrade</h1>
        <p class="tagline">Join our community of traders and helpers</p>
      </div>
    </div>
  </template>
  
  <script>
  document.addEventListener('DOMContentLoaded', function() {
      const loginLink = document.querySelector('.login-link');
      
      loginLink.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Redirecting to login page...');
          // In a real application, you would use:
          // window.location.href = 'login.html';
      });
      
      // Add subtle animation to the register box
      const registerBox = document.querySelector('.register-box');
      registerBox.style.transform = 'translateY(20px)';
      registerBox.style.opacity = '0';
      
      setTimeout(() => {
          registerBox.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
          registerBox.style.transform = 'translateY(0)';
          registerBox.style.opacity = '1';
      }, 100);
  });
</script>
  
  <style scoped>
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
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px;
  }
  
  .right-panel {
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
  
  .register-box {
      width: 100%;
      max-width: 380px;
  }
  
  .register-header {
      margin-bottom: 30px;
  }
  
  .register-header h2 {
      font-size: 40px;
      font-weight: 600;
      text-align: center;
      background: linear-gradient(90deg, #182848, #4d6699);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
  }
  
  .register-header p {
      color: #7f8c8d;
      margin-top: 8px;
      font-size: 18px;
      text-align: center;
  }
  
  .input-group {
      margin-bottom: 20px;
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
  
  .terms-group {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
  }
  
  .terms-group input {
      margin-right: 10px;
  }
  
  .terms-group label {
      font-size: 14px;
      color: #7f8c8d;
  }
  
  .terms-group a {
      color: var(--primary);
      text-decoration: none;
      font-weight: 600;
  }
  
  .terms-group a:hover {
      text-decoration: underline;
  }
  
  .register-button {
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
  
  .register-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(75, 108, 183, 0.4);
      background: linear-gradient(135deg, var(--grey), var(--primary)); 
  }
  
  .login-text {
      text-align: center;
      margin-top: 25px;
      color: #7f8c8d;
      font-size: 15px;
  }
  
  .login-link {
      color: var(--primary);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
  }
  
  .login-link:hover {
      color: #182848;
      text-decoration: underline;
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
      margin-top: 10px;
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
  
  /* Responsive Styles */
  @media (max-width: 992px) {
      .container {
          flex-direction: column-reverse;
          height: auto;
          max-width: 500px;
      }
      
      .left-panel, .right-panel {
          padding: 30px;
          width: 100%;
      }
      
      .right-panel {
          min-height: 250px;
      }
      
      .logo-circle {
          width: 120px;
          height: 120px;
      }
      
      .brand-name {
          font-size: 24px;
      }
      
      .circle-4 {
          left: 80%;
      }
  }
  
  @media (max-width: 768px) {
      .container {
          border-radius: 15px;
      }
      
      .left-panel, .right-panel {
          padding: 25px;
      }
      
      .register-header h2 {
          font-size: 32px;
      }
      
      .register-header p {
          font-size: 16px;
      }
      
      .input-group input {
          padding: 12px 12px 12px 40px;
          font-size: 14px;
      }
      
      .register-button {
          padding: 12px;
          font-size: 15px;
      }
      
      .circle-1, .circle-2, .circle-3, .circle-4 {
          display: none;
      }
  }
  
  @media (max-width: 480px) {
      body {
          padding: 15px;
      }
      
      .container {
          border-width: 2px;
          border-radius: 12px;
      }
      
      .left-panel, .right-panel {
          padding: 20px;
      }
      
      .logo-circle {
          width: 100px;
          height: 100px;
          margin-bottom: 15px;
      }
      
      .brand-name {
          font-size: 20px;
      }
      
      .register-header {
          margin-bottom: 25px;
      }
      
      .register-header h2 {
          font-size: 28px;
      }
      
      .input-group {
          margin-bottom: 15px;
      }
      
      .login-text {
          font-size: 14px;
      }
  }
  </style>