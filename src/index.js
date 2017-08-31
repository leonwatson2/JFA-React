import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { store } from './store/client.js'
ReactDOM.render(
	
	    <IntlProvider locale="en">
	    	<Router>
		    	<Provider store={store}>
		    		<App />
		    	</Provider>
	    	</Router>
	    </IntlProvider>

	, document.getElementById('root'));
registerServiceWorker();
