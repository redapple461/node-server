import React from 'react'
import {Link} from 'react-router-dom'
import './css/mainPage.css'
import { Heroes } from '../heroes'
import { MessagePage } from './messagePage'

export const MainPage = () => {
    const lastHeroes = Heroes.slice(Heroes.length-4,Heroes.length).reverse();
    return (
       <div>
            <div>
                <h1> Tours of heroes</h1>
            </div>
            <div>
              <Link to ="/heroes"><strong> Hero list </strong></Link>
              <ul>
                    {lastHeroes.map((hero)=>{
                        return <Link to={"/detailHero/"+hero.id} key={hero.id}><li className="dashboard" >{hero.id}: {hero.name}</li></Link>
                    })}
                </ul>
            </div>
            <div>
              <p> Search a hero by name</p>        
              <input type="text" size="40"/>
            </div>
            <MessagePage/>
       </div>
    );
}