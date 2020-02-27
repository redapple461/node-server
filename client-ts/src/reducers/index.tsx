import { Hero } from '../models/Hero';
import { HeroStore } from '../interfaces/iStore/HeroStore';
import { HeroActionsType } from '../actions/types/HeroTypes';
import * as actions from '../actions/HeroActions';

const init: HeroStore = {
	searchUniverse: '',
	heroes: [],
	oldName: '',
	addHero: {name: '', universe: '', skills: []},
	detailHero: null,
	isLoad: false,
	noHeroes: true,
	email: '',
	password: '',
	registerEmail: '',
	registerPassowrd: '',
	userId: '',
	jwt: '',
	userName: '',
	surname: '',
	phone: '',
	user: null
};

export default function reducer (state = init, action?: HeroActionsType): HeroStore {

	switch (action.type) {
		case actions.SET_MARVEL:
			return{
				...state,
				searchUniverse: 'Marvel'
			};
		case actions.DETAIL_LOADED:
			return{
				...state,
				isLoad: true
			};
		case actions.SET_DC:
			return{
				...state,
				searchUniverse: 'DC'
			};
		case actions.SET_BOTH:
			return{
				...state,
				searchUniverse: ''
			};
		case actions.GET_DATA:
			return{
				...state,
				heroes: action.data
			};
		case actions.HEROES_LOADED:
			return{
				...state,
				noHeroes: false
			};
		case actions.ADD_HERO:
			return{
				...state,
				heroes: state.heroes.concat(action.hero)
			};
		case actions.UPDATE_ADD_HERO_NAME:
			return{
				...state,
				addHero: {...state.addHero, name: action.addName}
			};
		case actions.UPDATE_ADD_HERO_UNIVERSE:
			return{
				...state,
				addHero: {...state.addHero, universe: action.addUniverse}
			};
		case actions.DELETE_HERO:
			return{
				...state,
				heroes: state.heroes.filter((hero: Hero) => hero.id !== action.id)
			};
		case actions.INIT_HERO:
			return{
				...state,
				detailHero: action.hero,
				oldName: action.hero.name
			};
		case actions.UPDATE_NAME:
			return{
				...state,
				detailHero: {...state.detailHero, name: action.newName}
			};
		case actions.UPDATE_UNIVERSE:
			return{
				...state,
				detailHero: {...state.detailHero, universe: action.newUniverse}
			};
		case actions.UPDATE_HERO:
			return{
				...state,
				heroes:  state.heroes.map((hero: Hero) => hero.id === state.detailHero.id ?
												{...hero, name: state.detailHero.name, universe: state.detailHero.universe} :
												hero
										)
			};
		case actions.CLEAR_DETAIL_HERO:
			return{
				...state,
				detailHero: {name: '', universe: '', skills: []},
				isLoad: false
			};
		case actions.ADD_ASKILL:
			return{
				...state,
				addHero: {...state.addHero, skills: state.addHero.skills.concat(action.skillToAdd)}
			};
		case actions.REMOVE_ASKILL:
			return{
				...state,
				addHero: {...state.addHero, skills: state.addHero.skills.filter(skill => skill !== action.skillToRemove)}
		};
		case actions.CLEAR_ADD_HERO:
			return{
				...state,
				addHero: {name: '', universe: '', skills: []}
			};
		case actions.SET_EMAIL:
			return{
				...state,
				email: action.email
			};
		case actions.SET_PASSWORD:
			return{
				...state,
				password: action.password
			};
		case actions.SET_REG_EMAIL:
			return{
				...state,
				registerEmail: action.regEmail
			};
		case actions.SET_REG_PASSWORD:
			return{
				...state,
				registerPassowrd: action.regPassword
			};
		case actions.SET_USER_ID:
			return{
				...state,
				userId: action.userId
			};
		case actions.SET_JWT:
			return{
				...state,
				jwt: action.jwt
			};
		case actions.LOGOUT:
			return{
				...state,
				jwt: '',
				userId: '',
				email: '',
				password: ''
			};
		case actions.SET_USER_NAME:
			return{
				...state,
				userName: action.userName
			};
		case actions.SET_USER_SURNAME:
			return{
				...state,
				surname: action.surname
			};
		case actions.SET_USER_PHONE:
			return{
				...state,
				phone: action.phone
			};
		case actions.CLEAR_REG_DATA:
			return{
				...state,
				userName: '',
				surname: '',
				phone: ''
			};
		case actions.SET_USER:
			return{
				...state,
				user: action.user
			};
		case actions.UPDATE_USER_EMAIL:
			return{
				...state,
				user: {...state.user, email: action.newEmail}
			};
		case actions.UPDATE_USER_NAME:
			return{
				...state,
				user: {...state.user, name: action.newName}
			};
		case actions.UPDATE_USER_SURNAME:
			return{
				...state,
				user: {...state.user, surname: action.newSurname}
			};
		case actions.UPDATE_USER_PHONE:
			return{
				...state,
				user: {...state.user, phone: action.newPhone}
			};
		case actions.UPDATE_USER_PASSWORD:
			return{
				...state,
				user: {...state.user, password: action.newPassword}
			};
		default:
			return state;
	}
}
