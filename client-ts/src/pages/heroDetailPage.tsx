import React, { useEffect } from 'react';
import './css/heroDetail.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';
import { NoPage } from '../components/404';
import {  Details } from '../components/detailPage';
import { RadioButton } from '../components/radio';
import { Button } from '../components/button';
import { getByName, updateHero, updateToken } from '../http/httpHook';
import { HeroStore } from '../interfaces/iStore/HeroStore';
import { Link } from 'react-router-dom';
import { refreshToken } from '../http/refreshToken.hook';

export const HeroDetailPage = (props: any) => {
	const token = useSelector((state: HeroStore) => state.jwt);
	const oldname = useSelector((state: HeroStore) => state.oldName);
	const detailHero = useSelector((state: HeroStore) => state.detailHero);
	const dispatch = useDispatch();
	const isLoad = useSelector((state: HeroStore) => state.isLoad);
	async function fetchData () {
		//  JSON.parse(localStorage.getItem('userData')).refreshToken
		const name = props.match.params.name;
		try {
			await getByName(name, token)
			.then(async res => {
				if (res.message) {
					window.M.toast({html: res.message});
					if (res.message === 'jwt expired') {
						// alert('try to update token');
						const refToken = JSON.parse(localStorage.getItem('user_data')).refreshToken;
						// console.log('refresh '+refreshToken);
						// console.log('auth '+JSON.parse(localStorage.getItem('user_data')).token);
						return updateToken(refToken).then(async _res => {
							// console.log(_res);
							const newUserData = (JSON.parse(localStorage.getItem('user_data')));
							newUserData.token = _res.token;
							dispatch(actions.setJWT(_res.token));
							// console.log('test '+token);
							localStorage.setItem('user_data', JSON.stringify(newUserData));
							window.M.toast({html: 'Token updated'});
							// console.log('recursia');
						});
					}
				}
				dispatch(actions.initDetailHero(res));
		});
		} catch (e) {
			// tslint:disable-next-line: no-console
			console.log(e.message);
		}
	}
	const goBack = () => {
		props.history.goBack();
	};

	useEffect(() => {
			if (isLoad === false) {
				fetchData().then(() => dispatch(actions.isLoad()));
			}
	});

	if (!detailHero) {
		return (
			<NoPage name={props.match.params.name} />
		);
	}
	const logout = () => {
		dispatch(actions.logout());
		localStorage.removeItem('user_data');
	};
	//               onChange={(e) => dispatch(actions.updateUniverse(e.target.value))}
	return(
		<>
				<Button className='waves-effect waves-light btn rightbtn' text='Logout' onClick={() => logout()}/>
				<Link to={{pathname: '/userProfile'}}>
					<Button  className='waves-effect waves-light btn rightbtn' text='Profile'/>
				</Link>
				<Details name={detailHero.name} id={detailHero.id} universe={detailHero.universe} skills={detailHero.skills}/>
				<div className='form'>
					<p> Type new name of hero and choose his universe</p>
					<input
						type='text'
						placeholder={detailHero.name}
						onChange={(e) => {dispatch(actions.updateName(e.target.value)); }}
					/>
					<div>
						<RadioButton
								className='with-gap'
								value='Marvel'
								text='Marvel'
								checked={detailHero.universe === 'Marvel'}
								dispatch={() =>  dispatch(actions.updateUniverse('Marvel'))}
							/>
						<RadioButton
							className='with-gap'
							value='DC'
							text='DC'
							checked={detailHero.universe === 'DC'}
							dispatch={() =>  dispatch(actions.updateUniverse('DC'))}
						/>
					</div>
				</div>

				<Button
					className='waves-effect waves-light btn'
					type='button'
					onClick={() => {goBack(); }}
					text='Back'
				/>
				<Button
					className='waves-effect waves-light btn'
					type='button'
					onClick={() => { updateHero(oldname, detailHero, token).then(async (res) => {
						window.M.toast({html: res.message});
						if (res.message === 'jwt expired') {
							//window.M.toast({html: 'Token expired'});
							await refreshToken(dispatch).then(_res => updateHero(oldname, detailHero, JSON.parse(localStorage.getItem('user_data')).token));
						}
						dispatch(actions.updateHero());
					})} }
					text='Save'
				/>
			</>
	);
};
