const generateRandomId = () => {
    return Date.now() + 'Xgy2' + Math.floor(Math.random() * 20);
};

let chatId = localStorage.getItem('chatid');

if (!chatId) {
    chatId = generateRandomId();
    localStorage.setItem('chatid', chatId);
}

const socket = io('/');
const socket2 = io('/admin');

socket.on('messageToClients', (message) => {
    appendMessage(message);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    if (newMessage) {
        socket.emit('newMessageToServer', {
            text: newMessage,
            id: chatId,
        });
    }
    document.querySelector('#user-message').value = '';
});
