/**
 * owner : Shree Nidhi
 * author :
 */
import React, { useEffect, useState } from 'react'
import EmailLogo from '../assets/images/username_icon.svg';
import PasswordLogo from '../assets/images/password_icon.svg';
import Navbar from 'react-bootstrap/Navbar';
import DMAPLogo from '../../src/assets/images/DMAPLogo.png';
import infoIcon from '../../src/assets/images/info_icon.svg';
import { useHistory } from 'react-router-dom';
import loginService from '../services/loginService';
import helper from '../services/tokenStore';

import infoData from '../assets/data/info.json';
import './Login.scss';
import { Tooltip } from '../../node_modules/bootstrap/dist/js/bootstrap.esm.min.js';
function Login() {

	const openForgotPasswordPage = () =>{
		history.push('/forgot-password')
	}

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new Tooltip(tooltipTriggerEl)
	});


	// TODO: Clear session storage below can be avoided once logout functionality is implemented.
	useEffect(()=>{
		loginService.logout();
	})

	const history = useHistory();

	const [data, setData] = useState({
		username: "",
		password: ""
	});

	const [userNameError] = useState({});
	// const [passwordError, setPasswordError] = useState({});
	const [errorHighlight, setErrorHighlight] = useState(false);

	const { username, password } = data;

	const changeHandler = e => {
		setData({ ...data, [e.target.name]: [e.target.value] });
		// formValidation(e.target.value)
	}

	const submitHandler = e => {
		e.preventDefault();
		const payload = {
			'userName': data.username[0],
			'password': data.password[0]
		}
		helper.setToken("eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1N2YzYTgzNi0zMWY4LTQ3Y2UtYmZkZi01YzUxYTMxMzdlNDAifQ.");
		helper.setRefreshToken("eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1N2YzYTgzNi0zMWY4LTQ3Y2UtYmZkZi01YzUxYTMxMzdlNDAifQ.");
		helper.setRole("Admin");
		helper.setFullName("demo user");
		helper.setTemporaryPasswordFlag("false");
		helper.setUserName("Yogesh");
		helper.setUserId("93fff965-d487-4fea-bdc7-6a08a1009298");
		helper.setAvailableLicense("9")

		// Changed to false from true
		history.push("/landingpage");
	}


	// const formValidation = (e) => {
	// 	const userNameError = {};
	// 	let isvalid = true;
	// 	var regexp = /^[a-zA-Z0-9\- _ \s]+$/;
	// 	if (regexp.test(e) === false) {
	// 		setErrorHighlight(true);
	// 		userNameError.text = "only alphanumeric, space( ), underscore (_), and hyphen (-) characters are allowed.";
	// 		isvalid = false;
	// 	} else {
	// 		setErrorHighlight(false);
	// 	}
	// 	setUserNameError(userNameError);
	// 	return isvalid;
	// }

	return (
		<div>
			<Navbar className="navbar-login">
				<Navbar.Brand className='navbar-cls' href="#home">
					<img
						src={DMAPLogo}
						className="d-inline-block align-top logo-cls"
						alt='DMAP'
					/>
				</Navbar.Brand>
			</Navbar>

			<div className="login-view">
				<div className="row no-gutter bg-image">
					<div className="login-container">
						<div className="login div-wrapper d-flex justify-content-center align-items-center">
							<div className="logincard">
								<h2 className="logintext mb-3">Login</h2>
								<form onSubmit={submitHandler} autoComplete="off">
									<small className="inputheader">
										Username
										<img
											src={infoIcon}
											className="info-icon-style login-icon-style cursor-pointer"
											alt='Username'
											title={infoData.login.username}
											data-bs-toggle="tooltip" data-bs-placement="top"
										/>
									</small>
									<div className="row mb-3">
										<div className="form-group col-md-12 input-cls">
											<input type="text" name="username" value={username} onChange={changeHandler} className={errorHighlight ? 'form-control usernameWarning' : 'form-control'} placeholder="Enter your username" />
											<img className="icon-cls" src={EmailLogo} alt="image not found" />
										</div>

										{Object.keys(userNameError).map((key) => {
											return <span className='errortext col-md-12'>{userNameError[key]}</span>
										})}
									</div>

									<small className="inputheader">
										Password
										<img src={infoIcon} className="info-icon-style login-icon-style cursor-pointer" alt='Password' title={infoData.login.password}
											data-bs-toggle="tooltip" data-bs-placement="top"
										/>
									</small>

									<div className="row  mb-3">
										<div className="form-group col-md-12 input-cls">
											<input type="password" name="password" value={password} onChange={changeHandler} className="form-control" placeholder="Enter your password" />

											<img className="icon-cls" src={PasswordLogo} alt="image not found" />
										</div>
									</div>

								 <div>
										<label className='forgot-cls opacity-50' onClick={openForgotPasswordPage}>
											Forgot Password?</label>
										{/* <label className='forgot-cls opacity-50 float-end mt-1'>
											Signup</label> */}
									</div>
									<div className="row">
										<div className="form-group col-md-12">
											<button
												type="submit"
												className="btn btn-primary login-btn mt-1"
												disabled={!data.username[0] || !data.password[0]}
											>
												<span>Login</span>
											</button>
										</div>
									</div>
									<br />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<footer className='login-footer'>
					<p className="footertext">
						<span className="powered-by">Powered by </span>
						<a href="https://DMAP.ai" target="_blank"><img className="footerlogopos" src={DMAPLogo} alt="image not found" /></a>
					</p>
				</footer>
			</div>

		</div>

	);

}

export default Login;
