import React, { useEffect } from 'react';
import './FlagBubble.scss';
import Flag from 'react-world-flags';

const FlagBubble = ({ countryCode, onAnimationEnd }) => {
	useEffect(() => {
		const timer = setTimeout(onAnimationEnd, 4000);
		return () => clearTimeout(timer);
	}, [onAnimationEnd]);

	const bubbleStyle = {
		width: '500px',
		height: '210px',
		top: `${Math.random() * 0}%`,
		left: `${32 + Math.random() * 78}%`,
		animationDuration: `${Math.random() * 2 + 2}s, ${Math.random() * 2 + 2}s`,
		animationDelay: `${Math.random() * 1}s`,
	};


	return (
		<div className="bubble-container">
			<div className={`bubble`} style={bubbleStyle}>
				<Flag code={countryCode} height="15%" />
			</div>
		</div>
	);
};


export default FlagBubble;
