import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function handlePDF () {
	const canvas = await html2canvas(page.current);
	const imgCanvas = canvas.toDataURL("image/png");
	const pdf = new jsPDF();
	pdf.addImage(imgCanvas, "JPEG", 0, 0);
	pdf.save("download.pdf");
}