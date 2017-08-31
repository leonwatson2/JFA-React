import React, { Component } from 'react';
import { EventType } from './EventType'
import { EventDateTime } from './EventDateTime'
import { EventLocation } from './EventLocation'

export class DisplayEvent extends Component {
	render() {

		const { event } = this.props 
		return (
		<div className="card event">
			<div className="title">
				<h3>{event.name}</h3>
				<EventType type={event.type}></EventType>
			</div>
			<div className="content">
				<div className="information">
					<EventDateTime 
						startTime={event.start_time} 
						endTime={event.end_time} />
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
