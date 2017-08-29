import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import FACalendar from 'react-icons/lib/fa/calendar';
import FAClock from 'react-icons/lib/fa/clock-o';

export const EventDateTime = ({startTime, endTime})=>{
	return (
		<div className="event-date-time">			
			<div className="date">
				<FACalendar />
				<span className="calendar-date">
				<FormattedDate
					value={startTime}
					month={'short'}
					weekday={'long'}
					day={'2-digit'}
				/>
				</span>
			</div>
			<div className="time">
				<FAClock />
				<div className="start-time">
				<FormattedTime 
					value={startTime} 
					
					/>
				</div>  
				<div className="end-time"><span>-</span>
				<FormattedTime 
					value={endTime}
				/>
				</div>
			</div>
		</div>
	);
}
