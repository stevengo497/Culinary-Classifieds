const mongoose = require("mongoose");
bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let UserSchema = new Schema ({
  email: String,
  passwordDigest: String
})

UserSchema.statics.createSecure = function(email, password, callback){
	var UserModel = this;

	bcrypt.genSalt(function(err, salt){
		console.log("salt", salt);

		bcrypt.hash(password, salt, function(err, hash){

			//once we have a encrypted hash, we can store that in our database
			UserModel.create({
				email : email,
				passwordDigest : hash
			}, callback);
		})
	})
}

UserSchema.methods.checkPassword = function(password) {
	// return true if the password typed matches the one stored in the DB. 'this' refers to the user document that called this function (from es5)
	return bcrypt.compareSync(password, this.passwordDigest)
}

// authenticate user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback) {
  // find user by email entered at log in
  // remember `this` refers to the User for methods defined on UserSchema.statics
  this.findOne({email: email}, function (err, foundUser) {
    console.log(foundUser);

    // throw error if can't find user
    if (!foundUser) {
      console.log('No user with email ' + email);
      callback("Error: no user found", null);  // better error structures are available, but a string is good enough for now
    // if we found a user, check if password is correct
    } else if (foundUser.checkPassword(password)) {
      callback(null, foundUser);
    } else {
      callback("Error: incorrect password", null);
    }
  });
};




//this line creates the model from the schema
var User = mongoose.model('User', UserSchema);

module.exports = User;
