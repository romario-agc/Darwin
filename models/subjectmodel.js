//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var subjectschema = new mongoose.Schema({
  subjectlist: [{name: String,
                url: String,
                favourite: String,
                updates: Number }]
});

//Return model
module.exports = restful.model('subject', subjectschema);
