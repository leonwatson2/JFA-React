import React, { Component } from 'react';
import { events } from '../../data/media.json';
import Gallery from 'react-grid-gallery';
import { renderRouteWithSubRoutes } from '../../App'
const jfaUrl = "http://untjfa.com"

export default class JFAGallery extends Component {
	constructor(props) {
		super(props);
		let selectedEvent = null
		if('id' in this.props.match.params){
			selectedEvent = events.find(e=>e.id === props.match.params.id)
		}

		this.state = {
			selectedEvent,
		};
	}
	scrollUp(){
		let { gal } = this
		window.scrollTop = gal.scrollHeight
		console.log(gal.scrollHeight);
	}
	componentDidMount(){
		this.scrollUp()
	}
	getFirstThumbnail(event){
		const url = event.media[0].thumbnailUrl
		return `${jfaUrl}/${url}`
	}
	getFullUrl(url){
		
		return `${jfaUrl}/${url}`
	}
	getSelectedEventImages(){
		const { selectedEvent } = this.state
		if(selectedEvent !== null){
			const imgs = selectedEvent.media.map(m => ({ 
				src:this.getFullUrl(m.url),
				thumbnail:this.getFullUrl(m.thumbnailUrl),
				thumbnailWidth:m.tn_size.width,
				thumbnailHeight: m.tn_size.height
			}))		
			return imgs
		}
		return []
	}

	setSelectedEvent(selectedEvent){
		this.scrollUp()
		this.setState({selectedEvent})
	}
	
	render() {
		const { selectedEvent } = this.state
		const { routes } = this.props
		console.log(this.props);
		return (	
			<div >
				<h3>Gal</h3>
				<div className="wall-container">
					{selectedEvent && <h3>{selectedEvent.name}</h3>}
					<div ref={(container)=>{ this.gal = container }} className="jfa-gal">
					{
						selectedEvent ? 
						<Gallery 
							images={this.getSelectedEventImages()} />
						:
						null
					}
					</div>
					<hr/>
					<div className="event-select">
						{
							events.map((event)=>{
								if(event.media.length > 0)
								return (
									<div 
										key={event.id} 
										className="photo card"
										onClick={()=>{ this.setSelectedEvent(event) }}>
										<img src={this.getFirstThumbnail(event)} alt={''}></img>
										<span className="name">{event.name}</span>
										<span className="name">{event.date}</span>

									</div>
									)
								return null
							})
						}
					</div>
				</div>
				{routes && routes.map(renderRouteWithSubRoutes)}
			</div>
		);
	}
}
