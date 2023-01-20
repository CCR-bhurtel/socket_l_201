const generateRandomId = () => {
    return Date.now() + 'Xgy2' + Math.floor(Math.random() * 20);
};

let chatId = localStorage.getItem('chatid');

if (!chatId) {
    chatId = generateRandomId();
    localStorage.setItem('chatid', chatId);
}

const socket = io('http://localhost:9000/');
const socket2 = io('http://localhost:9000/admin');

socket.on('messageToClients', (message) => {
    appendMessage(message);
});

socket2.on('joined', (message) => {
    console.log(message);
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
