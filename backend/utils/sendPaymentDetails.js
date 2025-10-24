import nodemailer from 'nodemailer';
import { APPOINTMENT_PATIENT_BILL, COURIER_PATIENT_BILL, MEDICAL_VENDOR_ORDER_DETAILS, VENDOR_BILL_TEMPLATE, VENDOR_ORDER_DETAILS } from './emailTemplate.js';
import dotenv from "dotenv";
import axios from 'axios';
import { updateDate } from './todayDate.js';

dotenv.config();

export const sendPaymentEmail = async (email, data,branch,phone) => {
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
    replace('transactionDetails', data.transactionDetails)
    .replace('chequeNo', data.chequeNo)
    .replace('date', updateDate(data.date))
    .replace('billNo', data.bills.join(', '))
    .replace('totalBill', data.totalBill)
    .replace('chequeNo', data.chequeNo)
    .replace('amountPaid', data.amountPaid)
    .replace('modeOfPayment', data.modeOfPayment)
    .replace('contact', phone)
    .replace('clinicBranch', branch);

  let message = {
    from: 'shikharjoshi89@gmail.com',
    to: recipient,
    subject: "Payment Confirmation and Bill Details - Wings Classical Homeopathy",
    html: mail
  }
  transporter.sendMail(message);
}

const token = process.env.WHATSAPP_TOKEN;
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
    console.error(error.response?.data || error.message);
  }
}


async function sendWhatsAppMessage(data, phoneNumber) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v22.0/774118059126468/messages`,
      {
        messaging_product: 'whatsapp',
        to: `91${phoneNumber}`,
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

export const sendCourierPatientEmail = async (email, data) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shikharjoshi89@gmail.com',
      pass: 'cbok bmms smck rakl'
    }
  });
 
  const mail = COURIER_PATIENT_BILL({
  patientName: data.appointment.PatientCase.fullname,
  appointmentDate: data.appointment.date,
  nextFollowUp: data.nextFollowUp,
  doctorName: data.appointment.Doctor.fullname,
  branch: data.appointment.branch,
  onlineConsultationCharge: data.onlineConsultationCharge,
  medicineCharge: data.medicineCharge,
  otherMedicineCharge: data.otherMedicineCharge,
  courierAmount: data.courierAmount,
  totalBill: data.totalBill
});


  const message = {
    from: 'shikharjoshi89@gmail.com',
    to: email,
    subject: 'Appointment and Bill Details - Wings Classical Homeopathy',
    html: mail
  };

  await transporter.sendMail(message);
};

export const sendAppointmentPatientEmail = async (email, data, appointment, doctor) => {
  try {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shikharjoshi89@gmail.com',
      pass: 'cbok bmms smck rakl'
    }
  });

    const mail = APPOINTMENT_PATIENT_BILL({
      patientName: appointment.PatientCase.fullname,
      newCaseCharge: data.newCaseCharge,
      medicineCharge: data.medicineCharge,
      otherMedicineCharge: data.otherMedicineCharge,
      totalBill: data.totalBill,
      nextFollowUp: data.nextFollowUp,
      appointmentDate: appointment.date,
      doctorName: doctor,
      branch: appointment.branch
    });

  const message = {
    from: 'shikharjoshi89@gmail.com',
    to: email,
    subject: 'Appointment and Bill Details - Wings Classical Homeopathy',
    html: mail
  };

  await transporter.sendMail(message);
  } catch (error) {
    console.log(error.message);
  }
  
};

export const sendVendorOrderEmail = async (vendorList,phone) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shikharjoshi89@gmail.com",
        pass: "cbok bmms smck rakl", 
      },
    });

    // Loop through each vendor’s orders
    for (const vendorData of vendorList) {
      const { vendor, branch, orders } = vendorData;

      // Generate table rows for all orders
      const tableRows = orders
        .map(
          (order) => `
          <tr>
            <td style="padding:10px 8px;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">${order.item}</td>
            <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">${order.quantity}</td>
            <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">${order.orderDate}</td>
          </tr>`
        )
        .join("");

      // Fill the HTML template
      const mailHtml = VENDOR_ORDER_DETAILS
        .replace("{{branch}}", branch || "N/A")
        .replace("{{doctorContact}}", phone || "N/A")
        .replace(
          /<tr>\s*<td style="padding:10px 8px;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">{{itemName}}<\/td>[\s\S]*?<\/tr>/,
          tableRows
        );

      const message = {
        from: "shikharjoshi89@gmail.com",
        to: vendor,
        subject: `Order Details - Wings Classical Homeopathy`,
        html: mailHtml,
      };

      await transporter.sendMail(message);
    }
  } catch (error) {
    console.error("❌ Error sending vendor order emails:", error.message);
  }
};

export const sendMedicalVendorOrderEmail = async (vendorList,phone) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shikharjoshi89@gmail.com",
        pass: "cbok bmms smck rakl",
      },
    });

    for (const vendorData of vendorList) {
      const { vendor, branch, orders } = vendorData;

      // Generate table rows for all orders
      const tableRows = orders
        .map(
          (order) => `
          <tr>
            <td style="padding:10px 8px;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">${order.medicine}</td>
            <td style="padding:10px 8px;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">${order.pack}</td>
            <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">${order.quantity}</td>
            <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">${order.potency}</td>
            <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">${order.orderDate}</td>
          </tr>`
        )
        .join("");

      // Fill the HTML template
      const mailHtml = MEDICAL_VENDOR_ORDER_DETAILS
        .replace("{{branch}}", branch || "N/A")
        .replace("{{contact}}", phone || "N/A")
        .replace(
          /<tr>\s*<td style="padding:10px 8px;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">{{medicineName}}<\/td>[\s\S]*?<\/tr>/,
          tableRows
        );

      const message = {
        from: "shikharjoshi89@gmail.com",
        to: vendor,
        subject: `Order Details - Wings Classical Homeopathy`,
        html: mailHtml,
      };

      await transporter.sendMail(message);
    }
  } catch (error) {
    console.error("❌ Error sending vendor order emails:", error.message);
  }
};


