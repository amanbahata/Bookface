/**
 * Created by aman1 on 28/03/2017.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');


module.exports.checkState = function (req) {
    if (req.headers && req.headers.token) {
        var decode = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        if (User.findOne({email: decode.email})) {
            return true;
        }
        return false;
    }
};

// module.exports.getReviewerScreenName = function (req) {
//     if (req.headers && req.headers.token) {
//         var decode = jwt.verify(req.headers.token, process.env.JWT_SECRET);
//         return decode.screenName;
//     }
//     return false;
// };