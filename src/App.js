import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/home/Home'
import Gallery from './components/gallery/Gallery'
import { Events } from './components/events/Events'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import SignInContainer from './components/signin/SignInContainer'
import './styles/App.scss';

class App extends Component {
	login(user){
		console.log("Logged in as.", user);
	}
  render() {
    return (
		<Router>
			<div>
			<Switch>
				
				<Route exact path="/" component={Home}/>
				<Route exact path="/gallery/"  component={Gallery}/>
				<Route exact path="/gallery/:id"  component={Gallery}/>
				<Route exact path="/signin/"  component={()=>(<SignInContainer login={this.login}/>)}/>
				<Route exact path="/events/"  component={Events}/>
				<Route path="*" component={NotFound}/>
			</Switch>
			<Footer />
			</div>
		</Router>
    );
  }
}
//TODO: Events Page 
export default App;
