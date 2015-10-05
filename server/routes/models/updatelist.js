//Dependencies
var restful = require('node-restful');
var mongoose=restful.mongoose;

var updatelist  = mongoose.model('Updatelist', {
        update_time: String,
      });


//Return model
module.exports = restful.model('updatelist', update;