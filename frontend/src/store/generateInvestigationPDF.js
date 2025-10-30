import jsPDF from "jspdf";
import "jspdf-autotable";

const img = '/header_pdf.jpg';

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const formattedDate = `${dd}/${mm}/${yyyy}`;

export const investigationPdf = (letterhead, patient, obj, user) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageHeight = doc.internal.pageSize.height;
  const formattedDate = new Date().toLocaleDateString();

  // Add the letterhead background image
  doc.addImage(letterhead, "JPEG", 0, 0, 210, 297);

  doc.setFontSize(14);
  doc.text("Date: " + formattedDate, 160, 65);

  let y = 75;
  const lineHeight = 22;
  const colWidth = 48;
  const labelPadding = 2;

  // Footer positioning constants
  const footerHeight = 100; // space needed for doctor info
  const bottomMargin = 15; // space before triggering new page

  // Function to draw doctor info (footer)
  const drawDoctorInfo = (yPosition) => {
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text(user?.fullname || "", 146, yPosition);
    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.text("M.D. (Homeopathy)", 148, yPosition + 8);
    doc.text("Ph.D. (Homeopathy)", 148, yPosition + 14);
  };

  // Function to add a new page
  const addNewPage = () => {
    doc.addPage();
    doc.addImage(letterhead, "JPEG", 0, 0, 210, 297);
    doc.setFontSize(14);
    doc.text("Date: " + formattedDate, 160, 65);
     // doctor info at the top of new page
    y = 75;
  };

  // Define test sections
  const sections = [
    { title: "Blood Test", data: obj?.investigationAdvised },
    { title: "X-RAY", data: obj?.xray },
    { title: "Ultra Sonography", data: obj?.ultra_sonography },
    { title: "Doppler Studies", data: obj?.dopplerStudies },
    { title: "Obstetrics (Pregnancy) - Sonography", data: obj?.obsetrics },
    { title: "CT Scan", data: obj?.ctScan },
    { title: "MRI Scan", data: obj?.mriScan },
  ];

  // Function to draw key-value pairs
  const drawRow = (label, value, colIndex) => {
    const x = 65 + colIndex * colWidth;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${label} :`, x, y);
    const labelWidth = doc.getTextWidth(`${label} :`);
    doc.setFont("helvetica", "normal");
    doc.text(`${value || "-"}`, x + labelWidth + labelPadding, y);
  };

  // --- Patient Details ---
  y += 10;
  drawRow("Name", patient?.fullname, 0);
  drawRow("Age", patient?.age, 1);
  drawRow("Gender", patient?.gender, 2);
  y += lineHeight;

  // --- Render Each Section ---
  sections.forEach((section) => {
    if (Array.isArray(section?.data) && section?.data.length > 0) {
      // Check for page overflow before printing section title
      if (y > pageHeight - (footerHeight + bottomMargin)) addNewPage();

      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(section.title, 66, y);
      y += 8;

      doc.setFontSize(12);
      section.data.forEach((test) => {
        if (y > pageHeight - (footerHeight + bottomMargin)) addNewPage();
        doc.text(`- ${test}`, 72, y);
        y += 7;
      });

      y += 10;
    }
  });

  // --- Footer (Doctor Info) ---
  const footerY = pageHeight - footerHeight; // lift footer a bit higher
  drawDoctorInfo(footerY);

  // --- Generate PDF ---
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
