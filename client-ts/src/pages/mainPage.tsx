import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import './css/mainPage.css'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from "../actions"
import {  Button } from '../components/button'
import {  RadioButton } from '../components/radio'
import { Dashboard } from '../components/dashboard'
import { EmptyHeroes } from '../components/emptyHeroes'
import { getHeroes } from '../http/httpHook'
import { HeroStore } from '../interfaces/iStore/HeroStore'

export const MainPage = () => {
    const universe =  useSelector((state: HeroStore) => state.searchUniverse);
    const heroes = useSelector((state: HeroStore) => state.heroes.slice(state.heroes.length-4,state.heroes.length).reverse());
    const dispatch = useDispatch();
    const isUnLoad = useSelector((state: HeroStore) => state.noHeroes)
    const isLoad = useSelector((state: HeroStore) => state.isLoad)


    async function fetchData() {
        return  getHeroes()
        .then(heroes => 
                 dispatch(actions.getData(heroes))
             );
      }


    useEffect(() => {
        if(isLoad)  
         dispatch(actions.clearDetailHero())
        if(isUnLoad){
            fetchData()
            dispatch(actions.loadComplete())
        }
    })

    let dashboard;

    if(heroes.length){
        dashboard = <Dashboard heroes = { heroes }/>
    }else{
        dashboard = <EmptyHeroes/>
    }

    return(
        <div>
            <div>
                <h1> Tours of heroes</h1>
            </div>
            <div>
                <Link to ={
                    { 
                    pathname: "/heroes",
                    }
                }
                >
                    <Button  className="waves-effect waves-light btn" text="Heroes"> </Button>
                </Link>
                
                <div >
                    <RadioButton 
                        className ="with-gap"
                        value="Marvel"
                        checked = {universe === "Marvel"}
                        text = "Marvel"
                        dispatch = { () => dispatch(actions.setMarvel())}
                    />
                    <RadioButton 
                        className ="with-gap"
                        value="DC"
                        checked = {universe === "DC"}
                        text = "DC"
                        dispatch = { () => dispatch(actions.setDC())}
                    />
                    <RadioButton 
                        className ="with-gap"
                        value=""
                        checked = {universe === ""}
                        text = "Both"
                        dispatch = { () => dispatch(actions.setBoth())}
                    />
                </div>
            
            </div>
            {dashboard}
        </div>
    )
}

