var app = require('http').createServer();
const mongoose = require("mongoose");
var io = module.exports.io = require('socket.io')(app);

// const router = require("./route");

require("dotenv/config");

const PORT = process.env.PORT || 5000;

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

io.on('connection', socketManager);

/*app.get("/", (req, res) => {
  res.send("Test!!!");
});*/

app.listen(PORT, () => {console.log("Application is running on port ", PORT);});
