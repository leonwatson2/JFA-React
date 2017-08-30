import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import ScrollToTop from './ScrollToTop'
import Home from './components/home/Home'
import Gallery from './components/gallery/Gallery'
import { Events } from './components/events/Events'
import SignInContainer from './components/signin/SignInContainer'
import OfficerDashboard from './components/dashboards/OfficerDashboard'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import './styles/App.scss';

class App extends Component {
	login(user){
		console.log("Logged in as.", user);
	}
  render() {
    return (
		<Router>
			<ScrollToTop>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/gallery/"  component={Gallery}/>
					<Route exact path="/gallery/:id"  component={Gallery}/>
					<Route exact path="/signin/"  component={()=>(<SignInContainer login={this.login}/>)}/>
					<Route exact path="/events/"  component={Events}/>
					<Route exact path="/dashboard/"  component={OfficerDashboard}/>
					<Route path="*" component={NotFound}/>
				</Switch>
			<Footer />
			</ScrollToTop>
		</Router>
    );
  }
}

export default App;
