/**
 * Created by aman1 on 23/03/2017.
 */


var request = require('request');
var mailer = require('./mailer');

/*
 Setting up the api options
 */
var apiOptions = {
    server : "http://localhost:3000"
};


module.exports.register = function (req, res) {
    var requestOptions, path, message;
    path = '/api/register';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json: {}
    };
    request (requestOptions,
        function(err, response, body){
            renderRegisterForm(req, res, body);
        }
    );
};

var renderRegisterForm = function (req, res, responseBody) {
    res.render('register', {
        title: 'Register',
        pageHeader: {title: 'Register'}
    });
};

module.exports.doRegister = function(req, res){
    var requestOptions, path, postData;
    path = '/api/register';
    postData = {
        screenName: req.body.screenName,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json: postData
    };
    request (requestOptions,
        function(err, response){
            if (response.statusCode === 200){
                if (response.body) {
                    mailer.sendEmail(req.body.email, response.body.token);
                }
                res.redirect('/login');
            }else{
                console.log("Something went wrong");
                res.redirect('/register');
            }
        }
    );
};