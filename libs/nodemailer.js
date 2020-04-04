const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'meetpadscheduler007@gmail.com',
        pass: 'abhi1969'
    }
});


let sendWelcomeMail = (userDetails) => {

    let mailOptions = {
        from: 'meetpadscheduler007@gmail.com',
        to: userDetails.email,
        subject: `Meeting Planner, welcome to your new Account`,
        html: `
        <div style="background:#f5f5f5;padding:15px;margin:40px;text-align:center">
            <h2>Hi ${userDetails.firstName}</h2>
            <p>Thank you for creating a Meeting Planner Account.</p>
            <p>Devoloped by: Abhishek A</p>
        </div>`
    };

    // sending mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent to: %s', mailOptions.to);
    });

}// end sendWelcomeMail function


let sendForgotPasswordMail = (email, token, userType) => {

    let mailOptions = {
        from: 'meetingscheduler007@gmail.com',
        to: email,
        subject: `Meeting Planner: Reset Passsword`,
        html: ` <h3>Hi!</h3>
        <p>You requested for a password reset, kindly use this <a href="http://ec2-13-233-119-109.ap-south-1.compute.amazonaws.com?token=${token}?userType=${userType}">link</a> to reset your password</p>
        <p>This link is valid for 30 minutes.</p>
        <br>
        <p>Thank You!<br>Devoloped by: Abhishek A</p>`
    };

    // sending mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', mailOptions.to);
    });

}// end sendForgotPasswordEmail

module.exports = {
    welcomeMail: sendWelcomeMail,
    forgotPassword: sendForgotPasswordMail
}
