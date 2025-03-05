import minifiedStylePDF from "./minifiedStylePDF.js";

export function getDocument (content = "") {
	return `<html>
			<head><style>${minifiedStylePDF}</style></head>
			<body><div class="document">${content}</div></body>
		</html>`;
}