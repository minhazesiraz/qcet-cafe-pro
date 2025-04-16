const nodemailer = require("nodemailer");

export async function dispatchIsProveLinks(email, provingToken, provingCode) {
   const baseUrl = process.env.NEXT_PUBLIC_URL;

   const awaitingConfirmationUrl = `${baseUrl}/accounts/awaiting-confirmation?provingToken=${provingToken}`;

   const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS
      }
   });

   await transporter.sendMail({
      // from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      from: '"Qcet Cafe" <noreply@qcetcafe.com>',
      to: email,
      subject: "Verify your email address",
      html: `
      <h2>Welcome!</h2>
      <p>Click the button below to verify your email:</p>
      <a href="${awaitingConfirmationUrl}" style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Verify Email</a>
      <p>Or enter this code in the app:</p>
      <h3>${provingCode}</h3>
      <p>This link and code will expire in 15 minutes.</p>
    `
   });
}

// import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//    service: "gmail", // or your preferred SMTP provider
//    auth: {
//       user: process.env.EMAIL_USER, // your Gmail or SMTP email
//       pass: process.env.EMAIL_PASS // your app password
//    }
// });

// export const sendVerificationEmail = async ({ email, token, code }) => {
//    const baseUrl = process.env.NEXT_PUBLIC_URL; // e.g., https://yourdomain.com

//    const verifyUrl = `${baseUrl}/verify?token=${token}`;

//    const mailOptions = {
//       from: `"Your App Name" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Verify your email address",
//       html: `
//       <h2>Welcome!</h2>
//       <p>Click the button below to verify your email:</p>
//       <a href="${verifyUrl}" style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Verify Email</a>
//       <p>Or enter this code in the app:</p>
//       <h3>${code}</h3>
//       <p>This link and code will expire in 15 minutes.</p>
//     `
//    };

//    await transporter.sendMail(mailOptions);
// };
