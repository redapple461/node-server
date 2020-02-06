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

var port = config.apiPort.port
app.listen(port,function(){
    console.log(`Server listening on port ${port}`)
})

module.exports = app;