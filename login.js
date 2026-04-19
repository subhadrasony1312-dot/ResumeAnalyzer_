document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    
    // Mobile toggles
    const mobileSignUpButton = document.getElementById('mobileSignUp');
    const mobileSignInButton = document.getElementById('mobileSignIn');
    
    const container = document.getElementById('container');
    
    // Forms
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');
    
    // UI Toggling
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    mobileSignUpButton.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('right-panel-active');
    });

    mobileSignInButton.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('right-panel-active');
    });

    // ----- SIGN UP LOGIC -----
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailOrPhone = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const errorMsg = document.getElementById('signupError');
        
        if (password !== confirmPassword) {
            errorMsg.innerText = "Passwords do not match!";
            return;
        }

        if (password.length < 6) {
            errorMsg.innerText = "Password must be at least 6 characters!";
            return;
        }

        // Check if user already exists
        const userStr = localStorage.getItem('resumeAnalyzerUsers');
        let users = userStr ? JSON.parse(userStr) : [];
        
        if (users.find(u => u.username === emailOrPhone)) {
            errorMsg.innerText = "User already exists with that email/phone!";
            return;
        }

        // Save new user
        users.push({ username: emailOrPhone, password: password });
        localStorage.setItem('resumeAnalyzerUsers', JSON.stringify(users));
        
        // Show success, switch to Sign In
        errorMsg.style.color = "#0f9d58";
        errorMsg.innerText = "Account created successfully! Please sign in.";
        
        // Auto-switch to sign-in panel after a brief pause
        setTimeout(() => {
            container.classList.remove('right-panel-active');
            document.getElementById('signinEmail').value = emailOrPhone;
            errorMsg.innerText = "";
            signUpForm.reset();
        }, 1500);
    });

    // ----- SIGN IN LOGIC -----
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailOrPhone = document.getElementById('signinEmail').value.trim();
        const password = document.getElementById('signinPassword').value;
        const errorMsg = document.getElementById('signinError');

        const userStr = localStorage.getItem('resumeAnalyzerUsers');
        let users = userStr ? JSON.parse(userStr) : [];

        const validUser = users.find(u => u.username === emailOrPhone && u.password === password);
        
        if (validUser) {
            errorMsg.style.color = "#0f9d58";
            errorMsg.innerText = "Login successful! Redirecting...";
            
            // Open the actual Render deployment in a NEW tab to prevent loading errors
            setTimeout(() => {
                window.open("https://ai-based-resume-analyzer-wk17.onrender.com/", "_blank");
            }, 800);
        } else {
            errorMsg.style.color = "#ff4b4b";
            errorMsg.innerText = "Invalid credentials. Please try again.";
        }
    });
});
