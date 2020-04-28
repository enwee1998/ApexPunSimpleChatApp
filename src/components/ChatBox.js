import React, { Component } from 'react';
import GroupPanel from './GroupPanel';

class ChatBox extends Component {
	constructor(props) {
	  super(props);	
	
	  this.state = {
	  	groups:[],
	  	activeGroup:null
	  };
	}


	setActiveGroup = (activeGroup)=>{
		this.setState({activeGroup})
	}
	render() {
		const { user, logout } = this.props
		const { groups, activeGroup } = this.state
		return (
			<div className="container">
				<GroupPanel
                    logout = {logout}
                    groups={groups}
                    user={user}
                    activeGroup={activeGroup}
                    setActiveGroup={this.setActiveGroup}

                />
			</div>
		);
	}
}

export default ChatBox;