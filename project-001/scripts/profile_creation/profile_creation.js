// Handles profile form logic and input validation
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('profileForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const birthdayInput = document.getElementById('birthday');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Password toggle elements
    const passwordToggle = document.getElementById('passwordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const passwordCount = document.getElementById('passwordCount');
    const confirmPasswordCount = document.getElementById('confirmPasswordCount');

    // Error elements
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const birthdayError = document.getElementById('birthdayError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Date picker elements
    const datePickerBtn = document.getElementById('datePicker');
    const datePickerModal = document.getElementById('datePickerModal');
    const currentMonthEl = document.getElementById('currentMonth');
    const currentYearEl = document.getElementById('currentYear');
    const calendarDaysEl = document.getElementById('calendarDays');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const cancelDateBtn = document.getElementById('cancelDate');
    const okDateBtn = document.getElementById('okDate');

    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d.*\d)[a-zA-Z0-9!@#$%^&*]{8,}$/;

    // Current selected date
    let currentDate = new Date();
    let selectedDate = null;

    // Password visibility toggle functionality
    function setupPasswordToggle(inputElement, toggleElement, countElement) {
        if (toggleElement) {
            toggleElement.addEventListener('click', function() {
                if (inputElement.type === 'password') {
                    // Show password
                    inputElement.type = 'text';
                    toggleElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
                    // Update character count
                    updateCharCount(inputElement, countElement);
                } else {
                    // Hide password
                    inputElement.type = 'password';
                    toggleElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
                    // Reset character count display
                    countElement.textContent = '-';
                }
            });
        }
    }

    // Update character count display
    function updateCharCount(inputElement, countElement) {
        if (inputElement.type === 'password') {
            countElement.textContent = '-';
        } else {
            countElement.textContent = inputElement.value.length;
        }
    }

    // Setup password toggles
    setupPasswordToggle(passwordInput, passwordToggle, passwordCount);
    setupPasswordToggle(confirmPasswordInput, confirmPasswordToggle, confirmPasswordCount);

    // Input listeners for password fields
    passwordInput.addEventListener('input', function() {
        if (this.type === 'text') {
            updateCharCount(this, passwordCount);
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        if (this.type === 'text') {
            updateCharCount(this, confirmPasswordCount);
        }
    });

    // Validation functions
    function validateFirstName() {
        if (!firstNameInput.value.trim()) {
            firstNameError.textContent = 'First name is required';
            firstNameInput.classList.add('invalid');
            firstNameInput.classList.remove('valid');
            return false;
        }
        firstNameError.textContent = '';
        firstNameInput.classList.remove('invalid');
        firstNameInput.classList.add('valid');
        return true;
    }

    function validateLastName() {
        if (!lastNameInput.value.trim()) {
            lastNameError.textContent = 'Last name is required';
            lastNameInput.classList.add('invalid');
            lastNameInput.classList.remove('valid');
            return false;
        }
        lastNameError.textContent = '';
        lastNameInput.classList.remove('invalid');
        lastNameInput.classList.add('valid');
        return true;
    }

    // Modified username validation function to check for letters only
    function validateUsername() {
        if (!usernameInput.value.trim()) {
            usernameError.textContent = 'Username is required';
            usernameInput.classList.add('invalid');
            usernameInput.classList.remove('valid');
            return false;
        }

        if (usernameInput.value.trim().length < 5) {
            usernameError.textContent = 'Username must be at least 5 characters';
            usernameInput.classList.add('invalid');
            usernameInput.classList.remove('valid');
            return false;
        }

        // Check if username contains only letters
        if (!/^[a-zA-Z]+$/.test(usernameInput.value.trim())) {
            usernameError.textContent = 'Username must contain only letters';
            usernameInput.classList.add('invalid');
            usernameInput.classList.remove('valid');
            return false;
        }

        usernameError.textContent = '';
        usernameInput.classList.remove('invalid');
        usernameInput.classList.add('valid');
        return true;
    }

    function validateEmail() {
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
            return false;
        }
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
            return false;
        }
        emailError.textContent = '';
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
        return true;
    }

    function validateBirthday() {
        if (!birthdayInput.value.trim()) {
            birthdayError.textContent = 'Birthday is required';
            birthdayInput.classList.add('invalid');
            birthdayInput.classList.remove('valid');
            return false;
        }

        const parts = birthdayInput.value.split('-');
        if (parts.length !== 3) {
            birthdayError.textContent = 'Use DD-MM-YYYY format';
            birthdayInput.classList.add('invalid');
            birthdayInput.classList.remove('valid');
            return false;
        }

        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        const dateObj = new Date(year, month, day);
        const today = new Date();

        if (
            isNaN(dateObj) ||
            dateObj.getDate() !== day ||
            dateObj.getMonth() !== month ||
            dateObj.getFullYear() !== year ||
            dateObj > today
        ) {
            birthdayError.textContent = 'Invalid or future date';
            birthdayInput.classList.add('invalid');
            birthdayInput.classList.remove('valid');
            return false;
        }

        birthdayError.textContent = '';
        birthdayInput.classList.remove('invalid');
        birthdayInput.classList.add('valid');
        return true;
    }

    function validatePassword() {
        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('invalid');
            passwordInput.classList.remove('valid');
            return false;
        }

        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('invalid');
            passwordInput.classList.remove('valid');
            return false;
        }

        // Check if password contains at least 2 numbers
        const digitCount = (passwordInput.value.match(/\d/g) || []).length;
        if (digitCount < 2) {
            passwordError.textContent = 'Password must include at least 2 numbers';
            passwordInput.classList.add('invalid');
            passwordInput.classList.remove('valid');
            return false;
        }

        passwordError.textContent = '';
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
        return true;
    }

    function validateConfirmPassword() {
        if (!confirmPasswordInput.value.trim()) {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordInput.classList.add('invalid');
            confirmPasswordInput.classList.remove('valid');
            return false;
        }

        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordInput.classList.add('invalid');
            confirmPasswordInput.classList.remove('valid');
            return false;
        }

        confirmPasswordError.textContent = '';
        confirmPasswordInput.classList.remove('invalid');
        confirmPasswordInput.classList.add('valid');
        return true;
    }

    // Format birthday input while typing
    birthdayInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        let formattedValue = '';

        if (value.length > 0) {
            // First 2 digits (day)
            formattedValue = value.substring(0, Math.min(2, value.length));

            if (value.length > 2) {
                // Add hyphen and next 2 digits (month)
                formattedValue += '-' + value.substring(2, Math.min(4, value.length));

                if (value.length > 4) {
                    // Add hyphen and remaining digits (year)
                    formattedValue += '-' + value.substring(4, Math.min(8, value.length));
                }
            }
        }

        this.value = formattedValue;
    });

    // Custom Date Picker
    function updateCalendar(date) {
        currentMonthEl.textContent = date.toLocaleString('default', { month: 'long' });
        currentYearEl.textContent = date.getFullYear();

        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        calendarDaysEl.innerHTML = '';

        // Add empty slots for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'date-picker-day date-disabled';
            calendarDaysEl.appendChild(emptyDay);
        }

        // Add days of the month
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'date-picker-day';
            dayEl.textContent = i;

            const currentDateObj = new Date(date.getFullYear(), date.getMonth(), i);

            // Check if this day is today
            if (
                currentDateObj.getDate() === today.getDate() &&
                currentDateObj.getMonth() === today.getMonth() &&
                currentDateObj.getFullYear() === today.getFullYear()
            ) {
                dayEl.classList.add('date-today');
            }

            // Check if this day is the selected date
            if (selectedDate &&
                currentDateObj.getDate() === selectedDate.getDate() &&
                currentDateObj.getMonth() === selectedDate.getMonth() &&
                currentDateObj.getFullYear() === selectedDate.getFullYear()) {
                dayEl.classList.add('date-selected');
            }

            // Disable future dates
            if (currentDateObj > today) {
                dayEl.classList.add('date-disabled');
            } else {
                dayEl.addEventListener('click', function() {
                    // Remove selected class from all days
                    document.querySelectorAll('.date-picker-day').forEach(el => {
                        el.classList.remove('date-selected');
                    });

                    // Add selected class to clicked day
                    this.classList.add('date-selected');

                    // Update selected date
                    selectedDate = new Date(date.getFullYear(), date.getMonth(), i);
                });
            }

            calendarDaysEl.appendChild(dayEl);
        }
    }

    // Date Picker Controls
    if (datePickerBtn) {
        datePickerBtn.addEventListener('click', function() {
            // Initialize calendar with current date
            updateCalendar(currentDate);

            // Show date picker modal
            datePickerModal.style.display = 'flex';
        });
    }

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar(currentDate);
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() + 1);

            // Don't allow scrolling to future months
            if (newDate > new Date()) return;

            currentDate = newDate;
            updateCalendar(currentDate);
        });
    }

    if (cancelDateBtn) {
        cancelDateBtn.addEventListener('click', function() {
            datePickerModal.style.display = 'none';
        });
    }

    if (okDateBtn) {
        okDateBtn.addEventListener('click', function() {
            if (selectedDate) {
                // Format as DD-MM-YYYY
                const day = selectedDate.getDate().toString().padStart(2, '0');
                const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                const year = selectedDate.getFullYear();

                birthdayInput.value = `${day}-${month}-${year}`;
                validateBirthday();
            }

            datePickerModal.style.display = 'none';
        });
    }

    // Click outside to close modal
    window.addEventListener('click', function(e) {
        if (e.target === datePickerModal) {
            datePickerModal.style.display = 'none';
        }
    });

    // Add validation on blur
    firstNameInput.addEventListener('blur', function() {
        validateWithLoading(firstNameInput, validateFirstName);
    });
    lastNameInput.addEventListener('blur', function() {
        validateWithLoading(lastNameInput, validateLastName);
    });
    usernameInput.addEventListener('blur', function() {
        if (usernameInput.value.trim().length > 0) {
            validateWithLoading(usernameInput, validateUsername);
        } else {
            validateUsername(); // Immediate validation for empty field
        }
    });
    emailInput.addEventListener('blur', validateEmail);
    birthdayInput.addEventListener('blur', validateBirthday);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

    // Validate confirm password on password change
    passwordInput.addEventListener('input', function() {
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });

    // Avatar selection
    const avatars = document.querySelectorAll('.avatar');
    avatars.forEach(avatar => {
        avatar.addEventListener('click', function() {
            avatars.forEach(a => a.classList.remove('avatar-selected'));
            this.classList.add('avatar-selected');
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isBirthdayValid = validateBirthday();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        // Submit if all validations pass
        if (isFirstNameValid && isLastNameValid && isUsernameValid &&
            isEmailValid && isBirthdayValid && isPasswordValid && isConfirmPasswordValid) {

            // Show loading state
            const submitBtn = document.querySelector('.submit-button');
            submitBtn.classList.add('loading');

            // Simulate form submission
            setTimeout(() => {
                alert('Profile created successfully!');
                submitBtn.classList.remove('loading');
            }, 1500);
        }
    });

    // Update username validation with loading state and proper icon sequence
    usernameInput.addEventListener('input', function() {
        // Clear previous validation state and hide all icons
        usernameInput.classList.remove('valid', 'invalid');

        // Only show loading if the field has value
        if (usernameInput.value.trim().length > 0) {
            // Add validating state and show loading
            usernameInput.classList.add('validating');

            // Set timeout to simulate processing
            clearTimeout(usernameInput.timer);
            usernameInput.timer = setTimeout(() => {
                // Remove validating state (this hides the loading icon)
                usernameInput.classList.remove('validating');
                // Call the actual validation function (this shows checkmark or X)
                validateUsername();
            }, 1000); // 1 second delay
        }
    });

    // Update username validation with loading state and proper icon sequence
    usernameInput.addEventListener('input', function() {
        // Clear previous validation states and hide all icons
        usernameInput.classList.remove('valid', 'invalid', 'validating');

        // Only show loading if the field has value
        if (usernameInput.value.trim().length > 0) {
            // Add validating state and show loading
            usernameInput.classList.add('validating');

            // Set timeout to simulate processing
            clearTimeout(usernameInput.timer);
            usernameInput.timer = setTimeout(() => {
                // Remove validating state (this hides the loading icon)
                usernameInput.classList.remove('validating');
                // Call the actual validation function (this shows checkmark or X)
                validateUsername();
            }, 1000); // 1 second delay
        }
    });
});

// Enhanced validation function with loading state
function validateWithLoading(inputElement, validationFn) {
    // Clear previous validation state
    inputElement.classList.remove('valid', 'invalid');
    // Add validating state
    inputElement.classList.add('validating');

    // Set timeout to simulate server validation
    setTimeout(() => {
        // Remove validating state
        inputElement.classList.remove('validating');
        // Call the actual validation function
        validationFn();
    }, 2000); // 2 second delay
}
document.addEventListener("DOMContentLoaded", () => {
    const avatarImages = document.querySelectorAll(".avatar");

    avatarImages.forEach((img) => {
        img.addEventListener("click", () => {
            avatarImages.forEach((avatar) => avatar.classList.remove("avatar-selected"));
            img.classList.add("avatar-selected");
        });
    });
});

function goForward() {
    window.location.href = "../../html/Profile_CardPage/Profile_CardPage.html";
}