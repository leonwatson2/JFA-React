import React, { Component } from 'react';
import Event from './Event'
import AddEvent from './AddEvent'
import { connect } from 'react-redux'
import { getEvents } from '../../store/actions/eventActions'

class EventsComponent extends Component {
	
	componentDidMount() {
		this.fetchEvents()
	}

	fetchEvents = () => {
		 this.props.dispatch(getEvents())
	}

	render() {
		const { events, fetching, loggedIn, creatingEvent} = this.props

		if(events.length === 0) return <h2>{fetching ? 'Loading ': 'No '}Events</h2>

		return (
			<div className="main">
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
	creatingEvent:true, 
	events:events.events,
	fetching:events.fetching
})


export const Events = connect(mapStateToProps)(EventsComponent)
