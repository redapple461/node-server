import React, { useEffect } from 'react';
import './css/authPage.css';
import { Button } from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/index';
import { HeroActionsType } from '../actions/types/HeroTypes';
import { HeroStore } from '../interfaces/iStore/HeroStore';
import { Link } from 'react-router-dom';
import * as http from '../http/httpHook';

export  const AuthPage = () => {
	const email = useSelector((state: HeroStore) => state.email);
	const password = useSelector((state: HeroStore) => state.password);
	const storageName = 'user_data';
	const dispatch = useDispatch();
	let timeout = null;

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));

		if (data && data.token) {
			dispatch(actions.setJWT(data.token));
			dispatch(actions.setUser(data.user));
		}
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
			if (res.errors) {
				return res.errors.errors.forEach(error => {
					window.M.toast({html: error.msg});
				});
		}
			if (res.error){
				return window.M.toast({html: res.error});
			}
			window.M.toast({html: `Hello ${res.user.name}`});
			localStorage.setItem(storageName, JSON.stringify({
				user: res.user,
				token: res.authToken,
				refreshToken: res.refreshToken
			}));
			dispatch(actions.setJWT(res.token));
			dispatch(actions.setUser(res.user));
		});
	};

	return(
			<div className='row'>
				<div className='col s6 offset-s3'>
					<h1> Auth page </h1>
					<div className='card teal lighten-4'>
						<div className='card-content white-test'>
							<div>
								<div className='input-field'>
									<input id='email' type='text' onChange={(e) => inputEventHandler(e, actions.setEmail(e.target.value))}/>
									<label htmlFor='email'>Email</label>
								</div>
								<div className='input-field'>
									<input id='password' type='password' onChange={(e) => inputEventHandler(e, actions.setPassword(e.target.value))}/>
									<label htmlFor='password'>Password</label>
									<Link style={{fontSize: '13px'}}to={{pathname: '/passwordReset'}} > Forgor password ?</Link>
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
