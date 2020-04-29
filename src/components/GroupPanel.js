import React, { Component } from "react";

class GroupPanel extends Component {
  constructor(props) {
    super(props);
    this.userRef = React.createRef();
    this.state = {
        receiver:"" 
    };
  }

  onChange = (e) => {
    this.setState({receiver:e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {receiver} = this.state
  }

  render() {
    const { groups, activeGroup, user, setActiveGroup, logout} = this.props
    const {receiver} = this.state
    return(
      <div className="container">
         <div className="app-name">Group</div>
						<div className="menu">
							
						</div>
          <form onSubmit={this.onSubmit} className="text input">
            <input  
                type="text"
                value={receiver}
                onChange={this.onChange}
                style={{width:"80%"}}/>
          </form>
          <div 
						className="users" 
						ref={this.userRef} 
						onClick={(e)=>{ (e.target === this.userRef.current && setActiveGroup(null) )}}>
						
						{
						groups.map((groupChat)=>{
							if(groupChat.name){
								const lastMessage = groupChat.messages[groupChat.messages.length - 1];
								const chatName = groupChat.users.find((name)=>{
									return name !== user.name
								}) || "Community" 
								const classNames = (activeGroup && activeGroup.id === groupChat.id) ? 'active' : ''
								
								return(
								<div 
									key={groupChat.id} 
									className={`user ${classNames}`}
									onClick={ ()=>{ setActiveGroup(groupChat) } }
									>
									<div className="user-photo">{chatName[0].toUpperCase()}</div>
									<div className="user-info">
										<div className="name">{chatName}</div>
										{lastMessage && <div className="last-message">{lastMessage.message}</div>}
									</div>
									
								</div>
							)
							}

							return null
						})	
						}
						
					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<button onClick={()=>{logout()}} title="Logout" className="logout">
								Logout
						</button>
					</div>
        </div>
      
    );
  }
}

export default GroupPanel;
