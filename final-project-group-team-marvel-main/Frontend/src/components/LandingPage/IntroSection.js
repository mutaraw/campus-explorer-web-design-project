//IntroSection.js
import React from "react";
//import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import GetStartedButton from "../Buttons/GetStartedButton";
import "./IntroSection.scss";
import HeroImage1 from "../../assets/images/HeroImage1.png";
const IntroSection = () => (
	<div className="intro-section">
		<div className="intro-content">
			<h1>Welcome to campus explorer</h1>
			<p>Expand your global network, Connect, explore, and plan your dream study abroad experience.
				Discover schools, programs, and connect with students who share your
				interests.<strong> Join today</strong> and get personalized recommendations and insights about studying abroad from our vibrant
				community of</p>
			<div className="cta-button">
				<GetStartedButton />
			</div>
		</div>
		<div className="image-container">
			<img src={HeroImage1} alt="graduate students" width={300} height={600} />
		</div>
		{/* <div className="image-slider">
			<Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
			</Carousel>
		</div> */}
	</div>
);

export default IntroSection;
