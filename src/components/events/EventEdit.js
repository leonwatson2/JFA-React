import React, { Component } from 'react';
import moment from 'moment'
import FAClose from 'react-icons/lib/fa/close'
import { connect } from 'react-redux'

export class EventEdit extends Component {
	constructor(props) {
	  super(props);
	const { name, startTime, endTime, description, _id, image_url, location, type } = props.event
	this.state = {
	  	id:_id || null,
	  	newName:name || "",
	  	day:moment(startTime).format('YYYY-MM-DD'), 
	  	newStartTime:moment(startTime).format('HH:mm') || moment(),
	  	newEndTime:moment(endTime).format('HH:mm') || moment(),
	  	newDescription:description || "",
	  	newLocation:location || "",
	  	newType: type || "",
	  	newImageUrl: image_url || null
	  };
	}
	handleSubmit = (e)=> {
		e.preventDefault()
		const { newName, 
			day, 
			newStartTime, 
			newEndTime, 
			newDescription, 
			newImageUrl, 
			newLocation, 
			newType } = this.state
		const { name, 
				startTime, 
				endTime, 
				description, 
				_id,
				image_url, 
				location, 
				type } = this.props.event

		let newEvent = {_id}

		newEvent.name = this.isNewValue(name, newName)
		newEvent.startTime = this.isNewValue(startTime, moment(`${day} ${newStartTime}`, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
		newEvent.endTime = this.isNewValue(endTime, moment(`${day} ${newEndTime}`, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
		newEvent.description = this.isNewValue(description, newDescription)
		newEvent.imageUrl = this.isNewValue(image_url, newImageUrl)
		newEvent.type = this.isNewValue(type, newType)
		newEvent.location = this.isNewValue(location, newLocation)
		newEvent = Object.keys(newEvent).reduce((newOb, key)=> {
									if(newEvent[key] !== null){
										 newOb[key] = newEvent[key]  
									}
									return newOb
								}, {})
		console.log(newEvent, newType, type)
		this.props.onSubmit(newEvent)
	}

	isNewValue(oldVal, newVal){
		return (oldVal !== newVal) ? newVal : null
	}
	deleteEvent(){
		console.log("Delete Event");
	}
	updateEventType(newType){
		console.log(newType)
		this.setState({newType});
	}
	
	updateImg = (e) => {
		const reader = new FileReader()
		const file = e.target.files[0]
		reader.onloadend = (data)=>{
			this.setState({
				newImageUrl:reader.result
			});
		}
		reader.readAsDataURL(file)
	}
	updateStartTime(value, isTime){
		if(isTime){
			const { newStartTime, newEndTime } = this.state
			let updatedEndTime = newEndTime
			if(moment(value, 'HH:mm').isSameOrAfter(moment(newEndTime, 'HH:mm'))){
				updatedEndTime = moment(newStartTime, 'HH:mm').add(2, 'hour').format('HH:mm')
			}
			this.setState({newStartTime:value, newEndTime:updatedEndTime});
		}else{
			this.setState({day:value}); 
		}
	}

	render() {
		const { closeEdit } = this.props
		const { day, 
				newName, 
				newStartTime, 
				newEndTime, 
				newDescription, 
				id, 
				newImageUrl, 
				newLocation, 
				newType } = this.state

		const editedImageUrl = newImageUrl || "http://24.media.tumblr.com/tumblr_lyho2ghTM71qenqklo1_1280.jpg"
		return (
		<div className="card event">
			<button className="edit-button" onClick={ closeEdit } title="Cancel Edit Event">
	          <FAClose  />
	        </button>
			<form className="edit-form" onSubmit={this.handleSubmit}>
				<div className="title">
					<h3>
						<input 
							type = "text" 
							name = "name"
							value = { newName }
							onChange = { e => { this.setState({newName:e.target.value}); }} 
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
										className={(eventType === newType) && 'active'}
										onClick={ () => { this.updateEventType(eventType) }}>
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
									value =  { newStartTime } 
									name = "startTime"
								/>
							</div> 
							<span> &#8211; </span> 
							<div className = "end-time">
								<input 
									type = "time" 
									onChange = { (e)=>{ this.setState({newEndTime:e.target.value})} } 
									value = { newEndTime }
									name = "endTime"
								/>
							</div>
						</div>
						<div className = "location"> 
							<i className = "fa fa-map"></i> 
							<input 
								type = "text" 
								name = "location"
								value = { newLocation }
								onChange = { e => { this.setState({newLocation:e.target.value}); } }/>
						</div>
					</div>
					<div className = "photo">
						<img src = { editedImageUrl } alt = "" />
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
						value = { newDescription }
						onChange = { e => { this.setState({newDescription:e.target.value}); } }>
					</textarea>
				</div>
				<div className = "footer"> 
					<div className = "created-by">
						Created By: Leon Watson, You: 
						<span>Users Name</span>
					</div>
					<div className = "save">
						<input name = "submit" type = "submit" value="Save"/> 
					</div> 
				</div>
			</form>
		</div>
		);
	}
}
const mapStateToProps = state => ({
	savingEvent:state.events.savingEvent
})

export default connect(mapStateToProps)(EventEdit)
const eventTypes = [
				"Fire Night",
				"Meeting",
				"Flow Jam",
				"Volunteering",
				"Performance"
				]