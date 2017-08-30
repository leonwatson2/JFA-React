import React, { Component } from 'react';
import { connect } from 'react-redux'

class OfficerDashboard extends Component {
	componentWillMount() {
		console.log(this.props);
	}
	render() {
		const { officer } = this.props
		return (
			<div><h2>Officer Dashboard - { officer.name }</h2></div>
		);
	}
}

const mapStateToProps = ({users}) => ({
	officer:users.user,
	loggedIn:users.loggedIn
})
export default connect(mapStateToProps)(OfficerDashboard)