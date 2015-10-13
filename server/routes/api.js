//Dependencies
var https = require("https");
var cheerio = require("cheerio");
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('util')


//  Utility function that downloads a URL and invokes callback with the data. 
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


//Conneting to MongoDB
var db = mongoose.connection;

// Source url
var url = "https://www.reddit.com/r/leagueoflegends"

//Importing Schemas
var post = require('./models/post');
var updatelist = require ('./models/updatelist');

//Declaring models
var newupdate = new updatelist;


//Routes
post.methods(['get', 'put', 'post', 'delete']);
post.register(router, '/posts');

updatelist.methods(['get', 'put', 'post', 'delete']);
updatelist.register(router, '/updatelist');

//Pulling data from url
download(url, function(data) {
  if (data) {

    //Loads html into cheerio
    var $ = cheerio.load(data);

    // Parse's html in loop for specified data 
    $("a.title.may-blank").each(function(i, e) {  

      //Save data to model as an individual post
      var singlepost = new post ({       
        rank: $("span.rank").eq(i).text(),
        score: $("div.score.unvoted").eq(i).text(),
        title: $(e).html(),
        link: $("a.thumbnail.self.may-blank").attr('href'),
        time: $("time.live-timestamp").eq(i).text(),
        comments: $("a.comments.may-blank").eq(i).text()
      });
       	console.log(singlepost);

        //Appends post to JSON and txt file
        fs.appendFile( "frontpage.JSON", singlepost, "utf8");
        fs.appendFile( "frontpage.txt", singlepost, "utf8");

        //Save model to Database
        singlepost.save(function(err, singlepost) {
          if (err) throw err;
        });
    });    

    /*
        newupdate = ({
          update_time: new date(),
          posts: frontpage
        });
        console.log(addhistory);

        frontpage.save(function(err) {
          if (err) throw err;
          console.log('Font page for on');
        });
        */
       

  }
  else {
    console.log("error");  
  };

});


//Return router
module.exports = router;

