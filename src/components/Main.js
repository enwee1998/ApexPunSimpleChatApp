
import React from "react";
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT} from "../Communicate";
import Login from './Login';

const socketURL = 'http://localhost:5000';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        socket:null,
        user:null
    };
  }
  
  componentWillMount(){
    this.initSocket();
  }

  // initialize socket
  initSocket = () => {
    const socket = io.connect(socketURL);
    //socket connect to server
    socket.on('connect', ()=>{
      console.log("User's connected to server");
    });
    this.setState({socket});
  }

  // send user + ( USER_CONNECTED ) to server
  setUser = (user) => {
    const {socket} = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({user});
  }

  // send status (LOGOUT) to server and set state of user to null
  logout = () => {
    const { socket} = this.state;
    socket.emit(LOGOUT);
    this.setState({user:null});
  }

  render() {
    const {title} = this.props
    const {socket} = this.state
    return (
      <div className="container">
        <Login socket={socket} setUser={this.setUser}/>
      </div>
    );
  }
}

export default Main;