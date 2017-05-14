/**
 * Created by aman1 on 24/03/2017.
 */


var request = require('request');



/**
 *Setting up the api options
 */
var apiOptions = {
    server : "http://localhost:3000"
};


/**
 * Sends a GET request to the api in order to check that the
 * newly registered user has verified their email address
 * @param req
 * @param res
 */

module.exports.doVerification = function (req, res) {
    var requestOptions, path;
    path = '/api/verify/' + req.params.tokenid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json: {}
    };
    request (requestOptions,
        function(err, response){
        var verified = false;
            if (response.statusCode === 200){
                verified = true;
                renderVerificationForm(req, res, verified);
            }else{
                renderVerificationForm(req, res, verified);
            }
        }
    );
};

/**
 * Renders the account verification page with the appropriate message
 * @param req
 * @param res
 * @param verified
 */

var renderVerificationForm = function(req, res, verified){
    var message;
    if (verified){
        message = "Thank you for verifying your email address. You can now log in. ";
    }else {
        message = "There has been a problem verifying your email please register again.";
    }
    res.render('verified_page', {
        title: "Verification",
        pageHeader: {
            title: "Account verification"
        },
        message: message
    });
};