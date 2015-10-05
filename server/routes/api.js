//Dependencies
var https = require("https");
var cheerio = require("cheerio");
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('util')

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  https.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
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
var url = "https://www.reddit.com/r/leagueoflegends"


//Models
var post = require('./models/post');
//var update = require ('./models/updatelist');


//Routes
post.methods(['get', 'put', 'post', 'delete']);
post.register(router, '/posts');

//Pulling data from url
download(url, function(data) {
  if (data) {

    var $ = cheerio.load(data);

    // Parse's url for specified data
    $("a.title.may-blank").each(function(i, e) {  

      var frontpage = new post({       
        rank: $("span.rank").eq(i).text(),
        score: $("div.score.unvoted").eq(i).text(),
        title: $(e).html(),
        link: $("a.thumbnail.self.may-blank").attr('href'),
        time: $("time.live-timestamp").eq(i).text(),
        comments: $("a.comments.may-blank").eq(i).text()
      });
        console.log(frontpage);
        frontpage.save();
        /*
        var addhistory = new update ({
        	update_time: new date(),
        	posts: frontpage
        });
        console.log(addhistory);
        */
      });
    //fs.writeFileSync('update.json', util.inspect(frontpage), 'utf-8');
  }
  else {
    console.log("error");  
  };

});

//Return router
module.exports = router;

