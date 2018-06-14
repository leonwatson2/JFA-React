import React, { Component } from 'react';
import Navigation from './navigation/Navigation';
import PropTypes from 'prop-types'

export default class Hero extends Component {
	render() {
		const { title, miniHero } = this.props;
		return (
			<section id="home-hero" className={ miniHero && `mini-hero`}>
				<Navigation />
				<div className="content">
					<h1>{title}</h1>
					
					<jfa-checkin></jfa-checkin>
					
				</div>
			</section>
		);
	}
}
Hero.defaultProps = {
	title:"Juggling and Flow Arts",
	miniHero:false
}

Hero.propTypes = {
  title: PropTypes.string,
  miniHero: PropTypes.bool
}