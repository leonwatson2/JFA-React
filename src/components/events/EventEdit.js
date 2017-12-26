import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'

import FAClose from 'react-icons/lib/fa/close'
import { ImageUpload } from '../utils/ImageUpload'
import PropTypes from 'prop-types'
export class EventEdit extends Component {
	static propTypes = {
		event:PropTypes.object.isRequired,
		closeEdit:PropTypes.func,
		onSubmit:PropTypes.func.isRequired,
		deleteEvent: PropTypes.func.isRequired
	}
	constructor(props) {
	  super(props);
	const { name, startTime, endTime, description, _id, imageUrl, location, type } = props.event
	this.state = {
	  	id:_id || null,
	  	newName:name || "",
	  	day:moment(startTime).format('YYYY-MM-DD'), 
	  	newStartTime:moment(startTime).format('HH:mm') || moment(),
	  	newEndTime:moment(endTime).format('HH:mm') || moment(),
	  	newDescription:description || "",
	  	newLocation:location || "",
	  	newType: type || "",
			newImageUrl: imageUrl || null,
			newImageFile: null  
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
			newType
		 } = this.state
		const { name, 
				startTime, 
				endTime, 
				description, 
				_id,
				imageUrl, 
				location, 
				type } = this.props.event

		let newEvent = {_id}

		newEvent.name = this.isNewValue(name, newName)
		newEvent.startTime = this.isNewValue(startTime, moment(`${day} ${newStartTime}`, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
		newEvent.endTime = this.isNewValue(endTime, moment(`${day} ${newEndTime}`, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
		newEvent.description = this.isNewValue(description, newDescription)
		newEvent.imageUrl = this.isNewValue(imageUrl, newImageUrl)
		newEvent.type = this.isNewValue(type, newType)
		newEvent.location = this.isNewValue(location, newLocation)
		newEvent = Object.keys(newEvent).reduce((newOb, key)=> {
									if(newEvent[key] !== null){
										 newOb[key] = newEvent[key]  
									}
									return newOb
								}, {})
		this.props.onSubmit(newEvent)
	}

	isNewValue(oldVal, newVal){
		return (oldVal !== newVal) ? newVal : null
	}
	deleteEvent = ()=>{
		this.props.deleteEvent(this.props.event)
	}
	updateEventType(newType){
		this.setState({newType});
	}
	
	updateImg = imageFiles => {
			this.setState({
				newImageFile:imageFiles[0]
			})
			this.uploadImage(imageFiles[0])
				.then(res=>res.json())
				.then(({imageUrl})=>{
					console.log(imageUrl)
					this.setState({newImageUrl:imageUrl})
				})
				
	}
	uploadImage = imageFile =>{
		let form = new FormData()
		form.append('file', imageFile)
		form.append('type', "Event")
		const init = {
		  method:"POST",
		  body:form
		}
	
		return fetch('/api/events/image/upload', init).catch((err)=>{
			console.log(err)
		})
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
					<ImageUpload 
						onChange = { this.updateImg } 
						containerClassNames={'photo'}
						showImage={true}
						previewImgSrc={newImageUrl}
						/>
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
	savingEvent:state.events.savingEvent,
})
export default connect(mapStateToProps)(EventEdit)
const eventTypes = [
				"Fire Night",
				"Meeting",
				"Flow Jam",
				"Volunteering",
				"Performance"
				]