const messageInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');
const messagesList = document.getElementById('messages');

// Function to fetch messages from the server
const fetchMessages = async () => {
    try {
        const response = await fetch('/get-messages');
        const data = await response.json();
        messagesList.innerHTML = ''; // Clear the messages list
        data.messages.forEach((msg) => {
            const li = document.createElement('li');
            li.textContent = msg;
            messagesList.appendChild(li);
        });
        messagesList.scrollTop = messagesList.scrollHeight; // Auto-scroll to the latest message
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

// Function to send a message to the server
const sendMessage = async (message) => {
    try {
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        if (data.success) {
            await fetchMessages(); // Fetch messages after sending
        } else {
            console.error('Failed to send message:', data.error);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (messageInput.value) {
        await sendMessage(messageInput.value);
        messageInput.value = ''; // Clear the input field
    }
});

// Poll for new messages every second
setInterval(fetchMessages, 1000);

// Fetch messages when the page loads
fetchMessages();
