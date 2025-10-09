import nodemailer from 'nodemailer';
import { VENDOR_BILL_TEMPLATE } from './emailTemplate.js';
import dotenv from "dotenv";
import axios from 'axios';
import { updateDate } from './todayDate.js';

dotenv.config();

export const sendPaymentEmail = async (email, data) => {
    const recipient = email;
    let config = {
        service: 'gmail',
        auth: {
            user: 'shikharjoshi89@gmail.com',
            pass: 'cbok bmms smck rakl'
        }
    }
    let transporter = nodemailer.createTransport(config);
    let mail = VENDOR_BILL_TEMPLATE.
        replace('transactionDetails', data.transactionDetails )
        .replace('chequeNo', data.chequeNo)
        .replace('date', updateDate(data.date))
        .replace('billNo', data.billNo )
        .replace('totalBill', data.totalBill )
        .replace('chequeNo', data.chequeNo)
        .replace('amountPaid', data.amountPaid )
        .replace('modeOfPayment', data.modeOfPayment);

    let message = {
        from: 'shikharjoshi89@gmail.com',
        to: recipient,
        subject: "Payment Confirmation and Bill Details - Wings Classical Homeopathy",
        html: mail
    }
    transporter.sendMail(message);
}



const token = process.env.WHATSAPP_TOKEN; // from Meta
const phoneNumberId = 'YOUR_PHONE_NUMBER_ID';
const to = '919560718250';

async function sendTemplateWhatsapp() {
  try {
    const response = await axios.post(
      'https://graph.facebook.com/v22.0/774118059126468/messages',
      {
        messaging_product: 'whatsapp',
        to: '919560718250',
        type: 'template',
        template: {
          name: 'hello_world',
          language: { code: 'en_US' },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );


  } catch (error) {
    console.error( error.response?.data || error.message);
  }
}


async function sendWhatsAppMessage(data,phoneNumber) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v22.0/774118059126468/messages`,
      {
        messaging_product: 'whatsapp',
        to:`91${phoneNumber}`,
        type: 'text',
          text: {
              body: `
                Transaction Details : ${data.transactionDetails}
                Cheque Number: ${data.chequeNo}
                Payment Date: ${updateDate(data.date)}     
                Bill Number: ${data.billNo}
                Total Bill: ${data.totalBill}
                Amount Paid: ${data.amountPaid}
                Mode Of Payment: ${data.modeOfPayment}       
              ` }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
  }
}

export default sendWhatsAppMessage;
