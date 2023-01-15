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

socket.on('connect', () => {
    console.log(socket.id);
});
socket2.on('connect', () => {
    console.log(socket2.id);
});
socket.on('messageFromServer', (dataFromServer) => {
    socket.emit('messageToServer', { data: 'Data from the client' });
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

socket.on('messageToClients', (message) => {
    appendMessage(message);
});

socket2.on('welcome', (message) => {
    console.log(message.text);
});
