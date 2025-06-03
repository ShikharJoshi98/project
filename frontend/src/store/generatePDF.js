import jsPDF from "jspdf";
import "jspdf-autotable";

const img = '/report.png';
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const formattedDate = `${dd}/${mm}/${yyyy}`;

export const generateTablePDF = (patient) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Date: ' + formattedDate, 160, 65);
  doc.addImage(img, "JPEG", 0, 0, 210, 55);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("New Case - Final Report", 60, 76);

  let y = 90;
  const lineHeight = 12;
  const colWidth = 65;
  const labelPadding = 2;

  const drawRow = (label, value, colIndex) => {
    const x = 20 + colIndex * colWidth;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${label} :`, x, y);
    const labelWidth = doc.getTextWidth(`${label} :`);
    doc.setFont("helvetica", "normal");
    doc.text(`${value || "-"}`, x + labelWidth + labelPadding, y);
  };

  // Patient Info
  drawRow("Age", patient?.age, 0);
  drawRow("Gender", patient?.gender, 1);
  drawRow("Weight", "67 Kgs", 2);
  y += lineHeight;

  drawRow("Phone", patient?.phone, 0);
  drawRow("Email", patient?.email, 1);
  drawRow("Address", patient?.address, 2);
  y += lineHeight;

  drawRow("Qualification", patient?.qualification, 0);
  drawRow("Occupation", patient?.occupation, 1);
  drawRow("Marital Status", patient?.maritalStatus, 2);
  y += lineHeight;

  drawRow("Referred By", patient?.referredBy, 0);
  drawRow("Dietary Preference", patient?.dietaryPreference, 1);
  y += lineHeight + 10;

  // Prepare Health Assessment Data
  const tableBody = [];
  patient?.healthRecords?.forEach((record, index) => {
    tableBody.push([
      index + 1,
      record?.date || "-",
      record?.bloodPressure ? `${record.bloodPressure} mmHg` : "-",
      record?.weight ? `${record.weight} Kg` : "-"
    ]);
  });

  // Add Table to PDF
  doc.autoTable({
    startY: y,
    head: [['SNo.', 'Assessment Date', 'Blood Pressure', 'Weight']],
    body: tableBody,
    theme: 'grid',
    headStyles: {
      fillColor: [242, 242, 242], 
      textColor: 0,
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 10,
      halign: 'center',
    },
  });

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
