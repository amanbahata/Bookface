/**
 * Created by aman1 on 28/03/2017.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwtDecode = require('jwt-decode');


module.exports.checkStatus = function (req) {
    if (req.headers && req.headers.token) {
        var decode = jwtDecode(req.headers.token);
        if (User.findOne({email: decode.email})) {
            return true;
        }
        return false;
    }
};