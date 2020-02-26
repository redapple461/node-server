import React, { useEffect } from 'react';
import './css/heroDetail.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';
import { NoPage } from '../components/404';
import {  Details } from '../components/detailPage';
import { RadioButton } from '../components/radio';
import { Button } from '../components/button';
import { getByName } from '../http/httpHook';
import { HeroStore } from '../interfaces/iStore/HeroStore';
import { updateHero } from '../http/httpHook';

export const HeroDetailPage = (props: any) => {
	const token = useSelector((state: HeroStore) => state.jwt);
	const oldname = useSelector((state: HeroStore) => state.oldName);
	const detailHero = useSelector((state: HeroStore) => state.detailHero);
	const dispatch = useDispatch();
	const isLoad = useSelector((state: HeroStore) => state.isLoad);
	async function fetchData () {
		try {
			await getByName(props.match.params.name, token)
			.then(res => {
				if (res.message) {
					return window.M.toast({html: 'No auth!!!'});
				}
				dispatch(actions.initDetailHero(res));
		});
		} catch (e) {
			// tslint:disable-next-line: no-console
			console.log(e);
		}
		}
	const goBack = () => {
		props.history.goBack();
	};

	useEffect(() => {
			if (isLoad === false) {
				fetchData();
				dispatch(actions.isLoad());
			}
	});

	if (!detailHero) {
		return (
			<NoPage name={props.match.params.name} />
		);
	}
	const logout = () => {
		dispatch(actions.logout());
		localStorage.removeItem('userData');
	};
	//               onChange={(e) => dispatch(actions.updateUniverse(e.target.value))}
	return(
		<>
				<Button className='waves-effect waves-light btn rightbtn' text='Logout' onClick={() => logout()}/>
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
					onClick={() => { updateHero(oldname, detailHero, token).then(() => dispatch(actions.updateHero()))} }
					text='Save'
				/>
			</>
	);
};
