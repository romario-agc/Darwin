//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var subjectschema = new mongoose.Schema({
  subjectlist: [{name: String}]
});

//Return model
module.exports = restful.model('subject', subjectschema);
