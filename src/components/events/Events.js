import React, { Component } from 'react';
import Event from './Event'
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
		const { events, fetching } = this.props
		
		if(events.length === 0) return <h2>{fetching && 'Loading '}Events</h2>

		return (
			<div className="main">
				
				{
					events.map(event => (<Event key={event.id} event={event} />))
				}
			</div>
		);
	}
}

const mapStateToProps = ({events}) =>({
	events:events.events,
	fetching:events.fetching
})


export const Events = connect(mapStateToProps)(EventsComponent)
