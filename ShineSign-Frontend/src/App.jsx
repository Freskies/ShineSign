import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";

export default function App () {
	const page = useRef(null);
	const editor = useRef(null);

	function handleEditorMount () {
		emmetHTML(window.monaco);
		emmetCSS(window.monaco);
	}

	async function handlePDF () {
		const canvas = await html2canvas(page.current);
		const imgCanvas = canvas.toDataURL("image/png");
		const pdf = new jsPDF();
		pdf.addImage(imgCanvas, "JPEG", 0, 0);
		pdf.save("download.pdf");
	}

	// display the code in the iframe
	function display (content = "") {
		if (!page.current) return;
		page.current.srcdoc = `<html><body>${content}</body></html>`;
	}

	return <div className="editor-page">
		<Editor
			ref={editor}
			className="editor"
			defaultLanguage="html"
			defaultValue="<!-- Write your code here -->"
			onChange={value => display(value)}
			options={{
				quickSuggestions: true,
				wordBasedSuggestions: "currentDocument",
				suggestOnTriggerCharacters: true,
				tabCompletion: "on",
				minimap: { enabled: false },
			}}
			onMount={handleEditorMount}
		/>
		<iframe className="pdf-page" ref={page}></iframe>
	</div>;

};