import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authenticateUser } from '../../store/actions/userActions'
class MemberSignIn extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	email:"",
	  	password:""
	  };
	}

	handleSubmit = (e)=>{
		const { email, password } = this.state
		e.preventDefault()
		this.props.authenticateUser(email, password)
	}

	render() {
		const { email, password } = this.state
		const { submitting, error } = this.props

		return (
			<div className="card signin">
				<h3>Officer Sign In</h3>
				<form onSubmit={this.handleSubmit} ref={(i)=>{ this.form = i }}>
					{error && <div className="error">{error}</div>}
					<div className="indicator"></div>
					<label htmlFor="email">Email</label>
					<input 
						id = "email" 
						type = "email"
						name = "email"
						value = {email}
						placeholder = "president@untjfa.com"
						onChange = {({target})=>{ this.setState({email:target.value}) }}
						required
					/>
					<label htmlFor="pass">Password</label>
					<input 
						id="pass" 
						type="password"
						name="pass"
						value = {password}
						required
						onChange = {({target})=>{ this.setState({password:target.value}) }}
					/>

					<button disabled={submitting} type="submit">
						{submitting ? <span>Doing that thing.</span> : <span>Login</span>}
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = ({users}) => ({
	submitting: users.authenticating,
	error:users.error
})
const mapDispatchToProps = dispatch => ({
	authenticateUser:bindActionCreators(authenticateUser, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(MemberSignIn)