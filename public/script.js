const socket = io();

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages');

// Fetch initial messages
fetch('/messages')
  .then((response) => response.json())
  .then((messages) => {
    messages.forEach((message) => addMessageToUI(message));
  });

// Listen for new messages from the server
socket.on('message', (message) => {
  addMessageToUI(message);
});

// Send a new message
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = messageInput.value;
  const user = 'Anonymous'; // Replace with actual user input or authentication

  fetch('/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, text }),
  })
    .then((response) => response.json())
    .then((message) => {
      messageInput.value = '';
    });
});

// Add a message to the UI
function addMessageToUI(message) {
  const li = document.createElement('li');
  li.textContent = `${message.user}: ${message.text}`;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight; // Auto-scroll to the latest message
}