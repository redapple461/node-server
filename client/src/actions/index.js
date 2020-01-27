
export const setMarvel = () =>{
    return{
        type: "SET_MARVEL"
    }
}

export  function setDC() {
    return{
        type: "SET_DC"
    }
}

export const setBoth = () =>{
    return{
        type: "SET_BOTH"
    }
}

export const getData = (data) => {
    return{
        type: "GET_DATA",
        data: data
    }
}

export const loadComplete = () => {
    return{
        type: "HEROES_LOADED"
    }
}

export const addHero = (hero) => {
    return{
        type: "ADD_HERO",
        hero: hero
    }
}

export const deleteHero = (id) => {
    return{
        type: "DELETE_HERO",
        id: id
    }
}

export const initDetailHero = (hero) => {
    return{
        type: "INIT_HERO",
        hero: hero
    }
}

export const updateName = (name) => {
    return{
        type: "UPDATE_NAME",
        newName: name
    }
}

export const updateUniverse = (universe) => {
    return{
        type: "UPDATE_UNIVERSE",
        newUniverse: universe
    }
}

export const updateHero = () => {
    return{
        type: "UPDATE_HERO"
    }
}

export const updateAddHeroName = (name) => {
    return{
        type: "UPDATE_ADD_HERO_NAME",
        addName: name,
    }
}


export const updateAddHeroUniverse = (universe) => {
    
    return{
        type: "UPDATE_ADD_HERO_UNIVERSE",
        addUniverse: universe
    }
}

export const clearDetailHero = () => {
    return{
        type: "CLEAR_DETAIL_HERO"
    }
}

export const isLoad = () => {
    return{
        type: "DETAIL_LOADED"
    }
}

export const detailBack = () => {
    return{
        type: "DETAIL_BACK"
    }
}