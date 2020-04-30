import React, { Component } from "react";

class ChatBox2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
    };
  }
  render() {
    const { username } = this.state;
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
          Welcome {username} to this room!
        </div>
        <div
          className="d-flex flex-column overflow-auto p-3 bg-white"
          style={{ display: "flex", flexDirection: "column" }}
          style={{ height: "412px", maxHeight: "412px" }}
        >
          Chatbox
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
              className="form-control"
              placeholder="Type your message"
              aria-label="Type your message"
              aria-describedby="button-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-info"
                type="button"
                id="button-addon2"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBox2;
