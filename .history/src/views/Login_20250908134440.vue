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
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
}

.container {
    display: flex;
    width: 850px;
    height: 550px;
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
}

.input-group {
    margin-bottom: 25px;
    position: relative;
}

.input-group input {
    width: 100%;
    padding: 15px 15px 15px 45px;
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

.input-group i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #7f8c8d;
    font-size: 18px;
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
        width: 100%;
        max-width: 500px;
    }
    
    .left-panel {
        padding: 30px;
    }
    
    .right-panel {
        padding: 30px;
    }
}
</style>