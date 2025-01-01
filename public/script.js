const messageInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');
const messagesList = document.getElementById('messages');

// Fungsi untuk mengambil pesan dari server
const fetchMessages = () => {
    fetch('/messages')
        .then((response) => response.json())
        .then((data) => {
            messagesList.innerHTML = ''; // Bersihkan daftar pesan
            data.forEach((msg) => addMessageToUI(msg)); // Tambahkan pesan ke UI
        });
};

// Fungsi untuk mengirim pesan ke server
const sendMessage = (message) => {
    fetch('/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });
};

// Fungsi untuk menambahkan pesan ke UI
const addMessageToUI = (message) => {
    const li = document.createElement('li');
    li.textContent = message;
    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight; // Auto-scroll ke pesan terbaru
};

// Polling untuk mengambil pesan baru setiap detik
setInterval(fetchMessages, 1000);

// Kirim pesan saat form di-submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (messageInput.value) {
        sendMessage(messageInput.value);
        messageInput.value = ''; // Bersihkan input
    }
});

// Ambil pesan saat halaman dimuat
fetchMessages();