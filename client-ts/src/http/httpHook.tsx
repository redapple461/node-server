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

export const getByName = (name: string, token: string) => {
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

export const change = (id: string, token: string, user: User) => {
	return fetch(`http://localhost:4000/user/getUser/:${id}`, {
		method: 'GET',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	});
}