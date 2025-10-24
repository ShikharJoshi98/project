import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateDiagnoseHistory = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Diagnose History", 80, 20);

    doc.setFontSize(12);

    const tableColumn = [
        "S No.",
        "Diagnosis",
        "Medicine",
        "Date",
        "Start Date",
        "Duration",
        "Case Paper No.",
        "Patient Name"
    ];

    const tableRows = data.map((pres, index) => [
        index + 1,
        pres?.diagnosis?.join(', ') || '',
        (pres?.medicine || '') + ' ' + (pres?.potency || ''),
        pres?.prescription_date || '',
        pres?.start_date || '',
        pres?.duration || '',
        pres?.patient?.casePaperNo || '',
        pres?.patient?.fullname || ''
    ]);

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: "grid",
        styles: {
            fontSize: 8,
            cellPadding: 2,
            fillColor: [245, 245, 245],
            textColor: [0, 0, 0],
            overflow: 'linebreak',
            tableWidth: "wrap",
        },
        headStyles: {
            fontSize: 9,
            fontStyle: "bold",
            fillColor: [230, 230, 230],
            textColor: [0, 0, 0],
        },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 'wrap' },
            2: { cellWidth: 'wrap' },
            3: { cellWidth: 24 },
            4: { cellWidth: 22 },
            5: { cellWidth: 18 },
            6: { cellWidth: 20 },
            7: { cellWidth: 28 }
        },
        tableWidth: 'auto',
        margin: { left: 4, right: 4 },
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
};




export const generateDiagnoseRow = async (
    pres,
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
    const pageHeight = doc.internal.pageSize.height;

    // Safe text helper
    const safeText = (text, x, y) => {
        doc.text(String(text || ""), x, y);
    };

    const checkPageBreak = (additionalHeight = 10) => {
        if (nextY + additionalHeight > pageHeight) {
            doc.addPage();
            nextY = 20;
        }
    };

    doc.setFontSize(22);
    safeText("Diagnose History", 80, 20);
    const tableColumn = ["S No.", "Diagnosis", "Medicine", "Date", "Start Date", "Duration", "Case Paper No.", "Patient Name"];
    const tableRows = [[1, pres?.diagnosis?.join(', ') || '', (pres?.medicine || '') + ' ' + (pres?.potency || ''), pres?.prescription_date || '', pres?.start_date || '', pres?.duration || '', pres?.patient?.casePaperNo || '', pres?.patient?.fullname || '']];
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30, theme: "grid", styles: { fontSize: 8, cellPadding: 2, fillColor: [245, 245, 245], textColor: [0, 0, 0], overflow: 'linebreak', }, headStyles: { fontSize: 9, fontStyle: "bold", fillColor: [230, 230, 230], textColor: [0, 0, 0], }, columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 35 }, 2: { cellWidth: 30 }, 3: { cellWidth: 24 }, 4: { cellWidth: 22 }, 5: { cellWidth: 18 }, 6: { cellWidth: 28 }, 7: { cellWidth: 28 } }, tableWidth: 'wrap', margin: { left: 4, right: 4 }, });
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


    // Example usage for Chief Complaints
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

