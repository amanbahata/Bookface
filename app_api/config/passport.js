/**
 * Created by aman1 on 23/03/2017.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


passport.use(new LocalStrategy({
    usernameField: 'email'},
    function (username, password, done) {
    User.findOne({email: username}, function (err, user) {
        if (err){
            return done(err);
        }
        if (!user){
            return done(null, false, {
                "message" : 'Incorrect username.'
            });
        }
    });
}));


/*
    Registration controller for the api
 */


module.exports.register = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {
           "message" : "All input field required."
        });
        return;
    }

    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save(function(err){
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        }else{
            token = user.generateToken();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        }
    })
};


/*
    Login controller for the api
 */

module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {
            "message" : "All fields required."
        });
        return;
    }
    passport.authenticate('local', function (err, user, info) {
        var token;

        if (err){
            sendJSONresponse(res, 404, err);
            return;
        }
        if (user){
            token = user.generateToken();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        }else{
            sendJSONresponse(res, 401, info);
        }

    })(req, res);
};