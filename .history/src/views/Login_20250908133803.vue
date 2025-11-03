<template>
  <div id="app">
        <!-- Left Panel with Branding -->
        <div class="left-panel">
            <div class="logo">
                <i class="fas fa-people-arrows"></i>
            </div>
            <h1 class="title">CommuniTrade</h1>
            <p class="tagline">A Money-Free Way to Exchange Skills</p>
        </div>
        
        <!-- Right Panel with Login Form -->
        <div class="right-panel">
            <div class="login-box">
                <h2 class="welcome-text">Welcome Back!</h2>
                
                <form @submit.prevent="login">
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Enter your username"
                            v-model="username"
                            required
                        >
                    </div>
                    
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter your password"
                            v-model="password"
                            required
                        >
                    </div>
                    
                    <button type="submit" class="login-btn">Log In</button>
                </form>
                
                <div class="divider">
                    <span>Or continue with</span>
                </div>
                
                <div class="social-login">
                    <div class="social-btn">
                        <i class="fab fa-google"></i>
                    </div>
                    <div class="social-btn">
                        <i class="fab fa-facebook-f"></i>
                    </div>
                    <div class="social-btn">
                        <i class="fab fa-linkedin-in"></i>
                    </div>
                </div>
                
                <p class="signup-text">
                    Don't have an account? 
                    <a class="signup-link" @click="goToSignUp">Sign Up</a>
                </p>
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
        
        :root {
            --primary: #1a2530;
            --grey: #728a9c;
            --light: #EEEEEE;
            --accent: #4CAF50;
            --white: #FFFFFF;
        }
        
        body {
            background-color: var(--light);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        #app {
            display: flex;
            width: 850px;
            height: 500px;
            background: var(--white);
            border-radius: 12px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .left-panel {
            flex: 1;
            background: linear-gradient(135deg, var(--primary) 0%, #2c3e50 100%);
            color: var(--white);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            position: relative;
        }
        
        .logo {
            width: 120px;
            height: 120px;
            background: var(--white);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .logo i {
            font-size: 60px;
            color: var(--primary);
        }
        
        .title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .tagline {
            font-size: 16px;
            text-align: center;
            color: var(--light);
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
            max-width: 350px;
        }
        
        .welcome-text {
            font-size: 24px;
            color: var(--primary);
            margin-bottom: 30px;
            text-align: center;
            font-weight: 600;
        }
        
        .input-group {
            margin-bottom: 20px;
            position: relative;
        }
        
        .input-group label {
            display: block;
            margin-bottom: 8px;
            color: var(--primary);
            font-weight: 500;
            font-size: 14px;
        }
        
        .input-group input {
            width: 100%;
            padding: 14px 15px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 15px;
            transition: all 0.3s;
        }
        
        .input-group input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(26, 37, 48, 0.2);
        }
        
        .login-btn {
            width: 100%;
            padding: 14px;
            background: var(--primary);
            color: var(--white);
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
            margin-top: 10px;
        }
        
        .login-btn:hover {
            background: #23303d;
        }
        
        .signup-text {
            text-align: center;
            margin-top: 25px;
            color: var(--grey);
            font-size: 14px;
        }
        
        .signup-link {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .signup-link:hover {
            color: #23303d;
            text-decoration: underline;
        }
        
        .divider {
            display: flex;
            align-items: center;
            margin: 25px 0;
            color: var(--grey);
            font-size: 14px;
        }
        
        .divider::before,
        .divider::after {
            content: "";
            flex: 1;
            height: 1px;
            background: #ddd;
        }
        
        .divider span {
            padding: 0 15px;
        }
        
        .social-login {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }
        
        .social-btn {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--light);
            border: 1px solid #ddd;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .social-btn:hover {
            background: #e0e0e0;
            transform: translateY(-2px);
        }
        
        .social-btn i {
            font-size: 18px;
            color: var(--grey);
        }
        
        @media (max-width: 900px) {
            #app {
                flex-direction: column;
                width: 100%;
                height: auto;
                max-width: 450px;
            }
            
            .left-panel {
                padding: 30px;
            }
            
            .logo {
                width: 90px;
                height: 90px;
            }
            
            .logo i {
                font-size: 45px;
            }
            
            .title {
                font-size: 26px;
            }
        }
</style>