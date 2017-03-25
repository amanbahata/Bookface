/**
 * Created by aman1 on 23/03/2017.
 */

var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
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
            "message" : "All input fields required."  // respond with error message if the required fields are not found
        });
        return;
    }

    // create a new user instance and set the screen name, user name, email and password
    var user = new User();
    user.screenName = req.body.screenName;
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);   // use setPassword from the schema method to salt and hash entered password


    user.save(function(err){
        var token;
        if (err) {
            sendJsonResponse(res, 404, err);
        }else{
            token = user.generateToken();   // generate token and send it to the browser
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
    if (!req.body.email || !req.body.password){  // check that all the required fields are supplied
        sendJsonResponse(res, 400, {
            "message" : "All fields required."
        });
        return;
    }
    passport.authenticate('local', function (err, user, info) {  // authenticate by passing name of strategy and a call back method
        var token;

        // return an error if passport returns an error after authentication
        if (err){
            sendJsonResponse(res, 404, err);
            return;
        }
        // generate a token if passport returns a user instance
        if (user){
            token = user.generateToken();
            sendJsonResponse(res, 200, {
                "token" : token
            });
        }else{
            sendJsonResponse(res, 401, info);  // otherwise return information about why the authentication failed
        }

    })(req, res);
};


module.exports.verify = function (req, res) {
    if(req.params && req.params.tokenid){
        var token = req.params.tokenid;
        var decoded = jwt.decode(token, process.env.JWT_SECRET);
        console.log(decoded.email);


        User.findOne({email: decoded.email}, function (err, user) {
            user.active = true;

            user.save(function (err) {
                if(err) {
                    console.error('ERROR!');
                }
            });
        });






        sendJsonResponse(res, 200, {
            "message" : "Authentication done."
        });
    }else{
        sendJsonResponse(res, 404, {
            "message" : "Email not found. Please register to the site."
        });
    }



};

