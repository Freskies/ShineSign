import styles from "./Page.module.css";
import { getDocument } from "../../EditorConfig/editorHelper.js";

export default function Page ({ref}) {
	return <iframe className={styles.page} srcDoc={getDocument()} ref={ref}/>;
};