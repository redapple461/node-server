import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { MainPage } from '../pages/mainPage';
import HeroList from '../pages/heroList';
import { NotFound } from '../pages/notFound';
import { HeroDetailPage } from '../pages/heroDetailPage';
import { AuthPage } from '../pages/authPage';
import { RegisterPage } from '../pages/registerPage';
import { UserProfile } from '../pages/userProfile';

export const useRoutes = (isAuth: boolean) => {
	if (isAuth) {
		return (
			<Switch>
				<Route path='/main' component={MainPage} />
				<Route path='/heroes' component={HeroList} />
				<Route path='/notFound'>
					<NotFound/>
				</Route>
				<Route path='/detailHero/:name' component={HeroDetailPage} />
				<Route path='/userProfile' component={UserProfile} />
				<Route path=''>
					<Redirect to='/main' />
				</Route>
				<Redirect to='/notFound' />
			</Switch>
		);
	} else {
		return (
			<Switch>
				<Route path='/login' component={AuthPage} />
				<Route path='/register' component={RegisterPage} />
				<Route path='/'>
					<Redirect to='/login' />
				</Route>
			</Switch>
		);
	}
};
