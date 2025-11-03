<template>
   <div class="container">
        <!-- Left Panel with Branding -->
        <div class="left-panel">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
            <div class="decoration-circle circle-4"></div>
            
            <div>
                    <img src="../assets/CommuniTrade.png" alt="CommuniTrade Logo" class="logo-circle">
            </div>
            <h1 class="brand-name">CommuniTrade</h1>
        </div>
        
        <!-- Right Panel with Login Form -->
        <div class="right-panel">
            <div class="login-box">
                <div class="login-header">
                    <h2>Welcome Back</h2>
                    <p>Log in to track your offers and connect with those in need.</p>
                </div>
                
                <form>
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Username" required>
                    </div>
                    
                    <div class="input-group">
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="Password" required>
                    </div>
                    
                    <button type="submit" class="login-button">Login</button>
                    
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

        /* Responsive styles */
        @media (max-width: 992px) {
            .container {
                flex-direction: column;
                width: 90%;
                max-width: 500px;
                height: auto;
            }
            
            .left-panel, .right-panel {
                width: 100%;
                padding: 30px;
            }
            
            .left-panel {
                order: 2;
                border-radius: 0 0 20px 20px;
            }
            
            .right-panel {
                order: 1;
            }
            
            .logo-circle {
                width: 150px;
                height: 150px;
            }
            
            .logo {
                font-size: 35px;
            }
            
            .brand-name {
                font-size: 28px;
            }
            
            .login-header h2 {
                font-size: 32px;
            }
            
            .circle-4 {
                display: none;
            }
        }

        @media (max-width: 576px) {
            body {
                padding: 10px;
            }
            
            .container {
                width: 100%;
                border-radius: 15px;
            }
            
            .left-panel, .right-panel {
                padding: 20px;
            }
            
            .logo-circle {
                width: 120px;
                height: 120px;
                margin-bottom: 15px;
            }
            
            .logo {
                font-size: 30px;
            }
            
            .brand-name {
                font-size: 24px;
            }
            
            .tagline {
                font-size: 14px;
                max-width: 250px;
            }
            
            .login-header h2 {
                font-size: 28px;
            }
            
            .login-header p {
                font-size: 16px;
            }
            
            .input-group input {
                padding: 12px 12px 12px 40px;
                font-size: 14px;
            }
            
            .input-group i {
                font-size: 16px;
                left: 12px;
            }
            
            .login-button {
                padding: 12px;
                font-size: 14px;
            }
            
            .circle-1, .circle-2, .circle-3 {
                display: none;
            }
        }

        @media (max-width: 400px) {
            .left-panel, .right-panel {
                padding: 15px;
            }
            
            .logo-circle {
                width: 100px;
                height: 100px;
            }
            
            .logo {
                font-size: 25px;
            }
            
            .brand-name {
                font-size: 20px;
            }
            
            .tagline {
                font-size: 12px;
            }
            
            .login-header h2 {
                font-size: 24px;
            }
            
            .login-header p {
                font-size: 14px;
            }
        }

        /* Landscape mode for mobile */
        @media (max-height: 600px) and (orientation: landscape) {
            body {
                height: auto;
                min-height: 100vh;
                padding: 10px;
            }
            
            .container {
                height: auto;
                min-height: auto;
            }
            
            .left-panel {
                padding: 20px;
            }
            
            .logo-circle {
                width: 80px;
                height: 80px;
                margin-bottom: 10px;
            }
            
            .logo {
                font-size: 20px;
            }
            
            .brand-name {
                font-size: 18px;
                margin-top: 5px;
            }
            
            .tagline {
                font-size: 11px;
                max-width: 200px;
                margin-top: 5px;
            }
        }
</style>