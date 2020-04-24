const express = require("express");
const socketio = require("socket.io");
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);

// const router = require("./route");

require("dotenv/config");

const PORT = process.env.PORT || 5000;

//Connect database

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("DB connected");
});
//

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Test!!!");
});

server.listen(PORT, () => console.log("Application is running on port ", PORT));
