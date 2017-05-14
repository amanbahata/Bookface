/**
 * Created by aman1 on 28/03/2017.
 */

var request = require('request');

/**
 *Setting up the api options
 */
var apiOptions = {
    server : "http://localhost:3000"
};

/**
 * Preforms user logout
 * @param req
 * @param res
 */
module.exports.doLogout = function (req, res) {
    if (req.session && req.session.token){
        req.session.destroy();
        res.redirect('/');
    }else{
        res.redirect('/');
    }
};
