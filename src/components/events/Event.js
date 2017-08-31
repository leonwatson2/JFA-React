import React, { Component } from 'react';
import { DisplayEvent } from './display-components/DisplayEvent'
import { EventEdit } from './EventEdit'

export class Event extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isEditing:true
	  };
	}		
	toggleEdit = () =>{
		this.setState({isEditing:!this.state.isEditing});
	}
	render() {
		const { isEditing } = this.state
		const { event } = this.props 
		return 	!isEditing ? 
					<DisplayEvent toggleEdit={this.toggleEdit} event={event}/> 
					: 
					<EventEdit event={event} onSubmit={(e)=>{ console.log(e);}}/>
				
		
	}
}
