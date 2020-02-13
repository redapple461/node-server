import { updateHero } from "../http/httpHook";
import { Hero } from "../models/Hero";
import { HeroStore } from '../interfaces/iStore/HeroStore'
import { HeroActionsType } from "../actions/types/HeroTypes";
import * as actions from '../actions/HeroActions'

const init: HeroStore = {
    searchUniverse: "",
    heroes: [],
    oldName: "",
    addHero: {name: "", universe: ""},
    detailHero: null,
    isLoad: false,
    noHeroes: true
}


export default function reducer (state = init,action: HeroActionsType): HeroStore {
    switch(action.type){
        case actions.SET_MARVEL:
            return{
                ...state,
                searchUniverse: "Marvel"
            };
        case actions.DETAIL_LOADED:
            return{
                ...state,
                isLoad: true
            }
        case actions.SET_DC:
            return{
                ...state,
                searchUniverse: "DC"
            };
        case actions.SET_BOTH:
            return{
                ...state,
                searchUniverse: ""
           };       
        case actions.GET_DATA:
            return{
                ...state,
                heroes: action.data
            }     
        case actions.HEROES_LOADED:
            return{
                ...state,
                noHeroes: false
            }    
        case actions.ADD_HERO:
            return{
                ...state,
                heroes: state.heroes.concat(action.hero)
            }

        case actions.UPDATE_ADD_HERO_NAME:
            return{
                ...state,
                addHero: {...state.addHero,name: action.addName}
            }
        case actions.UPDATE_ADD_HERO_UNIVERSE:
            
            return{
                ...state,
                addHero: {...state.addHero, universe: action.addUniverse}
            }            
        case actions.DELETE_HERO:
            return{
                ...state,
                heroes: state.heroes.filter((hero: Hero) => hero.id !== action.id)
            }    
        case actions.INIT_HERO:
            return{
                ...state,
                detailHero: action.hero,
                oldName: action.hero.name
            }
        case actions.UPDATE_NAME:
            return{
                ...state,
                detailHero: {...state.detailHero, name: action.newName}
            }
         case actions.UPDATE_UNIVERSE:
            return{
                ...state,
                detailHero: {...state.detailHero, universe: action.newUniverse}
            }    
        case actions.UPDATE_HERO:
            updateHero(state.oldName,state.detailHero);
            return{
                ...state,
                heroes:  state.heroes.map((hero: Hero) => hero.id === state.detailHero.id ? 
                                                {...hero, name: state.detailHero.name,universe: state.detailHero.universe} :
                                                hero
                                         )
            }
        case actions.CLEAR_DETAIL_HERO:
            return{
                ...state,
                detailHero: {name: "",universe: ""},
                isLoad: false
            }
        default:
            return state;
    }
}
