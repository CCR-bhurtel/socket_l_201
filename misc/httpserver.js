const http = require("http");
const websocket = require("ws");

const server = http.createServer((req, res) => {
  res.end("I am connected!");
});

const wss = new websocket.Server({ server });
wss.on("connection", (ws, req) => {
  ws.send("Welcome to my Server");
  wss.on("message", (msg, req) => {});
});

wss.on("headers", (headers, req) => {
  // console.log(headers);
});

server.listen(5000);
