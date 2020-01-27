import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/button'

export const DashboardItem = (props) => {
    return(
        <div className="dashboard" key={props.hero.id}>
            <Link  to={"/detailHero/"+props.hero.name} >
                <Button className={props.className} text = {props.hero.name}></Button>
            </Link>
        </div>
    )
}
