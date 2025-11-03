<template>
    <div class="container">
        <div class="left-panel">
            <div class="register-box">
                <div class="register-header">
                    <h2>Create Account</h2>
                    <p>Join CommuniTrade to start trading and helping your community.</p>
                </div>
                
                <form @submit.prevent="registerUser">
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="First Name" required v-model="firstName">
                    </div>
                    
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Last Name" required v-model="lastName">
                    </div>

                    <div class="input-group">
                        <i class="fas fa-envelope"></i>
                        <input type="email" placeholder="Email Address" required v-model="email">
                    </div>
                    
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Username" required v-model="username">
                    </div>
                    
                    <div class="input-group password-container">
                        <i class="fas fa-lock"></i>
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Password" required v-model="password">
                        <i 
                            :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" 
                            class="toggle-eye"
                            @click="togglePassword"
                        ></i>
                    </div>
                    
                    <div class="input-group password-container">
                        <i class="fas fa-lock"></i>
                        <input :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm Password" required v-model="confirmPassword">
                        <i 
                            :class="showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" 
                            class="toggle-eye"
                            @click="toggleConfirmPassword"
                        ></i>
                    </div>
                    
                    <div class="terms-group">
                        <input type="checkbox" id="terms" required v-model="termsAccepted">
                        <label for="terms">I agree to the <a href="#" @click.prevent="goToTerms">Terms & Conditions</a></label>
                    </div>
                    
                    <button type="submit" class="register-button">Create Account</button>
                    
                    <div class="login-text">
                        Already have an account? 
                        <a href="#" class="login-link" @click.prevent="goToLogin">Log In</a>
                    </div>
                    
                    <div class="about-link">
                        <router-link to="/" class="about-system">
                            About CommuniTrade System
                        </router-link>

                    </div>
                </form>
            </div>
        </div>
        
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
    name: 'Register',
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            termsAccepted: false,
            
            showPassword: false,
            showConfirmPassword: false
        }
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        toggleConfirmPassword() {
            this.showConfirmPassword = !this.showConfirmPassword;
        },
        
        // Navigation methods using Vue Router
        goToLogin() {
            this.$router.push({ name: 'Login' });
        },
        goToLanding() {
            this.$router.push({ name: 'Landing' });
        },
        goToTerms() {
            console.log('Navigating to Terms & Conditions...');
        },
        
        async registerUser() {
            // Client-Side Validation
            if (this.password !== this.confirmPassword) {
                alert('Error: Passwords do not match. Please check and try again.');
                return;
            }

            if (!this.termsAccepted) {
                 alert('Error: You must agree to the Terms & Conditions.');
                return;
            }
            
            if (!this.email || !this.password || !this.username) {
                 alert('Error: Email, Username, and Password are required.');
                 return;
            }

            try {
                // Create User in Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(
                    auth, 
                    this.email, 
                    this.password
                );
                
                const user = userCredential.user;
                
                await updateProfile(user, {
                    displayName: this.username 
                });
                
                // Save User Profile to Firestore
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    email: this.email,
                    registrationDate: new Date(),
                    role: 'basic' 
                });
                
                // Success Handling and REDIRECTION via Vue Router
                console.log("Registration successful! Firestore profile created for UID:", user.uid);
                alert(`Account created successfully for ${this.username}! Redirecting to Login...`);
                
                // Vue Router push()
                this.$router.push({ name: 'Login' }); 

            } catch (error) {
                // Error Handling
                const errorCode = error.code;
                console.error("Firebase Registration Error:", errorCode, error.message);
                
                let userFriendlyMessage = 'Registration failed. Please try again.';
                
                if (errorCode === 'auth/email-already-in-use') {
                    userFriendlyMessage = 'The email address is already in use.';
                } else if (errorCode === 'auth/invalid-email') {
                    userFriendlyMessage = 'The email address format is invalid.';
                } else if (errorCode === 'auth/weak-password') {
                    userFriendlyMessage = 'The password is too weak (must be at least 6 characters).';
                }
                
                alert(`Registration Failed: ${userFriendlyMessage}`);
            }
        }
    },
    mounted() {
        
        const registerBox = document.querySelector('.register-box');
        if (registerBox) {
            registerBox.style.transform = 'translateY(20px)';
            registerBox.style.opacity = '0';
            
            setTimeout(() => {
                registerBox.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                registerBox.style.transform = 'translateY(0)';
                registerBox.style.opacity = '1';
            }, 100);
        }
    }
}
</script>

<style setup>
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
</style>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');


.container {
    display: flex;
    width: 100%;
    max-width: 1000px;
    height: auto;
    min-height: 600px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 
                0 5px 10px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 4px solid rgba(255, 255, 255);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin-top: -15px;
}

.left-panel {
    flex: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
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
    max-width: 420px;
}

.register-header {
    margin-bottom: 20px;
}

.register-header h2 {
    font-size: 30px;
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
    font-size: 14px;
    text-align: center;
}

.input-group {
    margin-bottom: 15px;
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
    font-size: 15px;
}

.toggle-eye:hover {
    color: #000;
}

.input-group input {
    width: 100%;
    padding: 12px 38px 12px 38px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
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
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--primary);
    font-size: 15px;
    z-index: 2;
}

.terms-group {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    font-size: 13px;
    color: #7f8c8d;
    text-align: center;
}

.terms-group input {
    margin-right: 8px;
    width: 14px;
    height: 14px;
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
    padding: 12px;
    background: linear-gradient(135deg, #121731, #728a9c 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
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
    margin-top: 15px;
    color: #7f8c8d;
    font-size: 13px;
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

.about-link {
    text-align: center;
    margin-top: 10px;
}

.about-system {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    font-size: 13px;
    transition: all 0.3s;
}

.about-system:hover {
    color: #182848;
    text-decoration: underline;
}

.logo-circle {
    width: 180px;
    height: 180px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
}

.logo-circle img {
    max-width: 100%;
    height: auto;
}

.brand-name {
    font-size: 34px;
    font-weight: 700;
    margin-top: 10px;
    text-align: center;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    color: var(--light);
}

.decoration-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
    width: 100px;
    height: 100px;
    top: -30px;
    left: 20%;
}

.circle-2 {
    width: 190px;
    height: 190px;
    bottom: -100px;
    right: -50px;
}

.circle-3 {
    width: 90px;
    height: 90px;
    top: 45%;
    left: -60px;
}

.circle-4 {
    width: 100px;
    height: 100px;
    top: 15%;
    left: 300px;
}

        /* Responsive Styles */
        @media (max-width: 992px) {
            .container {
                flex-direction: column;
                max-height: 95vh;
                overflow: hidden;
            }
            
            .left-panel {
                order: 2;
                padding: 15px;
                flex: 1;
                overflow-y: auto;
            }
            
            .right-panel {
                order: 1;
                padding: 20px;
                flex: 0.6;
            }
            
            .register-box {
                max-width: 100%;
                transform: scale(0.9);
            }
            
            .circle-4 {
                left: 80%;
            }
            
            .logo-circle {
                width: 100px;
                height: 100px;
            }
            
            .brand-name {
                font-size: 24px;
            }
        }

        @media (max-width: 768px) {
            .container {
                border-radius: 15px;
                max-height: 95vh;
            }
            
            .left-panel {
                padding: 15px;
            }
            
            .right-panel {
                padding: 15px;
            }
            
            .register-header h2 {
                font-size: 22px;
            }
            
            .brand-name {
                font-size: 20px;
            }
            
            .logo-circle {
                width: 80px;
                height: 80px;
            }
            
            .circle-1, .circle-2, .circle-3, .circle-4 {
                display: none;
            }
            
            .input-group {
                margin-bottom: 10px;
            }
            
            .input-group input {
                padding: 8px 8px 8px 30px;
                font-size: 12px;
            }
            
            .toggle-eye {
        font-size: 12px;
        right: 10px;
    }
    
    .input-group i:not(.toggle-eye) {
        font-size: 12px;
        left: 10px;
    }
}

        @media (max-width: 576px) {
            body {
                padding: 10px;
            }
            
            .container {
                border-width: 2px;
                max-height: 95vh;
            }
            
            .left-panel {
                padding: 10px;
            }
            
            .register-box {
                transform: scale(0.85);
            }
            
            .terms-group {
                flex-wrap: wrap;
                font-size: 11px;
            }
            
            .register-button {
                padding: 8px;
                font-size: 12px;
            }
            
            .login-text, .about-system {
                font-size: 11px;
            }
            
            .right-panel {
                padding: 10px;
            }
            
            .logo-circle {
                width: 70px;
                height: 70px;
            }
            
            .brand-name {
                font-size: 18px;
            }
        }

        @media (max-width: 400px) {
            .register-header h2 {
                font-size: 20px;
            }
            
            .register-header p {
                font-size: 11px;
            }
            
            .brand-name {
                font-size: 16px;
            }
            
            .logo-circle {
                width: 60px;
                height: 60px;
            }
            
            .register-box {
                transform: scale(0.8);
            }
        
            .input-group input {
        padding: 8px 25px 8px 25px;
    }
    
    .toggle-eye {
        font-size: 11px;
        right: 8px;
    }
}

        /* For very small devices */
        @media (max-width: 350px) {
            .terms-group {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .terms-group input {
                margin-bottom: 4px;
            }
            
            .register-box {
                transform: scale(0.75);
            }
            
            .input-group input {
        padding: 6px 22px 6px 22px;
        font-size: 11px;
    }
    
    .toggle-eye {
        font-size: 10px;
        right: 6px;
    }
}
        @media (min-height: 1000px) {
            .container {
                min-height: 600px;
                max-height: 80vh;
            }
        }
        
        .left-panel::-webkit-scrollbar {
            width: 0;
            background: transparent;
        }
</style>