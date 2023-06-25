import React, { useEffect, useState } from 'react';
import "./SignUp.scss";
import TermsandConditions from "./TermsandConditions";
import Alert from "react-bootstrap/Alert";

function SignUp() {
	const [showTerms, setShowTerms] = useState(false);
	const [checked, setChecked] = useState(false);
	const [fName, setFname] = useState("");
	const [lName, setLname] = useState("");
	const [uName, setUname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showError, setShowError] = useState(false);
	const [sanityErrorMsg, setSanityErrorMsg] = useState("");

	const _onButtonClick = () => {
		setShowTerms(true);
	};

	const clearState = (datasetName) => {
		setShowTerms(false);
		if (datasetName) {
			setChecked(true);
		}
		else {
			setChecked(false);
		}
	};

	const toggleTerms = () => {
		setChecked(!checked);
	};

	const updateFname = (e) => {
		setFname(e.target.value);
	};

	const updateLname = (e) => {
		setLname(e.target.value);
	};

	const updateUname = (e) => {
		setUname(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const userSignup = () => {
		setShowError(false);
		if(fName && lName && uName && email && password){
			if(checked){
				setShowError(false);
				alert("All Good")
			}
			else{
				setShowError(true)
				setSanityErrorMsg('Please Accept Terms & Conditions.')
			}

		}
		else{
			setShowError(true)
			setSanityErrorMsg("All Fields are Mandatory")
		}
	};
	// const [data, setData] = useState({
	//     username: "",
	//     password: ""
	// });

	// const submitHandler = e => {
	//     e.preventDefault();
	//     const payload = {
	//         'userName': data.username[0],
	//         'password': data.password[0]
	//     }
	//     //history.push("/qna");
	//     // history.push("/landingpage");

	//     trackPromise(loginService.keyCloakLogin(payload).then((response) => {

	//             helper.setToken(response.data.accessToken);
	//             helper.setRefreshToken(response.data.refreshToken);
	//             helper.setRole(response.data.userRole);
	//             history.push("/landingpage");
	//         }).catch((error) => {
	//             //console.log(error.response.data.error)
	//             alert(error.response.data.error);
	//         })
	//     );


	// }

	return (
		<div>
			{showTerms && (
				<TermsandConditions clearState={(datasetName) => clearState(datasetName)} />
			)}

			<div className="container mt-5">
				<h4 className="text-center">Create an account</h4>
				{showError && (
					<Alert variant="danger" onClose={() => setShowError(false)} dismissible>
						<p>{sanityErrorMsg}</p>
					</Alert>
				)}
				<div className="d-flex align-items-center justify-content-center mt-2">
					<form>

						<div className="form-group mt-2">
							<label htmlFor="firstname" className="form-name">First Name</label>
							<div className="row">
								<div className="col-11">
									<input type="text" className="form-control frm-width" id="firstname" placeholder="First Name" onChange={updateFname} />
								</div>
								<div className="col-1">
									<i className="far fa-user-circle"></i>
								</div>
							</div>
						</div>

						<div className="form-group mt-2">
							<label htmlFor="lastname" className="form-name">Last Name</label>
							<div className="row">
								<div className="col-11">
									<input type="text" className="form-control frm-width" id="lastname" placeholder="Last Name" onChange={updateLname} />
								</div>
								<div className="col-1">
									<i className="far fa-user-circle"></i>
								</div>
							</div>

						</div>

						<div className="form-group mt-2">
							<label htmlFor="name" className="form-name">User Name</label>
							<div className="row">
								<div className="col-11">
									<input type="text" className="form-control frm-width" id="name" placeholder="User Name" onChange={updateUname} />
								</div>
								<div className="col-1">
									<i className="far fa-user-circle"></i>
								</div>
							</div>

						</div>

						<div className="form-group mt-2">
							<label htmlFor="email" className="form-name">Email</label>
							<div className="row">
								<div className="col-11">
									<input type="text" className="form-control frm-width" id="email" placeholder="Email" onChange={updateEmail} />
								</div>
								<div className="col-1">
									<i className="far fa-envelope"></i>
								</div>
							</div>

						</div>

						<div className="form-group mt-2">
							<label htmlFor="password" className="form-name">Password</label>
							<div className="row">
								<div className="col-11">
									<input type="password" className="form-control frm-width" id="password" placeholder="Password" onChange={updatePassword} />
								</div>
								<div className="col-1">
									<i className="fa fa-lock white-color"></i>
								</div>
							</div>

						</div>

						<div className="form-check pt-3">
							<input type="checkbox" className="form-check-input" checked={checked} onChange={toggleTerms} />
							<label className="form-check-label" htmlFor="radio1" onClick={_onButtonClick}>Terms & Conditions</label>
						</div>
						<div className="form-group">
							<button type="button" className="btn btn-style"  onClick={userSignup} >Create an account</button>
						</div>


						<div className="form-group pt-3 text-center">
							<span className="create-account-msg">Have an account?</span><a className="ml-2 create-account-msg" href="/login">Log in</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
export default SignUp;
