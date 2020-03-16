import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import './css/mainPage.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';
import {  Button } from '../components/button';
import {  RadioButton } from '../components/radio';
import { Dashboard } from '../components/dashboard';
import { EmptyHeroes } from '../components/emptyHeroes';
import { getHeroes, updateToken } from '../http/httpHook';
import { HeroStore } from '../interfaces/iStore/HeroStore';

export const MainPage = () => {
	const token = useSelector((state: HeroStore) => state.jwt);
	const universe =  useSelector((state: HeroStore) => state.searchUniverse);
	const heroes = useSelector((state: HeroStore) => state.heroes.slice(state.heroes.length - 4, state.heroes.length).reverse());
	const dispatch = useDispatch();
	const isUnLoad = useSelector((state: HeroStore) => state.noHeroes);
	const isLoad = useSelector((state: HeroStore) => state.isLoad);
	async function fetchData () {
		return  getHeroes(token)
		.then(async res => {
				if (res.message) {
					window.M.toast({html: res.message});
					if (res.message === 'jwt expired') {
						// alert('try to update token');
						const refreshToken = JSON.parse(localStorage.getItem('user_data')).refreshToken;
						// console.log('refresh '+refreshToken);
						// console.log('auth '+JSON.parse(localStorage.getItem('user_data')).token);
						return updateToken(refreshToken).then(async _res => {
							// console.log(_res);
							const newUserData = (JSON.parse(localStorage.getItem('user_data')));
							newUserData.token = _res.token;
							dispatch(actions.setJWT(_res.token));
							// console.log('test '+token);
							localStorage.setItem('user_data', JSON.stringify(newUserData));
							window.M.toast({html: 'Token updated'});
							// console.log('recursia');
							await getHeroes(_res.token)
								.then(data => {
									data.sort((a, b) => a.id - b.id);
									dispatch(actions.getData(data));
								});
						});
					}
				}
				res.sort((a, b) => a.id - b.id);
				dispatch(actions.getData(res));
			}
		);
	}

	useEffect(() => {
		if (isLoad) {
			dispatch(actions.clearDetailHero());
		}
		if (isUnLoad) {
			fetchData();
			dispatch(actions.loadComplete());
		}
	});

	const dashboard = heroes.length ? <Dashboard heroes={heroes}/> : <EmptyHeroes text='No heroes :('/>;

	const logout = () => {
		dispatch(actions.logout());
		localStorage.removeItem('user_data');
	};
	return(
		<>
			<div>
				<h1> Tours of heroes</h1>
				<Button className='waves-effect waves-light btn rightbtn' text='Logout' onClick={() => logout()}/>
				<Link to={{pathname: '/userProfile'}}>
					<Button  className='waves-effect waves-light btn rightbtn' text='Profile'/>
				</Link>
			</div>
			<div>
				<Link to={{pathname: '/heroes'}}>
					<Button  className='waves-effect waves-light btn' text='Heroes'/>
				</Link>
				<div >
					<RadioButton
						className='with-gap'
						value='Marvel'
						checked={universe === 'Marvel'}
						text='Marvel'
						dispatch={() => dispatch(actions.setMarvel())}
					/>
					<RadioButton
						className='with-gap'
						value='DC'
						checked={universe === 'DC'}
						text='DC'
						dispatch={() => dispatch(actions.setDC())}
					/>
					<RadioButton
						className='with-gap'
						value=''
						checked={universe === ''}
						text='Both'
						dispatch={() => dispatch(actions.setBoth())}
					/>
				</div>

			</div>
			{dashboard}
		</>
	);
};
