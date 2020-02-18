import { Hero } from '../models/Hero';
import {HeroActionsType} from '../actions/types/HeroTypes';
import * as actions from '../actions/HeroActions';

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
