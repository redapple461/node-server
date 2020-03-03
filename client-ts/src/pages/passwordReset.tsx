import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '../components/button';
import { sendEmail } from '../http/httpHook';
import { useSelector, useDispatch } from 'react-redux';
import { HeroStore } from '../interfaces/iStore/HeroStore';
import {redirectToResponse, setResponseMessage} from '../actions/';

export const PassworeResetPage = () => {
	let email: string ='';
	const fireRedirect = useSelector((state: HeroStore) => state.redirect);
	const dispatch = useDispatch();
	const send = () => {
		const btn = document.getElementById('sendBtn');
		btn.setAttribute('disabled', 'true');
		alert(email);
		sendEmail(email).then(res => {
			if (res.err){
				dispatch(setResponseMessage(res.err));
			} else {
				dispatch(setResponseMessage(res.message));
			}
			btn.setAttribute('disabled', 'false');
			dispatch(redirectToResponse());
		});
	};

	return(
		<div className='row'>
				<div className='col s6 offset-s3'>
					<h1> Reset password </h1>
					<div className='card teal lighten-4'>
						<div className='card-content white-test'>
							<div>
								<div className='input-field'>
									<input id='resetEmail' type='text' onChange={ e => email = e.target.value} />
									<label htmlFor='resetEmail'>Type your email </label>
								</div>
							</div>
							<div className='card-action'>
								<Button id='sendBtn' className='waves-effect waves-light btn yellow darken-4' text='Send email' onClick={() => send() }/>
								<Link to={{pathname: '/'}} >
									<Button className='waves-effect waves-light btn grey lighten-1' text='Back' />
								</Link>
							</div>
						</div>
					</div>
				</div>
				{fireRedirect && (
					<Redirect to={{pathname: '/response'}}/>
				)}
			</div>
	);
};
