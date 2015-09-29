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

download(url, function(data) {
  if (data) {

    var $ = cheerio.load(data);
    // Parse's url for specified data
    $("a.title.may-blank ").each(function(i, e) {
      update.push($(e).html());
      console.log($(e).html());
      });
    // Writes data to file
    fs.writeFileSync('update.json', util.inspect(update) , 'utf-8'); 
    fs.writeFileSync('update.txt', util.inspect(update) , 'utf-8');


    console.log("Finished update sir, a file copy 'input.json' was made and stored in the directory ");
  }
  else console.log("error");  
});


