const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Store messages in memory
let messages = [];

// Endpoint to send a message
app.post('/send-message', express.json(), (req, res) => {
    const { message } = req.body;
    if (message) {
        messages.push(message); // Add the message to the list
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false, error: 'Message is required' });
    }
});

// Endpoint to fetch messages
app.get('/get-messages', (req, res) => {
    res.status(200).json({ messages });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
