import React, { useEffect, useState } from 'react';
import helper from '../services/tokenStore';
import { trackPromise } from 'react-promise-tracker';
import loginService from '../services/loginService';
import "./ForgotPassword.scss";
import { useHistory } from 'react-router-dom';

function ForgotPassword() {
	const [userEmail, setUserEmail] = useState('')
	const [userName, setUserName] = useState('')

	const history = useHistory();

    const sendMailForgotPasword = (e) =>{
        e.preventDefault();
	
		let payload = {
			"email": userEmail,
			"username" : userName
		}

        trackPromise(loginService.keyCloakForgotPassword(payload).then((response) => {
			//check login response
			if(response.data.status == 'Success'){
				alert(response.data.message);
				helper.setUserName(userName);
			}
			else if(response.data.status == 'Failed'){
				alert(response.data.message);
			}

		}).catch((error) => {
			alert(error.response.data.error);
		})
	);
		
    }

	const openLoginPage = () =>{
		loginService.logout();
		history.push('/login')
	}

	return (
		<div className="container mt-5">
			<h4 className="header-group">Forgot Password</h4>
			<div className="d-flex align-items-center justify-content-center mt-5">
				<form onSubmit={sendMailForgotPasword}>
				<div className="form-group mt-2">
						<label htmlFor="email" className="form-name">Enter Username</label>
						<div className="row">
							<div className="col-11">
								<input type="text" className="form-control frm-width" id="username" placeholder="Username" onInput = {(e) => setUserName(e.target.value)}/>
							</div>
						</div>
					</div>

					<div className="form-group mt-2">
						<label htmlFor="email" className="form-name">Enter E-Mail</label>
						<div className="row">
							<div className="col-11">
								<input type="text" className="form-control frm-width" id="e-mail" placeholder="E-mail" onInput = {(e) => setUserEmail(e.target.value)}/>
							</div>
						</div>
					</div>

			
					<div className="form-group mt-2">
						<label className='forgot-cls opacity-50' onClick={openLoginPage}>
							Login</label>
					</div>
                    <div className="form-group mt-2">
						<button type="submit" className="btn  btn-style">Send Password to Email</button>
					</div>

				</form>
			
			
			
			</div>

		</div>

	);
}
export default ForgotPassword;
