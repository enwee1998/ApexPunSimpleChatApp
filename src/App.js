import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Login from "../src/components/Login";


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
    console.log(this.state.name);
  };

  enterChat = () => {
    if (this.state.name) this.setState({ isLogin: true });
  };

  render() {
    const { name, isLogin } = this.state;
    if (name && isLogin) return <div>Yay!</div>;
    else
      return (
        <Login onNameChange={this.onNameChange} enterChat={this.enterChat} />
      );
  }
}

export default App;
