const messageInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');
const messagesList = document.getElementById('messages');

// Initialize Socket.IO
const socket = io();

// Function to add a message to the UI
const addMessageToUI = (message) => {
    const li = document.createElement('li');
    li.textContent = message;
    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight; // Auto-scroll to the latest message
};

// Handle initial messages when the page loads
socket.on('initial-messages', (messages) => {
    messagesList.innerHTML = ''; // Clear the messages list
    messages.forEach((msg) => addMessageToUI(msg));
});

// Handle new messages from the server
socket.on('new-message', (message) => {
    addMessageToUI(message);
});

// Handle form submission
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (messageInput.value) {
        socket.emit('send-message', messageInput.value); // Send the message to the server
        messageInput.value = ''; // Clear the input field
    }
});