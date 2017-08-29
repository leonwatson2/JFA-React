import React, { Component } from 'react';

export default class OfficerPicture extends Component {
	render() {
		const { title, name, posterUrl, videoUrl } = this.props
		return (
			<div className="video">
				<div className="name">{ title } <small>{ name }</small></div>
				{
					videoUrl?
					<video muted loop poster={ posterUrl }>
						<source src={ videoUrl }/>
					</video>
					:
					<img src={posterUrl} alt={`${title} of Juggling and Flow Arts`}/>
				}
			</div>
		);
	}
}
