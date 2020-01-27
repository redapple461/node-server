import React, { useEffect } from 'react'
import './css/heroDetail.css'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import { NoPage } from '../components/404'
import {  Details } from '../components/detailPage'
import { RadioButton } from '../components/radio'
import { Button } from '../components/button'



export const HeroDetailPage = (props) => {
   
    const detailHero = useSelector(state => state.detailHero)
    const dispatch = useDispatch();
    const isLoad = useSelector(state => state.isLoad)
    async function fetchData() {
        try{
            await fetch('http://localhost:4000/getHero/'+props.match.params.name)
            .then(res => res.json())
            .then(res => dispatch(actions.initDetailHero(res[0])));
        }catch(e){
            
        }
      }
    const goBack = () => {
   
        props.history.goBack()

      
    }  

    useEffect(()=>{
            if(!isLoad){
                fetchData()
                dispatch(actions.isLoad())
            }
    })


    if(!detailHero){
        return (
            <NoPage name = {props.match.params.name} />
        )
    }
    //               onChange={(e) => dispatch(actions.updateUniverse(e.target.value))}
    return(
        <div>

                <Details name = {detailHero.name} id={detailHero.id} universe={detailHero.universe}/>
                <div className="form">
                    <p> Type new name of hero and choose his universe</p>
                    <input
                     type="text" 
                     placeholder={detailHero.name}
                     onChange={(e) => {dispatch(actions.updateName(e.target.value))}}
                    ></input>
                    <div>
                        <RadioButton 
                                className ="with-gap"
                                value="Marvel"
                                text = "Marvel"
                                checked = {detailHero.universe === "Marvel"}
                                dispatch = { () =>  dispatch(actions.updateUniverse("Marvel"))}
                            />
                        <RadioButton 
                            className ="with-gap"
                            value="DC"
                            text = "DC"
                            checked = {detailHero.universe === "DC"}
                            dispatch = { () =>  dispatch(actions.updateUniverse("DC"))}
                        />
                    </div>
                </div>
                
                <Button
                    className="waves-effect waves-light btn" type="button" 
                    onClick={() => {goBack()} }
                    text = "Back"
                 />
                <Button 
                    className="waves-effect waves-light btn" 
                    type="button" 
                    onClick={() => {dispatch(actions.updateHero())}}
                    text = "Save"
                 />
            </div>
    )
}