import React, { Component } from "react";

// lastestMessage is a message that will appear under group name (นึกถึงข้อความล่าสุดในไลน์อะ)
// chatName คือชื่อ group ที่จะมา display ใน group panel (อาจจะเขียนส่งเป็น props ไปใน Group.js)

class GroupPanel2 extends Component {
  constructor(props) {
    super(props);
    // this.userRef = React.createRef();
    this.state = {
      createGroupName: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { groups } = this.props;
    const { createGroupName } = this.state;
    if (
      groups !== nextProps.groups ||
      createGroupName !== nextState.createGroupName
    ) {
      return true;
    }
    return false;
  }

  //   componentDidMount() {}

  onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div
        className="overflow-auto"
        style={{ height: "500px", maxHeight: "500px" }}
      >
        <div class="input-group mt-2">
          <input
            type="text"
            class="form-control"
            placeholder="New Group"
            aria-label="New Group"
            aria-describedby="button-addon2"
            name="createGroupName"
            value={this.state.createGroupName}
            onChange={this.onChange}
          />
          <div class="input-group-append">
            <button
              class="btn btn-success"
              type="button"
              id="button-addon2"
              onClick={() => {
                this.props.addGroup(this.state.createGroupName);
                this.setState({ createGroupName: "" });
              }}
            >
              +
            </button>
          </div>
        </div>
        {this.props.groups.map((group) => (
          <button
            className="btn btn-outline-secondary mt-2"
            style={{ borderRadius: "0" }}
          >
            {group}
          </button>
        ))}
      </div>
    );
  }
}

export default GroupPanel2;
