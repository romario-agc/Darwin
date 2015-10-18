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


// Source url
var url = "https://www.reddit.com/r/leagueoflegends";


// Importing Schemas
var post = require('../models/post'),
  updatelist = require('../models/updatelist');


// Time
var datetime = new Date();


// Routes
router.get('/history', function(req, res) {
  //Pulling data from url
  download(url, function(data) {
    if (data) {
      console.log(datetime + colors.cyan(" New Reddit update request"));
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
        //Saves to "new" collection
        singlepost.save();
      });
      console.log(datetime + colors.green(" Update successful"));
    } else {
      console.log("error");
    }
    //Prints JSON of posts collection
    post.find({}, function(err, doc) {
      if (err) throw err;
      res.json(doc);
      console.log(datetime + colors.green(" Response sent"));
      //Deletes previous collection
      post.remove({});
        console.log(datetime + colors.blue(" Database cleared"));
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
