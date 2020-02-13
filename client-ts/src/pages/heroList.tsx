import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import './css/heroList.css'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from "../actions/"
import { Button } from "../components/button"
import { RadioButton } from "../components/radio"
import { HeroesList } from '../components/hList'
import { EmptyHeroes } from '../components/emptyHeroes'
import { getHeroes, addHero } from '../http/httpHook'
import { HeroStore } from '../interfaces/iStore/HeroStore'

const HeroList = (props: any) => {
    const heroes = useSelector((state: HeroStore) => state.heroes)
    const universe = useSelector((state: HeroStore) => state.searchUniverse)
    const isUnLoad = useSelector((state: HeroStore) => state.noHeroes)
    const heroToAdd = useSelector((state: HeroStore) => state.addHero)
    const isLoad = useSelector((state: HeroStore) => state.isLoad)
    const dispatch = useDispatch()
    async function fetchData() {
        try{
            await getHeroes().then(heroes => {
                dispatch(actions.getData(heroes));
            });
        }catch(e){
            
        }
      }

    useEffect(() => {
        
        if(isLoad)  
        dispatch(actions.clearDetailHero())
        if(isUnLoad){
            fetchData()
            dispatch(actions.loadComplete())
        }
    })

    let heroList;
    if(heroes.length){
        heroList =  <HeroesList heroes = { heroes } universe = { universe } dispatch={ dispatch }/>
    }else{
        heroList = <EmptyHeroes/>
    }

    const add = async () => {
        const data = {
            name: heroToAdd.name,
            universe: heroToAdd.universe 
        };
        try{     
            addHero(data).then(res => dispatch(actions.addHero(res)))
            //window.M.toast({html: "Hero "+heroToAdd.name+" was added"})
        }catch(e){
            //window.M.toast(e);
        }
    }
 
    
    return(
        <div>
            <h1> Heroes List</h1>
            <Link to="/main"> <Button className="waves-effect waves-light btn" text="Dashboard"/></Link>
           {heroList}
            <div>
                Add new hero
                <input type="text" onChange={(e)=> dispatch(actions.updateAddHeroName(e.target.value))}></input>
                <Button className="waves-effect waves-light btn" onClick={add} text="Add hero"/>
                <RadioButton  className="with-gap" value="Marvel" text="Marvel"  dispatch={()=> dispatch(actions.updateAddHeroUniverse("Marvel"))}/>
                <RadioButton  className="with-gap" value="DC" text="DC"   dispatch={()=> dispatch(actions.updateAddHeroUniverse("DC"))}/>
            </div>

            <Button text="Go back" className="waves-effect waves-light btn" onClick={() => props.history.goBack()}/>
        </div>
    )
}
export default HeroList;