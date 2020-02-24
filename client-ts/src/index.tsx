import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

declare global {
	interface Window { 
		__REDUX_DEVTOOLS_EXTENSION__: any;
		__PRELOADED_STATE__: any;
	}
}

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(reducer, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.hydrate(
(
<Provider store={store}>
	<App />
</Provider>
)
, document.getElementById('root'));
