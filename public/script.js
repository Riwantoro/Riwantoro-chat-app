const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight; // Auto-scroll to the latest message
});