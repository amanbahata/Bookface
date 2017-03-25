/**
 * Created by aman1 on 24/03/2017.
 */

const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
var request = require('request');



/*
 Setting up the api options
 */
var apiOptions = {
    server : "http://localhost:3000"
};

// var transporter = nodemailer.createTransport("SMTP",{
//     service: 'gmail',
//     auth : {
//         user: "gmail usern name",
//         password: "gmail password"
//
//     }
// });
//
// var mailOptions = {
//     from: '',
//     to: '',
//     subject: '',
//     text: ''
// };
//
// transporter.sendMail(mailOptions, function (err, res) {
//    if (err){
//        console.log("Error sending email");
//    }else{
//        console.log("Email sent with success");
//    }
// });



module.exports.doVerification = function (req, res) {
    var requestOptions, path, postData;
    path = '/api/verify/' + req.params.tokenid;
    // postData = {
    //     screenName: req.body.screenName,
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // };


    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json: {}
    };
    request (requestOptions,
        function(err, response){
            if (response.statusCode === 200){
                res.redirect('/login');
            }else{
                console.log("Something went wrong");
                res.redirect('/register');
            }
        }
    );
};