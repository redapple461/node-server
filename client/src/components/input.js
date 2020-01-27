import React from 'react'


export const Input = (props) => {
    return(
        <div className="form">
            <p> Type new name of hero and choose his universe</p>
            <input
                type="text" 
                placeholder={props.name}
                onChange={props.dispatch()}
            >                
            </input>
        </div>
    )
} 