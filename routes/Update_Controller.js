// Dependencies
var https = require("https"),
  cheerio = require("cheerio"),
  mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router(),
  fs = require('fs'),
  colors = require('colors'),
  util = require('util');


// Utility function that downloads a URL and invokes callback with the data.
function download(url, callback) {
  https.get(url, function(res) {
    var data = "";
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}


// Importing Schemas
var post = require('../models/post'),
  url = require('../models/url'),
  updatelist = require('../models/updatelist');

// Source url

var newurl = "https://www.reddit.com/r/leagueoflegends";

var temp = "";
url.find({},'url',function(err,docs){
  if (err) throw err;
  temp=(docs[0]);
  console.log(temp.url);
});
//var newurl2 = temp.url;
//console.log(temp);
// Time
var datetime = new Date();


// Routes
router.get('/history', function(req, res) {

  //Pulling data from url
  download(newurl, function(data) {
    if (data) {
      console.log(datetime + colors.magenta(" [funnel]") + colors.cyan(" New Reddit update request"));

      //Loads html into cheerio
      var $ = cheerio.load(data);

      // Parse's html in loop for specified data
      $("a.title.may-blank").each(function(i, e) {

        //Save data to model as an individual post
        var singlepost = new post({
          rank: $("span.rank").eq(i).text(),
          score: $("div.score.unvoted").eq(i).text(),
          title: $(e).html(),
          link: $("a.thumbnail.self.may-blank").attr('href'),
          time: $("time.live-timestamp").eq(i).text(),
          comments: $("a.comments.may-blank").eq(i).text()
        });

        //console.log(colors.cyan((singlepost.title)));

        //Saves to "new" collection
        singlepost.save(function(err){
          //if (err){
          //console.log(err);
          //}
        });

      });
      console.log(datetime + colors.magenta(" [funnel]") + colors.green(" Update successful"));
    } else {
      console.log(datetime + colors.magenta(" [funnel]") + colors.red(" Something went wrong, can't seem to get data"));
    }

    //Prints JSON of posts collection then clears database
    post.find({}, function(err, doc) {
      if (err) throw err;

      //Sents collection
      res.json(doc);
      console.log(datetime + colors.magenta(" [funnel]") + colors.green(" Response sent"));

      //Deletes collection
      post.remove({}, function(err){
        if (err) throw err;
        console.log(datetime + colors.magenta(" [funnel]") + colors.white(" Database cleared"));
      });

      //Deletes  previous url
      /*
      url.remove({}, function(err){
        if (err) throw err;
        console.log(datetime + colors.magenta(" [funnel]") + colors.white(" URL cleared"));
      });
      */
    });

    //Saves to "old" collection
    /*
    post.find({}, function(err, doc) {
      if (err) throw err;
      var history = new updatelist({
        update_time: new Date(),
        //posts: post.findOne({},functio)
      });
      history.save();
    });
    */

  });
});


// Return router
module.exports = router;
