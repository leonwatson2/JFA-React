import React, { Component } from 'react';
import moment from 'moment'
export class EventEdit extends Component {
	constructor(props) {
	  super(props);
	const { name, start_time, end_time, description, id, image_url, location, type } = props.event
	  console.log(moment(start_time));
	  this.state = {
	  	id:id || null,
	  	name:name || "",
	  	day:moment(start_time).format('YYYY-MM-DD'), 
	  	startTime:moment(start_time).format('HH:mm') || moment(),
	  	endTime:moment(end_time).format('HH:mm') || moment(),
	  	description:description || "",
	  	location:location || "",
	  	type: type || "",
	  	imageUrl: image_url || ""
	  };
	}
	handleSubmit = (e)=> {
		e.preventDefault()
		const { name, day, startTime, endTime, description, id, imageUrl, location, type } = this.state

		const newEvent = {
		  	id,
		  	name,
		  	startTime:moment(`${day} ${startTime}`, 'YYYY-MM-DD HH:mm').format(),
		  	endTime:moment(`${day} ${endTime}`, 'YYYY-MM-DD HH:mm').format(),
		  	description,
		  	location,
		  	type,
		  	imageUrl
		}
		console.log(newEvent);
	}
	deleteEvent(){
		console.log("Delete Event");
	}
	updateEventType(eventType){
		console.log("Update to ", eventType);
	}
	tryImageLoad = (e) => {
		// console.log("tryImageLoad", e);
	}
	updateImg = (e) => {
		this.setState({imageUrl:e.target.value});
	}
	updateStartTime(value, isTime){
		if(isTime){
			console.log(value);
			const { startTime, endTime } = this.state
			let newEndTime = endTime
			if(moment(startTime, 'HH:mm').isSameOrAfter(moment(endTime, 'HH:mm'))){
				newEndTime = moment(startTime, 'HH:mm').add(1, 'hour').format('HH:mm')
			}
			this.setState({startTime:value, endTime:newEndTime});
		}else{
			this.setState({day:value}); 
		}
	}
	changeLocation(e){
		console.log("location change", e.target);
	}
	render() {
		const { day, 
				name, 
				startTime, 
				endTime, 
				description, 
				id, 
				imageUrl, 
				location, 
				type } = this.state

		const newImageUrl = "http://24.media.tumblr.com/tumblr_lyho2ghTM71qenqklo1_1280.jpg"
		return (
		<div className="card event">

			<form className="editing" onSubmit={this.handleSubmit}>
				<div className="title">
					<h3>
						<input 
							type = "text" 
							name = "name"
							value = { name }
							onChange = { e => { this.setState({name:e.target.value}); }} 
						/>
					</h3>
					<button className="delete" onClick={this.deleteEvent} type="button">Delete</button>
				</div>
				<div className="event-types radio-group">
						{
							eventTypes.map(eventType =>(
								<div key={eventType} className={eventType.name}>
									<input 
										id={`${eventType}-${id}`}
										type="radio" 
										name="event-type"
									/>
									<label tabIndex="0" 
										htmlFor={`${eventType}-${id}`}
										className={(eventType === type) && 'active'}
										onClick={ e => { this.setState({eventType:e.target.value}); }}>
										<span>{eventType}</span>
									</label>    
								</div>
								))
						}

				</div>
				<div className = "content">
					<div className = "information">
						<div className = "date">
							<i className = "fa fa-calendar"></i>
							
							<input 
								type = "date" 
								onChange = {(e)=>{ this.updateStartTime(e.target.value, false) } }  
								value = { day }
								name = "day"
							/>
							
						</div>
						<div className = "time">
							<i className = "fa fa-clock-o">
							</i>
							<div className = "start-time">
								<input 
									type = "time" 
									onChange = { (e)=>{ this.updateStartTime(e.target.value, true) } } 
									value =  { startTime } 
									name = "startTime"
								/>
							</div> 
							<span> &#8211; </span> 
							<div className = "end-time">
								<input 
									type = "time" 
									onChange = { (e)=>{ this.setState({endTime:e.target.value})} } 
									value = { endTime }
									name = "endTime"
								/>
							</div>
						</div>
						<div className = "location"> 
							<i className = "fa fa-map"></i> 
							<input 
								type = "text" 
								name = "location"
								value = { location }
								onChange = { e => { this.setState({location:e.target.value}); } }/>
						</div>
					</div>
					<div className = "photo">
						<img onError = { this.tryImageLoad } src = { imageUrl } alt = "" />
						<input 
							type = "file" 
							name = "the_file" 
							onChange = { this.updateImg }
							accept = "image/*, video/*"
						/>
						<div>
							
							<button onClick = {(e) =>{e.preventDefault()}}>Upload</button>

						</div>
					</div>
					
					<textarea 
						className = "description" 
						name = "description" 
						value = { description }
						onChange = { e => { this.setState({description:e.target.value}); } }>
					</textarea>
				</div>
				<div className = "footer"> 
					<div className = "created-by">
						Created By: Leon Watson, You: 
						<span>Users Name</span>
					</div>
					<div className = "save">
						<button name = "submit" type = "submit"> Save</button>
					</div> 
				</div>
			</form>
		</div>
		);
	}
}
export default EventEdit
const eventTypes = [
				"Fire Night",
				"Meeting",
				"Flow Jam",
				"Volunteering",
				"Performance"
				]