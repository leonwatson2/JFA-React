import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
class OfficerDashboard extends Component {
	componentWillMount() {
		if(!this.props.officer)
			this.props.history.push('/signin')
	}
	render() {
		const { officer } = this.props
		return (
			<div><h2>Officer Dashboard - { officer && officer.name }</h2></div>
		);
	}
}

const mapStateToProps = ({users}) => ({
	officer:users.user,
	loggedIn:users.loggedIn
})
export default withRouter(connect(mapStateToProps)(OfficerDashboard))