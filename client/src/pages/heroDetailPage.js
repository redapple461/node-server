import React from 'react'
import './css/heroDetail.css'


export class HeroDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: "", universe: "",hero: {}};
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }
    goBack(){
        this.props.history.goBack();
    }

    getHero(){
        fetch("http://localhost:3000/getHero/"+this.props.match.params.name)
           .then(res => res.json())
           .then(resHero => {
               this.setState({
                hero: resHero[0],
                universe: resHero[0].universe,
                value: resHero[0].name
               });
           })
   }

   componentDidMount(){
       this.getHero();
   }

    save(){
        const data ={
            name: this.state.value,
            universe: this.state.universe
        }
        try{
            fetch("http://localhost:3000//updateHero/"+this.state.hero.name, {
                method: 'PUT', 
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
        }catch(e){
            window.M.toast(e);
        }
        window.M.toast({html: "Hero was updated: "+this.state.value+" "+this.state.universe});
        this.props.history.goBack();     
    }

    onRadioChange = (e) => {
        this.setState({
            universe: e.target.value
        })
    }

    render(){
        return(
            <div>
                <h1>{this.state.hero.name} details</h1>
                <div>
                    <strong> id: {this.state.hero.id} </strong><br/>
                    <strong> Name: {this.state.hero.name} </strong><br/>
                    <strong> Universe: {this.state.hero.universe} </strong>
                </div>
                <div className="form">
                    <p> Type new name of hero and choose his universe</p>
                    <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                    <div>
                <label>
                        <input 
                            className="with-gap" 
                            name="group1" type="radio" 
                            value="Marvel" 
                            checked={this.state.universe === "Marvel"}
                            onChange={this.onRadioChange}
                        />
                        <span>Marvel</span>
                </label>
                <label>
                        <input 
                            className="with-gap"
                            name="group1" 
                            type="radio"
                            value="DC"
                            checked={this.state.universe === "DC"}
                            onChange={this.onRadioChange}
                        />
                        <span>DC</span>
                </label>
                <label>
                        <input
                            className="with-gap"
                            name="group1"
                            type="radio"
                            value="" 
                            checked={this.state.universe === ""}
                            onChange={this.onRadioChange}
                        />
                        <span>Both</span>
                </label>
              </div>
                </div>
                
                <button
                    className="waves-effect waves-light btn" type="button" 
                    onClick={this.goBack}
                 >
                     Back
                </button>
                <button 
                    className="waves-effect waves-light btn" 
                    type="button" 
                    onClick={this.save}
                 >
                     Save
                </button>
            </div>
        )
    }
}