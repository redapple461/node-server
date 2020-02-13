import { Hero } from "../../models/Hero"
import * as actions from '../HeroActions'
import { updateAddHeroUniverse } from ".."

interface SetMarvel {
    type: typeof actions.SET_MARVEL
}

interface SetDC {
    type: typeof actions.SET_DC
}
interface SetBoth {
    type: typeof actions.SET_BOTH
}

interface GetData {
    type: typeof actions.GET_DATA,
    data: Hero[]
}

interface LoadComplete {
    type: typeof actions.HEROES_LOADED
}

interface AddHero {
    type: typeof actions.ADD_HERO,
    hero: Hero
}

interface DeleteHero {
    type: typeof actions.DELETE_HERO,
    id: number
}

interface InitDetailHero {
    type: typeof actions.INIT_HERO,
    hero: Hero
}

interface UpdateName {
    type: typeof actions.UPDATE_NAME,
    newName: string
}

interface UpdateUniverse {
    type: typeof actions.UPDATE_UNIVERSE,
    newUniverse: string
}

interface UpdateHero {
    type: typeof actions.UPDATE_HERO
}

interface UpdateAddHeroName {
    type: typeof actions.UPDATE_ADD_HERO_NAME,
    addName: string
}


interface UpdateAddHeroUniverse {
    type: typeof actions.UPDATE_ADD_HERO_UNIVERSE,
    addUniverse: string
}

interface ClearDetailHero {
    type: typeof actions.CLEAR_DETAIL_HERO
}

interface IsLoad {
    type: typeof actions.DETAIL_LOADED
}

export type HeroActionsType = SetMarvel | SetDC | SetBoth | GetData | AddHero | DeleteHero | LoadComplete | InitDetailHero | UpdateName | UpdateUniverse | UpdateAddHeroName |
                                UpdateAddHeroUniverse | UpdateHero | ClearDetailHero | IsLoad

/*
    export const detailBack = () => {
        return{
            type: "DETAIL_BACK"
        }
    }
*/