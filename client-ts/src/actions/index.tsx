import { Hero } from '../models/Hero';
import {HeroActionsType} from '../actions/types/HeroTypes';
import * as actions from '../actions/HeroActions';
import { User } from '../models/User';

export function setMarvel (): HeroActionsType {
	return{
		type: actions.SET_MARVEL
	};
}

export  function setDC (): HeroActionsType {
	return{
		type: actions.SET_DC
	};
}

export function setBoth (): HeroActionsType{
	return{
		type: actions.SET_BOTH
	};
}

export function getData (data: Hero[]): HeroActionsType {
	return{
		type: actions.GET_DATA,
		data
	};
}

export function loadComplete (): HeroActionsType {
	return{
		type: actions.HEROES_LOADED
	};
}

export function addHero (hero: Hero): HeroActionsType {
	return{
		type: actions.ADD_HERO,
		hero
	};
}

export function deleteHero (id: number): HeroActionsType{
	return{
		type: actions.DELETE_HERO,
		id
	};
}

export function initDetailHero (hero: Hero): HeroActionsType {
	return{
		type: actions.INIT_HERO,
		hero
	};
}

export function updateName (newName: string): HeroActionsType {
	return{
		type: actions.UPDATE_NAME,
		newName
	};
}

export function updateUniverse (newUniverse: string): HeroActionsType{
	return{
		type: actions.UPDATE_UNIVERSE,
		newUniverse
	};
}

export function updateHero (): HeroActionsType {
	return{
		type: actions.UPDATE_HERO
	};
}

export function updateAddHeroName (addName: string): HeroActionsType{
	return{
		type: actions.UPDATE_ADD_HERO_NAME,
		addName
	};
}

export function updateAddHeroUniverse (addUniverse: string): HeroActionsType{
	return{
		type: actions.UPDATE_ADD_HERO_UNIVERSE,
		addUniverse
	};
}

export function clearDetailHero (): HeroActionsType{
	return{
		type: actions.CLEAR_DETAIL_HERO
	};
}

export function isLoad (): HeroActionsType {
	return{
		type: actions.DETAIL_LOADED
	};
}

export function addSkill (skillToAdd: string): HeroActionsType{
	return{
		type: actions.ADD_ASKILL,
		skillToAdd
	};
}

export function removeSkill (skillToRemove: string): HeroActionsType {
	return{
		type: actions.REMOVE_ASKILL,
		skillToRemove
	};
}

export function clearAddHero () {
	return{
		type: actions.CLEAR_ADD_HERO
	};
}

export function setEmail (email: string): HeroActionsType {
	return{
		type: actions.SET_EMAIL,
		email
	};
}

export function setPassword (password: string): HeroActionsType {
	return{
		type: actions.SET_PASSWORD,
		password
	};
}

export function setRegEmail (regEmail: string): HeroActionsType {
	return{
		type: actions.SET_REG_EMAIL,
		regEmail
	};
}

export function setRegPassword (regPassword: string): HeroActionsType {
	return{
		type: actions.SET_REG_PASSWORD,
		regPassword
	};
}

export function setUserId (userId: string): HeroActionsType {
	return{
		type: actions.SET_USER_ID,
		userId
	};
}

export function setJWT (jwt: string): HeroActionsType {
	return{
		type: actions.SET_JWT,
		jwt
	};
}

export function logout (): HeroActionsType {
	return{
		type: actions.LOGOUT
	}
}

export function setUserName (userName: string): HeroActionsType {
	return{
		type: actions.SET_USER_NAME,
		userName
	};
}

export function setUserSurname (surname: string): HeroActionsType {
	return{
		type: actions.SET_USER_SURNAME,
		surname
	};
}

export function setUserPhone (phone: string): HeroActionsType {
	return{
		type: actions.SET_USER_PHONE,
		phone
	};
}

export function clearRegData (): HeroActionsType {
	return{
		type: actions.CLEAR_REG_DATA
	};
}

export function setUser (user: User): HeroActionsType {
	return{
		type: actions.SET_USER,
		user
	};
}

export function updateUserName (newName: string): HeroActionsType {
	return{
		type: actions.UPDATE_USER_NAME,
		newName
	};
}

export function updateUserSurname (newSurname: string): HeroActionsType {
	return{
		type: actions.UPDATE_USER_SURNAME,
		newSurname
	};
}

export function updateUserEmail (newEmail: string): HeroActionsType {
	return{
		type: actions.UPDATE_USER_EMAIL,
		newEmail
	};
}

export function updateUserPhone (newPhone: string): HeroActionsType {
	return{
		type: actions.UPDATE_USER_PHONE,
		newPhone
	};
}

export function updateUserPassword (newPassword: string): HeroActionsType {
	return{
		type: actions.UPDATE_USER_PASSWORD,
		newPassword
	};
}

export function redirectToResponse (): HeroActionsType {
	return {
		type: actions.REDIRECT_TO_RESPONSE
	}
}

export function setResponseMessage (responseMessage: string): HeroActionsType {
	return {
		type: actions.SET_RESPONSE_MESSAGE,
		responseMessage
	}
}
