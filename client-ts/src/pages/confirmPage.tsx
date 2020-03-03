import React from 'react';
import { Button } from '../components/button';
import { changePassword } from '../http/httpHook';
import bcrytp from 'bcryptjs';

export const ConfirmPage = (props) => {
	let firstPassword: string = '';
	let confirmPassword: string = '';

	const change = () => {
		if (firstPassword === '' || confirmPassword === '') {
			return alert('Missed password');
		}
		if (firstPassword !== confirmPassword) {
			return alert('Password not equal');
		} else {
			if (firstPassword.length < 7) {
				return alert('Password length is less then 7');
			}
			bcrytp.hash(firstPassword, 5).then(_res =>
				changePassword(_res, props.match.params.token).then(res => {
					if (res.error) {
						window.M.toast({html: res.error});
					} else {
						window.M.toast({html: 'Password changed'});					}
				})
			);
		}
	};

	return(
		<>
			<div className='row'>
				<div className='col s6 offset-s3'>
					<div className='card teal lighten-4'>
						<div className='card-title'>
							Type your new password
						</div>
						<div className='card-content'>
							<div className='input-field'>
								<input id='first-password' type='text' onChange={(e) => firstPassword = e.target.value}/>
								<label htmlFor='first-password'>Type new password</label>
							</div>
							<div className='input-field'>
								<input id='second-password' type='text' onChange={(e) => confirmPassword = e.target.value}/>
								<label htmlFor='second-password'>Confrim password</label>
							</div>
						</div>
						<div className='card-actions'>
						<Button className='waves-effect waves-light btn yellow darken-4' text='Change password' onClick={() => change() }/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
