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
                        <input type="text" placeholder="First Name" required>
                    </div>
                    
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Last Name" required>
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
                        Already have an account? 
                        <router-link to="/login" class="login-link">Log In</router-link>
                    </div>
                    
                    <div class="about-link">
                        <router-link to="/landing" class="about-system">About CommuniTrade System</router-link>

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
                <div class="logo-circle">
                    <img src="../assets/CommuniTrade.png" alt="CommuniTrade Logo">
                </div>
            </div>
            <h1 class="brand-name">CommuniTrade</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterPage',
    mounted() {
        const loginLink = document.querySelector('.login-link');
        const aboutLink = document.querySelector('.about-system');
        
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Redirecting to login page...');
            // In a real application, you would use:
            // this.$router.push('/login');
        });
        
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Redirecting to about page...');
            // In a real application, you would use:
            // this.$router.push('/about');
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
    }
}
</script>

<style setup>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');



/* Responsive Styles */
@media (max-width: 992px) {
    .container {
        flex-direction: column-reverse;
        max-width: 500px;
        height: auto;
    }
    
    .left-panel {
        padding: 20px;
        width: 100%;
    }
    
    .right-panel {
        padding: 25px;
        min-height: 200px;
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
        padding: 15px;
    }
    
    .register-header h2 {
        font-size: 26px;
    }
    
    .register-header p {
        font-size: 13px;
    }
    
    .input-group input {
        padding: 10px 10px 10px 35px;
        font-size: 13px;
    }
    
    .register-button {
        padding: 10px;
        font-size: 14px;
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
        padding: 12px;
    }
    
    .logo-circle {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
    }
    
    .brand-name {
        font-size: 20px;
    }
    
    .register-header {
        margin-bottom: 15px;
    }
    
    .register-header h2 {
        font-size: 22px;
    }
    
    .input-group {
        margin-bottom: 12px;
    }
    
    .login-text, .about-system {
        font-size: 12px;
    }
}
</style>