import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import io from "socket.io-client";
import { USER_CONNECTED, LOGOUT } from "./Communicate";
import Login from "./components/Login";
import ChatBox from "./components/chat/ChatBox";

const socketURL = "http://localhost:4000";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null,
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
  };

  // send user + ( USER_CONNECTED ) to server
  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  // send status (LOGOUT) to server and set state of user to null
  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  logoutChat = () => {
    if (this.state.isLogin) this.setState({ isLogin: false });
  };

  render() {
    const { title } = this.props;
    const { socket, user } = this.state;
    return (
      <div className="container">
        {!user ? (
          <Login socket={socket} setUser={this.setUser} />
        ) : (
          <ChatBox socket={socket} user={user} logout={this.logout} />
        )}
      </div>
    );
  }
}

export default App;
