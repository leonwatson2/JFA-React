import React from 'react';
import FAMarker from 'react-icons/lib/fa/map-marker';

export const EventLocation = ({location}) => {
	return (
		<div className="location">
			<FAMarker />
			<span>{location}</span>
		</div>
	);
}

