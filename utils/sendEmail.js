const nodeMailer=require('nodemailer')

const sendEmail= async (email,otp)=>{
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,//dls connection
        auth: {
          user: "your email@gmail.com",
          pass: "your password",
        },
      });
      const info = await transporter.sendMail({
        from: '"NotiGo 👻" <youremail@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        html: `<h2>${otp}</h2>`, // html body
      });
}

module.exports=sendEmail
