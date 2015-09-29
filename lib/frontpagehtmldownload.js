var https = require("https");

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

var url = "https://www.reddit.com/r/leagueoflegends"
download(url, function(data) {
  if (data) {
    console.log(data);
  }
  else console.log("error");  
});


