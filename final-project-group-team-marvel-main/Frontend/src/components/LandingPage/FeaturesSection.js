// FeaturesSection.js
import React from "react";
import "./FeaturesSection.scss";
import 'font-awesome/css/font-awesome.min.css';

const FeaturesSection = () => (
	<div className="features-section">
		<div className="features-content">
			<div className="cards">
				<div className="card">
					<i className="fa fa-graduation-cap card-icon" aria-hidden="true"></i>
					<h3>Almuni</h3>
				</div>
				<div className="card">
					<i className="fa fa-users card-icon" aria-hidden="true"></i>
					<h3>Students</h3>
				</div>
				<div className="card">
					<i className="fa fa-search card-icon" aria-hidden="true"></i>
					<h3><nobr>And Aspiring Students</nobr></h3>
				</div>
			</div>
		</div>
	</div>
);

export default FeaturesSection;
