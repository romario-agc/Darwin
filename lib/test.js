var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('test.json', 'utf8'));
console.log(obj)