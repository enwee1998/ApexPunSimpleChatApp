const io = require("./index.js").io;
const mongoose = require("mongoose");
const User = require("./models/User");

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, GROUP_CHAT } = require("../src/Communicate");
const { createUser, createMessage, createChat } = require("../src/manageChat");
let connectedUsers = {};
let groupChat = createChat();
module.exports = function (socket) {
  console.log("Socket ID :" + socket.id);

  // verify username
  socket.on(VERIFY_USER, (username, callback) => {
    if (isUser(connectedUsers, username)) {
      callback({ isUser: true, user: null });
    } else {
      callback({ isUser: false, user: createUser({ name: username }) });
    }
  });

  //user connects
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    //broadcast user connected
    io.emit(USER_CONNECTED, connectedUsers);
    console.log("User connect :",connectedUsers);
  });

  //user disconnects
  socket.on('disconnect',()=>{
    if("user" in socket){
      connectedUsers = removeUser(connectedUsers, socket.user.name);
      //broadcast user disconnected
      io.emit(USER_DISCONNECTED, connectedUsers);
      console.log("someone's disconnected, who is in the chat is :",connectedUsers);
    }
  })

  //logout
  socket.on(LOGOUT, ()=>{
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    io.emit(USER_DISCONNECTED, connectedUsers);
    console.log("someone's logout, who is in the chat is :", connectedUsers);
  })

  //get group chat
  socket.on(GROUP_CHAT, (callback)=>{
    callback(groupChat)
  })
};

function groupEmission() {}

function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  User.find({ name: user.name }, function (err, users) {
    if (err) throw err;
    if (!users.length) {
      var newUser = new User({ name: user.name });
      newUser.save();
    }
  });
  return newList;
}

function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}


function isUser(userList, username) {
  return username in userList;
}
