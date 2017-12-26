import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { DashboardMenu } from './OfficerDashboard/DashboardMenu'
class OfficerDashboard extends Component {
	componentWillMount() {
		if(!this.props.officer)
			this.props.history.push('/signin/')
	}
	render() {
		const { officer, loggedIn } = this.props
		if(!loggedIn){
			return <Redirect to="/signin/" />
		}
		return (
			<div><h2>Officer Dashboard - { officer && officer.name }</h2>
			<DashboardMenu  />
			
			</div>
		);
	}
}

const mapStateToProps = ({users}) => ({
	officer:users.user,
	loggedIn:users.loggedIn
})
export default withRouter(connect(mapStateToProps)(OfficerDashboard))