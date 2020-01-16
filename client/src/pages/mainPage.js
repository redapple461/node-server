import React from 'react'
import {Link} from 'react-router-dom'
import './css/mainPage.css'


export  class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {universe: "",lastHeroes: []};
      //  this.getHeroes();
    }
    
    getHeroes(){
        fetch("http://localhost:3000/getHeroes")
            .then(res => res.json())
            .then(heroes => this.setState({lastHeroes: heroes.slice(heroes.length-4,heroes.length).reverse()}))
       // window.M.toast({html: "Data is fetched"});
    }
    componentDidMount(){
        this.getHeroes();        
    }
    componentDidUpdate(){
        this.getHeroes();    
    }
    onRadioChange = (e) => {
        this.setState({
            universe: e.target.value
        });
        if(e.target.value){
            window.M.toast({html: "Heroes will be displayed from : "+e.target.value+" universe"});
        }else{
            window.M.toast({html: "Heroes will be displayed from both universes"});
        }
    }
    onInputChange = (e) => {
        this.setState({
            nameToSearch: e.target.value
        });
    }

    render(){
    return (
       <div>
            <div>
                <h1> Tours of heroes</h1>
            </div>
            <p> </p>
            <div>
              <Link to ={
                  { 
                   pathname: "/heroes",
                   state: {universe: this.state.universe} 
                  }
                  }><button className="waves-effect waves-light btn" >Heroes</button></Link>
              <div >
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
              <ul>
                    {this.state.lastHeroes.map((hero)=>{
                        return  <div className="dashboard" key={hero.id}>
                                    <Link  to={"/detailHero/"+hero.name} >
                                        <button className="waves-effect teal lighten-1 btn dashboard_btn">
                                            {hero.name}
                                        </button>
                                    </Link>
                                </div>
                    })}
              </ul>
            </div>
     
       </div>
    );
    }
}