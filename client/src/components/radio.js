import React from 'react'


export const RadioButton = (props) => {
    return(
        <label>
        <input 
            className={props.className} 
            name="group1"
            type="radio" 
            value={props.value} 
            checked = {props.checked}
            onChange = {props.dispatch}
        />
        <span>{props.text}</span>
</label>
    )
}