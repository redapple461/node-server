"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpHook_1 = require("../http/httpHook");
const actions = __importStar(require("../actions/HeroActions"));
const init = {
    searchUniverse: '',
    heroes: [],
    oldName: '',
    addHero: { name: '', universe: '', skills: [] },
    detailHero: null,
    isLoad: false,
    noHeroes: true
};
function reducer(state = init, action) {
    switch (action.type) {
        case actions.SET_MARVEL:
            return Object.assign(Object.assign({}, state), { searchUniverse: 'Marvel' });
        case actions.DETAIL_LOADED:
            return Object.assign(Object.assign({}, state), { isLoad: true });
        case actions.SET_DC:
            return Object.assign(Object.assign({}, state), { searchUniverse: 'DC' });
        case actions.SET_BOTH:
            return Object.assign(Object.assign({}, state), { searchUniverse: '' });
        case actions.GET_DATA:
            return Object.assign(Object.assign({}, state), { heroes: action.data });
        case actions.HEROES_LOADED:
            return Object.assign(Object.assign({}, state), { noHeroes: false });
        case actions.ADD_HERO:
            return Object.assign(Object.assign({}, state), { heroes: state.heroes.concat(action.hero) });
        case actions.UPDATE_ADD_HERO_NAME:
            return Object.assign(Object.assign({}, state), { addHero: Object.assign(Object.assign({}, state.addHero), { name: action.addName }) });
        case actions.UPDATE_ADD_HERO_UNIVERSE:
            return Object.assign(Object.assign({}, state), { addHero: Object.assign(Object.assign({}, state.addHero), { universe: action.addUniverse }) });
        case actions.DELETE_HERO:
            return Object.assign(Object.assign({}, state), { heroes: state.heroes.filter((hero) => hero.id !== action.id) });
        case actions.INIT_HERO:
            return Object.assign(Object.assign({}, state), { detailHero: action.hero, oldName: action.hero.name });
        case actions.UPDATE_NAME:
            return Object.assign(Object.assign({}, state), { detailHero: Object.assign(Object.assign({}, state.detailHero), { name: action.newName }) });
        case actions.UPDATE_UNIVERSE:
            return Object.assign(Object.assign({}, state), { detailHero: Object.assign(Object.assign({}, state.detailHero), { universe: action.newUniverse }) });
        case actions.UPDATE_HERO:
            httpHook_1.updateHero(state.oldName, state.detailHero);
            return Object.assign(Object.assign({}, state), { heroes: state.heroes.map((hero) => hero.id === state.detailHero.id ? Object.assign(Object.assign({}, hero), { name: state.detailHero.name, universe: state.detailHero.universe }) :
                    hero) });
        case actions.CLEAR_DETAIL_HERO:
            return Object.assign(Object.assign({}, state), { detailHero: { name: '', universe: '', skills: [] }, isLoad: false });
        case actions.ADD_ASKILL:
            return Object.assign(Object.assign({}, state), { addHero: Object.assign(Object.assign({}, state.addHero), { skills: state.addHero.skills.concat(action.skillToAdd) }) });
        case actions.REMOVE_ASKILL:
            return Object.assign(Object.assign({}, state), { addHero: Object.assign(Object.assign({}, state.addHero), { skills: state.addHero.skills.filter(skill => skill !== action.skillToRemove) }) });
        case actions.CLEAR_ADD_HERO:
            return Object.assign(Object.assign({}, state), { addHero: { name: '', universe: '', skills: [] } });
        default:
            return state;
    }
}
exports.default = reducer;
//# sourceMappingURL=index.js.map