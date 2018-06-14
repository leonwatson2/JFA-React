import React, { Component } from 'react';
import moment from 'moment'
import FAClose from 'react-icons/lib/fa/close'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addEvent, cancelCreateEvent } from '../../store/actions/eventActions'
import { ImageUpload } from '../utils/ImageUpload'

export class AddEvent extends Component {
	constructor(props) {
	  super(props);
	this.state = {
	  	id:null,
	  	newName:"",
	  	day:moment().format('YYYY-MM-DD'), 
	  	newStartTime:moment().format('HH:mm'),
	  	newEndTime:moment().add(1, 'h').format('HH:mm'),
	  	newDescription:"",
	  	newLocation:"",
	  	newType: "",
	  	newImageUrl: null
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


		let newEvent = {}

		newEvent.name = newName
		newEvent.startTime = moment(`${day} ${newStartTime}`, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
		newEvent.endTime = moment(`${day} ${newEndTime}`, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
		newEvent.description = newDescription
		newEvent.imageUrl = newImageUrl
		newEvent.type = newType
		newEvent.location = newLocation
		
		this.props.addEvent(newEvent)
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
				this.setState({ newImageUrl:imageUrl })
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
				updatedEndTime = moment(newStartTime, 'HH:mm').add(2, 'h').format('HH:mm')
			}
			this.setState({newStartTime:value, newEndTime:updatedEndTime});
		}else{
			this.setState({day:value}); 
		}
	}

	render() {
		const { cancelAddEvent } = this.props
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
			<button className="edit-button" onClick={ cancelAddEvent } title="Cancel" >
	          <FAClose />
	        </button>
			<form className="edit-form" onSubmit={this.handleSubmit}>
				<div className="title">
					<h3>
						<input 
							autoFocus
							type = "text" 
							name = "name"
							placeholder = "Cool event name"
							value = { newName }
							onChange = { e => { this.setState({newName:e.target.value}); }} 
						/>
					</h3>
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
										onClick={ e => { this.updateEventType(eventType) }}>
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
								placeholder = "Location"
								value = { newLocation }
								onChange = { e => { this.setState({newLocation:e.target.value}); } }/>
						</div>
					</div>
					<ImageUpload 
						onChange = { this.updateImg } 
						containerClassNames={ 'photo' }
						showImage={ true }
						previewImgSrc={ editedImageUrl }
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
	savingEvent:state.events.savingEvent
})
const mapdispatchToProps = dispatch => ({
	cancelAddEvent:bindActionCreators(cancelCreateEvent, dispatch),
	addEvent:bindActionCreators(addEvent, dispatch)
})

export default connect(mapStateToProps, mapdispatchToProps)(AddEvent)
const eventTypes = [
				"Fire Night",
				"Meeting",
				"Flow Jam",
				"Volunteering",
				"Performance"
				]