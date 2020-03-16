import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './css/heroList.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/';
import { Button } from '../components/button';
import { RadioButton } from '../components/radio';
import { HeroesList } from '../components/hList';
import { EmptyHeroes } from '../components/emptyHeroes';
import { getHeroes, addHero, updateToken } from '../http/httpHook';
import { HeroStore } from '../interfaces/iStore/HeroStore';
import { refreshToken } from '../http/refreshToken.hook';

const HeroList = (props: any) => {
	const token = useSelector((state: HeroStore) => state.jwt);
	const heroes = useSelector((state: HeroStore) => state.heroes);
	const universe = useSelector((state: HeroStore) => state.searchUniverse);
	const isUnLoad = useSelector((state: HeroStore) => state.noHeroes);
	const heroToAdd = useSelector((state: HeroStore) => state.addHero);
	const isLoad = useSelector((state: HeroStore) => state.isLoad);
	const dispatch = useDispatch();
	let timeout = null;
	async function fetchData () {
		try {
			await getHeroes(token).then(async res => {
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
									res.sort((a, b) => a.id - b.id);
									dispatch(actions.getData(data));
								});
						});
					}
				}
				res.sort((a, b) => a.id - b.id);
				dispatch(actions.getData(res));
			});
		} catch (e) {
			// tslint:disable-next-line: no-console
			console.log(e);
		}
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

	const heroList = heroes.length ?  <HeroesList heroes={heroes} universe={universe} dispatch={dispatch}/> :  <EmptyHeroes/>;

	const add = async () => {
		try {
			addHero(heroToAdd, token).then(async res => {
			if (res.message === 'jwt expired') {
				window.M.toast({html: res.message});
				await refreshToken(dispatch).then(_res => addHero(heroToAdd, JSON.parse(localStorage.getItem('user_data')).token));
			}
			(document.getElementById('add_btn') as HTMLInputElement).disabled = true;
			dispatch(actions.addHero(res));
			dispatch(actions.clearAddHero());
			clearAddForm();
		});
			// window.M.toast({html: "Hero "+heroToAdd.name+" was added"})
		} catch (e) {
			// window.M.toast(e);
		}
	};

	const clearAddForm = () => {
		setTimeout(() => {
			(document.getElementById('rMarvel') as HTMLInputElement).checked = false;
			(document.getElementById('rDC') as HTMLInputElement).checked = false;
			(document.getElementById('power_hit') as HTMLInputElement).checked = false;
			(document.getElementById('heal') as HTMLInputElement).checked = false;
			(document.getElementById('add_btn') as HTMLInputElement).disabled = false;
			(document.getElementById('add_input') as HTMLInputElement).value = '';
		}, 300);
	};

	function onCheck (e: React.FormEvent<HTMLInputElement>){
		if (e.currentTarget.checked) {
			dispatch(actions.addSkill(e.currentTarget.value));
		} else {
			dispatch(actions.removeSkill(e.currentTarget.value));
		}
	}

	const inputEventHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch(actions.updateAddHeroName(e.target.value));
		}, 300);
	};

	const logout = () => {
		dispatch(actions.logout());
		localStorage.removeItem('user_data');
	};

	return(
		<>
			<h1> Heroes List</h1>
			<Button className='waves-effect waves-light btn rightbtn' text='Logout' onClick={() => logout()}/>
			<Link to={{pathname: '/userProfile'}}>
					<Button  className='waves-effect waves-light btn rightbtn' text='Profile'/>
				</Link>
			<Link to='/main'> <Button className='waves-effect waves-light btn' text='Dashboard'/></Link>
			{heroList}
			<div>
				Add new hero
				<input id='add_input' type='text' onChange={(e) => inputEventHadler(e)}/>
				<Button id='add_btn' className='waves-effect waves-light btn' onClick={add} text='Add hero'/>
				<div>
					<strong> Choose universe: </strong>
					<RadioButton id='rMarvel' name='group1' className='with-gap' value='Marvel' text='Marvel'  dispatch={() => dispatch(actions.updateAddHeroUniverse('Marvel'))}/>
					<RadioButton id='rDC' name='group1' className='with-gap' value='DC' text='DC'   dispatch={() => dispatch(actions.updateAddHeroUniverse('DC'))}/>
				</div>
				<div>
					<strong> Choose skills: </strong>
					<RadioButton id='power_hit'  type='checkbox' className='with-gap' value='Power Hit' text='Power Hit'   dispatch={onCheck}/>
					<RadioButton id='heal'  type='checkbox' className='with-gap' value='Heal' text='Heal'   dispatch={onCheck}/>
				</div>
			</div>
			<Button text='Go back' className='waves-effect waves-light btn' onClick={() => props.history.goBack()}/>
		</>
	);
};
export default HeroList;
