import React, { Component } from 'react';
import Hero from '../Hero';
import MemberSignIn from './MemberSignIn';

export default class SignInContainer extends Component {
	login = (user)=>{
		

	}
	render() {
		return (
			<div>
				<Hero title={'Login'} miniHero={true}/>
				<div className="main">
					<MemberSignIn />
				</div>
			</div>
		);
	}
}
