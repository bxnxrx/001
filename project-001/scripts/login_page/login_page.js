document.addEventListener('DOMContentLoaded', function() {
    // UI Elements
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const googleButton = document.getElementById('googleButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const passwordCount = document.getElementById('passwordCount');
    const passwordToggle = document.getElementById('passwordToggle');

    // Validation Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password Visibility Toggle
    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
        } else {
            passwordInput.type = 'password';
            passwordToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
        }
    });

    // Password Length Display
    function updateCharCount() {
        const count = passwordInput.value.length;
        passwordCount.textContent = count;
    }

    // Email Field Validation
    function validateEmail() {
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('invalid');
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('invalid');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('invalid');
            return true;
        }
    }

    // Password Field Validation
    function validatePassword() {
        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('invalid');
            return false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('invalid');
            return false;
        } else {
            passwordError.textContent = '';
            passwordInput.classList.remove('invalid');
            return true;
        }
    }

    // Live Input Validation
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', function() {
        validatePassword();
        updateCharCount();
    });

    // Initialize Character Counter
    updateCharCount();

    // Blur Event Validation
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    // Loading State Management
    function showLoading(button) {
        button.classList.add('loading');
    }

    function hideLoading(button) {
        button.classList.remove('loading');
    }

    // Form Submission Handler
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            showLoading(loginButton);

            // Simulate Authentication Process
            setTimeout(function() {
                console.log('Login submitted successfully');
                hideLoading(loginButton);

                // Form submission - uncomment in production
                // loginForm.submit();
            }, 2000);
        }
    });

    // Social Authentication Handler
    googleButton.addEventListener('click', function() {
        showLoading(googleButton);

        // Simulate OAuth Flow
        setTimeout(function() {
            console.log('Google login initiated');
            hideLoading(googleButton);
            // Google OAuth implementation would go here
        }, 1500);
    });
});
