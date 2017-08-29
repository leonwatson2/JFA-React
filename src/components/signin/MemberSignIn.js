import React, { Component } from 'react';


export default class MemberSignIn extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:"",
	  	password:"",
	  	error:"",
	  	submitting:false
	  };
	}
	handleSubmit = (e)=>{
		const { username, password } = this.state
		e.preventDefault()
		console.log( username, password);
			
	}
	render() {
		const { error, submitting, username, password } = this.state
		return (
			<div className="card signin">
				<h3>Member Sign In</h3>
				<form onSubmit={this.handleSubmit} ref={(i)=>{ this.form = i }}>
					{error && <div className="error">{error}</div>}
					<div className="indicator"></div>
					<label htmlFor="email">Email</label>
					<input 
						id = "email" 
						type = "email"
						name = "email"
						value = {username}
						placeholder = "president@untjfa.com"
						onChange = {({target})=>{ this.setState({username:target.value}) }}
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
						{submitting ? <span>Loading</span> : <span>Login</span>}
					</button>
					
					
				</form>
			</div>
		);
	}
}
