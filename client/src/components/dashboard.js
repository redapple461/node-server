import React from 'react'
import { DashboardItem } from './dashboardItem'

export const Dashboard = (props) => {
    
    return(
        <div>
            <h2>Last heroes</h2>
            <ul>
                    {props.heroes.map((hero)=>{
                        return  <DashboardItem key={hero.id} className="waves-effect teal lighten-1 btn dashboard_btn" hero = { hero }/>
                    })}
            </ul>
            </div>
    )
}