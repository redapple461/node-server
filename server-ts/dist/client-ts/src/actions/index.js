"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions = __importStar(require("../actions/HeroActions"));
function setMarvel() {
    return {
        type: actions.SET_MARVEL
    };
}
exports.setMarvel = setMarvel;
function setDC() {
    return {
        type: actions.SET_DC
    };
}
exports.setDC = setDC;
function setBoth() {
    return {
        type: actions.SET_BOTH
    };
}
exports.setBoth = setBoth;
function getData(data) {
    return {
        type: actions.GET_DATA,
        data
    };
}
exports.getData = getData;
function loadComplete() {
    return {
        type: actions.HEROES_LOADED
    };
}
exports.loadComplete = loadComplete;
function addHero(hero) {
    return {
        type: actions.ADD_HERO,
        hero
    };
}
exports.addHero = addHero;
function deleteHero(id) {
    return {
        type: actions.DELETE_HERO,
        id
    };
}
exports.deleteHero = deleteHero;
function initDetailHero(hero) {
    return {
        type: actions.INIT_HERO,
        hero
    };
}
exports.initDetailHero = initDetailHero;
function updateName(newName) {
    return {
        type: actions.UPDATE_NAME,
        newName
    };
}
exports.updateName = updateName;
function updateUniverse(newUniverse) {
    return {
        type: actions.UPDATE_UNIVERSE,
        newUniverse
    };
}
exports.updateUniverse = updateUniverse;
function updateHero() {
    return {
        type: actions.UPDATE_HERO
    };
}
exports.updateHero = updateHero;
function updateAddHeroName(addName) {
    return {
        type: actions.UPDATE_ADD_HERO_NAME,
        addName
    };
}
exports.updateAddHeroName = updateAddHeroName;
function updateAddHeroUniverse(addUniverse) {
    return {
        type: actions.UPDATE_ADD_HERO_UNIVERSE,
        addUniverse
    };
}
exports.updateAddHeroUniverse = updateAddHeroUniverse;
function clearDetailHero() {
    return {
        type: actions.CLEAR_DETAIL_HERO
    };
}
exports.clearDetailHero = clearDetailHero;
function isLoad() {
    return {
        type: actions.DETAIL_LOADED
    };
}
exports.isLoad = isLoad;
function addSkill(skillToAdd) {
    return {
        type: actions.ADD_ASKILL,
        skillToAdd
    };
}
exports.addSkill = addSkill;
function removeSkill(skillToRemove) {
    return {
        type: actions.REMOVE_ASKILL,
        skillToRemove
    };
}
exports.removeSkill = removeSkill;
function clearAddHero() {
    return {
        type: actions.CLEAR_ADD_HERO
    };
}
exports.clearAddHero = clearAddHero;
//# sourceMappingURL=index.js.map