// SlideOutMenu.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Buttons/LoginButton";
import LogoutButton from "../Buttons/LogoutButton";
import "./SlideOutMenu.scss";

const SlideOutMenu = ({ menuOpen }) => {
	const { isAuthenticated } = useAuth0();

	return (
		<div className={`slide-out-menu ${menuOpen ? "open" : ""}`}>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/contact">Contact</Link>
					</li>
				</ul>
			</nav>
			<div className="auth-buttons">
				{!isAuthenticated && <LoginButton />}
				{isAuthenticated && <LogoutButton />}
			</div>
		</div>
	);
};

export default SlideOutMenu;
