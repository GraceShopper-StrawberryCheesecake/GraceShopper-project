const router = require('express').Router()
const transporter = require('./transporter')


router.post("/", function (req, res) {

    console.log("API/SENDMAIL REQ.BODY: ", req.body.email)

    let mailOptions = {
      from: "no-reply@Chaotic-Cheesecake.com",
      to: req.body.email,
      subject: "Order Confirmation",
      text: "this is some text",
      html: req.body.content,
    };
   
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
        res.json({ status: "Email sent" });
      }
    });
   });

module.exports = router