import {Hero} from '../models/Hero';
import {User} from '../models/User';

export const getHeroes = (token: string) => {
	return fetch('http://localhost:4000/getHeroes',{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	})
		.then(res => res.json());
};

export const addHero = (data: Hero, token: string) => {
	return fetch('http://localhost:4000/addHero', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	}).then(res => res.json());
};

export const getByName = async (name: string, token: string) => {
	// console.log(token);
	return fetch('http://localhost:4000/getHero/' + name, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	}).then(res => res.json());
};

export const deleteByName = (name: string, token: string) => {
	return fetch('http://localhost:4000/deleteHero/' + name, {
		method: 'DELETE',
		headers: {
			Authorization: token
		}
	});
};

export const updateHero = (oldName: string, body: Hero,token: string) => {
	return fetch('http://localhost:4000/updateHero/' + oldName, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	}).then(res => res.json());
};

export const signIn = (email: string, password: string) => {
	return fetch('http://localhost:4000/auth/login/', {
		method: 'POST',
		body: JSON.stringify({
			email,
			password
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());
};

export const register =(email: string, password: string, name: string, surname: string, phone: string) => {
	return fetch('http://localhost:4000/auth/register', {
		method: 'POST',
		body: JSON.stringify({
			email,
			password,
			name,
			surname,
			phone
		}),
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(res => res.json());
};

export const getUser = (id: string, token: string, user: User) => {
	return fetch(`http://localhost:4000/user/getUser/:${id}`, {
		method: 'GET',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	});
};

export const updateUser = (id: string, token: string, user: User) => {
	return fetch(`http://localhost:4000/user/updateUser/${id}`, {
		method: 'PUT',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	}).then(res => res.json());
};

export const sendEmail = (email: string) => {
	return fetch(`http://localhost:4000/auth/forgot`, {
		method: 'POST',
		body: JSON.stringify({email}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());
};

export const changePassword = (password: string, token: string) => {
	return fetch(`http://localhost:4000/auth/resetPassword`, {
		method: 'POST',
		body: JSON.stringify({password}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	}).then(res => res.json());
};

export const updateToken = (refreshToken: string) => {
	return fetch(`http://localhost:4000/auth/refreshToken`, {
		method: 'POST',
		headers: {
			Authorization: refreshToken
		},
		body: JSON.stringify(refreshToken)
	}).then(res => res.json());
};
