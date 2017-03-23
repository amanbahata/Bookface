/**
 * Created by aman1 on 06/03/2017.
 */

var mongoose = require('mongoose');
var crypto = require('crypto');

/*
    Set up the database schema for the site user
 */

var siteUserSchema = new mongoose.Schema({
  email: {
      type: String, unique: true, required: true
  },
    name: {type: String, required: true},
    hash: {type:String},
    salt: {type: String}
});

siteUserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

siteUserSchema.methods.validatePassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

//mongoose.model('User', userSchema);