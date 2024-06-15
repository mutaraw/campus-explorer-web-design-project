// OverLay.js
import React from "react";
import "./OverLay.scss";

const Overlay = ({ menuOpen, setMenuOpen }) => (
	<div
		className={`overlay ${menuOpen ? "visible" : ""}`}
		onClick={() => setMenuOpen(false)}
	></div>
);

export default Overlay;
