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




export const generateDiagnoseRow = (pres) => {
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

    const tableRows = [[
        1,
        pres?.diagnosis?.join(', ') || '',
        (pres?.medicine || '') + ' ' + (pres?.potency || ''),
        pres?.prescription_date || '',
        pres?.start_date || '',
        pres?.duration || '',
        pres?.patient?.casePaperNo || '',
        pres?.patient?.fullname || ''
    ]];

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
        },
        headStyles: {
            fontSize: 9,
            fontStyle: "bold",
            fillColor: [230, 230, 230],
            textColor: [0, 0, 0],
        },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 35 },
            2: { cellWidth: 30 },
            3: { cellWidth: 24 },
            4: { cellWidth: 22 },
            5: { cellWidth: 18 },
            6: { cellWidth: 28 },
            7: { cellWidth: 28 }
        },
        tableWidth: 'wrap',
        margin: { left: 4, right: 4 },
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
};
