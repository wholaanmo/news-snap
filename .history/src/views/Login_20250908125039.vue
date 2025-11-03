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
            <p class="tagline">Connect, trade, and grow with our community platform</p>
        </div>
        
        <!-- Right Panel with Login Form -->
        <div class="right-panel">
            <div class="login-box">
                <div class="login-header">
                    <h2>Welcome Back</h2>
                    <p>Please enter your details to sign in</p>
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