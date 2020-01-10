const mongo = require('mongoose')
const Schema = mongo.Schema
const config = require('../config/config')

const { mongoDB: { host,port,name } } = config;
const cnctStr = `mongodb://${host}:${port}/${name}`
const hero = new Schema({
    id: { type: Number},
    name: { type: String , unique: true},
    universe: {type: String },
})
var db = mongo.connect(cnctStr,function(err,response){
    if(err){
        console.log(err)
    }else{
        console.log('Connect to '+db,' + ',response)
    }
})

module.exports = mongo.model('heroes',hero,'heroes')
