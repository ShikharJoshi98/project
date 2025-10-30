import jsPDF from "jspdf";
import "jspdf-autotable";

const convertDateFormat = (dateString) => {
    const [year, month, date] = dateString.split('-');
    return `${parseInt(date)}-${parseInt(month)}-${parseInt(year)}`;
};

const disease = (str) => {
    const [name, disease, date] = str.split(' / ');
    return disease;
}

function numberToWords(num) {
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
        "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty",
        "sixty", "seventy", "eighty", "ninety"];

    if (num === 0) return "zero";

    function belowThousand(n) {
        let result = "";
        if (n >= 100) {
            result += ones[Math.floor(n / 100)] + " hundred";
            n %= 100;
            if (n > 0) result += " and ";
        }
        if (n >= 20) {
            result += tens[Math.floor(n / 10)];
            if (n % 10 > 0) result += "-" + ones[n % 10];
        } else if (n >= 10) {
            result += teens[n - 10];
        } else if (n > 0) {
            result += ones[n];
        }
        return result;
    }

    let result = "";
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;

    if (thousands > 0) {
        result += belowThousand(thousands) + " thousand";
        if (remainder > 0) {
            result += remainder < 100 ? " and " :" ";
        }
    }

    if (remainder > 0) {
        result += belowThousand(remainder);
    }

    return result;
}

export const generateBillInvoicePdf = (patient, billInvoice, title, today, data, billNumber) => {
    const doc = new jsPDF();
    patient.casePaperNo = String(patient?.casePaperNo).split('-');
    doc.addImage(billInvoice, 'JPEG', 0, 0, 210, 297);
    doc.setFontSize(12);
    doc.text(billNumber, 52, 67);
    doc.text(today, 162, 67);
    doc.setFontSize(16);
    doc.text(`${title} ${patient.fullname}`, 25, 134);
    doc.setFontSize(12);
    doc.text('From:', 105, 134);
    doc.setFontSize(13);
    doc.text(convertDateFormat(data.startDate), 107, 140);
    doc.setFontSize(12);
    doc.text('To:', 105, 147);
    doc.setFontSize(13);
    doc.text(convertDateFormat(data.endDate), 107, 154);
    doc.setFontSize(14);
    doc.text('Consultation', 134, 140);
    doc.setFontSize(14);
    doc.text('Medicine', 134, 154);
    doc.setFontSize(14);
    doc.text(`Rs ${data.consultingFee}`, 165, 140);
    doc.setFontSize(14);
    doc.text(`Rs ${data.medicineFee}`, 165, 154);
    doc.setFontSize(16);
    doc.text(disease(data.selectedDiagnosis), 35, 185);
    doc.setFontSize(14);
    data?.medicineName && doc.text(`Rx ${data.medicineName}`, 27, 215);
    doc.text(`Rs ${parseInt(data.medicineFee) + parseInt(data.consultingFee)}`, 165, 230);
    doc.setFontSize(17);
    doc.text(`${numberToWords(parseInt(data.medicineFee) + parseInt(data.consultingFee))} Only`, 75, 241).splitTextToSize(100);
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");
}

export const generatePreviousIssuedInvoice = (patient, billInvoice, title="", today, data) => {
    const doc = new jsPDF();
    patient.casePaperNo = String(patient?.casePaperNo).split('-');
    doc.addImage(billInvoice, 'JPEG', 0, 0, 210, 297);
    doc.setFontSize(12);
    doc.text(data?.billNumber, 52, 67);
    doc.text(today, 162, 67);
    doc.setFontSize(16);
    doc.text(`${title} ${patient.fullname}`, 25, 134);
    doc.setFontSize(12);
    doc.text('From:', 105, 134);
    doc.setFontSize(13);
    doc.text(data.startDate, 107, 140);
    doc.setFontSize(12);
    doc.text('To:', 105, 147);
    doc.setFontSize(13);
    doc.text(data.endDate, 107, 154);
    doc.setFontSize(14);
    doc.text('Consultation', 134, 140);
    doc.setFontSize(14);
    doc.text('Medicine', 134, 154);
    doc.setFontSize(14);
    doc.text(`Rs ${data.consultingFee}`, 165, 140);
    doc.setFontSize(14);
    doc.text(`Rs ${data.medicineFee}`, 165, 154);
    doc.setFontSize(16);
    doc.text(disease(data.selectedDiagnosis), 35, 185);
    doc.setFontSize(14);
    data?.medicineName && doc.text(`Rx ${data.medicineName}`, 27, 215);
    doc.text(`Rs ${parseInt(data.medicineFee) + parseInt(data.consultingFee)}`, 165, 230);
    const totalAmount = parseInt(data.medicineFee) + parseInt(data.consultingFee);
const amountWords = `${numberToWords(totalAmount)} Only`;
const splitText = doc.splitTextToSize(amountWords, 100);

doc.setFontSize(16);
doc.text(splitText, 75, 241);
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");
}

export const generateMedicalCertificate = (letterHead, details, patient, user) => {
  const doc = new jsPDF();
  doc.addImage(letterHead, 'JPEG', 0, 0, 210, 297);
  doc.setFontSize(15);
  doc.text(`Date : ${convertDateFormat(details.date)}`, 157, 70);

  const title = 'MEDICAL CERTIFICATE';
  doc.setFontSize(20);

  // Define position
  const x = 87;
  const y = 90;

  doc.text(title, x, y);

  const textWidth = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(x, y + 2, x + textWidth, y + 2);

  // Create the certificate text
  const paragraph = `This is to certify that Mr/Mrs/Miss/Master ${patient.fullname} age ${
    patient.age ? patient.age : '0'
  } years had suffered from ${
    details.diagnoseOne && details.diagnoseTwo && details.diagnoseThree
      ? `${details.diagnoseOne}, ${details.diagnoseTwo} and ${details.diagnoseThree}`
      : details.diagnoseOne && details.diagnoseTwo
      ? `${details.diagnoseOne} and ${details.diagnoseTwo}`
      : `${details.diagnoseOne}`
  } on ${convertDateFormat(details.date)}. So he/she was advised to take bed rest from ${convertDateFormat(
    details.restFrom
  )} to ${convertDateFormat(details.restTill)}. He/She is fit to resume his/her duty/school from ${convertDateFormat(
    details.resumeDate
  )} onwards accordingly.`;

  // Set up text rendering with line spacing
  doc.setFontSize(14);
  const lines = doc.splitTextToSize(paragraph, 135); // Wrap text
  const lineHeight = 10; // Line spacing in mm (adjust this value)
  let startY = 105; // Starting Y position

  lines.forEach((line, index) => {
    doc.text(line, 68, startY + index * lineHeight);
  });

  // Doctor info
  doc.setFontSize(15);
  doc.text(user?.fullname, 146, startY + lines.length * lineHeight + 30);
  doc.setFontSize(13);
  doc.text('M.D. (Homeopathy)', 148, startY + lines.length * lineHeight + 38);
  doc.text('Ph.D. (Homeopathy)', 148, startY + lines.length * lineHeight + 44);

  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};


export const generateTravellingCertificate = (letterHead, details, patient, user) => {
  const doc = new jsPDF();
  doc.addImage(letterHead, 'JPEG', 0, 0, 210, 297);
  doc.setFontSize(15);
  doc.text(`Date : ${convertDateFormat(details.date)}`, 157, 70);

  const title = 'CERTIFICATE';
  doc.setFontSize(20);

  // Define position
  const x = 87;
  const y = 90;

  doc.text(title, x, y);

  const textWidth = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(x, y + 2, x + textWidth, y + 2);

  // Create the main paragraph
  const paragraph = `This is to certify that Mr/Mrs/Miss/Master ${patient?.fullname} age ${
    patient?.age ? patient?.age : '0'
  } years is under Homeopathy treatment for ${
    details?.diagnoseOne && details?.diagnoseTwo && details?.diagnoseThree
      ? `${details?.diagnoseOne}, ${details?.diagnoseTwo} and ${details?.diagnoseThree}`
      : details?.diagnoseOne && details?.diagnoseTwo
      ? `${details?.diagnoseOne} and ${details?.diagnoseTwo}`
      : `${details?.diagnoseOne}`
    }. 
He/She has been given medicine for ${details?.duration} according to his/her disease concerned.`;


  // Set up text rendering with custom line spacing
  doc.setFontSize(14);
  const lines = doc.splitTextToSize(paragraph, 135); // Wrap text to fit width
  const lineHeight = 10; // Line spacing (in mm)
  let startY = 105; // Starting Y position

  // Draw each line with spacing
  lines.forEach((line, index) => {
    doc.text(line, 68, startY + index * lineHeight);
  });

  // Doctor info (position dynamically after text)
  const finalY = startY + lines.length * lineHeight + 30;

  doc.setFontSize(15);
  doc.text(user?.fullname, 146, finalY);
  doc.setFontSize(13);
  doc.text('M.D. (Homeopathy)', 148, finalY + 8);
  doc.text('Ph.D. (Homeopathy)', 148, finalY + 14);

  // Generate PDF
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};


export const generateFitnessCertificate = (letterHead, details, patient, user) => {
  const doc = new jsPDF();
  doc.addImage(letterHead, 'JPEG', 0, 0, 210, 297);
  doc.setFontSize(15);
  doc.text(`Date : ${convertDateFormat(details.date)}`, 157, 70);

  const title = 'FITNESS CERTIFICATE';
  doc.setFontSize(20);

  // Define position
  const x = 87;
  const y = 90;

  doc.text(title, x, y);

  const textWidth = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(x, y + 2, x + textWidth, y + 2);

  // Main paragraph
  const paragraph = `This is to certify that Mr/Mrs/Miss/Master ${patient.fullname} age ${
    patient.age ? patient.age : '0'
  } is physically and mentally fit to do his/her activity properly.`;

  // Apply custom line spacing
  doc.setFontSize(14);
  const lines = doc.splitTextToSize(paragraph, 135); // Wrap text
  const lineHeight = 10; // mm between lines
  let startY = 105; // Starting Y position

  lines.forEach((line, index) => {
    doc.text(line, 68, startY + index * lineHeight);
  });

  // Doctor info positioned after text
  const finalY = startY + lines.length * lineHeight + 60;

  doc.setFontSize(15);
  doc.text(user?.fullname, 146, finalY);
  doc.setFontSize(13);
  doc.text('M.D. (Homeopathy)', 148, finalY + 8);
  doc.text('Ph.D. (Homeopathy)', 148, finalY + 14);

  // Generate PDF
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};


export const generateUnfitCertificate = (letterHead, details, patient, user) => {
  const doc = new jsPDF();
  doc.addImage(letterHead, 'JPEG', 0, 0, 210, 297);
  doc.setFontSize(15);
  doc.text(`Date : ${convertDateFormat(details.date)}`, 157, 70);

  const title = 'UNFIT CERTIFICATE';
  doc.setFontSize(20);

  // Define position
  const x = 87;
  const y = 90;

  doc.text(title, x, y);

  const textWidth = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(x, y + 2, x + textWidth, y + 2);

  // Main paragraph
  const paragraph = `This is to certify that Mr/Mrs/Miss/Master ${patient.fullname} ${
    patient.age ? patient.age : '0'
  } is suffering from ${
    details.diagnoseOne && details.diagnoseTwo && details.diagnoseThree
      ? `${details.diagnoseOne}, ${details.diagnoseTwo} and ${details.diagnoseThree}`
      : details.diagnoseOne && details.diagnoseTwo
      ? `${details.diagnoseOne} and ${details.diagnoseTwo}`
      : `${details.diagnoseOne}`
  } on ${convertDateFormat(details.date)}. So He/She is advised to take rest accordingly.`;

  // Apply custom line spacing
  doc.setFontSize(14);
  const lines = doc.splitTextToSize(paragraph, 135); // Wrap text to fit within page
  const lineHeight = 10; // Space between lines (mm)
  let startY = 105; // Starting Y coordinate

  // Draw lines with custom spacing
  lines.forEach((line, index) => {
    doc.text(line, 68, startY + index * lineHeight);
  });

  // Doctor info (position dynamically after text)
  const finalY = startY + lines.length * lineHeight + 50;

  doc.setFontSize(15);
  doc.text(user?.fullname, 146, finalY);
  doc.setFontSize(13);
  doc.text('M.D. (Homeopathy)', 148, finalY + 8);
  doc.text('Ph.D. (Homeopathy)', 148, finalY + 14);

  // Generate and open PDF
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};
