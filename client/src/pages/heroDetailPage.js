import React from 'react'
import { Redirect,Link } from 'react-router-dom'
import { Heroes } from '../heroes'


export class HeroDetailPage extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.goBack = this.goBack.bind(this);
        this.hero = {
                     id: this.props.match.params.id,
                     name: Heroes[this.props.match.params.id-1].name,
                     universe: Heroes[this.props.match.params.id-1].universe
                    }
       // this.redirect = false;
    }
    goBack(){
        // this.redirect = !this.redirect;
        this.props.history.goBack();
    }

    render(){
        if(this.redirect){
            return <Redirect to="/main"></Redirect>
        }
        return(
            <div>
                <div>
                    <strong> id: {this.hero.id} </strong><br/>
                    <strong> Name: {this.hero.name} </strong><br/>
                    <strong> Universe: {this.hero.universe} </strong>
                </div>
                <div>
                    <p> Type new name of hero</p>
                    <input type="text"></input>
                </div>
                <input type="button" value="back" onClick={this.goBack}/>
                <input type="button" value="save"></input>
            </div>
        )
    }
}