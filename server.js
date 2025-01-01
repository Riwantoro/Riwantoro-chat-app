const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io'); // Import Socket.IO

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Initialize Socket.IO

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Store messages in memory
let messages = [];

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send existing messages to the newly connected user
    socket.emit('initial-messages', messages);

    // Handle new messages
    socket.on('send-message', (message) => {
        if (message) {
            messages.push(message); // Add the message to the list
            io.emit('new-message', message); // Broadcast the message to all clients
        }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});