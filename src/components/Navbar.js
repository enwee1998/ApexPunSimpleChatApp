import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
    };
  }
  render() {
    return (
      <nav
        class="navbar navbar-light bg-light"
        style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
      >
        <div class="navbar-brand">
          <img
            src="https://img.icons8.com/nolan/64/chat.png"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          ApexPun Chat
        </div>
        <span class="navbar-text">
          Logged in as <strong>{this.state.name}</strong>
          <button
            className="btn btn-sm btn-danger ml-2"
            onClick={() => this.props.logout()}
          >
            Logout
          </button>
        </span>
      </nav>
    );
  }
}

export default Navbar;
