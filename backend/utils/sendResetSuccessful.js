import nodemailer from 'nodemailer';
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from './emailTemplate.js';

export const sendResetSuccessEmail = async (email) => {
    const recipient = email;
    let config = {
        service: 'gmail',
        auth: {
            user: 'shikharjoshi89@gmail.com',
            pass: 'cbok bmms smck rakl'
        }
    }
    let transporter = nodemailer.createTransport(config);
    let mail = PASSWORD_RESET_SUCCESS_TEMPLATE;

    let message = {
        from: 'shikharjoshi89@gmail.com',
        to: recipient,
        subject: "Reset Password Successful",
        html:mail
    }
    transporter.sendMail(message);
}
