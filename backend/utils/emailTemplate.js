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

export const VENDOR_BILL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation and Bill Details - Wings Classical Homeopathy</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #4a9acc; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Payment Details</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Transaction Details : transactionDetails</p>
    <p>Cheque no. : chequeNo</p>
    <p>Payment Date : date</p>
    <p>Bill Number : billNo</p>
    <p>Total Bill : totalBill</p>
    <p>Amount Paid : amountPaid</p>
    <p>Mode of Payment : modeOfPayment</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`
export const COURIER_PATIENT_BILL = (
  prescriptions = [],
  otherPrescriptions = [],
  totalBill = 0,
  appointmentDate = null,
  appointmentType = ""
) => {
  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-GB");

  const mainRows = prescriptions
    .map(
      (pres, index) => `
        <tr style="background-color:#e6f2ff;text-align:center;">
          <td style="padding:8px;">${pres.medicine || "-"}</td>
          <td style="padding:8px;">${pres.potency || "-"}</td>
          <td style="padding:8px;">${pres.prescription_date || "-"}</td>
          <td style="padding:8px;">${pres.start_date || "-"}</td>
          <td style="padding:8px;">${pres.dose || "-"}</td>
          <td style="padding:8px;">${pres.note || "-"}</td>
          <td style="padding:8px;">${
            pres.duration === "60"
              ? "2 Months"
              : pres.duration === "90"
              ? "3 Months"
              : `${pres.duration || "-"} Days`
          }</td>
          <td style="padding:8px;">${pres.next_visit || "-"}</td>
        </tr>`
    )
    .join("");

  const otherRows =
    otherPrescriptions.length > 0
      ? otherPrescriptions
          .map(
            (pres, index) => `
              <tr style="background-color:#f0f8ff;text-align:center;">
                <td style="padding:8px;">${index + 1}</td>
                <td style="padding:8px;">${pres.medicineName || "-"}</td>
              </tr>`
          )
          .join("")
      : `<tr><td colspan="3" style="padding:8px;text-align:center;">No other prescriptions</td></tr>`;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment & Bill Details - Wings Classical Homeopathy</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #4a9acc; padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Appointment & Bill Details</h1>
    </div>

    <p style="font-size:16px;">Dear Patient,</p>
    <p>
      Thank you for your <strong>${appointmentType || "appointment"}</strong> 
      on <strong>${appointmentDate || formattedToday}</strong>.
      Below are your prescription and bill details:
    </p>

    <h3 style="color:#337ab7;">Prescription Today</h3>
    <table style="width:100%; border-collapse: collapse; border: 1px solid #ccc; margin-top:10px;">
      <thead style="background-color: #337ab7; color: white;">
        <tr>
          <th style="padding:8px;">Medicine</th>
          <th style="padding:8px;">Potency</th>
          <th style="padding:8px;">Date</th>
          <th style="padding:8px;">Start Date</th>
          <th style="padding:8px;">Dose</th>
          <th style="padding:8px;">Note</th>
          <th style="padding:8px;">Duration</th>
          <th style="padding:8px;">Next Visit</th>
        </tr>
      </thead>
      <tbody>${mainRows}</tbody>
    </table>

    ${
      otherPrescriptions.length > 0
        ? `
    <h3 style="color:#337ab7; margin-top:30px;">Other Prescriptions</h3>
    <table style="width:100%; border-collapse: collapse; border: 1px solid #ccc; margin-top:10px;">
      <thead style="background-color: #337ab7; color: white;">
        <tr>
          <th style="padding:8px;">Serial No.</th>
          <th style="padding:8px;">Any Other Medicine</th>
        </tr>
      </thead>
      <tbody>${otherRows}</tbody>
    </table>
    `
        : ""
    }

    <h3 style="text-align:right; margin-top:20px;">Total Bill: ₹${totalBill}</h3>

    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </body>
  </html>`;
};

