import React, { Component } from 'react';
import Hero from './Hero'

export default class NotFound extends Component {
	render() {
		return (
			<div >
				<Hero title="404" miniHero={true}/>
				<div className="container-404">
					
					<h2>Do you ever feel lost?</h2>
					<h4>That's how we feel right now. </h4>
					<span><small>because we couldn't find that page.</small></span>
					<svg xmlns="http://www.w3.org/2000/svg" height="164" version="1.1" width="164" viewBox="0 0 64 64" id="smile">
					  
					  <path id="face-body" fill="black" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" d="m5 5 L 56 5 L 56 56L 5 56z" transform="translate(1.5830593, 1.5830584)"/>
					  <path className="mouth" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" d="M19.38 39.9C19.38 39.9 24.24 45.19 32.15 45.19 40.06 45.19 44.92 39.9 44.92 39.9"/>
					  <path id="left-eye"  className="eye" fill="#fff" d="m25.25 20a4.29 4.25 0 1 1-8.59 0 4.29 4.25 0 1 1 8.59 0z" transform="translate(2,0)"/>
					  <path id="right-eye" className="eye" fill="#fff" d="m25.25 20a4.29 4.25 0 1 1-8.59 0 4.29 4.25 0 1 1 8.59 0z" transform="translate(20.09578,-5.2209472e-7)"/>
					</svg>
				</div>
  
			</div>
		);
	}
}
