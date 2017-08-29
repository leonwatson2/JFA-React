import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { store } from './store/client.js'
ReactDOM.render(
	
	    <IntlProvider locale="en">
	    	<Provider store={store}>
	    		<App />
	    	</Provider>
	    </IntlProvider>

	, document.getElementById('root'));
registerServiceWorker();
