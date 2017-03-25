/**
 * Created by aman1 on 25/03/2017.
 */

const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');



var transporter = nodemailer.createTransport("SMTP",{
    service: 'gmail',
    auth : {
        user: "gmail usern name",
        password: "gmail password"

    }
});

var mailOptions = {
    from: '',
    to: '',
    subject: '',
    text: ''
};

transporter.sendMail(mailOptions, function (err, res) {
   if (err){
       console.log("Error sending email");
   }else{
       console.log("Email sent with success");
   }
});
