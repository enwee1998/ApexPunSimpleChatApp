import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Login from "../src/components/Login";
import Navbar from "../src/components/Navbar";
import Chat from "../src/components/Chat";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isLogin: false,
    };
  }

  onNameChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  enterChat = () => {
    if (this.state.name) this.setState({ isLogin: true });
  };

  logoutChat = () => {
    if (this.state.isLogin) this.setState({ isLogin: false });
  };

  render() {
    const { name, isLogin } = this.state;
    if (name && isLogin)
      return (
        <React.Fragment>
          <div className="row vh-100 ">
            <div className="col-6 mx-auto my-auto">
              <div className="container-fluid">
                <Navbar name={this.state.name} logout={this.logoutChat} />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    else
      return (
        <Login onNameChange={this.onNameChange} enterChat={this.enterChat} />
      );
  }
}

export default App;
