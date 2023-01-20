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

const adminNamespace = io.of('/admin');
adminNamespace.use((socket, next) => {
    next();
});
// admin namespace

adminNamespace.on('connection', (socket) => {
    console.log(`${socket.id} in admin room`);
    socket.join('adminChannel');
    adminNamespace.to('adminChannel').emit('joined', `Welcome to admin room, ${socket.id} `);
    socket.emit('welcome', { text: 'Hello everybody, welcome to the room' });
    socket.on('messageToAdmin', (message) => {
        console.log('Hello world');
        console.log(message);
    });
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
