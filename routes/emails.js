if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const catchAsync = require('../Utils/catchAsync');
const email = require('../Models/email');
const nodeMailer = require('nodemailer');

router.post('/', catchAsync(async (req, res) => {
    console.log(req.body);
    const mail = new email(req.body);
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

      var mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'MAIL FROM ' + mail.email,
        html: '<center>Mail from <b>' + mail.name +'<b> .. </center><br>' + mail.message 
      };

      var response;

      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          response = error;
        } else {
          response = info.response;
        }
      });

      res.send(response);   
}));

module.exports = router