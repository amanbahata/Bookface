/**
 * Created by aman1 on 29/03/2017.
 */

var jwt = require('jsonwebtoken');


module.exports.screenNameDecoder = function (req) {
    if (req.session && req.session.token) {
        var decode = jwt.verify(req.session.token, process.env.JWT_SECRET);
        return decode.screenName;
    }
    return;
};
