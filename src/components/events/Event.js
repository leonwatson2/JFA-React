import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DisplayEvent from './display-components/DisplayEvent'
import EventEdit from './EventEdit'
import { updateEvent, deleteEvent } from '../../store/actions/eventActions'

export class Event extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isEditing:false
	  };
	}		
	toggleEdit = (isEditing) =>{
		this.setState({isEditing});
	}

	updateEvent = (event)=>{
		this.toggleEdit(false);
		this.props.updateEvent(event);
	}
	render() {
		const { isEditing } = this.state
		const { event } = this.props 
		return 	!isEditing ? 
					<DisplayEvent event={event} openEdit = {()=>{this.toggleEdit(true)} }/> 
					: 
					<EventEdit 
						event={event} 
						deleteEvent = { this.props.deleteEvent }
						closeEdit = {()=>{ this.toggleEdit(false)}} 
						onSubmit={ this.updateEvent }/>
				
		
	}
}

const mapDispatchToProps = dispatch => ({
	updateEvent:bindActionCreators(updateEvent, dispatch),
	deleteEvent:bindActionCreators(deleteEvent, dispatch)
})

export default connect(()=>({}), mapDispatchToProps)(Event)