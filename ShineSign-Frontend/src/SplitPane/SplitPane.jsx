import { useState } from "react";
import styles from "./SplitPane.module.css";

/**
 * A split pane component that allows resizing of the left and right panes
 *
 * @param leftPane the jsx element to be displayed on the left
 * @param rightPane the jsx element to be displayed on the right
 * @returns {JSX.Element} the split pane
 */
export default function SplitPane ({ leftPane, rightPane }) {
	const [leftWidth, setLeftWidth] = useState(50); // Initial width in %
	const [isResizing, setIsResizing] = useState(false);
	const minWidth = 20; // Minimum width in %

	function handleMouseDown (e) {
		e.preventDefault();
		const startX = e.clientX;
		setIsResizing(true);

		function onMouseMove (event) {
			/*
			* delta represents the change in the mouse position
			* event.clientX - startX -> gives the distance the mouse has moved
			* then / window.innerWidth * 100 -> gives the percentage of the distance moved (of the screen width)
			 */
			const delta = ((event.clientX - startX) / window.innerWidth) * 100;
			/*
			* newWidth is the new width of the left pane
			* Math.min(leftWidth + delta, 100 - minWidth)
			* ensures that the right pane does not become smaller than the minimum width
			* Math.max(minWidth, ...) ensures that the left pane does not become smaller than the minimum width
			 */
			const newWidth = Math.max(minWidth, Math.min(leftWidth + delta, 100 - minWidth));
			setLeftWidth(newWidth);
		}

		function onMouseUp () {
			setIsResizing(false);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		}

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	}

	return <div className={styles.splitPane}>
		{/* Left Panel */}
		<div style={{ width: `${leftWidth}%` }}>
			{leftPane}
		</div>

		{/* Resizer */}
		<div
			className={styles.resizer}
			onMouseDown={handleMouseDown}
		/>
		{/* Overlay is necessary, otherwise the pointer event would be captured by the iframe */}
		{isResizing && <div className={styles.overlay}/>}

		{/* Right Panel */}
		<div style={{ width: `${100 - leftWidth}%` }}>
			{rightPane}
		</div>
	</div>;
};