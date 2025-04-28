const toggle = document.getElementById('toggle-mode');
const chatHeader = document.getElementById('chat-header');
const modeTitle = document.getElementById('mode-title');
const modeDesc = document.getElementById('mode-desc');
const modeAvatar = document.getElementById('mode-avatar');
const avatarImg = document.getElementById('avatar-img');
const botMessage = document.getElementById('bot-message');

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        // Switch to Akka mode
        chatHeader.style.backgroundColor = '#f5826e';
        modeTitle.textContent = 'Akka mode';
        modeDesc.textContent = 'kiyanna machan (sinhala)';
        modeAvatar.src = '../../'; // Change this to Akka avatar
        avatarImg.src = 'akka.png'; // Sidebar avatar
        botMessage.textContent = 'Nangi, tell me what do you wanna know ?';
        botMessage.style.backgroundColor = '#f5826e';
    } else {
        // Switch to Ayya mode
        chatHeader.style.backgroundColor = '#6488a7';
        modeTitle.textContent = 'Ayya mode';
        modeDesc.textContent = 'kiyanna machan (sinhala)';
        modeAvatar.src = ''; // Change this to Ayya avatar
        avatarImg.src = 'ayya.png'; // Sidebar avatar
        botMessage.textContent = 'Machan, what\'s on your mind today?';
        botMessage.style.backgroundColor = '#6488a7';
    }
});
