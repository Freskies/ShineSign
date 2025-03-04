import { useState } from "react";
import styles from "./SplitPane.module.css";

/**
 * A split pane component that allows resizing of the left and right panes
 *
 * @param leftPane the jsx element to be displayed on the left
 * @param rightPane the jsx element to be displayed on the right
 * @param toDisableRefs the refs to be disabled when resizing
 * @returns {JSX.Element} the split pane
 */
export default function SplitPane ({ leftPane, rightPane, toDisableRefs }) {
	const [leftWidth, setLeftWidth] = useState(50); // Initial width in %
	const minWidth = 20; // Minimum width in %

	function handleMouseDown (e) {
		e.preventDefault();
		const startX = e.clientX;

		toDisableRefs?.forEach(ref => ref.current.style.pointerEvents = "none");

		function onMouseMove (event) {
			const delta = ((event.clientX - startX) / window.innerWidth) * 100;
			const newWidth = Math.max(minWidth, Math.min(leftWidth + delta, 100 - minWidth));
			setLeftWidth(newWidth);
		}

		function onMouseUp () {
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

		{/* Right Panel */}
		<div style={{ width: `${100 - leftWidth}%` }}>
			{rightPane}
		</div>
	</div>;
};