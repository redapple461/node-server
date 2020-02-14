import React from 'react';
import './App.css';
import {useRoutes} from './routes/routes';
import {BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css';

function App () {
	const routes = useRoutes();
	return (
	<Router>
		<div>
			{routes}
		</div>
	</Router>
	);
}

export default App;
