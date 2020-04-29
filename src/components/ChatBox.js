import React, { Component } from 'react';
import GroupPanel from './GroupPanel';
import Message from './Message';
import ChatInput from './ChatInput';
import {MESSAGE_SENT, TYPING, GROUP_CHAT, MESSAGE_RECEIVED} from '../Communicate';

class ChatBox extends Component {
	constructor(props) {
	  super(props);	
	
	  this.state = {
	  	groups:[],
	  	activeGroup:null
	  };
	}

	initSocket(socket){
		socket.emit(GROUP_CHAT, this.resetGroup)
		socket.on('connect', ()=>{
			socket.emit(GROUP_CHAT, this.resetGroup)
		})
	}

	componentDidMount(){
		const {socket} = this.props
		this.initSocket(socket)
	}

	resetGroup = (groupChat) =>{
		return this.addGroup(groupChat, true)
	}

	addGroup = (groupChat,isReset = false) => {
		const {socket} = this.props
		const {groups} = this.state
		const newGroup = isReset ? [groupChat] : [...groups, groupChat]
		this.setState({groups:newGroup, activeGroup : isReset ? groupChat : this.state.activeGroup})

		const messaging = `${MESSAGE_RECEIVED} : ${groupChat.id}`
		const typing = `${TYPING} : ${groupChat.id}`
		
		socket.on(typing, this.updateTyping(groupChat.id))

		socket.on(messaging, this.addMessageToChat(groupChat.id))
	}

	addMessageToChat = (chatID) =>{
		return message => {
			const {groups} = this.state
			let newGroup = groups.map((chat)=>{
				if(chat.id === chatID) chat.messages.push(message)
				return chat
			})
			this.setState({groups:newGroup})
		}
	}

	updateTyping = (chatID) => {

	}

	sendMessage = (groupID, message) => {
		const {socket} = this.props
		socket.emit(MESSAGE_SENT, {groupID, message})
	}

	sendTyping = (groupID, isTyping) => {
		const {socket} = this.props
		socket.emit(TYPING, {groupID, isTyping})
	}

	setActiveGroup = (activeGroup)=>{
		this.setState({activeGroup})
	}
	render() {
		const { user, logout } = this.props
		const { groups, activeGroup } = this.state
		return (
				<div className="row">
					<div className="col-md-4 text-center" style={{backgroundColor:"orange", height:"100vh"}}>
						<GroupPanel
							logout = {logout}
							groups={groups}
							user={user}
							activeGroup={activeGroup}
							setActiveGroup={this.setActiveGroup}
						/>
					</div>
					<div className = "col-md-8 text-center" style={{backgroundColor:"lightblue", height:"100vh"}}>
						{
							activeGroup !== null ? (
								<div className = "chatroom">
									<Message
										messages={activeGroup.messages}
										user={user}
										typingUser={activeGroup.typingUser}
									/>
									<ChatInput
										sendMessage={(message)=>{
											this.sendMessage(activeGroup.id, message)
										}}
										sendTyping={(isTyping)=>{
											this.sendTyping(activeGroup.id, isTyping)
										}}
									/>
								</div>
							):
							<div className='choose chatroom'>
								
									<h3>Please choose group chat</h3>
								
							</div>
						}
					</div>
				</div>
		);
	}
}

export default ChatBox;