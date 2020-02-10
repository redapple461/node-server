import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from './button'
import * as actions from '../actions'
import { deleteByName } from '../http/httpHook'

export const HeroesList = (props) => {
    return(
        <ul>
            {props.heroes.filter(hero => {
                return hero.universe.toLowerCase().indexOf(props.universe.toLowerCase()) !== -1;
            }).map((hero)=>{
                return <div key={hero.id}>
                            <Link to={"/detailHero/"+hero.name}
                            >
                            <Button className="waves-effect orange darken-1 btn list_btn" text={hero.id +": "+hero.name}/>
                            </Link>
                            <Button 
                                text = "x"
                                className="waves-effect red btn" 
                                onClick = {() => 
                                    deleteByName(hero.name).then(res => {props.dispatch(actions.deleteHero(hero.id)); window.M.toast({html: "Hero "+hero.name+" was delete"})})}
                            />
                              
                        </div>
            })}
        </ul>
    )
}