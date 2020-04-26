import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  render() {
    return (
      <div className="row vh-100 ">
        <div className="mx-auto my-auto">
          <form>
            <div className="form-group">
              <label for="nameInput" style={{ marginBottom: "-2px" }}>
                Name
              </label>
              <input
                type="name"
                className="form-control"
                id="nameInput1"
                aria-describedby="nameHelp"
                style={{ width: "200px" }}
                onChange={this.props.onNameChange}
                minLength="1"
                maxLength="20"
                required
              />
              <small id="nameHelp" className="form-text text-muted">
                Enter your name to start chattin'
              </small>
              <div className="text-right" style={{ width: "200px" }}>
                <button
                  type="button"
                  className="btn btn-sm btn-primary mt-2"
                  onClick={() => this.props.enterChat()}
                >
                  Let's go
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
