const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
// var app = require("http").createServer();
const mongoose = require("mongoose").set("debug", true);
var io = (module.exports.io = require("socket.io")(server));

// const router = require("./route");

require("dotenv/config");

const PORT = process.env.PORT || 4000;

const socketManager = require("./socketManager");

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

io.on("connection", socketManager);

app.get("/", (req, res) => {
  res.send("Test!!!");
});

server.listen(PORT, () => {
  console.log("Application is running on port ", PORT);
});
