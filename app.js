// Depencencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    _ = require('lodash'),
    colors = require('colors'),
    app = express();

// Add Middleware necessarry for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

var datetime = new Date();

var url = require('./models/url');

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


//app.use('*', function(req, res, next) {
  //res.send('404 Page not found');
  //next();
//});

app.get('/', function(req, res) {
  console.log(datetime + colors.magenta(" [funnel]") + colors.blue(' Homepage request recieved'));
  res.sendfile("./public/index.html");
});

app.use('/posts', require('./routes/Update_Controller.js'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/funnel');
mongoose.connection.once('open', function(err) {
  if (err) throw err;

  app.post('/newurl', function(req, res) {



    //accepts url of site
    var newurl= new url ({url: req.body.url});
    newurl.save();
    console.log(datetime + colors.magenta(" [funnel]") + colors.blue(' New URL post recieved and saved'));
    res.redirect('/posts/history');

  });
/*
   // application -------------------------------------------------------------
      app.get('*', function(req, res) {
          res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
      });
  */
  console.log(datetime + colors.magenta(" [funnel]") + colors.bold.magenta(' Server running on port 3000'));
  app.listen(3000);
});
