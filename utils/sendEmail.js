const nodeMailer=require('nodemailer')

const sendEmail= async (email,otp)=>{
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,//dls connection
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAIL_PASSWORD,
        },
      });
      const info = await transporter.sendMail({
        from: `NotiGo 👻 <${process.env.MAILER_EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        html: `<h2>${otp}</h2>`, // html body
      });
}

module.exports=sendEmail
