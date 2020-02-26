import React, { useEffect } from 'react';
import './css/authPage.css';
import { Button } from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/index';
import { HeroActionsType } from '../actions/types/HeroTypes';
import * as http from '../http/httpHook';
import { HeroStore } from '../interfaces/iStore/HeroStore';
import { Link } from 'react-router-dom';

export const AuthPage = () => {
	const email = useSelector((state: HeroStore) => state.email);
	const password = useSelector((state: HeroStore) => state.password);
	const storageName = 'userData';
	const dispatch = useDispatch();
	let timeout = null;

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))

		if (data && data.token) {
			dispatch(actions.setJWT(data.token));
			dispatch(actions.setUserId(data.userId));
		};
	});

	const inputEventHandler = (e: React.ChangeEvent<HTMLInputElement>, action: HeroActionsType) => {
		e.persist();
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch(action);
		}, 300);
	};

	const buttonEventHandler = () => {
		http.signIn(email, password)
		.then(res => {
			if (res.message) {
				return window.M.toast({html: res.message});
			}
			window.M.toast({html: `Hello ${res.name}`});
			localStorage.setItem(storageName, JSON.stringify({
				userId: res.userId,
				token: res.token
			}));
			dispatch(actions.setJWT(res.token));
			dispatch(actions.setUserId(res.userId));
		});
	};

	return(
			<div className='row'>
				<div className='col s6 offset-s3'>
					<h1> Auth page </h1>
					<div className='card teal lighten-1'>
						<div className='card-content white-test'>
							<div>
								<div className='input-field'>
									<input placeholder='Enter email' id='email' type='text' onChange={(e) => inputEventHandler(e, actions.setEmail(e.target.value))}/>
									<label htmlFor='email'>Email</label>
								</div>
								<div className='input-field'>
									<input placeholder='Enter password' id='password' type='password' onChange={(e) => inputEventHandler(e, actions.setPassword(e.target.value))}/>
									<label htmlFor='password'>Password</label>
								</div>
							</div>
							<div className='card-action'>
								<Button className='waves-effect waves-light btn yellow darken-4' text='Sign in' onClick={buttonEventHandler}/>
								<Link to={{pathname: '/register'}} >
									<Button className='waves-effect waves-light btn grey lighten-1' text='Register' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
}
