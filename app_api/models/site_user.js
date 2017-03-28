/**
 * Created by aman1 on 06/03/2017.
 */

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

/*
    Set up the database schema for the site user
 */

var siteUserSchema = new mongoose.Schema({
  email: {
      type: String, unique: true, required: true
  },
    screenName: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    hash: {type:String},
    salt: {type: String},
    active: {type: Boolean, default: false}
});


/*
    Encryption of user passwords by first salting and hashi afterwards users' password input
 */
siteUserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/*
    Password validation when users log in to website.
    Returns true if the hashed version of the entered password is equal to the saved hashed version
    of the password and if the user has completed the email verification
 */

siteUserSchema.methods.validatePassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash ;
};


/*
    Generation of a jason web token that expires every seven days
 */

siteUserSchema.methods.generateToken = function(){
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        screenName: this.screenName,
        name: this.name,
        exp: parseInt(expiryDate.getTime()/1000)}, process.env.JWT_SECRET);   //sends this secret word for the use of the hashing algorithm
};


siteUserSchema.methods.generateUser = function () {
    return [{userName: this.email,
             screenName: this.screenName}];
};


mongoose.model('User', siteUserSchema);