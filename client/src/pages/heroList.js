import React from 'react'
import {Link} from 'react-router-dom'
import './css/heroList.css'

class HeroList extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = {name: "", newUniverse: "",Heroes: []};
        this.addHero = this.addHero.bind(this);
        this.deleteHero = this.deleteHero.bind(this);
    }
    getHeroes(){
        fetch("http://localhost:3000/getHeroes")
            .then(res => res.json())
            .then(heroes => this.setState({Heroes: heroes}))
    }
    componentDidMount(){
        this.getHeroes();      
    }
    handleChange(event){
        this.setState({name: event.target.value});
    }
    postHero(hero){
        const data = {
            name: this.state.name,
            universe: this.state.newUniverse 
        };
        try{
            fetch("http://localhost:3000/addHero", {
                method: 'POST', 
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
            }).then(res => window.M.toast({html: res.status}))
        }catch(e){
            window.M.toast(e);
        }
    }
    addHero(){
        this.state.Heroes.push({
            id:  this.state.Heroes.length+1,
            name: this.state.name,
            universe: this.state.newUniverse
        });
        this.postHero({
            name: this.state.name,
            universe: this.state.newUniverse
        });
       
        this.setState({Heroes: this.state.Heroes});
        if(window.M){
            window.M.toast({html: "Hero was added: "+this.state.newUniverse+" "+this.state.name});
        }           
    }

    onRadioChange = (e) => {
        this.setState({
            newUniverse: e.target.value
        });
    }

    goBack(){
        this.props.history.goBack();
        
    }
    deleteHero(name,id){
        fetch("http://localhost:3000/deleteHero/"+name,{
            method: 'DELETE'
        });
        console.log()
        this.setState({Heroes: this.state.Heroes.slice(0,id-1).concat(this.state.Heroes.slice(id+1,this.state.Heroes.length))})
    }
    render(){
        return(
            <div>
                <h1> Heroes List</h1>
                <Link to="/main"> <button className="waves-effect waves-light btn">Dashboard</button></Link>
                <ul>
                    {this.state.Heroes.filter(hero => {
                        return hero.universe.toLowerCase().indexOf(this.props.location.state.universe.toLowerCase()) !== -1;
                    }).map((hero)=>{
                        return <div key={hero.id}>
                                    <Link to={"/detailHero/"+hero.name}
                                    >
                                    <button className="waves-effect orange darken-1 btn list_btn">
                                        {hero.id}: {hero.name}
                                    </button> 
                                    </Link>
                                    <button 
                                        className="waves-effect red btn" 
                                        onClick ={() => this.deleteHero(hero.name,hero.id)}
                                    >
                                           x
                                    </button>
                                </div>
                    })}
                </ul>
                <div>
                    Add new hero
                    <input type="text" value={this.state.name} onChange={this.handleChange}></input>
                    <button className="waves-effect waves-light btn" onClick={this.addHero}>add hero</button>
                    <label>
                        <input 
                            className="with-gap" 
                            name="group1" type="radio" 
                            value="Marvel" 
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
                                    onChange={this.onRadioChange}
                                />
                                <span>DC</span>
                        </label>
                     </div>

                <button className="waves-effect waves-light btn" onClick={this.goBack}>Back</button>
            </div>
        )
    }
}

export default HeroList;