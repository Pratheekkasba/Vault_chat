const socket = io({
    reconnection: true,         // Reconnect automatically
    reconnectionAttempts: 10,   // Number of retries before failing
    reconnectionDelay: 2000     // Delay between reconnection attempts (2 seconds)
});

// Store session details in localStorage for auto-reconnection
function saveSessionDetails(name, sessionCode) {
    localStorage.setItem('sessionDetails', JSON.stringify({ name, sessionCode }));
}

// On page load, reconnect if session data exists
window.addEventListener('load', () => {
    const sessionDetails = JSON.parse(localStorage.getItem('sessionDetails'));
    if (sessionDetails) {
        socket.emit('joinSession', sessionDetails);
    }
});

// Create Session
function createSession() {
    const name = document.getElementById('createName').value.trim();
    const isChecked = document.getElementById('createCheckbox').checked;

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (!isChecked) {
        alert("Please confirm that you are 18 or above.");
        return;
    }
}

    function createSession() {
        const name = document.getElementById('createName').value.trim();
        const isChecked = document.getElementById('createCheckbox').checked;
    
        if (!name) {
            alert("Please enter your name.");
            return;
        }
    
        if (!isChecked) {
            alert("Please confirm that you are 18 or above.");
            return;
        }
    
        // Emit createSession event to the server
        socket.emit('createSession', { name });
    }
    
    // Handle session creation on client side
    socket.on('sessionCreated', (data) => {
        console.log('✅ Session created successfully:', data);
    
        const sessionCode = data.sessionCode;
        const name = document.getElementById('createName').value.trim();
    
        const outputDiv = document.getElementById('createOutput');
        const outputMessage = document.getElementById('outputMessage');
        outputMessage.innerHTML = `Welcome, ${name}!<br>Your Unique ID: <strong>${sessionCode}</strong>`;
    
        outputDiv.classList.remove('hidden');
    
        const connectBtn = document.getElementById('connectBtn');
        connectBtn.classList.remove('hidden');
    
        // Redirect to chat page on Connect button click
        connectBtn.onclick = function () {
            window.location.href = `chat.html?name=${encodeURIComponent(name)}&session=${sessionCode}`;
        };
    });
    

// Join Session
function joinSession() {
    const name = document.getElementById('joinName').value.trim();
    const sessionCode = document.getElementById('sessionCode').value.trim();

    if (!name || !sessionCode) {
        alert("Please enter your name and session code.");
        return;
    }

    socket.emit('joinSession', { name, sessionCode });
}

// Handle Successful Session Join
socket.on('sessionJoined', () => {
    const name = document.getElementById('joinName').value.trim();
    const sessionCode = document.getElementById('sessionCode').value.trim();
    window.location.href = `chat.html?name=${encodeURIComponent(name)}&session=${sessionCode}`;
});

// Handle Errors
socket.on('error', (data) => {
    alert(data.message);
});

// Sending Chat Messages
function sendMessage() {
    const message = document.getElementById('messageInput').value.trim();
    const userName = new URLSearchParams(window.location.search).get('name');
    const sessionCode = new URLSearchParams(window.location.search).get('session');

    if (!message) return;

    socket.emit('sendMessage', { message, sender: userName, sessionCode });

    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML += `<div class="message sent"><strong>${userName}:</strong> ${message}</div>`;
    document.getElementById('messageInput').value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Receiving Chat Messages
socket.on('receiveMessage', (data) => {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML += `<div class="message received"><strong>${data.sender}:</strong> ${data.message}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Show Create / Join Sections
function showCreate() {
    document.getElementById('createSession').classList.remove('hidden');
    document.getElementById('joinSession').classList.add('hidden');
    document.getElementById('connectBtn').classList.add('hidden'); // Ensure this resets
}

function showJoin() {
    document.getElementById('createOutput').classList.add('hidden');
    document.getElementById('outputMessage').innerHTML = "";
    document.getElementById('connectBtn').classList.add('hidden'); // Ensure this resets
    document.getElementById('joinSession').classList.remove('hidden');
    document.getElementById('createSession').classList.add('hidden');
}

socket.on('reconnect_attempt', () => {
    console.log('🔄 Reconnecting...');
});

socket.on('reconnect', (attemptNumber) => {
    console.log(`✅ Reconnected successfully after ${attemptNumber} attempts.`);
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected. Attempting to reconnect...');
});

