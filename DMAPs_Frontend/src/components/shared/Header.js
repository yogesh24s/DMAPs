import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DMAP from '../../assets/images/DMAPLogo.png';

import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import helper from '../../services/tokenStore';



function CollapsibleExample() {
	const history = useHistory();
	const [userFullName, setFullName] = useState(helper.getFullName());

	const openLandingPage = () => {
		history.push('/landingPage');
	}

	const openCalculator = () => {
		window.open('Calculator:///')
	}

	return (
		<Navbar className="navbar-custom" collapseOnSelect>
			<Navbar.Brand className="navbar-cls" href="/landingpage">
				<img src={DMAP} className="d-inline-block align-top logo-cls" alt='Affine' />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" >
				
					<Nav className="me-auto">

					</Nav>
					<Nav style={{ marginRight:"15px", borderRight:"1px solid #fff" }}>
						<div style={{ width: "max-content", height: "28px", borderRadius: "5px", cursor: "pointer", padding: "0 10px 0 0" }} >
							<i className="fa fa-star mx-3 hover-yellow" aria-hidden="true" style={{ color: "#fff", width: "max-content" }}></i>

							<i className="fa fa-envelope-o mx-3 hover-yellow" aria-hidden="true" style={{ color: "#fff", width: "max-content" }}></i>

							<i className="fa fa-bell-o mx-3 hover-yellow" aria-hidden="true" style={{ color: "#fff", width: "max-content" }}></i>

							<i className="fa fa-calculator mx-3 hover-yellow" aria-hidden="true" style={{ color: "#fff", width: "max-content" }} onClick={openCalculator}></i>
						</div>
					</Nav>
					<Nav>
						<div className="dropdown">
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
								<div className="dropbtn" style={{ height: "40px", width: "40px", borderRadius: "50%",display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
								<i className="fa fa-user-tie fa-1x" aria-hidden="true" style={{ color: "#fff", width: "max-content" }}></i>
								</div>
								<span style={{ color: "#ffff", marginLeft: "5px" }}>{(userFullName && userFullName != undefined && userFullName != null) ? "Yogesh" : "Yogesh"}</span>
							</div>

							{(!history.location.pathname.includes('/changepassword')) &&
								<div className="dropdown-content" style={{ backgroundColor: "#000" }}>
									<Link className='nav-customcls top-right-icon' to="/changepassword" title="Change Password">
										<i className="fa-solid fa-arrow-right-from-bracket fa-key"></i> Change Password  </Link>

									<Link className='nav-customcls top-right-icon' to="/login" title="Logout">
										<i className="fa-solid fa-arrow-right-from-bracket fa-top-right-icon"></i> Logout </Link>

								</div>
							}
						</div>
					</Nav>
				</Navbar.Collapse>

		</Navbar>
	);
}

export default CollapsibleExample;