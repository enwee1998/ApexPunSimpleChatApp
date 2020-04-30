import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import io from "socket.io-client";
import { USER_CONNECTED, LOGOUT } from "./Communicate";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import GroupPanel2 from "./components/GroupPanel2";
import ChatBox from "./components/ChatBox";

const socketURL = "http://localhost:4000";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null,
      activeGroup: null,
      groups: [],
      joinedGroups: [],
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  // initialize socket
  initSocket = () => {
    const socket = io.connect(socketURL);
    //socket connect to server
    socket.on("connect", () => {
      console.log("User's connected to server");
    });
    this.setState({ socket });
    socket.on("createGroupRespose", (groupName) => {
      let { groups } = this.state;
      groups.push(groupName);
      this.setState({ groups });
    });
  };

  getGroups() {
    const { socket } = this.state;
    const username = this.state.user.name;
    socket.emit("getGroups", username);
    socket.on("getGroupResponse", (res) => {
      this.setState({ groups: res.chatGroups });
      this.setState({ joinedGroups: res.joinedGroups });
    });
  }

  addGroup = (groupName) => {
    const { socket } = this.state;
    const username = this.state.user.name;
    let { groups, joinedGroups } = this.state;
    groups.push(groupName);
    joinedGroups.push(groupName);
    this.setState({ groups });
    this.setState({ joinedGroups });
    socket.emit("createGroup", { username, groupName });
  };

  leaveGroup = (groupName) => {
    const { socket } = this.state;
    const username = this.state.user.name;
    let { joinedGroups } = this.state;
    socket.emit("leaveGroup", { username, groupName });
    joinedGroups = joinedGroups.filter((group) => group !== groupName);
  };

  joinGroup = (groupName) => {
    const { socket } = this.state;
    const username = this.state.user.name;
    let { joinedGroups } = this.state;
    socket.emit("joinGroup", { username, groupName });
    joinedGroups.push(groupName);
    this.setState({ joinedGroups });
  };

  // send user + ( USER_CONNECTED ) to server
  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
    this.getGroups();
  };

  // send status (LOGOUT) to server and set state of user to null
  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { title } = this.props;
    const { socket, user } = this.state;
    return (
      <div className="container">
        {!user ? (
          <Login socket={socket} setUser={this.setUser} />
        ) : (
          // <ChatBox socket={socket} user={user} logout={this.logout} />
          <div className="row vh-100">
            <div className="col-8 mx-auto my-auto">
              <div className="container-fluid">
                <Navbar name={user.name} logout={this.logout} />
                <div className="row">
                  <div className="col-4">
                    <GroupPanel2
                      groups={this.state.groups}
                      joinedGroups={this.state.joinedGroups}
                      leaveGroup={this.leaveGroup}
                      joinGroup={this.joinGroup}
                      addGroup={this.addGroup}
                    />
                  </div>
                  <div className="col-8">Chat</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
