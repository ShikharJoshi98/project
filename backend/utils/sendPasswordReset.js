import nodemailer from 'nodemailer';
import { PASSWORD_RESET_REQUEST_TEMPLATE } from './emailTemplate.js';

export const sendPasswordResetEmail = async (email, resetLink) => {
    const recipient = email;
    let config = {
        service: 'gmail',
        auth: {
            user: 'shikharjoshi89@gmail.com',
            pass: 'cbok bmms smck rakl'
        }
    }
    let transporter = nodemailer.createTransport(config);
    let mail = PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',resetLink);

    let message = {
        from: 'shikharjoshi89@gmail.com',
        to: recipient,
        subject: "Reset Password",
        html:mail
    }
    transporter.sendMail(message);
}