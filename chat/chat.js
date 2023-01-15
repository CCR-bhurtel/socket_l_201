const express = require('express');

const socketio = require('socket.io');

const path = require('path');

const app = express();

const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 9000;

const expressServer = app.listen(PORT, (req, res) => {
    console.log(`Server listening on port ${PORT}`);
});

const io = socketio(expressServer, {
    cors: {
        origin: 'http://localhost:9000',
        methods: ['GET', 'POST'],
    },
});

// admin namespace
io.of('/admin').on('connection', (socket) => {
    console.log(socket.id);
});

// main namespace
io.on('connection', (socket) => {
    socket.emit('messageFromServer', { data: 'Welcome to the server' });

    socket.on('messageToServer', (message) => {
        console.log(`Message: ${message.data}`);
    });
    socket.on('newMessageToServer', (message) => {
        io.emit('messageToClients', message);
    });
});

io.of('/admin').on('connection', (socket) => {
    socket.emit('welcome', { text: 'Hello everybody, welcome to the room' });
});

app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'index.html');
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream(htmlPath).pipe(res);
});

app.get('/chat', (req, res) => {
    const htmlPath = path.join(__dirname, 'public', 'chat.html');
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream(htmlPath).pipe(res);
});
