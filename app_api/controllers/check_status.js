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

    //console.log(jwtDecode(req.headers.token));


            // User.findOne({email: username}, function (err, user) {
            //     if (err){
            //         return done(err);
            //     }
            //     if (!user){
            //         return done(null, false, {
            //             "message" : 'Incorrect username.'
            //         });
            //     }
            //     if (!user.validatePassword(password)){
            //         return done(null, false, {
            //             "message" : "Incorrect password."
            //         });
            //     }
            //     return done(null, user);
            // });

