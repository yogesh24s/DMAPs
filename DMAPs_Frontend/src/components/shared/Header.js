import { useEffect, useState, useRef } from 'react';

import { useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DMAP from '../../assets/images/DMAPLogo.png';

import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import helper from '../../services/tokenStore';

import { Button, Modal } from 'react-bootstrap';
import Calculator from './Calculator';

import { useIdleTimer } from 'react-idle-timer'

function HeaderComponent() {
	const history = useHistory();
	const [userName] = useState(helper.getUserName());
	const openLandingPage = () => {
		history.push('/landingPage');
	}
	const [showModal, setShowModal] = useState(false); 
	const handleCloseModal = () => {
		setShowModal(false);
	};
	const handleOpenModal = () => {
		setShowModal(true);
	};

	// const openCalculator = () => {
	// 	window.open('Calculator:///')
	// }
	const handleOnIdle = event => {
		console.log('user is idle', event)
		console.log('last active', getLastActiveTime())
		history.push('/login');
	  }
	
	  const handleOnActive = event => {
		console.log('user is active', event)
		console.log('time remaining', getRemainingTime())
	  }
	
	  const handleOnAction = (e) => {
		console.log('user did something', e)
	  }
	
	  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
		timeout: 1000 * 60 * 10,
		onIdle: handleOnIdle,
		onActive: handleOnActive,
		onAction: handleOnAction,
		debounce: 500
	  })

	return (
		<Navbar className="navbar-custom" collapseOnSelect>
			<Navbar.Brand className="navbar-cls" href="/landingpage">
				<img src={DMAP} className="d-inline-block align-top logo-cls" alt='Affine' />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" >
				
					<Nav className="me-auto">

					</Nav>
					<Nav style={{ marginRight:"15px", borderRight:"1px solid #065091" }}>
						<div style={{ width: "max-content", height: "28px", borderRadius: "5px", cursor: "pointer", padding: "0 10px 0 0" }} >

							<i className="fa fa-sky-blue fa-bell-o mx-3 hover-yellow" aria-hidden="true" style={{ color: "#065091", width: "max-content" }}></i>
							
							{/* <a href='ms-calculator://'> <i className="fa fa-sky-blue fa-calculator  ml-0 mx-3 hover-yellow" aria-hidden="true" style={{ color: "#fff", width: "max-content" }}></i> </a> */}

							<a onClick={handleOpenModal}> <i className="fa fa-sky-blue fa-calculator  ml-0 mx-3 hover-yellow" aria-hidden="true" style={{ color: "#065091", width: "max-content" }}></i> </a>
						</div>
					</Nav>
					<Nav>
						<div className="dropdown">
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
								<div className="dropbtn" style={{ height: "40px", width: "40px", borderRadius: "50%",display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
								<i className="fa fa-user-tie fa-1x" aria-hidden="true" style={{ color: "#fff", width: "max-content" }}></i>
								</div>
								<span style={{ color: "#065091", marginLeft: "5px", textTransform: "uppercase" }}>{userName}</span>
							</div>

							{(!history.location.pathname.includes('/changepassword')) &&
								<div className="dropdown-content">
									<Link className='nav-customcls top-right-icon' to="/changepassword" title="Change Password">
										<i className="fa-solid fa-arrow-right-from-bracket fa-key"></i> Change Password  </Link>

									<Link className='nav-customcls top-right-icon' to="/login" title="Logout">
										<i className="fa-solid fa-arrow-right-from-bracket fa-top-right-icon"></i> Logout </Link>

								</div>
							}
						</div>
						<Modal show={showModal} onHide={handleCloseModal} backdrop="static" centered>
							<Modal.Header closeButton>
							<Modal.Title>Calculator</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Calculator />
							</Modal.Body>
						</Modal>
					</Nav>
				</Navbar.Collapse>

		</Navbar>	
	);
}

export default HeaderComponent;