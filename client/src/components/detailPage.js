import React from 'react'

export const Details = (props) => {
    return(
        <div>
            <h1>{props.name} details</h1>
            <strong> id: {props.id} </strong><br/>
            <strong> Name: {props.name} </strong><br/>
            <strong> Universe: {props.universe} </strong>
        </div>
    )
}