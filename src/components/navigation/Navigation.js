import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { routeConfig } from '../../App'
import { logoutUser } from '../../store/actions/userActions'

export class Navigation extends Component {
	closeNav = (e)=>{
		this.refs.navTrigger.checked = false
	}

	logout = (e)=>{
		this.props.logout()
		this.closeNav()
	}
	render() {
		const { loggedIn } = this.props
		return (
		<div className="nav-container">
			<Link to="/" className="logo">
				<img src={ require('../../assets/images/logo.png') } alt="Juggling and Flow Arts Logo"/>
			</Link>
			<input type="checkbox" id="nav-toggle" ref={'navTrigger'}/>
			<label className="nav-trigger" htmlFor="nav-toggle"><span></span></label>
			<ul className="nav">
				{
					routeConfig.filter(({admin})=>{
						return (admin === undefined || admin === loggedIn)
					}).map(({path, title})=>(
						<NavLink exact 
							key={path} 
							to={path}
							onClick={this.closeNav}>
							<li>{title}</li>
						</NavLink>
					))
				}
				{
				loggedIn && <a onClick={this.logout}><li>Logout</li></a>
				}
			</ul>

		</div>
		);
	}
}
const mapStateToProps = state => ({
	loggedIn:state.users.loggedIn
})
const mapDispatchToProps = dispatch =>({
	logout:bindActionCreators(logoutUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)