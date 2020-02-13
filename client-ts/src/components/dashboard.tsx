import React from 'react'
import { DashboardItem } from './dashboardItem'
import {Hero} from '../models/Hero'
import { DashboardProps } from '../interfaces/iComponents/DashboardProps'

export const Dashboard: React.SFC<DashboardProps> = (props) => {
    
    return(
        <div>
            <h2>Last heroes</h2>
            <ul>
                    {props.heroes.map((hero: Hero)=>{
                        return  <DashboardItem key={hero.id} className="waves-effect teal lighten-1 btn dashboard_btn" hero = { hero }/>
                    })}
            </ul>
            </div>
    )
}