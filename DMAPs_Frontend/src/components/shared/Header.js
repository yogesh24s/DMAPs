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
	const [userName, setUserName] = useState(helper.getUserName());

	const [userRole, setUserRole] = useState(helper.getRole() ? helper.getRole() : "0");
	const openCreditPage = () => {
		history.push('/creditHistory');
	}
	const openLandingPage = () => {
		history.push('/landingPage');
	}

	return (
		<Navbar className="navbar-custom" collapseOnSelect>

			<Navbar.Brand className="navbar-cls" href="/landingpage">
				<img src={DMAP} className="d-inline-block align-top logo-cls" alt='Affine' />
			</Navbar.Brand>

			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					
				</Nav>

				{(history.location.pathname == '/creditHistory') &&
					<Nav>
						<div onClick={() => history.goBack()}>
							<i className="fa fa-arrow-left mx-3 mt-1" aria-hidden="true" style={{ color: "#FFD95A" }} title="Back"></i>

						</div>
					</Nav>
				}

				{(history.location.pathname == '/creditHistory') &&
					<Nav>
						<div onClick={openLandingPage}>
							<i className="fa fa-home mx-3 mt-1" aria-hidden="true" style={{ color: "#FFD95A" }} title="Home"></i>
						</div>
					</Nav>
				}
				<Nav>
					<div style={{ width: "max-content", height: "28px", backgroundColor: "#C1D0B5", marginRight: "20px", borderRadius: "5px", cursor: "pointer" , padding : "0 10px 0 0" }} onClick={openCreditPage}>
						<label className="credit-text">
							
							<i className="fa fa-star mx-2 mt-1" aria-hidden="true" style={{ color: "#fff" , width: "max-content"}}></i>
							<i className="fa fa-envelope-o mx-2 mt-1" aria-hidden="true" style={{ color: "#fff" , width: "max-content"}}></i>
							<i className="fa fa-bell-o mx-2 mt-1" aria-hidden="true" style={{ color: "#fff" , width: "max-content"}}></i>
							<i className="fa fa-calendar mx-2 mt-1" aria-hidden="true" style={{ color: "#fff" , width: "max-content"}}></i>
						</label>
					</div>
				</Nav>
				<Nav>
					<div className="dropdown">
						<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
							<div className="dropbtn" style={{ height: "40px", width: "40px", borderRadius: "50%", backgroundColor: "#fff" }}>
								<img></img>  </div>
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