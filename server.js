// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
});

// Serve static files correctly
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Setup
mongoose.connect('mongodb://localhost/vaultchat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// MongoDB Session Schema
const sessionSchema = new mongoose.Schema({
    sessionCode: String,
    participants: [String],
    createdAt: { type: Date, default: Date.now, expires: '1h' },
});
const Session = mongoose.model('Session', sessionSchema);

// Socket.IO Logic
io.on('connection', (socket) => {
    console.log('✅ A user connected:', socket.id);

    socket.on('createSession', async (data) => {
        const { name } = data;
        const sessionCode = Math.floor(1000 + Math.random() * 9000).toString();

        const newSession = new Session({ sessionCode, participants: [name] });
        await newSession.save();

        socket.join(sessionCode);
        socket.emit('sessionCreated', { sessionCode });

        console.log(`✅ Session created: ${sessionCode} by ${name}`);
    });

    socket.on('joinSession', async (data) => {
        const { name, sessionCode } = data;
        const session = await Session.findOne({ sessionCode });

        if (session) {
            session.participants.push(name);
            await session.save();

            socket.join(sessionCode);
            socket.emit('sessionJoined');
            console.log(`✅ ${name} joined session: ${sessionCode}`);
        } else {
            socket.emit('error', { message: 'Session not found.' });
        }
    });

    socket.on('sendMessage', (data) => {
        const { sessionCode, message, sender } = data;
        io.to(sessionCode.toString()).emit('receiveMessage', { message, sender });
    });

    socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

// Start the Server
const PORT = 3000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
