import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { HeroStore } from '../interfaces/iStore/HeroStore';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { User } from '../models/User';
import { updateUser } from '../http/httpHook';
import * as actions from '../actions/';

export const UserProfile = () => {
	const user: User = useSelector((state: HeroStore) => state.user);
	const dispatch = useDispatch();
	const token = useSelector((state: HeroStore) => state.jwt);
	const tempUser: User = user;

	const updateBtn = (btnId: string, inputId: string, defaultContent: string) => {
		const btn = document.getElementById(btnId);
		const input = document.getElementById(inputId);
		if (input.getAttribute('type') === 'hidden') {
			input.setAttribute('type', 'text');
			btn.textContent = 'hide input';
		} else {
			input.setAttribute('type', 'hidden');
			btn.textContent = `Update ${defaultContent}`;
		}
	};

	const update = () => {
		updateUser(user._id, token, tempUser).then(res => {
			if (res.error) {
				window.M.toast({html: res.error});
			} else {
				dispatch(actions.updateUserSurname(tempUser.surname));
				dispatch(actions.updateUserPhone(tempUser.phone));
				dispatch(actions.updateUserName(tempUser.name));
				window.M.toast({html: res.msg});
			}
		});
	}

	return(
		<>
			<div className='row'>
				<div className='col s6 offset-s3'>
					<h1> {user.name} profile </h1>
					<div className='card teal lighten-4'>
						<div className='card-content white-test'>
							<div>
								<h4>Name:
									<span> {user.name}</span>
									<Button
										id='nameBtn'
										onClick={() => updateBtn('nameBtn', 'nameInput', 'name')}
										className='waves-effect waves-light btn rightbtn'
										text='update name'
									/>
									<input id='nameInput' type='hidden' onChange={(e) => tempUser.name = e.target.value}/>
								</h4>
								<h4>Surname:
									<span> {user.surname}</span>
									<Button
										id='surnameBtn'
										onClick={() => updateBtn('surnameBtn', 'surnameInput', 'surname')}
										className='waves-effect waves-light btn rightbtn'
										text='update surname'
									/>
									<input id='surnameInput' type='hidden' onChange={(e) => tempUser.surname = e.target.value}/>
								</h4>
								<h4>Phone:
									<span> {user.phone}</span>
									<Button
										id='phoneBtn'
										onClick={() => updateBtn('phoneBtn', 'phoneInput', 'phone')}
										className='waves-effect waves-light btn rightbtn'
										text='update phone'
									/>
									<input id='phoneInput' type='hidden' onChange={(e) => tempUser.phone = e.target.value}/>
								</h4>
							</div>
							<div className='card-action'>
								<Link to={{pathname: '/'}} >
									<Button className='waves-effect waves-light btn grey lighten-1' text='Back' />
								</Link>
								<Button onClick={() => update()} className='waves-effect waves-light btn orange lighten-1' text='save' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};


/* 
	<h4>Email:
									<span> {user.email}</span>
									<Button
										id='emailBtn'
										onClick={() => updateBtn('emailBtn', 'emailInput', 'email')}
										className='waves-effect waves-light btn rightbtn'
										text='update email'
									/>
									<input id='emailInput' type='hidden' onChange={(e) => dispatch(actions.updateUserEmail(e.target.value))}/>
								</h4>
*/