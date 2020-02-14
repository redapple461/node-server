import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { MainPage } from '../pages/mainPage';
import HeroList from '../pages/heroList';
import { NotFound } from '../pages/notFound';
import { HeroDetailPage } from '../pages/heroDetailPage';

export const useRoutes = () => {
	return (
		<Switch>
			<Route path='/main' component={MainPage}/>
			<Route path='/heroes' component={HeroList} />
			<Route path='/notFound'>
				<NotFound/>
			</Route>
			<Route path='/detailHero/:name' component={HeroDetailPage}/>
			<Route path='/' >
				<Redirect to='/main' />
			</Route>
			<Redirect to='/notFound' />
		</Switch>
	);
};
