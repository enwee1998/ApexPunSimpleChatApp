import React, { Component } from "react";

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
        <div className="col-sm-4 col-2 fixed-top one text-center" style={{backgroundColor:'orange', height:'100%'}}> 
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
        </div>
      </div>
    );
  }
}

export default GroupPanel;
