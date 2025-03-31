// chat.js
const socket = io({
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    const chatBox = document.getElementById('chatBox');

    if (!message) return;

    socket.emit('sendMessage', {
        message,
        sender: userName,
        sessionCode: new URLSearchParams(window.location.search).get('session')
    });

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'self-message');
    messageElement.innerHTML = `<strong>${userName}:</strong> ${message}`;

    chatBox.appendChild(messageElement);
    messageInput.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;
}

socket.on('receiveMessage', (data) => {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'other-message');
    messageElement.innerHTML = `<strong>${data.sender}:</strong> ${data.message}`;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

const io = require('socket.io')(server);
const sessions = {};

function generateSessionCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Handle session creation on server
io.on('connection', (socket) => {
    console.log('⚡️ New connection:', socket.id);

    socket.on('createSession', ({ name }) => {
        const sessionCode = generateSessionCode();
        sessions[sessionCode] = { host: name, users: [name] };

        console.log(`🎉 Session created by ${name} with code: ${sessionCode}`);
        socket.emit('sessionCreated', { sessionCode });
    });
});
