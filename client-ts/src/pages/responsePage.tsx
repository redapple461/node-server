import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/button';
import { useSelector, useDispatch } from 'react-redux';
import { HeroStore } from '../interfaces/iStore/HeroStore';
import { setResponseMessage, redirectToResponse } from '../actions';

export const ResponsePage = () => {
	const redirect = useSelector((store: HeroStore) => store.redirect);
	const responseMessage = useSelector((store: HeroStore) => store.responseMessage);
	const dispatch = useDispatch();

	useEffect(() => {
		if (redirect === true) {
			dispatch(redirectToResponse());
		}
	});
	const clearMsg = () => {
		dispatch(setResponseMessage(''));

	}
	return(
		<div className='row'>
				<div className='col s6 offset-s3'>
					<h1> Response message</h1>
					<div className='card teal lighten-4'>
						<div className='card-content white-test'>
							<div>
								<div className='input-field'>
									<h3>{responseMessage}</h3>
								</div>
							</div>
							<div className='card-action'>
								<Link to={{pathname: '/'}} >
									<Button className='waves-effect waves-light btn grey lighten-1' text='Back' onClick={() => clearMsg()}/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
	)
}