import React, { Component } from "react";
import './Chatcss.css'

class Message extends Component {
  //state = {};
  constructor(props) {
    super(props);
    this.state = {
        receiver:""
    };
  }
  onChange = (e) => {
    this.setState({receiver:e.target.value})
  }
  render() {
    const {receiver} = this.state
    return (
      <div className="container">
      <div className="col-9 " style={{backgroundColor:'#ff6ba1', height:'100%'}}> 
      
        <form onSubmit={this.onSubmit} className="text input">
            <input  
                type="text"
                value={receiver}
                onChange={this.onChange}
                style={{width:"80%"}}/>
        </form>

      </div>
      </div>
    );

  }
}

export default Message;
