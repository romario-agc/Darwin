var restful = require('node-restful');
var mongoose=restful.mongoose;

//Schema
var url = new mongoose.Schema({
        url: String
      });


//Return model
module.exports = restful.model('URL', url);
