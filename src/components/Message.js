import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: "",
      username: "",
      message: "",
      date: "",
    };
  }
  onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { receiver } = this.state;
    return <div className="container"></div>;
  }
}

export default Message;
