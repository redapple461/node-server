import { updateHero } from "../http/httpHook";


const init = {
    searchUniverse: "",
    heroes: [],
    oldName: "",
    addHero: {name: "", universe: ""},
    detailHero: null,
    isLoad: false,
    noHeroes: true
}


const reducer = (state = init,action) => {
    switch(action.type){
        case "SET_MARVEL":
            return{
                ...state,
                searchUniverse: "Marvel"
            };
        case "DETAIL_LOADED":
            return{
                ...state,
                isLoad: true
            }
        case "DETAIL_BACK":
            return{
                ...state,
                 isLoad: false
            }
        case "SET_DC":
            return{
                ...state,
                searchUniverse: "DC"
            };
        case "SET_BOTH":
            return{
                ...state,
                searchUniverse: ""
           };       
        case "GET_DATA":
            return{
                ...state,
                heroes: action.data
            }     
        case "HEROES_LOADED":
            return{
                ...state,
                noHeroes: false
            }    
        case "ADD_HERO":
            return{
                ...state,
                heroes: state.heroes.concat(action.hero)
            }

        case "UPDATE_ADD_HERO_NAME":
            return{
                ...state,
                addHero: {...state.addHero,name: action.addName}
            }
        case "UPDATE_ADD_HERO_UNIVERSE":
            
            return{
                ...state,
                addHero: {...state.addHero, universe: action.addUniverse}
            }            
        case "DELETE_HERO":
            return{
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.id)
            }    
        case "INIT_HERO":
            return{
                ...state,
                detailHero: action.hero,
                oldName: action.hero.name
            }
        case "UPDATE_NAME":
            return{
                ...state,
                detailHero: {...state.detailHero, name: action.newName}
            }
         case "UPDATE_UNIVERSE":
            return{
                ...state,
                detailHero: {...state.detailHero, universe: action.newUniverse}
            }    
        case "UPDATE_HERO":
            updateHero(state.oldName,state.detailHero);
            return{
                ...state,
                heroes:  state.heroes.map(hero => hero.id === state.detailHero.id ? 
                                                {...hero, name: state.detailHero.name,universe: state.detailHero.universe} :
                                                hero
                                         )
            }
        case "CLEAR_DETAIL_HERO":
            return{
                ...state,
                detailHero: {},
                isLoad: false
            }
        default:
            return state;
    }
}

export default reducer;