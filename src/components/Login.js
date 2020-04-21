
import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'A',
        room:0
    };
  }



  render() {
    
    return (
      <div className="container mt-5 w-50">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label>Name</label>
            <div className="control">
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Room</label>
            <div className="control">
              <input
                className="form-control"
                type="number"
                name="room"
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <Link to = {`/chat`}>
            <button className = "Join chat">Join chat</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
