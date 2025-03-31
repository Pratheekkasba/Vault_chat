This project is a real-time chat application built with HTML, CSS, JavaScript, and Socket.io. It allows users to:

✅ Create unique chat sessions.

🔗 Connect to a session using a generated session code.

💬 Chat with other connected users in real-time.

📂 Project Structure
bash
Copy
Edit
/chat-app
├── /public
│   ├── index.html           # Homepage for creating/joining sessions
│   ├── chat.html            # Chat interface
│   ├── /css
│   │   └── styles.css       # Basic styling
│   └── /js
│       ├── client.js        # Client-side JavaScript (socket handling)
│       └── chat.js          # Chat functionality
├── /server
│   └── server.js            # Node.js + Socket.io backend
└── README.md                # Project documentation
🚀 Features
Create a Chat Session:

Generate a unique session code.

Connect multiple users to the session.

Join an Existing Session:

Enter the session code and join the session.

Real-Time Communication:

Messages are broadcasted instantly to all users in the session.

Session Management:

Track active sessions and manage participants.

📦 Installation and Setup
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/chat-app.git
cd chat-app
2. Install Dependencies
bash
Copy
Edit
# Navigate to the server directory
cd server

# Install Node.js dependencies
npm install
3. Run the Server
bash
Copy
Edit
# Start the Node.js server
node server.js
4. Open in Browser
Visit:

arduino
Copy
Edit
http://localhost:3000
⚡️ Usage
1. Creating a Session
Enter your name and confirm that you are 18+.

Click the "Create Session" button.

Copy the generated session code and share it with other participants.

2. Joining a Session
Enter the session code and your name.

Click the "Connect" button to join the chat.

🛠️ Technologies Used
Frontend:

HTML, CSS, JavaScript

Socket.io (Client)

Backend:

Node.js

Express

Socket.io (Server)

📚 API Reference
🔹 socket.emit('createSession', { name })
Triggered when a user creates a new session.

Sends the name to the server.

🔹 socket.on('sessionCreated', { sessionCode })
Received when the session is successfully created.

Returns the sessionCode to the client.

📝 To-Do List
 Add chat room authentication.

 Implement session expiry after inactivity.

 Enhance the UI with responsive design.

 Add a typing indicator.

🤝 Contributing
Contributions, issues, and feature requests are welcome!

Fork the repository.

Create a new branch (feature-name).

Commit your changes.

Submit a pull request.

🛡️ License
This project is licensed under the MIT License.

📧 Contact
For any questions or suggestions:

Email: manipratheek.kasubha@gmail.com

GitHub: Pratheekkasba
