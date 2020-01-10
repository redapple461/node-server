const {Router} = require('express')
const router = Router()
const Hero = require("../model/schema")

// localhost:3000/getHeroes
router.get('/getHeroes', async (req,res)=>{
    Hero.find({},function(err,data){
        if(err){
            res.send(err);
        }else{
            console.log(typeof data + ': ' + data);
            res.json(data);
        }
    })
    
})

// localhost:3000/addHero
router.post('/addHero', async(req,res)=>{
    if(!req.body) res.sendStatus(400);
    console.log('hero to post: ' + req.body.name + ', '+req.body.universe);
    Hero.countDocuments({},function(err,c){
        console.log("Count is : "+c);
        var hero = {id: c+1, name: req.body.name, universe: req.body.universe};
        Hero.insertMany(hero,function(err,res){
            if(err){
                return console.log(err);
            }
        })
    });
})

// localhost:3000/getHero/:name
router.get('/getHero/:name', async (req,res)=>{
    var sName = req.params.name;
    console.log("Get hero "+sName)
    Hero.find({name: sName},function(err,data){
        if(err){
            res.send(err);
        }else{
            console.log(typeof data + ': ' + data);
            res.send(data);
        }
    })
})

// localhost:3000/deleteHero/:name
router.delete('/deleteHero/:name', async (req,res) => {
    if(!req.body) res.sendStatus(400);
    console.log('hero to delete: '+req.params.name);
    Hero.deleteOne({name: req.params.name}, function(err,res){
        if (err) return console.log(err);
    });
})

router.put('/updateHero/:oldName', async (req,res) => {
    if(!req.body) res.sendStatus(400).send({error: "body is missed"});
    var oldName = req.params.oldName;
    var name = req.body.name;
    var universe = req.body.universe;
    console.log(req.body);
    console.log("Search name: "+oldName+" new values: "+name+" "+universe);
    var mQuery = { name: oldName };
    var newHero = { $set: { name: name, universe: universe}}
    Hero.updateOne(mQuery,newHero,function(err,result){
        if(err){
            res.send(err);
        }else{
            console.log(name+" was updated");
            res.status(200).send({ message: "hero was updated!" });
        }
    })
})
module.exports = router
