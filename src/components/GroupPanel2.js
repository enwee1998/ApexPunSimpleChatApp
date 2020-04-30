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

  //   shouldComponentUpdate(nextProps, nextState) {
  //     const { groups, joinedGroups } = this.props;
  //     const { createGroupName } = this.state;
  //     if (
  //       groups !== nextProps.groups ||
  //       createGroupName !== nextState.createGroupName ||
  //       joinedGroups !== nextProps.joinedGroups
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }

  //   componentDidMount() {}

  onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div
        className="overflow-auto bg-light"
        style={{ height: "500px", maxHeight: "500px" }}
      >
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            style={{ borderRadius: "0" }}
            placeholder="New Group"
            aria-label="New Group"
            aria-describedby="button-addon2"
            name="createGroupName"
            value={this.state.createGroupName}
            onChange={this.onChange}
          />
          <div class="input-group-append">
            <button
              class="btn btn-info"
              style={{ borderRadius: "0" }}
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
          <div key={group} className="btn-group btn-block mt-2" role="group">
            <button
              type="button"
              className="col-8 btn btn-outline-secondary text-left"
              style={{ border: "none", borderRadius: "0" }}
            >
              {group}
            </button>
            <button
              type="button"
              className={
                this.props.joinedGroups.includes(group)
                  ? "col-4 btn btn-danger"
                  : "col-4 btn btn-success"
              }
              style={{ borderRadius: "0" }}
              onClick={
                this.props.joinedGroups.includes(group)
                  ? () => this.props.leaveGroup(group)
                  : () => this.props.joinGroup(group)
              }
            >
              {this.props.joinedGroups.includes(group) ? "Leave" : "Join"}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default GroupPanel2;
