const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Konfigurasi Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*", // Izinkan semua domain (atau ganti dengan URL Vercel Anda)
        methods: ["GET", "POST"],
    },
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Simpan pesan di memori (sementara)
let messages = [];

// Handle koneksi Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');

    // Kirim pesan yang sudah ada ke pengguna baru
    socket.emit('initial-messages', messages);

    // Handle pesan baru
    socket.on('send-message', (message) => {
        if (message) {
            messages.push(message); // Simpan pesan
            io.emit('new-message', message); // Kirim pesan ke semua pengguna
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});