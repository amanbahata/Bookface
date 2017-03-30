/**
 * Created by aman1 on 29/03/2017.
 */

var jwtDecode = require('jwt-decode');

module.exports.screenNameDecoder = function (req) {
        var decode = jwtDecode(req.session.token);
        return decode.screenName;
};
