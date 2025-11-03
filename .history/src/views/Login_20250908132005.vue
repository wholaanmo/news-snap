<template>
    <div class="container">
        <div class="logo-section">
            <div class="logo">
                <i class="fas fa-hands-helping"></i>
            </div>
            <h1>CommuniTrade</h1>
            <p class="tagline">Connecting communities through trade</p>
        </div>
        
        <div class="login-box">
            <div class="welcome-text">
                <h2>Welcome back</h2>
                <p>Log in to track your offers and connect with those in need.</p>
            </div>
            
            <form id="loginForm">
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" class="input-field" placeholder="Enter your username" required>
                </div>
                
                <div class="input-group">
                    <label for="password">Password</label>
                    <div class="password-container">
                        <input type="password" id="password" class="input-field" placeholder="Enter your password" required>
                        <span class="toggle-password" id="togglePassword">
                            <i class="far fa-eye"></i>
                        </span>
                    </div>
                </div>
                
                <button type="submit" class="login-button">Log In</button>
                
                <div class="signup-text">
                    Don't have an account? <a href="#" class="signup-link" id="signUpLink">Sign Up</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            const togglePassword = document.getElementById('togglePassword');
            const passwordInput = document.getElementById('password');
            const loginForm = document.getElementById('loginForm');
            const signUpLink = document.getElementById('signUpLink');
            
            // Toggle password visibility
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Toggle eye icon
                const eyeIcon = this.querySelector('i');
                eyeIcon.classList.toggle('fa-eye');
                eyeIcon.classList.toggle('fa-eye-slash');
            });
            
            // Form submission
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would normally handle login logic
                console.log('Login attempted with:', {
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value
                });
                
                // Show a success message (in a real app, this would be after successful authentication)
                alert('Login successful! Redirecting...');
            });
            
            // Sign up link
            signUpLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Redirecting to sign up page...');
                // In a real application, you would redirect to the sign-up page
                // window.location.href = 'signup.html';
            });
        });
    </script>

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
            --accent: #3a7bd5;
            --white: #ffffff;
        }
        
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 420px;
        }
        
        .logo-section {
            text-align: center;
            margin-bottom: 30px;
            animation: fadeIn 1s ease;
        }
        
        .logo-section h1 {
            color: var(--primary);
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        
        .logo {
            color: var(--primary);
            font-size: 3rem;
            margin-bottom: 5px;
        }
        
        .tagline {
            color: var(--grey);
            font-size: 1rem;
            font-weight: 500;
        }
        
        .login-box {
            background-color: var(--white);
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            padding: 35px 30px;
            width: 100%;
            animation: slideUp 0.8s ease;
        }
        
        .welcome-text {
            margin-bottom: 25px;
        }
        
        .welcome-text h2 {
            color: var(--primary);
            font-size: 1.8rem;
            margin-bottom: 8px;
        }
        
        .welcome-text p {
            color: var(--grey);
            font-size: 0.95rem;
            line-height: 1.5;
        }
        
        .input-group {
            margin-bottom: 20px;
        }
        
        .input-group label {
            display: block;
            color: var(--primary);
            font-weight: 500;
            margin-bottom: 8px;
            font-size: 0.9rem;
        }
        
        .input-field {
            width: 100%;
            padding: 14px 15px;
            border: 1.5px solid #e1e5eb;
            border-radius: 8px;
            font-size: 1rem;
            color: var(--primary);
            transition: all 0.3s ease;
        }
        
        .input-field:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(58, 123, 213, 0.2);
        }
        
        .input-field::placeholder {
            color: #aab7c5;
        }
        
        .password-container {
            position: relative;
        }
        
        .toggle-password {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--grey);
            cursor: pointer;
        }
        
        .login-button {
            width: 100%;
            background-color: var(--primary);
            color: var(--white);
            border: none;
            border-radius: 8px;
            padding: 14px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-top: 10px;
        }
        
        .login-button:hover {
            background-color: #243447;
        }
        
        .signup-text {
            text-align: center;
            margin-top: 25px;
            color: var(--grey);
            font-size: 0.9rem;
        }
        
        .signup-link {
            color: var(--accent);
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
        }
        
        .signup-link:hover {
            color: #2a63b3;
            text-decoration: underline;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @media (max-width: 480px) {
            .login-box {
                padding: 25px 20px;
            }
            
            .logo-section h1 {
                font-size: 2rem;
            }
            
            .logo {
                font-size: 2.5rem;
            }
        }
    </style>