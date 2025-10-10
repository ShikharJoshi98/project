import jsPDF from "jspdf";
import "jspdf-autotable";

const img = '/header_pdf.jpg';

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const formattedDate = `${dd}/${mm}/${yyyy}`;

export const investigationPdf = (patient, obj, user) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Date: ' + formattedDate, 160, 65);
  doc.addImage(img, "JPEG", 0, 0, 210, 55);

  let y = 75;
  const lineHeight = 22;
  const colWidth = 65;
  const labelPadding = 2;
  const sections = [
    { title: 'Investigation Advised', data: obj?.investigationAdvised },
    { title: 'Ultra Sonography', data: obj?.ultra_sonography },
    { title: 'Doppler Studies', data: obj?.dopplerStudies },
    { title: 'Obstetrics', data: obj?.obsetrics },
    { title: 'Sonography', data: obj?.sonography },
    { title: 'CT Scan', data: obj?.ctScan },
    { title: 'MRI Scan', data: obj?.mriScan },
  ];
  const drawRow = (label, value, colIndex) => {
    const x = 20 + colIndex * colWidth;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${label} :`, x, y);
    const labelWidth = doc.getTextWidth(`${label} :`);
    doc.setFont("helvetica", "normal");
    doc.text(`${value || "-"}`, x + labelWidth + labelPadding, y);
  };
  y += 10;
  drawRow("Name", patient?.fullname, 0);
  drawRow("Age", patient?.age, 1);
  drawRow("Gender", patient?.gender, 2);
  y += lineHeight;
  sections.forEach(section => {
    if (Array.isArray(section?.data) && section?.data.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(section.title, 20, y);
      y += 8;

      doc.setFontSize(12);
      section?.data.forEach(test => {
        doc.text(`- ${test}`, 25, y);
        y += 7;
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });

      y += 10;
    }
  });
  y += 40;
  doc.setFontSize(15);
  doc.text(user?.fullname, 146, y);
  doc.setFontSize(13);
  doc.text('M.D. (Homeopathy)', 148, y + 8);
  doc.text('Ph.D. (Homeopathy)', 148, y + 14);

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
