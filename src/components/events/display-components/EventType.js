import React from 'react';

export const EventType = ({type})=>{
	const eventType = EventTypes[type]
	return (
		<span className="type">{ eventType || type}</span>
	);
	
}
export const EventTypes = {
				"1":"Fire Night",
				"2":"Meeting",
				"3":"Flow Jam",
				"4":"Volunteering",
				"5":"Performance"
				}
