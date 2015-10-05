//Dependencies
var restful = require('node-restful');
var mongoose=restful.mongoose;


//Schema
var postschema  = new mongoose.Schema({
        rank: Number,
        score: Number,
        title: String,
        link: String,
        time: String,
        comments: String
});


//Return model
module.exports = restful.model('post', postschema);