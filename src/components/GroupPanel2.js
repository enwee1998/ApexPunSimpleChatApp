import React, { Component } from "react";

// lastestMessage is a message that will appear under group name (นึกถึงข้อความล่าสุดในไลน์อะ)
// chatName คือชื่อ group ที่จะมา display ใน group panel (อาจจะเขียนส่งเป็น props ไปใน Group.js)

class GroupPanel2 extends Component {
  constructor(props) {
    super(props);
    // this.userRef = React.createRef();
    this.state = {
      groups: [],
    };
  }

  render() {
    return (
      <div>
        <div class="input-group mt-2">
          <input
            type="text"
            class="form-control"
            placeholder="New Group"
            aria-label="New Group"
            aria-describedby="button-addon2"
          />
          <div class="input-group-append">
            <button class="btn btn-success" type="button" id="button-addon2">
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
