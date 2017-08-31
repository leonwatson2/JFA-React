import React, { Component } from 'react';
import HomeInfo from './HomeInfo'
import WhoInfo from './WhoInfo'
export default class Home extends Component {
	
	render() {
		return (
			<div>
				{ 
					infos.map((info)=>{
						return <HomeInfo key={info.id} {...info} />
					})
				}
				<WhoInfo title="Who are we?" subtitle="Wild Cats?" videos={videos}/>
			</div>
		);
	}
}

const infos = [
	{
		id:"mission",
		title:"Our Mission" ,
		text:"By doing things" 
	},
	{
		id:"how",
		title:"How we do it" ,
		text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate quas nesciunt voluptatum, eveniet sequi consequatur! Maiores minima nisi explicabo nam, blanditiis ullam, optio et autem dicta, eaque rem repellendus a!" 
	}
]
const videos = [
	{
		title:"President",
		name:"Leon",
		posterUrl:"http://untjfa.com/references/officers/president.jpg"
	},
	{
		title:"Vice President",
		name:"Timothy",
		posterUrl:"http://untjfa.com/references/officers/vice_president.jpg"
	},
	{
		title:"Advisor",
		name:"Rachel ^2",
		posterUrl:"http://untjfa.com/references/officers/advisor.jpg"
	},
	{
		title:"Historian",
		name:"Steven",
		posterUrl:"http://untjfa.com/references/officers/historian.jpg"
	},
	{
		title:"Social Media Ninja",
		name:"Jastinee",
		posterUrl:"http://untjfa.com/references/officers/social_media_ninja.jpg"
	},
]

