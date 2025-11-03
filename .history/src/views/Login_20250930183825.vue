<template> 
    <div class="container">
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
         
         <div class="right-panel">
             <div class="login-box">
                 <div class="login-header">
                     <h2>Welcome Back</h2>
                     <p>Log in to track your offers and connect with those in need.</p>
                 </div>
                 
                 <form @submit.prevent="loginUser"> <div class="input-group">
                         <i class="fas fa-envelope"></i> <input type="email" placeholder="Email Address" required v-model="email"> </div>
                     
                     <div class="input-group password-container">
                        <i class="fas fa-lock"></i>
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Password" required v-model="password"> <i 
                            :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" 
                            class="toggle-eye"
                            @click="togglePassword"
                        ></i>
                    </div>
                     
                     <button type="submit" class="login-button">Login</button>
                     
                     <div class="signup-text">
                         Don't have an account? <router-link to="/register" class="signup-link">Sign Up</router-link> </div>
                 </form>
             </div>
         </div>
     </div>
 </template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',       
            password: '',   
            showPassword: false
        };
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },

        async loginUser() {
            if (!this.email || !this.password) {
                alert('Error: Email and password are required.');
                return;
            }

            try {
                // Authenticate user with Firebase
                const userCredential = await signInWithEmailAndPassword(
                    auth, 
                    this.email, 
                    this.password
                );
                
                const user = userCredential.user;
                
                // Success Handling
                console.log("Login successful! User UID:", user.uid);
                alert(`Welcome back, ${user.email}! Redirecting to the home page...`);
                
                window.location.href = '/Home'; 

            } catch (error) {
                // Error Handling
                const errorCode = error.code;
                console.error("Firebase Login Error:", errorCode, error.message);
                
                let userFriendlyMessage = 'Login failed. Please check your credentials.';
                
                if (errorCode === 'auth/invalid-email') {
                    userFriendlyMessage = 'The email address format is invalid.';
                } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                    userFriendlyMessage = 'Invalid email or password.';
                } else if (errorCode === 'auth/user-disabled') {
                    userFriendlyMessage = 'This user account has been disabled.';
                }
                
                alert(`Login Failed: ${userFriendlyMessage}`);
            }
        }
    },
    mounted() {
      const loginBox = document.querySelector('.login-box')
      if (loginBox) {
        loginBox.style.transform = 'translateY(20px)'
        loginBox.style.opacity = '0'

        setTimeout(() => {
          loginBox.style.transition = 'transform 0.5s ease, opacity 0.5s ease'
          loginBox.style.transform = 'translateY(0)'
          loginBox.style.opacity = '1'
        }, 100)
      }
    }
}
</script>

<style setup>

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

.password-container {
    position: relative;
}

.toggle-eye {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #555;
    z-index: 2;
    font-size: 18px;
}

.toggle-eye:hover {
    color: #000;
}

.input-group input {
    width: 100%;
    padding: 15px 45px 15px 45px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;
    background: #fff;
    color: #333;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
    box-sizing: border-box;
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


.input-group i:not(.toggle-eye) {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--primary);
    font-size: 18px;
    z-index: 2;
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
    width: 150px;
    height: 150px;
    top: -90px;
    left: 20%;
}

.circle-2 {
    width: 140px;
    height: 140px;
    bottom: -50px;
    right: -30px;
}

.circle-3 {
    width: 70px;
    height: 70px;
    top: 50%;
    left: -35px;
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
                flex-direction: column;
                max-width: 500px;
                height: auto;
            }
            
            .left-panel {
                padding: 30px;
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
            
            .login-header h2 {
                font-size: 28px;
            }
            
            .login-header p {
                font-size: 14px;
            }
            
            .input-group input {
                padding: 12px 12px 12px 40px;
                font-size: 14px;
            }
            
            .login-button {
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
            
            .login-header {
                margin-bottom: 25px;
            }
            
            .login-header h2 {
                font-size: 24px;
            }
            
            .input-group {
                margin-bottom: 20px;
            }
            
            .signup-text {
                font-size: 14px;
            }
        }
        
        @media (max-width: 360px) {
            .left-panel {
                min-height: 200px;
            }
            
            .logo-circle {
                width: 80px;
                height: 80px;
            }
            
            .login-header h2 {
                font-size: 22px;
            }
            
            .input-group input {
                padding: 10px 10px 10px 35px;
            }
            
            .input-group i {
                font-size: 16px;
                left: 12px;
            }
        }
</style>