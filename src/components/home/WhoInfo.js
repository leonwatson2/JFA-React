import React, { Component } from 'react';
import OfficerPicture from './OfficerPicture';

export default class WhoInfo extends Component {
	render() {
		const {title, subtitle, videos } = this.props; 
		return (
			<section id="who">
					<h2>{title}<small>{subtitle}</small></h2>
					<div className="videos">
						{
							videos.map((officer)=>{
								return <OfficerPicture key={officer.title} {...officer} />
							})
						}	
					</div>
			</section>
		);
	}
}
