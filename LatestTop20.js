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


download(url, function(data) {
  if (data) {

/*
    var postrank: = { rank1: "", rank2: "", rank3: "", rank4: "", rank5: "", rank6: "", rank7: "", rank8: ""
      rank9: "", rank10: "", rank11: "", rank12: "", rank13: "", rank14: "", rank15: "", rank16: ""
      rank17: "", rank18: "", rank19: "", rank20: "", rank21: "", rank22: "", rank23: "", rank24: ""
      rank25: ""
    }
*/
    var update = " ";
    var $ = cheerio.load(data);
    // Parse's url for specified data
    $("a.title.may-blank ").each(function(i, e) {
      update += $(e).html();
      console.log($(e).html());
      });
    // Writes data to file
    fs.writeFileSync('update.json', util.inspect(update) , 'utf-8'); 


    console.log("Finished update sir, a file copy 'input.json' was made and stored in the directory ");
  }
  else console.log("error");  
});


