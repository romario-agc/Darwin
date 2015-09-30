var https = require("https");
var cheerio = require("cheerio");
var fs = require("fs");
var util = require('util');

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
var update = [] ;
var x;

download(url, function(data) {
  if (data) {

    var $ = cheerio.load(data);
    // Parse's url for specified data

    $("a.title.may-blank").each(function(i, e) {   
      x ={
        "ID": Math.random(),
        "Rank": $("span.rank").eq(i).text(),
        "Score": $("div.score.unvoted").eq(i).text(),
        "Title": $(e).html(),
        "Link": $("a.thumbnail.self.may-blank").eq(i).html(),
        "Time": $("time.live-timestamp").eq(i).text(),
        "Comments": $("a.comments.may-blank").eq(i).text()
      }
      update.push(x);
      console.log(x);
      });
    // Writes data to file
    fs.writeFileSync('update.json', util.inspect(update) , 'utf-8'); 
    fs.writeFileSync('update.txt', util.inspect(update) , 'utf-8');
    

    console.log("Finished update sir, a file copy 'input.json' was made and stored in the directory ");
  }
  else console.log("error");  
});


