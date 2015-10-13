//Dependencies
var https = require("https");
var cheerio = require("cheerio");
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('util');


//  Utility function that downloads a URL and invokes callback with the data.
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


//Conneting to MongoDB
var db = mongoose.connection;

// Source url
var url = "https://www.reddit.com/r/leagueoflegends";

//Importing Schemas
var post = require('./models/post');
var updatelist = require('./models/updatelist');
var r = 11;


//Routes
post.methods(['get', 'put', 'post', 'delete']);
post.register(router, '/');

updatelist.methods(['get', 'put', 'post', 'delete']);
updatelist.register(router, '/updatelist');

router.get('/history', function(req, res) {
  //Response to request with post database
  post.find({},function(err,post){
    if (err)
    res.send(err);
    res.json(post);
  });
});


//Pulling data from url
download(url, function(data) {
  if (data) {
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
      console.log(singlepost);

      //Save model to Database and saving ID
      singlepost.save(function (err) {
        if (err) return handleError(err);
        // saved!
        //spid = singlepost.id;
        //console.log(spid);
      });
      /*
              var newupdate = new updatelist({
                update_time: new Date(),
                posts: singlepost.id
              });
          */
    });
  }
  else {
    console.log("error");
  }
});

//Return router
module.exports = router;
