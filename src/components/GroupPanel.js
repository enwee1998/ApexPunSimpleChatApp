import React, { Component } from "react";
import Group from './Group.js'

class GroupPanel extends Component {
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
    const { groups, activeGroup, user, setActiveGroup, logput} = this.props
    const {receiver} = this.state
    return(
      <div className="container">
        <div className="col-3 fixed-top one text-center" style={{backgroundColor:'#b06ba1', height:'100%'}}> 
          <div style={{paddingTop:"10vh", paddingBottom : "3vh"}}>
            Chat
          </div>
          <form onSubmit={this.onSubmit} className="text input">
            <input  
                type="text"
                value={receiver}
                onChange={this.onChange}
                style={{width:"80%"}}/>
          </form>
          <div>
              <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">group
              <span class="caret"></span></button>
              <ul class="dropdown-menu">
                <li><a href="#">พันกาก</a></li>
                <li><a href="#">พันnoob</a></li>
                <li><a href="#">พันชนบ่อตายประจำ</a></li>
              </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupPanel;
