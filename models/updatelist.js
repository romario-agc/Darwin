//Dependencies
var restful = require('node-restful');
var mongoose=restful.mongoose;

//Schema
var updatelist  = new mongoose.Schema({
        update_time: String,
        posts: String
      });


//Return model
module.exports = restful.model('updatelist', updatelist);