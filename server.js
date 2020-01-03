var express = require ('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');
var app = express();
var port = 3000;
var cors = require('cors')

app.use(bodyParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
var db = mongo.connect('mongodb://localhost:27017/ToursOfHeroDB',function(err,response){
    if(err){
        console.log(err)
    }else{
        console.log('Connect to '+db,' + ',response)
    }
})
/**
 *        response.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
        response.header("Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content-Type, Accept");
 */



var Schema = mongo.Schema;

var HeroesSchemna = new Schema({
    name: { type: String },
    universe: {type: String },
},{ versionKey: false});

var model = mongo.model('heroes',HeroesSchemna,'heroes');

app.get("/getHeroes",function(req,res){
    model.find({},function(err,data){
        if(err){
            res.send(err);
        }else{
            console.log(typeof data + ': ' + data);
            res.json(data);
        }
    })
})

app.post("/addHero", function(req,res){
    if(!req.body) res.sendStatus(400);
    console.log('hero to post: '+req.body);
    var hero = {name: req.body.name, universe: req.body.universe}
    model.insertMany(hero,function(err,res){
        if(err){
            return console.log(err);
        }
    })
})

app.delete("/deleteHero/:name", function(req,res){
    if(!req.body) res.sendStatus(400);
    console.log('hero to delete: '+req.params.name);
    model.deleteOne({name: req.params.name}, function(err,res){
        if (err) return console.log(err);
    });
})

app.get("/getHero/:name",function(req,res){
    var sName = req.params.name;
    console.log("apple "+sName)
    model.find({name: sName},function(err,data){
        if(err){
            res.send(err);
        }else{
            console.log(typeof data + ': ' + data);
            res.json(data);
        }
    })
})


app.listen(3000,function(){
    console.log('Server listening on port 3000')
})