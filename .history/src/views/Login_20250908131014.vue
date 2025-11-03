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

<style>
   * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f5f7fa;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            display: flex;
            width: 850px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .left-panel {
            flex: 1;
            background: var(--primary);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            position: relative;
        }

        .logo {
            font-size: 3.5rem;
            margin-bottom: 20px;
            font-weight: 700;
            color: var(--light);
        }

        .logo-icon {
            font-size: 5rem;
            color: var(--light);
            margin-bottom: 20px;
        }

        .tagline {
            color: var(--grey);
            text-align: center;
            font-size: 1.1rem;
            margin-top: 20px;
            line-height: 1.6;
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

        .login-header {
            margin-bottom: 30px;
        }

        .login-header h2 {
            color: var(--primary);
            font-size: 1.8rem;
            margin-bottom: 10px;
        }

        .login-header p {
            color: var(--grey);
            font-size: 0.95rem;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            color: var(--primary);
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 0.9rem;
        }

        .form-control {
            width: 100%;
            padding: 14px;
            border: 1px solid #e1e5eb;
            border-radius: 6px;
            font-size: 1rem;
            transition: all 0.3s;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(26, 37, 48, 0.1);
        }

        .btn-login {
            width: 100%;
            padding: 14px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
            margin-top: 10px;
        }

        .btn-login:hover {
            background: #233140;
        }

        .signup-text {
            text-align: center;
            margin-top: 25px;
            color: var(--grey);
            font-size: 0.9rem;
        }

        .signup-link {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s;
        }

        .signup-link:hover {
            color: #233140;
            text-decoration: underline;
        }

        @media (max-width: 900px) {
            .container {
                flex-direction: column;
                width: 100%;
                height: auto;
                margin: 20px;
            }
            
            .left-panel {
                padding: 30px 20px;
            }
            
            .right-panel {
                padding: 30px 20px;
            }
        }
</style>