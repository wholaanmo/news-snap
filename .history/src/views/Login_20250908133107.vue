<template>
    <div class="container">
        <!-- Left Panel with Branding -->
        <div class="left-panel">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
            
            <div class="logo-circle">
                <div class="logo">
                    <i class="fas fa-handshake"></i>
                </div>
            </div>
            <h1 class="brand-name">CommuniTrade</h1>
            <p class="tagline">A Money-Free Way to Exchange Skills</p>
        </div>
        
        <!-- Right Panel with Login Form -->
        <div class="right-panel">
            <div class="login-box">
                <div class="login-header">
                    <h2>Welcome Back!</h2>
                    <p>Log in to access your account and connect with those in need.</p>
                </div>
                
                <form>
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Enter your username" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required>
                    </div>
                    
                    <button type="submit" class="login-button">Log In</button>
                    
                    <div class="signup-text">
                        Don't have an account? <a href="#" class="signup-link">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const signUpLink = document.querySelector('.signup-link');
    
    signUpLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Redirecting to sign up page...');
        // In a real application, you would use:
        // window.location.href = 'signup.html';
    });
    
    // Add subtle animation to the login box
    const loginBox = document.querySelector('.login-box');
    loginBox.style.transform = 'translateY(20px)';
    loginBox.style.opacity = '0';
    
    setTimeout(() => {
        loginBox.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        loginBox.style.transform = 'translateY(0)';
        loginBox.style.opacity = '1';
    }, 100);
});
</script>

<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
        }
        
        .container {
            display: flex;
            width: 100%;
            max-width: 1000px;
            min-height: 600px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .left-panel {
            flex: 1;
            background: linear-gradient(120deg, #4b6cb7 0%, #182848 100%);
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
            width: 120px;
            height: 120px;
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
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            text-align: center;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
            font-size: 28px;
            color: #2c3e50;
            font-weight: 600;
        }
        
        .login-header p {
            color: #7f8c8d;
            margin-top: 8px;
            font-size: 15px;
            line-height: 1.5;
        }
        
        .input-group {
            margin-bottom: 25px;
        }
        
        .input-group label {
            display: block;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 600;
            font-size: 16px;
        }
        
        .input-group input {
            width: 100%;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 10px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s;
        }
        
        .input-group input:focus {
            border-color: #4b6cb7;
            box-shadow: 0 0 0 2px rgba(75, 108, 183, 0.2);
        }
        
        .input-group input::placeholder {
            color: #aab7c5;
        }
        
        .login-button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(120deg, #4b6cb7 0%, #182848 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(75, 108, 183, 0.3);
            margin-top: 10px;
        }
        
        .login-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(75, 108, 183, 0.4);
        }
        
        .signup-text {
            text-align: center;
            margin-top: 25px;
            color: #7f8c8d;
            font-size: 15px;
        }
        
        .signup-link {
            color: #4b6cb7;
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
        
        /* Responsive design */
        @media (max-width: 900px) {
            .container {
                flex-direction: column;
                height: auto;
            }
            
            .left-panel {
                padding: 40px 30px;
                order: 2;
            }
            
            .right-panel {
                padding: 60px 30px;
                order: 1;
            }
            
            .brand-name {
                font-size: 28px;
            }
        }
        
        @media (max-width: 480px) {
            .login-header h2 {
                font-size: 24px;
            }
            
            .login-header p {
                font-size: 14px;
            }
            
            .input-group label {
                font-size: 15px;
            }
            
            .input-group input {
                padding: 12px;
            }
            
            .login-button {
                padding: 12px;
            }
        }
    </style>
</style>