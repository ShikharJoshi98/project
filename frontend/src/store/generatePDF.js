import jsPDF from "jspdf";
import "jspdf-autotable";

const img = '/header_pdf.jpg';
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const formattedDate = `${dd}/${mm}/${yyyy}`;

export const generateTablePDF = async (
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

  const safeText = (text, x, y) => {
    doc.text(String(text || ""), x, y);
  };
  const renderImages = async (title, imageList) => {
    checkPageBreak(30);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    safeText(title, 20, nextY);
    nextY += 10;

    for (const src of imageList || []) {
      if (!src || typeof src !== "string") continue;

      const img = await new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = src;
      });

      const maxWidth = 180;
      const maxHeight = pageHeight - 20; // Max height an image can take per page
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
      const imgWidth = img.width * ratio;
      const imgHeight = img.height * ratio;

      // Move to next page if image won't fit on current page
      if (nextY + imgHeight > pageHeight) {
        doc.addPage();
        nextY = 20;
      }

      doc.addImage(img, "JPEG", 15, nextY, imgWidth, imgHeight);
      nextY += imgHeight + 10;
    }
  };


  const renderTableWithHeading = (title, tableHead, tableBody) => {
  const estimatedHeight = 40 + (tableBody?.length || 0) * 8;
  checkPageBreak(estimatedHeight);

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(title, 20, nextY);
  nextY += 6;

  doc.autoTable({
    startY: nextY,
    head: [tableHead],
    body: tableBody,
    theme: 'grid',
    headStyles: { fillColor: [242, 242, 242], textColor: 0, fontStyle: 'bold' },
    styles: { fontSize: 10, halign: 'center' },
    didDrawPage: data => { nextY = data.cursor.y + 10; }
  });
};

  nextY += 6;
  const presentComplaintTable = PresentComplaintData?.map(record => (
    [record?.created_at || "-",
    record?.complaintName || "-",
    `${record?.duration} ${record?.durationSuffix}`
    ])) || [];
  
renderTableWithHeading(
  "Present Complaint",
  ['Date', 'Complaint', 'Duration'],
  presentComplaintTable
);
  checkPageBreak(30);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  const chiefComplaintImages = chiefComplaints?.map(r => r?.image);
  await renderImages("Chief Complaint", chiefComplaintImages);
  nextY += 6;
  const pastHistoryTable = PastHistoryData?.map(record =>
  ([record?.created_at || "-",
    record?.complaintName || "-",
    record?.lastDiagnosed || "-",
    `${record?.duration} ${record?.durationSuffix}`,
    record?.remark || "-"])) || [];
  
renderTableWithHeading(
  "Past History",
  ['Date', 'Complaint', 'Last Diagnosed', 'Duration', 'Remarks'],
  pastHistoryTable
);
  checkPageBreak(30);
    await renderImages("Personal History", personalHistory?.map(r => r?.image));

  nextY += 6;
  const familyMedicalTable = FamilyMedicalData?.map(record =>
  ([record?.relation || "-",
    record?.age || "-",
    (record?.diseases || []).join(', ') || "-",
    record?.anyOther || "-",
    record?.lifeStatus || "-"])) || [];
  
renderTableWithHeading(
  "Family Medical History",
  ['Relation', 'Age', 'Diseases', 'Any Other', 'Life Status'],
  familyMedicalTable
);
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
      doc.text(`${i + 1}.${item}`, 25, nextY);
      nextY += 8;
    });
    nextY += 6;
  };
    renderList("Mental Causative Factors", mentalCausative);

  await renderImages("Mental Causative Scribbles", mentalCausativeScribble?.map(r => r?.image));
    renderList("Mental Personality Character", MentalPersonalityData);

  await renderImages("Mental Personality Scribbles", mentalPersonalityScribble?.map(r => r?.image));
  await renderImages("Brief Mind Symptom", briefMindSymptomScribble?.map(r => r?.image));
  renderList("Thermal Reaction", ThermalReactionData);
  renderList("Miasm", MiasmData);
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};

