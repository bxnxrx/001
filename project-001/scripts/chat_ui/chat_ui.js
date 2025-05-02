const toggle = document.getElementById('toggle-mode');
const chatHeader = document.getElementById('chat-header');
const modeTitle = document.getElementById('mode-title');
const modeDesc = document.getElementById('mode-desc');
const modeAvatar = document.getElementById('mode-avatar');
const avatarImg = document.getElementById('avatar-img');
const botMessage = document.getElementById('bot-message');
const newChatBtn = document.getElementById('new-chat-btn');
const newChatButton = document.getElementById('new-chat-btn');
const chatMessages = document.getElementById('chat-messages');
const toggleIcon = document.getElementById('toggle-icon');
newChatButton.addEventListener('click', () => {
    chatMessages.innerHTML = '';
});



toggle.addEventListener('change', () => {
    if (toggle.checked) {
        // Switch to Akka mode
        chatHeader.style.backgroundColor = '#f5826e';
        modeTitle.textContent = 'Akka mode';
        modeDesc.textContent = 'kiyanna machan (sinhala)';
        modeAvatar.src = '../../assests/akka_chat_ui_upper.png'; // Change this to Akka avatar
        avatarImg.src = '../../assests/akka_giantavatar_chat_ui.png'; // Sidebar avatar
        botMessage.textContent = 'Nangi, කියන්න what do you wanna know ?';
        botMessage.style.backgroundColor = '#f5826e';
        newChatBtn.style.backgroundColor = '#f5826e';
        toggleIcon.src = '../../assests/akka_chat_ui_upper.png';

    } else {
        // Switch to Ayya mode
        chatHeader.style.backgroundColor = '#6488a7';
        modeTitle.textContent = 'Ayya mode';
        modeDesc.textContent = 'කියන්න මචන්';
        modeAvatar.src = '../../assests/ayya_chat_ui_upper.png'; // Change this to Ayya avatar
        avatarImg.src = '../../assests/ayya_giantavatar_chat_ui.png'; // Sidebar avatar
        botMessage.textContent = 'Machan, what\'s on your mind today?';
        botMessage.style.backgroundColor = '#6488a7';
        newChatBtn.style.backgroundColor = '#6488a7';
        toggleIcon.src = '.../../assests/ayya_chat_ui_upper.png';
    }
});

// Set default (Ayya mode) visuals on initial load
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


const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = message;
    chatMessages.appendChild(userDiv);

    userInput.value = '';

    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.textContent = data.reply;
        chatMessages.appendChild(botDiv);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bot-message error';
        errorDiv.textContent = 'Error: ' + error.message;
        chatMessages.appendChild(errorDiv);
    }
});
