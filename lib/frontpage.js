var https = require("https");
var cheerio = require("cheerio");
var fs = require("fs");
var util = require('util');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database_name');
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
var singlepost  = mongoose.model('post', {
        rank: Number,
        score: Number,
        title: String,
        link: String,
        time: String,
        comments: String
      });

var update  = mongoose.model('Update', {
        update_time: String,
        updateid: String
      });


var update1 = new update({
		update_time: new Date(),
		updateid: new Date()
});
update1.save(function (err, updateObj) {
  		if (err) {
   			console.log(err);
  		} else {
  			console.log('Saved to MongoDB successfully:', updateObj);
  	}
});



var post1 = new singlepost({
        rank: "",
        score: "",
        title: "",
        link: "",
        time: "",
        comments: ""
      }); 
var x;

download(url, function(data) {
  if (data) {

    var $ = cheerio.load(data);
    // Parse's url for specified data

    $("a.title.may-blank").each(function(i, e) {   
     	//update1.posts[i] = i
        post1.rank= $("span.rank").eq(i).text()
        post1.score= $("div.score.unvoted").eq(i).text()
        post1.title=$(e).html()
        post1.link= $("a.thumbnail.self.may-blank").attr('href')
        post1.time= $("time.live-timestamp").eq(i).text()
        post1.comments= $("a.comments.may-blank").eq(i).text()
   		
   		console.log($(e).html());
      });
    // Writes data to file
    	
   	fs.writeFileSync('post.json', util.inspect(post1) , 'utf-8');
   	fs.writeFileSync('post.txt', util.inspect(post1) , 'utf-8');

    post1.save(function (err, postObj) {
  		if (err) {
   			console.log(err);
  		} else {
  			console.log('Saved to MongoDB successfully:', postObj);
  	}
});

    console.log("A file copy 'post.txt' was made and stored in the directory ");
  }
  else console.log("error");  
});


