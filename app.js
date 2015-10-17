//Depencencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    _ = require('lodash'),
    app = express();

// Add Middleware necessarry for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


//Routes
//app.use('*', function(req, res, next) {
  //res.send('404 Page not found');
  //next();
//});

app.use('/home', function(req, res, next) {
  res.send('Welcome to funnel');
  next();
});

app.use('/posts', require('./routes/index'));


//Connect to MongoDB
mongoose.connect('mongodb://localhost/funnel');
mongoose.connection.once('open', function(err) {
  if (err) throw err;
/*
   // application -------------------------------------------------------------
      app.get('*', function(req, res) {
          res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
      });
  */
  console.log('Listening on port 3000...');
  app.listen(3000);
});
