document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const googleButton = document.getElementById('googleButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const passwordCount = document.getElementById('passwordCount');

    // Email Pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Character Counter
    function updateCharCount() {
        const count = passwordInput.value.length;
        passwordCount.textContent = count;
    }

    // Email Validation
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

    // Password Validation
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

    // Event Listeners for Validation
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', function() {
        validatePassword();
        updateCharCount();
    });

    // Initialize the Character Counter
    updateCharCount();

    // Validation on Blur
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    // Animation Controls
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

            // Simulated Authentication Process
            setTimeout(function() {
                console.log('Login submitted successfully');
                hideLoading(loginButton);

                // Form Submission (Commented)
                // loginForm.submit();
            }, 2000);
        }
    });

    // Google Authentication
    googleButton.addEventListener('click', function() {
        showLoading(googleButton);

        // Simulated Google Auth
        setTimeout(function() {
            console.log('Google login initiated');
            hideLoading(googleButton);
            // Google Auth API Integration (Future)
        }, 1500);
    });
});
