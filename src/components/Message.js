import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: this.props.sender,
      username: this.props.username,
      message: "tetstetssjakjskajkasjskajakajskjaskssak",
      date: new Date().toString().substr(4, 11),
    };
  }
  onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { sender, username, message, date } = this.state;
    if (sender === username) {
      return (
        <div className="text-right">
          <small className="text-info">{sender}</small>

          <div class="d-flex flex-row-reverse justify-content-start flex-wrap">
            <div class="d-inline-flex p-2 bg-white border border-info rounded">
              {message}
            </div>
          </div>
          <small className="text-secondary">{date}</small>
        </div>
      );
    } else
      return (
        <div className="text-left">
          <small className="text-primary">{sender}</small>
          <div class="d-flex flex-row-reverse justify-content-end flex-wrap">
            <div class="d-inline-flex p-2 bg-white border border-primary rounded">
              {message}
            </div>
          </div>
          <small className="text-secondary">{date}</small>
        </div>
      );
  }
}

export default Message;
