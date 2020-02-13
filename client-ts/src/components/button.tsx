import React from 'react'
import { ButtonProps } from '../interfaces/iComponents/ButtonProps'

export const Button: React.SFC<ButtonProps> = (props) => {
    return(
        <button className={props.className} onClick={props.onClick}> {props.text} </button>
    )
}