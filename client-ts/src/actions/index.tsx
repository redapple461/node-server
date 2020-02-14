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
		data: data
	};
}

export function loadComplete(): HeroActionsType {
	return{
		type: actions.HEROES_LOADED
	};
}

export function addHero(hero: Hero): HeroActionsType {
	return{
		type: actions.ADD_HERO,
		hero: hero
	};
}

export function deleteHero(id: number): HeroActionsType{
	return{
		type: actions.DELETE_HERO,
		id: id
	};
}

export function initDetailHero(hero: Hero): HeroActionsType {
	return{
		type: actions.INIT_HERO,
		hero: hero
	};
}

export function updateName(name: string): HeroActionsType {
	return{
		type: actions.UPDATE_NAME,
		newName: name
	};
}

export function updateUniverse(universe: string): HeroActionsType{
	return{
		type: actions.UPDATE_UNIVERSE,
		newUniverse: universe
	};
}

export function updateHero(): HeroActionsType {
	return{
		type: actions.UPDATE_HERO
	};
}

export function updateAddHeroName(name: string): HeroActionsType{
	return{
		type: actions.UPDATE_ADD_HERO_NAME,
		addName: name,
	};
}

export function updateAddHeroUniverse(universe: string): HeroActionsType{
	return{
		type: actions.UPDATE_ADD_HERO_UNIVERSE,
		addUniverse: universe
	};
}

export function clearDetailHero(): HeroActionsType{
	return{
		type: actions.CLEAR_DETAIL_HERO
	};
}

export function isLoad(): HeroActionsType {
	return{
		type: actions.DETAIL_LOADED
	};
}
