import React from 'react'
import { Button } from "./button"
import {Link} from 'react-router-dom'


export const NoPage = (props) => {
    return(
        <div>
            <h1>Didnt find hero with name : <span className="error" >{props.name}</span></h1>
            <Link to ={
                    { 
                    pathname: "/main",
                    }
                }
                >
                   <Button
                    text = "Go to main"
                    className="waves-effect waves-light btn" type="button" 
                />
                </Link>
                

        </div>
    )
}