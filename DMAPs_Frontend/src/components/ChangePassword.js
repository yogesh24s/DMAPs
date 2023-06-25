import React, { useEffect, useState } from 'react';
import helper from '../services/tokenStore';
import { trackPromise } from 'react-promise-tracker';
import loginService from '../services/loginService';
import "./ChangePassword.scss";
import { useHistory} from 'react-router-dom';


function ChangePassword() {
	const [passwordObj, setPasswordObj] = useState({
		password: "",
        confirmPassword : ""
	});

	const searchParams = new URLSearchParams(document.location.search);

	const history = useHistory();

    const changePasswordFn = (e) =>{
        e.preventDefault();
		let resetToken = searchParams.get('t');
		let userId = searchParams.get('i');
		let userName = searchParams.get('n');
		//console.log(resetToken)
		if(!resetToken){

		if(passwordObj.password == passwordObj.confirmPassword){
				let payload = {
					"userid":helper.getUserId(),
					"newpassword":passwordObj.password,
					"temporary":helper.getTemporaryPasswordFlag(),
					"username":helper.getUserName()
				}

				trackPromise(loginService.keyCloakChangePassword(payload).then((response) => {
					//check login response
					if(response.data.status == 'Success'){
						alert(response.data.message);
						history.push('/login')
						loginService.logout();

					}
					else if(response.data.status == 'Failed'){
						alert(response.data.message);
					}

				}).catch((error) => {
					//console.log(error.response.data.error)
					alert(error.response.data.error);
				})
			);
		}
		else{
			alert("New Password and Confirm Password is not matching. Please re-enter the passwords.")
		}
	}
	else{

		if(passwordObj.password == passwordObj.confirmPassword){
					let payload = {
						"userid": userId,
						"newpassword":passwordObj.password,
						"username":userName,
						"resettoken" :resetToken
					}

					trackPromise(loginService.keyCloakResetPassword(payload).then((response) => {
						//check login response
						if(response.data.status == 'Success'){
							alert(response.data.message);
							history.push('/login')
							loginService.logout();

						}
						else if(response.data.status == 'Failed'){
							alert(response.data.message);
						}

					}).catch((error) => {
						//console.log(error.response.data.error)
						alert(error.response.data.error);
					})
				);
			}
			else{
				alert("New Password and Confirm Password is not matching. Please re-enter the passwords.")
			}
	}
    }

	const openLoginPage = () =>{
		loginService.logout();
		history.push('/login')
	}

	return (
		<div className="container mt-5">
			<h4 className="header-group">Change Password</h4>
			<div className="d-flex align-items-center justify-content-center mt-5">
				<form onSubmit={changePasswordFn}>

					<div className="form-group mt-2">
						<label htmlFor="firstname" className="form-name">New Password</label>
						<div className="row">
							<div className="col-11">
								<input type="password" className="form-control frm-width" id="password" placeholder="Password" onInput = {(e) => setPasswordObj({...passwordObj, password :e.target.value})}/>
							</div>
						</div>
					</div>

					<div className="form-group mt-2">
						<label htmlFor="lastname" className="form-name">Confirm Password</label>
						<div className="row">
							<div className="col-11">
								<input type="password" className="form-control frm-width" id="confirmedPassword" placeholder="Confirm Password" onInput = {(e) => setPasswordObj({...passwordObj, confirmPassword : e.target.value})}/>
							</div>
						</div>

					</div>
                    <div className="form-group mt-3">
						<button type="submit" className="btn  btn-style">Change Password</button>
					</div>
					<div className="form-group mt-3 text-center">
						Go back to <label className='forgot-cls' onClick={openLoginPage}>Login</label>
					</div>
				</form>



			</div>

		</div>

	);
}
export default ChangePassword;
