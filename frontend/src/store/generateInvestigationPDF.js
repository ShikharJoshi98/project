import jsPDF from "jspdf";
import "jspdf-autotable";

const img = '/header_pdf.jpg';
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const formattedDate = `${dd}/${mm}/${yyyy}`;

export const investigationPdf = (map) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Date: ' + formattedDate, 160, 65);
  doc.addImage(img, "JPEG", 0, 0, 210, 55);

  let y = 75;
  map.forEach((values, key) => {
    // Add heading
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Dark blue for heading
    doc.text(key, 10, y);
    y += 8;

    // Add each test item
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Reset to black
    values.forEach((test, idx) => {
      doc.text(`- ${test}`, 15, y);
      y += 7;

      // Add new page if close to bottom
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    y += 10; // Space after each group
  });
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
