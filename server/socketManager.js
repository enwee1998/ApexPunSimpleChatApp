const io = require("./index.js").io;
const mongoose = require("mongoose");
const User = require("./models/User");
const Group = require("./models/Group");
const JoinGroup = require("./models/JoinGroup");

// mongoose.connection;

const {
  VERIFY_USER,
  USER_CONNECTED,
  USER_DISCONNECTED,
  LOGOUT,
  GROUP_CHAT,
} = require("../src/Communicate");
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
    // io.emit(USER_CONNECTED, connectedUsers);
    // console.log("User connect :",connectedUsers);
  });

  socket.on("leaveGroup", (req) => {
    JoinGroup.deleteOne(
      { username: req.username, groupName: req.groupName },
      function (err) {
        if (err) throw err;
        // deleted at most one tank document
      }
    );
  });

  socket.on("joinGroup", (req) => {
    JoinGroup.find({ username: req.username, groupName: req.groupName }).exec(
      function (err, found) {
        if (err) throw err;
        if (!found.length) {
          console.log("save");
          const newJoinedGroup = new JoinGroup({
            username: req.username,
            groupName: req.groupName,
          });
          newJoinedGroup.save();
        }
      }
    );
  });

  socket.on("getGroups", (username) => {
    Group.find().exec(function (err, groups) {
      var chatGroups = [];
      if (err) throw err;
      groups.map((group) => {
        chatGroups.push(group.groupName);
      });
      JoinGroup.find({
        username: username,
      }).exec(function (err, inGroup) {
        var joinedGroups = [];
        if (err) throw err;
        if (inGroup) {
          inGroup.map((group) => {
            joinedGroups.push(group.groupName);
          });
        }
        io.emit("getGroupResponse", { chatGroups, joinedGroups });
      });
    });
  });

  //user disconnects
  socket.on("disconnect", () => {
    if ("user" in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);
      //broadcast user disconnected
      io.emit(USER_DISCONNECTED, connectedUsers);
      console.log(
        "someone's disconnected, who is in the chat is :",
        connectedUsers
      );
    }
  });

  //logout
  socket.on(LOGOUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    io.emit(USER_DISCONNECTED, connectedUsers);
    console.log("someone's logout, who is in the chat is :", connectedUsers);
  });

  //get group chat
  socket.on(GROUP_CHAT, (callback) => {
    callback(groupChat);
  });
};

function getGroups(username) {}

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
