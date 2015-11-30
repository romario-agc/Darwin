// Depencencies
var nr = require('newrelic'),
    express = require('express'),
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


// Renders front end files
app.use(express.static(__dirname+'/public'));


// Gets data from Cheerio API
app.use('/posts', require('./routes/Update_Route.js'));


// Gets the names of all subjects
app.use('/getsubjects', function(req, res) {
  var objects = {
    "name":['League of Legends', 'Space X' ,'Bernie Sanders','Middle East Conflict','Apple','Tesla Motors',
            'Elon Musk','Model X','Model 3','Faker','One Punch Man','Dragonball Super', 'Limitless','Attack on Titan']
            };
  res.json(objects);
});


// Connect to MongoDB
mongoose.connect('mongodb://romarioc:NnoirO12*@ds043324.mongolab.com:43324/heroku_k9814jjc');
mongoose.connection.once('open', function(err) {
  if (err) throw err;

  app.post('/newurl', function(req, res) {

    //accepts url of site
    var newurl= new url ({url: req.body});
    newurl.save();
    console.log("post: "+newurl);
    console.log(datetime + colors.magenta(" [funnel]") + colors.blue(' New URL post recieved and saved'));
    res.redirect('/posts/update');

  });

  console.log(datetime + colors.magenta(" [funnel]") + colors.bold.magenta(' Server running on port 3000'));
  app.listen(process.env.PORT || 3000);
});
