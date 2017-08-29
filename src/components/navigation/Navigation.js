import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navigation extends Component {
	render() {
		return (
		<div className="nav-container">
			<a className="logo">
				<img src={ require('../../assets/images/logo.png') } alt="Juggling and Flow Arts Logo"/>
			</a>
			<input type="checkbox" id="nav-toggle"/>
			<label className="nav-trigger" htmlFor="nav-toggle"><span></span></label>
			<ul className="nav">
				<Link to="/gallery"><li>Gallery</li></Link>
				<Link to="/signin"><li>Signin</li></Link>
				<Link to="/events"><li>Events</li></Link>
				<a><li>Logout</li></a>
			</ul>
		</div>
		);
	}
}
