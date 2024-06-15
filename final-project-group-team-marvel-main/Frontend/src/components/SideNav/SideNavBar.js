import React from "react";
import Logo from "../../assets/images/logo3.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Buttons/LoginButton";
import LogoutButton from "../Buttons/LogoutButton";
import "./sidenav.scss";

// Nav bar at the top which navigates easily
const SideNavBar = ({ menuOpen, setMenuOpen }) => {
	const { isAuthenticated } = useAuth0();

	return (
		<header className="nav-header">
			<div className="logo-container">
				<img src={Logo} alt="Logo" className="logo" />
				<span className="logo-text">CampusExplorer</span>
			</div>
			<div className="nav-container">
				<nav>
					<ul>
						<li>
							<Link to="/home">Home</Link>
						</li>
						<li>
							<Link to="/location">Location</Link>
						</li>
						<li>
							<Link to="/schools">Schools</Link>
						</li>
						<li>
							<Link to="/profile">Dashboard</Link>
						</li>
					</ul>
				</nav>
				<div className="auth-buttons">
					{!isAuthenticated && <LoginButton />}
					{isAuthenticated && <LogoutButton />}
				</div>
			</div>
			<div
				className="hamburger-menu"
				onClick={() => setMenuOpen(!menuOpen)}
			></div>
		</header>
	);
};

export default SideNavBar;
