import React from 'react'
import {Link} from 'react-router-dom'
import {Heroes} from '../heroes'
import './css/heroList.css'
import { queryHelpers } from '@testing-library/react'
class HeroList extends React.Component{
    render(){
        return(
            <div>
                <h1> Heroes List</h1>
                <Link to="/main"> <strong>Dashborad</strong></Link>
                <ul>
                    {Heroes.map((hero)=>{
                        return <Link to={"/detailHero/"+hero.id}><li key={hero.id}>{hero.id}: {hero.name}</li></Link>
                    })}
                </ul>
            </div>
        )
    }
}

export default HeroList;