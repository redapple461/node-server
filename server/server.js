var express = require ('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');
var app = express();

var cors = require('cors')
var config = require('./config/config')

app.use(bodyParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use('',require("./routers/mapping"))


/**
 *        response.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
        response.header("Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content-Type, Accept");
         var db = mongo.connect('mongodb://localhost:27017/ToursOfHeroDB',function(err,response){
    if(err){
        console.log(err)
    }else{
        console.log('Connect to '+db,' + ',response)
    }
})
 */



// var Schema = mongo.Schema;



// var model = mongo.model('heroes',HeroesSchemna,'heroes');

/*app.get("/getHeroes",function(req,res){
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
    console.log('hero to post: ' + req.body.name + ', '+req.body.universe);
    model.countDocuments({},function(err,c){
        console.log("Count is : "+c);
        var hero = {id: c, name: req.body.name, universe: req.body.universe};
        model.insertMany(hero,function(err,res){
            if(err){
                return console.log(err);
            }
        })
    });

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
    console.log("Get hero "+sName)
    model.find({name: sName},function(err,data){
        if(err){
            res.send(err);
        }else{
            console.log(typeof data + ': ' + data);
            res.send(data);
        }
    })
})

app.put("/updateHero/:oldName",function(req,res){
    if(!req.body) res.sendStatus(400).send({error: "body is missed"});
    var oldName = req.params.oldName;
    var name = req.body.name;
    var universe = req.body.universe;
    console.log(req.body);
    console.log("Search name: "+oldName+" new values: "+name+" "+universe);
    var mQuery = { name: oldName };
    var newHero = { $set: { name: name, universe: universe}}
    model.updateOne(mQuery,newHero,function(err,result){
        if(err){
            res.send(err);
        }else{
            console.log(name+" was updated");
            res.status(200).send({ message: "hero was updated!" });
        }
    })
})
*/
var port = config.apiPort.port
app.listen(port,function(){
    console.log(`Server listening on port ${port}`)
})