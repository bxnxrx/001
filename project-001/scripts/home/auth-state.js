document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const guestLinks = document.querySelectorAll('.guest-links');
    const userNoProfileEl = document.querySelector('.user-no-profile');
    const userWithProfileEl = document.querySelector('.user-with-profile');
    const navUsernameEl = document.querySelector('.nav-username');
    const navAvatarEl = document.querySelector('.nav-avatar');
    
    // Check if user is logged in (this would typically interact with your authentication system)
    function checkUserState() {
        // For demonstration, we'll use localStorage
        // In a real app, this would check your authentication system (Firebase, etc.)
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        const hasProfile = localStorage.getItem('userHasProfile') === 'true';
        const username = localStorage.getItem('username');
        const avatarType = localStorage.getItem('avatarType');
        
        if (isLoggedIn) {
            // Hide guest links
            guestLinks.forEach(link => link.style.display = 'none');
            
            if (hasProfile) {
                // Show user with profile
                userWithProfileEl.style.display = 'block';
                userNoProfileEl.style.display = 'none';
                
                // Update profile info
                if (username) navUsernameEl.textContent = username;
                if (avatarType) {
                    navAvatarEl.src = avatarType === 'boy' 
                        ? '../../assests/profile_creation/avatarboy.png'
                        : '../../assests/profile_creation/avatargirl.png';
                }
            } else {
                // Show user without profile
                userNoProfileEl.style.display = 'block';
                userWithProfileEl.style.display = 'none';
            }
        } else {
            // Show guest links, hide user elements
            guestLinks.forEach(link => link.style.display = 'block');
            userNoProfileEl.style.display = 'none';
            userWithProfileEl.style.display = 'none';
        }
    }
    
    // Initial check when page loads
    checkUserState();
});
