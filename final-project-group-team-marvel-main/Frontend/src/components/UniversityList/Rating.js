import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

const Rating = ({ rating, onRatingSubmit }) => {
	const renderStars = () => {
		const stars = [];

		for (let i = 1; i <= 5; i++) {
			stars.push(
				<FontAwesomeIcon
					key={i}
					icon={i <= rating ? faStarSolid : faStarRegular}
					onClick={() => onRatingSubmit(i)}
					className="rating-star"
				/>,
			);
		}

		return stars;
	};

	return <div className="rating">{renderStars()}</div>;
};

export default Rating;
