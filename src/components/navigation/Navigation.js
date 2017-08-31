import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { routeConfig } from '../../App'

export default class Navigation extends Component {
	closeNav = (e)=>{
		this.refs.navTrigger.checked = false
	}
	render() {
		return (
		<div className="nav-container">
			<Link to="/" className="logo">
				<img src={ require('../../assets/images/logo.png') } alt="Juggling and Flow Arts Logo"/>
			</Link>
			<input type="checkbox" id="nav-toggle" ref={'navTrigger'}/>
			<label className="nav-trigger" htmlFor="nav-toggle"><span></span></label>
			<ul className="nav">
				{
					routeConfig.map(({path, title})=>(
						<NavLink exact 
							key={path} 
							to={path}
							onClick={this.closeNav}>
							<li>{title}</li>
						</NavLink>
					))
				}
				<a onClick={this.closeNav}><li>Logout</li></a>
			</ul>

		</div>
		);
	}
}
