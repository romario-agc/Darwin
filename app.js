// Depencencies
var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  _ = require('lodash'),
  colors = require('colors'),
  datetime = new Date(),
  app = express();


// Add Middleware necessarry for REST API's
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));


// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Renders front end files
app.use(express.static(__dirname + '/public'));


// Gets data from Cheerio API
app.use('/posts', require('./routes/Update_Route.js'));


// Connect to MongoDB
mongoose.connect('mongodb://romarioc:NnoirO12*@ds043324.mongolab.com:43324/heroku_k9814jjc');
mongoose.connection.once('open', function(err) {
  if (err) throw err;

  // Posts new name and url to database
  app.post('/changename', function(req, res) {

    console.log(datetime + colors.magenta(" [funnel]") + colors.bold.magenta(' New Post Recieved'));

    // Import Schema
    var subject = require('./models/subjectmodel');

    subject.findOne({ 'name': req.body.oldname }, function (err, subject) {
      if (err) console.log(err);

      subject =  ({
        name: req.body.newname
      });

      console.log(subject);

      subject.save(function(err) {
        if (err) {
          console.log(err);
          res.send('Failed');
          console.log(datetime + colors.magenta(" [funnel]") + colors.bold.red(' New Subject Failed to be Added'));
        }
          res.send('Success');
          console.log(datetime + colors.magenta(" [funnel]") + colors.bold.white(' New Subject Successfully Added'));

      });

    });

  });

  // Gets details of specific subject
  app.get('/getdetails', function(req, res) {

    console.log(datetime + colors.magenta(" [funnel]") + colors.bold.magenta(' Recieved request for' + req.name + ' details'));

    // Import Schema
    var subject = require('./models/subjectmodel');

    subject.findOne({ 'name': req.body.name }, function (err, subject) {
      if (err) return handleError(err);
      res.json(subject);
    });

  });


  // Gets the names of all subjects from database
  app.use('/getsubjects', function(req, res) {

    // Import Schema
    var subjects = require('./models/subjectmodel');

    // Find all Subjects.
    subjects.find({}, 'subjectlist', function(err, data) {
      if (err) return console.error(err);
      var names = [];
      for (var i = 0; i < data[0].subjectlist.length; i++) {
        names.push(data[0].subjectlist[i].name);
      }
      res.json(data[0].subjectlist);
    });

    console.log(datetime + colors.magenta(" [funnel]") + colors.bold.blue(' Returned subjects data'));

  });



  console.log(datetime + colors.magenta(" [funnel]") + colors.bold.magenta(' Server running on port 3000'));
  app.listen(process.env.PORT || 3000);
});
