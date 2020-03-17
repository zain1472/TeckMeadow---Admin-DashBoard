var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zain.abideen14572@gmail.com',
    pass: 'superman1234'
  }
});
function test() {
    transporter.sendMail({
        from:'zain.abideen14572@gmail.com',
        to:'zain.abideen14572@gmail.com',
        text:'hi there',
        subject: 'email'
    },function (err,info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}
module.exports = transporter;