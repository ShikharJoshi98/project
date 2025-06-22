import jsPDF from "jspdf";
import "jspdf-autotable";

const img = '/report.png';
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const formattedDate = `${dd}/${mm}/${yyyy}`;

export const investigationPdf = (allInvestigationData = []) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Date: ' + formattedDate, 160, 65);
  doc.addImage(img, "JPEG", 0, 0, 210, 55);

  let y = 75;

  allInvestigationData.forEach(section => {
    const testList = section.tests?.investigationInfo || [];

    // ❌ Skip section if no tests
    if (!testList || testList.length === 0) return;

    if (y + 20 > doc.internal.pageSize.height) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(section.title, 14, y);
    y += 6;

    testList.forEach(test => {
      if (y + 10 > doc.internal.pageSize.height) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`• ${test}`, 18, y);
      y += 6;
    });

    y += 8;
  });

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
