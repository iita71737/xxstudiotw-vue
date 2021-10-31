const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: '',
    },
});

let orderController = {

    postOrder: (req, res) => {

        var mailOptions = {
            from: 'iita71737@gmail.com',
            to: 'iita71737+ac@gmail.com',
            subject: ` 訂單成立`,
            text: ` 訂單成立`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return Promise.all(results).then(() =>
            res.redirect('/cart')
        );
    }
}

module.exports = orderController