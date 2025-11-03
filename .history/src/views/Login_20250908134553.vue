<template>
       <section id="home" class="hero-section">
        <div class="hero-content">
            <div class="hero-container">
                <div class="logo-container">
                    <div class="logo">CommuniTrade</div>
                    <div class="logo-icon">CT</div>
                </div>
                <h1 class="hero-title">Welcome to <span class="highlight">CommuniTrade</span></h1>
                <p class="hero-subtitle">Your platform for community-based trading and sharing of skills and services without using money. Connect with your neighbors to exchange what you can do, share resources, and build a stronger community together.</p>
                <div class="hero-buttons">
                    <a href="#services" class="cta-button primary">Learn More</a>
                </div>
            </div>
        </div>
        <div class="hero-image">
            <div class="login-container">
                <h2 class="login-title">Login to Your Account</h2>
                <form>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Enter your username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password">
                    </div>
                    <button type="submit" class="login-button">Login</button>
                </form>
                <p class="signup-text">Don't have an account? <a href="#" class="signup-link">Sign Up</a></p>
            </div>
            <p class="image-quote">A <span class="design">Money-Free</span> Way <br> to Exchange <span class="design">Skills</span></p>
        </div>
    </section>
</template>

<style>
        
        body {
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
        }
        
        .hero-section {
            display: flex;
            min-height: 100vh;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            align-items: center;
        }
        
        .hero-content {
            flex: 1;
            padding: 40px;
        }
        
        .logo-container {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .logo {
            font-size: 32px;
            font-weight: bold;
            color: #4CAF50;
            margin-right: 10px;
        }
        
        .logo-icon {
            width: 40px;
            height: 40px;
            background-color: #4CAF50;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        
        .hero-title {
            font-size: 2.8rem;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        
        .highlight {
            color: #4CAF50;
            font-weight: bold;
        }
        
        .hero-subtitle {
            font-size: 1.2rem;
            margin-bottom: 30px;
            color: #555;
            max-width: 90%;
        }
        
        .hero-buttons {
            margin-top: 30px;
        }
        
        .cta-button {
            display: inline-block;
            padding: 12px 30px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
            margin-right: 15px;
        }
        
        .primary {
            background-color: #4CAF50;
            color: white;
            border: 2px solid #4CAF50;
        }
        
        .primary:hover {
            background-color: #3e8e41;
            border-color: #3e8e41;
        }
        
        .hero-image {
            flex: 1;
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
            border-radius: 20px;
            padding: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            color: white;
        }
        
        .login-container {
            background: white;
            padding: 30px;
            border-radius: 15px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .login-title {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 25px;
            font-size: 1.8rem;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 500;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            transition: border 0.3s ease;
        }
        
        .form-group input:focus {
            border-color: #4CAF50;
            outline: none;
        }
        
        .login-button {
            width: 100%;
            padding: 12px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .login-button:hover {
            background-color: #3e8e41;
        }
        
        .signup-text {
            text-align: center;
            margin-top: 20px;
            color: #555;
        }
        
        .signup-link {
            color: #4CAF50;
            text-decoration: none;
            font-weight: 500;
        }
        
        .signup-link:hover {
            text-decoration: underline;
        }
        
        .image-quote {
            text-align: center;
            margin-top: 30px;
            font-size: 1.2rem;
            font-style: italic;
        }
        
        .design {
            font-weight: bold;
            text-decoration: underline;
        }
        
        @media (max-width: 900px) {
            .hero-section {
                flex-direction: column;
                padding: 40px 20px;
            }
            
            .hero-content, .hero-image {
                width: 100%;
                padding: 30px;
            }
            
            .hero-image {
                margin-top: 40px;
            }
        }
</style>