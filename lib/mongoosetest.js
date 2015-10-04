var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/my_database_name');


update.findOne({rank: 5}, function (err, updateObj) {
  if (err) {
    console.log(err);
  } else if (updateObj) {
    console.log('Found:', updateObj);
}
});