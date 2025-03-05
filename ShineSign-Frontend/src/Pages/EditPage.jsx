import { useRef, useState } from "react";
import styles from "./EditPage.module.css";
import SplitPane from "../Components/SplitPane/SplitPane.jsx";
import Editor from "../Components/TextEditor/Editor.jsx";
import { getDocument } from "../EditorConfig/editorHelper.js";
import DocumentPane from "../Components/DocumentPane/DocumentPane.jsx";
import Page from "../Components/EditorResults/Page.jsx";

export default function EditPage () {
	const [editorText, setEditorText] = useState();
	const page = useRef(null);

	function handleChange (text) {
		setEditorText(text);
		page.current.srcdoc = getDocument(text);
	}

	return <SplitPane
		className="editor-page"
		leftPane={<Editor value={editorText} onChange={handleChange}/>}
		rightPane={<DocumentPane><Page ref={page}/></DocumentPane>}
	/>;
};