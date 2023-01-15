const http = require("http");

const socketio = require("socket.io");

const cors = require("cors");

const server = http.createServer((req, res) => {
  console.log("Socket server running");
  res.end("Server connected !!");
});

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket, req) => {
  console.log("new connection");
  socket.emit("welcome", "Welcome to the websocket server!!");

  socket.on("message", (msg) => {
    console.log(msg);
  });
});

server.listen(8000);
