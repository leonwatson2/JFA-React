import React, { Component } from 'react';
import Event from './Event'
import AddEvent from './AddEvent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getEvents, createEvent } from '../../store/actions/eventActions'

class EventsComponent extends Component {
	
	componentDidMount() {
		this.fetchEvents()
	}

	fetchEvents = () => {
		 this.props.getEvents()
	}

	render() {
		const { events, fetching, loggedIn, creatingEvent, createEvent} = this.props

		if(events.length === 0) return <h2>{fetching ? 'Loading ': 'No '}Events</h2>

		return (
			<div className="main">
				{ loggedIn && !creatingEvent && <button className="btn" onClick={()=>{createEvent()}}>Add Event</button>}
				{ loggedIn && creatingEvent && <AddEvent /> }
				{
					events.map(event => (<Event key={event._id} event={event} />))
				}
			</div>
		);
	}
}

const mapStateToProps = ({events, users}) =>({
	loggedIn:users.loggedIn,
	creatingEvent:events.creatingEvent, 
	events:events.events,
	fetching:events.fetching
})
const mapDispatchToProps = dispatch => ({
	createEvent:bindActionCreators(createEvent, dispatch),
	getEvents:bindActionCreators(getEvents, dispatch)
})


export const Events = connect(mapStateToProps, mapDispatchToProps)(EventsComponent)
