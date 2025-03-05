import styles from "./Editor.module.css";
import { emmetCSS, emmetHTML } from "emmet-monaco-es";
import { Editor as MonacoEditor } from "@monaco-editor/react";

export default function Editor ({ value, onChange }) {
	function handleEditorMount () {
		emmetHTML(window.monaco);
		emmetCSS(window.monaco);
	}

	return <MonacoEditor
		className={styles.editor}
		defaultLanguage="html"
		defaultValue="<!-- Write your code here -->"
		value={value}
		onChange={onChange}
		theme="light"
		options={{
			quickSuggestions: true,
			wordBasedSuggestions: "currentDocument",
			suggestOnTriggerCharacters: true,
			tabCompletion: "on",
			minimap: { enabled: false },
		}}
		onMount={handleEditorMount}
	/>;
};