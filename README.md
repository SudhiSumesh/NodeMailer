# NodeMailer Project

This project is a Node.js (Express) application that sends mails to users using Node Mailer. The project allows APIs to register users and login , and reset passwords. In the reset password route, an OTP is sent to the user’s email, and the next route checks the OTP and verifies and updates the password.

### Installation

1.Clone the repository.

2.Install the dependencies using the following command:
  `npm install`

3.Create a .env file in the root directory of the project and add the following environment variables:

PORT=3000<br>
JWT_SECRET=your_jwt_secret <br>
MAILER_EMAIL=your_email_address <br>
MAILER_PASSWORD=your_email_password

4.Start the server using the following command:`npm start`


### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.