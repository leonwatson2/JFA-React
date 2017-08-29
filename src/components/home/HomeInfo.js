import React, { Component } from 'react';

export default class HomeInfo extends Component {
	render(props) {
		const { id, title, text } = this.props
		
		return (
	<section id={id}>
		<div className="content">
		{
			id === 'how' ? 
			<div className="promo-img-left">
				<img 
					src="https://scontent-dft4-1.cdninstagram.com/t51.2885-15/e35/14295531_1149735241769034_205130704663609344_n.jpg?ig_cache_key=MTM1MDc5Mjc4NDk1NjY1MTgxNA%3D%3D.2" 
					alt="Member Juggling" />
			</div> : null
		}
			<div className="message">
				<h2>{title}</h2>
				<p>{text}</p>
			</div>
		</div>
	</section>
		);
	}
}
