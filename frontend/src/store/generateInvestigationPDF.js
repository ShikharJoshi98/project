import jsPDF from "jspdf";
import "jspdf-autotable";

const img = '/header_pdf.jpg';

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const formattedDate = `${dd}/${mm}/${yyyy}`;

export const investigationPdf = (obj) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Date: ' + formattedDate, 160, 65);
  doc.addImage(img, "JPEG", 0, 0, 210, 55);
  console.log(obj)
  let y = 75;

  const sections = [
    { title: 'Investigation Advised', data: obj?.investigationAdvised },
    { title: 'Ultra Sonography', data: obj?.ultra_sonography },
    { title: 'Doppler Studies', data: obj?.dopplerStudies },
    { title: 'Obstetrics', data: obj?.obsetrics },
    { title: 'Sonography', data: obj?.sonography },
    { title: 'CT Scan', data: obj?.ctScan },
    { title: 'MRI Scan', data: obj?.mriScan },
  ];

  sections.forEach(section => {
    if (Array.isArray(section?.data) && section?.data.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(section.title, 10, y);
      y += 8;

      doc.setFontSize(12);
      section?.data.forEach(test => {
        doc.text(`- ${test}`, 15, y);
        y += 7;
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });

      y += 10;
    }
  });

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
