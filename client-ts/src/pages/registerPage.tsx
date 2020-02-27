import React, { useEffect } from 'react';
import './css/authPage.css';
import { Button } from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/index';
import { HeroActionsType } from '../actions/types/HeroTypes';
import * as http from '../http/httpHook';
import { HeroStore } from '../interfaces/iStore/HeroStore';
import { Link } from 'react-router-dom';

export const RegisterPage = (props) => {
	const email = useSelector((state: HeroStore) => state.registerEmail);
	const password = useSelector((state: HeroStore) => state.registerPassowrd);
	const name =  	useSelector((state: HeroStore) => state.userName);
	const surname = useSelector((state: HeroStore) => state.surname);
	const phone  = useSelector((state: HeroStore) => state.phone);
	const storageName = 'user_data';
	const dispatch = useDispatch();
	let timeout = null;

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))

		if (data && data.token) {
			dispatch(actions.setJWT(data.token));
			dispatch(actions.setUserId(data.userId));
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
		http.register(email, password, name, surname, phone)
		.then(res => {
			if (res.errors) {
				return res.errors.errors.forEach(error => {
					window.M.toast({html: error.msg});
				});
			}
			window.M.toast({html: res.message});
			dispatch(actions.clearRegData());
			props.history.push('/');
		});
	};

	return(
			<div className='row'>
				<div className='col s6 offset-s3'>
					<h1> Registrate page </h1>
					<div className='card teal lighten-4'>
						<div className='card-content white-test'>
							<div>
								<div className='input-field'>
									<input id='email' type='text' onChange={(e) => inputEventHandler(e, actions.setRegEmail(e.target.value))}/>
									<label htmlFor='email'>Email</label>
								</div>
								<div className='input-field'>
									<input id='password' type='password' onChange={(e) => inputEventHandler(e, actions.setRegPassword(e.target.value))}/>
									<label htmlFor='password'>Password</label>
								</div>
								<div className='input-field'>
									<input id='name' type='text' onChange={(e) => inputEventHandler(e, actions.setUserName(e.target.value))}/>
									<label htmlFor='name'>Name</label>
								</div>
								<div className='input-field'>
									<input id='surname' type='text' onChange={(e) => inputEventHandler(e, actions.setUserSurname(e.target.value))}/>
									<label htmlFor='surname'>Surname</label>
								</div>
								<div className='input-field'>
									<input id='phone' type='text' onChange={(e) => inputEventHandler(e, actions.setUserPhone(e.target.value))}/>
									<label htmlFor='phone'>Phone</label>
								</div>
							</div>
							<div className='card-action'>
								<Button className='waves-effect waves-light btn yellow darken-4' text='Register' onClick={buttonEventHandler}/>
								<Link to={{pathname: '/'}} >
									<Button className='waves-effect waves-light btn grey lighten-1' text='Back' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};
