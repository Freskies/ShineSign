import styles from "./DocumentPane.module.css";
import { useRef, useState } from "react";
import { maxZoom, minZoom, zoomStep, scalingFactor } from "./documentPaneConfig.js";

/**
 * A document pane component that allows zooming and panning
 *
 * @param children the jsx elements to be displayed in the document pane
 * @returns {JSX.Element} the document pane
 */
export default function DocumentPane ({ children }) {
	// the scale of the document pane
	const [scale, setScale] = useState(1);
	// the position of the document pane
	const [position, setPosition] = useState({ x: 0, y: 0 });
	// whether the document pane is being dragged
	const [isDragging, setIsDragging] = useState(false);
	// the initial position of the mouse
	const startPos = useRef({ x: 0, y: 0 });

	function handleWheel (e) {
		e.preventDefault();
		/*
		* Math.min(maxZoom, ...) ensures that the scale does not exceed the maximum zoom level
		* Math.max(minZoom, ...) ensures that the scale does not go below the minimum zoom level
		* e.deltaY is the scroll amount
		* scalingFactor is the amount of zoom per scroll
		 */
		setScale(prevScale => Math.min(maxZoom, Math.max(minZoom, prevScale + e.deltaY * scalingFactor)));
	}

	function handleMouseDown (e) {
		setIsDragging(true);
		// e.clientX/Y is the coordinate of the mouse
		// position.x/y is the coordinate of the document pane
		startPos.current = {
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		};
	}

	function handleMouseMove (e) {
		if (!isDragging) return;
		// e.clientX/Y is the coordinate of the mouse
		// startPos.current.x/y is the initial position of the mouse
		setPosition({
			x: e.clientX - startPos.current.x,
			y: e.clientY - startPos.current.y,
		});
	}

	function handleMouseUp () {
		setIsDragging(false);
	}

	function handlePlus () {
		setScale(prevScale => Math.min(maxZoom, prevScale + zoomStep));
	}

	function handleMinus () {
		setScale(prevScale => Math.max(minZoom, prevScale - zoomStep));
	}

	const wrapperStyle = {
		transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
	};

	return <div
		className={styles.documentPane}
		onWheel={handleWheel}
		onMouseMove={handleMouseMove}
		onMouseUp={handleMouseUp}
		onMouseLeave={handleMouseUp}
	>
		<div
			className={styles.cursorGrab}
			onMouseDown={handleMouseDown}
			style={wrapperStyle}
		>
			{children}
		</div>
		<div className={styles.actions}>
			<button className={styles.zoomAction} onClick={handlePlus}>
				+
			</button>
			<button className={styles.zoomAction} onClick={handleMinus}>
				-
			</button>
		</div>
	</div>;
};