import { Hero } from '../../models/Hero';
import * as actions from '../HeroActions';
interface SetMarvel {
    type: typeof actions.SET_MARVEL;
}
interface SetDC {
    type: typeof actions.SET_DC;
}
interface SetBoth {
    type: typeof actions.SET_BOTH;
}
interface GetData {
    type: typeof actions.GET_DATA;
    data: Hero[];
}
interface LoadComplete {
    type: typeof actions.HEROES_LOADED;
}
interface AddHero {
    type: typeof actions.ADD_HERO;
    hero: Hero;
}
interface DeleteHero {
    type: typeof actions.DELETE_HERO;
    id: number;
}
interface InitDetailHero {
    type: typeof actions.INIT_HERO;
    hero: Hero;
}
interface UpdateName {
    type: typeof actions.UPDATE_NAME;
    newName: string;
}
interface UpdateUniverse {
    type: typeof actions.UPDATE_UNIVERSE;
    newUniverse: string;
}
interface UpdateHero {
    type: typeof actions.UPDATE_HERO;
}
interface UpdateAddHeroName {
    type: typeof actions.UPDATE_ADD_HERO_NAME;
    addName: string;
}
interface UpdateAddHeroUniverse {
    type: typeof actions.UPDATE_ADD_HERO_UNIVERSE;
    addUniverse: string;
}
interface ClearDetailHero {
    type: typeof actions.CLEAR_DETAIL_HERO;
}
interface IsLoad {
    type: typeof actions.DETAIL_LOADED;
}
interface AddSkill {
    type: typeof actions.ADD_ASKILL;
    skillToAdd: string;
}
interface RemoveSkill {
    type: typeof actions.REMOVE_ASKILL;
    skillToRemove: string;
}
interface ClearAddHero {
    type: typeof actions.CLEAR_ADD_HERO;
}
interface SetEmail {
    type: typeof actions.SET_EMAIL;
    email: string;
}
interface SetPassword {
    type: typeof actions.SET_PASSWORD;
    password: string;
}
interface SetRegEmail {
    type: typeof actions.SET_REG_EMAIL;
    regEmail: string;
}
interface SetRegPassword {
    type: typeof actions.SET_REG_PASSWORD;
    regPassword: string;
}
interface SetUserId {
    type: typeof actions.SET_USER_ID;
    userId: string;
}
interface SetJWT {
    type: typeof actions.SET_JWT;
    jwt: string;
}
interface Logout {
    type: typeof actions.LOGOUT;
}
interface SetUserName {
    type: typeof actions.SET_USER_NAME;
    userName: string;
}
interface SetUserSurname {
    type: typeof actions.SET_USER_SURNAME;
    surname: string;
}
interface SetUserPhone {
    type: typeof actions.SET_USER_PHONE;
    phone: string;
}
interface ClearRegData {
    type: typeof actions.CLEAR_REG_DATA;
}
export declare type HeroActionsType = SetMarvel | SetDC | SetBoth | GetData | AddHero | DeleteHero | LoadComplete | InitDetailHero | UpdateName | UpdateUniverse | UpdateAddHeroName | UpdateAddHeroUniverse | UpdateHero | ClearDetailHero | IsLoad | AddSkill | RemoveSkill | ClearAddHero | SetEmail | SetPassword | SetRegEmail | SetRegPassword | SetUserId | SetJWT | Logout | SetUserName | SetUserPhone | SetUserSurname | ClearRegData;
export {};
