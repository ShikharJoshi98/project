import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateTablePDF = (HomeoMedicine) => {
    const doc = new jsPDF();

    doc.setFontSize(34);
    doc.text("Homeo Bhagwat Gita", 50, 20);

    doc.setFontSize(18);

    doc.text("Details", 14, 40);
    const tableColumn = ["Serial No.", "Medicine", "Description"];
    const tableRows = HomeoMedicine.map((medicine, index) => [
        index + 1,
        medicine.name,
        medicine.description,
    ]);

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 60,
        styles: {
            fontSize: 14,
            textColor: [0, 0, 0],
            fillColor: [255, 255, 255],
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
        },
        headStyles: {
            fontSize: 18,
            fontStyle: "bold",
            textColor: [0, 0, 0],
            fillColor: [255, 255, 255],
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
        },
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");
};

export const generatePDF = (medicine) => {
    const doc = new jsPDF();

    doc.setFontSize(34);
    doc.text("Homeo Bhagwat Gita", 50, 20);

    doc.setFontSize(18);
    doc.text("Details", 14, 40);

    const tableColumn = ["Serial No.", "Medicine", "Description"];
    const tableRows = [[1, medicine.name, medicine.description]];

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 60,
        styles: {
            fontSize: 14,
            textColor: [0, 0, 0],
            fillColor: [255, 255, 255],
            lineWidth: 0.5,
            lineColor: [0, 0, 0]
        },
        headStyles: {
            fontSize: 18,
            fontStyle: "bold",
            textColor: [0, 0, 0],
            fillColor: [255, 255, 255],
            lineWidth: 0.5,
            lineColor: [0, 0, 0]
        },
    });
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");

};