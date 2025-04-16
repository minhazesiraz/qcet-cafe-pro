const nodemailer = require("nodemailer");

export async function dispatchPasswordResetLinks(email, resettingToken) {
   const resettingUrl = `${process.env.NEXT_PUBLIC_URL}/accounts/resetting-password?token=${resettingToken}&email=${email}`;

   const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS
      }
   });

   await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
      <p>You requested a password reset.</p>
      <p>Click <a href="${resettingUrl}">here</a> to reset your password.</p>
      <p>This link will expire in 15 minutes.</p>
    `
   });
}
