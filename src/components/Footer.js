import React, { Component } from 'react';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/lib/fa'

export default class Footer extends Component {
	render() {

		return (
			<section id="footer">
				<div className="links">
					
					<ul className="socials">
					<span>Join Us</span>
						{
							socialLinks.map((social)=>
								(<SocialLink key={social.url} {...social} />))
						}
					</ul>
				</div>

					<div className="copyright">
						<a href="#0" className="cd-logo">
						<img src={require("../assets/images/logo.png")} alt="Logo" /></a>
						<div>&copy; Juggling and Flow Arts</div>
					</div>
			</section>
		);
	}
}

export const SocialLink = (props) => {
	const { url, Icon, className } = props
	const font3x = {fontSize:'3em'}

	return (
	<a href={url} 
		target="_blank" 
		className={`badge social ${className}`}>
		<Icon style={font3x}/>
	</a>

	);
}

const socialLinks = 
[
	{
		url:"https://twitter.com/untjfa",
		className:"twitter",
		Icon:FaTwitter
	},
	{
		url:"https://instagram.com/untjfa",
		className:"instagram",
		Icon:FaInstagram
	},
	{
		url:"https://www.facebook.com/pg/JugglingFlowArts",
		className:"facebook",
		Icon:FaFacebook
	}
] 
