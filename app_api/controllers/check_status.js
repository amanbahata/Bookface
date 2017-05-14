/**
 * Created by aman1 on 28/03/2017.
 */

//Import modules
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');

/**
 * Performs the login status of the user that is sending the request
 * @param req - request object
 * @returns {boolean} - true if user is logged in, false otherwise
 */
module.exports.checkState = function (req) {
    if (req.headers && req.headers.token) {
        var decode = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        return !!User.findOne({email: decode.email});
    }
};
