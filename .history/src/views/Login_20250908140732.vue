<template>
    <section id="home" class="hero-section">
        <div class="hero-content">
            <div class="logo-container">
                <div class="logo-icon">
                    <i class="fas fa-hands-helping"></i>
                </div>
                <h1 class="logo">CommuniTrade</h1>
            </div>
            
            <h2 class="welcome-text">Welcome Back!</h2>
            <p class="subtitle">Log in to track your offers and connect with those in need.</p>
            
            <form class="login-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="Enter your username">
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password">
                </div>
                
                <button type="submit" class="login-btn">Log In</button>
                
                <p class="signup-text">Don't have an account? <a href="#">Sign Up</a></p>
            </form>
        </div>
        
        <div class="hero-image">
            <div class="image-container">
                <img src="https://images.unsplash.com/photo-1577674746607-95162ec6e5af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Community helping each other" class="hero-img">
                <p class="image-quote">A <span class="design">Money-Free</span> Way <br> to Exchange <span class="design">Skills</span></p>
            </div>
        </div>
    </section>
</template>

<style> 
        
        .hero-section {
            display: flex;
            min-height: 100vh;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            align-items: center;
            gap: 30px;
        }
        
        .hero-content {
            flex: 1;
            padding: 40px;
            background: linear-gradient(135deg, #4e54c8, #8f94fb);
            border-radius: 20px;
            color: white;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 600px;
            position: relative;
            overflow: hidden;
        }
        
        .hero-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.1" d="M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,218.7C672,224,768,160,864,138.7C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat;
            background-size: cover;
            background-position: center;
            opacity: 0.3;
        }
        
        .logo-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .logo {
            font-size: 2.8rem;
            font-weight: 800;
            margin-bottom: 10px;
            color: #fff;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .logo-icon {
            font-size: 42px;
            color: #ffd700;
            margin-bottom: 15px;
            background: rgba(255, 255, 255, 0.2);
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .welcome-text {
            font-size: 2.2rem;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .subtitle {
            font-size: 1.1rem;
            margin-bottom: 40px;
            text-align: center;
            opacity: 0.9;
            max-width: 400px;
            align-self: center;
        }
        
        .login-form {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
        }
        
        .form-group {
            margin-bottom: 20px;
            width: 100%;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .form-group input {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .form-group input:focus {
            outline: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
        }
        
        .login-btn {
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            margin-top: 10px;
        }
        
        .login-btn:hover {
            background: #ff5252;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        
        .signup-text {
            text-align: center;
            margin-top: 25px;
            font-size: 0.95rem;
        }
        
        .signup-text a {
            color: #ffd700;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .signup-text a:hover {
            text-decoration: underline;
            color: #fff;
        }
        
        .hero-image {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .image-container {
            position: relative;
            text-align: center;
        }
        
        .hero-img {
            max-width: 100%;
            border-radius: 20px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        .image-quote {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.9);
            padding: 15px 25px;
            border-radius: 15px;
            font-weight: 600;
            color: #4e54c8;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            max-width: 80%;
        }
        
        .design {
            color: #ff6b6b;
            font-weight: 700;
        }
        
        @media (max-width: 900px) {
            .hero-section {
                flex-direction: column;
                padding: 20px;
            }
            
            .hero-content, .hero-image {
                width: 100%;
            }
            
            .hero-image {
                order: -1;
                margin-bottom: 30px;
            }
            
            .hero-img {
                max-width: 90%;
            }
        }
    </style>