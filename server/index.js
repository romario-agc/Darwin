var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _=require('lodash');

//Create the application
var app=express();

// Add Middleware necessarry for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//CORS Support
app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use('/dashboard', function(req, res, next){
	res.send('This is where all updates will be posted.');
	next();
});

app.use('/discussion', function(req, res, next){
	res.send('This is the forum for talking about whats going on.');
	next();
});

//Connect to MongoDB
mongoose.connect('mongodb://localhost/darwinapp');
mongoose.connection.once('open',function(){

console.log('Listening on port 3000...');
app.listen(3000);
});