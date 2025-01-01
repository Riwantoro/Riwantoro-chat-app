const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Simpan pesan di memori (sementara)
let messages = [];

// Endpoint untuk mendapatkan pesan
app.get('/messages', (req, res) => {
    res.json(messages); // Kirim pesan sebagai respons JSON
});

// Endpoint untuk mengirim pesan
app.post('/messages', express.json(), (req, res) => {
    const message = req.body.message;
    if (message) {
        messages.push(message); // Simpan pesan baru
        res.status(200).send('Message sent');
    } else {
        res.status(400).send('Invalid message');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});