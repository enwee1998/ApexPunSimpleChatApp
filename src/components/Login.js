import React from "react";
import { VERIFY_USER } from "../Communicate";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      error: "",
    };
  }

  // if isUser is true -> setError, if isUser is false -> call setUser from main
  setUser = ({ user, isUser }) => {
    console.log(user, isUser);
    if (isUser) {
      this.setError("Username taken");
    } else {
      this.setError("");
      this.props.setUser(user);
    }
  };

  setError = (error) => {
    this.setState({ error });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    const { username } = this.state;
    // socket.io sends object username + VERIFY_USER and do setUser(see comment above)
    socket.emit(VERIFY_USER, username, this.setUser);
  };

  onChange = (e) => {
    this.setState({ username: e.target.value });
  };

  render() {
    const { username, error } = this.state;
    return (
      <div className="row vh-100">
        <div className="mx-auto my-auto">
          <div className="container rounded mx-auto bg-light p-4">
            <h1>APEXPUN CHAT</h1>
            <form onSubmit={this.onSubmit}>
              <label style={{ marginBottom: "-2px" }}>Name</label>
              <input
                className="form-control"
                ref={(input) => {
                  this.textInput = input;
                }}
                type="text"
                id="username"
                value={username}
                onChange={this.onChange}
                required
              />
              <div className="text-danger">{error ? error : null}</div>
              <div className="text-right">
                <button type="submit" className="btn btn-sm btn-info mt-2">
                  Let's Chat!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
