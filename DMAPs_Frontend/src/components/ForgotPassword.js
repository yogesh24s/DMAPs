
import React, { useEffect, useState } from 'react'
import EmailLogo from '../assets/images/username_icon.svg';
import PasswordLogo from '../assets/images/password_icon.svg';
import Navbar from 'react-bootstrap/Navbar';
import DMAPLogo from '../../src/assets/images/DMAPLogo.png';
import infoIcon from '../../src/assets/images/info_icon.svg';
import { useHistory } from 'react-router-dom';
import loginService from '../services/loginService';
import helper from '../services/tokenStore';
import { trackPromise } from 'react-promise-tracker';
import infoData from '../assets/data/info.json';
import './Login.scss';
import { Tooltip } from '../../node_modules/bootstrap/dist/js/bootstrap.esm.min.js';

export default function ForgotPassword() {
    const [errorHighlight, setErrorHighlight] = useState(false);
    const [email, setEmail] = useState("")
    const history = useHistory()
    const loginPage = () => {
        history.push('/login')
    }
    const submitHandler = (e) => {
        e.preventDefault();
		const payload = {
			'email': email
		}
        
		trackPromise(loginService.forgotPassword({ "data": [payload] }).then((response) => {
            //check login response
			//data[0].data[0].result
			//let token = response.data[0].data[0].token
            
            if (response.data[0].data[0].result == "success") {
				
				//
                // alert("Login suceessfully");
				// helper.setToken(token)
				// //setAuthToken(token)
				// console.log(token);
                alert("Password has been sent to your Email Id")
				history.push("/login");
               
            }
            else {
                alert("Password and userName are wrong");
            }

        }).catch((error) => {
            //console.log(error.response.data.error)
            alert(error.response.data.error);
        })
        );
    }

    const changeHandler = (event) => {
        setEmail(event.target.value)
        
    }

    return (
        <div>
            <div className="login-view">
                <div className="row no-gutter bg-image">
                    <div className="login-container">
                        <div className="login div-wrapper d-flex justify-content-center align-items-center">
                            <div className="logincard">
                                <h2 className="logintext mb-3">Forgot Password</h2>
                                <form onSubmit={submitHandler} autoComplete="off">
                                    <small className="inputheader">
                                        Email
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
                                            <input type="text" name="email" value={email} onChange={changeHandler} className={errorHighlight ? 'form-control usernameWarning' : 'form-control'} placeholder="Enter your username" />
                                            <img className="icon-cls" src={EmailLogo} alt="image not found" />
                                        </div>

                                       
                                    </div>

                                    
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <button
                                                type="submit"
                                                className="btn btn-primary login-btn mt-1"
                                                
                                            >
                                                <span> Submit </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='row mt-1'>

                                        <label className='forgot-cls opacity-50' onClick={loginPage}>
                                            Login</label>
                                        {/* <label className='forgot-cls opacity-50 float-end mt-1'>
											Signup</label> */}
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
    )
}
