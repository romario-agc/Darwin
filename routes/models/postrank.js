//Dependencies
var restful = require('node-restful');
var mongoose=restful.mongoose;

var postrank = mongoose.model('Ranking',{ 
	rank1: Number,
	rank2: Number,
    rank3: Number,
    rank4: Number,
    rank5: Number,
    rank6: Number,
    rank7: Number,
    rank8: Number,
    rank9: Number,
    rank10: Number,
    rank12: Number,
    rank13: Number,
    rank14: Number,
    rank15: Number,
    rank16: Number,
    rank17: Number,
    rank18: Number,
    rank19: Number,
    rank20: Number,
    rank21: Number,
    rank22: Number,
    rank23: Number,
    rank24: Number,
    rank25: Number,
});

//Return model
module.exports = restful.model('Ranking', postrank);