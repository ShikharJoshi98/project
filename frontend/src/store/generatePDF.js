import jsPDF from "jspdf";
import "jspdf-autotable";

const img = '/report.png';
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const formattedDate = `${dd}/${mm}/${yyyy}`;

export const generateTablePDF = (patient, PresentComplaintData, chiefComplaints, PastHistoryData, FamilyMedicalData,mentalCausative,mentalCausativeScribble,MentalPersonalityData,mentalPersonalityScribble,briefMindSymptomScribble,ThermalReactionData,MiasmData) => {
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

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Health Assessment", 20, y);
  y += 6;
  const tableBody = [];
  patient?.healthRecords?.forEach((record, index) => {
    tableBody.push([
      index + 1,
      record?.date || "-",
      record?.bloodPressure ? `${record.bloodPressure} mmHg` : "-",
      record?.weight ? `${record.weight} Kg` : "-"
    ]);
  });

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
  const presentComplaintTable = [];
  PresentComplaintData?.forEach((record, index) => {
    presentComplaintTable.push([
      record?.created_at || "-",
      record?.complaintName ? `${record.complaintName}` : "-",
      `${record.duration} ${record.durationSuffix}`
    ]);
  })
  let nextY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Present Complaint", 20, nextY);
  nextY += 6;
  doc.autoTable({
    startY: nextY,
    head: [['Date', 'Complain', 'Duration']],
    body: presentComplaintTable,
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
  nextY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Chief Complaint", 20, nextY);
  nextY += 6;
  const chiefComplaintImages = [];
  chiefComplaints?.forEach((record, index) => {
    chiefComplaintImages.push(
      record?.image
    );
  })
  let currentY = nextY;
  let imageWidth = 180;
  let imageHeight = 100;
  let x = (210 - imageWidth) / 2;

  chiefComplaintImages?.forEach((image) => {
    doc.addImage(image, "JPEG", x, currentY, imageWidth, imageHeight);
    currentY += imageHeight + 10; // spacing between images
  });
  nextY = currentY + 10;
  if (nextY + 20 > doc.internal.pageSize.height) {
    doc.addPage();
    nextY = 20; // Reset Y position for new page
  }
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Past History", 20, nextY);
  nextY += 6;
const PastHistoryTables = [];
  PastHistoryData?.forEach((record, index) => {
    PastHistoryTables.push([
      record?.created_at || "-",
      record?.complaintName ? `${record.complaintName}` : "-",
      record?.lastDiagnosed ? `${record.lastDiagnosed}` : "-",
      `${record.duration} ${record.durationSuffix}`,
      record?.remark ? `${record.remark}` : "-",
    ]);
  })
  doc.autoTable({
    startY: nextY,
    head: [['Date', 'Complain', 'Last Diagnosed', 'Duration', 'Remarks']],
    body: PastHistoryTables,
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
  const familyMedicalTable = [];
  FamilyMedicalData?.forEach((record, index) => {
    familyMedicalTable.push([      
      record?.relation ? `${record.relation}` : "-",
      record?.age ? `${record.age}` : "-",
      `${record.diseases.join(',')}`,
       record?.anyOther ? `${record.anyOther}` : "-",
      record?.lifeStatus ? `${record.lifeStatus}` : "-"
    ]);
  })
   nextY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Family Medical History", 20, nextY);
  nextY += 6;
  doc.autoTable({
    startY: nextY,
    head: [['Date', 'Complain', 'Last Diagnosed', 'Duration', 'Remarks']],
    body: familyMedicalTable,
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
  nextY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Mental Causative Factors", 20, nextY);
  nextY += 10;
  if (nextY + mentalCausative.length * 10 > doc.internal.pageSize.height) {
  doc.addPage();
  nextY = 20;
}

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

mentalCausative?.forEach((item, index) => {
  doc.text(`${index + 1}. ${item}`, 25, nextY);
  nextY += 8;
});
   nextY += 6;
  const mentalCausativeScribbleData = [];
  mentalCausativeScribble?.forEach((record, index) => {
    mentalCausativeScribbleData.push(
      record?.image
    );
  })
   currentY = nextY;
   imageWidth = 180;
   imageHeight = 100;
   x = (210 - imageWidth) / 2;

  mentalCausativeScribbleData?.forEach((image) => {
    doc.addImage(image, "JPEG", x, currentY, imageWidth, imageHeight);
    currentY += imageHeight + 10; // spacing between images
  });
  nextY = currentY + 10;
  if (nextY + 20 > doc.internal.pageSize.height) {
    doc.addPage();
    nextY = 20; // Reset Y position for new page
  }
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Mental Personality Character", 20, nextY);
  nextY += 10;
  if (nextY + MentalPersonalityData.length * 10 > doc.internal.pageSize.height) {
  doc.addPage();
  nextY = 20;
}

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

MentalPersonalityData?.forEach((item, index) => {
  doc.text(`${index + 1}. ${item}`, 25, nextY);
  nextY += 8;
});
   nextY += 6;
  const mentalPersonalityCharacterData = [];
  mentalPersonalityScribble?.forEach((record, index) => {
    mentalPersonalityCharacterData.push(
      record?.image
    );
  })
   currentY = nextY;
   imageWidth = 180;
   imageHeight = 100;
   x = (210 - imageWidth) / 2;

  mentalPersonalityCharacterData?.forEach((image) => {
    doc.addImage(image, "JPEG", x, currentY, imageWidth, imageHeight);
    currentY += imageHeight + 10; 
  });
  nextY = currentY + 10;
  if (nextY + 20 > doc.internal.pageSize.height) {
    doc.addPage();
    nextY = 20; 
  }
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Brief Mind Symptom", 20, nextY);
  nextY += 10;
  const briefMindSymptom = [];
  briefMindSymptomScribble?.forEach((record, index) => {
    briefMindSymptom.push(
      record?.image
    );
  })
   currentY = nextY;
   imageWidth = 180;
   imageHeight = 100;
   x = (210 - imageWidth) / 2;

  briefMindSymptom?.forEach((image) => {
    doc.addImage(image, "JPEG", x, currentY, imageWidth, imageHeight);
    currentY += imageHeight + 10; 
  });
  nextY = currentY + 10;
  if (nextY + 20 > doc.internal.pageSize.height) {
    doc.addPage();
    nextY = 20; 
  }
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Thermal Reaction", 20, nextY);
  nextY += 10;
  if (nextY + ThermalReactionData.length * 10 > doc.internal.pageSize.height) {
  doc.addPage();
  nextY = 20;
}

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

ThermalReactionData?.forEach((item, index) => {
  doc.text(`${index + 1}. ${item}`, 25, nextY);
  nextY += 8;
});
  nextY += 6;
   doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Miasm", 20, nextY);
  nextY += 10;
  if (nextY + MiasmData.length * 10 > doc.internal.pageSize.height) {
  doc.addPage();
  nextY = 20;
}

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

MiasmData?.forEach((item, index) => {
  doc.text(`${index + 1}. ${item}`, 25, nextY);
  nextY += 8;
});
   nextY += 6;
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
