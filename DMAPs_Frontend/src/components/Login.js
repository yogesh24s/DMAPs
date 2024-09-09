import React, { useEffect, useState } from 'react';
import EmailLogo from '../assets/images/username_icon.svg';
import PasswordLogo from '../assets/images/password_icon.svg';
import ShowPasswordLogo from '../assets/images/show_password.png';
import HidePasswordLogo from '../assets/images/hide_password.png';
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
import tokenStore from '../services/tokenStore';

function Login() {
    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl);
        });

        // TODO: Clear session storage below can be avoided once logout functionality is implemented.
        loginService.logout();
    }, []);

    const history = useHistory();

    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const [userNameError, setUserNameError] = useState('');
    const [errorHighlight, setErrorHighlight] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { username, password } = data;

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function openForgotPasswordPage() {
        history.push('/forgotPassword');
    }

    const validateForm = () => {
        let isValid = true;

        if (!data.username) {
            setUserNameError('User Name is required');
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]{3,20}$/.test(data.username)) {
            setUserNameError('User Name must be between 3 and 20 characters long and can only contain letters, numbers, and spaces');
            isValid = false;
        } else {
            setUserNameError('');
        }

        return isValid;
    }

    const submitHandler = e => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorHighlight(true);
            return;
        }

        const payload = {
            'userName': data.username,
            'password': data.password
        }

        trackPromise(loginService.login({ "data": [payload] }).then((response) => {
            let token = response.data[0].data[0].token;
            if (response.data[0].data[0].result === "success") {
                tokenStore.setUserName(data.username);
                helper.setToken(token);
                history.push("/landingpage");
            } else {
                alert("Password and userName are wrong");
            }
        }).catch((error) => {
            alert(error.response.data.error);
        }));
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

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
                                            <input
                                                type="text"
                                                name="username"
                                                value={username}
                                                onChange={changeHandler}
                                                className={errorHighlight ? 'form-control usernameWarning' : 'form-control'}
                                                placeholder="Enter your username"
                                            />
                                            <img className="icon-cls" src={EmailLogo} alt="image not found" />
                                        </div>
                                        {userNameError && (
                                            <span className='errortext col-md-12'>{userNameError}</span>
                                        )}
                                    </div>

                                    <small className="inputheader">
                                        Password
                                        <img
                                            src={infoIcon}
                                            className="info-icon-style login-icon-style cursor-pointer"
                                            alt='Password'
                                            title={infoData.login.password}
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                        />
                                    </small>

                                    <div className="row mb-3">
                                        <div className="form-group col-md-12 input-cls">
                                            <div className="input-group">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={password}
                                                    onChange={changeHandler}
                                                    className="form-control"
                                                    placeholder="Enter your password"
                                                />
                                                
                                                <div className="input-group-append">
                                                    <span className="input-group-text" onClick={toggleShowPassword}>
                                                        <img
                                                            src={showPassword ? HidePasswordLogo : ShowPasswordLogo}
                                                            alt={showPassword ? "Hide password" : "Show password"}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <button
                                                type="submit"
                                                className="btn btn-primary login-btn mt-1"
                                                disabled={!data.username || !data.password}
                                            >
                                                <span>Login</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='row mt-3 align-center'>
                                        <label className='forgot-cls opacity-50' onClick={openForgotPasswordPage}>
                                            Forgot Password?
                                        </label>
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
                        <a href="#" target="_blank">
                            <img className="footerlogopos" src={DMAPLogo} alt="image not found" />
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default Login;
