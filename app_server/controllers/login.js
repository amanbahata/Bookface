/**
 * Created by aman1 on 23/03/2017.
 */

var request = require('request');

/*
 Setting up the api options
 */
var apiOptions = {
    server : "http://localhost:3000"
};


module.exports.login = function (req, res) {
    renderLoginForm(req, res);
};

var renderLoginForm = function (req, res) {
    res.render('login', {
        title: 'Login',
        pageHeader: {title: 'Login'}
    });

};


module.exports.doLogin = function (req, res) {
    var requestOptions, path, postData;
    path = '/api/login';
    postData = {
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
                // req.setHeader('Authorisation', response.body.token);

                req.session.token = response.body.token;

                setTimeout(function(){res.redirect('/')}, 3000);
            }else{
                res.render('login',{
                    title:'Login',
                    pageHeader: {title: 'Login'},
                    message : 'invalid email or password.'
                });
            }
        }
    );
};
