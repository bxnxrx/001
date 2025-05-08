const toggle = document.getElementById('toggle-mode');
const chatHeader = document.getElementById('chat-header');
const modeTitle = document.getElementById('mode-title');
const modeDesc = document.getElementById('mode-desc');
const modeAvatar = document.getElementById('mode-avatar');
const avatarImg = document.getElementById('avatar-img');
const botMessage = document.getElementById('bot-message');
const newChatBtn = document.getElementById('new-chat-btn');
const chatMessages = document.getElementById('chat-messages');
const toggleIcon = document.getElementById('toggle-icon');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

// New chat button clears chat
newChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
});

// Mode toggle handler
toggle.addEventListener('change', () => {
    const isAkka = toggle.checked;

    const modeColor = isAkka ? '#f5826e' : '#6488a7';
    const modeName = isAkka ? 'Akka mode' : 'Ayya mode';
    const modeDescText = isAkka ? 'කියන්න හලෝ 😚' : 'කියන්න මචන් 😎';
    const botWelcome = isAkka ? 'Nangi, කියන්න what do you wanna know ?' : 'Machan, what\'s on your mind today?';
    const modeAvatarSrc = isAkka ? '../../assests/akka_chat_ui_upper.png' : '../../assests/ayya_chat_ui_upper.png';
    const avatarImgSrc = isAkka ? '../../assests/akka_giantavatar_chat_ui.png' : '../../assests/ayya_giantavatar_chat_ui.png';

    chatHeader.style.backgroundColor = modeColor;
    modeTitle.textContent = modeName;
    modeDesc.textContent = modeDescText;
    modeAvatar.src = modeAvatarSrc;
    avatarImg.src = avatarImgSrc;
    botMessage.textContent = botWelcome;
    botMessage.style.backgroundColor = modeColor;
    newChatBtn.style.backgroundColor = modeColor;
    toggleIcon.src = modeAvatarSrc;

    const botMessages = document.querySelectorAll('.bot-message');
    botMessages.forEach(msg => {
        msg.style.backgroundColor = modeColor;
    });
});

// Default visuals on page load
window.addEventListener('DOMContentLoaded', () => {
    chatHeader.style.backgroundColor = '#6488a7';
    modeTitle.textContent = 'Ayya mode';
    modeDesc.textContent = 'කියන්න මචන්';
    modeAvatar.src = '../../assests/ayya_chat_ui_upper.png';
    avatarImg.src = '../../assests/ayya_giantavatar_chat_ui.png';
    botMessage.textContent = 'Machan, what\'s on your mind today?';
    botMessage.style.backgroundColor = '#6488a7';
    newChatBtn.style.backgroundColor = '#6488a7';
    toggleIcon.src = '../../assests/ayya_chat_ui_upper.png';
});

// Handle send button click
sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (!message) return;

    const mode = toggle.checked ? 'Akka' : 'Ayya';
    const color = mode === 'Akka' ? '#f5826e' : '#6488a7';
    const userBubbleColor = mode === 'Akka' ? '#fde0db' : '#d1ecf1';

    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = message;
    userDiv.style.backgroundColor = userBubbleColor;
    userDiv.style.color = '#000';
    chatMessages.appendChild(userDiv);

    userInput.value = '';

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bot-message loading';
    loadingDiv.textContent = '...';
    loadingDiv.style.backgroundColor = color;
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, mode })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        chatMessages.removeChild(loadingDiv);

        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.textContent = data.reply;
        botDiv.style.backgroundColor = color;

        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        chatMessages.removeChild(loadingDiv);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bot-message error';
        errorDiv.textContent = 'Error: ' + error.message;
        errorDiv.style.backgroundColor = color;
        chatMessages.appendChild(errorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('mobile-menu-button');
    const closeBtn = document.getElementById('sidebar-close');
    const overlay = document.getElementById('overlay');

    openBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});