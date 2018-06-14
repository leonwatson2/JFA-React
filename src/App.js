import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import ScrollToTop from './ScrollToTop'
import Hero from './components/Hero'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import './styles/App.scss';
import routeConfig from './routeConfig'
class App extends Component {

	getHeroPropsFromLocation = (routes, location)=>{
		if(location === '/')
			return {}
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
