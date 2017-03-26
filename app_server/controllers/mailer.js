/**
 * Created by aman1 on 25/03/2017.
 */

const nodemailer = require('nodemailer');


// get the data from environment variables
var user_email = process.env.SENDER_EMAIL;
var pass = process.env.SENDER_EMAIL_PASSWORD;

module.exports.sendEmail = function(email, token) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',                               //default mail provider
        auth: {
            user: user_email,
            pass: pass
        }
    });

    var html = '<a href=\"http://localhost:3000/verify/' + token + '\">Click this link to verify your email</a>';

    var mailOptions = {
        from:  user_email,                                                //Senders' email
        to: email,                                                        // receivers email
        subject: 'Please do not reply, Bookface email verification',      // Subject line
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
};

