import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import ScrollToTop from './ScrollToTop'
import Hero from './components/Hero'
import Home from './components/home/Home'
import Gallery from './components/gallery/Gallery'
import { Events } from './components/events/Events'
import SignInContainer from './components/signin/SignInContainer'
import OfficerDashboard from './components/dashboards/OfficerDashboard'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import './styles/App.scss';

class App extends Component {

	getHeroPropsFromLocation = (routes, location)=>{
		if(location === '/')
			return {}
		console.log(location);
		const route = routes.find(r => r.path.includes(location) && r.path !== '/')
		return { ...route, miniHero:true};

	}
  render() {
  	const heroProps = this.getHeroPropsFromLocation(routeConfig, this.props.location.pathname)
    return (
			<ScrollToTop>
				<Hero {...heroProps}/>
				<Switch>
					{
						routeConfig.map(renderRouteWithSubRoutes)
					}
					<Route path="*" component={ NotFound }/>
				</Switch>
				<Footer />
			</ScrollToTop>
    );
  }
}

export default withRouter(App);

export const renderRouteWithSubRoutes = (route, i)=>{
	const path = route.path + (('optionalParams' in route) ? route.optionalParams.join('/') : '')
	return (
			<Route key={i} 
				exact
				path={path} 
				component={(props)=>(<route.component {...props} routes={route.routes} />)} 
				/>
		)


}

export const routeConfig = [
			{
				path:'/',
				component:Home,
				title:"Home"
			},
			{
				path:'/gallery/',
				optionalParams:[':id?'],
				component:Gallery,
				title:"Gallery",
				
			},
			{
				path:'/signin/',
				component:SignInContainer,
				title:"Sign In"
			},
			{
				path:'/events/',
				component:Events,
				title:"Events"
			},
			{
				path:'/dashboard/',
				component:OfficerDashboard,
				title:"Dashboard"
			}
		]
