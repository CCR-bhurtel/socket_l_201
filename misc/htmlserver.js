const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');

const socketHtml = path.join(__dirname, 'socket.html');

const app = require('app');

// const server = http.createServer((req, res) => {
//     console.log('Html server running');

//     res.setHeader('Content-Type', 'text/html');

//     fs.createReadStream(socketHtml).pipe(res);
// });

const server = app.listen(3000, (req, res) => {});
