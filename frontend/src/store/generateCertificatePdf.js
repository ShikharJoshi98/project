import jsPDF from "jspdf";
import "jspdf-autotable";
import { recStore } from "./RecStore";
import { useEffect } from "react";

const img = '/bill_page-0001.jpg';
const certificate = '/certificate.jpg';

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

export const generateBillInvoicePdf = (patient, today, data) => {
    const doc = new jsPDF();
    patient.casePaperNo = String(patient?.casePaperNo).split('-');
    doc.addImage(img, 'JPEG', 0, 0, 210, 297);
    doc.setFontSize(12);
    doc.text('D-' + patient.casePaperNo[1], 52, 67);
    doc.text(today, 162, 67);
    doc.setFontSize(22);
    doc.text(patient.fullname, 25, 134);
    doc.setFontSize(12);
    doc.text('From:', 105, 134);
    doc.setFontSize(15);
    doc.text(convertDateFormat(data.startDate), 107, 140);
    doc.setFontSize(12);
    doc.text('To:', 105, 147);
    doc.setFontSize(15);
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
    doc.text(`Rx ${data.medicineName}`, 27, 215);
    doc.text(`Rs ${parseInt(data.medicineFee) + parseInt(data.consultingFee)}`, 165, 230);
    doc.setFontSize(17);
    doc.text(`${numberToWords(parseInt(data.medicineFee) + parseInt(data.consultingFee))} Only`, 75, 241);
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");
}

export const generateMedicalCertificate = (details, patient, user) => {
    const doc = new jsPDF();
    doc.addImage(certificate, 'JPEG', 0, 0, 210, 297);
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

    doc.setFontSize(14);
    doc.text(` This is to certify that Mr/Mrs/Miss/Master ${patient.fullname} age ${patient.age ? patient.age : '0'} years had suffered from ${(details.diagnoseOne && details.diagnoseTwo && details.diagnoseThree) ? `${details.diagnoseOne},${details.diagnoseTwo} and ${details.diagnoseThree}` : (details.diagnoseOne && details.diagnoseTwo) ? `${details.diagnoseOne} and ${details.diagnoseTwo}` : `${details.diagnoseOne}`} on ${convertDateFormat(details.date)}. So he/she was advised to take bed rest from ${convertDateFormat(details.restFrom)} to ${convertDateFormat(details.restTill)} . He/She  is fit  to resume his/her  duty/school  from ${convertDateFormat(details.resumeDate)} onwards accordingly.`, 68, 105, {
        maxWidth: 120,
    });

    doc.setFontSize(15);
    doc.text(user?.fullname, 146, 185)
    doc.setFontSize(13);
    doc.text(' M.D. (Homeopathy)', 148, 193)
    doc.setFontSize(13);
    doc.text(' Ph.D.(Homeopathy)', 148, 199)

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");

}

export const generateTravellingCertificate = (details, patient, user) => {
    const doc = new jsPDF();
    doc.addImage(certificate, 'JPEG', 0, 0, 210, 297);
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

    doc.setFontSize(14);
    doc.text(` This is to certify that Mr/Mrs/Miss/Master ${patient.fullname}
 age ${patient.age ? patient.age : '0'} years  is  under  Homeopathy  treatment  for ${(details.diagnoseOne && details.diagnoseTwo && details.diagnoseThree) ? `${details.diagnoseOne},${details.diagnoseTwo} and ${details.diagnoseThree}` : (details.diagnoseOne && details.diagnoseTwo) ? `${details.diagnoseOne} and ${details.diagnoseTwo}` : `${details.diagnoseOne}`}.He/She had been given medicine for ${details.duration} months/days according to his/her disease concerned.`, 68, 105, {
        maxWidth: 120,
    });

    doc.setFontSize(15);
    doc.text(user?.fullname, 146, 185)
    doc.setFontSize(13);
    doc.text(' M.D. (Homeopathy)', 148, 193)
    doc.setFontSize(13);
    doc.text(' Ph.D.(Homeopathy)', 148, 199)

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");
}

export const generateFitnessCertificate = (details, patient, user) => {
    const doc = new jsPDF();
    doc.addImage(certificate, 'JPEG', 0, 0, 210, 297);
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

    doc.setFontSize(14);
    doc.text(`This is to certify that Mr/Mrs/Miss/Master ${patient.fullname} is physically and mentally fit to do his/her activity properly.`, 68, 105, {
        maxWidth: 120,
    });

    doc.setFontSize(15);
    doc.text(user?.fullname, 146, 185)
    doc.setFontSize(13);
    doc.text(' M.D. (Homeopathy)', 148, 193)
    doc.setFontSize(13);
    doc.text(' Ph.D.(Homeopathy)', 148, 199)

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");
}

export const generateUnfitCertificate = (details, patient, user) => {
    const doc = new jsPDF();
    doc.addImage(certificate, 'JPEG', 0, 0, 210, 297);
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

    doc.setFontSize(14);
    doc.text(` This is to certify that Mr/Mrs/Miss/Master ${patient.fullname}
  is suffering from ${(details.diagnoseOne && details.diagnoseTwo && details.diagnoseThree) ? `${details.diagnoseOne},${details.diagnoseTwo} and ${details.diagnoseThree}` : (details.diagnoseOne && details.diagnoseTwo) ? `${details.diagnoseOne} and ${details.diagnoseTwo}` : `${details.diagnoseOne}`} on ${convertDateFormat(details.date)}. He/She is advised to take rest accordingly.`, 68, 105, {
        maxWidth: 120,
    });

    doc.setFontSize(15);
    doc.text(user?.fullname, 146, 185)
    doc.setFontSize(13);
    doc.text(' M.D. (Homeopathy)', 148, 193)
    doc.setFontSize(13);
    doc.text(' Ph.D.(Homeopathy)', 148, 199)

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");
}