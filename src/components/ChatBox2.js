import React, { Component } from "react";
import Message from "./Message";

class ChatBox2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      message: "",
    };
    this.onChange = this.onChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage = () => {
    if (this.state.message.length) {
      this.props.sendMessage(this.state.message);
      this.setState({ message: "" });
    }
  };

  onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, message } = this.state;
    if (this.props.activeGroup)
      return (
        <div
          className=""
          style={{
            height: "500px",
            maxHeight: "500px",
          }}
        >
          <div
            className="container-fluid bg-warning text-dark text-center my-auto"
            style={{ height: "38px", maxHeight: "38px" }}
          >
            {this.props.activeGroup}
          </div>
          <div
            className="d-flex flex-column overflow-auto p-3 bg-white"
            style={{ display: "flex", flexDirection: "column" }}
            style={{ height: "412px", maxHeight: "412px" }}
          >
            {this.props.activeGroup
              ? this.props.messages
                  .filter(
                    (message) => message.groupName === this.props.activeGroup
                  )
                  .map((message) => (
                    <Message
                      key={message.timestamp}
                      username={username}
                      sender={message.username}
                      message={message.message}
                      date={message.timestamp}
                    />
                  ))
              : null}
          </div>
          <div
            className="container-fluid bg-white"
            style={{
              height: "50px",
              maxHeight: "50px",
              borderBottomRightRadius: "5px",
            }}
          >
            <div className="input-group">
              <input
                type="text"
                name="message"
                className="form-control"
                placeholder="Type your message"
                aria-label="Type your message"
                aria-describedby="button-addon2"
                value={message}
                onChange={this.onChange}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-info"
                  type="button"
                  id="button-addon2"
                  onClick={this.sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div
          className="container-fluid bg-light"
          style={{ borderBottomRightRadius: "5px" }}
        >
          <div className="row" style={{ height: "500px", maxHeight: "500px" }}>
            <div className="mx-auto my-auto">
              <h1 className="text-secondary">ApexPun Chat</h1>
            </div>
          </div>
        </div>
      );
  }
}

export default ChatBox2;
