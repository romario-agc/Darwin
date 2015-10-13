//Depencencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

//Create the application
var app = express();

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
app.use('/dashboard', function(req, res, next) {
  res.send('/r/leagueoflegends');
  next();
});

app.use('/settings', function(req, res, next) {
  res.send('Settings');
  next();
});

app.use('/', require('./routes/index'));


//Connect to MongoDB
mongoose.connect('mongodb://localhost/darwinapp');
mongoose.connection.once('open', function() {

  /*
  //request for single post data
   app.get('/api/post1', function(req, res) {

          // use mongoose to get all posts in the database
          post.find(function(err, post) {

              // if there is an error retrieving, send the error. nothing after res.send(err) will execute
              if (err)
                  res.send(err)

              res.json(post); // return all single posts in JSON format
          });
      });


      // get all todos
      app.get('/api/todos', function(req, res) {

          // use mongoose to get all todos in the database
          Todo.find(function(err, todos) {

              // if there is an error retrieving, send the error. nothing after res.send(err) will execute
              if (err)
                  res.send(err)

              res.json(todos); // return all todos in JSON format
          });
      });

      // create todo and send back all todos after creation
      app.post('/api/todos', function(req, res) {

          // create a todo, information comes from AJAX request from Angular
          Todo.create({
              text : req.body.text,
              done : false
          }, function(err, todo) {
              if (err)
                  res.send(err);

              // get and return all the todos after you create another
              Todo.find(function(err, todos) {
                  if (err)
                      res.send(err)
                  res.json(todos);
              });
          });

      });

      // delete a todo
      app.delete('/api/todos/:todo_id', function(req, res) {
          Todo.remove({
              _id : req.params.todo_id
          }, function(err, todo) {
              if (err)
                  res.send(err);

              // get and return all the todos after you create another
              Todo.find(function(err, todos) {
                  if (err)
                      res.send(err)
                  res.json(todos);
              });
          });
      });


   // application -------------------------------------------------------------
      app.get('*', function(req, res) {
          res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
      });
  */


  console.log('Listening on port 3000...');
  app.listen(3000);
});
