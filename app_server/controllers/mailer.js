/**
 * Created by aman1 on 25/03/2017.
 */

const nodemailer = require('nodemailer');



module.exports.sendEmail = function(email, token) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'XXXXXXXX@gmail.com',                          // Sender email id
            pass:  XXXXXXXX          //process.env.EMAIL_PASSWORD                    // Sender password
        }
    });

    var html = '<a href=\"http://localhost:3000/verify/' + token + '\">Click this link to verify email</a>';

    var mailOptions = {
        from: 'XXXXXXXX@gmail.com',                              // sender address
        to: email,                                                 // list of receivers
        subject: 'Do not reply, Bookface email verification',      // Subject line
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

