/**
 * Created by aman1 on 23/03/2017.
 */

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');


var sendJsonResponse = function (res, status, data) {
    res.status(status);
    res.json(data);
};


/*
 Registration controller for the api
 */


module.exports.register = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password){
        sendJsonResponse(res, 400, {
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
            sendJsonResponse(res, 404, err);
        }else{
            token = user.generateToken();
            sendJsonResponse(res, 200, {
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
        sendJsonResponse(res, 400, {
            "message" : "All fields required."
        });
        return;
    }
    passport.authenticate('local', function (err, user, info) {
        var token;

        if (err){
            sendJsonResponse(res, 404, err);
            return;
        }
        if (user){
            token = user.generateToken();
            sendJsonResponse(res, 200, {
                "token" : token
            });
        }else{
            sendJsonResponse(res, 401, info);
        }

    })(req, res);
};
