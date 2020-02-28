import React from 'react';
import './App.css';
import {useRoutes} from './routes/routes';
import {BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css';
import {useSelector} from 'react-redux';
import { HeroStore } from './interfaces/iStore/HeroStore';

function App () {
	const jwt = useSelector((state: HeroStore) => state.jwt);
	console.log(!!jwt);
	const routes = useRoutes(!!jwt);
	return (
	<Router>
		<div>
			{routes}
		</div>
	</Router>
	);
}

export default App;
