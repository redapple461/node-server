import {Hero} from '../models/Hero';

export const getHeroes = () => {
		return fetch('http://localhost:4000/getHeroes')
				.then(res => res.json());
};

export const addHero = (data: Hero) => {
		return fetch('http://localhost:4000/addHero', {
								method: 'POST',
								body: JSON.stringify(data),
								headers: {
									'Content-Type': 'application/json'
								}
						}).then(res => res.json());
};

export const getByName = (name: string) => {
		return fetch('http://localhost:4000/getHero/' + name)
				.then(res => res.json());
};

export const deleteByName = (name: string) => {
		return fetch('http://localhost:4000/deleteHero/' + name, {
				method: 'DELETE'
	});
};

export const updateHero = (oldName: string, body: Hero) => {
		return fetch('http://localhost:4000/updateHero/' + oldName, {
								method: 'PUT',
								body: JSON.stringify(body),
								headers: {
										'Content-Type': 'application/json'
								}
						}).then(res => res.json());
};