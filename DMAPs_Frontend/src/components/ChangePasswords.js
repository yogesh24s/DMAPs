import React, { useState } from 'react'
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


export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [errorHighlight, setErrorHighlight] = useState(false);
    const [userName, setUserName] = useState("")
    let history = useHistory()
    const submitHandlers =e => {
        e.preventDefault();
        //let username = localStorage.getItem("username")
        
        //alert("Hello")
        let token = sessionStorage.getItem("accessToken")
        
        let payload = {
            currentPassword : currentPassword,
            newPassword: newPassword,
            token:token,
            userName:userName
        }
		trackPromise(loginService.changePassword({ "data": [payload] }).then((response) => {
            //check login response
			//data[0].data[0].result
			//let token = response.data[0].data[0].token
            console.log(response);
            
            if (response.data[0].data[0].result == "success") {
				
                alert(response.data[0].data[0].message)
               history.push('./login')
            }
            else {
                console.log({"response":response});
                alert("Password and userName are wrong");
            }

        }).catch((error) => {
            //console.log(error.response.data.error)
           // console.log(response);
           console.log(error);
            alert("error.response.data.error");
            
        })
        );
    }

  return (
    <div>
            
            <div className="login-view">
                <div className="row no-gutter bg-image">
                    <div className="login-container">
                        <div className="login div-wrapper d-flex justify-content-center align-items-center">
                            <div className="logincard">
                                <h2 className="logintext mb-3">Change Password</h2>
                                <form onSubmit={submitHandlers} autoComplete="off">
                                <small className="inputheader">
                                        UserName
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
                                            <input type="text" name="currentPassword" value={userName} onChange={(e)=>{setUserName(e.target.value)}} className={errorHighlight ? 'form-control usernameWarning' : 'form-control'} placeholder="Username" />
                                            <img className="icon-cls" src={EmailLogo} alt="image not found" />
                                        </div>

                                       
                                    </div>
                                    <small className="inputheader">
                                        Current Password
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
                                            <input type="text" name="currentPassword" value={currentPassword} onChange={(e)=>{setCurrentPassword(e.target.value)}} className={errorHighlight ? 'form-control usernameWarning' : 'form-control'} placeholder="Current Password" />
                                            <img className="icon-cls" src={EmailLogo} alt="image not found" />
                                        </div>

                                       
                                    </div>

                                    <small className="inputheader">
                                       New Password
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
                                            <input type="text" name="newPassword" value={newPassword} onChange={(e)=> {setNewPassword(e.target.value)}} className={errorHighlight ? 'form-control usernameWarning' : 'form-control'} placeholder="New Password" />
                                            <img className="icon-cls" src={EmailLogo} alt="image not found" />
                                        </div>

                                       
                                    </div>
                                    
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <button
                                                type="submit"
                                                className="btn btn-primary login-btn mt-1"
                                                
                                            >
                                                <span>Change Password</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='row'>

                                        {/* <label className='forgot-cls opacity-50' onClick={openForgotPasswordPage}>
                                            Forgot Password?</label> */}
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
