import React, { Component } from 'react';
import { EventType } from './EventType'
import { EventDateTime } from './EventDateTime'
import { EventLocation } from './EventLocation'
import FAEdit from 'react-icons/lib/fa/edit'
import { connect } from 'react-redux'

export class DisplayEvent extends Component {
	render() {

		const { event, openEdit, loggedIn } = this.props 
		return (
		<div className="card event">
			{
				loggedIn &&
			<button className="edit-button" onClick={ openEdit } >
	          <FAEdit title="Edit Event" />
	        </button>
			}
			<div className="title">
				<h3>{event.name}</h3>
				<EventType type={event.type}></EventType>
			</div>
			<div className="content">
				<div className="information">
					<EventDateTime 
						startTime={event.startTime} 
						endTime={event.endTime} />
					<EventLocation location={event.location} />
				</div>
				<div className="photo"><img src={event.image_url} alt="" /></div>
				<p className="description">{event.description}</p>
			</div>
			<div className="footer"> 
				<div className="created-by">
					Created By: {event.creator}
				</div>
				<div className="share">
					<i className="fa fa-3x fa-share-alt"></i>
				</div>
			</div> 
		</div>
		);
	}
}
const mapStateToProps = state => ({
	loggedIn:state.users.loggedIn
})
export default connect(mapStateToProps)(DisplayEvent)