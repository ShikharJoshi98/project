export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #4a9acc; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4a9acc; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Wings Classical Homeopathy</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

// export const VENDOR_BILL_TEMPLATE = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Payment Confirmation and Bill Details - Wings Classical Homeopathy</title>
// </head>
// <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//   <div style="background-color: #4a9acc; padding: 20px; text-align: center;">
//     <h1 style="color: white; margin: 0;">Payment Details</h1>
//   </div>
//   <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
//     <p>Transaction Details : transactionDetails</p>
//     <p>Cheque no. : chequeNo</p>
//     <p>Payment Date : date</p>
//     <p>Bill Number : billNo</p>
//     <p>Total Bill : totalBill</p>
//     <p>Amount Paid : amountPaid</p>
//     <p>Mode of Payment : modeOfPayment</p>
//   </div>
//   <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
//     <p>This is an automated message, please do not reply to this email.</p>
//   </div>
// </body>
// </html>
// `
export const VENDOR_BILL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation and Bill - Wings Classical Homeopathy</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 650px; margin: 0 auto; background-color: #f3f6fa; padding: 30px;">
  <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #4a9acc; color: white; text-align: center; padding: 25px;">
      <h1 style="margin: 0; font-size: 24px;">Wings Classical Homeopathy</h1>
      <p style="margin: 5px 0 0;">Payment Details</p>
    </div>

    <!-- Bill Body -->
    <div style="padding: 25px;">
      <p style="margin:0 0 18px;font-size:14px;color:#333;">
          <strong>Doctor:</strong> Dr. Santosh K Yadav
        </p>
        <p style="margin:0 0 18px;font-size:14px;color:#333;">
          <strong>Phone Number:</strong> contact
        </p>
        <p style="margin:0 0 18px;font-size:14px;color:#333;">
          <strong>Branch:</strong> clinicBranch
        </p>
      <p style="font-size: 15px; margin-bottom: 20px;">Below are bill payment details:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f0f6fc;">
            <th style="text-align: left; padding: 10px; border-bottom: 2px solid #e0e0e0;">Description</th>
            <th style="text-align: right; padding: 10px; border-bottom: 2px solid #e0e0e0;">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Transaction Details</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">transactionDetails</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Cheque No.</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">chequeNo</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Payment Date</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">date</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Bill Number</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">billNo</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Total Bill</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">totalBill</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Amount Paid</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">amountPaid</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Mode of Payment</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">modeOfPayment</td>
          </tr>
        </tbody>
      </table>

    </div>

    <!-- Footer -->
    <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #888;">
      <p style="margin: 0;">This is an automated message, please do not reply.</p>
      <p style="margin: 5px 0 0;">© 2025 Wings Classical Homeopathy</p>
    </div>

  </div>
</body>
</html>
`

export const COURIER_PATIENT_BILL = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation and Bill - Wings Classical Homeopathy</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 650px; margin: 0 auto; background-color: #f3f6fa; padding: 30px;">
  <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #4a9acc; color: white; text-align: center; padding: 25px;">
      <h1 style="margin: 0; font-size: 24px;">Wings Classical Homeopathy</h1>
      <p style="margin: 5px 0 0;">Appointment & Bill Details</p>
    </div>

    <!-- Bill Body -->
    <div style="padding: 25px;">
      <p style="font-size: 15px;">Dear ${data.patientName},</p>

      <p style="font-size: 15px; margin-bottom: 20px;">
        Thank you for connecting with Wings Classical Homeopathy on ${data.appointmentDate}.
      </p>

      <p style="font-size: 15px; margin-bottom: 20px;">
        Below are your appointment details:
      </p>

      <p style="font-size: 15px; margin-left: 20px; margin-bottom: 10px;">
        <strong>Next Appointment Date:</strong> ${data.nextFollowUp}<br>
        <strong>Doctor:</strong> ${data.doctorName}<br>
        <strong>Branch:</strong> ${data.branch}
      </p>

      <p style="font-size: 15px; margin-bottom: 20px;">
        Below are your billing details:
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f0f6fc;">
            <th style="text-align: left; padding: 10px; border-bottom: 2px solid #e0e0e0;">Description</th>
            <th style="text-align: right; padding: 10px; border-bottom: 2px solid #e0e0e0;">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>

          ${data.onlineConsultationCharge > 0 ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Online Consultation Charge</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${data.onlineConsultationCharge}</td>
          </tr>` : ``}

          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Medicine Charge</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${data.medicineCharge}</td>
          </tr>

          ${data.otherMedicineCharge > 0 ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Other Medicine</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${data.otherMedicineCharge}</td>
          </tr>` : ``}

          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Courier Amount</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${data.courierAmount}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr style="background-color: #e9f5ff; font-weight: bold;">
            <td style="padding: 12px; text-align: left; font-size: 16px;">Total Bill</td>
            <td style="padding: 12px; text-align: right; font-size: 16px;">${data.totalBill}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #888;">
      <p style="margin: 0;">This is an automated message, please do not reply.</p>
      <p style="margin: 5px 0 0;">© 2025 Wings Classical Homeopathy</p>
    </div>

  </div>
</body>
</html>
`;

export const APPOINTMENT_PATIENT_BILL = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation and Bill - Wings Classical Homeopathy</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 650px; margin: 0 auto; background-color: #f3f6fa; padding: 30px;">
  <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #4a9acc; color: white; text-align: center; padding: 25px;">
      <h1 style="margin: 0; font-size: 24px;">Wings Classical Homeopathy</h1>
      <p style="margin: 5px 0 0;">Appointment & Bill Details</p>
    </div>

    <!-- Bill Body -->
    <div style="padding: 25px;">
      <p style="font-size: 15px;">Dear ${data.patientName},</p>

      <p style="font-size: 15px; margin-bottom: 20px;">
        Thank you for connecting with Wings Classical Homeopathy on ${data.appointmentDate}.
      </p>

      <p style="font-size: 15px; margin-bottom: 20px;">
        Below are your appointment details:
      </p>

      <p style="font-size: 15px; margin-left: 20px; margin-bottom: 10px;">
        <strong>Appointment Date:</strong> ${data.appointmentDate}<br>
        <strong>Next Appointment Date:</strong> ${data.nextFollowUp}<br>
        <strong>Doctor:</strong> ${data.doctorName}<br>
        <strong>Branch:</strong> ${data.branch}
      </p>

      <p style="font-size: 15px; margin-bottom: 20px;">
        Below are your billing details:
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f0f6fc;">
            <th style="text-align: left; padding: 10px; border-bottom: 2px solid #e0e0e0;">Description</th>
            <th style="text-align: right; padding: 10px; border-bottom: 2px solid #e0e0e0;">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${data.newCaseCharge > 0 ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">New Case Charge</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${data.newCaseCharge}</td>
          </tr>` : ``}

          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Medicine Charge</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${data.medicineCharge}</td>
          </tr>
${data.otherMedicineCharge > 0 ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">New Case Charge</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${data.otherMedicineCharge}</td>
          </tr>` : ``}
      
        </tbody>
        <tfoot>
          <tr style="background-color: #e9f5ff; font-weight: bold;">
            <td style="padding: 12px; text-align: left; font-size: 16px;">Total Bill</td>
            <td style="padding: 12px; text-align: right; font-size: 16px;">${data.totalBill}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #888;">
      <p style="margin: 0;">This is an automated message, please do not reply.</p>
      <p style="margin: 5px 0 0;">© 2025 Wings Classical Homeopathy</p>
    </div>

  </div>
</body>
</html>
`;

export const VENDOR_ORDER_DETAILS = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Order Confirmation</title>
</head>
<body style="margin:0;padding:20px;background:#f4f6f8;font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border-collapse:collapse;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <tr>
      <td style="background:#0b75c9;padding:20px 28px;text-align:left;color:#ffffff;">
        <h1 style="margin:0;font-size:20px;font-weight:600;">Order</h1>
        <p style="margin:6px 0 0;font-size:13px;opacity:0.92;">Below are the details.</p>
      </td>
    </tr>

    <tr>
      <td style="padding:20px 28px;">
        <!-- Vendor line (separate text as requested) -->
        <p style="margin:0 0 18px;font-size:14px;color:#333;">
          <strong>Doctor:</strong> Dr. Santosh K Yadav
        </p>
        <p style="margin:0 0 18px;font-size:14px;color:#333;">
          <strong>Phone Number:</strong> {{doctorContact}}
        </p>
        <p style="margin:0 0 18px;font-size:14px;color:#333;">
          <strong>Branch:</strong> {{branch}}
        </p>

        <!-- Table -->
        <table role="presentation" width="100%" style="border-collapse:collapse;">
          <thead>
            <tr>
              <th style="text-align:left;padding:10px 8px;background:#f1f7fb;border-bottom:1px solid #e6eef9;font-size:13px;color:#0b75c9;">Item Name</th>
              <th style="text-align:center;padding:10px 8px;background:#f1f7fb;border-bottom:1px solid #e6eef9;font-size:13px;color:#0b75c9;">Ordered Quantity</th>
              <th style="text-align:center;padding:10px 8px;background:#f1f7fb;border-bottom:1px solid #e6eef9;font-size:13px;color:#0b75c9;">Order Date</th>
            </tr>
          </thead>
          <tbody>
            <!-- Repeat this TR for each item (replace placeholders) -->
            <tr>
              <td style="padding:10px 8px;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">{{itemName}}</td>
              <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">{{quantity}}</td>
              <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">{{orderDate}}</td>
            </tr>
            <!-- /end item row -->
          </tbody>
        </table>
    </tr>

    <tr>
      <td style="background:#fafbfd;padding:12px 28px;text-align:center;color:#888;font-size:12px;">
        This is an automated message — please do not reply.
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const MEDICAL_VENDOR_ORDER_DETAILS = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Order Confirmation</title>
</head>
<body style="margin:0;padding:20px;background:#f4f6f8;font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border-collapse:collapse;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <tr>
      <td style="background:#0b75c9;padding:20px 28px;text-align:left;color:#ffffff;">
        <h1 style="margin:0;font-size:20px;font-weight:600;">Order</h1>
        <p style="margin:6px 0 0;font-size:13px;opacity:0.92;">Below are the details.</p>
      </td>
    </tr>

    <tr>
      <td style="padding:20px 28px;">
        <!-- Vendor line (separate text as requested) -->
        <p style="margin:0 0 18px;font-size:14px;color:#333;">
          <strong>Doctor:</strong> Dr. Santosh K Yadav
        </p>
        <p style="margin:0 0 18px;font-size:14px;color:#333;">
          <strong>Phone Number:</strong> {{contact}}
        </p>
        <p style="margin:0 0 18px;font-size:14px;color:#333;">
          <strong>Branch:</strong> {{branch}}
        </p>

        <!-- Table -->
        <table role="presentation" width="100%" style="border-collapse:collapse;">
          <thead>
            <tr>
              <th style="text-align:left;padding:10px 8px;background:#f1f7fb;border-bottom:1px solid #e6eef9;font-size:13px;color:#0b75c9;">Medicine Name</th>
              <th style="text-align:left;padding:10px 8px;background:#f1f7fb;border-bottom:1px solid #e6eef9;font-size:13px;color:#0b75c9;">Pack</th>
              <th style="text-align:center;padding:10px 8px;background:#f1f7fb;border-bottom:1px solid #e6eef9;font-size:13px;color:#0b75c9;">Ordered Quantity</th>
              <th style="text-align:center;padding:10px 8px;background:#f1f7fb;border-bottom:1px solid #e6eef9;font-size:13px;color:#0b75c9;">Potency</th>
              <th style="text-align:center;padding:10px 8px;background:#f1f7fb;border-bottom:1px solid #e6eef9;font-size:13px;color:#0b75c9;">Order Date</th>
            </tr>
          </thead>
          <tbody>
            <!-- Repeat this TR for each item (replace placeholders) -->
            <tr>
              <td style="padding:10px 8px;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">{{medicineName}}</td>
              <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">{{medidinePack}}</td>
              <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">{{quantity}}</td>
              <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">{{potency}}</td>
              <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #eef3f8;font-size:14px;color:#333;">{{orderDate}}</td>
            </tr>
            <!-- /end item row -->
          </tbody>
        </table>
    </tr>

    <tr>
      <td style="background:#fafbfd;padding:12px 28px;text-align:center;color:#888;font-size:12px;">
        This is an automated message — please do not reply.
      </td>
    </tr>
  </table>
</body>
</html>`



