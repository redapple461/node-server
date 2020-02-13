import React from 'react'
import { DetailPageProps } from '../interfaces/iComponents/DetailPageProps'

export const Details: React.SFC<DetailPageProps> = (props) => {
    return(
        <div>
            <h1>{props.name} details</h1>
            <strong> id: {props.id} </strong><br/>
            <strong> Name: {props.name} </strong><br/>
            <strong> Universe: {props.universe} </strong>
        </div>
    )
}