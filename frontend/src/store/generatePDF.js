import jsPDF from "jspdf";
import "jspdf-autotable";

const img = '/header_pdf.jpg';
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const formattedDate = `${dd}/${mm}/${yyyy}`;

export const generateTablePDF = (
  patient,
  PresentComplaintData,
  chiefComplaints,
  PastHistoryData,
  personalHistory,
  FamilyMedicalData,
  mentalCausative,
  mentalCausativeScribble,
  MentalPersonalityData,
  mentalPersonalityScribble,
  briefMindSymptomScribble,
  ThermalReactionData,
  MiasmData
) => {
  const doc = new jsPDF();
  let nextY = 90;

  const lineHeight = 12;
  const colWidth = 65;
  const labelPadding = 2;
  const pageHeight = doc.internal.pageSize.height;

  const checkPageBreak = (additionalHeight = 10) => {
    if (nextY + additionalHeight > pageHeight) {
      doc.addPage();
      nextY = 20;
    }
  };

  // Header and Title
  doc.setFontSize(14);
  doc.text('Date: ' + formattedDate, 160, 65);
  doc.addImage(img, "JPEG", 0, 0, 210, 55);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("New Case - Final Report", 60, 76);

  const drawRow = (label, value, colIndex) => {
    const x = 20 + colIndex * colWidth;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${label} :`, x, nextY);
    const labelWidth = doc.getTextWidth(`${label} :`);
    doc.setFont("helvetica", "normal");
    doc.text(`${value || "-"}`, x + labelWidth + labelPadding, nextY);
  };

  // Patient Info
  drawRow("Age", patient?.age, 0);
  drawRow("Gender", patient?.gender, 1);
  drawRow("Weight", "67 Kgs", 2);
  nextY += lineHeight;

  drawRow("Phone", patient?.phone, 0);
  drawRow("Email", patient?.email, 1);
  drawRow("Address", patient?.address, 2);
  nextY += lineHeight;

  drawRow("Qualification", patient?.qualification, 0);
  drawRow("Occupation", patient?.occupation, 1);
  drawRow("Marital Status", patient?.maritalStatus, 2);
  nextY += lineHeight;

  drawRow("Referred By", patient?.referredBy, 0);
  drawRow("Dietary Preference", patient?.dietaryPreference, 1);
  nextY += lineHeight + 10;

  // Health Assessment Table
  checkPageBreak(30);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Health Assessment", 20, nextY);
  nextY += 6;

  const healthTable = patient?.healthRecords?.map((record, index) => ([
    index + 1,
    record?.date || "-",
    record?.bloodPressure ? `${record.bloodPressure} mmHg` : "-",
    record?.weight ? `${record.weight} Kg` : "-"
  ])) || [];

  doc.autoTable({
    startY: nextY,
    head: [['SNo.', 'Assessment Date', 'Blood Pressure', 'Weight']],
    body: healthTable,
    theme: 'grid',
    headStyles: { fillColor: [242, 242, 242], textColor: 0, fontStyle: 'bold' },
    styles: { fontSize: 10, halign: 'center' },
    didDrawPage: data => { nextY = data.cursor.y + 10; }
  });

  // Present Complaint Table
  checkPageBreak(30);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Present Complaint", 20, nextY);
  nextY += 6;

  const presentComplaintTable = PresentComplaintData?.map(record => ([
    record?.created_at || "-",
    record?.complaintName || "-",
    `${record?.duration} ${record?.durationSuffix}`
  ])) || [];

  doc.autoTable({
    startY: nextY,
    head: [['Date', 'Complaint', 'Duration']],
    body: presentComplaintTable,
    theme: 'grid',
    headStyles: { fillColor: [242, 242, 242], textColor: 0, fontStyle: 'bold' },
    styles: { fontSize: 10, halign: 'center' },
    didDrawPage: data => { nextY = data.cursor.y + 10; }
  });

  // Chief Complaint Images
  checkPageBreak(20);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Chief Complaint", 20, nextY);
  nextY += 6;

  const chiefComplaintImages = chiefComplaints?.map(record => record?.image) || [];
  for (const image of chiefComplaintImages) {
    checkPageBreak(110);
    doc.addImage(image, "JPEG", 15, nextY, 180, 100);
    nextY += 110;
  }

  // Past History Table
  checkPageBreak(30);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Past History", 20, nextY);
  nextY += 6;

  const pastHistoryTable = PastHistoryData?.map(record => ([
    record?.created_at || "-",
    record?.complaintName || "-",
    record?.lastDiagnosed || "-",
    `${record?.duration} ${record?.durationSuffix}`,
    record?.remark || "-"
  ])) || [];

  doc.autoTable({
    startY: nextY,
    head: [['Date', 'Complaint', 'Last Diagnosed', 'Duration', 'Remarks']],
    body: pastHistoryTable,
    theme: 'grid',
    headStyles: { fillColor: [242, 242, 242], textColor: 0, fontStyle: 'bold' },
    styles: { fontSize: 10, halign: 'center' },
    didDrawPage: data => { nextY = data.cursor.y + 10; }
  });

  //Personal History

  checkPageBreak(20);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Personal History", 20, nextY);
  nextY += 6;

  const personalHistoryImages = personalHistory?.map(record => record?.image) || [];
  for (const image of personalHistoryImages) {
    checkPageBreak(110);
    doc.addImage(image, "JPEG", 15, nextY, 180, 100);
    nextY += 110;
  }
  // Family Medical History Table
  checkPageBreak(30);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Family Medical History", 20, nextY);
  nextY += 6;

  const familyMedicalTable = FamilyMedicalData?.map(record => ([
    record?.relation || "-",
    record?.age || "-",
    (record?.diseases || []).join(', ') || "-",
    record?.anyOther || "-",
    record?.lifeStatus || "-"
  ])) || [];

  doc.autoTable({
    startY: nextY,
    head: [['Relation', 'Age', 'Diseases', 'Any Other', 'Life Status']],
    body: familyMedicalTable,
    theme: 'grid',
    headStyles: { fillColor: [242, 242, 242], textColor: 0, fontStyle: 'bold' },
    styles: { fontSize: 10, halign: 'center' },
    didDrawPage: data => { nextY = data.cursor.y + 10; }
  });

  // Render Lists & Images
  const renderList = (title, list) => {
    checkPageBreak(30);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, nextY);
    nextY += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    list?.forEach((item, i) => {
      checkPageBreak(10);
      doc.text(`${i + 1}. ${item}`, 25, nextY);
      nextY += 8;
    });
    nextY += 6;
  };

  const renderImages = (title, imageList) => {
    checkPageBreak(30);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, nextY);
    nextY += 10;
    for (const image of imageList || []) {
  if (!image || typeof image !== 'string' || !image.startsWith("data:image/")) {
    console.warn("Skipping invalid image", image);
    continue;
  }
  checkPageBreak(110);
  doc.addImage(image, "JPEG", 15, nextY, 180, 100);
  nextY += 110;
}
  };

  renderList("Mental Causative Factors", mentalCausative);
  renderImages("Mental Causative Scribbles", mentalCausativeScribble?.map(r => r?.image));

  renderList("Mental Personality Character", MentalPersonalityData);
  renderImages("Mental Personality Scribbles", mentalPersonalityScribble?.map(r => r?.image));

  renderImages("Brief Mind Symptom", briefMindSymptomScribble?.map(r => r?.image));

  renderList("Thermal Reaction", ThermalReactionData);
  renderList("Miasm", MiasmData);

  // Output PDF
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};

