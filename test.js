const io = require("socket.io-client");
const socket = io("http://localhost:3000");
socket.on("connect", function () {
  console.log("Connected");
  socket.emit("chat message", "test1");
});
